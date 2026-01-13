import type { AxiosError, AxiosRequestConfig } from 'axios';
import axios from 'axios';
import { IndexedDBManager } from '@/lib/indexeddb-manager';
import { toast } from '@/components/toast';

type ValueOf<T> = T[keyof T];

export interface RequestConfig extends AxiosRequestConfig {
  url: string;
  method: string;
}

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'PATCH';

type Method = ValueOf<RequestMethod>;

// 用于转发请求的代理地址
const BASE_LINE_PROXY_PATH = 'http://127.0.0.1:3000';

// 取消请求白名单
const CANCEL_WHITE_LIST: Array<{ path: string; method: Method }> = [];

// 超时时间
const TIMEOUT = 5 * 1000;

// 请求队列
const pendingRequests = new Map();

// token 请求状态码
const HttpStatus = {
  OK: 200,
  Redirection: 300,
  OK_OTHER: 9200,
  BadRequest: 400,
  Unauthorized: 401,
  Forbidden: 403,
  NotFound: 404,
  InternalServerError: 500,
  UnKnownError: 9300,
  ClientError: 9400,
  ServerError: 9500,
} as const;

type HttpStatus = (typeof HttpStatus)[keyof typeof HttpStatus];

// 扩展 HttpStatus 类型以包含所有可能的值
// type ExtendedHttpStatus = HttpStatus | 200 | 300 | 9200

// https 状态提示语
const HttpStatusMessage = new Map<HttpStatus, string>([
  [HttpStatus.BadRequest, '参数错误'],
  [HttpStatus.Unauthorized, '未授权'],
  [HttpStatus.Forbidden, '禁止访问'],
  [HttpStatus.NotFound, '请求不存在'],
  [HttpStatus.InternalServerError, '服务器错误'],
  [HttpStatus.ClientError, '客户端错误'],
  [HttpStatus.ServerError, '服务器错误'],
  [HttpStatus.UnKnownError, '未知错误'],
]);

const getText = (type: 'error' | 'success' | 'warning' | 'info') => {
  switch (type) {
    case 'error':
      return '错误';
    case 'success':
      return '成功';
    case 'warning':
      return '警告';
    case 'info':
      return '提示';
    default:
      return '提示';
  }
};

// 添加消息提示函数
function showMessage(message: string, type: 'error' | 'success' | 'warning' | 'info' = 'error') {
  const text = getText(type);
  toast[type](text, message);
}

function hashObject(obj: unknown): string {
  const str = JSON.stringify(obj);
  // 使用简单的哈希算法，在实际使用时可以选择 crypto
  return str
    .split('')
    .reduce((hash, char) => {
      return ((hash << 5) - hash + char.charCodeAt(0)) | 0;
    }, 0)
    .toString(36);
}

// 根据请求得到的唯一值，用于取消重复请求
function getRequestKey(url: string, { method, params, data }: AxiosRequestConfig): string {
  // 使用 URL 对象处理 url
  const urlObj = new URL(url, window.location.origin);

  // 使用 crypto 生成更短的唯一标识
  const paramsHash = params ? hashObject(params) : '';
  const dataHash = data ? hashObject(data) : '';

  return `${method}:${urlObj.pathname}:${paramsHash}:${dataHash}`;
}

function handleError(error: AxiosError) {
  if (axios.isCancel(error)) {
    showMessage('请求已被取消: ' + error.message, 'warning');
  } else {
    const responseError = (error as AxiosError<any>).response?.data?.message || '';
    if (responseError) {
      showMessage('请求失败: ' + responseError, 'error');
      return;
    }
    showMessage('请求失败: ' + (error as Error).message, 'error');
  }
}

function getHttpStatus(statusCode: number): HttpStatus {
  // 请求完成
  if (statusCode >= HttpStatus.OK) {
    return HttpStatus.OK;
  }

  if (statusCode > HttpStatus.OK && statusCode < HttpStatus.Redirection) {
    return HttpStatus.OK_OTHER;
  }

  if (statusCode >= HttpStatus.Redirection && statusCode < HttpStatus.BadRequest) {
    return HttpStatus.Redirection;
  }

  if (statusCode >= HttpStatus.BadRequest && statusCode < HttpStatus.ServerError) {
    switch (statusCode) {
      case HttpStatus.BadRequest:
        return HttpStatus.BadRequest;
      case HttpStatus.Unauthorized:
        return HttpStatus.Unauthorized;
      case HttpStatus.Forbidden:
        return HttpStatus.Forbidden;
      case HttpStatus.NotFound:
        return HttpStatus.NotFound;
      default:
        return HttpStatus.ClientError;
    }
  }

  if (statusCode > HttpStatus.InternalServerError) {
    return HttpStatus.ServerError;
  }

  return HttpStatus.UnKnownError;
}

export async function request<D>(config: AxiosRequestConfig): Promise<D> {
  const url = config.url as string;
  const controller = new AbortController();
  // 生成请求键值
  const requestKey = getRequestKey(url, config);
  const { signal } = controller;
  config.signal = signal;
  // 如果重复请求 且不是白名单中的请求路径,取消前一个
  if (
    pendingRequests.has(requestKey) &&
    !CANCEL_WHITE_LIST.some((item) => item.path === url && item.method === config.method)
  ) {
    pendingRequests.get(requestKey).abort();
  }
  pendingRequests.set(requestKey, controller);

  // 获取访问令牌
  let accessToken = null;
  try {
    const indexedDB = IndexedDBManager.getInstance();
    accessToken = await indexedDB.getItem('accessToken');
  } catch (error) {
    console.error('从 IndexedDB 获取访问令牌失败：', error);
  }

  // const secret = AESToken(BASE_LINE_KEY_24);
  const { headers = {}, params: configParams, ...axiosRequestConfig } = config;

  // 防止 GET 请求缓存GET
  const t = new Date().getTime();
  const isGetRequest = config.method === 'GET';
  const params = isGetRequest ? { ...configParams, t } : { t };
  try {
    const response = await axios(url, {
      headers: {
        ...headers,
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        token: 'secret',
      },
      ...axiosRequestConfig,
      baseURL: BASE_LINE_PROXY_PATH,
      timeout: TIMEOUT,
      params: isGetRequest ? params : configParams,
    });
    const { status } = response;
    const httpStatus = getHttpStatus(status);
    const httpStatusMessage = HttpStatusMessage.get(httpStatus);

    if ([HttpStatus.OK, HttpStatus.OK_OTHER, HttpStatus.Redirection].includes(httpStatus as any)) {
      if (response.data?.statusCode >= HttpStatus.Redirection) {
        const errorMessage = `${response.data?.statusCode} ${response.data.message} ${response.data.status}`;
        showMessage(errorMessage, 'error');
      }
      // 从响应中提取 data 字段并返回
      return response.data.data as D;
    } else {
      const message = httpStatusMessage ?? '未知错误';
      showMessage(message, 'error');
      return response.data.data as D;
    }
  } catch (error) {
    handleError(error as AxiosError);
    throw error;
  } finally {
    pendingRequests.delete(requestKey);
  }
}

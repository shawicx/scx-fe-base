import type { RequestConfig } from '@/service/request';
import { request } from '@/service/request';
import type { AiMessageDto } from '@/service/types';

/**
 * @description 生成 AI 回复
 * @param params PostAiCompletionRequestType
 * @returns Promise<PostAiCompletionResponseType>
 */
export interface PostAiCompletionRequestType {
  /** @description 消息列表 */
  messages: AiMessageDto[];
  /** @description 生成选项 */
  options?: any;
  /** @description 显式指定平台 */
  provider?: string;
  /** @description  */
  Authorization?: string;
}

/**
 * @description 生成 AI 回复 的返回数据类型
 */
export interface PostAiCompletionResponseType {
  /** @description  */
  success: boolean;
  /** @description  */
  data: Record<string, any>;
}

/**
 * @description 生成 AI 回复
 * @param params PostAiCompletionRequestType
 * @returns Promise<PostAiCompletionResponseType>
 */
export async function postAiCompletionApi(
  params: PostAiCompletionRequestType
): Promise<PostAiCompletionResponseType> {
  const config: RequestConfig = {
    url: '/api/ai/completion',
    method: 'POST',
    data: params,
  };
  return request<PostAiCompletionResponseType>(config);
}

/**
 * @description 更新用户 AI 配置
 * @param params PutAiConfigRequestType
 * @returns Promise<PutAiConfigResponseType>
 */
export interface PutAiConfigRequestType {
  /** @description 默认平台 */
  defaultProvider?: string;
  /** @description  */
  providers?: Record<string, any>;
  /** @description  */
  Authorization?: string;
}

/**
 * @description 更新用户 AI 配置 的返回数据类型
 */
export interface PutAiConfigResponseType {
  /** @description  */
  success: boolean;
  /** @description  */
  message: string;
}

/**
 * @description 更新用户 AI 配置
 * @param params PutAiConfigRequestType
 * @returns Promise<PutAiConfigResponseType>
 */
export async function putAiConfigApi(
  params: PutAiConfigRequestType
): Promise<PutAiConfigResponseType> {
  const config: RequestConfig = {
    url: '/api/ai/config',
    method: 'PUT',
    data: params,
  };
  return request<PutAiConfigResponseType>(config);
}

/**
 * @description 测试平台连接
 * @param params PostAiTestConnectionRequestType
 * @returns Promise<PostAiTestConnectionResponseType>
 */
export interface PostAiTestConnectionRequestType {
  /** @description 要测试的平台 */
  provider: string;
  /** @description  */
  Authorization?: string;
}

/**
 * @description 测试平台连接 的返回数据类型
 */
export interface PostAiTestConnectionResponseType {
  /** @description  */
  success: boolean;
  /** @description  */
  data: Record<string, any>;
}

/**
 * @description 测试平台连接
 * @param params PostAiTestConnectionRequestType
 * @returns Promise<PostAiTestConnectionResponseType>
 */
export async function postAiTestConnectionApi(
  params: PostAiTestConnectionRequestType
): Promise<PostAiTestConnectionResponseType> {
  const config: RequestConfig = {
    url: '/api/ai/test-connection',
    method: 'POST',
    data: params,
  };
  return request<PostAiTestConnectionResponseType>(config);
}

/**
 * @description 获取可用平台列表
 * @param params GetAiProvidersRequestType
 * @returns Promise<GetAiProvidersResponseType>
 */
export interface GetAiProvidersRequestType {
  /** @description  */
  Authorization?: string;
}

/**
 * @description 获取可用平台列表 的返回数据类型
 */
export interface GetAiProvidersResponseType {
  /** @description  */
  success: boolean;
  /** @description  */
  data: Record<string, any>[];
}

/**
 * @description 获取可用平台列表
 * @param params GetAiProvidersRequestType
 * @returns Promise<GetAiProvidersResponseType>
 */
export async function getAiProvidersApi(
  params: GetAiProvidersRequestType
): Promise<GetAiProvidersResponseType> {
  const config: RequestConfig = {
    url: '/api/ai/providers',
    method: 'GET',
    params,
  };
  return request<GetAiProvidersResponseType>(config);
}

/**
 * @description 获取请求历史
 * @param params GetAiRequestsRequestType
 * @returns Promise<GetAiRequestsResponseType>
 */
export interface GetAiRequestsRequestType {
  /** @description  */
  Authorization?: string;
}

/**
 * @description 获取请求历史 的返回数据类型
 */
export interface GetAiRequestsResponseType {
  /** @description  */
  success: boolean;
  /** @description  */
  data: Record<string, any>;
}

/**
 * @description 获取请求历史
 * @param params GetAiRequestsRequestType
 * @returns Promise<GetAiRequestsResponseType>
 */
export async function getAiRequestsApi(
  params: GetAiRequestsRequestType
): Promise<GetAiRequestsResponseType> {
  const config: RequestConfig = {
    url: '/api/ai/requests',
    method: 'GET',
    params,
  };
  return request<GetAiRequestsResponseType>(config);
}

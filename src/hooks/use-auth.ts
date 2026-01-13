/**
 * @description: 登录相关
 */
import {
  postUsersLoginPasswordApi,
  getUsersEncryptionKeyApi,
  postUsersLogoutApi,
  postUsersLoginApi,
  postUsersRegisterApi,
  postUsersSendEmailCodeApi,
} from '@/service';
import type {
  PostUsersLoginPasswordRequestType,
  PostUsersLoginPasswordResponseType,
  PostUsersLoginRequestType,
  PostUsersRegisterRequestType,
} from '@/service';
import { FrontendCrypto } from '@/lib/frontend-crypto';
import { IndexedDBManager } from '@/lib/indexeddb-manager';

// 设置 cookie
const setAuthCookie = (token: string) => {
  if (typeof document !== 'undefined') {
    document.cookie = `accessToken=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=lax`;
  }
};

// 删除 cookie
const removeAuthCookie = () => {
  if (typeof document !== 'undefined') {
    document.cookie = 'accessToken=; path=/; max-age=0; SameSite=lax';
  }
};

export function useAuth() {
  const indexedDB = IndexedDBManager.getInstance();

  // 密码登录
  const login = async (params: Omit<PostUsersLoginPasswordRequestType, 'keyId'>) => {
    try {
      // 获取加密密钥
      const keyResponse = await getUsersEncryptionKeyApi({});
      const { key, keyId } = keyResponse || {};
      // 加密密码
      const encryptedPassword = FrontendCrypto.encrypt(params.password, key);

      // 调用登录接口，直接返回用户数据
      const user = await postUsersLoginPasswordApi({
        ...params,
        password: encryptedPassword,
        keyId,
      });
      // 将用户信息和访问令牌分别存储到 IndexDB
      try {
        await indexedDB.setItem('user', user);
        await indexedDB.setItem('accessToken', user.accessToken);
        // 同时设置 cookie，供 middleware 使用
        setAuthCookie(user.accessToken);
      } catch (error) {
        console.error('保存用户数据到 IndexedDB 失败：', error);
        throw Error('登录失败');
      }
      return user;
    } catch {
      throw Error('密码登录失败');
    }
  };

  // 验证码登录
  const loginWithCode = async (params: PostUsersLoginRequestType) => {
    try {
      // 调用登录接口，直接返回用户数据
      const user = await postUsersLoginApi(params);

      // 将用户信息和访问令牌分别存储到 IndexDB
      try {
        await indexedDB.setItem('user', user);
        await indexedDB.setItem('accessToken', user.accessToken);
        // 同时设置 cookie，供 middleware 使用
        setAuthCookie(user.accessToken);
      } catch (error) {
        console.error('保存用户数据到 IndexedDB 失败：', error);
      }
      return user;
    } catch {
      throw Error('验证码登录失败');
    }
  };

  // 注册
  const register = async (params: Omit<PostUsersRegisterRequestType, 'name'>) => {
    try {
      // 调用注册接口，直接返回用户数据
      const user = await postUsersRegisterApi({
        ...params,
        name: params.email, // 使用邮箱作为用户名
      });

      // 将用户信息和访问令牌分别存储到 IndexDB
      try {
        await indexedDB.setItem('user', user);
        await indexedDB.setItem('accessToken', user.accessToken);
        // 同时设置 cookie，供 middleware 使用
        setAuthCookie(user.accessToken);
      } catch (error) {
        console.error('保存用户数据到 IndexedDB 失败：', error);
      }
      return user;
    } catch (error) {
      console.error('注册失败：', error);
      throw Error('注册失败');
    }
  };

  // 发送验证码
  const sendVerificationCode = async (email: string) => {
    try {
      // 调用发送验证码接口
      return await postUsersSendEmailCodeApi({ email });
    } catch (error) {
      console.error('发送验证码失败：', error);
      throw Error('发送验证码失败');
    }
  };

  const logout = async () => {
    // 先获取用户数据用于调用注销接口
    let userData: PostUsersLoginPasswordResponseType | null = null;
    try {
      userData = (await indexedDB.getItem('user')) as PostUsersLoginPasswordResponseType;
    } catch (error) {
      console.error('从 IndexedDB 获取用户数据失败：', error);
    }

    // 尝试调用后端注销接口，但不阻塞本地清理
    if (userData?.id) {
      postUsersLogoutApi({ userId: userData.id }).catch((error) => {
        console.warn('登出 API 调用失败，但继续执行本地清理：', error);
      });
    }

    // 无论后端 API 是否成功，都清除本地凭证
    try {
      await indexedDB.removeItem('user');
      await indexedDB.removeItem('accessToken');
      // 同时删除 cookie
      removeAuthCookie();
    } catch (error) {
      console.error('从 IndexedDB 删除用户数据失败：', error);
    }
  };

  // 获取访问令牌
  const getAccessToken = async (): Promise<string | null> => {
    try {
      return await indexedDB.getItem('accessToken');
    } catch (error) {
      console.error('从 IndexedDB 获取访问令牌失败：', error);
      return null;
    }
  };

  // 检查用户是否已登录
  const isAuthenticated = async (): Promise<boolean> => {
    try {
      const token = await getAccessToken();
      return !!token;
    } catch (error) {
      console.error('检查认证状态失败：', error);
      return false;
    }
  };

  return {
    login,
    loginWithCode,
    register,
    sendVerificationCode,
    logout,
    getAccessToken,
    isAuthenticated,
  };
}

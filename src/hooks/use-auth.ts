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
        console.error('Failed to save user data to IndexedDB:', error);
        throw Error('登录失败');
      }
      return user;
    } catch (error) {
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
        console.error('Failed to save user data to IndexedDB:', error);
      }
      return user;
    } catch (error) {
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
        console.error('Failed to save user data to IndexedDB:', error);
      }
      return user;
    } catch (error) {
      console.error('Registration failed:', error);
      throw Error('注册失败');
    }
  };

  // 发送验证码
  const sendVerificationCode = async (email: string) => {
    try {
      // 调用发送验证码接口
      return await postUsersSendEmailCodeApi({ email });
    } catch (error) {
      console.error('Failed to send verification code:', error);
      throw Error('发送验证码失败');
    }
  };

  const logout = async () => {
    // 先获取用户数据用于调用注销接口
    let userData: PostUsersLoginPasswordResponseType | null = null;
    try {
      userData = (await indexedDB.getItem('user')) as PostUsersLoginPasswordResponseType;
    } catch (error) {
      console.error('Failed to get user data from IndexedDB:', error);
    }

    // 尝试调用后端注销接口，但不阻塞本地清理
    if (userData?.id) {
      postUsersLogoutApi({ userId: userData.id }).catch((error) => {
        console.warn('Logout API call failed, but continuing with local cleanup:', error);
      });
    }

    // 无论后端 API 是否成功，都清除本地凭证
    try {
      await indexedDB.removeItem('user');
      await indexedDB.removeItem('accessToken');
      // 同时删除 cookie
      removeAuthCookie();
    } catch (error) {
      console.error('Failed to remove user data from IndexedDB:', error);
    }
  };

  // 获取访问令牌
  const getAccessToken = async (): Promise<string | null> => {
    try {
      return await indexedDB.getItem('accessToken');
    } catch (error) {
      console.error('Failed to get access token from IndexedDB:', error);
      return null;
    }
  };

  // 检查用户是否已登录
  const isAuthenticated = async (): Promise<boolean> => {
    try {
      const token = await getAccessToken();
      return !!token;
    } catch (error) {
      console.error('Failed to check authentication status:', error);
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

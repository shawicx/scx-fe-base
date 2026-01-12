import { RequestConfig, request } from '@/service/request';

/**
 * @description 发送验证码邮件
 * @param params PostMailSendVerificationCodeRequestType
 * @returns Promise<PostMailSendVerificationCodeResponseType>
 */
export interface PostMailSendVerificationCodeRequestType {
  /** @description 收件人邮箱 */
  email: string;
  /** @description  */
  Authorization?: string;
}

/**
 * @description 发送验证码邮件 的返回数据类型
 */
export interface PostMailSendVerificationCodeResponseType {
  /** @description 发送是否成功 */
  success: boolean;
  /** @description 发送结果消息 */
  message: string;
  /** @description 错误信息（发送失败时） */
  error: string;
  /** @description 验证码（仅用于开发环境调试，生产环境不返回） */
  code: string;
}

/**
 * @description 发送验证码邮件
 * @param params PostMailSendVerificationCodeRequestType
 * @returns Promise<PostMailSendVerificationCodeResponseType>
 */
export async function postMailSendVerificationCodeApi(
  params: PostMailSendVerificationCodeRequestType
): Promise<PostMailSendVerificationCodeResponseType> {
  const config: RequestConfig = {
    url: '/api/mail/send-verification-code',
    method: 'POST',
    data: params,
  };
  return request<PostMailSendVerificationCodeResponseType>(config);
}

/**
 * @description 发送欢迎邮件
 * @param params PostMailSendWelcomeEmailRequestType
 * @returns Promise<PostMailSendWelcomeEmailResponseType>
 */
export interface PostMailSendWelcomeEmailRequestType {
  /** @description 收件人邮箱 */
  email: string;
  /** @description 用户名 */
  username: string;
  /** @description  */
  Authorization?: string;
}

/**
 * @description 发送欢迎邮件 的返回数据类型
 */
export interface PostMailSendWelcomeEmailResponseType {
  /** @description 发送是否成功 */
  success: boolean;
  /** @description 发送结果消息 */
  message: string;
  /** @description 错误信息（发送失败时） */
  error: string;
}

/**
 * @description 发送欢迎邮件
 * @param params PostMailSendWelcomeEmailRequestType
 * @returns Promise<PostMailSendWelcomeEmailResponseType>
 */
export async function postMailSendWelcomeEmailApi(
  params: PostMailSendWelcomeEmailRequestType
): Promise<PostMailSendWelcomeEmailResponseType> {
  const config: RequestConfig = {
    url: '/api/mail/send-welcome-email',
    method: 'POST',
    data: params,
  };
  return request<PostMailSendWelcomeEmailResponseType>(config);
}

/**
 * @description 发送密码重置邮件
 * @param params PostMailSendPasswordResetRequestType
 * @returns Promise<PostMailSendPasswordResetResponseType>
 */
export interface PostMailSendPasswordResetRequestType {
  /** @description 收件人邮箱 */
  email: string;
  /** @description 重置令牌 */
  resetToken: string;
  /** @description 重置链接 */
  resetUrl: string;
  /** @description  */
  Authorization?: string;
}

/**
 * @description 发送密码重置邮件 的返回数据类型
 */
export interface PostMailSendPasswordResetResponseType {
  /** @description 发送是否成功 */
  success: boolean;
  /** @description 发送结果消息 */
  message: string;
  /** @description 错误信息（发送失败时） */
  error: string;
}

/**
 * @description 发送密码重置邮件
 * @param params PostMailSendPasswordResetRequestType
 * @returns Promise<PostMailSendPasswordResetResponseType>
 */
export async function postMailSendPasswordResetApi(
  params: PostMailSendPasswordResetRequestType
): Promise<PostMailSendPasswordResetResponseType> {
  const config: RequestConfig = {
    url: '/api/mail/send-password-reset',
    method: 'POST',
    data: params,
  };
  return request<PostMailSendPasswordResetResponseType>(config);
}

/**
 * @description 发送HTML邮件
 * @param params PostMailSendHtmlEmailRequestType
 * @returns Promise<PostMailSendHtmlEmailResponseType>
 */
export interface PostMailSendHtmlEmailRequestType {
  /** @description 收件人邮箱 */
  email: string;
  /** @description 邮件主题 */
  subject: string;
  /** @description HTML内容 */
  html: string;
  /** @description  */
  Authorization?: string;
}

/**
 * @description 发送HTML邮件 的返回数据类型
 */
export interface PostMailSendHtmlEmailResponseType {
  /** @description 发送是否成功 */
  success: boolean;
  /** @description 发送结果消息 */
  message: string;
  /** @description 错误信息（发送失败时） */
  error: string;
}

/**
 * @description 发送HTML邮件
 * @param params PostMailSendHtmlEmailRequestType
 * @returns Promise<PostMailSendHtmlEmailResponseType>
 */
export async function postMailSendHtmlEmailApi(
  params: PostMailSendHtmlEmailRequestType
): Promise<PostMailSendHtmlEmailResponseType> {
  const config: RequestConfig = {
    url: '/api/mail/send-html-email',
    method: 'POST',
    data: params,
  };
  return request<PostMailSendHtmlEmailResponseType>(config);
}

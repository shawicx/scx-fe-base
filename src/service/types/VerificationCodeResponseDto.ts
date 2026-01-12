/**
 * @description VerificationCodeResponseDto
 */
export interface VerificationCodeResponseDto {
  /** @description 发送是否成功 */
  success: boolean;
  /** @description 发送结果消息 */
  message: string;
  /** @description 错误信息（发送失败时） */
  error?: string;
  /** @description 验证码（仅用于开发环境调试，生产环境不返回） */
  code?: string;
}

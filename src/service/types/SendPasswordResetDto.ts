/**
 * @description SendPasswordResetDto
 */
export interface SendPasswordResetDto {
  /** @description 收件人邮箱 */
  email: string;
  /** @description 重置令牌 */
  resetToken: string;
  /** @description 重置链接 */
  resetUrl: string;
}

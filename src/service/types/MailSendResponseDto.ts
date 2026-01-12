/**
 * @description MailSendResponseDto
 */
export interface MailSendResponseDto {
  /** @description 发送是否成功 */
  success: boolean;
  /** @description 发送结果消息 */
  message: string;
  /** @description 错误信息（发送失败时） */
  error?: string;
}

/**
 * @description SendHtmlEmailDto
 */
export interface SendHtmlEmailDto {
  /** @description 收件人邮箱 */
  email: string;
  /** @description 邮件主题 */
  subject: string;
  /** @description HTML内容 */
  html: string;
}

/**
 * @description LoginWithPasswordDto
 */
export interface LoginWithPasswordDto {
  /** @description 邮箱地址 */
  email: string;
  /** @description 密码 */
  password: string;
  /** @description 加密密钥ID（必需，用于解密密码） */
  keyId: string;
}

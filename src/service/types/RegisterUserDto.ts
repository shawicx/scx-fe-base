/**
 * @description RegisterUserDto
 */
export interface RegisterUserDto {
  /** @description 用户邮箱 */
  email: string;
  /** @description 用户名称 */
  name: string;
  /** @description 密码 */
  password: string;
  /** @description 邮箱验证码 */
  emailVerificationCode: string;
}

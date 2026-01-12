/**
 * @description LoginResponseDto
 */
export interface LoginResponseDto {
  /** @description 用户ID */
  id: string;
  /** @description 邮箱地址 */
  email: string;
  /** @description 用户名 */
  name: string;
  /** @description 邮箱是否已验证 */
  emailVerified: boolean;
  /** @description 用户偏好设置 */
  preferences: Record<string, any>;
  /** @description 上次登录时间 */
  lastLoginAt: string;
  /** @description 登录次数 */
  loginCount: number;
  /** @description 访问令牌 */
  accessToken: string;
  /** @description 刷新令牌 */
  refreshToken: string;
}

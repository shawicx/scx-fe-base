/**
 * @description UserResponseDto
 */
export interface UserResponseDto {
  /** @description 用户ID */
  id: string;
  /** @description 用户邮箱 */
  email: string;
  /** @description 用户名称 */
  name: string;
  /** @description 邮箱是否已验证 */
  emailVerified: boolean;
  /** @description 用户偏好设置 */
  preferences: Record<string, any>;
  /** @description 最后登录IP */
  lastLoginIp: string;
  /** @description 最后登录时间 */
  lastLoginAt: string;
  /** @description 登录次数 */
  loginCount: number;
  /** @description 账户是否激活 */
  isActive: boolean;
  /** @description 创建时间 */
  createdAt: string;
  /** @description 更新时间 */
  updatedAt: string;
}

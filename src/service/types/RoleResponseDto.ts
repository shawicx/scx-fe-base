/**
 * @description RoleResponseDto
 */
export interface RoleResponseDto {
  /** @description 角色ID */
  id: string;
  /** @description 角色名称 */
  name: string;
  /** @description 角色代码 */
  code: string;
  /** @description 角色描述 */
  description: any;
  /** @description 是否为系统内置角色 */
  isSystem: boolean;
  /** @description 创建时间 */
  createdAt: string;
  /** @description 更新时间 */
  updatedAt: string;
}

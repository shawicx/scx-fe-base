/**
 * @description UpdateRoleDto
 */
export interface UpdateRoleDto {
  /** @description 角色ID */
  id: string;
  /** @description 角色名称 */
  name?: string;
  /** @description 角色代码，用于程序中识别角色 */
  code?: string;
  /** @description 角色描述 */
  description?: string;
  /** @description 是否为系统内置角色 */
  isSystem?: boolean;
}

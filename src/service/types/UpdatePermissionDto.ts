/**
 * @description UpdatePermissionDto
 */
export interface UpdatePermissionDto {
  /** @description 权限ID */
  id: string;
  /** @description 权限名称 */
  name?: string;
  /** @description 操作动作 */
  action?: string;
  /** @description 资源名称 */
  resource?: string;
  /** @description 权限描述 */
  description?: string;
}

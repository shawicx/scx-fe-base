/**
 * @description CreatePermissionDto
 */
export interface CreatePermissionDto {
  /** @description 权限名称 */
  name: string;
  /** @description 操作动作 */
  action: string;
  /** @description 资源名称 */
  resource: string;
  /** @description 权限描述 */
  description?: string;
}

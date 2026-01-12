/**
 * @description PermissionResponseDto
 */
export interface PermissionResponseDto {
  /** @description 权限ID */
  id: string;
  /** @description 权限名称 */
  name: string;
  /** @description 操作动作 */
  action: string;
  /** @description 资源名称 */
  resource: string;
  /** @description 权限描述 */
  description: any;
  /** @description 创建时间 */
  createdAt: string;
  /** @description 更新时间 */
  updatedAt: string;
}

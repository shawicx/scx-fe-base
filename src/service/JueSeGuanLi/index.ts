import type { RequestConfig } from '@/service/request';
import { request } from '@/service/request';
import type { RoleResponseDto, Permission } from '@/service/types';

/**
 * @description 创建角色
 * @param params PostRolesRequestType
 * @returns Promise<PostRolesResponseType>
 */
export interface PostRolesRequestType {
  /** @description 角色名称 */
  name: string;
  /** @description 角色代码，用于程序中识别角色 */
  code: string;
  /** @description 角色描述 */
  description?: string;
  /** @description 是否为系统内置角色 */
  isSystem?: boolean;
  /** @description  */
  Authorization?: string;
}

/**
 * @description 创建角色 的返回数据类型
 */
export interface PostRolesResponseType {
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

/**
 * @description 创建角色
 * @param params PostRolesRequestType
 * @returns Promise<PostRolesResponseType>
 */
export async function postRolesApi(params: PostRolesRequestType): Promise<PostRolesResponseType> {
  const config: RequestConfig = {
    url: '/api/roles',
    method: 'POST',
    data: params,
  };
  return request<PostRolesResponseType>(config);
}

/**
 * @description 获取角色列表
 * @param params GetRolesRequestType
 * @returns Promise<GetRolesResponseType>
 */
export interface GetRolesRequestType {
  /** @description 每页数量 */
  limit?: string;
  /** @description 页码 */
  page?: string;
  /** @description  */
  Authorization?: string;
}

/**
 * @description 获取角色列表 的返回数据类型
 */
export interface GetRolesResponseType {
  /** @description  */
  roles: RoleResponseDto[];
  /** @description 总数量 */
  total: number;
}

/**
 * @description 获取角色列表
 * @param params GetRolesRequestType
 * @returns Promise<GetRolesResponseType>
 */
export async function getRolesApi(params: GetRolesRequestType): Promise<GetRolesResponseType> {
  const config: RequestConfig = {
    url: '/api/roles',
    method: 'GET',
    params,
  };
  return request<GetRolesResponseType>(config);
}

/**
 * @description 更新角色
 * @param params PutRolesRequestType
 * @returns Promise<PutRolesResponseType>
 */
export interface PutRolesRequestType {
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
  /** @description  */
  Authorization?: string;
}

/**
 * @description 更新角色 的返回数据类型
 */
export interface PutRolesResponseType {
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

/**
 * @description 更新角色
 * @param params PutRolesRequestType
 * @returns Promise<PutRolesResponseType>
 */
export async function putRolesApi(params: PutRolesRequestType): Promise<PutRolesResponseType> {
  const config: RequestConfig = {
    url: '/api/roles',
    method: 'PUT',
    data: params,
  };
  return request<PutRolesResponseType>(config);
}

/**
 * @description 删除角色
 * @param params DeleteRolesRequestType
 * @returns Promise<DeleteRolesResponseType>
 */
export interface DeleteRolesRequestType {
  /** @description 角色ID */
  id: string;
  /** @description  */
  Authorization?: string;
}

/**
 * @description 删除角色 的返回数据类型
 */
export interface DeleteRolesResponseType {
  /** @description 响应数据 */
  data: any;
}

/**
 * @description 删除角色
 * @param params DeleteRolesRequestType
 * @returns Promise<DeleteRolesResponseType>
 */
export async function deleteRolesApi(
  params: DeleteRolesRequestType
): Promise<DeleteRolesResponseType> {
  const config: RequestConfig = {
    url: '/api/roles',
    method: 'DELETE',
    params,
  };
  return request<DeleteRolesResponseType>(config);
}

/**
 * @description 获取角色详情
 * @param params GetRolesDetailRequestType
 * @returns Promise<GetRolesDetailResponseType>
 */
export interface GetRolesDetailRequestType {
  /** @description 角色ID */
  id: string;
  /** @description  */
  Authorization?: string;
}

/**
 * @description 获取角色详情 的返回数据类型
 */
export interface GetRolesDetailResponseType {
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

/**
 * @description 获取角色详情
 * @param params GetRolesDetailRequestType
 * @returns Promise<GetRolesDetailResponseType>
 */
export async function getRolesDetailApi(
  params: GetRolesDetailRequestType
): Promise<GetRolesDetailResponseType> {
  const config: RequestConfig = {
    url: '/api/roles/detail',
    method: 'GET',
    params,
  };
  return request<GetRolesDetailResponseType>(config);
}

/**
 * @description 根据代码获取角色
 * @param params GetRolesByCodeRequestType
 * @returns Promise<GetRolesByCodeResponseType>
 */
export interface GetRolesByCodeRequestType {
  /** @description 角色代码 */
  code: string;
  /** @description  */
  Authorization?: string;
}

/**
 * @description 根据代码获取角色 的返回数据类型
 */
export interface GetRolesByCodeResponseType {
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

/**
 * @description 根据代码获取角色
 * @param params GetRolesByCodeRequestType
 * @returns Promise<GetRolesByCodeResponseType>
 */
export async function getRolesByCodeApi(
  params: GetRolesByCodeRequestType
): Promise<GetRolesByCodeResponseType> {
  const config: RequestConfig = {
    url: '/api/roles/by-code',
    method: 'GET',
    params,
  };
  return request<GetRolesByCodeResponseType>(config);
}

/**
 * @description 为角色分配权限
 * @param params PostRolesAssignPermissionsRequestType
 * @returns Promise<PostRolesAssignPermissionsResponseType>
 */
export interface PostRolesAssignPermissionsRequestType {
  /** @description 角色ID */
  id: string;
  /** @description 权限ID列表 */
  permissionIds: string[];
  /** @description  */
  Authorization?: string;
}

/**
 * @description 为角色分配权限 的返回数据类型
 */
export interface PostRolesAssignPermissionsResponseType {
  /** @description 响应数据 */
  data: any;
}

/**
 * @description 为角色分配权限
 * @param params PostRolesAssignPermissionsRequestType
 * @returns Promise<PostRolesAssignPermissionsResponseType>
 */
export async function postRolesAssignPermissionsApi(
  params: PostRolesAssignPermissionsRequestType
): Promise<PostRolesAssignPermissionsResponseType> {
  const config: RequestConfig = {
    url: '/api/roles/assign-permissions',
    method: 'POST',
    data: params,
  };
  return request<PostRolesAssignPermissionsResponseType>(config);
}

/**
 * @description 获取角色权限
 * @param params GetRolesPermissionsRequestType
 * @returns Promise<GetRolesPermissionsResponseType>
 */
export interface GetRolesPermissionsRequestType {
  /** @description 角色ID */
  id: string;
  /** @description  */
  Authorization?: string;
}

/**
 * @description 获取角色权限 的返回数据类型
 */
export interface GetRolesPermissionsResponseType {
  /** @description 响应数据数组 */
  data: Permission[];
}

/**
 * @description 获取角色权限
 * @param params GetRolesPermissionsRequestType
 * @returns Promise<GetRolesPermissionsResponseType>
 */
export async function getRolesPermissionsApi(
  params: GetRolesPermissionsRequestType
): Promise<GetRolesPermissionsResponseType> {
  const config: RequestConfig = {
    url: '/api/roles/permissions',
    method: 'GET',
    params,
  };
  return request<GetRolesPermissionsResponseType>(config);
}

/**
 * @description 移除角色权限
 * @param params DeleteRolesRemovePermissionRequestType
 * @returns Promise<DeleteRolesRemovePermissionResponseType>
 */
export interface DeleteRolesRemovePermissionRequestType {
  /** @description 角色ID */
  id: string;
  /** @description 权限ID */
  permissionId: string;
  /** @description  */
  Authorization?: string;
}

/**
 * @description 移除角色权限 的返回数据类型
 */
export interface DeleteRolesRemovePermissionResponseType {
  /** @description 响应数据 */
  data: any;
}

/**
 * @description 移除角色权限
 * @param params DeleteRolesRemovePermissionRequestType
 * @returns Promise<DeleteRolesRemovePermissionResponseType>
 */
export async function deleteRolesRemovePermissionApi(
  params: DeleteRolesRemovePermissionRequestType
): Promise<DeleteRolesRemovePermissionResponseType> {
  const config: RequestConfig = {
    url: '/api/roles/remove-permission',
    method: 'DELETE',
    params,
  };
  return request<DeleteRolesRemovePermissionResponseType>(config);
}

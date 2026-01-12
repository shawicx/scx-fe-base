import { RequestConfig, request } from '@/service/request';
import type { PermissionResponseDto } from '@/service/types';

/**
 * @description 创建权限
 * @param params PostPermissionsRequestType
 * @returns Promise<PostPermissionsResponseType>
 */
export interface PostPermissionsRequestType {
  /** @description 权限名称 */
  name: string;
  /** @description 操作动作 */
  action: string;
  /** @description 资源名称 */
  resource: string;
  /** @description 权限描述 */
  description?: string;
  /** @description  */
  Authorization?: string;
}

/**
 * @description 创建权限 的返回数据类型
 */
export interface PostPermissionsResponseType {
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

/**
 * @description 创建权限
 * @param params PostPermissionsRequestType
 * @returns Promise<PostPermissionsResponseType>
 */
export async function postPermissionsApi(
  params: PostPermissionsRequestType
): Promise<PostPermissionsResponseType> {
  const config: RequestConfig = {
    url: '/api/permissions',
    method: 'POST',
    data: params,
  };
  return request<PostPermissionsResponseType>(config);
}

/**
 * @description 获取权限列表
 * @param params GetPermissionsRequestType
 * @returns Promise<GetPermissionsResponseType>
 */
export interface GetPermissionsRequestType {
  /** @description 搜索关键词（权限名称、动作或资源） */
  search?: string;
  /** @description 按动作筛选 */
  action?: string;
  /** @description 按资源筛选 */
  resource?: string;
  /** @description 每页数量 */
  limit?: string;
  /** @description 页码 */
  page?: string;
  /** @description  */
  Authorization?: string;
}

/**
 * @description 获取权限列表 的返回数据类型
 */
export interface GetPermissionsResponseType {
  /** @description  */
  permissions: PermissionResponseDto[];
  /** @description 总数量 */
  total: number;
}

/**
 * @description 获取权限列表
 * @param params GetPermissionsRequestType
 * @returns Promise<GetPermissionsResponseType>
 */
export async function getPermissionsApi(
  params: GetPermissionsRequestType
): Promise<GetPermissionsResponseType> {
  const config: RequestConfig = {
    url: '/api/permissions',
    method: 'GET',
    params,
  };
  return request<GetPermissionsResponseType>(config);
}

/**
 * @description 更新权限
 * @param params PutPermissionsRequestType
 * @returns Promise<PutPermissionsResponseType>
 */
export interface PutPermissionsRequestType {
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
  /** @description  */
  Authorization?: string;
}

/**
 * @description 更新权限 的返回数据类型
 */
export interface PutPermissionsResponseType {
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

/**
 * @description 更新权限
 * @param params PutPermissionsRequestType
 * @returns Promise<PutPermissionsResponseType>
 */
export async function putPermissionsApi(
  params: PutPermissionsRequestType
): Promise<PutPermissionsResponseType> {
  const config: RequestConfig = {
    url: '/api/permissions',
    method: 'PUT',
    data: params,
  };
  return request<PutPermissionsResponseType>(config);
}

/**
 * @description 删除权限
 * @param params DeletePermissionsRequestType
 * @returns Promise<DeletePermissionsResponseType>
 */
export interface DeletePermissionsRequestType {
  /** @description 权限ID */
  id: string;
  /** @description  */
  Authorization?: string;
}

/**
 * @description 删除权限 的返回数据类型
 */
export interface DeletePermissionsResponseType {
  /** @description 响应数据 */
  data: any;
}

/**
 * @description 删除权限
 * @param params DeletePermissionsRequestType
 * @returns Promise<DeletePermissionsResponseType>
 */
export async function deletePermissionsApi(
  params: DeletePermissionsRequestType
): Promise<DeletePermissionsResponseType> {
  const config: RequestConfig = {
    url: '/api/permissions',
    method: 'DELETE',
    params,
  };
  return request<DeletePermissionsResponseType>(config);
}

/**
 * @description 搜索权限
 * @param params GetPermissionsSearchRequestType
 * @returns Promise<GetPermissionsSearchResponseType>
 */
export interface GetPermissionsSearchRequestType {
  /** @description 搜索关键词 */
  keyword: string;
  /** @description 返回数量限制 */
  limit?: string;
  /** @description  */
  Authorization?: string;
}

/**
 * @description 搜索权限 的返回数据类型
 */
export interface GetPermissionsSearchResponseType {
  /** @description 响应数据数组 */
  data: PermissionResponseDto[];
}

/**
 * @description 搜索权限
 * @param params GetPermissionsSearchRequestType
 * @returns Promise<GetPermissionsSearchResponseType>
 */
export async function getPermissionsSearchApi(
  params: GetPermissionsSearchRequestType
): Promise<GetPermissionsSearchResponseType> {
  const config: RequestConfig = {
    url: '/api/permissions/search',
    method: 'GET',
    params,
  };
  return request<GetPermissionsSearchResponseType>(config);
}

/**
 * @description 获取所有动作
 * @param params GetPermissionsActionsRequestType
 * @returns Promise<GetPermissionsActionsResponseType>
 */
export interface GetPermissionsActionsRequestType {
  /** @description  */
  Authorization?: string;
}

/**
 * @description 获取所有动作 的返回数据类型
 */
export interface GetPermissionsActionsResponseType {
  /** @description 响应数据数组 */
  data: string[];
}

/**
 * @description 获取所有动作
 * @param params GetPermissionsActionsRequestType
 * @returns Promise<GetPermissionsActionsResponseType>
 */
export async function getPermissionsActionsApi(
  params: GetPermissionsActionsRequestType
): Promise<GetPermissionsActionsResponseType> {
  const config: RequestConfig = {
    url: '/api/permissions/actions',
    method: 'GET',
    params,
  };
  return request<GetPermissionsActionsResponseType>(config);
}

/**
 * @description 获取所有资源
 * @param params GetPermissionsResourcesRequestType
 * @returns Promise<GetPermissionsResourcesResponseType>
 */
export interface GetPermissionsResourcesRequestType {
  /** @description  */
  Authorization?: string;
}

/**
 * @description 获取所有资源 的返回数据类型
 */
export interface GetPermissionsResourcesResponseType {
  /** @description 响应数据数组 */
  data: string[];
}

/**
 * @description 获取所有资源
 * @param params GetPermissionsResourcesRequestType
 * @returns Promise<GetPermissionsResourcesResponseType>
 */
export async function getPermissionsResourcesApi(
  params: GetPermissionsResourcesRequestType
): Promise<GetPermissionsResourcesResponseType> {
  const config: RequestConfig = {
    url: '/api/permissions/resources',
    method: 'GET',
    params,
  };
  return request<GetPermissionsResourcesResponseType>(config);
}

/**
 * @description 根据动作获取权限
 * @param params GetPermissionsByActionRequestType
 * @returns Promise<GetPermissionsByActionResponseType>
 */
export interface GetPermissionsByActionRequestType {
  /** @description 动作名称 */
  action: string;
  /** @description  */
  Authorization?: string;
}

/**
 * @description 根据动作获取权限 的返回数据类型
 */
export interface GetPermissionsByActionResponseType {
  /** @description 响应数据数组 */
  data: PermissionResponseDto[];
}

/**
 * @description 根据动作获取权限
 * @param params GetPermissionsByActionRequestType
 * @returns Promise<GetPermissionsByActionResponseType>
 */
export async function getPermissionsByActionApi(
  params: GetPermissionsByActionRequestType
): Promise<GetPermissionsByActionResponseType> {
  const config: RequestConfig = {
    url: '/api/permissions/by-action',
    method: 'GET',
    params,
  };
  return request<GetPermissionsByActionResponseType>(config);
}

/**
 * @description 根据资源获取权限
 * @param params GetPermissionsByResourceRequestType
 * @returns Promise<GetPermissionsByResourceResponseType>
 */
export interface GetPermissionsByResourceRequestType {
  /** @description 资源名称 */
  resource: string;
  /** @description  */
  Authorization?: string;
}

/**
 * @description 根据资源获取权限 的返回数据类型
 */
export interface GetPermissionsByResourceResponseType {
  /** @description 响应数据数组 */
  data: PermissionResponseDto[];
}

/**
 * @description 根据资源获取权限
 * @param params GetPermissionsByResourceRequestType
 * @returns Promise<GetPermissionsByResourceResponseType>
 */
export async function getPermissionsByResourceApi(
  params: GetPermissionsByResourceRequestType
): Promise<GetPermissionsByResourceResponseType> {
  const config: RequestConfig = {
    url: '/api/permissions/by-resource',
    method: 'GET',
    params,
  };
  return request<GetPermissionsByResourceResponseType>(config);
}

/**
 * @description 获取权限详情
 * @param params GetPermissionsDetailRequestType
 * @returns Promise<GetPermissionsDetailResponseType>
 */
export interface GetPermissionsDetailRequestType {
  /** @description 权限ID */
  id: string;
  /** @description  */
  Authorization?: string;
}

/**
 * @description 获取权限详情 的返回数据类型
 */
export interface GetPermissionsDetailResponseType {
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

/**
 * @description 获取权限详情
 * @param params GetPermissionsDetailRequestType
 * @returns Promise<GetPermissionsDetailResponseType>
 */
export async function getPermissionsDetailApi(
  params: GetPermissionsDetailRequestType
): Promise<GetPermissionsDetailResponseType> {
  const config: RequestConfig = {
    url: '/api/permissions/detail',
    method: 'GET',
    params,
  };
  return request<GetPermissionsDetailResponseType>(config);
}

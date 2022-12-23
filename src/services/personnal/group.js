import { stringify } from 'qs';
import { request } from '@cpdm/util';

const prefix = '/iam';

export async function listGroups(params) {
  return request(`${prefix}/groups?${stringify(params)}`);
}

export async function getGroup(params) {
  return request(`${prefix}/groups/${params.id}`);
}

export async function createGroup(params) {
  return request(`${prefix}/groups`, {
    method: 'POST',
    data: { ...params },
  });
}

export async function modifyGroup(params) {
  return request(`${prefix}/groups/${params.id}`, {
    method: 'PUT',
    data: { ...params },
  });
}

export async function deleteGroup(params) {
  return request(`${prefix}/groups/${params.id}`, {
    method: 'DELETE',
  });
}

export async function getAllPolicies() {
  return request(`${prefix}/policies/all`, {
    method: 'GET',
  });
}

export async function getPolicies(params) {
  return request(`${prefix}/groups/${params.id}/policies`, {
    method: 'GET',
  });
}

export async function setPolicies(params) {
  return request(`${prefix}/groups/${params.id}/policies`, {
    method: 'PUT',
    data: params.policies,
  });
}

// 获取群组中的所有成员
export async function getMembers(params) {
  return request(`${prefix}/groups/${params.id}/users`);
}

export async function AddMembers(params) {
  return request(`${prefix}/groups/${params.id}/users`, {
    method: 'POST',
    data: params.userIds,
  });
}

export async function removeMembers(params) {
  return request(`${prefix}/users/${params.userId}/groups/${params.id}`, {
    method: 'DELETE',
  });
}
export async function removeUserFromGroup(params) {
  return request(`${prefix}/users/${params.userId}/groups/${params.id}`, {
    method: 'DELETE',
  });
}

// ================================授权============================================
// ====授权列表
export async function listGroupAuthorizations(params) {
  return request(`${prefix}/authorizations/user?${stringify(params)}`);
}

// ===获取策略列表======
export async function listAllGroupPolicys(params) {
  return request(`${prefix}/policy-objects?${stringify(params)}`);
}

// 删除群组的某授权
export async function deleteGroupAuthority(params) {
  return request(`${prefix}/authorizations/${params.authorizationId}`, { method: 'DELETE' });
}

// 群组添加策略权限
export async function createObjectAuthorization(params) {
  return request(`${prefix}/authorizations`, {
    method: 'POST',
    data: params,
  });
}

// ==============================菜单权限=====================================

// 菜单列表
export async function listAllMenus(param) {
  return request(`${prefix}/menu-items${stringify(param, { addQueryPrefix: true })}`);
}

// 给群组添加菜单权限
export async function addGroupMenu(params) {
  return request(`${prefix}/groups/${params.groupId}/menu-access`, {
    method: 'PUT',
    data: params.menuIds,
  });
}

// 查询当前群组的菜单权限
export async function listGroupMenus(params) {
  return request(`${prefix}/groups/${params}/menu-access`);
}

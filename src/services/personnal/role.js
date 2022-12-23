import { stringify } from 'qs';
import { request } from '@cpdm/util';

const prefix = '/iam';

export async function listRoles(params) {
  return request(`${prefix}/roles?${stringify(params)}`);
}

// 模块列表
export async function listModules(param) {
  return request(`/admin/modules${stringify(param, { addQueryPrefix: true })}`);
}

export async function getRoles(params) {
  return request(`${prefix}/roles?moduleId=${params.moduleId}`);
}
export async function getActions(params) {
  // /operationals/list"
  return request(`/admin/operationals/list${stringify(params, { addQueryPrefix: true })}`);
}

// 详情
export async function getRole(params) {
  return request(`${prefix}/roles/${params.id}`);
}

export async function createRole(params) {
  return request(`${prefix}/roles`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
export async function modifyRole(params) {
  return request(`${prefix}/roles/${params.id}`, {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}
export async function deleteRole(params) {
  return request(`${prefix}/roles/${params.id}`, {
    method: 'DELETE',
  });
}

// 获取角色中的所有成员
export async function getMembers(params) {
  return request(`${prefix}/roles/${params.id}/members`);
}

// 给角色添加成员
export async function AddMembers(params) {
  return request(`${prefix}/roles/${params.id}/users`, {
    method: 'POST',
    data: params.userIds,
  });
}

export async function removeMembers(params) {
  return request(`${prefix}/users/${params.userId}/groups/${params.id}`, {
    method: 'DELETE',
  });
}

// 移除角色成员
export async function removeUserFromRole(params) {
  return request(`${prefix}/roles/${params.id}/members/${params.userId}`, {
    method: 'DELETE',
  });
}

// ====授权列表
export async function listRoleAuthorizations(params) {
  return request(`${prefix}/authorizations/user?${stringify(params)}`);
}

// ===获取策略列表======
export async function listAllRolePolicys(params) {
  return request(`${prefix}/policy-objects?${stringify(params)}`);
}

// 删除角色的某授权
export async function deleteRoleAuthority(params) {
  return request(`${prefix}/authorizations/${params.authorizationId}`, { method: 'DELETE' });
}

// 角色添加策略权限
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

// 给角色添加菜单权限
export async function addRoleMenu(params) {
  return request(`${prefix}/roles/${params.roleId}/menu-access`, {
    method: 'PUT',
    data: params.menuIds,
  });
}

// 查询当前角色已有的菜单权限
export async function listRoleMenus(params) {
  return request(`${prefix}/roles/${params}/menu-access`);
}

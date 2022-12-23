import { stringify } from 'qs';
import { request } from '@cpdm/util';

const prefix = '/iam';

export async function listUsers(params) {
  return request(`${prefix}/users?${stringify(params)}`);
}

export async function getUser(params) {
  return request(`${prefix}/users/${params.id}`);
}

export async function createUser(params) {
  return request(`${prefix}/users`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function modifyUser(params) {
  return request(`${prefix}/users/${params.id}`, {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}

export async function deleteUser(params) {
  return request(`${prefix}/users/${params.id}`, {
    method: 'DELETE',
  });
}
// 删除签名图片
export async function deleteSignatureImage(params) {
  return request(`${prefix}/users/${params.userId}/signature-img`, {
    method: 'DELETE',
  });
}

export async function getAllPolicies() {
  return request(`${prefix}/policies/all`, {
    method: 'GET',
  });
}

export async function getPolicies(params) {
  return request(`${prefix}/users/${params.id}/policies`, {
    method: 'GET',
  });
}

export async function setPolicies(params) {
  return request(`${prefix}/users/${params.id}/policies`, {
    method: 'PUT',
    data: params.policies,
  });
}

export async function listGroupsForUser(params) {
  return request(`${prefix}/users/${params.userId}/groups`);
}

export async function removeUserFromGroup(params) {
  return request(`${prefix}/users/${params.userId}/groups/${params.groupId}`, {
    method: 'DELETE',
  });
}

export async function searchUsers(params) {
  return request(`${prefix}/users/search?${stringify(params)}`);
}

export async function queryCurrent() {
  return request('/user_info');
}

// ==========================授权=========================
// =======群组与部门中新建用户时搜索用户/新增授权搜索用户=====
export async function queryUsers(params) {
  return request(`${prefix}/users/search?${stringify(params)}`);
}

// ====授权列表
export async function listUserAuthorizations(params) {
  return request(`${prefix}/authorizations/user?${stringify(params)}`);
}

// ===获取策略列表======
export async function listAllPolicys(params) {
  return request(`${prefix}/policy-objects?${stringify(params)}`);
}

// 删除用户的某授权
export async function deleteUserAuthority(params) {
  return request(`${prefix}/authorizations/${params.authorizationId}`, { method: 'DELETE' });
}

// 用户添加策略权限
export async function createUserAuthorization(params) {
  return request(`${prefix}/authorizations`, {
    method: 'POST',
    data: params,
  });
}

// ================================菜单权限=======================

// 菜单列表
export async function listAllMenus(param) {
  return request(`${prefix}/menu-items${stringify(param, { addQueryPrefix: true })}`);
}

// 给用户添加菜单权限
export async function addUserMenu(params) {
  return request(`${prefix}/users/${params.userId}/menu-access`, {
    method: 'PUT',
    data: params.menuIds,
  });
}

// 查询当前用户的菜单权限
export async function listUserMenus(params) {
  return request(`${prefix}/users/${params}/menu-access`);
}

// ==========================模块权限=============================
// 模块列表
export async function listAllModules(param) {
  return request(`${prefix}/modules${stringify(param, { addQueryPrefix: true })}`);
}

// 给用户添加模块权限
export async function addUserModule(params) {
  return request(`${prefix}/users/${params.userId}/batch-modify-subscribes`, {
    method: 'PUT',
    data: params.moduleIds,
  });
}

// 查询当前用户的模块权限
export async function listUserModules(params) {
  return request(`${prefix}/users/${params.id}/modules`);
}

// 启用/禁用   锁定/解锁   用户
export async function handleUserEnable(param) {
  return request(`/iam/users/${param.userId}/enable`, {
    method: 'post',
    data: param,
  });
}

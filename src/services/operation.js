import { stringify } from 'qs';
import { request } from '@cpdm/util';

const prefix = '/admin';

export async function listRoles(params) {
  return request(`/iam/roles?${stringify(params)}`);
}
export async function getRoles(params) {
  return request(`/iam/roles?moduleId=${params.moduleId}`);
}

// 模块列表
export async function listModules(param) {
  return request(`/admin/modules${stringify(param, { addQueryPrefix: true })}`);
}

// 详情
export async function getOperationInfo(params) {
  // /operationals/{id}
  return request(`${prefix}/operationals/${params}`);
}

// 创建分组
export async function createOperationalGroup(params) {
  // /operationals/groups
  return request(`${prefix}/operationals/groups`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 创建分组
export async function editGroup(params) {
  // /operationals/group/{groupId}
  return request(`${prefix}/operationals/group/${params.groupId}`, {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}
export async function deleteGroup(params) {
  // /operationals/group/{groupId}
  return request(`${prefix}/operationals/group/${params.groupId}`, {
    method: 'DELETE',
  });
}

export async function createOperation(params) {
  return request(`${prefix}/operationals`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
export async function editOperation(params) {
  return request(`${prefix}/operationals/${params.id}`, {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}
export async function deleteOperation(params) {
  return request(`${prefix}/operationals/${params.id}`, {
    method: 'DELETE',
  });
}
export async function deleteOperations(params) {
  return request(`${prefix}/operationals/batch-delete`, {
    method: 'PUT',
    data: params.ids,
  });
}

// 根据模块id获取分组
export async function getGroup(params) {
  return request(`/admin/operationals/groups${stringify(params, { addQueryPrefix: true })}`);
}
// 根据模块id，角色id获取操作列表
export async function listOperations(params) {
  return request(`/admin/operationals/${params.groupId}/list`);
}
// 根据模块id，角色id获取操作列表
export async function getOperations(params) {
  return request(`/admin/operationals/page${stringify(params, { addQueryPrefix: true })}`);
}
export async function listOperationsByPermission(params) {
  return request(`/admin/operationals/permission${stringify(params, { addQueryPrefix: true })}`);
}
// 设置权限
export async function setAuth(params) {
  return request(`/admin/operationals/permission/check`, {
    method: 'POST',
    data: params,
  });
}

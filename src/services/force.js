import { stringify } from 'qs';
import { request } from '@cpdm/util';

const prefix = '/resource';

// 工装列表
export async function listForces(params) {
  return request(`${prefix}/resources${stringify(params, { addQueryPrefix: true })}`);
}

// 创建工装
export async function create(params) {
  return request(`${prefix}/resources/${params.resourceType}`, {
    method: 'POST',
    data: params,
  });
}

// 编辑工装
export async function edit(params) {
  return request(`${prefix}/resources/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}

// 工装基本信息、业务信息
export async function getBasicInfo(params) {
  return request(`${prefix}/resources/${params.id}`);
}

// 删除工装
export async function deleteForce(params) {
  return request(`${prefix}/resources/${params.forceId}`, {
    method: 'DELETE',
    params: {
      mode: params.dataType,
    },
  });
}

// 批量删除
export async function deleteResource(params) {
  return request(`${prefix}/resources`, {
    method: 'PUT',
    data: params,
  });
}

// 批量修订
export async function revise(params) {
  return request(`${prefix}/resources/revise`, {
    method: 'PUT',
    data: params,
  });
}

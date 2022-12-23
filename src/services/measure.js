import { stringify } from 'qs';
import { request } from '@cpdm/util';

const prefix = '/resource';

// 计量器具列表
export async function listMeasures(params) {
  return request(`${prefix}/resources${stringify(params, { addQueryPrefix: true })}`);
}

// 创建计量器具
export async function create(params) {
  return request(`${prefix}/resources/${params.resourceType}`, {
    method: 'POST',
    data: params,
  });
}

// 编辑计量器具
export async function edit(params) {
  return request(`${prefix}/resources/${params.id}`, {
    method: 'PUT',
    body: params,
  });
}

// 计量器具基本信息、业务信息
export async function getBasicInfo(params) {
  return request(`${prefix}/resources/${params.id}`);
}

// 删除计量器具
export async function deleteMeasure(params) {
  return request(`${prefix}/resources/${params.measureId}?resourceType=${params.resourceType}`, {
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
    body: params,
  });
}

// 批量修订
export async function revise(params) {
  return request(`${prefix}/resources/revise`, {
    method: 'PUT',
    body: params,
  });
}

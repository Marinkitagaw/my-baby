import { stringify } from 'qs';
import { request } from '@cpdm/util';

const prefix = '/resource';

// 工艺材料列表
export async function listProcess(params) {
  return request(`${prefix}/resources${stringify(params, { addQueryPrefix: true })}`);
}

// 创建工艺材料
export async function create(params) {
  return request(`${prefix}/resources/${params.resourceType}`, {
    method: 'POST',
    data: params,
  });
}

// 编辑工艺材料
export async function edit(params) {
  return request(`${prefix}/resources/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}

// 获取一级分类属性
export async function getClassificationLevel1(params) {
  return request(`${prefix}/classifications/identifier/${params}`);
}

// 获取分类属性
export async function getClassification(params) {
  return request(`${prefix}/classifications/${params}/sub-classifications`);
}

// 工艺材料基本信息、业务信息
export async function getBasicInfo(params) {
  return request(`${prefix}/resources/${params.id}`);
}

// 删除工艺材料
export async function deleteProcess(params) {
  return request(`${prefix}/processes/${params.processId}`, {
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

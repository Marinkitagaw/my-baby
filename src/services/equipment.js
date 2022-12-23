import { stringify } from 'qs';
import { request } from '@cpdm/util';

const prefix = '/resource';

// 设备列表
export async function listEquipments(params) {
  return request(`${prefix}/resources${stringify(params, { addQueryPrefix: true })}`);
}

// 创建设备
export async function create(params) {
  return request(`${prefix}/resources/${params.resourceType}`, {
    method: 'POST',
    data: params,
  });
}

// 编辑设备
export async function edit(params) {
  return request(`${prefix}/resources/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}

// 设备基本信息、业务信息
export async function getBasicInfo(params) {
  return request(`${prefix}/resources/${params.id}`);
}

// 删除设备
export async function deleteEquipment(params) {
  return request(`${prefix}/resources/${params.equipmentId}`, {
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

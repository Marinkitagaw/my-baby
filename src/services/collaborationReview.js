import { request } from '@cpdm/util';

const prefix = '/collab-review';

/**
 * 协同审签
 */

// 创建
export async function create(params) {
  return request(`${prefix}/collab-reviews`, {
    method: 'POST',
    body: params,
  });
}

// 列表
export async function query(params) {
  return request(`${prefix}/collab-reviews`, { parmas: params });
}
// 协同数据包
export async function collaborationDataPackages(params) {
  return request(`/cpdm/data-packages/${params}/data-send-order`);
}
// 详情
export async function info(id) {
  return request(`${prefix}/collab-reviews/${id}`);
}

// 编辑
export async function modify(id, params) {
  return request(`${prefix}/collab-reviews/${id}`, {
    method: 'PUT',
    body: params,
  });
}

// 删除
export async function remove(id) {
  return request(`${prefix}/collab-reviews/${id}`, { method: 'DELETE' });
}

import { stringify } from 'qs';
import { request } from '@cpdm/util';

const prefix = '/change';

/**
 * 数据发送
 */
// 获取枚举属性
export async function getAttrValue(params) {
  if (params) {
    return request(`${prefix}/data-send-orders/${params.id}/forms`);
  }
  return request(`${prefix}/data-send-orders/create/forms`);
}

// 创建
export async function create(params) {
  return request(`${prefix}/data-send-orders`, {
    method: 'POST',
    data: params,
  });
}

// 对象基本信息
export async function getBasicInfo(params) {
  return request(`${prefix}/data-send-orders/${params.id}`);
}

// 列表
export async function list(params) {
  return request(`${prefix}/data-send-orders?${stringify(params)}`);
}

// 详情
export async function info(id) {
  return request(`${prefix}/data-send-orders/${id}`);
}

// 编辑
export async function modify(params) {
  return request(`${prefix}/data-send-orders/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}

//  删除
export async function remove(id) {
  return request(`${prefix}/data-send-orders/${id}`, { method: 'DELETE' });
}

//  获取关系对象
export async function getRelationshipItems({ id, ...reset }) {
  return request(
    `${prefix}/data-send-orders/${id}/records${stringify({ ...reset }, { addQueryPrefix: true })}`
  );
}
// 获取枚举属性
export async function getCommonData() {
  return request(`${prefix}/exchange-common-data`);
}

// 详情页提交审批
export async function submitApproval(params) {
  return request(`${prefix}/data-send-orders/${params}/review`, {
    method: 'post',
    data: params,
  });
}

// 获取收集数据子节点
export async function getListSubstructure(params) {
  return request(
    `${prefix}/data-send-orders/list-substructure${stringify(params, { addQueryPrefix: true })}`
  );
}

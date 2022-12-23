import { stringify } from 'qs';
import { request } from '@cpdm/util';

const prefix = '/change';

// 列表
export async function list(params) {
  return request(`${prefix}/deviation-orders?${stringify(params)}`);
}

// 创建
export async function create(params) {
  return request(`${prefix}/deviation-orders`, {
    method: 'POST',
    data: params,
  });
}

// 编辑
export async function edit(params) {
  return request(`${prefix}/deviation-orders/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}
// 设置所有者
export async function setDeviationOrderOwner(params) {
  return request(`${prefix}/deviation-orders/${params.orderId}/owner`, {
    method: 'PUT',
    data: params.ownerId,
  });
}

// 获取基本信息
export async function getBasicInfo(params) {
  return request(
    `${prefix}/deviation-orders/${params.changeId}${stringify(params, { addQueryPrefix: true })}`
  );
}

// 获取流程信息
export async function getProgressInfo(params) {
  return request(`${prefix}/deviation-orders/${params}/progress`);
}

// 获取记录信息
export async function getRecordInfo(params) {
  return request(`${prefix}/deviation-orders/${params}/record`);
}
// 更改记录 -改前
export async function getDeviationBefore(params) {
  return request(`${prefix}/deviation-records/${params}/befores`);
}
// 更改记录 -改后
export async function getDeviationAfter(params) {
  return request(`${prefix}/deviation-records/${params}/afters`);
}
// 获取相关数据
export async function getRelatedData(params) {
  return request(`${prefix}/deviation-orders/${params.id}/${params.type}s`);
}
// 添加 相关连对象
export async function addRelated(params) {
  return request(`${prefix}/deviation-orders/${params.id}/${params.objectType.toLowerCase()}s`, {
    method: 'POST',
    data: params.data,
  });
}

// 相关连对象
export async function deleteReData(params) {
  return request(`${prefix}/deviation-orders/${params.id}/${params.objectType.toLowerCase()}s`, {
    method: 'PUT',
    data: params.data,
  });
}
// 移除数据偏离前后数据
export async function removeDatas(params) {
  return request(`${prefix}/deviation-orders/${params.id}/${params.type}`, {
    method: 'PUT',
    data: params.data,
  });
}
// 删除
export async function deleteOrder(params) {
  return request(
    `${prefix}/deviation-orders/${params.changeId}${stringify(params, { addQueryPrefix: true })}`,
    { method: 'DELETE' }
  );
}

// 提交审批
export async function submitReview(params) {
  return request(`${prefix}/deviation-orders/processes`, {
    method: 'POST',
    data: params,
  });
}

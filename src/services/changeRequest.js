import { stringify } from 'qs';
import { request } from '@cpdm/util';

const prefix = '/change';

// 更改请求列表
export async function list(params) {
  return request(`${prefix}/change-requests?${stringify(params)}`);
}
// 创建更改请求
export async function create(params) {
  return request(`${prefix}/change-requests`, {
    method: 'POST',
    data: params,
  });
}
// 编辑更改请求
export async function editChangeRequest(params) {
  return request(`${prefix}/change-requests/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}
// 删除更改请求
export async function deleteChangeRequest(params) {
  return request(`${prefix}/change-requests/${params}`, {
    method: 'DELETE',
  });
}
// 基线设置所有者
export async function setChangeRequestOwner(params) {
  return request(`${prefix}/change-requests/${params.orderId}/owner`, {
    method: 'PUT',
    data: params.ownerId,
  });
}
// 获取基本信息
export async function getBasicInfo(params) {
  return request(
    `${prefix}/change-requests/${params.id}${stringify(params, { addQueryPrefix: true })}`
  );
}
// 启动流程
export async function startProcess(params) {
  return request(`${prefix}/change-request/${params.id}/processes`);
}
// 获取流程数据
export async function getProgressInfo(params) {
  return request(`${prefix}/change-requests/${params}/progress`);
}
// 获取签审记录
export async function getRecordInfo(params) {
  return request(`${prefix}/change-requests/${params}/records`);
}
// 获取更改记录
export async function getChangeRequestRecords(params) {
  return request(`${prefix}/change-requests/${params}/data`);
}
// 移除受影响数据
export async function deleteChangeRequestRecords(params) {
  return request(`${prefix}/change-requests/${params.changeRequestId}/data`, {
    method: 'PUT',
    data: params.changeRequestRecords,
  });
}
// 添加受影响
export async function addChangeRequestRecords(params) {
  return request(`${prefix}/change-requests/${params.changeRequestId}/data`, {
    method: 'POST',
    data: params.changeRequestRecords,
  });
}
// 相关数据
export async function getRelatedData(params) {
  return request(`${prefix}/change-requests/${params.id}/${params.type}s`);
}
// 获取下拉选项
export async function getCommonData() {
  return request(`${prefix}/change-common-data`);
}
// 获取下拉选项
export async function getCategories() {
  return request(`/admin/categories/identifier/com.casic.cpdm.request.entity.ChangeRequest`);
}
// 添加 相关连对象
export async function addRelated(params) {
  return request(`${prefix}/change-requests/${params.id}/${params.objectType.toLowerCase()}s`, {
    method: 'POST',
    data: params.data,
  });
}
// 移除 相关连对象
export async function deleteReData(params) {
  return request(`${prefix}/change-requests/${params.id}/${params.objectType.toLowerCase()}s`, {
    method: 'PUT',
    data: params.data,
  });
}

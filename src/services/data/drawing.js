import { stringify } from 'qs';
import { request } from '@cpdm/util';

const prefix = '/cpdm';
const bomPrefix = '/bom';

// 创作程序
export async function apps() {
  return request(`${prefix}/drawings/authoring-apps`);
}

// 模型表现形式
export async function doctypes() {
  return request(`${prefix}/drawings/doc-types`);
}

// 模型列表
export async function list(params) {
  return request(`${prefix}/drawings${stringify(params, { addQueryPrefix: true })}`);
}

// 列表操作按钮
export async function listActions() {
  return request(`${bomPrefix}/cad-docs/button-action`);
}

// 模型详情
export async function get({ id, objectType }) {
  return request(`${bomPrefix}/cad-docs/${id}?objectType=${objectType}`);
}

// 创建模型
export async function create(form) {
  return request(`${bomPrefix}/cad-docs`, { method: 'POST', data: form });
}

// 编辑模型
export async function edit({ id, form }) {
  return request(`${prefix}/drawings/${id}`, { method: 'PUT', data: form });
}

// 重设模型
export async function reset({ id, form }) {
  return request(`${prefix}/drawings/${id}/rename`, { method: 'PUT', data: form });
}

// 检入模型
export async function checkin(form) {
  return request(`${bomPrefix}/cad-docs/checkin`, { method: 'POST', data: form });
}

// 检出模型
export async function checkout({ data, params }) {
  return request(`${bomPrefix}/cad-docs/checkout${stringify(params, { addQueryPrefix: true })}`, {
    method: 'POST',
    data,
  });
}

// 撤销检出模型
export async function revokeCheckout({ id }) {
  return request(`${prefix}/drawings/${id}/revoke-checkout`, { method: 'PUT' });
}

// 修订模型
export async function revise({ id }) {
  return request(`${prefix}/drawings/${id}/revise`, { method: 'PUT' });
}
export async function review(params) {
  console.log('params', params);
  return request(`${bomPrefix}/cad-docs/processes`, {
    method: 'POST',
    data: params,
  });
}

// 跳转原始版本
export async function original({ id, objectType }) {
  return request(`${bomPrefix}/iterates/${objectType}/${id}/origin`);
}

// 跳转工作副本
export async function pwc(id, objectType) {
  return request(`${bomPrefix}/iterates/${objectType}/${id}/working`);
}

export async function goToLatest({ id, objectType }) {
  return request(`${bomPrefix}/iterates/${objectType}/${id}/goToLatest`);
}

// 删除模型
export async function drawingDelete(id, params, data) {
  return request(`${bomPrefix}/cad-docs/${id}${stringify(params, { addQueryPrefix: true })}`, {
    method: 'DELETE',
    data,
  });
}

// 设置生命周期状态
export async function setLifecycle({ id, state }) {
  return request(`${prefix}/drawings/${id}/rename`, { method: 'PUT', data: state });
}

// 下级
export async function subDrawing(id, query) {
  return request(
    `${bomPrefix}/cad-docs/${id}/sub-cad-docs${stringify(query, { addQueryPrefix: true })}`,
  );
}

// 使用情况
export async function useageDrawings({ id, query }) {
  return request(
    `${bomPrefix}/cad-docs/${id}/parent-cad-docs${stringify(query, { addQueryPrefix: true })}`,
  );
}

// CAD文档master信息
export async function getBasicMasterInfo(params) {
  return request(`${prefix}/${params.objectType.toLowerCase()}-master/${params.masterId}`);
}
// CAD基本信息、业务信息
export async function getBasicInfo(params) {
  return request(`${prefix}/drawings/${params}`);
}

// CAD详情 流程信息
export async function getProgressInfo(params) {
  return request(`${prefix}/drawings/${params}/progress`);
}

// CAD详情 记录信息
export async function getRecordInfo(params) {
  return request(`${prefix}/drawings/${params}/records`);
}
// CAD详情 历史版本
export async function getHistoryInfo(params) {
  return request(`${prefix}/drawings/${params}/history`);
}
// CAD相关数据
export async function getRelatedData(params) {
  return request(`${prefix}/drawings/${params.id}/${params.type}s`);
}
// CAD设置所有者
export async function setDrawingOwner(params) {
  return request(`${prefix}/drawings/${params.drawingId}/owner`, {
    method: 'PUT',
    body: params.ownerId,
  });
}
// CAD结构信息
export async function getSubDrawings(params) {
  return request(`${prefix}/drawings/${params}/subDrawings`);
}
// CAD使用情况
export async function getUsage(params) {
  return request(
    `${prefix}/drawings/${params.nodeId}/use${stringify(params.arguments, {
      addQueryPrefix: true,
    })}`,
  );
}
// 添加CAD 相关连对象
export async function addRelated(params) {
  return request(`${prefix}/drawings/${params.id}/${params.objectType.toLowerCase()}s`, {
    method: 'POST',
    body: params.data,
  });
}
// 移除CAD 相关连对象
export async function deleteReData(params) {
  return request(`${prefix}/drawings/${params.id}/${params.objectType.toLowerCase()}s`, {
    method: 'PUT',
    body: params.data,
  });
}
// 删除CAD
export async function deleteDrawing(params) {
  return request(`${prefix}/drawings/${params.id}`, {
    method: 'DELETE',
    params: {
      mode: params.dataType,
    },
  });
}
// 检出CAD
export async function checkoutDrawing(params) {
  return request(`${prefix}/drawings/${params}/checkout`);
}
// 检入CAD
export async function checkinDrawing(params) {
  return request(`${prefix}/drawings/${params.id}/checkin`, {
    method: 'POST',
    body: params,
  });
}
// 撤销检出CAD
export async function undocheckoutDrawing(params) {
  return request(`${prefix}/drawings/${params}/undo`);
}
// 修订CAD
export async function reviseDrawing(params) {
  return request(`${prefix}/drawings/${params}/revise`);
}
// 跳转至最新版本
export async function getNewestDocument(params) {
  return request(`${prefix}/drawings/${params.id}?mode=${params.mode}`);
}
// 提交签审
export async function submitReview(params) {
  return request(`${prefix}/drawings/${params.drawingId}/processes`, {
    method: 'POST',
  });
}

// 获取视图id-可视化预览id
export async function getViewId(params) {
  return request(
    `${bomPrefix}/cad-docs/${params.drawingId}/view-json-file-id?objectType=${params.objectType}`,
  );
}

// 获取模型关联数据（删除前获取）
export async function getRelations(params) {
  return request(`${bomPrefix}/cad-docs/${params.drawingId}/cad-datas`);
}

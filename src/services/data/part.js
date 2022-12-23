import { stringify } from 'qs';
import { request } from '@cpdm/util';

const prefix = '/cpdm';
const bomPrefix = '/bom';

// 部件列表
export async function list(params) {
  return request(`${prefix}/parts${stringify(params, { addQueryPrefix: true })}`);
}

// 部件详情
export async function get({ id, query }) {
  return request(`${bomPrefix}/common-parts/${id}${stringify(query, { addQueryPrefix: true })}`);
}

// 创建部件
export async function create(form) {
  return request(`${prefix}/parts`, { method: 'POST', data: form });
}

// 编辑部件
export async function edit({ id, form }) {
  return request(`${prefix}/parts/${id}`, { method: 'PUT', data: form });
}

// 重设部件
export async function reset({ id, form }) {
  return request(`${prefix}/parts/${id}/rename`, { method: 'PUT', data: form });
}

// 检入部件
export async function checkin({ id, form = {} }) {
  return request(`${prefix}/parts/${id}/checkin`, { method: 'PUT', data: form });
}

// 检出部件
export async function checkout({ id }) {
  return request(`${prefix}/parts/${id}/checkout`, { method: 'PUT' });
}

// 撤销检出部件
export async function revokeCheckout({ id }) {
  return request(`${prefix}/parts/${id}/revoke-checkout`, { method: 'PUT' });
}

// 修订部件
export async function revise({ id }) {
  return request(`${prefix}/parts/${id}/revise`, { method: 'PUT' });
}

// 跳转原始版本
export async function original({ id }) {
  return request(`${prefix}/parts/${id}/original`);
}

// 跳转工作副本
export async function pwc({ id }) {
  return request(`${prefix}/parts/${id}/pwc`);
}

// 删除部件
export async function remove({ id, mode }) {
  return request(`${prefix}/parts/${id}${stringify({ mode }, { addQueryPrefix: true })}`, {
    method: 'DELETE',
  });
}

// 设置生命周期状态
export async function setLifecycle({ id, state }) {
  return request(`${prefix}/parts/${id}/rename`, { method: 'PUT', data: state });
}

// 部件重命名
export async function rename({ id, form }) {
  return request(`${prefix}/parts/${id}/rename`, {
    method: 'PUT',
    data: form,
  });
}

// 部件master信息
export async function getBasicMasterInfo(params) {
  return request(`${prefix}/${params.objectType.toLowerCase()}-master/${params.masterId}`);
}

// 部件基本信息、业务信息
export async function getBasicInfo(params) {
  return request(`${prefix}/parts/${params}`);
}

// 部件详情 流程信息
export async function getProgressInfo(params) {
  return request(`${prefix}/parts/${params}/progress`);
}

// 部件详情 记录信息
export async function getRecordInfo(params) {
  return request(`${prefix}/parts/${params}/records`);
}
// 部件相关数据
export async function getRelatedData(params) {
  return request(`${prefix}/parts/${params.id}/${params.type}s`);
}
// 部件设置所有者
export async function setPartOwner(params) {
  return request(`${prefix}/parts/${params.partId}/owner`, {
    method: 'PUT',
    data: params.ownerId,
  });
}
// 添加部件 相关连对象
export async function addRelated(params) {
  return request(`${prefix}/parts/${params.id}/${params.objectType.toLowerCase()}s`, {
    method: 'POST',
    data: params.data,
  });
}
// 移除部件 相关连对象
export async function deleteReData(params) {
  return request(`${prefix}/parts/${params.id}/${params.objectType.toLowerCase()}s`, {
    method: 'PUT',
    data: params.data,
  });
}
// 部件详情 历史版本
export async function getHistoryInfo(params) {
  return request(`${prefix}/parts/${params}/history`);
}
// 获取下级部件结构
export async function getSubparts(params) {
  return request(`${prefix}/parts/structure${stringify(params, { addQueryPrefix: true })}`);
}
// 移除部件使用关系
export async function removePartSubparts(params) {
  return request(`${prefix}/parts/structure`, {
    method: 'PUT',
    data: params,
  });
}
// 使用情况
export async function getUsage(params) {
  return request(
    `${prefix}/parts/${params.nodeId}/use${stringify(params.arguments, {
      addQueryPrefix: true,
    })}`
  );
}
// 插入节点
export async function insetSubParts(params) {
  return request(`${prefix}/parts/structure/${params.partId}`, {
    method: 'POST',
    data: params.data,
  });
}
// 编辑节点
export async function editPartNode(params) {
  return request(`${prefix}/parts/${params.partId}/subparts`, {
    method: 'PUT',
    data: params.formValue,
  });
}
// 部件结构信息
export async function getInsertPartsStructureList(params) {
  return request(`${prefix}/parts/tenant${stringify(params, { addQueryPrefix: true })}`);
}
// 部件详情 相关数据 根据切换tab加载数据
export async function getReleted(params) {
  return request(`${prefix}/parts/${params.id}/${params.tabValue}`);
}

// 获取 删除数据时关联数据
export async function getDeleteData(params) {
  return request(`${prefix}/parts/${params.id}/delete/${params.dataType}`);
}

// 删除部件
export async function deletePart(params) {
  return request(`${prefix}/parts/${params.id}`, {
    method: 'DELETE',
    params: {
      mode: params.dataType,
    },
  });
}

// 获取武器系统节点
export async function getDesignPart(params) {
  return request(`${prefix}/parts/design${stringify(params, { addQueryPrefix: true })}`);
}
// 检出
export async function checkoutPart(params) {
  return request(`${prefix}/parts/${params}/checkout`);
}
// 检入
export async function checkinPart(params) {
  return request(`${prefix}/parts/${params.id}/checkin`, {
    method: 'POST',
    data: params,
  });
}
// 撤销检出
export async function undocheckoutPart(params) {
  return request(`${prefix}/parts/${params}/undo`);
}
// 修订
export async function revisePart(params) {
  return request(`${prefix}/parts/${params}/revise`);
}
// 跳转至最新版本
export async function getNewestPart(params) {
  return request(`${prefix}/parts/${params.id}?mode=${params.mode}`);
}
// 提交签审
export async function submitReview(params) {
  return request(`${prefix}/parts/${params.partId}/processes`, {
    method: 'POST',
  });
}
// 创建下游分支时 加载文件夹列表
export async function loadFolderTree(params) {
  return request(`${prefix}/folders/tree?${stringify(params)}`);
}
// 新建视图分支
export async function createViewBranch(params) {
  return request(`${prefix}/parts/${params.partId}/view`, {
    method: 'POST',
    data: params,
  });
}
// 获取下一视图的数据
export async function getViewData(params) {
  return request(`${prefix}/parts/${params.id}/view?view=${params.view}`);
}

//  BOM比较
export async function getRoot({ partId, query }) {
  return request(
    `/api/statistics/models/structure-compare/${partId}${stringify(query, {
      addQueryPrefix: true,
    })}`
  );
}
export async function getNode(params) {
  return request(
    `/api/statistics/models/structure-compare/children${stringify(params, {
      addQueryPrefix: true,
    })}`
  );
}

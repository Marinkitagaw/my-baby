import { stringify } from 'qs';
import { request } from '@cpdm/util';

const prefix = '/cpdm';
const prefixBom = '/bom';

// 文档列表
export async function list(params) {
  return request(`${prefix}/documents${stringify(params, { addQueryPrefix: true })}`);
}

// 文档详情
export async function get({ id }) {
  return request(`${prefix}/documents/${id}`);
}

export async function getDocPrimaryContent({ id, objectType }) {
  return request(`${prefixBom}/common-docs/${id}/primary?objectType=${objectType}`);
}

// 创建文档
export async function create(form) {
  return request(`${prefixBom}/common-docs/bulk`, { method: 'POST', data: form });
}
export async function setUploadData(params) {
  return request(`${prefixBom}/documents/conversion`, { method: 'PUT', data: params.datas });
}
export async function queryCurrent() {
  return request('/user_info');
}
// 编辑文档
export async function edit({ id, form }) {
  return request(`${prefix}/documents/${id}`, { method: 'PUT', data: form });
}

// 删除文档
export async function deleteList({ mode, data }) {
  return request(`${prefixBom}/common-docs?mode=${mode}`, { method: 'DElETE', data });
}

// 重设文档
export async function reset({ id, form }) {
  return request(`${prefix}/documents/${id}/rename`, { method: 'PUT', data: form });
}

// 检入文档
export async function checkin({ id, form = {} }) {
  return request(`${prefix}/documents/${id}/checkin`, { method: 'PUT', data: form });
}

// 检出文档
export async function checkout({ id }) {
  return request(`${prefix}/documents/${id}/checkout`, { method: 'PUT' });
}

// 撤销检出文档
export async function revokeCheckout({ id }) {
  return request(`${prefix}/documents/${id}/revoke-checkout`, { method: 'PUT' });
}

// 修订文档
export async function revise({ id }) {
  return request(`${prefix}/documents/${id}/revise`, { method: 'PUT' });
}

// 提交签审
export async function review(params) {
  return request(`${prefix}/documents/review`, {
    method: 'POST',
    data: params,
  });
}

// 跳转原始版本
export async function original({ id }) {
  return request(`${prefix}/documents/${id}/original`);
}

// 跳转工作副本
export async function pwc({ id }) {
  return request(`${prefix}/documents/${id}/pwc`);
}

// 重命名
export async function rename({ id, form }) {
  return request(`${prefix}/documents/${id}/rename`, { method: 'PUT', data: form });
}

// 删除文档
export async function remove({ id, mode }) {
  return request(`${prefix}/documents/${id}${stringify({ mode }, { addQueryPrefix: true })}`, {
    method: 'DELETE',
  });
}

// 设置生命周期状态
export async function setLifecycle({ id, state }) {
  return request(`${prefix}/documents/${id}/rename`, { method: 'PUT', data: state });
}

// 获取研制阶段下阶段状态值
export async function getPhaseTechnicalStatus(params) {
  return request(`${prefix}/container/${params}/technical-state/enums`);
}

// 文档master信息
export async function getBasicMasterInfo(params) {
  return request(`${prefix}/${params.objectType.toLowerCase()}-master/${params.masterId}`);
}
// 文档基本信息、业务信息
export async function getBasicInfo(params) {
  return request(`${prefix}/documents/${params}`);
}

// 文档详情 流程信息
export async function getProgressInfo(params) {
  return request(`${prefix}/review-data/object${stringify(params, { addQueryPrefix: true })}`);
}

// 文档详情 记录信息
export async function getRecordInfo(params) {
  return request(`${prefix}/documents/${params}/records`);
}
// 文档详情 记录信息
export async function getHistoryInfo(params) {
  return request(`${prefix}/documents/${params}/history`);
}
// 文档相关数据
export async function getRelatedData(params) {
  return request(`${prefix}/documents/${params.id}/${params.type}s`);
}
// 文档设置所有者
export async function setDocumentOwner(params) {
  return request(`${prefix}/documents/${params.documentId}/owner`, {
    method: 'PUT',
    data: params.ownerId,
  });
}
// 文档部件 相关连对象
export async function addRelated(params) {
  return request(`${prefix}/documents/${params.id}/${params.objectType.toLowerCase()}s`, {
    method: 'POST',
    data: params.data,
  });
}
// 移除文档 相关连对象
export async function deleteReData(params) {
  return request(`${prefix}/documents/${params.id}/${params.objectType.toLowerCase()}s`, {
    method: 'PUT',
    data: params.data,
  });
}

export async function getDocDeleteData(params) {
  return request(`${prefix}/document/${params.id}/delete/${params.dataType}`);
}
export async function deleteDoc(params) {
  return request(`${prefix}/documents/${params.id}`, {
    method: 'DELETE',
    params: {
      mode: params.dataType,
    },
  });
}
export async function deleteDocmentContents(params) {
  return request(`${prefix}/delete/${params.documentId}/content/${params.contentItemId}`, {
    method: 'DELETE',
  });
}
export async function checkoutDocument(params) {
  return request(`${prefix}/documents/${params}/checkout`);
}
export async function checkinDocument(params) {
  return request(`${prefix}/documents/${params.id}/checkin`, {
    method: 'POST',
    data: params,
  });
}
export async function undocheckoutDocument(params) {
  return request(`${prefix}/documents/${params}/undo`);
}
export async function reviseDocument(params) {
  return request(`${prefix}/documents/${params}/revise`);
}
export async function getNewestDocument(params) {
  return request(`${prefix}/documents/${params.id}?mode=${params.mode}`);
}

export async function submitReview(params) {
  return request(`${prefix}/documents/${params.documentId}/processes`, {
    method: 'POST',
  });
}
// 获取流程数据
export async function getProcessData(params) {
  return request(`/change/process-instance/${params}/data-packet`);
}

// 添加文档流程数据
export async function addProcessData({ processInstanceId, documentIds }) {
  return request(`${prefixBom}/process-instance/${processInstanceId}/data-packet`, {
    method: 'POST',
    data: documentIds,
  });
}

// 移除文档流程数据
export async function removeProcessData({ processInstanceId, documentIds }) {
  return request(`${prefixBom}/process-instance/${processInstanceId}/data-packet`, {
    method: 'PUT',
    data: documentIds,
  });
}

// 关联部件
export async function associatePart(params) {
  return request(`${prefix}/relationship/source/${params}?sourceType=Document&targetType=Part`);
}

// 相关流程 process
export async function process(params) {
  return request(`${prefix}/documents/${params}/process`);
}
// 相关流程 process
export async function listProccessInstance(params) {
  //  /documents/{documentId}/process-instances
  return request(`${prefix}/documents/${params}/process-instances`);
}
// 设置接收单位
export async function setSendUnit(params) {
  return request(`${prefix}/review-data-send?processInstanceId=${params.processInstanceId}`, {
    method: 'PUT',
    data: params.values,
  });
}
// 获取接收单位
export async function getReviewDataSend(params) {
  return request(`${prefix}/review-data-send${stringify(params, { addQueryPrefix: true })}`);
}

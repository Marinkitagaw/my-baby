import { request } from '@cpdm/util';
import { stringify } from 'qs';

const prefix = '/change';
const cpdmPrefix = '/cpdm';
const adminPrefix = '/admin';

// 获取类型树
export async function getCategoryTree() {
  return request(`${adminPrefix}/categories?showAsTree=true`);
}

// 获取状态列表
export async function getStateList() {
  return request(`${adminPrefix}/lifecycle-states?size=999`);
}

// 列表
export async function list(params) {
  return request(`${prefix}/change-orders?${stringify(params)}`);
}

// 在线追踪列表
export async function listProcess(params) {
  return request(`${prefix}/process-tracking?${stringify(params)}`);
}

// 在线追踪详细信息
export async function processInfo(id) {
  return request(`/api/change-orders/${id}`);
}

// 在线追踪状态
export async function processState(param) {
  return request(`${prefix}/process-tracking/${param.id}/state?code=${param.stateCode}`);
}

// 在线追踪
export async function processList(id) {
  return request(`/api/change-orders/${id}`);
}

// 获取流程追踪 闭环
export async function processTrackCloseloop({ id, code }) {
  return request(`/api/closed-loop/${id}?changeOrderCode=${code}`);
}

// 获取流程追踪 阶段
export async function processTrackPhase(id) {
  return request(`/api/change-orders/${id}/process-phase`);
}

export async function processPackages(params) {
  return request(`/api/change-orders/${params.id}/exchange-data-packages?type=${params.type}`);
}

// 获取流程追踪 协同数据包历史记录
export async function processPackagesHistory(remoteId) {
  return request(`/api/collaboration/data-packages/${remoteId}/history`);
}

// 获取工具栏
export async function getToolbar(params) {
  return request(`${prefix}/change-orders/toolbars${stringify(params, { addQueryPrefix: true })}`);
}

// 创建
export async function create(params) {
  return request(`${prefix}/common-change-order`, {
    method: 'POST',
    data: params,
  });
}

// 编辑
export async function edit(params) {
  return request(`${prefix}/common-change-order/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}

// 删除
export async function deleteOrder(params) {
  return request(
    `${prefix}/common-change-order/${params.id}${stringify(params, {
      addQueryPrefix: true,
    })}`,
    {
      method: 'DELETE',
    },
  );
}

// 更改单设置所有者
export async function setChangeOrderOwner(params) {
  return request(`${prefix}/change-orders/${params.orderId}/owner`, {
    method: 'PUT',
    data: params.ownerId,
  });
}

// 获取枚举值
export async function getAttrValue(params) {
  if (params) {
    return request(`${prefix}/change-orders/${params}/forms`);
  }
  return request(`${prefix}/change-orders/create/forms`);
}
export async function getRecordsReversion(params) {
  return request(
    `${cpdmPrefix}/items/${params.id}/${params.versionType}-revisions${stringify(params.arguments, {
      addQueryPrefix: true,
    })}`,
  );
}
export async function getBasicInfo(params) {
  return request(
    `${prefix}/common-change-order/${params.changeId}${stringify(params, {
      addQueryPrefix: true,
    })}`,
  );
}
// 更改记录
export async function getChangeOrderRecords(params) {
  return request(`${prefix}/change-records/${params}`);
}
// 更改记录 -改前
export async function getChangeOrderBefore(params) {
  return request(`${prefix}/change-records/${params}/befores`);
}
// 更改记录 -改后
export async function getChangeOrderAfter(params) {
  return request(`${prefix}/change-records/${params}/afters`);
}
// 获取流程信息
export async function getProgressInfo(params) {
  return request(`${prefix}/change-orders/${params}/progress`);
}
// 获取签审记录
export async function getRecordInfo(params) {
  return request(`${prefix}/change-orders/${params}/record`);
}
// 相关数据
export async function getRelatedData(params) {
  return request(`${prefix}/change-orders/${params.id}/${params.type}s`);
}
// 文档部件 相关连对象
export async function addRelated(params) {
  return request(`${prefix}/change-orders/${params.id}/${params.objectType.toLowerCase()}s`, {
    method: 'POST',
    data: params.data,
  });
}
// 批量修订改前数据
export async function reviseBeforeData(params) {
  return request(`${prefix}/change-orders/revise`, {
    method: 'POST',
    data: params,
  });
}
// 移除文档 相关连对象
export async function deleteReData(params) {
  return request(`${prefix}/change-orders/${params.id}/${params.objectType.toLowerCase()}s`, {
    method: 'PUT',
    data: params.data,
  });
}
// 获取下拉选项
export async function getCommonData() {
  return request(`${prefix}/change-common-data`);
}

// 获取更改类别
export async function getMethods() {
  return request(`${prefix}/common-change-order/methods`);
}

// 获取已选相关数据的改前版本
export async function getBeforeRevisions(params) {
  return request(
    `${prefix}/common-change-order/${params.objectId}/before-revisions${stringify(params, {
      addQueryPrefix: true,
    })}`,
  );
}

// 获取已选相关数据的改后版本
export async function getAfterRevisions(params) {
  return request(
    `${prefix}/common-change-order/${params.objectId}/after-revisions${stringify(params, {
      addQueryPrefix: true,
    })}`,
  );
}

// 获取已选相关数据的改后版本
export async function submitReview(params) {
  return request(`${prefix}/common-change-order/processes`, {
    method: 'POST',
    data: params,
  });
}

// 获取更改单流程实例
export async function getChangeProcesses(params) {
  return request(
    `${prefix}/common-change-order/${params.changeId}/processes${stringify(params, {
      addQueryPrefix: true,
    })}`,
  );
}

// 获取更改单流程实例
export async function ChangeOrderProcesses(id, objectType) {
  return request(`${prefix}/common-change-order/${id}/processes?objectType=${objectType}`);
}

// 获取关联更改请求
export async function getChangeRequest(params) {
  return request(
    `${prefix}/common-change-order/${params.changeOrderId}/change-requests?objectType=${params.objectType}`,
  );
}

import { stringify } from 'qs';
import { request } from '@cpdm/util';

// const prefix = '/cpdm';
const prefix = '/bom';
const bomPrefix = '/bom';

/**
 * 基线
 */

// 分页列表
export async function list(params) {
  return request(`${bomPrefix}/baselines?${stringify(params)}`);
}
// 不分页列表
export async function baselineList(params) {
  return request(`${bomPrefix}/baselines-list/${params.partId}?type=${params.type}`);
}
// 创建
export async function create(params) {
  return request(`${bomPrefix}/baselines`, {
    method: 'POST',
    data: params,
  });
}

// 编辑
export async function edit(params) {
  return request(`${bomPrefix}/baselines/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}

// 表单选项值
export async function getFormAttrValue(params) {
  if (params) {
    return request(`${prefix}/baselines/${params}/forms`);
  }
  return request(`${prefix}/baselines/create/forms`);
}

// 获取基本信息
export async function getBasicInfo(params) {
  return request(`${bomPrefix}/baselines/${params}`);
}

// 获取流程信息
export async function baselineProgress(id, objectType) {
  return request(`${prefix}/baselines/${id}/processes?objectType=${objectType}`);
}

// 获取记录信息
export async function getRecordInfo(params) {
  return request(`${prefix}/baselines/${params}/record`);
}
// 获取基线关联数据
export async function getBaselineMember(params) {
  return request(`${bomPrefix}/baselines/${params}/items`);
}
export async function getBaselineMembers(params) {
  return request(`${bomPrefix}/baselines/${params}/data-packet`);
}

// 删除基线
export async function deleteBaseline(id) {
  return request(`${bomPrefix}/baselines/${id}`, { method: 'DELETE' });
}
// 基线设置所有者
export async function setBaselineOwner(params) {
  return request(`${prefix}/baselines/${params.baselineId}/owner`, {
    method: 'PUT',
    data: params.ownerId,
  });
}
// 移除基线挂链数据
export async function deleteMembers(params) {
  return request(`${bomPrefix}/baselines/${params.baselineId}/items`, {
    method: 'PUT',
    data: params.baselineLinks,
  });
}
// 添加基线关联对象
export async function addMembers(params) {
  return request(`${bomPrefix}/baselines/${params.baselineId}/items`, {
    method: 'POST',
    data: params.memebers,
  });
}

// 基线合并
export async function mergeBaseline(params) {
  return request(`${bomPrefix}/baselines/merge`, {
    method: 'POST',
    data: params,
  });
}

export async function compareBaseline(params) {
  return request(`${bomPrefix}/baselines/compare`, {
    method: 'POST',
    data: params,
  });
}

// 提交审批、提交冻结审批、提交解冻审批
export async function processBaselines(params) {
  return request(`${bomPrefix}/baselines/${params.baselineId}/process?type=${params.type}`, {
    method: 'POST',
    data: params,
  });
}

// 重置生命周期状态
export async function resetBaselineState(params) {
  return request(`${bomPrefix}/baselines/${params.baselineId}/state?state=${params.state}`, {
    method: 'PUT',
    data: params,
  });
}
// // 提交冻结审批
// export async function freezeBaselines(params) {
//   return request(`${bomPrefix}/baselines/${params.baselineId}/freeze`, {
//     method: 'POST',
//     data: params,
//   });
// }
// // 提交解冻审批
// export async function unfreezeBaselines(params) {
//   return request(`${bomPrefix}/baselines/${params.baselineId}/state?state=${params.state}`, {
//     method: 'PUT',
//     data: params,
//   });
// }

// 合并预览
export async function previewBaselines(params) {
  return request(`${prefix}/baselines/merge/preview`, {
    method: 'POST',
    data: params,
  });
}

// 获取基线成员
export async function getBaselineSource({ baselineId }) {
  return request(`${bomPrefix}/baselines/${baselineId}/source`);
}

// 添加基线成员
export async function addBaselineSource(baselineId, params) {
  return request(`${bomPrefix}/baselines/${baselineId}/items`, {
    method: 'POST',
    data: params,
  });
}

// 移除基线成员
export async function removeBaselineSource(baselineId, params) {
  return request(`${bomPrefix}/baselines/${baselineId}/items`, {
    method: 'PUT',
    data: params,
  });
}

// 获取基线成员树表
export async function getBaselineItemsTree({ baselineId }) {
  return request(`${prefix}/baselines/${baselineId}/items-tree`);
}

// 设置顶层节点
export async function setTopNode({ baselineId, baselineItemIds }) {
  return request(`${prefix}/baselines/${baselineId}/items/top`, {
    method: 'POST',
    data: baselineItemIds,
  });
}

// 检入
export async function checkinBaseline(param) {
  return request(`/bom/iterates/check-in`, {
    method: 'POST',
    data: param,
  });
}

// 检出
export async function checkoutBaseline(param) {
  return request(`/bom/iterates/check-out`, {
    method: 'POST',
    data: param,
  });
}

// 撤销检出
export async function undoCheckoutBaseline(param) {
  return request(`/bom/iterates/undo-checkou`, {
    method: 'POST',
    data: param,
  });
}
// 基线概览
export async function getOverview(params) {
  return request(`/bom/baselines/statistics${stringify(params, { addQueryPrefix: true })}`);
}

export async function unfrozenBaseline() {
  return request('/bom/baselines/statistics/freeze');
}

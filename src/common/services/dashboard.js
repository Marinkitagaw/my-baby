import { request } from '@cpdm/util';

const prefix = '/resource';

// 基础资源统计信息 (Material，StandardPart，Component)
// export async function getResourceSummary(type) {
//   return request(`${prefix}/resources/statistics?identifier=${type}`);
// }
// 获取关系对象
export async function getApplyRelation(params) {
  return request(`${prefix}/applys/relation/${params}`);
}

// 更改单总览
export async function changeOrder() {
  return request(`/change/change-notices/overview`);
}

// 偏离单总览
export async function varianceOrder() {
  return request(`/change/variance-notices/overview`);
}

// 技术通知单总览
export async function technicalOrder() {
  return request(`/change/technical-notices/overview`);
}

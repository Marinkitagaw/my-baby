import { request } from '@cpdm/util';
import { stringify } from 'qs';
const prefix = '/resource';

// // 基础资源统计信息 (Material，StandardPart，Component)
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
//获取总览图表数据
export async function getDashboard() {
  return request(`/siyuan/apps/statistics/sort`);
}
// 获取通知
export async function getNoticeData(params) {
  return request(
    `/siyuan/app/statistics/process/notice${stringify(params, { addQueryPrefix: true })}`
  );
}

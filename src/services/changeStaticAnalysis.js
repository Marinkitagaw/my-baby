// ========更改偏离统计============
import { stringify } from 'qs';
import { request } from '@cpdm/util';

const prefix = '/change';

// 全型号统计分析
export async function loadSeriesState(params) {
  return request(`${prefix}/changeorders?${stringify(params)}`);
}

export async function loadCoordData(params) {
  return request(`${prefix}/changeorders?${stringify(params)}`);
}

// 更改单统计分析
export async function changeOrderStaticList(params) {
  return request(`${prefix}/changeorders?${stringify(params)}`);
}

// 更改单月报
export async function changeOrderMonthList(params) {
  return request(`${prefix}/changeorders?${stringify(params)}`);
}

// 技术通知单
export async function techStaticList(params) {
  return request(
    `${prefix}/technical-notices/statistic-attribute${stringify(params, { addQueryPrefix: true })}`,
  );
}
export async function techStaticReview(params) {
  return request(`${prefix}/technical-notices/review?${stringify(params)}`);
}

export async function subSystemData(params) {
  return request(`${prefix}/technical-notices/statistic-subSystemType?${stringify(params)}`);
}

export async function deviationReasonData(params) {
  return request(`${prefix}/technical-notices/statistic-deviationReason?${stringify(params)}`);
}

export async function statisticByPhaseMark(params) {
  return request(`${prefix}/technical-notices/statistic-phaseMark?${stringify(params)}`);
}

// 任务单
export async function assignStaticList(params) {
  return request(`${prefix}/assignment-order/statistic-attribute?${stringify(params)}`);
}
export async function getLifecyclestates() {
  return request(`${prefix}/assignment-orders/state`);
}
export async function assignmentStaticReview(params) {
  return request(`${prefix}/assignment-order/review?${stringify(params)}`);
}

export async function productTypeData(params) {
  return request(`${prefix}/changeorders?${stringify(params)}`);
}

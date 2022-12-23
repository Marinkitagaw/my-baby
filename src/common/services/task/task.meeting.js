import { stringify } from 'qs';
import { request } from '@cpdm/util';

const prefix = '/meeting';

// 在线评审任务

// 任务列表
export async function listTasks(params) {
  return request(`${prefix}/review-orders/tasks${stringify(params, { addQueryPrefix: true })}`);
}

// 任务详情
export async function getTask(params) {
  return request(`${prefix}/review-orders/tasks/${params}`);
}

// 完成任务
export async function completeTask(params) {
  return request(`${prefix}/review-orders/tasks/${params}/complete`, {
    method: 'PUT',
    data: params,
  });
}
// 获取流程数据
export async function getProcessData(params) {
  return request(`${prefix}/review-orders/tasks/${params}/process`);
}

// 获取关系对象
export async function getReviewOrderRelation(params) {
  return request(`${prefix}/review-orders/relation/${params}`);
}

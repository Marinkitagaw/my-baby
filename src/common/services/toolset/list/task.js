import { stringify } from 'qs';
import { request } from '@cpdm/util';

const workflow = '/workflow';
const prefix = '/siyuan';

// 流程及任务
// 任务列表
export async function listTasks(params) {
  return request(`${workflow}/tasks${stringify(params, { addQueryPrefix: true })}`);
}

export async function getTaskData(params) {
  return request(`${prefix}/apps/packet?businessKey=${params.id}`, {
    method: 'GET',
  });
}

//
export async function ApplyBefore(params) {
  return request(`${prefix}/apps/user?businessKey=${params.businessKey}&taskId=${params.taskId}`, {
    method: 'GET',
  });
}

export async function ApplyOk(params) {
  return request(`${workflow}/tasks/${params.taskId}/complete`, {
    method: 'PUT',
    data: params,
  });
}

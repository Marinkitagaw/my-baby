import { stringify } from 'qs';
import { request } from '@cpdm/util';

const prefix = '/package';

// 质量数据包任务
// 任务列表
export async function listTasks(params) {
  return request(`${prefix}/qualitys/tasks${stringify(params, { addQueryPrefix: true })}`);
}

// 任务详情
export async function getTask(params) {
  return request(`${prefix}/qualitys/tasks/${params.id}`);
}

// 完成任务
export async function completeTask(params) {
  return request(`${prefix}/qualitys/tasks/${params.id}/complete`, {
    method: 'PUT',
    data: params,
  });
}

import { request } from '@cpdm/util';

const prefix = '/package';

// 获取任务名称
export async function getTaskName({ bomId, taskId, preview }) {
  return request(`${prefix}/bom-packages/${bomId}/task-parts/${taskId}?preview=${preview}`);
}

// 获取单位名称

import { request } from '@cpdm/util';

const prefix = '/package';

// 创建策划任务
export async function create(params) {
  return request(`${prefix}/data-packages/planning-task`, {
    method: 'POST',
    data: params,
  });
}

// 获取名称
export async function obtain(params) {
  return request(`${prefix}/iam/my-departments/${params}`);
}
// 获取策划任务列表
export async function list(params) {
  return request(`${prefix}/classifications/identifier/${params}`);
}

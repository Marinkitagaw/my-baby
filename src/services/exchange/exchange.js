import { stringify } from 'qs';
import { request } from '@cpdm/util';

const prefix = '/exchange';

// 获取
export async function taskData(params) {
  return request(`${prefix}/task/data-exchange${stringify(params, { addQueryPrefix: true })}`);
}

export async function changeRepository(params) {
  return request(`${prefix}/data-packet-member/change-repository`, {
    method: 'POST',
    data: params,
  });
}

import { stringify } from 'qs';
import { request } from '@cpdm/util';

const prefix = '/cpdm';

// 获取
export async function instanceData(params) {
  return request(
    `${prefix}/data-send-orders/instance-data${stringify(params, { addQueryPrefix: true })}`
  );
}

export async function instanceData1(params) {
  return request(
    `${prefix}/data-send-orders/instance-data${stringify(params, { addQueryPrefix: true })}`
  );
}

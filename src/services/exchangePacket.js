import { stringify } from 'qs';
import { request } from '@cpdm/util';

const prefix = '/exchange';

// 数据包列表
export async function getPackageList(params) {
  return request(`${prefix}/data-packets?${stringify(params)}`);
}
// 数据包基本信息
export async function getPackageInfo(params) {
  return request(`${prefix}/data-packet/${params}`);
}

// 数据包验收单
export async function getPackageMembers(params) {
  return request(`${prefix}/data-packet/${params}/members`);
}

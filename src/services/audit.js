import { request } from '@cpdm/util';
import { stringify } from 'qs';

const prefix = '/audit';

export async function listAuditRecords(params) {
  return request(`${prefix}/audit-trails?${stringify(params)}`);
}
// 获取审计记录详情
export async function getAuditInfo(params) {
  return request(`${prefix}/audit-trails/${params}`);
}

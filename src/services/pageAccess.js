import { request } from '@cpdm/util';

const prefix = '/page';

export async function getPageAccess(params) {
  return request(`${prefix}/page-accesses?principalId=${params.type}${params.id}`);
}

export async function setPageAccess(access) {
  return request(`${prefix}/page-accesses`, { method: 'POST', body: access });
}

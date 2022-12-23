import { stringify } from 'qs';
import { request } from '@cpdm/util';

const prefix = '/iam';

export async function listUsers(params) {
  return request(`/cpdm/users${stringify(params, { addQueryPrefix: true })}`);
}

export async function queryCurrent() {
  return request('/currentUser');
}

export async function searchUsers(params) {
  return request(`${prefix}/departments/query-members?${stringify(params)}`);
}

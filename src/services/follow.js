import { request } from '@cpdm/util';
import { stringify } from 'qs';

const prefix = '/admin';

export async function follow(params) {
  return request(`${prefix}/favorite`, {
    method: 'POST',
    data: params,
  });
}

export async function unFollow({ objectId }) {
  return request(`${prefix}/favorite/${objectId}`, {
    method: 'DELETE',
  });
}

export async function getFollow(params) {
  return request(`${prefix}/favorite-boolean${stringify(params, { addQueryPrefix: true })}`);
}

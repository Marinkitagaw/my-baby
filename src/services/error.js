import { request } from '@cpdm/util';

export default async function queryError(code) {
  return request(`/${code}`);
}

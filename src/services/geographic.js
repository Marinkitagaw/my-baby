import { request } from '@cpdm/util';

export async function queryProvince() {
  return request('/geographic/province');
}

export async function queryCity(province) {
  return request(`/geographic/city/${province}`);
}

import { request } from '@cpdm/util';

export async function setPasswordPolicy(params) {
  return request('/iam/password-policy', {
    method: 'POST',
    data: { ...params },
  });
}

export async function getPasswordPolicy() {
  return request('/iam/password-policy');
}

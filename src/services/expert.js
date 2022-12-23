import { request } from '@cpdm/util';
import { stringify } from 'qs';

const prefix = '/meeting';

export async function listExperts(params) {
  return request(`${prefix}/experts${stringify(params, { addQueryPrefix: true })}`);
}

export async function deleteExpert(params) {
  return request(`${prefix}/experts/${params.id}`, {
    method: 'DELETE',
  });
}

export async function createExpert(params) {
  return request(`${prefix}/experts`, {
    method: 'POST',
    data: params,
  });
}

export async function modifyExpert(params) {
  return request(`${prefix}/experts/${params.id}`, {
    method: 'PUT',
    data: params.formValue,
  });
}

export async function getExpert(params) {
  return request(`${prefix}/experts/${params.id}`);
}

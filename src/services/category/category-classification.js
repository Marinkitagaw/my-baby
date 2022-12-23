import { request } from '@cpdm/util';

const resource = '/admin/categories';

export async function getClassifications({ categoryId }) {
  return request(`${resource}/${categoryId}/classifications`);
}

export async function addClassification({ categoryId, classificationId }) {
  return request(`${resource}/${categoryId}/classifications`, {
    method: 'POST',
    data: [classificationId],
  });
}

export async function addClassifications({ categoryId, classificationIds }) {
  return request(`${resource}/${categoryId}/classifications`, {
    method: 'POST',
    data: classificationIds,
  });
}

export async function removeClassification({ categoryId, classificationId }) {
  return request(`${resource}/${categoryId}/classifications/${classificationId}`, {
    method: 'DELETE',
  });
}

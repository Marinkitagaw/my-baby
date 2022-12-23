import { request } from '@cpdm/util';

const resource = '/admin/categories';

export async function listAttributes({ categoryId }) {
  return request(`${resource}/${categoryId}/attributes?includingAttributesOfChildren=false`);
}

export async function addAttribute({ categoryId, attributeIds }) {
  return request(`${resource}/${categoryId}/attributes`, {
    method: 'POST',
    data: attributeIds,
  });
}

export async function updateAttribute({ categoryId, attribute }) {
  return request(`${resource}/${categoryId}/attributes/${attribute.id}`, {
    method: 'PUT',
    data: attribute,
  });
}

export async function removeAttribute({ categoryId, attributeId }) {
  return request(`${resource}/${categoryId}/attributes/${attributeId}`, {
    method: 'DELETE',
  });
}

export async function removeAttributes({ categoryId, attributeIds }) {
  return request(`${resource}/${categoryId}/attributes`, {
    method: 'PUT',
    data: attributeIds,
  });
}

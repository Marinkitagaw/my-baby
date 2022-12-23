import { request } from '@cpdm/util';

const prefix = '/admin';

export async function getTree() {
  return request(`${prefix}/categories`);
}

export async function getTypeTree({ objectType }) {
  return request(`${prefix}/categories/trees/${objectType}`);
}

export async function getCategory(params) {
  return request(`${prefix}/categories/${params}`);
}

export async function getSubcategories({ categoryId }) {
  return request(`${prefix}/categories/${categoryId}/subcategories`);
}

export async function createCategory({ form }) {
  return request(`${prefix}/categories`, {
    method: 'POST',
    data: form,
  });
}

export async function modifyCategory({ categoryId, form }) {
  return request(`${prefix}/categories/${categoryId}`, {
    method: 'PUT',
    data: form,
  });
}

export async function deleteCategory({ categoryId }) {
  return request(`${prefix}/categories/${categoryId}`, {
    method: 'DELETE',
  });
}

// 导入
export async function saveCategoryFiles(param) {
  return request(`${prefix}/categories/import`, {
    method: 'post',
    body: param,
  });
}

export async function uploadFile(params) {
  return request(`/zuul/dfs/objects`, {
    method: 'POST',
    data: params,
  });
}

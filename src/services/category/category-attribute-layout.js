import { request } from '@cpdm/util';

const prefix = '/admin';

// 获取某类型的所有布局
export async function getLayoutsOfScreen({ categoryId, screenType }) {
  return request(`${prefix}/categories/${categoryId}/layouts/id-list?screenType=${screenType}`);
}

// 获取已有的某布局属性
export async function getLayout({ categoryId, layoutId }) {
  return request(`${prefix}/categories/${categoryId}/layouts/${layoutId}`);
}

// 创建布局
export async function createLayout({ categoryId, layoutId }) {
  return request(`${prefix}/categories/${categoryId}/layouts/${layoutId}`, {
    method: 'POST',
    // data: layout,
  });
}

export async function updateLayout({ categoryId, layoutId, layout }) {
  return request(`${prefix}/categories/${categoryId}/layouts/${layoutId}`, {
    method: 'PUT',
    data: layout,
  });
}

// 页面类型
export async function getScreenTypes() {
  return request(`${prefix}/screen-types`);
}

export async function getVisibleOptions() {
  return request(`${prefix}/visible-options`);
}

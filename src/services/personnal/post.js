import { stringify } from 'qs';
import { request } from '@cpdm/util';

const prefix = '/iam';

// =========岗位管理========

// 列表
export async function listPosts(param) {
  return request(`${prefix}/posts${stringify(param, { addQueryPrefix: true })}`);
}

// 详情
export async function getPost(param) {
  return request(`${prefix}/posts/${param.id}`);
}

// 创建
export async function createPost(param) {
  return request(`${prefix}/posts`, {
    method: 'POST',
    data: param,
  });
}

// 修改
export async function editPost(param) {
  return request(`${prefix}/posts/${param.id}`, {
    method: 'PUT',
    data: param,
  });
}

// 删除
export async function deletePost(param) {
  return request(`${prefix}/posts/${param.id}`, {
    method: 'DELETE',
  });
}

// 批量删除
export async function deletePosts(param) {
  return request(`${prefix}/posts`, {
    method: 'PUT',
    data: param,
  });
}

// 批量导入
export async function savePostFiles(params) {
  return request(`${prefix}/posts/import`, {
    method: 'POST',
    data: params,
  });
}

// 菜单列表
export async function listAllMenus(param) {
  return request(`/iam/menu-items${stringify(param, { addQueryPrefix: true })}`);
}

// 给岗位添加菜单权限
export async function addPostMenu(params) {
  return request(`${prefix}/posts/${params.postId}/menu-access`, {
    method: 'PUT',
    data: params.menuIds,
  });
}

// 查询当前岗位已有的菜单权限
export async function listPostMenus(params) {
  return request(`${prefix}/posts/${params}/menu-access`);
}

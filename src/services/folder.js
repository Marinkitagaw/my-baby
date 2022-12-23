import { request } from '@cpdm/util';
import { stringify } from 'qs';

const prefix = '/folder';

// 创建文件夹
export async function createFolder(params) {
  return request(`${prefix}/folders`, {
    method: 'POST',
    data: params,
  });
}

// 编辑文件夹
export async function modifyFolder(params) {
  return request(`${prefix}/folders/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}

// 删除文件夹
export async function deleteFolder(params) {
  return request(`${prefix}/folders/${params}`, {
    method: 'DELETE',
  });
}

// 获取对象根文件夹下所有子文件夹（所有后代）
export async function listFolders(params) {
  return request(`${prefix}/folders/root-sub${stringify(params, { addQueryPrefix: true })}`);
}

// 创建文件夹成员
export async function createRequirementSetLink(params) {
  return request(`${prefix}/folders/member`, {
    method: 'POST',
    data: params,
  });
}

// 获取需求集关联的需求项
export async function listRequirementSetLink(params) {
  return request(`${prefix}/requirements-set/link/${params}`);
}

// 移除需求集与需求项关系
export async function removeRequirementSetLink(params) {
  return request(`${prefix}/requirements-set/link`, {
    method: 'PUT',
    data: params,
  });
}

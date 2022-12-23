// ==========型号管理/型号模板==============
import { stringify } from 'qs';
import { request } from '@cpdm/util';

const prefix = '/cpdm';

// 获取工具栏
export async function getToolbar(params) {
  return request(`${prefix}/toolbars${stringify(params, { addQueryPrefix: true })}`);
}

// 模板列表
export async function list(params) {
  return request(`${prefix}/repository-templates${stringify(params, { addQueryPrefix: true })}`);
}

// 创建
export async function createTemplate(params) {
  return request(`${prefix}/repository-templates`, {
    method: 'POST',
    data: params,
  });
}
// 详情
export async function infoTemplate(params) {
  return request(`${prefix}/repository-templates/${params.templateId}`);
}
// 编辑
export async function modifyTemplate(params) {
  return request(`${prefix}/repository-templates/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}
// 删除
export async function deleteTemplate(params) {
  return request(`${prefix}/repository-templates/${params}`, {
    method: 'DELETE',
  });
}

// ---------------------详情页/文件夹

// 根文件夹
export async function rootFolder(params) {
  return request(`${prefix}/repository-templates/${params.templateId}/folders`);
}

// 详情
export async function folderInfo(params) {
  return request(`${prefix}/repository-templates/folders/${params.folderId}`);
}

// 子文件夹
export async function childrenFolder(params) {
  return request(`${prefix}/repositories-templates/${params}/folders/${params}/children`);
}

// 创建文件夹
export async function createFolder(params) {
  return request(`${prefix}/repository-templates/folders`, {
    method: 'POST',
    data: params,
  });
}

// 编辑文件夹
export async function modifyFolder(params) {
  return request(`${prefix}/repository-templates/folders/${params.folderId}`, {
    method: 'PUT',
    data: params,
  });
}

// 删除文件夹
export async function deleteFolder(params) {
  return request(`${prefix}/repository-templates/folders/${params.folderId}`, {
    method: 'DELETE',
  });
}

// ---------------------详情页/角色
export async function roleTeams() {
  return request(`${prefix}/repository-templates/roles`);
}

export async function getRepoTeams(params) {
  return request(`${prefix}/repository-templates/${params.templateId}/roleList`);
}

export async function createTeam(params) {
  return request(`${prefix}/repository-templates/${params.templateId}/roles`, {
    method: 'POST',
    data: params.selected,
  });
}

export async function deleteTeam(params) {
  return request(
    `${prefix}/repository-templates/${params.templateId}/roles?roleIdentifier=${params.roleIdentifier}`,
    {
      method: 'DELETE',
    }
  );
}

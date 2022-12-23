import { stringify } from 'qs';
import { request } from '@cpdm/util';

// 获取分类
export async function getClassifications() {
  return request(`/admin/classifications`);
}
// 获取该模板下的文件列表
export async function getFiles(params) {
  return request(`/admin/templates${stringify(params, { addQueryPrefix: true })}`);
}
export async function getFileTemplateInfo(params) {
  return request(`/admin/templates/${params}`);
}

export async function createFileTemplate(params) {
  return request(`/admin/templates`, {
    method: 'POST',
    data: params,
  });
}

export async function editFileTemplate(params) {
  return request(`/admin/templates/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}

export async function deleteFileTemplate(params) {
  return request(`/admin/templates/${params.fileTemplateId}`, {
    method: 'DELETE',
  });
}
export async function deleteFile(params) {
  return request(`/admin/templates/delete/${params.fileId}`, {
    method: 'DELETE',
  });
}

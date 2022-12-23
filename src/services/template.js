import { request } from '@cpdm/util';
import { stringify } from 'qs';

const prefix = '/package';

/**
 * 模板列表
 */
export async function listTemplate(params) {
  return request(`${prefix}/quality-templates${stringify(params, { addQueryPrefix: true })}`);
}
/**
 * 新建模板
 */
export async function createTemplate(params) {
  return request(`${prefix}/quality-templates`, {
    method: 'POST',
    data: params,
  });
}
/**
 * 修改模板
 */
export async function modifyTemplate(params) {
  return request(`${prefix}/quality-templates/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}
/**
 * 删除模板
 */
export async function deleteTemplate(params) {
  return request(`${prefix}/quality-templates/${params.id}`, {
    method: 'DELETE',
  });
}

/**
 * 子类型列表
 */
export async function getTemplatelowerList(params) {
  return request(`${prefix}/quality-templates/lower${stringify(params, { addQueryPrefix: true })}`);
}

export async function getTemplate(params) {
  return request(`${prefix}/quality-templates/${params.id}`);
}

// 获得模板片段信息
export async function getTemplateSectionInfo(params) {
  return request(`${prefix}/quality-templates/${params.id}/sections/${params.sectionId}`);
}

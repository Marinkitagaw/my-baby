import { request } from '@cpdm/util';
import { stringify } from 'qs';

const prefix = '/package';

/**
 * 申请单列表
 */
export async function listApplication(params) {
  return request(`${prefix}/applications${stringify(params, { addQueryPrefix: true })}`);
}
/**
 * 新建申请单
 */
export async function createApplication(params) {
  return request(`${prefix}/applications`, {
    method: 'POST',
    data: params,
  });
}
/**
 * 修改申请单
 */
export async function modifyApplication(params) {
  return request(`${prefix}/applications/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}
/**
 * 申请单详情
 */
export async function getApplication(params) {
  return request(`${prefix}/applications/${params.id}`);
}
/**
 * 删除申请单
 */
export async function deleteApplication(params) {
  return request(`${prefix}/applications/${params.id}`, {
    method: 'DELETE',
  });
}

export async function importQuality(params) {
  return request(`${prefix}/qualitys/import${stringify(params, { addQueryPrefix: true })}`, {
    method: 'POST',
  });
}

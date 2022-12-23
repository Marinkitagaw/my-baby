import { stringify } from 'qs';
import { request } from '@cpdm/util';

const prefix = '/admin/attribute-definitions';

// 下层属性/属性集名称
export async function listAttributes(params) {
  return request(`${prefix}${stringify(params, { addQueryPrefix: true })}`);
}

export async function listLowLevel(params) {
  return request(`${prefix}/${params.parentSetId}/subcategories`);
}

export async function getAttribute(params) {
  return request(`${prefix}/${params.attributeId}`);
}

export async function createAttribute({ attribute }) {
  return request(`${prefix}`, { method: 'POST', data: attribute });
}

export async function updateAttribute({ attributeId, attribute }) {
  return request(`${prefix}/${attributeId}`, {
    method: 'PUT',
    data: attribute,
  });
}

export async function deleteAttribute({ attributeId }) {
  return request(`${prefix}/${attributeId}`, { method: 'DELETE' });
}

// 导出
export async function downloadFile() {
  return request(`${prefix}/attribute-definitions/export?allExport=true`, {
    method: 'POST',
  });
}

// 导入
export async function saveAttributeFiles(param) {
  return request(`${prefix}/import`, {
    method: 'post',
    body: param,
  });
}

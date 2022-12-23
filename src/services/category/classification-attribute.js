import { stringify } from 'qs';
import { request } from '@cpdm/util';

// const resource = '/admin/classifications';
const resource = '/admin';

// 分类关联属性列表
export async function listAttributes(params) {
  return request(
    `${resource}/classification-nodes/${params.classificationId}/attributes?structId=${params.structId}&includingAttributesOfChildren=false`
  );
}

export async function getAttributeLayout({ classificationId, readonly }) {
  return request(
    `${resource}/${classificationId}/attribute-layout${stringify(
      { readonly },
      { addQueryPrefix: true }
    )}`
  );
}

// 给分类关联属性
export async function addAttribute(params) {
  return request(
    `${resource}/classification-nodes/${params.classificationNodeId}/attributes/add?structId=${params.structId}`,
    {
      method: 'POST',
      data: params.attributeIds,
    }
  );
}

export async function updateAttribute(params) {
  return request(
    `${resource}/classification-nodes/${params.classificationId}/attributes/${params.attributeId}?structId=${params.structId}`,
    { method: 'PUT', data: params.attribute }
  );
}

export async function removeAttribute(params) {
  return request(
    `${resource}/classification-nodes/${params.classificationId}/attributes/${params.attributeId}?structId=${params.structId}`,
    { method: 'DELETE' }
  );
}

export async function removeAttributes(params) {
  return request(
    `${resource}/classification-nodes/${params.classificationId}/attributes/delete?structId=${params.structId}`,
    {
      method: 'PUT',
      data: params.attributeIds,
    }
  );
}

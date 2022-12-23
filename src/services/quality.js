import { request } from '@cpdm/util';
import { stringify } from 'qs';

const prefix = '/package';

/**
 * 数据包列表
 */
export async function listQualitys(params) {
  return request(`${prefix}/qualitys${stringify(params, { addQueryPrefix: true })}`);
}
/**
 * 新建数据包
 */
export async function createQuality(params) {
  const { partId } = params;
  return request(`${prefix}/qualitys?partId=${partId}`, {
    method: 'POST',
    data: params,
  });
}
/**
 * 修改数据包
 */
export async function modifyQuality(params) {
  return request(`${prefix}/qualitys/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}
/**
 * 数据包详情
 */
export async function getQuality(params) {
  return request(`${prefix}/qualitys/${params.id}`);
}
/**
 * 删除质量包
 */
export async function deleteQuality(params) {
  return request(`${prefix}/qualitys/${params.id}`, {
    method: 'DELETE',
  });
}

/**
 * 创建关系
 */
export async function createRelationship(params) {
  return request(`${prefix}/qualitys/${params.sourceId}/deliveries`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 移除关系
 */
export async function deleteRelationship(params) {
  return request(`${prefix}/qualitys/${params.sourceId}/deliveries`, {
    method: 'DELETE',
    data: params,
  });
}
/**
 * 条目列表
 */
export async function getRelationshipItems(params) {
  return request(`${prefix}/qualitys/${params.id}/deliveries`, {});
}

/**
 * 获取模板列表
 */
export async function getSourceTree(params) {
  return request(
    `${prefix}/template/classification/children${stringify(params, { addQueryPrefix: true })}`
  );
}

/**
 * 获取原模板树
 */
export async function sourceTree({ classificationId }) {
  console.log('sourceTree-service');
  return request(`${prefix}/qualitys/tree/${classificationId}`);
}

/**
 * 复制模板树
 */
export async function copyTree({ packageTemplateId }) {
  return request(`${prefix}/qualitys/tree/${packageTemplateId}`, {
    method: 'POST',
  });
}

/**
 * 获取新模板树
 */
export async function getTree({ id, instanceId }) {
  return request(`${prefix}/qualitys/${id}/tree/${instanceId}`);
}

export async function getSubNode({ qualityId, classificationId }) {
  return request(`${prefix}/qualitys/${qualityId}/subTree/${classificationId}`);
}

/**
 * 导入质量包
 */
export async function importQuality(params) {
  return request(`${prefix}/qualitys/import`, {
    method: 'POST',
    params,
  });
}

export async function getPart({ id }) {
  return request(`/admin/categories/${id}`);
}

/**
 * 树节点的操作
 */
export async function deleteNode(params) {
  return request(`${prefix}/qualitys/node/${params.id}`, {
    method: 'DELETE',
  });
}

export async function modifyNode(params) {
  return request(`${prefix}/qualitys/node/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}

export async function createNode(params) {
  return request(`${prefix}/qualitys/node`, {
    method: 'POST',
    data: params,
  });
}

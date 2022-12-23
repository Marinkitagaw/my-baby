import { stringify } from 'qs';
import { request } from '@cpdm/util';

const prefix = '/admin';

// ============================分类树对象=====================

// 列表
export async function listClassificationObjs(param) {
  return request(`${prefix}/classification-structs${stringify(param, { addQueryPrefix: true })}`);
}

// 详情
export async function getClassificationObj(param) {
  return request(`${prefix}/classification-structs/${param.id}`);
}

// 创建
export async function createClassificationObj(params) {
  return request(`${prefix}/classification-structs`, {
    method: 'POST',
    data: params,
  });
}

// 修改
export async function editClassificationObj(param) {
  return request(`${prefix}/classification-structs/${param.id}`, {
    method: 'PUT',
    data: param,
  });
}

// 删除
export async function deleteClassificationObj(param) {
  return request(`${prefix}/classification-structs/${param.id}`, {
    method: 'DELETE',
  });
}

// 批量删除
export async function deleteClassificationObjs(param) {
  return request(`${prefix}/classification-structs`, {
    method: 'PUT',
    data: param,
  });
}

// ============================分类树节点=============================

export async function getTree(params) {
  return request(`${prefix}/classification-structs/${params.classificationStructId}/nodes`);
}

export async function getClassification(params) {
  return request(
    `${prefix}/classification-structs/${params.classificationStructId}/nodes/${params.classificationId}`
  );
}

// 下级分类
export async function getSubClassifications(params) {
  return request(
    `${prefix}/classification-structs/${params.classificationStructId}/nodes/${params.classificationId}/sub`
  );
}

export async function createClassification(params) {
  return request(`${prefix}/classification-structs/${params.classificationStructId}/nodes`, {
    method: 'POST',
    data: params,
  });
}

export async function modifyClassification(params) {
  return request(
    `${prefix}/classification-structs/${params.classificationStructId}/nodes/${params.classificationId}`,
    {
      method: 'PUT',
      data: params,
    }
  );
}

export async function deleteClassification(params) {
  return request(
    `${prefix}/classification-structs/${params.classificationStructId}/nodes/${params.classificationId}`,
    {
      method: 'DELETE',
    }
  );
}

// 导入所有
export async function saveClassificationFiles(param) {
  return request(`${prefix}/classification-structs/import`, {
    method: 'post',
    body: param,
  });
}

// 导入节点
export async function saveClassificationNodeFiles(param) {
  return request(`${prefix}/classification-structs/${param.classificationStructId}/nodes/import`, {
    method: 'post',
    body: param.formData,
  });
}

import { stringify } from 'qs';
import { request } from '@cpdm/util';

const prefix = '/resource';

// 工装列表
export async function listResources(params) {
  return request(`${prefix}/resources${stringify(params, { addQueryPrefix: true })}`);
}

// 创建工装
export async function create(params) {
  return request(`${prefix}/resources/${params.resourceType}`, {
    method: 'POST',
    data: params,
  });
}

// 编辑工装
export async function edit(params) {
  return request(`${prefix}/resources/${params.id}?resourceType=${params.resourceType}`, {
    method: 'PUT',
    data: params,
  });
}

// 工装基本信息、业务信息
export async function getBasicInfo(params) {
  return request(`${prefix}/resources/${params.id}?resourceType=${params.resourceType}`);
}

//
export async function getResourceState() {
  return request(`${prefix}/resources/state`);
}

// 删除
export async function deleteResource(params) {
  return request(`${prefix}/resources/${params.id}`, {
    method: 'DELETE',
    data: params,
  });
}

// 批量删除
export async function deleteResources(params) {
  return request(`${prefix}/resources?resourceType=${params.resourceType}`, {
    method: 'PUT',
    data: params.ids,
  });
}

// 批量修订
export async function revise(params) {
  return request(`${prefix}/resources/revise`, {
    method: 'PUT',
    data: params,
  });
}

// 获取一级分类
export async function getClassificationLevel1(params) {
  console.log('test', params);
  return request(`/admin/classification-structs/${params.id}?type=${params.type}`);
}
export async function getClassificationLevel(params) {
  return request(`/admin/classification-structs/${params.classificationStructId}/nodes`);
}

// 获取子层分类
export async function getClassification(params) {
  return request(
    `/admin/classification-structs/${params.classificationStructId}/nodes/${params.classificationNodeId}/sub`,
  );
}

// 根据分类id获取分类属性
export async function listAttributes({
  classificationNodeId,
  structId,
  includingAttributesOfChildren,
}) {
  return request(
    `/admin/classification-nodes/${classificationNodeId}/attributes?structId=${structId}&includingAttributesOfChildren=${includingAttributesOfChildren}`,
  );
}

// 导入代料单
export async function importResources(params) {
  return request(`${prefix}/resources/import?resourceType=${params.resourceType}`, {
    method: 'POST',
    data: params.formData,
  });
}

export async function getstructId(params) {
  return request(`/admin/classification-structs/${params}?type=identifier`, {
    method: 'get',
  });
}

// 获取部门列表
export async function getDepartments() {
  return request(`/iam/departments`);
}

// 获取部门列表
export async function searchMembers(params) {
  return request(`/iam/departments/${params.id}/members`, {
    params: {
      currentDepartment: true,
      fullName: params.fullName,
    },
  });
}

// 获取部门列表
export async function addOwner(params) {
  return request(`/bom/common-parts/${params.partId}/owner`, {
    method: 'PUT',
    params,
  });
}

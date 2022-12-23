import { stringify } from 'qs';
import { request } from '@cpdm/util';

const prefix = '';

export async function querysuppliers(params) {
  return request(`${prefix}/cpdm/suppliers/children?${stringify(params)}`);
}
export async function childrenSuppliers(params) {
  return request(`${prefix}/cpdm/suppliers/children?parentId=${params.parentId}`);
}
export async function getTenantInfo(params) {
  return request(`${prefix}/search/tenant?${stringify(params)}`);
}
// 获取库
export async function getRepositorys(params) {
  return request(`${prefix}/cpdm/repositories${stringify(params, { addQueryPrefix: true })}`);
}
//
export async function getProducts(params) {
  return request(`${prefix}/cpdm/repositories${stringify(params, { addQueryPrefix: true })}`);
}
// 存储库
export async function getLibraries() {
  return request(`${prefix}/cpdm/libraries`);
}
// 所有枚举对象属性
export async function getCommonData() {
  return request(`${prefix}/cpdm/common-data`);
}
// 获取所有类型树
export async function getAllCategories() {
  return request(`${prefix}/search/categories`);
}
// 获取常用库
export async function getRepositorysCommon() {
  return request(`${prefix}/cpdm/repositories/common`);
}
// 类型
export async function getObjectCategories(params) {
  return request(`${prefix}/admin/categories/trees/${params}`);
}
export async function getObjectTypes(params) {
  return request(`${prefix}/admin/categories/trees/${params}`);
}
// 发往单位
export async function getSendTo() {
  return request(`${prefix}/cpdm/suppliers/tree`);
}

// 可用的部门
export async function myDept() {
  return request(`${prefix}/iam/my-departments`);
}

// 编码规则
export async function codeRule({ codeRuleId }) {
  return request(`${prefix}/admin/code-rule/${codeRuleId}`);
}

// 视图
export async function listViews(param) {
  return request(`${prefix}/admin/views${stringify(param, { addQueryPrefix: true })}`);
}

// 显示部门树；
export async function getDepartments(params) {
  return request(`${prefix}/iam/departments/${params.parentId}/children`, {
    method: 'GET',
  });
}
// 获取部门成员；
export async function getDepartmentsMembers(params) {
  return request(
    `${prefix}/iam/departments/${params.departmentId}/members?${stringify(params.value)}`,
    {
      method: 'GET',
    },
  );
}
// 移除文件
export async function removeContent(params) {
  return request(`${prefix}/cpdm/content-items/${params}`, {
    method: 'DELETE',
  });
}
// 根据对象类型、对象Id获取对象流程列表
export async function getObjectReviewData(params) {
  return request(`${prefix}/cpdm/review-data/object${stringify(params, { addQueryPrefix: true })}`);
}
// 根据流程Id获取对象流程进度
export async function getObjectProgress(params) {
  return request(`${prefix}/workflow/process-instances/${params.processInstanceId}/progress`);
}
// 根据流程Id获取对象签审记录
export async function getObjectRecordsData(params) {
  return request(`${prefix}/workflow/process-instances/${params.processInstanceId}/tasks`);
}
// 获取研制阶段下阶段状态值-参数-库id
export async function getPhaseTechnicalStatus(params) {
  return request(`${prefix}/cpdm/repositories/${params}/technical-state/enums`);
}
// 获取对象的历史版本信息
export async function getObjectHistoryInfo(params) {
  return request(
    `${prefix}/${params.objectType.toLowerCase()}/${params.objectType.toLowerCase()}s/${
      params.objectId
    }/history`,
  );
}
// 获取用户列表
export async function getUserList(params) {
  return request(`${prefix}/iam/users${stringify(params, { addQueryPrefix: true })}`);
}
// 获取默认位置
export async function getLocationPosition(params) {
  return request(
    `${prefix}/cpdm/categories/${params}${stringify(params, { addQueryPrefix: true })}`,
  );
}
// 我的收藏
export async function getfavouriteList() {
  return request(`${prefix}/cpdm/favorites`);
}
// 我的收藏-收藏数据
export async function Addfavourite(params) {
  return request(`${prefix}/cpdm/favorites`, {
    method: 'POST',
    body: params,
  });
}
// 我的收藏-取消收藏
export async function removefavourite(params) {
  return request(`${prefix}/cpdm/favorites`, {
    method: 'PUT',
    body: params,
  });
}

// 获取部门
export async function getNewDepartments(params) {
  return request(`${prefix}/iam/departments${stringify(params, { addQueryPrefix: true })}`);
}

// 创建关联关系
export async function createRelationships(params) {
  return request(`${prefix}/cpdm/relationships/batch-create`, {
    method: 'POST',
    data: params,
  });
}

// 移除关联关系
export async function removeRelationships(params) {
  return request(`${prefix}/cpdm/relationships/batch-remove`, {
    method: 'PUT',
    data: params,
  });
}

// 通过生命周期状态 获取状态
export async function getCategoryState(templateName) {
  return request(
    `/admin/lifecycle-templates/phases${stringify({ templateName }, { addQueryPrefix: true })}`,
  );
}

// 添加角色

export async function addRole({ teamId, roleList }) {
  return request(`/iam/teams/${teamId}/roles`, {
    method: 'POST',
    data: roleList,
  });
}

export async function addMember({ teamId, datas }) {
  return request(`/iam/teams/${teamId}/role-members`, {
    method: 'POST',
    data: datas,
  });
}

export async function removeRoles({ teamId, datas }) {
  return request(`/iam/teams/${teamId}/roles`, {
    method: 'PUT',
    data: datas,
  });
}

export async function removeMembers({ teamId, datas }) {
  return request(`/iam/teams/${teamId}/role-members`, {
    method: 'PUT',
    data: datas,
  });
}

// 当前签审人
export async function getCurrentParticipators(params) {
  return request(
    `/cpdm/process-instances/current-participators${stringify(params, { addQueryPrefix: true })}`,
  );
}

// 分类
export async function getClassification(params) {
  return request(
    `/admin/classification-structs/nodes${stringify(params, { addQueryPrefix: true })}`,
  );
}

// 获取jsonSchema
export async function getCategoryJsonSchmea(params) {
  return request(`/cpdm/form-schema?${stringify(params)}`);
}

export async function getCategoryClassificationSchmea(params) {
  return request(`/cpdm/form-schema/classification?${stringify(params)}`);
}

// 获取类型关联分类
export async function getLinkdClassication({ categoryId }) {
  return request(`/cpdm/categories/${categoryId}/link-classification`);
}

// 建立关联关系
export async function saveLinkdClassication({ categoryId, data }) {
  return request(`/cpdm/categories/${categoryId}/link-classification`, {
    method: 'POST',
    data,
  });
}

// 取消关联关系
export async function updateLinkdClassication({ categoryId, data }) {
  return request(`/cpdm/categories/${categoryId}/link-classification`, {
    method: 'PUT',
    data,
  });
}

// 保存上一次操作记录
export async function setPersonalSettings(params) {
  return request(`/cpdm/operation-records`, {
    method: 'POST',
    data: params,
  });
}

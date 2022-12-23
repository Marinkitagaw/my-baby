import { stringify } from 'qs';
import { request } from '@cpdm/util';

const prefix = '';

export async function getMenuData(params) {
  return request(`${prefix}/cpdm/menuData?${stringify(params)}`);
}

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
  return request(`${prefix}/cpdm/categories/trees/${params}`);
}
export async function getObjectTypes(params) {
  return request(`${prefix}/cpdm/categories/trees/${params}`);
}
// 发往单位
export async function getSendTo() {
  return request(`${prefix}/cpdm/suppliers/trees`);
}
// 显示部门树；
export async function getDepartments(params) {
  return request(`${prefix}/iam/departments/${params.parentId}/children`, {
    method: 'GET',
  });
}
// 获取部门成员；
export async function getDepartmentsMembers(params) {
  return request(`${prefix}/iam/departments/${params.departmentId}/members`, {
    method: 'GET',
  });
}
// 移除文件
export async function removeContent(params) {
  return request(`${prefix}/cpdm/contents/${params}/remove`, {
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
    }/history`
  );
}
// 获取租户列表
export async function getUserList(params) {
  return request(`${prefix}/iam/users${stringify(params, { addQueryPrefix: true })}`);
}
// 获取默认位置
export async function getLocationPosition(params) {
  return request(
    `${prefix}/cpdm/categories/${params}${stringify(params, { addQueryPrefix: true })}`
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
// 获取产品库模板
export async function getRepositoryTemplate() {
  return request(`${prefix}/cpdm/repository-template`);
}

// 获取布局getObjectLayout
// http://localhost:8001/admin/categories/5cb3e2c37e8c7011609cbf17/layouts?screenType=create&noTenantId=true
export async function getObjectLayout(params) {
  return request(
    `${prefix}/cpdm/categories/${params.categoryId}/layouts${stringify(params.arguments, {
      addQueryPrefix: true,
    })}`
  );
}

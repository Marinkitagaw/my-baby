import { stringify } from 'qs';
import { request } from '@cpdm/util';

const prefix = '/cpdm';
/**
 * 搜索
 */

// 关键字搜索
export async function searchData(params) {
  if (params.requestUrl) {
    return request(`${params.requestUrl}${stringify(params.param, { addQueryPrefix: true })}`);
  }
  return request(`${prefix}/esp-search-all`, {
    method: 'POST',
    data: params,
  });
}

// 需求更改单
export async function searchDemand(params) {
  return request(`${prefix}/search-all${stringify(params, { addQueryPrefix: true })}`);
}

// 对象类型
export async function listObjectTypes(param) {
  return request(`/admin/categories/simple-search${stringify(param, { addQueryPrefix: true })}`);
}

// 生命周期状态
export async function listlifecycleStates(param) {
  return request(`/admin/lifecycle-states${stringify(param, { addQueryPrefix: true })}`);
}
// 类型
export async function getObjectCategories() {
  return request(`/api/search/categories`);
}

// 产品库
export async function getRepositories() {
  return request(`/api/search/repositories`);
}
// 部门
export async function getDepartments() {
  return request(`/api/search/departments`);
}

// 查询签审人
export async function getSigners(params) {
  return request(`/cpdm/process-instances/batch/current-participators`, {
    method: 'POST',
    data: params,
  });
}

// 根据oid查询签审人
export async function getDataSendOrders(params) {
  return request(`/api/documents/relevant-datasendorder`, {
    method: 'POST',
    data: params,
  });
}

// simpleSearchData
export async function simpleSearchData(params) {
  return request(
    `${prefix}/simple-serach/${params.objectType}${stringify(params.arguments, {
      addQueryPrefix: true,
    })}`,
  );
}
// 搜索用户
export async function searchUsers(params) {
  return request(`${prefix}/users/search${stringify(params, { addQueryPrefix: true })}`, {
    method: 'GET',
  });
}
// 搜索协同单位纸质协同用户
export async function searchCollNormalUsers(params) {
  return request(`${prefix}/suppliers/${params.supplierId}/agents`, {
    method: 'GET',
  });
}
// 搜索协同单位电子协同用户
export async function searchCollIntegratedUsers(params) {
  return request(`${prefix}/suppliers/${params.supplierId}/contacts`, {
    method: 'GET',
  });
}

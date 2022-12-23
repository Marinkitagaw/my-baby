import { stringify } from 'qs';
import { request } from '@cpdm/util';

const prefix = '/cpdm/';
/**
 * 搜索
 */

// 关键字搜索
export async function searchData(params) {
  return request(`${prefix}/materials${stringify(params, { addQueryPrefix: true })}`);
}

// eslint-disable-next-line consistent-return
export async function simpleSearchResource(params) {
  if (params.applyType === 'componentApply') {
    return request(`/resource/apply-type/parts${stringify(params, { addQueryPrefix: true })}`);
  }
  if (params.applyType === 'materialApply') {
    return request(`/resource/apply-type/parts${stringify(params, { addQueryPrefix: true })}`);
  }
  if (params.applyType === 'standardApply') {
    return request(`/resource/apply-type/parts${stringify(params, { addQueryPrefix: true })}`);
  }
  if (params.applyType === 'resourceApply') {
    return request(`/resource/resources${stringify(params, { addQueryPrefix: true })}`);
  }
  if (
    params.applyType === 'basicApply' ||
    params.applyType === 'skeletonApply' ||
    params.applyType === 'typicalApply'
  ) {
    return request(`/resource/basic-library${stringify(params, { addQueryPrefix: true })}`);
  }
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

// 搜索评审内容
export async function searchReviewData(params) {
  return request(`${prefix}/simple-search${stringify(params, { addQueryPrefix: true })}`);
}

// simpleSearchData
export async function simpleSearchData(params) {
  return request(`${prefix}simple-search${stringify(params, { addQueryPrefix: true })}`);
}

export async function simpleSearchPart(params) {
  return request(`${prefix}simple-part-search${stringify(params, { addQueryPrefix: true })}`);
}

import { stringify } from 'qs';
import { request } from '@cpdm/util';

const prefix = '/resource';
const suffix = 'applytype=resource';

export async function listApplys(params) {
  return request(`${prefix}/applys${stringify(params, { addQueryPrefix: true })}`);
}

// 获取详情
export async function getBasicInfo(params) {
  return request(`${prefix}/applys/${params}`);
}

export async function create(params) {
  return request(`${prefix}/applys?${suffix}`, {
    method: 'POST',
    body: params,
  });
}

export async function edit(params) {
  return request(`${prefix}/applys/${params.id}`, {
    method: 'PUT',
    body: params,
  });
}

export async function deleteApply(params) {
  return request(`${prefix}/applys/${params}?${suffix}`, {
    method: 'DELETE',
  });
}

// 获取关系
export async function getApplyRelation(params) {
  return request(`${prefix}/applys/${params}/relation`);
}

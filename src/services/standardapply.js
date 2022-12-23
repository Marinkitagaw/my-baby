import { stringify } from 'qs';
import { request } from '@cpdm/util';

const prefix = '/resource';
const suffix = 'applytype=standard';

// 获取列表
export async function listApplys(params) {
  return request(`${prefix}/applys${stringify(params, { addQueryPrefix: true })}`);
}

// 获取详情
export async function getBasicInfo(params) {
  return request(`${prefix}/applys/${params}`);
}

// 创建
export async function create(params) {
  return request(`${prefix}/applys?${suffix}`, {
    method: 'POST',
    data: params,
  });
}

// 编辑
export async function edit(params) {
  return request(`${prefix}/applys/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}

// 删除
export async function deleteApply(params) {
  return request(`${prefix}/applys/${params}?${suffix}`, {
    method: 'DELETE',
  });
}

// 获取关系对象
export async function getApplyRelation(params) {
  return request(`${prefix}/applys/${params}/relation`);
}

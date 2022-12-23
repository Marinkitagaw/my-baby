import { stringify } from 'qs';
import { request } from '@cpdm/util';
// import { async } from 'q';

const prefix = '/resource';
const BomPrefix = '/bom';
// const suffix = 'applytype=component';
export async function listApplys(params) {
  return request(`${prefix}/applys${stringify(params, { addQueryPrefix: true })}`);
}

// 获取详情
export async function getBasicInfo(params) {
  return request(`${prefix}/applys/${params}`);
}

export async function create(params) {
  return request(`${prefix}/applys?applytype=${params.applytype}`, {
    method: 'POST',
    data: params,
  });
}

export async function edit(params) {
  return request(`${prefix}/applys/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}

export async function deleteApply(params) {
  return request(`${prefix}/applys/${params.id}?applytype=${params.applytype}`, {
    method: 'DELETE',
  });
}
// 创建关联对象
export async function createRelation(params) {
  // /applys/{applyId}/relation
  return request(`${prefix}/applys/${params.id}/relation`, {
    method: 'POST',
    data: params.relation,
  });
}
// 移除关联对象
export async function deleteRelation(params) {
  // /applys/{applyId}/relation
  return request(
    `${prefix}/applys/${params.id}/relation?objectType=${params.objectType}&objectId=${params.objectId}`,
    {
      method: 'DELETE',
    },
  );
}
export async function deleteContent(params) {
  // /applys/{applyId}/relation
  return request(`${prefix}/resources/${params}/content`, {
    method: 'DELETE',
  });
}

// 获取关联对象
export async function getApplyRelation(params) {
  return request(`${prefix}/applys/${params.id}/relation`);
}

// 修改关联对象
export async function editApplyRelation(params) {
  return request(`${BomPrefix}/supplies-info/${params.id}`, {
    method: 'POST',
    data: params,
  });
}

// 获取附件对象
export async function getApplyContent(params) {
  return request(`${prefix}/resources/${params}/content`);
}
// /applys/{applyId}/process
export async function listProcessInstances(params) {
  return request(`${prefix}/applys/${params}/process`);
}
export async function revise(param) {
  return request(`${prefix}/applys/${param}/revise`, {
    method: 'PUT',
  });
}
// 创建物资编码
export async function addMaterial(param) {
  return request(`${BomPrefix}/supplies-info`, {
    method: 'POST',
    data: param,
  });
}

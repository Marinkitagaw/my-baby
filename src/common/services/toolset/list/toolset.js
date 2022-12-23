import { request } from '@cpdm/util';
import { stringify } from 'qs';

const prefix = '/siyuan';

//获取列表
export async function getToolList(params) {
  return request(`${prefix}/apps${stringify(params, { addQueryPrefix: true })}`, {
    method: 'GET',
    data: params,
  });
}

//加载详情
export async function loadingData(params) {
  return request(`${prefix}/apps/${params.id}`, {
    method: 'GET',
  });
}

//获取列表
export async function getApplyList(params) {
  return request(`${prefix}/apps?type=${params.type}`, {
    method: 'GET',
  });
}

//创建工具集
export async function createToolSet(params) {
  return request(`${prefix}/apps?type=AppRecord`, {
    method: 'POST',
    // body: 'AppRecordForm',
    data: params,
  });
}
//编辑工具集
export async function editToolSet(params) {
  return request(`${prefix}/apps/${params.id}?type=modify`, {
    method: 'PUT',
    data: params,
  });
}
//修订工具集
export async function fixToolSet(params) {
  return request(`${prefix}/apps/${params.id}?type=revision`, {
    method: 'PUT',
    data: params,
  });
}

//提交申请
export function subApply(params) {
  return request(`${prefix}/apps/processes?identifier=WF_AppRecord_Review`, {
    method: 'POST',
    data: params.body,
  });
}
export function subUpdateApply(params) {
  return request(`${prefix}/apps/processes?identifier=WF_AppRecord_Modify_Review`, {
    method: 'POST',
    data: params.body,
  });
}
//提交禁用申请
export function subDisableApply(params) {
  return request(`${prefix}/apps/processes?identifier=WF_AppRecord_Cancelled_Review`, {
    method: 'POST',
    data: params.body,
  });
}

//删除工具集
export async function deleteToolSet(params) {
  return request(`${prefix}/apps/${params.id}`, {
    method: 'DELETE',
  });
}

//获取左侧树
export async function getTreeData(params) {
  return request(`/admin/classification-structs/${params.identifier}/nodes?type=identifier`);
}

//获取统计数据
export async function getMajorData(params) {
  return request(`${prefix}/apps/statistics?identifier=${params.type}`, {
    method: 'GET',
  });
}
//获取统计数据
export async function getStepData(params) {
  return request(`${prefix}/apps/statistics?identifier=${params.type}`, {
    method: 'GET',
  });
}
//获取状态
export function getState(params) {
  return request(`/admin/lifecycle-templates/phases?templateName=${params.type}`, {
    method: 'GET',
  });
}

export async function getClassificationData(params) {
  return request(`${prefix}/apps/statistics?identifier=${params.type}`, {
    method: 'GET',
  });
}

//获取categoryId
export async function getCategoryId(params) {
  return request(`/admin/categories/identifier/${params}`);
}

//获取创建表单
export async function getCreateForm(params) {
  return request(`/api/v3/runtime/screen-layouts${stringify(params, { addQueryPrefix: true })}`);
}

export async function downLoadDocument(params) {
  return request(`/resource/resources/download/${params.id}`, {
    url: 'export',
    method: 'GET',
    responseType: 'blob',
  });
}
//获取categoryId
export async function getMajorDictionary(params) {
  return request(`/admin/dict-entries?code=${params}`);
}

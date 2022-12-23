import { stringify } from 'qs';
import { request } from '@cpdm/util';

const prefix = '/admin';

// 列表
export async function listEncodingRules(params) {
  return request(`${prefix}/code-rule?${stringify(params)}`);
}

// 详情
export async function getEncodingRule(params) {
  return request(`${prefix}/code-rule/${params.encodingRuleId}`, {
    method: 'GET',
  });
}

// 创建
export async function createEncodingRule(params) {
  return request(`${prefix}/code-rule`, {
    method: 'POST',
    data: params,
  });
}

// 编辑
export async function editEncodingRule(params) {
  return request(`${prefix}/code-rule/${params.encodingRuleId}`, {
    method: 'PUT',
    data: params,
  });
}

// 删除
export async function deleteEncodingRule(params) {
  return request(`${prefix}/code-rule`, {
    method: 'PUT',
    data: params,
  });
}

// 获取各对象的类型
export async function getCategoryOfObj(params) {
  return request(`/admin/categories/trees/${params.objectType}`);
}

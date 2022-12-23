import { stringify } from 'qs';
import { request } from '@cpdm/util';

const prefix = '/iam';
const cpdm = '/cpdm';

// =============== 策略=======================
// 。1=====策略列表=====

export async function listPolicys(params) {
  return request(`${prefix}/accesses?${stringify(params)}`);
}

export async function getPolicy(params) {
  return request(`${prefix}/accesses/${params.id}`);
}

export async function createPolicy(params) {
  return request(`${prefix}/accesses`, {
    method: 'POST',
    data: params,
  });
}

export async function modifyPolicy(params) {
  return request(`${prefix}/accesses/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}

export async function deletePolicy(params) {
  return request(`${prefix}/accesses/${params.id}`, { method: 'DELETE' });
}

// 批量删除
export async function deletePolicies(param) {
  return request(`${prefix}/policy-objects/batch-delete`, {
    method: 'PUT',
    data: param,
  });
}

// ===。2策略条目===

// 列表
export async function listPolicyEntries(param) {
  return request(`${prefix}/policy-objects/${param.policyObjectId}/policy-entry-objects`);
}

// 详情
export async function getPolicyEntry(param) {
  return request(
    `${prefix}/policy-objects/${param.policyObjectId}/policy-entry-objects/${param.policyEntryObjectId}`
  );
}

// 创建
export async function createPolicyEntry(param) {
  return request(`${prefix}/policy-objects/${param.policyObjectId}/policy-entry-objects`, {
    method: 'POST',
    data: param,
  });
}

// 修改
export async function editPolicyEntry(param) {
  return request(
    `${prefix}/policy-objects/${param.policyObjectId}/policy-entry-objects/${param.policyEntryObjectId}`,
    {
      method: 'PUT',
      data: param,
    }
  );
}

// 删除
export async function deletePolicyEntry(param) {
  return request(
    `${prefix}/policy-objects/${param.policyObjectId}/policy-entry-objects/${param.policyEntryObjectId}`,
    {
      method: 'DELETE',
    }
  );
}

//  =================授权================
export async function listAuthorizations(params) {
  return request(`${prefix}/authorizations?${stringify(params)}`);
}

export async function getAuthorization(params) {
  return request(`${prefix}/authorizations/${params.objectId}`);
}

export async function createAuthorization(params) {
  return request(`${prefix}/authorizations`, {
    method: 'POST',
    data: params,
  });
}

export async function modifyAuthorization(params) {
  return request(`${prefix}/authorizations/${params.objectId}`, {
    method: 'PUT',
    data: params,
  });
}

export async function deleteAuthorization(params) {
  return request(`${prefix}/authorizations/${params}`, { method: 'DELETE' });
}

export async function deleteAuthorizations(param) {
  return request(`${prefix}/authorizations/batch-delete`, {
    method: 'PUT',
    data: param,
  });
}

// 搜索授权主体  用户
export async function queryAuthorityUsers(params) {
  return request(`${prefix}/users/search?${stringify(params)}`);
}

// 搜索授权主体  群组
export async function queryAuthorityGroups(params) {
  return request(`${prefix}/groups/list-of-name?${stringify(params)}`);
}

// 搜索授权主体  角色
export async function queryAuthorityRoles(params) {
  return request(`${prefix}/roles?${stringify(params)}`);
}

// =========================策略管理（临时）===========================

// ------------------域

export async function listPolicyAdmins(params) {
  return request(`${cpdm}/policy-domains?${stringify(params)}`);
}

export async function getPolicyAdmin(params) {
  return request(`${cpdm}/policy-domains/${params.policyDomainId}`);
}

export async function createPolicyAdmin(params) {
  return request(`${cpdm}/policy-domains`, {
    method: 'POST',
    data: params,
  });
}

export async function modifyPolicyAdmin(params) {
  return request(`${cpdm}/policy-domains/${params.policyDomainId}`, {
    method: 'PUT',
    data: params,
  });
}

export async function deletePolicyAdmin(params) {
  return request(`${cpdm}/policy-domains/${params.policyDomainId}`, {
    method: 'DELETE',
  });
}

// 批量删除
export async function deletePolicyAdmins(param) {
  return request(`${cpdm}/policyadmin/batch-delete`, {
    method: 'PUT',
    data: param,
  });
}

// -------------访问控制规则

export async function listAccessRules(params) {
  return request(`${cpdm}/policy-domains/${params.policyDomainId}/rules?${stringify(params)}`);
}

export async function getAccessRule(params) {
  return request(`${cpdm}/policy-rules/${params.ruleId}`, {});
}

export async function createAccessRule(params) {
  return request(`${cpdm}/policy-rules`, {
    method: 'POST',
    data: params,
  });
}

export async function modifyAccessRule(params) {
  return request(`${cpdm}/policy-rules/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}

export async function deleteAccessRule(params) {
  return request(`${cpdm}/policy-rules/${params.ruleId}`, {
    method: 'DELETE',
  });
}

// 获取权限项
export async function listPermissions() {
  return request(`${cpdm}/permissions`);
}

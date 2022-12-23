import { stringify } from 'qs';
import { request } from '@cpdm/util';

const prefix = '/cpdm';

export async function childrenSuppliers(param) {
  return request(`${prefix}/suppliers/children${stringify(param, { addQueryPrefix: true })}`);
}

export async function getAllSuppliers() {
  return request('/cpdm/suppliers');
}

export async function getSubSuppliers(params) {
  return request(`${prefix}/suppliers/${params.supplierId}/sub-suppliers`);
}

export async function getSupplier(params) {
  return request(`${prefix}/suppliers/${params.supplierId}`);
}

export async function getSupplierContacts(params) {
  return request(`${prefix}/suppliers/${params.supplierId}/contacts`);
}

export async function getSupplierUsers(params) {
  return request(`${prefix}/suppliers/users${stringify(params, { addQueryPrefix: true })}`);
}

export async function getSupplierAgents(params) {
  return request(`${prefix}/suppliers/${params.id}/agents?principalOnly=true`);
}

export async function getAllOrganizations(params) {
  return request(`/admin/organizations?${stringify(params)}`);
}

// 组织关联的所有应用
export async function getApplicationInstances(params) {
  return request(`${prefix}/organizations/${params.organizationId}/application-instances`);
}

export async function createSupplier(params) {
  return request(`${prefix}/suppliers`, {
    method: 'POST',
    data: params,
  });
}

export async function modifySupplier(params) {
  return request(`${prefix}/suppliers/${params.supplierId}`, {
    method: 'PUT',
    data: params,
  });
}

export async function deleteSupplier(params) {
  return request(`${prefix}/suppliers/${params.id}`, {
    method: 'DELETE',
  });
}

export async function createContact(params) {
  return request(`${prefix}/suppliers/${params.supplierId}/contacts`, {
    method: 'POST',
    data: params,
  });
}

export async function modifyContact(params) {
  return request(`/cpdm/contacts/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}

export async function deleteContact(params) {
  return request(`/cpdm/contacts/${params.id}`, {
    method: 'DELETE',
  });
}

export async function removeAgent(params) {
  return request(`${prefix}/suppliers/${params.supplierId}/agent?agentId=${params.id}`, {
    method: 'PUT',
  });
}

export async function addAgentsToSupplier(params) {
  return request(`${prefix}/suppliers/${params.supplierId}/agents`, {
    method: 'POST',
    data: params.memberList,
  });
}

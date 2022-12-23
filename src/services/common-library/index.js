import { stringify } from 'qs';
import { request } from '@cpdm/util';

const prefix = '/cpdm';
const charPrefix = '/char';

export async function listPartTypes() {
  return request(`${prefix}/part-types`);
}

export async function library(params) {
  return request(`${charPrefix}/common-target${stringify(params, { addQueryPrefix: true })}`);
}

export async function catalogs(params) {
  return request(
    `${charPrefix}/common-target-catalogs${stringify(params, { addQueryPrefix: true })}`,
  );
}

export async function createCatalogs(params) {
  return request(`${charPrefix}/common-target-catalogs`, {
    method: 'POST',
    data: params,
  });
}

export async function editCatalogs({ id, form }) {
  return request(`${charPrefix}/common-target-catalogs/${id}`, {
    method: 'PUT',
    data: form,
  });
}

export async function deleteCatalogs(param) {
  return request(`${charPrefix}/common-target-catalogs/${param}`, {
    method: 'DELETE',
  });
}

export async function getTargetDirectory() {
  return request(`${charPrefix}/common-target-catalogs/types`);
}

export async function getTargetDirectoryItems(params) {
  return request(`${charPrefix}/common-target-catalogs/${params}`);
}

export async function groupItems({ groupId, ...rest }) {
  return request(
    `${charPrefix}/common-target-groups/${groupId}/items${stringify(rest, {
      addQueryPrefix: true,
    })}`,
  );
}

export async function targetItems({ parentId }) {
  return request(`${charPrefix}/common-targets/${parentId}/children`);
}

// 获取指标下子指标
export async function targetChildren({ parentId }) {
  return request(`${charPrefix}/common-targets/${parentId}/child`);
}

export async function listTargets(params) {
  return request(`${charPrefix}/common-targets${stringify(params, { addQueryPrefix: true })}`);
}

export async function createTarget(form) {
  return request(`${charPrefix}/common-targets`, {
    method: 'POST',
    data: form,
  });
}

export async function modifyTarget(form) {
  return request(`${charPrefix}/common-targets/${form.id}`, {
    method: 'PUT',
    data: form,
  });
}

export async function getTarget(targetId) {
  return request(`${charPrefix}/common-targets/${targetId}`);
}

export async function deleteTarget(targetId) {
  return request(`${charPrefix}/common-targets/${targetId}`, {
    method: 'DELETE',
  });
}

export async function listGroups(pc) {
  return request(`${charPrefix}/common-target-groups${stringify(pc, { addQueryPrefix: true })}`);
}

export async function createGroup(form) {
  return request(`${charPrefix}/common-target-groups`, {
    method: 'POST',
    data: form,
  });
}

export async function modifyGroup(form) {
  return request(`${charPrefix}/common-target-groups/${form.id}`, {
    method: 'PUT',
    data: form,
  });
}

export async function deleteGroup(groupId) {
  return request(`${charPrefix}/common-target-groups/${groupId}`, {
    method: 'DELETE',
  });
}

export async function addTargetToProductCategory(categoryId, targetIds) {
  return request(`${charPrefix}/product-category/${categoryId}/targets`, {
    method: 'POST',
    data: targetIds,
  });
}

export async function removeTargetToProductCategory(categoryId, targetIds) {
  return request(`${charPrefix}/product-category/${categoryId}/targets`, {
    method: 'PUT',
    data: targetIds,
  });
}

export async function deleteFailureMode(id) {
  return request(`${charPrefix}/failure-mode/${id}`, {
    method: 'DELETE',
  });
}

export async function createFailureMode(params) {
  return request(`${charPrefix}/failure-mode`, {
    method: 'POST',
    data: params,
  });
}

export async function updateFailureMode(id, params) {
  return request(`${charPrefix}/failure-mode/${id}`, {
    method: 'put',
    data: params,
  });
}

export async function deleteReliabilityManagementItem({ type, id }) {
  return request(`${charPrefix}/${type}/${id}`, {
    method: 'DELETE',
  });
}
export async function createReliabilityManagementItem({ type, params }) {
  return request(`${charPrefix}/${type}`, {
    method: 'POST',
    data: params,
  });
}
export async function importReliability({ type, params }) {
  return request(`${charPrefix}/${type}`, {
    method: 'POST',
    data: params,
  });
}
export async function downLoadReliability({ type }) {
  return request(`${charPrefix}/${type}`, {});
}

import { stringify } from 'qs';
import { request } from '@cpdm/util';

const prefix = '/admin';

// =================================站点================================
// =====================================================================
export async function listSites(params) {
  return request(`${prefix}/sites?${stringify(params)}`);
}

export async function createtSite(params) {
  return request(`${prefix}/sites`, {
    method: 'POST',
    data: params,
  });
}

export async function getSite(params) {
  return request(`${prefix}/sites/${params.siteId}`);
}

export async function modifySite(params) {
  return request(`${prefix}/sites/${params.siteId}`, {
    method: 'PUT',
    data: params,
  });
}
export async function deleteSite(params) {
  return request(`${prefix}/sites/${params.siteId}`, {
    method: 'DELETE',
  });
}

// 组织关联的应用系统
export async function listApplicationInstances(params) {
  return request(`${prefix}/sites/${params.siteId}/application-instances`);
}

// =========================组织=========================
// =======================================================

export async function listApplicationInstancesByOrg(params) {
  return request(`${prefix}/organizations/${params.organizationId}/application-instances`);
}

/* 组织列表 */
export async function listOrganizations(params) {
  return request(`${prefix}/organizations?${stringify(params)}`);
}

export async function listOrgGroup(params) {
  return request(`${prefix}/common/root/group-tree?${stringify(params)}`);
}

/* 创建组织 */
export async function createOrganization(params) {
  return request(`${prefix}/organizations`, {
    method: 'POST',
    data: params,
  });
}

/* 组织详情 */
export async function getOrganization(params) {
  return request(`${prefix}/organizations/${params.organizationId}`);
}

/* 删除组织 */
export async function deleteOrganization(params) {
  return request(`${prefix}/organizations/${params.organizationId}`, {
    method: 'DELETE',
  });
}

/* 修改组织 */
export async function modifyOrganization(params) {
  return request(`${prefix}/organizations/${params.organizationId}`, {
    method: 'PUT',
    data: params.data,
  });
}

/* 升级组织 */
export async function upgradeOrganization(params) {
  return request(`${prefix}/organizations/${params.organizationId}/upgrade`, {
    method: 'POST',
    data: params,
  });
}

/* 查询组织关联的租户 */
export async function listTenantsByOrg(params) {
  return request(`${prefix}/organizations/${params.organizationId}/tenants`);
}

/* 创建应用系统 */
export async function createApplicationInstance(params) {
  return request(`${prefix}/application-instances`, {
    method: 'POST',
    data: params,
  });
}

/* 查询应用系统详情 */
export async function getApplicationInstance(params) {
  return request(`${prefix}/application-instances/${params.applicationInstanceId}`);
}

/* 修改应用系统 */
export async function modifyApplicationInstance(params) {
  return request(`${prefix}/application-instances/${params.applicationInstanceId}`, {
    method: 'PUT',
    data: params,
  });
}

/* 删除应用系统 */
export async function deleteApplicationInstance(params) {
  return request(`${prefix}/application-instances/${params.applicationInstanceId}`, {
    method: 'DELETE',
  });
}

//  ======================================租户===================================
//  =============================================================================
export async function listTenantGroup(params) {
  // /tenant/root/group-tree
  return request(`${prefix}/admin-tree/root?${stringify(params)}`);
}
export async function getGroupChildren(params) {
  // /tenant/root/group-tree
  return request(`${prefix}/admin-tree/children?${stringify(params)}`);
}
export async function createGroup(params) {
  // /tenant/group-tree
  return request(`${prefix}/admin-tree`, {
    method: 'POST',
    data: params,
  });
}
export async function editGroup(params) {
  // /tenant/group-tree
  return request(`${prefix}/admin-tree`, {
    method: 'PUT',
    data: params,
  });
}
export async function deleteGroup(params) {
  // /common/group-tree/{id}
  return request(`${prefix}/admin-tree/${params.groupTreeId}`, {
    method: 'DELETE',
    // data: params,
  });
}
export async function groupAddTenant(params) {
  // /tenant/group-tree
  return request(`${prefix}/admin-group`, {
    method: 'POST',
    data: params,
  });
}
export async function removeTenant(params) {
  // /tenant/group-tree
  return request(
    `${prefix}/admin-group${stringify(params, {
      addQueryPrefix: true,
    })}`,
    {
      method: 'PUT',
      // data: params,
    }
  );
}
export async function listTenants(params) {
  return request(`${prefix}/tenants?${stringify(params)}`);
}

export async function initializeTenant(params) {
  return request(`${prefix}/tenants/${params.tenantId}/initialize`, {
    method: 'POST',
  });
}
export async function initializeMenu(params) {
  console.log('params', params);
  return request(`${prefix}/menu-items/import-local?${stringify(params)}`, {
    method: 'GET',
  });
}
export async function initializeSupplierAll(params) {
  console.log('params', params);
  return request(`${prefix}/suppliers/initialize-all?${stringify(params)}`, {
    method: 'GET',
  });
}
export async function initializeSupplierOne(params) {
  console.log('params', params);
  return request(`${prefix}/suppliers/initialize-one?${stringify(params)}`, {
    method: 'GET',
  });
}

export async function modifyTenant(params) {
  return request(`${prefix}/tenants/${params.tenantId}`, {
    method: 'PUT',
    data: params,
  });
}

export async function getTenant(params) {
  return request(`${prefix}/tenants/${params.tenantId}`);
}

export async function deleteTenant(params) {
  return request(`${prefix}/tenants/${params.tenantId}`, {
    method: 'DELETE',
  });
}

// 获取租户升级前的组织关联的应用系统

export async function listTenantApplicationInstances(params) {
  return request(`${prefix}/organizations/${params.organizationId}/application-instances`);
}

// ===模块权限====
// 模块列表
export async function listAllModules(param) {
  return request(`${prefix}/modules${stringify(param, { addQueryPrefix: true })}`);
}

// 给租户添加模块权限
export async function addTenantModule(params) {
  return request(`${prefix}/tenants/${params.tenantId}/batch-modify-subscribes`, {
    method: 'PUT',
    data: params.moduleIds,
  });
}

// 查询当前租户的模块权限
export async function listTenantModules(params) {
  return request(`${prefix}/tenants/${params}/modules`);
}

// 导入
export async function importFiles(param) {
  return request(`${prefix}/organizations/import`, {
    method: 'post',
    body: param,
  });
}

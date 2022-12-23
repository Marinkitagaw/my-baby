import { request } from '@cpdm/util';

// ===================================系统初始化数据==================================

// -----------------------------------人员管理

// 1.0用户
export async function importUserFilesV1(param) {
  return request(`/api/users/import`, {
    method: 'post',
    body: param,
  });
}
// 2.0用户
export async function importUserFilesV2(param) {
  return request(`/iam/users/import`, {
    method: 'post',
    body: param,
  });
}

// 群组
export async function importGroupFiles(param) {
  return request(`/iam/groups/import`, {
    method: 'post',
    body: param,
  });
}

// 角色
export async function importRoleFiles(param) {
  return request(`/iam/roles/import`, {
    method: 'post',
    body: param,
  });
}

// 部门
export async function importDepartmentFiles(param) {
  return request(`/iam/departments/import`, {
    method: 'post',
    body: param,
  });
}

// 岗位
export async function importPostFiles(param) {
  return request(`/iam/posts/import`, {
    method: 'post',
    body: param,
  });
}

// -----------------------------------组织架构

// 站点
export async function importSitesFiles(param) {
  return request(`/admin/sites/import`, {
    method: 'post',
    body: param,
  });
}

// 组织
export async function importOrganizationFiles(param) {
  return request(`/admin/organizations/import`, {
    method: 'post',
    body: param,
  });
}
// 租户
export async function importTenantsFiles(param) {
  return request(`/admin/tenants/import`, {
    method: 'post',
    body: param,
  });
}

// ======================================业务数据=======================================

// -------------资源库
// 物料编码
export async function importMaEncodeFiles(param) {
  return request(`/plm/api/stdparts/import`, {
    method: 'post',
    body: param,
  });
}

// 设计管理物料编码
export async function importMbom(param) {
  return request(`/bom/resource-info/batch`, {
    method: 'post',
    body: param,
  });
}

// --------------BOM
// 功能BOM
export async function importEbom(param) {
  return request(`/bom/function-parts/import?objectType=com.casic.cpdm.part.entity.FunctionPart`, {
    method: 'post',
    body: param,
  });
}
// 设计BOM
export async function importDbom(param) {
  return request(`/bom/function-parts/import?objectType=com.casic.cpdm.part.entity.DesignPart`, {
    method: 'post',
    body: param,
  });
}

// BOM获取部门
export async function getAllDepartments(param) {
  return request(`/bom/common-parts/exist-department?objectType=${param.objectType}`);
}
// 导入文件夹
export async function importTemplates(param) {
  return request(`/cpdm/repositories-templates/import`, {
    method: 'post',
    body: param,
  });
}
// 导入团队
export async function importTeams(param) {
  return request(`/cpdm/repositories-templates/${param.templateId}/folders/import`, {
    method: 'post',
    body: param,
  });
}
export async function importComponentSuppliers(param) {
  return request(`/resource/component-supplier/import?groupId=${param.groupId}`, {
    method: 'post',
    body: param,
  });
}
export async function importSupplierClassify(param) {
  return request(`/resource/component-supplier-tree/import?treeKey=${param.treeKey}`, {
    method: 'post',
    body: param,
  });
}
export async function importDelivery(param) {
  return request(`/package/data-package/delivery-tasks/import`, {
    method: 'post',
    body: param,
  });
}

import { stringify } from 'qs';
import { request } from '@cpdm/util';

const prefix = '/iam';

export async function childrenDepartments(params) {
  return request(`${prefix}/departments/${params.parentId}/children`);
}

export async function getSubDepartments(params) {
  return request(`${prefix}/departments?parentId=${params.departmentId}`);
}

export async function getDepartment(params) {
  return request(`${prefix}/departments/${params.departmentId}`);
}

// 获取部门成员
export async function getDepartmentMembers(params) {
  return request(`${prefix}/departments/${params.departmentId}/members?currentDepartment=true`);
}

export async function createDepartment(params) {
  return request(`${prefix}/departments`, {
    method: 'POST',
    data: params,
  });
}

export async function modifyDepartment(params) {
  return request(`${prefix}/departments/${params.departmentId}`, {
    method: 'PUT',
    data: params,
  });
}

export async function deleteDepartment(params) {
  return request(`${prefix}/departments/${params.id}`, {
    method: 'DELETE',
  });
}

// 添加成员
export async function addMembersToDepartment(params) {
  return request(`${prefix}/departments/${params.departmentId}/members`, {
    method: 'POST',
    data: params.memberList,
  });
}

// 移除成员
export async function removeMemberFromDepartment(params) {
  return request(`${prefix}/departments/${params.departmentId}/members/${params.memberId}`, {
    method: 'DELETE',
  });
}

// 编辑成员排序
export async function editMemberSort(params) {
  return request(
    `${prefix}/departments/${params.departmentId}/members?userId=${params.userId}&sort=${params.sort}`,
    {
      method: 'PUT',
      data: params,
    }
  );
}

// ==============================菜单权限=====================================

// 菜单列表
export async function listAllMenus(param) {
  return request(`${prefix}/menu-items${stringify(param, { addQueryPrefix: true })}`);
}

// 给部门添加菜单权限
export async function addDepartmentMenu(params) {
  return request(`${prefix}/departments/${params.departmentId}/menu-access`, {
    method: 'PUT',
    data: params.menuIds,
  });
}

// 查询当前部门已有的菜单权限
export async function listDepartmentMenus(params) {
  return request(`${prefix}/departments/${params}/menu-access`);
}

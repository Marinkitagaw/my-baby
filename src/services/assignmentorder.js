import { stringify } from 'qs';
import { request } from '@cpdm/util';

const prefix = '/change';

// 列表
export async function listAssignmentOrders(params) {
  return request(`${prefix}/assignment-orders?${stringify(params)}`);
}
// 详情
export async function getAssignmentOrder(params) {
  return request(`${prefix}/assignment-orders/${params.assignmentId}`, {
    method: 'GET',
  });
}

// 创建
export async function createAssignmentOrder(params) {
  return request(`${prefix}/assignment-orders`, {
    method: 'POST',
    data: params,
  });
}

// 编辑
export async function editAssignmentOrder(params) {
  return request(`${prefix}/assignment-orders/${params.assignmentId}`, {
    method: 'PUT',
    data: params,
  });
}

// 删除
export async function deleteAssignmentOrder(params) {
  return request(`${prefix}/assignment-orders`, {
    method: 'PUT',
    data: params,
  });
}

// 详情页提交审批
export async function submitAssignmentOrder(params) {
  return request(`${prefix}/assignment-orders/${params}/process`, {
    method: 'post',
    data: params,
  });
}

// 修改所有者
export async function setOwner(params) {
  return request(
    `${prefix}/assignment-orders/${params.assignmentId}/teams?userId=${params.userId}`,
    {
      method: 'PUT',
      data: params,
    }
  );
}

// 详情页关联数据
export async function getRelationLists(params) {
  return request(`${prefix}/assignment-orders/${params.assignmentId}`, {
    method: 'GET',
  });
}

// 详情页关联文档
export async function getRelatedDocuments(assignmentId) {
  return request(`${prefix}/assignment-orders/${assignmentId}/document`);
}

// 详情页关联部件
export async function getRelatedParts(assignmentId) {
  return request(`${prefix}/assignment-orders/${assignmentId}/part`);
}

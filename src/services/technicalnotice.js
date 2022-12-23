import { stringify } from 'qs';
import { request } from '@cpdm/util';

const prefix = '/change';

// 列表
export async function listTechnicalNotices(params) {
  return request(`${prefix}/technical-notices?${stringify(params)}`);
}
export async function listLifecycleTemplates(param) {
  return request(`/admin/lifecycle-templates${stringify(param, { addQueryPrefix: true })}`);
}
export async function listLifecyclePhases(param) {
  return request(`/admin/lifecycle-templates/${param.templateId}/phases`);
}
export async function listProcessInstances(params) {
  // /technical-notices/{noticeId}/processes
  return request(
    `${prefix}/technical-notices/${params.noticeId}/processes?objectType=${params.objectType}`,
  );
}
// 详情
export async function getTechnicalNotice(params) {
  return request(`${prefix}/technical-notices/${params.noticeId}`, {
    method: 'GET',
  });
}
// 关联部件
export async function getReferenceParts(params) {
  return request(`${prefix}/technical-notices/${params.noticeId}/reference-part`);
}
// 关联文档
export async function getTechnicalNoticeDocs(params) {
  return request(`${prefix}/technical-notices/${params.noticeId}/reference-doc`);
}
export async function updateTechnicalNotice(params) {
  return request(`${prefix}/technical-notices/${params}`, {
    method: 'GET',
  });
}

// 创建
export async function createTechnicalNotice(params) {
  return request(`${prefix}/technical-notices`, {
    method: 'POST',
    data: params,
  });
}

// 编辑
export async function editTechnicalNotice(params) {
  return request(`${prefix}/technical-notices/${params.noticeId}`, {
    method: 'PUT',
    data: params,
  });
}

// 删除
export async function deleteTechnicalNotice(params) {
  return request(`${prefix}/technical-notices/${params.noticeId}?mode=${params.mode}`, {
    method: 'DELETE',
  });
}

// 获取部门
export async function getDepartments() {
  return request(`${prefix}/technical-notices/my-department`, {
    method: 'GET',
  });
}

// 修改所有者
export async function setOwner(params) {
  return request(`${prefix}/technical-notices/${params.noticeId}/owner?userId=${params.userId}`, {
    method: 'PUT',
    data: { userId: params.userId },
  });
}

// 详情页关联数据
export async function getRelationLists(params) {
  return request(`${prefix}/technical-notices/${params.noticeId}`, {
    method: 'GET',
  });
}

// 详情页提交审批
export async function submitTechnicalNotice(params) {
  return request(`${prefix}/technical-notices/start-process`, {
    method: 'post',
    data: params.idList,
  });
}

// 任务详情页关联的技术通知单
export async function listTechnicalNoticesOfTask(params) {
  return request(`${prefix}/technical-notices/${params.packageId}/data`);
}

// 跳转原始版本
export async function toOriginal(params) {
  return request(`${prefix}/technical-notices/${params.noticeId}/original`);
}

// 跳转工作副本
export async function toWorkCopy(params) {
  return request(`${prefix}/technical-notices/${params.noticeId}/pwc`);
}

// 检入
export async function checkinTechNotice(param) {
  return request(`/bom/iterates/check-in`, {
    method: 'POST',
    data: param,
  });
}

// 编辑并检入
export async function editAndCheckIn(param) {
  return request(`${prefix}/technical-notices/${param.noticeId}/modify`, {
    method: 'PUT',
    data: param,
  });
}

// 检出
export async function checkoutTechNotice(param) {
  return request(`/bom/iterates/check-out`, {
    method: 'POST',
    data: param,
  });
}

// 撤销检出
export async function undoCheckoutTechNotice(param) {
  return request(`/bom/iterates/undo-checkout`, {
    method: 'POST',
    data: param,
  });
}
// 修订
export async function reviseTechNotice(param) {
  return request(`/bom/iterates/revise`, {
    method: 'POST',
    data: param,
  });
}

// 添加流程数据
export async function addProcessData(param) {
  return request(`${prefix}/technical-notices/${param.packageId}/data`, {
    method: 'PUT',
    data: param.ids,
  });
}

// 移除流程数据
export async function removeProcessData(param) {
  return request(`${prefix}/technical-notices/${param.packageId}/data-remove`, {
    method: 'PUT',
    data: param.ids,
  });
}

export async function listlifecycleStates(param) {
  return request(`${prefix}/lifecycle-states${stringify(param, { addQueryPrefix: true })}`);
}

// 关键字搜索
export async function searchData(params) {
  if (params.requestUrl) {
    return request(`${params.requestUrl}`);
  }
  return request(`${prefix}/search-all${stringify(params.param, { addQueryPrefix: true })}`);
}

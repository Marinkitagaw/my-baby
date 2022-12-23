import { stringify } from 'qs';
import { request } from '@cpdm/util';

const prefix = '/meeting';
const workflow = '/workflow';
const iam = '/iam';

// 重新分配
export async function reAssign({ taskId, ...params }) {
  return request(`${workflow}/tasks/${taskId}/reassign?${stringify(params)}`);
}

// 评审组
export async function getReviewGroups(params) {
  return request(`${prefix}/review-orders/${params.reviewOrderId}/review-status`);
}

// 评审列表
export async function listReviewOrders(params) {
  return request(`${prefix}/review-orders${stringify(params, { addQueryPrefix: true })}`);
}

// 评审详情
export async function getReviewOrder(params) {
  if (params && params.reviewOrderId && params.taskDefinitionKey) {
    return request(
      `${prefix}/review-orders/${params.reviewOrderId}?taskDefinitionKey=${params.taskDefinitionKey}&&hideMessage=true`,
    );
  }
  return request(`${prefix}/review-orders/${params}?hideMessage=true`);
}

// 创建评审
export async function createReviewOrder(params) {
  return request(`${prefix}/review-orders`, {
    method: 'POST',
    data: params,
  });
}

// 编辑评审
export async function editReviewOrder(params) {
  return request(`${prefix}/review-orders/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}

// 获取专家部门树
export async function getExpertDepartmentTree() {
  return request(`${prefix}/review-order/root/tenant-tree`);
}

// 获取专家列表
export async function listParticipants(params) {
  return request(`${prefix}/experts${stringify(params, { addQueryPrefix: true })}`);
}

// 删除评审
export async function deleteReviewOrder(params) {
  return request(`${prefix}/review-orders/${params.reviewOrderId}`, { method: 'DELETE' });
}
// 获取产品库系列
export async function getModelSeries() {
  return request(`/cpdm/repo-series`);
}
// 获取容器产品库列表
export async function getRepositories(params) {
  return request(`/cpdm/repositories${stringify(params, { addQueryPrefix: true })}`);
}

// 获取产品库详情
export async function getProductInfo(params) {
  return request(`/cpdm/repositories/${params.repositoryId}`);
}

// 获取任务流程图
export async function getTaskXml(params) {
  return request(`${workflow}/tasks/${params.taskId}/xml`);
}

// 获取其他专家评审意见
export async function getOtherComments(params) {
  return request(
    `${prefix}/review-orders/${params.reviewOrderId}/other-results?taskId=${params.taskId}&taskDefinitionKey=${params.taskDefinitionKey}`,
  );
}

// 获取历史评审意见
export async function getHistoryComments(params) {
  return request(
    `${prefix}/review-orders/${params.reviewOrderId}/other-results${stringify(params, {
      addQueryPrefix: true,
    })}`,
  );
}

// 获取任务相关的评审结果
export async function getResults(params) {
  return request(
    `${prefix}/review-orders/${params.reviewOrderId}/results?taskDefinitionKey=${params.taskDefinitionKey}`,
  );
}

// 获取代理专家意见
export async function getAgency(params) {
  return request(
    `${prefix}/review-orders/${params.reviewOrderId}/agency?taskDefinitionKey=${params.taskDefinitionKey}`,
  );
}

// 获取代理专家意见评审内容
export async function getAgencyDataResult(params) {
  return request(
    `${prefix}/review-orders/${params.reviewOrderId}/data-result?taskDefinitionKey=${params.taskDefinitionKey}`,
  );
}

// 获取代理专家意见详情
export async function getAgencyInfo(params) {
  return request(
    `${prefix}/review-orders/${params.reviewOrderId}/agency?reviewResultId=${params.reviewResultId}`,
  );
}

// 删除代理专家意见
export async function deleteAgency({ reviewOrderId, reviewResultId }) {
  return request(`${prefix}/review-orders/${reviewOrderId}/result/${reviewResultId}`, {
    method: 'DELETE',
  });
}

// 添加专家意见
export async function saveComments(params) {
  return request(`${prefix}/review-orders/${params.reviewOrderId}/batch-comments`, {
    method: 'PUT',
    data: params,
  });
}

// 获取评审意见落实情况
export async function implement(params) {
  return request(`${prefix}/review-orders/${params.reviewOrderId}/implement`);
}

// 获取所有专家评审意见落实情况
export async function allImplement(params) {
  return request(`${prefix}/review-orders/${params.reviewOrderId}/data/all-comments`);
}
// 获取所有专家评审意见落实情况
export async function allExpertComments(params) {
  return request(
    `${prefix}/public/offline/review-orders/${params.reviewOrderId}/participant-results`,
  );
}
export async function getImplParticipants(params) {
  return request(`${prefix}/review-orders/${params}/participants`);
}

// 修改评审意见落实情况
export async function modifyImplement(params) {
  return request(`${prefix}/review-orders/implement-all/data`, {
    method: 'PUT',
    data: params.implement,
  });
}
// 保存主内容
export async function onSaveContent(params) {
  return request(`${prefix}/review-orders/${params.reviewOrderId}/meeting-data/replace`, {
    method: 'PUT',
    data: params.params,
  });
}

// 查询任务参与者
export async function getParticipants(params) {
  return request(
    `${workflow}/tasks/${params.taskId}/participants?businessKey=${params.businessKey}`,
  );
}

// 创建常用团队
export async function createCommonTeams(params) {
  return request(`${iam}/common-teams`, {
    method: 'POST',
    data: params,
  });
}

// 查询常用团队
export async function getCommonTeams() {
  return request(`${iam}/common-teams`);
}

// 任务页面批量添加重用模板中的成员
export async function addCommonTeams(params) {
  return request(
    `${workflow}/tasks/common/participants-batch?taskId=${params.taskId}&&teamId=${params.teamId}`,
    {
      method: 'POST',
      data: params,
    },
  );
}

// 删除团队
export async function deleteTeam(params) {
  return request(`${iam}/common-teams?teamId=${params.teamId}`, {
    method: 'DELETE',
  });
}

// 查询任务参与者资源池
export async function getAllUsers() {
  return request(`${workflow}/participants/participants-pool`);
}

// 添加流程参与者
export async function addParticipants(params) {
  return request(`${workflow}/tasks/${params.taskId}/participants`, {
    method: 'POST',
    data: params,
  });
}

// 任务页面角色移除成员
export async function deleteParticipants(params) {
  return request(
    `${workflow}/tasks/${params.taskId}/participants?teamRoleMemberId=${params.teamRoleMemberId}`,
    {
      method: 'DELETE',
    },
  );
}

// 流程任务移除成员
export async function deleteProcessParticipants({ processInstanceId, teamRoleMemberId }) {
  return request(
    `${workflow}/process-instances/${processInstanceId}/participants?teamRoleMemberId=${teamRoleMemberId}`,
    {
      method: 'DELETE',
    },
  );
}

// 任务页面批量添加成员
export async function batchAddParticipants({ taskId, value }) {
  return request(`${workflow}/tasks/${taskId}/participants-batch`, {
    method: 'POST',
    data: value,
  });
}

// 流程任务页面批量添加成员
export async function batchAddProcessParticipants({ processInstanceId, value }) {
  return request(`${workflow}/process-instances/${processInstanceId}/participants-batch`, {
    method: 'POST',
    data: value,
  });
}

// 获取秘笈及会议类型
export async function getDictEntries(params) {
  return request(`/admin/dict-entries?${stringify(params)}`);
}

// 获取部门
export async function getDepartments() {
  return request(`/cpdm/my-departments`);
}

// 获取部门
export async function getDepartmentsTree() {
  return request(`/admin/my-departments/tree`);
}

// 获取所有部门
export async function getAllDepartments() {
  return request(`${prefix}/review-orders/department`);
}

// 获取流程团队
export async function getProcessParticipants(params) {
  return request(`/workflow/process-instances/${params.processInstanceId}/participants`);
}

// 获取所有专家意见
export async function getAllComments(params) {
  return request(`${prefix}/review-orders/${params.reviewOrderId}/all-comments`);
}

// 导出
export async function exportReviewOrder(params) {
  return request(`${prefix}/review-orders/${params.reviewOrderId}/export`, {
    method: 'POST',
    data: params,
  });
}

// 提交审批
export async function submitReviewOrder(params) {
  return request(`${prefix}/review-orders/${params.reviewOrderId}/review`, {
    method: 'POST',
    data: params,
  });
}
// 会议归档
export async function archiveReviewOrder(params) {
  return request(`${prefix}/review-orders/${params.reviewOrderId}/archive`, {
    method: 'POST',
    data: params,
  });
}

// 获取流程中已选择专家
export async function selectParticipants(params) {
  return request(
    `${prefix}/review-orders/${params.reviewOrderId}/participants${stringify(params, {
      addQueryPrefix: true,
    })}`,
  );
}

// 评审概览
export async function getOverview(params) {
  return request(`${prefix}/review-orders/overview${stringify(params, { addQueryPrefix: true })}`);
}

// 评审结论模板列表
export async function getOrderTemplate(params) {
  return request(`${prefix}/review-order-template${stringify(params, { addQueryPrefix: true })}`);
}

// 评审结论模板详情
export async function getTemplateInfo({ templateId }) {
  return request(`${prefix}/review-order-template/${templateId}`);
}

// 新建评审结论模板
export async function createTemplate(params) {
  return request(`${prefix}/review-order-template`, {
    method: 'PUT',
    data: params,
  });
}

// 删除评审结论模板
export async function deleteTemplate({ templateId }) {
  return request(`${prefix}/review-order-template/${templateId}`, {
    method: 'DELETE',
  });
}

// 评审通知列表
export async function getOrderInforms(params) {
  return request(`${prefix}/review-order-informs${stringify(params, { addQueryPrefix: true })}`);
}

// 评审通知详情
export async function getInformsInfo({ reviewOrderInformId }) {
  return request(`${prefix}/review-order-inform/${reviewOrderInformId}`);
}

// 新建评审通知
export async function createInforms(params) {
  return request(`${prefix}/review-order-inform`, {
    method: 'PUT',
    data: params,
  });
}

// 批量删除
export async function batchDeletion(params) {
  return request(`${prefix}/review-orders/delete`, {
    method: 'PUT',
    data: params,
  });
}

// 批量重置流程
export async function resetProcess(params) {
  return request(`${prefix}/review-orders/reset`, {
    method: 'PUT',
    data: params,
  });
}

// 获取批量删除权限
export async function getIsAdmin() {
  return request(`${prefix}/review-orders/isAdmin`);
}

// 删除评审通知
export async function deleteInforms({ reviewOrderInformId }) {
  return request(`${prefix}/review-order-inform/${reviewOrderInformId}`, {
    method: 'DELETE',
  });
}

// 删除评审通知
export async function deleteNotice(params) {
  return request(`${prefix}/review-order-inform/delete`, {
    method: 'PUT',
    data: params,
  });
}

// 保存上传文件
export async function saveCommentFile({ reviewOrderId, fileData }) {
  return request(`${prefix}/review-orders/${reviewOrderId}/meeting-data`, {
    method: 'POST',
    data: fileData,
  });
}

// 删除上传文件
export async function deleteCommentFile({ reviewOrderId, meetingDataId }) {
  return request(`${prefix}/review-orders/${reviewOrderId}/meeting-data/${meetingDataId}`, {
    method: 'DELETE',
  });
}

// 获取历史记录
export async function getConclusionHistory(params) {
  return request(
    `${prefix}/review-orders/${params.reviewOrderId}/issues/conclusion${stringify(params, {
      addQueryPrefix: true,
    })}`,
  );
}

// 保存结论
export async function setClusion({ reviewOrderId, conclusionValue }) {
  return request(`${prefix}/review-orders/${reviewOrderId}/conclusion`, {
    method: 'PUT',
    data: conclusionValue,
  });
}

// 任务更换评审组人员
export async function setParticipants({ reviewOrderId, meetingParticipantList }) {
  return request(`${prefix}/review-orders/${reviewOrderId}/participants `, {
    method: 'PUT',
    data: meetingParticipantList,
  });
}

// 任务s删除评审组人员
export async function deleteTaskParticipants({ reviewOrderId, participantIdList }) {
  return request(`${prefix}/review-orders/${reviewOrderId}/participants `, {
    method: 'DELETE',
    data: participantIdList,
  });
}

// 获取专家库树列表
export async function classifyTree(params) {
  return request(
    `${prefix}/review-order/root/classify-tree${stringify(params, {
      addQueryPrefix: true,
    })}`,
  );
}

// 获取专家库树children
export async function getDepartmentChildren(params) {
  return request(
    `${prefix}/review-order/children/classify-tree${stringify(params, {
      addQueryPrefix: true,
    })}`,
  );
}

// 保存部门
export async function saveDepartment(params) {
  return request(`${prefix}/review-order/classify-tree`, {
    method: 'POST',
    data: params,
  });
}

// 保存部门
export async function editDepartment(params) {
  return request(`${prefix}/review-order/classify-tree`, {
    method: 'PUT',
    data: params,
  });
}

// 删除部门
export async function deleteDepartment({ treeId }) {
  return request(`${prefix}/review-order/classify-tree/${treeId}`, {
    method: 'DELETE',
  });
}

// 分组中添加专家
export async function groupAddExpert(params) {
  return request(`${prefix}/experts-classify`, {
    method: 'POST',
    data: params,
  });
}

// 分组中添加专家
export async function removeExpert(params) {
  return request(
    `${prefix}/experts-classify${stringify(params, {
      addQueryPrefix: true,
    })}`,
    {
      method: 'PUT',
    },
  );
}

// 转为线下会议
export async function turnOffLine({ reviewOrderId, meetingRoomId }) {
  return request(
    `${prefix}/review-order/${reviewOrderId}/meeting-room?meetingRoomId=${meetingRoomId}`,
    {
      method: 'PUT',
    },
  );
}

// 统计月报

// 添加
export async function addStaticMeeting(params) {
  return request(`${prefix}/review-orders/statics/add`, {
    method: 'POST',
    data: params,
  });
}

// 移除
export async function deleteStaticMeeting(param) {
  return request(`${prefix}/review-orders/statics/delete `, {
    method: 'DELETE',
    data: param,
  });
}

export async function getRelatePartList(params) {
  return request(
    `${prefix}/review-orders/part-trees${stringify(params, {
      addQueryPrefix: true,
    })}`,
  );
}

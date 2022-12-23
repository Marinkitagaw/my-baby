import { stringify } from 'qs';
import { request } from '@cpdm/util';

const workflow = '/workflow';

// 流程及任务
// 任务列表
export async function listTasks(params) {
  return request(`${workflow}/tasks${stringify(params, { addQueryPrefix: true })}`);
}
// 任务详情
export async function getTask(params) {
  return request(`${workflow}/tasks/${params}`);
}

// 将任务标记为已读
export async function signTask(params) {
  return request(`${workflow}/tasks/${params.taskId}/sign`, {
    method: 'PUT',
    data: params,
  });
}

// 完成任务
export async function completeTask(params) {
  console.log(params);
  return request(`${workflow}/tasks/${params.taskId}/complete`, {
    method: 'PUT',
    data: params,
  });
}
// 完成任务
export async function saveContents(params) {
  return request(`${workflow}/task-files`, {
    method: 'POST',
    data: params.fileList,
  });
}
export async function getTaskFiles1(params) {
  return request(`${workflow}/task-files?${stringify(params)}`);
}
export async function deleteContent(params) {
  return request(`${workflow}/task-files/${params}`, {
    method: 'DELETE',
  });
}

// 获取流程数据
export async function getProcessData(params) {
  return request(`${workflow}/tasks/${params.id}/business`);
}

// 获取流程模板实例数据
export async function getProcessInstanceData(params) {
  return request(`${workflow}/resources/process-instance/process-instances/${params}/activities`);
}

// 获取流程历史记录
export async function getTaskProcessStatus(params) {
  return request(`${workflow}/tasks/${params}/process-status`);
}

// 获取任务审批意见列表
export async function listTaskReviewComments(params) {
  return request(`${workflow}/tasks/${params.id}/review-comments`);
}

// 获取流程审批意见列表
export async function listProcessInstanceReviewComments(params) {
  return request(`${workflow}/process-instances/${params.params}/review-comments`);
}

export async function createReviewComment(params) {
  return request(`${workflow}/review-comments`, {
    method: 'POST',
    data: params,
  });
}

export async function editReviewComment(params) {
  return request(`${workflow}/review-comments/${params.reviewCommentId}`, {
    method: 'PUT',
    data: params,
  });
}

export async function getReviewComment(params) {
  return request(`${workflow}/review-comments/${params}`);
}

export async function deleteComment(params) {
  return request(`${workflow}/review-comments/${params.reviewCommentId}`, {
    method: 'DELETE',
  });
}

// 获取任务表单信息
export async function getTaskForm(params) {
  return request(`${workflow}/tasks/${params.taskId}/form`);
}

// 获取任务附件
export async function getTaskFiles(params) {
  return request(`${workflow}/tasks/${params.taskId}/all-files`);
}

// 保存任务附件
export async function saveTaskFiles(params) {
  return request(`${workflow}/tasks/${params.taskId}/files/save`, {
    method: 'POST',
    data: params,
  });
}

// 下载任务附件
export async function downloadFile(params) {
  return request(`${workflow}/tasks/download/${params.fileId}?fileName=${params.fileName}`);
}

// 删除任务附件

export async function deleteFile(params) {
  return request(`${workflow}/tasks/${params.taskId}/files/${params.taskFileId}`, {
    method: 'DELETE',
  });
}

// 获取流程所有任务
export async function getProcessFiles(params) {
  return request(`${workflow}/process-instances/${params.processInstanceId}/all-files`);
}

// 获取流程处理记录
export async function getProcessStatus(params) {
  return request(`${workflow}/process-instances/${params.processInstanceId}/process-status`);
}

// 获取更改日志
export async function getChangeLog(params) {
  return request(`${workflow}/tasks/${params.taskId}/change-log`);
}

// 获取流程更改日志
export async function getProcessChangeLog(params) {
  return request(`${workflow}/process-instances/${params.processInstanceId}/change-log`);
}

// 获取结构化签审意见
export async function getStructuredComments(params) {
  return request(`${workflow}/tasks/review-comments${stringify(params, { addQueryPrefix: true })}`);
}

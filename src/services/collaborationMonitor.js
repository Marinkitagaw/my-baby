import { stringify } from 'qs';
import { request } from '@cpdm/util';

const prefix = '/api/collaboration';

export async function processInstances(params) {
  return request(`${prefix}/exchange/process-instances/?${stringify(params)}`);
}

export async function processBusinessTypes() {
  return request(`${prefix}/exchange/process-instances/business-types`);
}

export async function terminationProcess(params) {
  return request(`${prefix}/exchange/process-instances/${params.id}`, {
    method: 'DELETE',
  });
}

export async function terminationProcessInstances(params) {
  return request(`${prefix}/exchange/process-instances`, {
    method: 'DELETE',
    body: params,
  });
}

export async function getAgents(params) {
  return request(`${prefix}/data-packages/${params.id}/agent-member`);
}

export async function reassignAgent(params) {
  return request(`${prefix}/data-packages/${params.id}/reassign-agent?${stringify(params)}`, {
    method: 'POST',
  });
}

export async function listStatus() {
  return request(`${prefix}/data-packages/status`);
}

export async function listApplications() {
  return request(`${prefix}/collaboration/application-instances`);
}

export async function listSendRecords(params) {
  return request(`${prefix}/send-records?${stringify(params)}`);
}

// 根据trackingId查询当前任务环节重复错误的次数
export async function getCurrentTaskRepeats(params) {
  return request(`${prefix}/data-packages/current-task-repeat`, {
    method: 'POST',
    body: params,
  });
}

export async function listReceiveRecords(params) {
  return request(`${prefix}/receive-records?${stringify(params)}`);
}

export async function getBasicInfo(params) {
  return request(`${prefix}/data-packages/${params.id}`);
}

export async function getHistory(params) {
  return request(`${prefix}/data-packages/${params.id}/history`);
}

export async function getHistoryRetry(params) {
  return request(`${prefix}/data-packages/${params.id}/activities/${params.activityKey}/retry`);
}
export async function getHistorySkip(params) {
  return request(`${prefix}/data-packages/${params.id}/activities/${params.activityKey}/skip`);
}
export async function getLocalProcess(params) {
  return request(`${prefix}/data-packages/${params.id}/process`);
}
export async function getOppositeProcess(params) {
  return request(`${prefix}/data-packages/${params.id}/opposite-process`);
}
export async function getOppositeProcessOld(params) {
  return request(`${prefix}/data-packages/${params.id}/opposite-process-old`);
}
export async function restartProcess(params) {
  return request(`${prefix}/data-packages/${params.id}/restart`);
}
export async function cancelProcess(params) {
  return request(`${prefix}/data-packages/${params.id}/cancel-process`, {
    method: 'POST',
    body: params,
  });
}

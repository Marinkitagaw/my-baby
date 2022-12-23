import { stringify } from 'qs';
import { request } from '@cpdm/util';

const prefix = '/scheduler';

// ========任务管理=======

// 列表
export async function listScheduledTasks(param) {
  return request(`${prefix}/scheduled-tasks${stringify(param, { addQueryPrefix: true })}`);
}

// 详情
export async function getScheduledTask(param) {
  return request(`${prefix}/scheduled-tasks/${param.id}`);
}

// 创建
export async function createScheduledTask(params) {
  return request(`${prefix}/scheduled-tasks`, {
    method: 'POST',
    data: params,
  });
}

// 修改
export async function modifyScheduledTask(param) {
  return request(`${prefix}/scheduled-tasks/${param.id}`, {
    method: 'PUT',
    data: param,
  });
}

// 删除
export async function deleteScheduledTask(param) {
  return request(`${prefix}/scheduled-tasks/${param.id}`, {
    method: 'DELETE',
  });
}

// 批量删除
export async function deleteScheduledTasks(param) {
  return request(`${prefix}/scheduled-tasks`, {
    method: 'PUT',
    data: param,
  });
}

// ========日志管理=======
// 列表
export async function listScheduledLogs(param) {
  return request(`${prefix}/scheduled-logs${stringify(param, { addQueryPrefix: true })}`);
}

// ==============运行报表================

// 运行报表
export async function loadReports(params) {
  return request(`${prefix}/index/graphInfo${stringify(params, { addQueryPrefix: true })}`);
}

// 仪表盘

export async function loadDashbord() {
  return request(`${prefix}/index/dashboardInfo`);
}

// ========任务管理2222222=======

// 列表
export async function listTaskManagements(param) {
  return request(`${prefix}/info/pageList${stringify(param, { addQueryPrefix: true })}`);
}

// 详情
export async function getTaskManagement(param) {
  return request(`${prefix}/info/infoDetails/${param.id}`);
}

// 创建
export async function createTaskManagement(params) {
  return request(`${prefix}/info/add`, {
    method: 'POST',
    data: params,
  });
}

// 修改
export async function modifyTaskManagement(param) {
  return request(`${prefix}/info/update`, {
    method: 'PUT',
    data: param,
  });
}

// 删除
export async function deleteTaskManagement(param) {
  return request(`${prefix}/info/remove/${param.id}`, {
    method: 'DELETE',
  });
}

// 批量删除
export async function deleteTaskManagements(param) {
  return request(`${prefix}/scheduled-tasks`, {
    method: 'PUT',
    data: param,
  });
}

// 执行一次
export async function triggerSchedule(params) {
  return request(`${prefix}/info/trigger/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}

// 下次执行时间
export async function nextExecutionTime(params) {
  return request(`${prefix}/info/nextTriggerTime?cron=${params.cron}`);
}

// 启动
export async function startScheduler(params) {
  return request(`${prefix}/info/start/${params}`, {
    method: 'PUT',
    data: params,
  });
}

// 停止
export async function stopScheduler(params) {
  return request(`${prefix}/info/stop/${params}`, {
    method: 'PUT',
    data: params,
  });
}

// =========================日志管理======================
// 列表
export async function listTaskLogs(param) {
  return request(`${prefix}/log/pageList${stringify(param, { addQueryPrefix: true })}`);
}

// 执行日志
export async function executionLog(params) {
  return request(`${prefix}/log/logDetailPage/${params.id}`);
}

// ================执行器管理===============

// 列表
export async function listActuatorMas(param) {
  return request(`${prefix}/group/listGroup${stringify(param, { addQueryPrefix: true })}`);
}

// 详情
export async function getActuatorMa(param) {
  return request(`${prefix}/group/loadById/${param.id}`, {
    method: 'POST',
    data: param,
  });
}

// 创建
export async function createActuatorMa(params) {
  return request(`${prefix}/group/save`, {
    method: 'POST',
    data: params,
  });
}

// 修改
export async function modifyActuatorMa(param) {
  return request(`${prefix}/group/update`, {
    method: 'PUT',
    data: param,
  });
}

// 删除
export async function deleteActuatorMa(param) {
  return request(`${prefix}/group/delete/${param.id}`, {
    method: 'DELETE',
  });
}

// 批量删除
export async function deleteActuatorMas(param) {
  return request(`${prefix}/scheduled-tasks`, {
    method: 'PUT',
    data: param,
  });
}

import { stringify } from 'qs';
import { request } from '@cpdm/util';

const prefix = '/workflow';
const pre = '/admin';

export async function importProcessDefinition() {
  return request(`${prefix}/process-definitions/import`, {
    method: 'POST',
  });
}

// 获取外单位协同会签
export async function getSupplierDescription(params) {
  return request(
    `${prefix}/process-exchange-comments${stringify(params, {
      addQueryPrefix: true,
    })}`,
  );
}

// 保存外单位协同会签
export async function saveSupplierDescription(params) {
  return request(`${prefix}/process-exchange-comments`, {
    method: 'POST',
    data: params,
  });
}

// 删除外单位协同会签
export async function deleteSupplierDescription(params) {
  return request(
    `${prefix}/process-exchange-comments${stringify(params, { addQueryPrefix: true })}`,
    {
      method: 'DELETE',
    },
  );
}

// 获取流程实例详情
export async function getDefinitionInfo(params) {
  return request(`${prefix}/process-instances/${params.processInstanceId}/info`);
}

// 获取流程流程图
export async function getProcessXml(params) {
  return request(`${prefix}/process-instances/${params.processInstanceId}/xml`);
}

// 获取流程模板工作流详情
export async function getDefinitionConfig(params) {
  return request(`${prefix}/definition-config/${params.id}`);
}
// 获取流程模板工作流详情
export async function updateActivitySubProcess(params) {
  return request(
    `${prefix}/definition-config/${params.id}/activity-subProcess/${params.activityId}`,
    {
      method: 'PUT',
      data: params,
    },
  );
}
// 获取子流程列表
export async function handleSubprocess() {
  return request(`${prefix}/process-definitions`);
}

/**
 * 查询流程模板详情
 * @param {*} params
 */
export async function listProcessDefinitions(params) {
  return request(`${prefix}/process-definitions?${stringify(params)}`);
}

/**
 * 激活流程模板详情
 * @param {*} params
 */
export async function activateProcessDefinition(params) {
  return request(
    `${prefix}/process-definitions/key/${params.processDefinitionKey}/id/${params.processDefinitionId}/start_process`,
    {
      method: 'PUT',
    },
  );
}

/**
 * 挂起流程模板详情
 * @param {*} params
 */
export async function hangProcessDefinition(params) {
  return request(
    `${prefix}/process-definitions/key/${params.processDefinitionKey}/id/${params.processDefinitionId}/suspension_process`,
    {
      method: 'PUT',
    },
  );
}

/**
 * 删除流程模板
 * @param {*} params
 */
export async function deleteProcessDefinition(params) {
  return request(`${prefix}/process-definitions/${params.processDefinitionId}`, {
    method: 'DELETE',
  });
}

// 导入流程模板
export async function saveFiles(params) {
  return request(`${prefix}/deployments`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 测试流程模板
 * @param {*} params
 */
export async function testProcessDefinition(params) {
  return request(`${prefix}/process-definitions/${params.processDefinitionId}/start`, {
    method: 'POST',
    data: {},
  });
}

/**
 * 查询流程模板BPMN定义
 * @param {*} params
 */
export async function getProcessDefinitionBpmn(params) {
  return request(`${prefix}/process-definitions/${params.processDefinitionId}/xml`);
}

// 导入模板文件 importFile
export async function importFile(params) {
  return request(`${prefix}/process-definitions/${params.processDefinitionId}/import_json`, {
    method: 'POST',
    data: params,
  });
}

// 创建流程模板
export async function createProcessDefinition(params) {
  return request(`${prefix}/process-definitions`, {
    method: 'POST',
    data: params,
  });
}

// 获取流程模板详情
export async function getProcessDefinition({ processDefinitionId }) {
  return request(`${prefix}/process-definitions/${processDefinitionId}`);
}

// 修改流程模板
export async function modifyProcessDefinition(params) {
  return request(`${prefix}/process-definitions/${params.processDefinitionId}`, {
    method: 'PUT',
    data: params,
  });
}

/**
 * 查询流程实例列表
 * @param {*} params
 */
export async function listProcessInstances(params) {
  return request(`${prefix}/process-instances?${stringify(params)}`);
}

/**
 * 查询流程任务列表
 * @param {*} params
 */
export async function listAllTasks(params) {
  return request(`${prefix}/tasks/all?${stringify(params)}`);
}

/**
 * 删除流程实例
 * @param {*} params
 */
export async function deleteProcessInstance(params) {
  return request(`${prefix}/process-instances/${params.processInstanceId}`, {
    method: 'DELETE',
  });
}

// 批量删除流程实例
export async function deleteProcessInstances(params) {
  return request(`${prefix}/process-instances`, {
    method: 'PUT',
    data: params,
  });
}

/**
 * 暂停流程实例
 * @param {*} params
 */
export async function suspendProcessInstance(params) {
  return request(`${prefix}/process-instances/${params.processInstanceId}/suspended`, {
    method: 'PUT',
  });
}

/**
 * 激活流程实例
 * @param {*} params
 */
export async function activateProcessInstance(params) {
  return request(`${prefix}/process-instances/${params.processInstanceId}/activate`, {
    method: 'PUT',
  });
}

/**
 * 激活流程实例详情
 * @param {*} params
 */
export async function activateProcessInstances(params) {
  return request(`${prefix}/process-instances/${params.processInstanceId}/activate`, {
    method: 'PUT',
  });
}

/**
 * 挂起流程实例详情
 * @param {*} params
 */
export async function hangProcessInstances(params) {
  return request(`${prefix}/process-instances/${params.processInstanceId}/suspended`, {
    method: 'PUT',
  });
}

/**
 * 更新流程
 * @param {*} params
 */
export async function evaluateParticipants(processInstanceId) {
  return request(`${prefix}/process-instances/${processInstanceId}/evaluate-participants`);
}

// =========任务表单模板=========

// 列表
export async function listTaskFormInfo(param) {
  return request(`${prefix}/task-form-templates${stringify(param, { addQueryPrefix: true })}`);
}

// 详情
export async function getTaskFormInfo(param) {
  return request(`${prefix}/task-form-templates/${param.id}`);
}

// 创建
export async function createTaskFormInfo(param) {
  return request(`${prefix}/task-form-templates`, {
    method: 'POST',
    data: param,
  });
}

// 修改
export async function editTaskFormInfo(param) {
  return request(`${prefix}/task-form-templates/${param.id}`, {
    method: 'PUT',
    data: param,
  });
}

// 删除
export async function deleteTaskFormInfo(param) {
  return request(`${prefix}/task-form-templates/${param.id}`, {
    method: 'DELETE',
  });
}

// 批量删除
export async function deleteTaskFormInfos(param) {
  return request(`${prefix}/task-form-templates`, {
    method: 'PUT',
    data: param,
  });
}

// 模块列表
export async function listModules(param) {
  return request(`/admin/modules${stringify(param, { addQueryPrefix: true })}`);
}

// 批量导入
export async function saveTaskFiles(params) {
  return request(`${prefix}/task-form-templates/import/excel`, {
    method: 'POST',
    data: params,
  });
}

// ===============生命周期=================

//  1. =====生命周期状态======

// 列表state
export async function listlifecycleStates(param) {
  return request(`${pre}/lifecycle-states${stringify(param, { addQueryPrefix: true })}`);
}

// 详情state
export async function getlifecycleState(param) {
  return request(`${pre}/lifecycle-states/${param.id}`);
}

// 创建state
export async function createlifecycleState(param) {
  return request(`${pre}/lifecycle-states`, {
    method: 'POST',
    data: param,
  });
}

// 修改state
export async function editlifecycleState(param) {
  return request(`${pre}/lifecycle-states/${param.id}`, {
    method: 'PUT',
    data: param,
  });
}

// 删除state
export async function deletelifecycleState(param) {
  return request(`${pre}/lifecycle-states/${param.id}`, {
    method: 'DELETE',
  });
}

// 批量删除 state
export async function deletelifecycleStates(params) {
  return request(`${pre}/lifecycle-states/multiple`, {
    method: 'PUT',
    data: params,
  });
}

// 导入
export async function saveLifeCycleFiles(params) {
  return request(`${pre}/lifecycle-states/import`, {
    method: 'POST',
    data: params,
  });
}

//  2. =====生命周期模板=====

// 2.1===模板===

// 列表template
export async function listLifecycleTemplates(param) {
  return request(`${pre}/lifecycle-templates${stringify(param, { addQueryPrefix: true })}`);
}

// 详情template
export async function getLifecycleTemplate(param) {
  return request(`${pre}/lifecycle-templates/${param.id}`);
}

// 创建 template
export async function createLifecycleTemplate(param) {
  return request(`${pre}/lifecycle-templates`, {
    method: 'POST',
    data: param,
  });
}

// 修改template
export async function editLifecycleTemplate(param) {
  return request(`${pre}/lifecycle-templates/${param.id}`, {
    method: 'PUT',
    data: param,
  });
}

// 删除template
export async function deleteLifecycleTemplate(param) {
  return request(`${pre}/lifecycle-templates/${param.id}`, {
    method: 'DELETE',
  });
}

// 批量删除template
export async function deleteLifecycleTemplates(params) {
  return request(`${pre}/lifecycle-templates/multiple`, {
    method: 'PUT',
    data: params,
  });
}

// 导入
export async function saveLifeCycleTemplateFiles(params) {
  return request(`${pre}/lifecycle-templates/import`, {
    method: 'POST',
    data: params,
  });
}

//   2.2 ===阶段===

// 列表 phase
export async function listLifecyclePhases(param) {
  return request(`${pre}/lifecycle-templates/${param.templateId}/phases`);
}

// 详情phase
export async function getLifecyclePhase(param) {
  return request(`${pre}/lifecycle-templates/${param.templateId}/phases/${param.phaseId}`);
}

// 创建phase
export async function createLifecyclePhase(param) {
  return request(`${pre}/lifecycle-templates/${param.templateId}/phases`, {
    method: 'POST',
    data: param,
  });
}

// 修改phase
export async function editLifecyclePhase(param) {
  return request(`${pre}/lifecycle-templates/${param.templateId}/phases/${param.phaseId}`, {
    method: 'PUT',
    data: param,
  });
}

// 删除phase
export async function deleteLifecyclePhase(param) {
  return request(`${pre}/lifecycle-templates/${param.templateId}/phases/${param.phaseId}`, {
    method: 'DELETE',
  });
}

// 批量删除 phase
export async function deletelifecyclePhases(param) {
  return request(`${pre}/lifecycle-templates/${param.templateId}/phases/multiple`, {
    method: 'PUT',
    data: param,
  });
}

// ===========================参与者校验配置===========================
export async function listProcesConfigs(param) {
  return request(`${pre}/lifecycle-templates/${param.categoryId}/phases`);
}

export async function getProcesConfig(param) {
  return request(`${pre}/lifecycle-templates/${param.categoryId}/phases/${param.phaseId}`);
}

export async function createProcesConfig(param) {
  return request(`${pre}/lifecycle-templates/${param.categoryId}/phases`, {
    method: 'POST',
    data: param,
  });
}

export async function editProcesConfig(param) {
  return request(`${pre}/lifecycle-templates/${param.categoryId}/phases/${param.processId}`, {
    method: 'PUT',
    data: param,
  });
}

export async function deleteProcesConfig(param) {
  return request(`${pre}/lifecycle-templates/${param.categoryId}/phases/${param.processId}`, {
    method: 'DELETE',
  });
}

export async function deleteProcesConfigs(param) {
  return request(`${pre}/lifecycle-templates/${param.categoryId}/phases/multiple`, {
    method: 'PUT',
    data: param,
  });
}

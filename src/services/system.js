import { stringify } from 'qs';
import { request } from '@cpdm/util';

const prefix = '/admin';

// =========菜单管理========

// 列表
export async function listMenus(param) {
  return request(`${prefix}/menu-items${stringify(param, { addQueryPrefix: true })}`);
}

// 详情
export async function getMenu(param) {
  return request(`${prefix}/menu-items/${param.id}`);
}

// 创建
export async function createMenu(param) {
  return request(`${prefix}/menu-items`, {
    method: 'POST',
    data: param,
  });
}

// 修改
export async function editMenu(param) {
  return request(`${prefix}/menu-items/${param.id}`, {
    method: 'PUT',
    data: param,
  });
}

// 删除
export async function deleteMenu(param) {
  return request(`${prefix}/menu-items/${param.id}`, {
    method: 'DELETE',
  });
}

// 批量删除
export async function deleteMenus(param) {
  return request(`${prefix}/menu-items`, {
    method: 'PUT',
    data: param,
  });
}

// 导入
export async function saveMenuFiles(param) {
  return request(`${prefix}/menu-items/import`, {
    method: 'post',
    body: param,
  });
}

// ========参数管理=======

// 列表
export async function listParams(param) {
  return request(`${prefix}/params${stringify(param, { addQueryPrefix: true })}`);
}

// 详情
export async function getParam(param) {
  return request(`${prefix}/params/${param.id}`);
}

// 创建
export async function createParam(params) {
  return request(`${prefix}/params`, {
    method: 'POST',
    data: params,
  });
}

// 修改
export async function editParam(param) {
  return request(`${prefix}/params/${param.id}`, {
    method: 'PUT',
    data: param,
  });
}

// 删除
export async function deleteParam(param) {
  return request(`${prefix}/params/${param.id}`, {
    method: 'DELETE',
  });
}

// 批量删除
export async function deleteParams(param) {
  return request(`${prefix}/params`, {
    method: 'PUT',
    data: param,
  });
}
// 批量导入
export async function saveParamFiles(params) {
  return request(`${prefix}/params/import`, {
    method: 'POST',
    data: params,
  });
}

// =========字典管理=========

// ===字典类型===
// 根据模块id获取分组
export async function getGroup(params) {
  // /dictionaries/groups
  return request(`/admin/dictionaries/groups${stringify(params, { addQueryPrefix: true })}`);
}

// 创建分组
export async function createOperationalGroup(params) {
  // /dictionaries/groups"
  return request(`${prefix}/dictionaries/groups`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 创建分组
export async function editGroup(params) {
  // /operationals/group/{groupId}
  // /dictionaries/groups/{groupId}
  return request(`${prefix}/dictionaries/groups/${params.groupId}`, {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}
export async function deleteGroup(params) {
  // /operationals/group/{groupId}
  return request(`${prefix}/dictionaries/groups/${params.groupId}`, {
    method: 'DELETE',
  });
}
export async function groupAddDict(params) {
  // /dictionaries/groups/{groupId}/dictionarie-group
  return request(`${prefix}/dictionaries/groups/${params.groupId}/dictionarie-group`, {
    method: 'PUT',
    data: params.dictionaryids,
  });
}
// 列表
export async function listDicts(param) {
  return request(`${prefix}/dictionaries${stringify(param, { addQueryPrefix: true })}`);
}

// 详情
export async function getDict(param) {
  return request(`${prefix}/dictionaries/${param.id}`);
}

// 创建
export async function createDict(param) {
  return request(`${prefix}/dictionaries`, {
    method: 'POST',
    data: param,
  });
}

// 修改
export async function editDict(param) {
  return request(`${prefix}/dictionaries/${param.id}`, {
    method: 'PUT',
    data: param,
  });
}

// 删除
export async function deleteDict(param) {
  return request(`${prefix}/dictionaries/${param.id}`, {
    method: 'DELETE',
  });
}

// 批量删除
export async function deleteDicts(param) {
  return request(`${prefix}/dictionaries/batch-deletion`, {
    method: 'PUT',
    data: param,
  });
}

// 批量导入
export async function saveDictFiles(params) {
  return request(`${prefix}/dictionaries/import?moduleId=${params.moduleId}`, {
    method: 'POST',
    data: params.formData,
  });
}

// ===字典条目===

// 列表
export async function listDictEntries(param) {
  return request(`${prefix}/dictionaries/${param.dictionaryId}/entries`);
}

// 创建
export async function createDictEntry(param) {
  return request(`${prefix}/dictionaries/${param.dictionaryId}/entries`, {
    method: 'POST',
    data: param,
  });
}

// 详情
export async function getDictEntry(param) {
  return request(`${prefix}/dictionary-entries/${param.entryId}`);
}

// 修改
export async function editDictEntry(param) {
  return request(`${prefix}/dictionaries/${param.dictionaryId}/entries/${param.entryId}`, {
    method: 'PUT',
    data: param,
  });
}

// 删除
export async function deleteDictEntry(param) {
  return request(`${prefix}/dictionaries/${param.dictionaryId}/entries/${param.entryId}`, {
    method: 'DELETE',
  });
}

// 批量删除
export async function deleteDictEntrires(param) {
  return request(`${prefix}/dictionaries/${param.dictionaryId}/entries/batch-deleteion`, {
    method: 'PUT',
    data: param.selectedRows,
  });
}

// =============所有字典条目 （其他模块调用）===============
export async function getDictEntries(params) {
  return request(`${prefix}/dict-entries?${stringify(params)}`);
}

// // =========MIME 管理=========

// 列表
export async function listMimes(param) {
  return request(`${prefix}/mime-types${stringify(param, { addQueryPrefix: true })}`);
}

// 详情
export async function getMime(param) {
  return request(`${prefix}/mime-types/${param.id}`);
}

// 创建
export async function createMime(param) {
  return request(`${prefix}/mime-types`, {
    method: 'POST',
    data: param,
  });
}

// 修改
export async function editMime(param) {
  return request(`${prefix}/mime-types/${param.id}`, {
    method: 'PUT',
    data: param,
  });
}

// 删除
export async function deleteMime(param) {
  return request(`${prefix}/mime-types/${param.id}`, {
    method: 'DELETE',
  });
}

// 批量删除
export async function deleteMimes(param) {
  return request(`${prefix}/mime-types/batch-delete`, {
    method: 'PUT',
    data: param,
  });
}

// 导入
export async function saveMIMEFiles(param) {
  return request(`${prefix}/mime-types/import`, {
    method: 'post',
    body: param,
  });
}

// =========模块管理=========

// ===模块===
// 列表
export async function listModules(param) {
  return request(`${prefix}/modules${stringify(param, { addQueryPrefix: true })}`);
}

// 详情
export async function getModule(param) {
  return request(`${prefix}/modules/${param.id}`);
}

// 创建
export async function createModule(param) {
  return request(`${prefix}/modules`, {
    method: 'POST',
    data: param,
  });
}

// 修改
export async function editModule(param) {
  return request(`${prefix}/modules/${param.id}`, {
    method: 'PUT',
    data: param,
  });
}

// 删除
export async function deleteModule(param) {
  return request(`${prefix}/modules/${param.id}`, {
    method: 'DELETE',
  });
}

// 批量删除
export async function deleteModules(param) {
  return request(`${prefix}/modules`, {
    method: 'PUT',
    data: param,
  });
}

// ===操作===

export async function listOperations(param) {
  return request(`${prefix}/modules/${param.moduleId}/actions`);
}

export async function getOperation(param) {
  return request(`${prefix}/modules/${param.moduleId}/actions/${param.operationId}`);
}

export async function createOperation(param) {
  return request(`${prefix}/modules/${param.moduleId}/actions`, {
    method: 'POST',
    data: param,
  });
}

export async function editOperation(param) {
  return request(`${prefix}/modules/${param.moduleId}/actions/${param.operationId}`, {
    method: 'PUT',
    data: param,
  });
}

export async function deleteOperation(param) {
  return request(`${prefix}/modules/${param.moduleId}/actions/${param.operationId}`, {
    method: 'DELETE',
  });
}

export async function deleteOperations(param) {
  return request(`${prefix}/modules/${param.moduleId}/actions`, {
    method: 'PUT',
    data: param.selectedRows,
  });
}

// ========================应用管理==========================
// ==========================================================

// 列表
export async function listApplications(params) {
  return request(`${prefix}/client-details${stringify(params, { addQueryPrefix: true })}`);
}

// 详情
export async function getApplication(param) {
  return request(`${prefix}/client-details/${param.id}`);
}

// 创建
export async function createApplication(params) {
  return request(`${prefix}/client-details`, {
    method: 'POST',
    data: params,
  });
}

// 修改
export async function editApplication(param) {
  return request(`${prefix}/client-details/${param.id}`, {
    method: 'PUT',
    data: param,
  });
}

// 删除
export async function deleteApplication(param) {
  return request(`${prefix}/client-details/${param.id}`, {
    method: 'DELETE',
  });
}

// 批量删除
export async function deleteApplications(param) {
  return request(`${prefix}/client-details/batch-delete`, {
    method: 'PUT',
    data: param,
  });
}

// ===========================队列管理============================

// ===队列===

export async function listQueues(param) {
  return request(`${prefix}/queues${stringify(param, { addQueryPrefix: true })}`);
}

export async function getQueue(param) {
  return request(`${prefix}/queues/${param.id}`);
}

export async function createQueue(param) {
  return request(`${prefix}/queues`, {
    method: 'POST',
    data: param,
  });
}

export async function editQueue(param) {
  return request(`${prefix}/queues/${param.id}`, {
    method: 'PUT',
    data: param,
  });
}

export async function deleteQueue(param) {
  return request(`${prefix}/queues/${param.id}`, {
    method: 'DELETE',
  });
}

export async function deleteQueues(param) {
  return request(`${prefix}/queues/batch-delete`, {
    method: 'PUT',
    data: param,
  });
}

// 开始--停止
export async function startQueues(param) {
  const { p } = param;
  return request(
    `${prefix}/queues/batch-modify-conditions${stringify(p, { addQueryPrefix: true })}`,
    {
      method: 'PUT',
      data: param.ids,
    }
  );
}

// 启用--禁用
export async function enabledQueues(param) {
  const { p } = param;
  return request(`${prefix}/queues/batch-modify-enabled${stringify(p, { addQueryPrefix: true })}`, {
    method: 'PUT',
    data: param.ids,
  });
}

// ===队列条目===
export async function listQueueEntries(param) {
  return request(`${prefix}/queues/${param.queueId}/queue-entry`);
}

export async function getQueueEntry(param) {
  return request(`${prefix}/queues/${param.queueId}/queue-entry/${param.entryId}`);
}

export async function deleteQueueEntrires(param) {
  return request(`${prefix}/queues/${param.queueId}/queue-entry/batch-delete`, {
    method: 'PUT',
    data: param.selectedRowKeys,
  });
}

// 批量重置
export async function resetQueueEntrires(param) {
  return request(`${prefix}/queues/${param.queueId}/queue-entry/batch-reset`, {
    method: 'PUT',
    data: param.selectedRowKeys,
  });
}

// =========视图管理========

// 列表
export async function listViews(param) {
  return request(`${prefix}/views${stringify(param, { addQueryPrefix: true })}`);
}

// 详情
export async function getView(param) {
  return request(`${prefix}/views/${param.id}`);
}

// 创建
export async function createView(param) {
  return request(`${prefix}/views`, {
    method: 'POST',
    data: param,
  });
}

// 修改
export async function editView(param) {
  return request(`${prefix}/views/${param.id}`, {
    method: 'PUT',
    data: param,
  });
}

// 删除
export async function deleteView(param) {
  return request(`${prefix}/views/${param.id}`, {
    method: 'DELETE',
  });
}

// 策略管理 获取状态生命周期模板
export async function listState(param) {
  return request(`${prefix}/categories/${param.id}/lifecyclestate`);
}

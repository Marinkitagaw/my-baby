// ==========型号管理/全部型号==============
import { stringify } from 'qs';
import { request } from '@cpdm/util';

const prefix = '/cpdm';
const bomPrefix = '/bom';

// ---------------------------列表--------------------------

// 型号列表
export async function page(params) {
  return request(`${prefix}/repositories${stringify(params, { addQueryPrefix: true })}`);
}
export async function getPermissions() {
  return request(`${prefix}/repositories/permissions`);
}
// 创建型号
export async function createRespository(params) {
  return request(`${prefix}/repositories`, {
    method: 'POST',
    data: params,
  });
}
// 删除型号
export async function deleteRespository(id) {
  return request(`${prefix}/repositories/${id}`, {
    method: 'DELETE',
  });
}

// 删除型号下文件
export async function batchDeleteItems(data, mode) {
  return request(`${prefix}/dpm/repositories/delete-items?mode=${mode}`, {
    method: 'DELETE',
    data,
  });
}
// 型号详情
export async function info(params) {
  return request(`${prefix}/repositories/${params.id}`);
}
// 编辑
export async function modifyRespository(params) {
  return request(`${prefix}/repositories/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}

// 设为常用型号
export async function AddfavoriteRepository(params) {
  return request(`${prefix}/repositories/common?repositoryId=${params.repositoryId}`, {
    method: 'POST',
    // data: params,
  });
}

// 取消设为常用型号
export async function RemovefavoriteRepository(params) {
  return request(`${prefix}/repositories/common?repositoryId=${params.repositoryId}`, {
    method: 'PUT',
    // data: params,
  });
}

// 开关六性管理
export async function switchChar(params) {
  return request(
    `${prefix}/repositories/${params.repositoryId}/char?charEnabled=${params.charEnabled}`,
    {
      method: 'PUT',
      data: params,
    },
  );
}

// 开关需求管理
export async function switchReq(params) {
  return request(
    `${prefix}/repositories/${params.repositoryId}/requirement?requirementEnabled=${params.requirementEnabled}`,
    {
      method: 'PUT',
      data: params,
    },
  );
}

// ---------------------总览---------------------

// 技术概览
export async function loadstatistics(remoteId) {
  return request(`${prefix}/data-statistics/repositories/${remoteId}/latest`);
}
// 技术状态总览
export async function loadObjectStatistics(params) {
  return request(
    `${prefix}/data-statistics/repositories/${params.productId}${stringify(params.params, {
      addQueryPrefix: true,
    })}`,
  );
}
// 成品一览
export async function loadEndItems(params) {
  return request(`${prefix}/repositories/${params.repositoryId}/end-items`);
}

// -------------------------技术状态--------------------------------

// 加载技术状态
export async function loadTechnicalState(id) {
  return request(`${prefix}/repositories/${id}/technical-state`);
}
// 创建技术状态
export async function CreateTechnicalState(params) {
  return request(`${prefix}/repositories-technical-state`, {
    method: 'POST',
    data: params,
  });
}
// 编辑技术状态
export async function EditTechnicalState(params) {
  return request(`${prefix}/repositories-technical-state/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}
// 删除技术状态
export async function DelTechnicalState(id) {
  return request(`${prefix}/repositories-technical-state/${id}`, {
    method: 'DELETE',
  });
}

// -----------------------文件夹-----------------------------

// 获取文件夹树
export async function getAllFolders(params) {
  return request(`${prefix}/repositories/${params.id}/folders-tree`);
}

// 根据库的关联节点信息获取树
export async function getTreeData(params) {
  return request(`${prefix}/repository-struct-links`, {
    params,
  });
}

// 获取型号关联分类
export async function getLinkItemsForRepostory({ repositoryId }) {
  return request(`${prefix}/repository/${repositoryId}/struct-links`);
}

// 获取分类树
export async function getClassificationTree() {
  return request(`/cpdm/classification-structs-trees`);
}

// 加载所有文件夹数据
export async function loadFoldersDatas(params) {
  return request(
    `${prefix}/repositories/${params.repositoryId}/all-items${stringify(params, {
      addQueryPrefix: true,
    })}`,
  );
}
// 加载某个文件夹内数据
export async function loadOneFolder(params) {
  return request(
    `${prefix}/repositories/folders/${params.folderId}/items${stringify(params.loadParam, {
      addQueryPrefix: true,
    })}`,
  );
}

// 创建文件夹
export async function getFolder(params) {
  return request(`${prefix}/folders/${params.id}`);
}
// 创建文件夹
export async function createFolder(params) {
  return request(`${prefix}/folders`, {
    method: 'POST',
    data: params,
  });
}
// 编辑文件夹
export async function modifyFolder(folder) {
  return request(`${prefix}/folders/${folder.id}`, {
    method: 'PUT',
    data: folder,
  });
}
// 删除文件夹
export async function deleteFolder(id) {
  return request(`${prefix}/folders/${id}`, {
    method: 'DELETE',
  });
}

// -----------------------批次信息-----------------------------

// 批次列表(分页)
export async function loadBatchList(params) {
  return request(
    `${bomPrefix}/experiments-batch${stringify(params, {
      addQueryPrefix: true,
    })}`,
  );
}
// 批次列表(不分页)
export async function loadBatchLists(params) {
  return request(
    `${bomPrefix}/experiments-batchs${stringify(params, {
      addQueryPrefix: true,
    })}`,
  );
}
export async function getBatch(params) {
  return request(`${bomPrefix}/experiments-batch/${params.id}`);
}
// 创建批次
export async function createBatch(params) {
  return request(`${bomPrefix}/experiments-batch`, {
    method: 'POST',
    data: params,
  });
}
// 编辑批次
export async function modifyBatch(folder) {
  return request(`${bomPrefix}/experiments-batch/${folder.id}`, {
    method: 'PUT',
    data: folder,
  });
}
// 删除批次
export async function deleteBatch(id) {
  return request(`${bomPrefix}/experiments-batch/${id}`, {
    method: 'DELETE',
  });
}

// ------------------------团队----------------------------

// ------------角色
// 获取所有角色
export async function listAllRoles() {
  return request(`${prefix}/repositories/roles`);
}
// 添加角色
export async function addRepoRoles(params) {
  return request(`${prefix}/repositories/${params.repositoryId}/roles-members`, {
    method: 'POST',
    data: params,
  });
}
// 添加角色成员
export async function addRoleMember(params) {
  return request(
    `${prefix}/repositories/${params.repositoryId}/team/members?roleIdentifier=${params.roleIdentifier}`,
    {
      method: 'POST',
      data: params.userIdList,
    },
  );
}
// 移除角色
export async function removeRole(params) {
  return request(`${prefix}/repositories/${params.repositoryId}/roles`, {
    method: 'DELETE',
  });
}

// 移除成员
export async function removeMembers(params) {
  return request(`${prefix}/repositories/${params.repositoryId}/roles-members-remove`, {
    method: 'PUT',
    data: params.selectedRowKeys,
  });
}

// 批量移除角色/成员    单项移除角色/成员
export async function removeRoleOrUsers(params) {
  return request(`${prefix}/repositories/${params.repositoryId}/roles-menbers`, {
    method: 'PUT',
    data: params.memberList,
  });
}

//  -------------角色及成员列表
export async function loadMembers(params) {
  return request(
    `${prefix}/repositories/${params.repositoryId}/team/members${stringify(params.loadParam, {
      addQueryPrefix: true,
    })}`,
  );
}

// 获取型号系列
export async function getRepositorySeries(params) {
  return request(
    `${prefix}/repo-series${stringify(params, {
      addQueryPrefix: true,
    })}`,
  );
}

// 获取型号模板
export async function getRepositoryTemplate() {
  return request(`${prefix}/repository-templates`);
}

// 容器文件夹
export async function folders(id) {
  return request(`${prefix}/repositories/${id}/folders`);
}

// 加载部件结构
export async function loadPartStructure(params) {
  return request(`/part/psb/${params.partId}/children`, {
    method: 'GET',
  });
}
// 当前部件结构的详细信息
export async function currentNodeData(params) {
  return request(`/part/parts/${params.partId}`);
}
// 加载进度监控列表
export async function loadProcessesList(params) {
  return request(
    `${prefix}/repositories/${params.productId}/processes${stringify(params, {
      addQueryPrefix: true,
    })}`,
  );
}

// 部件相关基线
export async function getRelatedData(params) {
  return request(`/part/parts/${params.partId}/baselines`);
}

// 获取全部型号分类
export async function getAllClassification() {
  return request(`/admin/classification-structs`, {
    method: 'GET',
    params: { page: 0, size: 9999 },
  });
}

// 获取已关联型号分类
export async function getRelatedClassification(params) {
  return request(`/admin/repository/${params}/classificationStructs`);
}

// 关联型号分类
export async function classLinked({ repositoryId, data }) {
  return request(`${prefix}/repository/${repositoryId}/struct-links`, {
    method: 'POST',
    data,
  });
}

// 型号分类解除关联
export async function classUnlink({ repositoryId, data }) {
  return request(`${prefix}/repository/${repositoryId}/struct-links`, {
    method: 'DELETE',
    data,
  });
}

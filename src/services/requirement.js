import { stringify } from 'qs';
import { request } from '@cpdm/util';

const prefix = '/requirement';

export async function getPersonalStatistic(params) {
  return request(`${prefix}/requirements/statistics${stringify(params, { addQueryPrefix: true })}`);
}

export async function getParentRequirement(params) {
  return request(`${prefix}/requirements/${params}/parent`);
}

export async function setLifecycleState(param) {
  return request(`/bom/bom-lifecycle-states`, {
    method: 'PUT',
    data: param,
  });
}

export async function setAttribute(params) {
  return request(`${prefix}/requirements/set-attribute`, {
    method: 'PUT',
    data: params,
  });
}

export async function reviseInBatch(params) {
  return request(`${prefix}/requirements/revise?description=${params.description}`, {
    method: 'PUT',
    data: params.requirementIds,
  });
}

export async function deleteRequirementInBatch(params) {
  return request(`${prefix}/requirements`, {
    method: 'PUT',
    data: params,
  });
}

export async function owner(params) {
  return request(`${prefix}/requirements/${params.requirementId}/owner`, {
    method: 'PUT',
    data: params,
  });
}

export async function getRequirementStructure(params) {
  return request(
    `${prefix}/requirements/${params.repositoryId}/structure?requirementId=${params.id || ''}`,
  );
}

export async function listRequirementStructure(params) {
  return request(`${prefix}/requirements/${params.parentId}/structure`);
}

// 功能视图 树结构
export async function listSubRequirementView({ nodeId, nodeType }) {
  return request(`${prefix}/function-tree/${nodeId}/sub?nodeType=${nodeType}`);
}

export async function listRequirementsManage(params) {
  return request(`${prefix}/requirements/${params.partId}/structure`);
}

export async function listRequirements(params) {
  return request(`${prefix}/requirements${stringify(params, { addQueryPrefix: true })}`);
}

export async function listRequirementsTop(params) {
  return request(`${prefix}/requirements/top${stringify(params, { addQueryPrefix: true })}`);
}

export async function requirementPreview(params) {
  return request(
    `${prefix}/requirements/preview${stringify(params.formData, { addQueryPrefix: true })}`,
    {
      method: 'POST',
      data: params.fileStream,
    },
  );
}

export async function requirementOutSourcePreview(params) {
  return request(
    `${prefix}/requirements/close/preview${stringify(params.formData, { addQueryPrefix: true })}`,
    {
      method: 'POST',
      data: params.fileStream,
    },
  );
}

export async function pageRequirements(params) {
  return request(`${prefix}/requirements/page${stringify(params, { addQueryPrefix: true })}`);
}

export async function totalRequirements(params) {
  return request(`${prefix}/requirements/count${stringify(params, { addQueryPrefix: true })}`);
}

export async function pageHasAccessRequirements(params) {
  return request(
    `${prefix}/requirements/page-access${stringify(params, { addQueryPrefix: true })}`,
  );
}

// 新建时获取型号系列
export async function listRepositories(params) {
  return request(
    `/cpdm/repositories/team-repositories${stringify(params, { addQueryPrefix: true })}`,
  );
}

// 获取型号系列下的产品
export async function getRepositories(params) {
  return request(`/cpdm/repositories${stringify(params, { addQueryPrefix: true })}`);
}

// 获取详情
export async function getRequirement(params) {
  return request(`${prefix}/requirements/${params.id}`);
}

// 获取型号详情
export async function getRepository(params) {
  return request(`/cpdm/repositories/${params}`);
}

// 获取第一个启用需求的型号详情
export async function getfirstRepository(params) {
  return request(`${prefix}/requirements/repository${stringify(params, { addQueryPrefix: true })}`);
}

// 创建需求项
export async function create(params) {
  return request(`${prefix}/requirements`, {
    method: 'POST',
    data: params,
  });
}

// 移除需求项与交付的关系
export async function removeRequirementLink(params) {
  return request(`${prefix}/requirements/relation/${params}`, {
    method: 'DELETE',
  });
}

// 获取需求项与交付的关系
export async function listRequirementLink({ id, type }) {
  return request(
    `${prefix}/requirements/${id}/relation${stringify({ type }, { addQueryPrefix: true })}`,
  );
}

// 创建需求项与交付的关系
export async function createRequirementLink(params) {
  return request(`${prefix}/requirements/${params.sourceId}/relation`, {
    method: 'POST',
    data: params.relations,
  });
}

// 保存总意见
export async function saveOpinion(params) {
  return request(
    `${prefix}/requirements/${params.requirementId}/relation?userId=${
      params.userId || ''
    }&targetId=${params.targetId || ''} &linkType=${params.linkType || ''}`,
    {
      method: 'PUT',
      data: params,
    },
  );
}

export async function importRequirerment(params) {
  return request(`${prefix}/requirements/import${stringify(params, { addQueryPrefix: true })}`, {
    method: 'POST',
  });
}

export async function importSourceRequirerment(params) {
  return request(`${prefix}/requirements/close/import`, {
    method: 'POST',
    data: params,
  });
}

// 获取需求项与指标的关系
export async function listRequirementIndex(params) {
  return request(`${prefix}/requirements/index/${params}`);
}
// 获取需求关联的技术要求
export async function listRequirementDocument(params) {
  return request(`${prefix}/requirements/${params}/document`);
}

// 获取关联功能节点
export async function listRequirementFunction(params) {
  return request(`${prefix}/requirements/${params}/parts`);
}

export async function listProcessInstance(params) {
  return request(`${prefix}/requirements/${params}/process`);
}

export async function listRequirementContent(params) {
  return request(`${prefix}/requirements/content/${params}`);
}

// 创建需求与需求的使用关系
export async function createRequirementUseLink({ id, datas }) {
  return request(`${prefix}/requirements/uselink/${id}`, {
    method: 'POST',
    data: datas,
  });
}

// 获取需求与需求的使用关系
export async function listRequirementUseLink(params) {
  return request(
    `${prefix}/requirements/uselink/${params.id}${stringify(params, { addQueryPrefix: true })}`,
  );
}
// 移除需求与需求的使用关系
export async function removeRequirementUseLink(params) {
  return request(`${prefix}/requirements/uselink/${params.sourceId}/${params.targetId}`, {
    method: 'DELETE',
  });
}

export async function edit(params) {
  return request(`${prefix}/requirements/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}

export async function getTreeNode(params) {
  return request(`${prefix}/requirements/tree/${params}`);
}

// 删除
export async function deleteRequirement(params) {
  return request(`${prefix}/requirements/${params.id}?mode=${params.mode}`, {
    method: 'DELETE',
  });
}

// 删除及子
export async function deleteSubRequirement({ mode, requirementIdList }) {
  return request(`${prefix}/requirements/delete?mode=${mode}`, {
    method: 'PUT',
    data: requirementIdList,
  });
}

// 移除需求项与交付的关系
export async function removeContent(params) {
  return request(`${prefix}/requirements/content/${params}`, {
    method: 'DELETE',
  });
}

// 复制需求项
export async function copyRequirements(params) {
  return request(`${prefix}/requirements/copy`, {
    method: 'POST',
    data: params,
  });
}

export async function getRequirementState() {
  return request(`${prefix}/requirements/state`);
}

export async function reviewRequirement(params) {
  return request(`${prefix}/requirements/review?reviewDocument=${params.reviewDocument}`, {
    method: 'POST',
    data: params.requirementIds,
  });
}

export async function requirementReviewInternal(requirementId) {
  return request(`${prefix}/internal-collaboration`, {
    method: 'POST',
    data: requirementId,
  });
}

export async function addRequirementInternalRecord({ data, params }) {
  return request(
    `${prefix}/internal-collaboration/record${stringify(params, { addQueryPrefix: true })}`,
    {
      method: 'POST',
      data,
    },
  );
}

export async function removeRequirementInternalRecord({ data, params }) {
  return request(
    `${prefix}/internal-collaboration/record${stringify(params, { addQueryPrefix: true })}`,
    {
      method: 'PUT',
      data,
    },
  );
}

export async function closeRequirement(params) {
  return request(`${prefix}/requirements/close`, {
    method: 'POST',
    data: params,
  });
}

export async function insertRequirement(params) {
  return request(`${prefix}/requirements/${params.parentId}/insert`, {
    method: 'POST',
    data: params.targetId,
  });
}

export async function removeRequirementStructureLink(params) {
  return request(`${prefix}/requirements/${params.requirementId}/remove`, {
    method: 'DELETE',
  });
}

// 批量移除子需求
export async function removeReqStruLinkMulti(params) {
  return request(`${prefix}/requirements/remove-all`, {
    method: 'PUT',
    data: params.requirementIdList,
  });
}

export async function switchRequirementEnabled(params) {
  return request(
    `/cpdm/repositories/${params.repositoryId}/requirement?requirementEnabled=${params.requirementEnabled}`,
    {
      method: 'PUT',
    },
  );
}

// 获取产品库系列
export async function getModelSeries() {
  return request(`/cpdm/repo-series`);
}

// 创建需求集
export async function createRequirementSet(params) {
  return request(`${prefix}/requirement-sets`, {
    method: 'POST',
    data: params,
  });
}

// 编辑需求集
export async function modifyRequirementSet(params) {
  return request(`${prefix}/requirement-sets/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}

// 获取需求集
export async function listRequirementSet(params) {
  return request(`${prefix}/requirement-sets${stringify(params, { addQueryPrefix: true })}`);
}

// 删除需求集
export async function deleteRequirementSet(params) {
  return request(`${prefix}/requirement-sets/${params}`, {
    method: 'DELETE',
  });
}

// 创建需求集与需求的关系
export async function createRequirementSetLink(params) {
  return request(
    `${prefix}/requirement-sets/link?targetId=${params.targetId}&targetType=${params.targetType}`,
    {
      method: 'POST',
      data: params,
    },
  );
}

// 获取需求集关联的需求项
export async function listRequirementSetLink(params) {
  return request(`${prefix}/requirement-sets/link${stringify(params, { addQueryPrefix: true })}`);
}

export async function getRequirementSetRoot(params) {
  return request(`${prefix}/requirement-sets/root${stringify(params, { addQueryPrefix: true })}`);
}

// 移除需求集与需求项关系
export async function removeRequirementSetLink(params) {
  return request(`${prefix}/requirement-sets/link`, {
    method: 'PUT',
    data: params,
  });
}

// 获取需求签审包关联的数据
export async function requirementRecord(params) {
  return request(`${prefix}/requirements/record${stringify(params, { addQueryPrefix: true })}`);
}

// 添加需求签审包关联的数据
export async function addRequirementRecord({ dataPacketId, requirementArr }) {
  return request(`${prefix}/requirements/record?dataPacketId=${dataPacketId}`, {
    method: 'POST',
    data: requirementArr,
  });
}
// 移除关联的签审数据
export async function removeRequirementRecord(params) {
  return request(`${prefix}/requirements/record${stringify(params, { addQueryPrefix: true })}`, {
    method: 'DELETE',
  });
}

export async function checkout(requirementId) {
  return request(`${prefix}/requirements/${requirementId}/checkout`, {
    method: 'PUT',
  });
}

export async function checkIn(requirementId) {
  return request(`${prefix}/requirements/${requirementId}/checkIn`, {
    method: 'PUT',
  });
}

export async function undoCheckout(requirementId) {
  return request(`${prefix}/requirements/${requirementId}/undo-checkout`, {
    method: 'PUT',
  });
}

export async function revise(params) {
  return request(`${prefix}/requirements/${params.id}/revise`, {
    method: 'PUT',
    data: params.description,
  });
}

export async function versionStatus(params) {
  return request(`${prefix}/requirements/${params.requirementId}/status?status=${params.status}`);
}

export async function statistics(params) {
  return request(`${prefix}/requirements/statistics${stringify(params, { addQueryPrefix: true })}`);
}

// 获取需求基线关联数据
export async function getBaselineMember(params) {
  return request(
    `${prefix}/requirements/baseline-member${stringify(params, { addQueryPrefix: true })}`,
  );
}
// 获取成员基线
export async function listRelationBaseline(params) {
  return request(`${prefix}/requirements/${params}/baseline`);
}

// 获取成员相关数据发送
export async function loadRequirementDSO(params) {
  return request(`${prefix}/requirements/${params}/data-send-order`);
}

// 添加基线关联对象
export async function addMembers(params) {
  return request(`${prefix}/requirements/baseline-member?baselineId=${params.baselineId}`, {
    method: 'POST',
    data: params.memebers,
  });
}

// 流程监控取消签审
export async function reviewSuspended(params) {
  return request(
    `${prefix}/requirements/review/terminate${stringify(params, { addQueryPrefix: true })}`,
    {
      method: 'PUT',
    },
  );
}

// 关联交付
export async function relation(params) {
  return request(`${prefix}/requirements/relation`, {
    method: 'POST',
    data: params,
  });
}

// 关联交付
export async function batchRelation(params) {
  return request(`${prefix}/requirements/relations`, {
    method: 'PUT',
    data: params,
  });
}

//
export async function structureRequ(params) {
  return request(`${prefix}/requirements/${params}/all`);
}

// 设置权限时获取子需求
export async function sonRequOfAccess(params) {
  return request(`${prefix}/requirements/all-tree`, {
    method: 'POST',
    data: params,
  });
}

// 获取功能节点
export async function list(params) {
  return request(`/bom/function-parts${stringify(params, { addQueryPrefix: true })}`);
}

// 获取成品节点
export async function treeList(params) {
  return request(`/bom/common-parts/endItem-parts${stringify(params, { addQueryPrefix: true })}`);
}

// 获取下级节点
export async function loadSubParts({ partId, ...params }) {
  return request(
    `/bom/function-parts/${partId}/sub-parts${stringify(params, { addQueryPrefix: true })}`,
  );
}

// 获取所有型号
export async function listAllRepositories(params) {
  return request(`/cpdm/repositories${stringify(params, { addQueryPrefix: true })}`);
}

//
export async function getStatisticsUrl(params) {
  return request(
    `${prefix}/requirements/statistics-url${stringify(params, { addQueryPrefix: true })}`,
  );
}

export async function peer(params) {
  return request(`${prefix}/requirements/synergy-design`, {
    method: 'POST',
    data: params,
  });
}

export async function refreshPeer(params) {
  return request(`${prefix}/requirements/${params}/synergy-update`, {
    method: 'PUT',
  });
}

export async function setRequirementDesigner(params) {
  return request(`${prefix}/requirements/${params.requirementId}/synergy-task`, {
    method: 'PUT',
    data: params.collaborators,
  });
}

export async function hasPeer(params) {
  return request(`${prefix}/requirements/${params}/has-peer`);
}

export async function getRepositorySeries() {
  return request(`/cpdm/repo-series`);
}

// 获取关系矩阵输入
export async function getRelationshipUpCharData({ requirementId, ...params }) {
  return request(`${prefix}/requirements/uselink/${requirementId}?${stringify(params)}`);
}

// 获取关系矩阵输出
export async function getRelationshipCharData({ requirementId, ...params }) {
  return request(`${prefix}/requirements/uselink/${requirementId}?${stringify(params)}`);
}

// 关系库详情列表
export async function getRelationshipList(requirementId) {
  return request(`${prefix}/requirements/${requirementId}`);
}

// 需求生命周期统计
export async function getLifecycleCharData({ nodeType, ...params }) {
  return request(
    `${prefix}/requirements-state/statistics?${stringify({
      ...params,
      nodeType: nodeType.includes('Part') && 'FunctionPart',
    })}`,
  );
}

// 需求类型统计
export async function getTypeCharData({ nodeType, ...params }) {
  return request(
    `${prefix}/requirements-classification/statistics?${stringify({
      ...params,
      nodeType: nodeType.includes('Part') && 'FunctionPart',
    })}`,
  );
}

// 需求实现情况统计
export async function getDeliveryCharData({ nodeType, ...params }) {
  return request(
    `${prefix}/requirements-delivery?${stringify({
      ...params,
      nodeType: nodeType.includes('Part') && 'FunctionPart',
    })}`,
  );
}

// 需求协同情况统计-提交
export async function getSynergySubmitCharData({ nodeType, ...params }) {
  return request(
    `${prefix}/requirements-feedback/submit?${stringify({
      ...params,
      nodeType: nodeType.includes('Part') && 'FunctionPart',
    })}`,
  );
}

// 需求协同情况统计-接收
export async function getSynergyReceiveCharData({ nodeType, ...params }) {
  return request(
    `${prefix}/requirements-feedback/receive?${stringify({
      ...params,
      nodeType: nodeType.includes('Part') && 'FunctionPart',
    })}`,
  );
}

// 需求统计-列表

export async function getDetailsList(data) {
  return request(`${prefix}/requirements-details`, {
    method: 'POST',
    data,
  });
}

// 获取需求对象上次操作记录
export async function getPersonalSettings(params) {
  return request(`/cpdm/operation-records?${stringify({ ...params, type: 'requirement' })}`);
}

// 获取需求通知更改单流程数据
export async function getRequirementData(params) {
  return request(`/requirement/requirements/${params}/requirement-change-notice`);
}

// 创建需求模板
export async function createRequireTemplate(params) {
  return request(`${prefix}/requirement-models`, {
    method: 'POST',
    data: params,
  });
}

// 修改需求模板
export async function editRequireTemplate(params) {
  return request(`${prefix}/requirement-models/${params.modelId}`, {
    method: 'PUT',
    data: params.RequirementModelForm,
  });
}

// 复制需求模板
export async function copyRequireTemplate(params) {
  return request(`${prefix}/requirement-models/${params.modelId}/save`, {
    method: 'POST',
  });
}

// 删除需求模板
export async function delRequireTemplate(params) {
  return request(`${prefix}/requirement-models/${params.modelId}`, {
    method: 'DELETE',
  });
}

// 需求模板库左侧树
export async function getRequireTemplate() {
  return request(`${prefix}/requirement-models/tree`, {
    method: 'GET',
  });
}

// 需求模板库左侧树
export async function getRequire(params) {
  return request(`${prefix}/requirement-models/${params}/tree`, {
    method: 'GET',
  });
}

// 模板添加需求
export async function setRequireTemplate(params) {
  return request(
    `${prefix}/requirement-models/${params.modelId}/insert?objectId=${
      params.objectId ? params.objectId : ''
    }`,
    {
      method: 'POST',
      data: params.data,
    },
  );
}

// 模板模板库编辑需求
export async function editRequireChild(params) {
  return request(`${prefix}/requirement-models/${params.id}/requirement`, {
    method: 'POST',
    data: params.data,
  });
}
// 部件挂载需求模板中需求
export async function partInsertRequire(params) {
  return request(
    `${prefix}/requirement-models/${params.partId}/requirements?repositoryId=${params.repositoryId}`,
    {
      method: 'PUT',
      data: params.items,
    },
  );
}

// 获取管理员账号
export async function getUserNum(params) {
  return request(`/iam/users/${params.loginName}?type=${params.type}`, {
    method: 'GET',
  });
}

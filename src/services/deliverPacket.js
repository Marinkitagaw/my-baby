import { stringify } from 'qs';
import { request } from '@cpdm/util';

const prefix = '/package';

// 数据包列表
export async function getPackageList(params) {
  return request(
    `${prefix}/data-packages${stringify(params, {
      addQueryPrefix: true,
    })}`,
  );
}
export async function getPackageProductTypeVal(params) {
  return request(`${prefix}/data-packages/${params.packageId}/create/check-files`);
}

// 任务单关联数据包详情
export async function getRelatePackageInfo(param) {
  return request(`${prefix}/data-package/acceptance-order/${param}/apply`);
}

// 获取数据包关联的BOM
export async function getRelatePartList(params) {
  return request(
    `${prefix}/data-package/part-trees${stringify(params, {
      addQueryPrefix: true,
    })}`,
  );
}

// 创建数据包
export async function creatPackage(params) {
  return request(`${prefix}/data-packages`, {
    method: 'POST',
    data: params,
  });
}

// 编辑数据包
export async function editPackage({ packageId, dto }) {
  return request(`${prefix}/data-packages/${packageId}`, {
    method: 'PUT',
    data: dto,
  });
}

// 数据包基本信息
export async function getPackageInfo(params) {
  return request(
    `${prefix}/data-packages/${params.packageId}${stringify(params, {
      addQueryPrefix: true,
    })}`,
  );
}

// 数据包最新版本基本信息
export async function getLatestPackageInfo({ packageId }) {
  return request(`${prefix}/data-packages/${packageId}/latest`);
}

// 提交审批
export async function reviewPackage({ packageId }) {
  return request(`${prefix}/data-packages/${packageId}/review`, {
    method: 'POST',
  });
}

// 删除数据包
export async function deletePackage(params) {
  return request(
    `${prefix}/data-packages/${params.packageId}${stringify(params, {
      addQueryPrefix: true,
    })}`,
    {
      method: 'Delete',
    },
  );
}

// 数据包验收单
export async function getPackageCheckFiles(params) {
  return request(
    `${prefix}/data-packages/${params.packageId}/check-files${stringify(params, {
      addQueryPrefix: true,
    })}`,
  );
}

// 数据包验收单详情
export async function getCheckFilesInfo(params) {
  return request(
    `${prefix}/data-packages/${params.packageId}/check-files/${params.checkFileId}${stringify(
      params,
      {
        addQueryPrefix: true,
      },
    )}`,
  );
}

// 新建检查单
export async function addCheckFiles({ packageId, checkValue }) {
  return request(`${prefix}/data-packages/${packageId}/check-files`, {
    method: 'POST',
    data: checkValue,
  });
}

// 删除检查单
export async function deleteCheckFiles({ packageId, checkFileId }) {
  return request(`${prefix}/data-packages/${packageId}/check-files/${checkFileId}`, {
    method: 'DELETE',
  });
}

// 修改数据包验收单
export async function editCheckFilesItem({ packageId, checkFileId, checkFileValue }) {
  return request(`${prefix}/data-packages/${packageId}/check-files/${checkFileId}`, {
    method: 'PUT',
    data: checkFileValue,
  });
}

// 任务详情
export async function getTaskInfo(params) {
  return request(
    `${prefix}/data-packages/${params.packageId}/check-task${stringify(params, {
      addQueryPrefix: true,
    })}`,
  );
}

// 验收申请详情
export async function getApplyInfo(params) {
  return request(
    `${prefix}/data-packages/${params.packageId}/check-apply${stringify(params, {
      addQueryPrefix: true,
    })}`,
  );
}

// 验收结论详情
export async function getVerdictInfo(params) {
  return request(
    `${prefix}/data-packages/${params.packageId}/check-verdict${stringify(params, {
      addQueryPrefix: true,
    })}`,
  );
}

// 遗留问题详情
export async function getUnresolvedInfo(params) {
  return request(
    `${prefix}/data-packages/${params.packageId}/check-verdict${stringify(params, {
      addQueryPrefix: true,
    })}`,
  );
}

// 关键指标详情
export async function getDataPackageInfo(params) {
  return request(`${prefix}/data-package/${params.packageId}/index-inspections`, {
    method: 'GET',
    params,
  });
}
// 编辑指标检测
export async function editDataPackageInfo(params) {
  return request(`${prefix}/data-package/${params.packageId}/index-inspections`, {
    method: 'PUT',
    data: params,
  });
}

// 修改验收申请
export async function editApplyInfo({ packageId, checkFileId, checkFileValue }) {
  return request(`${prefix}/data-packages/${packageId}/check-apply/${checkFileId}`, {
    method: 'PUT',
    data: checkFileValue,
  });
}

// 修改验收任务
export async function editTaskInfo({ packageId, checkFileId, checkFileValue }) {
  return request(`${prefix}/data-packages/${packageId}/check-task/${checkFileId}`, {
    method: 'PUT',
    data: checkFileValue,
  });
}

// 获取验收申请
export async function getApplyItems(params) {
  return request(
    `${prefix}/data-packages/${params.packageId}/apply-items${stringify(params, {
      addQueryPrefix: true,
    })}`,
  );
}

// 获取验收部门
export async function getApplyDepartment(params) {
  return request(
    `${prefix}/data-packages/${params.packageId}/accept-info${stringify(params, {
      addQueryPrefix: true,
    })}`,
  );
}

// 创建验收申请
export async function createApplyItems({ packageId, params }) {
  return request(`${prefix}/data-packages/${packageId}/apply-items`, {
    method: 'POST',
    data: params,
  });
}

// 编辑验收申请
export async function modifyApplyItems({ packageId, params }) {
  return request(`${prefix}/data-packages/${packageId}/apply-items`, {
    method: 'PUT',
    data: params,
  });
}

// 删除验收申请
export async function deleteApplyItems({ packageId, applyId }) {
  return request(`${prefix}/data-packages/${packageId}/apply-items/${applyId}`, {
    method: 'DELETE',
  });
}

// 验收申请详情
export async function infoApplyItem({ packageId, applyId }) {
  return request(`${prefix}/data-packages/${packageId}/apply-items/${applyId}`, {
    method: 'GET',
  });
}

// 获取齐套性检查和技术类检查(依据文件检查)
export async function getAccordItems(params) {
  return request(
    `${prefix}/data-packages/${params.packageId}/accord-files${stringify(params, {
      addQueryPrefix: true,
    })}`,
  );
}

// 新建依据文件检查
export async function createAccordItems({ packageId, params }) {
  return request(`${prefix}/data-packages/${packageId}/accord-items`, {
    method: 'POST',
    data: params,
  });
}

// 删除依据文件检查
export async function deleteAccordItems({ packageId, accordId }) {
  return request(`${prefix}/data-packages/${packageId}/accord-items/${accordId}`, {
    method: 'DELETE',
  });
}

// 编辑依据文件检查
export async function editAccordItems({ packageId, params, accordId }) {
  return request(`${prefix}/data-packages/${packageId}/accord-items/${accordId}`, {
    method: 'PUT',
    data: params,
  });
}

// 依据文件检查详情
export async function infoAccordItems({ packageId, accordId }) {
  return request(`${prefix}/data-packages/${packageId}/accord-items/${accordId}`);
}

// 获取验收单下的检查项集合
export async function getCheckFilesItems(params) {
  return request(
    `${prefix}/data-packages/${params.packageId}/check-files/${
      params.checkFileId
    }/check-groups${stringify(params, {
      addQueryPrefix: true,
    })}`,
  );
}

// 删除检查项
export async function deleteCheckFilesItems({ packageId, checkFileId, itemIds }) {
  return request(`${prefix}/data-packages/${packageId}/check-files/${checkFileId}/check-items`, {
    method: 'DELETE',
    data: itemIds,
  });
}

// 创建验收单下的检查项
export async function createCheckItems({ packageId, checkFileId, params, groupId }) {
  return request(
    `${prefix}/data-packages/${packageId}/check-files/${checkFileId}/check-items?groupId=${groupId}`,
    {
      method: 'POST',
      data: params,
    },
  );
}

// 编辑检查项
export async function editCheckItem({ packageId, checkFileId, checkFileValue, checkItemId }) {
  return request(
    `${prefix}/data-packages/${packageId}/check-files/${checkFileId}/check-items/${checkItemId}`,
    {
      method: 'PUT',
      data: checkFileValue,
    },
  );
}

// 检查项详情
export async function infoCheckItems({ packageId, checkFileId, checkItemId }) {
  return request(
    `${prefix}/data-packages/${packageId}/check-files/${checkFileId}/check-items/${checkItemId}`,
    {},
  );
}

// 获取检查组
export async function getCheckGroups({ packageId, checkFileId }) {
  return request(
    `${prefix}/data-packages/${packageId}/check-files/${checkFileId}/check-groups`,
    {},
  );
}

// 添加检查组
export async function addCheckGroup({ packageId, checkFileId, checkGroup }) {
  return request(`${prefix}/data-packages/${packageId}/check-files/${checkFileId}/check-groups`, {
    method: 'POST',
    data: checkGroup,
  });
}

// 保存检查组
export async function saveCheckGroup({ packageId, checkFileId, checkGroup }) {
  return request(`${prefix}/data-packages/${packageId}/check-files/${checkFileId}/check-groups`, {
    method: 'PUT',
    data: checkGroup,
  });
}

// 删除检查组
export async function deleteCheckGroup({ packageId, checkFileId, groupId }) {
  return request(
    `${prefix}/data-packages/${packageId}/check-files/${checkFileId}/check-groups/${groupId}`,
    {
      method: 'DELETE',
    },
  );
}

// 保存检查项
export async function saveCheckItems({ packageId, checkFileId, CheckItemModifyDTO }) {
  return request(`${prefix}/data-packages/${packageId}/check-files/${checkFileId}/check-items`, {
    method: 'PUT',
    data: CheckItemModifyDTO,
  });
}

// 获取数据包遗留问题落实集合
export async function getUnresolvedItems(params) {
  return request(
    `${prefix}/data-packages/${params.packageId}/unresolved${stringify(params, {
      addQueryPrefix: true,
    })}`,
  );
}

// 创建验收遗留问题
export async function createUnresolvedItems({ packageId, params }) {
  return request(`${prefix}/data-packages/${packageId}/unresolved`, {
    method: 'POST',
    data: params,
  });
}

// 修改验收遗留问题
export async function modifyUnresolvedItems({ packageId, params, unresolvedId }) {
  return request(`${prefix}/data-packages/${packageId}/unresolved/${unresolvedId}`, {
    method: 'PUT',
    data: params,
  });
}

// 验收遗留问题详情
export async function infoUnresolvedItems({ packageId, unresolvedId }) {
  return request(`${prefix}/data-packages/${packageId}/unresolved/${unresolvedId}`);
}

// 删除验收遗留问题
export async function deleteUnresolvedItems({ packageId, unresolvedId }) {
  return request(`${prefix}/data-packages/${packageId}/unresolved/${unresolvedId}`, {
    method: 'DELETE',
  });
}

// 获取交付清单交付项集合(项目分类,项目)
export async function getCheckListItems({ packageId, parentId }) {
  return request(
    `${prefix}/data-packages/${packageId}/check-list${stringify(parentId, {
      addQueryPrefix: true,
    })}`,
  );
}

// 获取交付清单交付项列表
export async function listCheckListItems(params) {
  return request(
    `${prefix}/data-packages/${params.packageId}/check-lists${stringify(params, {
      addQueryPrefix: true,
    })}`,
  );
}

// 添加交付清单交付项集合
export async function createCheckListItems({ packageId, params, parentId }) {
  return request(
    `${prefix}/data-packages/${packageId}/check-list${stringify(parentId, {
      addQueryPrefix: true,
    })}`,
    {
      method: 'POST',
      data: params,
    },
  );
}

// 删除交付清单
export async function deleteCheckListItem({ packageId, listItemId }) {
  return request(`${prefix}/data-packages/${packageId}/check-list/${listItemId}`, {
    method: 'DELETE',
  });
}

// 获取技术类检查单下的其他检查项集合
export async function getOtherItems({ packageId, checkFileId }) {
  return request(`${prefix}/data-packages/${packageId}/check-files/${checkFileId}/other-items`);
}

// 获取验收结论
export async function getConclusion({ isPreview, packageId }) {
  return request(`${prefix}/data-packages/${packageId}/conclusions?isPreview=${isPreview}`);
}

// 保存数据包
export async function savePackage({ packageId, newPackageName }) {
  return request(`${prefix}/data-packages/${packageId}/save?newPackageName=${newPackageName}`, {
    method: 'POST',
  });
}

// 获取上传文件详情
export async function getFileInfo({ packageId, fileId, isPreview }) {
  return request(
    `${prefix}/data-packages/${packageId}/check-files/upload-files/${fileId}?isPreview=${isPreview}`,
  );
}

// 获取上传文件详情
export async function editFileInfo({ packageId, fileId, fileData }) {
  return request(`${prefix}/data-packages/${packageId}/check-files/upload-files/${fileId}`, {
    method: 'PUT',
    data: fileData,
  });
}

// 遗留问题上传文件
export async function uploadUnresolvedFlie({ packageId, params }) {
  return request(`${prefix}/data-packages/${packageId}/check-unresolved`, {
    method: 'PUT',
    data: params,
  });
}

// 保存上传对象内容
export async function createUploadFile({ packageId, params }) {
  return request(`${prefix}/data-packages/${packageId}/check-files/upload-files`, {
    method: 'POST',
    data: params,
  });
}

// 上传在线文档
export async function onlineUpload({ packageId, files }) {
  return request(`${prefix}/data-packages/${packageId}/check-files/online-upload`, {
    method: 'POST',
    data: files,
  });
}

// 移除上传文件
export async function deleteFile({ id, documentId }) {
  return request(`${prefix}/upload-files/${documentId}`, {
    method: 'DELETE',
    params: { itemId: id },
  });
}

// 移除上传文件
export async function romoveFile({ documentId, itemId }) {
  return request(`${prefix}/upload-files/${documentId}/file-relate/${itemId}`, {
    method: 'DELETE',
  });
}

// 交付清单树
export async function getCheckListTree(params) {
  return request(
    `${prefix}/data-packages/${params.packageId}/check-list/tree${stringify(params, {
      addQueryPrefix: true,
    })}`,
  );
}

// 附件树
export async function getFileTree(params) {
  return request(
    `${prefix}/data-packages/${params.packageId}/check-list/file-tree${stringify(params, {
      addQueryPrefix: true,
    })}`,
  );
}

// 获取产品编号
export async function getProductCodes({ packageId }) {
  return request(`${prefix}/data-packages/${packageId}/product-codes`);
}

// 关联文件
export async function associatedFile({ documentIds, items }) {
  return request(`${prefix}/data-packages/relate-document`, {
    method: 'POST',
    data: {
      items,
      documentIds,
    },
  });
}

// 接收数据包列表
export async function applyformsList(params) {
  return request(
    `${prefix}/data-packages-import-list${stringify(params, {
      addQueryPrefix: true,
    })}`,
  );
}

// 创建接收数据包
export async function createApplyforms(params) {
  return request(`${prefix}/applyforms`, {
    method: 'POST',
    data: params,
  });
}

// 删除接收数据包
export async function deleteApplyform({ applyId }) {
  return request(`${prefix}/bom-packages/apply-forms/${applyId}`, {
    method: 'DELETE',
  });
}

// 创建接收数据包
export async function importApplyform({ objectId, supplementary }) {
  return request(`${prefix}/applyforms/import/${objectId}`, {
    method: 'POST',
    data: supplementary,
  });
}

// 总览
export async function getOverviewData() {
  return request(`${prefix}/data-packages/overview-data`);
}

// 表格
export async function getOverviewTable(params) {
  return request(
    `${prefix}/data-packages/overview-list${stringify(params, {
      addQueryPrefix: true,
    })}`,
  );
}

// 检入
export async function handCheckout({ packageId }) {
  return request(`${prefix}/data-packages/${packageId}/checkout`, {
    method: 'PUT',
  });
}

// 检出
export async function handCheckIn({ packageId }) {
  return request(`${prefix}/data-packages/${packageId}/checkIn`, {
    method: 'PUT',
  });
}

// 撤销检出
export async function handuUndoCheckout({ packageId }) {
  return request(`${prefix}/data-packages/${packageId}/undo-checkout`, {
    method: 'PUT',
  });
}

// 修订
export async function handRevise({ packageId }) {
  return request(`${prefix}/data-packages/${packageId}/revise`, {
    method: 'PUT',
  });
}

// 获取最新版本
export async function getNewVersion({ packageId }) {
  return request(`${prefix}/data-packages/${packageId}/status`);
}

// 获取历史版本
export async function getHistoryVersion({ packageId }) {
  return request(`${prefix}/data-packages/${packageId}/all-version`);
}

// 获取数据包进度
export async function getProcessPhase({ packageId }) {
  return request(`${prefix}/data-packages/${packageId}/process-phase`);
}

// 获取数据包内总览统计
export async function getOverviewInfo({ packageId }) {
  return request(`${prefix}/data-packages/${packageId}/overview-info`);
}

// 设置所有者
export async function setPackageOwner({ packageId, ownerId }) {
  return request(`${prefix}/data-packages/${packageId}/owner?ownerId=${ownerId}`, {
    method: 'POST',
  });
}

// 设置为默认模板
export async function setdefaultTemplate({ packageId, defaultTemplate }) {
  return request(
    `${prefix}/data-packages/${packageId}/default-template?defaultTemplate=${defaultTemplate}`,
    {
      method: 'PUT',
    },
  );
}

// 获取未关联的检查项
export async function getUnassociatedCheckItems({ packageId, checkFileId, groupId, itemId }) {
  return request(
    `${prefix}/data-packages/${packageId}/check-files/${checkFileId}/check-groups/${groupId}/check-items?itemId=${itemId}`,
  );
}

// 获取相关内容树
export async function getRelateContentsTree({ packageId }) {
  return request(`${prefix}/data-packages/${packageId}/relate-contents`);
}

// 获取当前节点下的交付项文件
export async function getTreeFiles({ packageId, projectId }) {
  return request(`${prefix}/data-packages/${packageId}/relate-contents/${projectId}/documents`);
}

// 保存相关内容已选择的交付
export async function qualityAddNode({ packageId, nodeId }) {
  return request(`${prefix}/data-packages/${packageId}/add-node/${nodeId}`, {
    method: 'PUT',
  });
}

// 创建验收任务
export async function createCheckTask(params) {
  return request(`${prefix}/data-packages/check-task`, {
    method: 'POST',
    data: params,
  });
}

// 保存任务文件
export async function uploadTaskFile(params) {
  return request(
    `${prefix}/data-packages/${params.packageId}/check-task/${params.taskId}/content`,
    {
      method: 'PUT',
      data: params,
    },
  );
}

// 导出技术指标
export async function inspectionsExport(packageId) {
  return request(
    `${prefix}/data-package/${packageId}/index-inspections/export?packageId=${packageId}`,
    {
      method: 'GET',
    },
  );
}

// 导入技术指标
export async function inspectionsImport(params) {
  return request(`${prefix}/data-package/${params.packageId}/index-inspections/import`, {
    method: 'POST',
    data: params.formData,
  });
}

// 指标检测上传文件
export async function inspectionsUpload(params) {
  return request(`${prefix}/data-packages/${params.packageId}/index-inspections/upload`, {
    method: 'PUT',
    data: params.dtos,
  });
}

// 更改说明列表
export async function getPackageChanges(params) {
  return request(
    `${prefix}/data-package/${params.packageId}/data-package-changes?packageId=${params.packageId}&isPreview=${params.isPreview}`,
    {
      method: 'GET',
    },
  );
}

// 创建更改说明
export async function createPackageChanges(params) {
  return request(`${prefix}/data-package/${params.packageId}/data-package-changes`, {
    method: 'POST',
    data: params,
  });
}

// 编辑更改说明
export async function editPackageChanges(params) {
  return request(
    `${prefix}/data-package/${params.packageId}/data-package-changes/${params.changeId}`,
    {
      method: 'PUT',
      data: params,
    },
  );
}

// 更改说明详情
export async function packageChangesItem(params) {
  return request(
    `${prefix}/data-package/${params.packageId}/data-package-changes/${params.changeId}`,
    {
      method: 'GET',
    },
  );
}

// 删除更改说明
export async function deletePackageChanges(params) {
  return request(
    `${prefix}/data-package/${params.packageId}/data-package-changes/${params.changeId}`,
    {
      method: 'DELETE',
      data: params,
    },
  );
}

// 导出数据包校验
export async function checkExport(params) {
  return request(`${prefix}/data-package/${params}/check-export`, {
    method: 'get',
  });
}

// 获取交付清单交付项详情
export async function getItemInfo({ packageId, listItemId }) {
  return request(`${prefix}/data-packages/${packageId}/check-list/${listItemId}`, {
    method: 'get',
  });
}

// 设置交付项是否关联文档
export async function setRelation({ associated, packageId, listItemIds }) {
  return request(`${prefix}/data-packages/${packageId}/check-list?associated=${associated}`, {
    method: 'put',
    data: listItemIds,
  });
}

// 编辑交付清单的交付项
export async function editCheckListItem({ packageId, listItemId, dto }) {
  return request(`${prefix}/data-packages/${packageId}/check-list/${listItemId}`, {
    method: 'put',
    data: dto,
  });
}

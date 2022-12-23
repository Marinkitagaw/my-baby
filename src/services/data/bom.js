import { request } from '@cpdm/util';
import { stringify } from 'qs';

const prefix = '/bom';
const adminPrefix = '/admin';
const procePrefix = '/package';
const resourcePrefix = '/resource';

// 功能bom-klu

// 创建节点
export async function createProduct(params) {
  return request(`${procePrefix}/data-package/acceptance-product`, {
    method: 'POST',
    data: params,
  });
}
// BOM管理部件转换
export async function FProcess(partId, _, aBoolean) {
  if (aBoolean) {
    return request(`${procePrefix}/data-package/${partId}/function-parts?aBoolean=${aBoolean}`);
  }
  return request(`${procePrefix}/data-package/${partId}/function-parts`);
}
export async function DProcess(_, partCode, isPwc) {
  return request(`${procePrefix}/data-package/design-parts?code=${partCode}&isPwc=${isPwc}`);
}
export async function FAProcess(_, partCode, isPwc) {
  return request(`${procePrefix}/data-package/fact-parts?code=${partCode}&isPwc=${isPwc}`);
}
export async function PProcess(_, partCode, isPwc) {
  return request(`${procePrefix}/data-package/process-parts?code=${partCode}&isPwc=${isPwc}`);
}
// bom视图转换
export async function bomViewTurn(params) {
  return request(
    `${prefix}/common-parts/${params.partId}/transform-link${stringify(params, {
      addQueryPrefix: true,
    })}`,
    {
      method: 'PUT',
      data: params,
    },
  );
}

// 获取下游视图
export async function getTransformType(params) {
  return request(
    `/admin/category-relations-identifier${stringify(params, { addQueryPrefix: true })}`,
  );
}
// 列表
export async function FPartList() {
  return request(`${prefix}/function-parts/list`);
}
// 获取属性
export async function FPartAttr() {
  return request(`${prefix}/function-parts`);
}
// 创建
export async function FPartCreate(forms) {
  return request(`${prefix}/function-parts`, {
    method: 'POST',
    data: forms,
  });
}

export async function DPartCreate(forms) {
  return request(`${prefix}/design-parts`, {
    method: 'POST',
    data: forms,
  });
}

export async function PPartCreate(forms) {
  return request(`${prefix}/process-parts`, {
    method: 'POST',
    data: forms,
  });
}

export async function FAPartCreate(forms) {
  return request(`${prefix}/fact-parts`, {
    method: 'POST',
    data: forms,
  });
}

export async function SPartCreate(forms) {
  return request(`${prefix}/service-parts`, {
    method: 'POST',
    data: forms,
  });
}

export async function BPartCreate(forms) {
  return request(`${prefix}/batch-parts`, {
    method: 'POST',
    data: forms,
  });
}
// 编辑
export async function DPartEdit(forms) {
  return request(`${prefix}/design-parts`, {
    method: 'PUT',
    data: forms,
  });
}

export async function PPartEdit(forms) {
  return request(`${prefix}/process-parts`, {
    method: 'PUT',
    data: forms,
  });
}

export async function FPartEdit(forms) {
  return request(`${prefix}/function-parts`, {
    method: 'PUT',
    data: forms,
  });
}

export async function FAPartEdit(forms) {
  return request(`${prefix}/fact-parts`, {
    method: 'PUT',
    data: forms,
  });
}

export async function SPartEdit(forms) {
  return request(`${prefix}/service-parts`, {
    method: 'PUT',
    data: forms,
  });
}

export async function BPartEdit(forms) {
  return request(`${prefix}/batch-parts`, {
    method: 'PUT',
    data: forms,
  });
}

// 详情
export async function FPartInfo(partId) {
  return request(`${prefix}/function-parts/${partId}`);
}

export async function DPartInfo(partId) {
  return request(`${prefix}/design-parts/${partId}`);
}

export async function PPartInfo(partId) {
  return request(`${prefix}/process-parts/${partId}`);
}

export async function FAPartInfo(partId) {
  return request(`${prefix}/fact-parts/${partId}`);
}

export async function SPartInfo(partId) {
  return request(`${prefix}/service-parts/${partId}`);
}

export async function BPartInfo(partId) {
  return request(`${prefix}/batch-parts/${partId}`);
}

// 相关文档
export async function FPartDescribeDoc(partId) {
  return request(`${prefix}/function-parts/${partId}/describe-doc`);
}

export async function DPartDescribeDoc(partId, type, objectType) {
  const params = {
    objectType: objectType ? 'com.casic.cpdm.document.entity.TestDocument' : undefined,
  };
  return request(
    `${prefix}/design-parts/${partId}/describe-doc${stringify(params, {
      addQueryPrefix: true,
    })}`,
  );
}

export async function PPartDescribeDoc(partId) {
  return request(`${prefix}/process-parts/${partId}/describe-doc`);
}

export async function FAPartDescribeDoc(partId, type, objectType, params = {}) {
  return request(
    `${prefix}/fact-parts/${partId}/describe-doc${stringify(params, {
      addQueryPrefix: true,
    })}`,
  );
}

export async function SPartDescribeDoc(partId) {
  return request(`${prefix}/service-parts/${partId}/describe-doc`);
}

export async function BPartDescribeDoc(partId) {
  return request(`${prefix}/batch-parts/${partId}/describe-doc`);
}

// 插入相关文档
export async function FPartAddDescribeDoc(partId, data) {
  return request(`${prefix}/function-parts/${partId}/describe-doc`, {
    method: 'POST',
    data,
  });
}

export async function DPartAddDescribeDoc(partId, data) {
  return request(`${prefix}/design-parts/${partId}/describe-doc`, {
    method: 'POST',
    data,
  });
}

export async function PPartAddDescribeDoc(partId, data) {
  return request(`${prefix}/process-parts/${partId}/describe-doc`, {
    method: 'POST',
    data,
  });
}

export async function FAPartAddDescribeDoc(partId, data) {
  return request(`${prefix}/fact-parts/${partId}/describe-doc`, {
    method: 'POST',
    data,
  });
}

export async function SPartAddDescribeDoc(partId, data) {
  return request(`${prefix}/service-parts/${partId}/describe-doc`, {
    method: 'POST',
    data,
  });
}

export async function BPartAddDescribeDoc(partId, data) {
  return request(`${prefix}/batch-parts/${partId}/describe-doc`, {
    method: 'POST',
    data,
  });
}

// 移除相关文档
export async function FPartRemoveDescribeDoc(partId, data) {
  return request(`${prefix}/function-parts/${partId}/describe-doc`, {
    method: 'DELETE',
    data,
  });
}

export async function DPartRemoveDescribeDoc(partId, data) {
  return request(`${prefix}/design-parts/${partId}/describe-doc`, {
    method: 'DELETE',
    data,
  });
}

export async function PPartRemoveDescribeDoc(partId, data) {
  return request(`${prefix}/process-parts/${partId}/describe-doc`, {
    method: 'DELETE',
    data,
  });
}

export async function FAPartRemoveDescribeDoc(partId, data) {
  return request(`${prefix}/fact-parts/${partId}/describe-doc`, {
    method: 'DELETE',
    data,
  });
}

export async function SPartRemoveDescribeDoc(partId, data) {
  return request(`${prefix}/service-parts/${partId}/describe-doc`, {
    method: 'DELETE',
    data,
  });
}

export async function BPartRemoveDescribeDoc(partId, data) {
  return request(`${prefix}/batch-parts/${partId}/describe-doc`, {
    method: 'DELETE',
    data,
  });
}

// 结构下级部件
export async function FPartStruture(partId, query) {
  return request(
    `${prefix}/function-parts/${partId}/sub-parts${stringify(query, { addQueryPrefix: true })}`,
  );
}

export async function BPartStruture(partId, query) {
  return request(
    `${prefix}/batch-parts/${partId}/sub-parts${stringify(query, { addQueryPrefix: true })}`,
  );
}

export async function DPartStruture(partId, query) {
  return request(
    `${resourcePrefix}/design-parts/${partId}/sub-components${stringify(query, {
      addQueryPrefix: true,
    })}`,
  );
}

// 获取元器件国产化率数据
export async function getLocalizationRate(partId) {
  return request(`${resourcePrefix}/design-parts/${partId}/component/localization`);
}

// 获取元器件目录外审批占比情况
export async function outsideCatalog(partId) {
  return request(`${resourcePrefix}/design-parts/${partId}/component/approve`);
}

// 获取元器件目录外审批情况表
export async function outsideCatalogTable(partId) {
  return request(`${resourcePrefix}/design-parts/${partId}/component/catalog`);
}

export async function PPartStruture(partId, query) {
  return request(
    `${prefix}/process-parts/${partId}/sub-parts${stringify(query, { addQueryPrefix: true })}`,
  );
}

export async function FAPartStruture(partId, query) {
  return request(
    `${prefix}/fact-parts/${partId}/sub-parts${stringify(query, { addQueryPrefix: true })}`,
  );
}
export async function SPartStruture(partId, query) {
  return request(
    `${prefix}/service-parts/${partId}/sub-parts${stringify(query, { addQueryPrefix: true })}`,
  );
}

export async function DPartEditComponents(partId, data) {
  return request(`${prefix}/design-parts/${partId}/components`, {
    method: 'PUT',
    data,
  });
}

export async function FAPartEditComponents(partId, data) {
  return request(`${prefix}/fact-parts/${partId}/components`, {
    method: 'PUT',
    data,
  });
}

export async function DPartBatchEditComponents(data) {
  return request(`${prefix}/design-parts/components`, {
    method: 'PUT',
    data,
  });
}

export async function FAPartBatchEditComponents(data) {
  return request(`${prefix}/fact-parts/components`, {
    method: 'PUT',
    data,
  });
}

export async function DPartImportPreviewComponents(partId, query) {
  return request(
    `${prefix}/design-parts/${partId}/components/import${stringify(query, {
      addQueryPrefix: true,
    })}`,
  );
}

export async function FAPartImportPreviewComponents(partId, query) {
  return request(
    `${prefix}/fact-parts/${partId}/components/import${stringify(query, {
      addQueryPrefix: true,
    })}`,
  );
}

export async function importPreviewComponents(partId, data) {
  return request(`${resourcePrefix}/components/${partId}/import`, {
    method: 'PUT',
    data,
  });
}

export async function compareCatalog(factoryId, modelSpecification) {
  return request(`${resourcePrefix}/components/${factoryId}/factory`, {
    method: 'GET',
    params: { modelSpecification },
  });
}

export async function uploadComponents(partId, query) {
  return request(
    `${prefix}/design-parts/${partId}/components/import${stringify(query, {
      addQueryPrefix: true,
    })}`,
  );
}

// 获取BOM流程数据
export async function getProcessData(params) {
  return request(`${prefix}/process-instance/${params}/data-packet`);
}

// 添加BOM流程数据
export async function addProcessData({ processInstanceId, bomIds }) {
  return request(`${prefix}/process-instance/${processInstanceId}/data-packet`, {
    method: 'POST',
    data: bomIds,
  });
}

// 移除BOM流程数据
export async function removeProcessData({ processInstanceId, bomIds }) {
  return request(`${prefix}/process-instance/${processInstanceId}/data-packet`, {
    method: 'PUT',
    data: bomIds,
  });
}

// 插入新的下级部件
export async function FPartAddStruture(partId, forms) {
  return request(`${prefix}/function-parts/${partId}/sub-parts`, {
    method: 'POST',
    data: forms,
  });
}
export async function DPartAddStruture(partId, forms) {
  return request(`${prefix}/design-parts/${partId}/sub-parts`, {
    method: 'POST',
    data: forms,
  });
}
export async function PPartAddStruture(partId, forms) {
  return request(`${prefix}/process-parts/${partId}/sub-parts`, {
    method: 'POST',
    data: forms,
  });
}
export async function FAPartAddStruture(partId, forms) {
  return request(`${prefix}/fact-parts/${partId}/sub-parts`, {
    method: 'POST',
    data: forms,
  });
}

export async function SPartAddStruture(partId, forms) {
  return request(`${prefix}/service-parts/${partId}/sub-parts`, {
    method: 'POST',
    data: forms,
  });
}

export async function BPartAddStruture(partId, forms) {
  return request(`${prefix}/batch-parts/${partId}/sub-parts`, {
    method: 'POST',
    data: forms,
  });
}

// 移除下级部件
export async function FPartRemoveStruture(partId, linkIds) {
  return request(`${prefix}/function-parts/${partId}/sub-parts`, {
    method: 'DELETE',
    data: linkIds,
  });
}
export async function DPartRemoveStruture(partId, linkIds) {
  return request(`${prefix}/design-parts/${partId}/sub-parts`, {
    method: 'DELETE',
    data: linkIds,
  });
}
export async function PPartRemoveStruture(partId, linkIds) {
  return request(`${prefix}/process-parts/${partId}/sub-parts`, {
    method: 'DELETE',
    data: linkIds,
  });
}
export async function FAPartRemoveStruture(partId, linkIds) {
  return request(`${prefix}/fact-parts/${partId}/sub-parts`, {
    method: 'DELETE',
    data: linkIds,
  });
}

export async function SPartRemoveStruture(partId, linkIds) {
  return request(`${prefix}/service-parts/${partId}/sub-parts`, {
    method: 'DELETE',
    data: linkIds,
  });
}

export async function BPartRemoveStruture(partId, linkIds) {
  return request(`${prefix}/batch-parts/${partId}/sub-parts`, {
    method: 'DELETE',
    data: linkIds,
  });
}

// 插入新的下游数据
export async function FPartAddSub(partId, forms) {
  return request(`${prefix}/function-parts/${partId}/down-parts`, {
    method: 'POST',
    data: forms,
  });
}
export async function DPartAddSub(partId, forms) {
  return request(`${prefix}/design-parts/${partId}/down-parts`, {
    method: 'POST',
    data: forms,
  });
}
export async function PPartAddSub(partId, forms) {
  return request(`${prefix}/process-parts/${partId}/down-parts`, {
    method: 'POST',
    data: forms,
  });
}
export async function FAPartAddSub(partId, forms) {
  return request(`${prefix}/fact-parts/${partId}/down-parts`, {
    method: 'POST',
    data: forms,
  });
}
export async function SPartAddSub(partId, forms) {
  return request(`${prefix}/service-parts/${partId}/down-parts`, {
    method: 'POST',
    data: forms,
  });
}
export async function BPartAddSub(partId, forms) {
  return request(`${prefix}/batch-parts/${partId}/down-parts`, {
    method: 'POST',
    data: forms,
  });
}

// 移除新的下游数据
export async function FPartRemoveSub(partId, ids) {
  return request(`${prefix}/function-parts/${partId}/down-parts`, {
    method: 'DELETE',
    data: ids,
  });
}
export async function DPartRemoveSub(partId, ids) {
  return request(`${prefix}/design-parts/${partId}/down-parts`, {
    method: 'DELETE',
    data: ids,
  });
}
export async function PPartRemoveSub(partId, ids) {
  return request(`${prefix}/process-parts/${partId}/down-parts`, {
    method: 'DELETE',
    data: ids,
  });
}
export async function FAPartRemoveSub(partId, ids) {
  return request(`${prefix}/fact-parts/${partId}/down-parts`, {
    method: 'DELETE',
    data: ids,
  });
}

export async function SPartRemoveSub(partId, ids) {
  return request(`${prefix}/service-parts/${partId}/down-parts`, {
    method: 'DELETE',
    data: ids,
  });
}

export async function BPartRemoveSub(partId, ids) {
  return request(`${prefix}/batch-parts/${partId}/down-parts`, {
    method: 'DELETE',
    data: ids,
  });
}

// 插入新的上游游数据
export async function FPartAddUp(partId, forms) {
  return request(`${prefix}/function-parts/${partId}/up-parts`, {
    method: 'POST',
    data: forms,
  });
}
export async function DPartAddUp(partId, forms) {
  return request(`${prefix}/design-parts/${partId}/up-parts`, {
    method: 'POST',
    data: forms,
  });
}
export async function PPartAddUp(partId, forms) {
  return request(`${prefix}/process-parts/${partId}/up-parts`, {
    method: 'POST',
    data: forms,
  });
}
export async function FAPartAddUp(partId, forms) {
  return request(`${prefix}/fact-parts/${partId}/up-parts`, {
    method: 'POST',
    data: forms,
  });
}

export async function SPartAddUp(partId, forms) {
  return request(`${prefix}/service-parts/${partId}/up-parts`, {
    method: 'POST',
    data: forms,
  });
}
export async function BPartAddUp(partId, forms) {
  return request(`${prefix}/batch-parts/${partId}/up-parts`, {
    method: 'POST',
    data: forms,
  });
}

// 移除新的上游游数据
export async function FPartRemoveUp(partId, ids) {
  return request(`${prefix}/function-parts/${partId}/up-parts`, {
    method: 'DELETE',
    data: ids,
  });
}
export async function DPartRemoveUp(partId, ids) {
  return request(`${prefix}/design-parts/${partId}/up-parts`, {
    method: 'DELETE',
    data: ids,
  });
}
export async function PPartRemoveUp(partId, ids) {
  return request(`${prefix}/process-parts/${partId}/up-parts`, {
    method: 'DELETE',
    data: ids,
  });
}
export async function FAPartRemoveUp(partId, ids) {
  return request(`${prefix}/fact-parts/${partId}/up-parts`, {
    method: 'DELETE',
    data: ids,
  });
}
export async function SPartRemoveUp(partId, ids) {
  return request(`${prefix}/service-parts/${partId}/up-parts`, {
    method: 'DELETE',
    data: ids,
  });
}
export async function BPartRemoveUp(partId, ids) {
  return request(`${prefix}/batch-parts/${partId}/up-parts`, {
    method: 'DELETE',
    data: ids,
  });
}

// 操作
export async function checkout(forms) {
  return request(`${prefix}/iterates/check-out`, {
    method: 'POST',
    data: forms,
  });
}
export async function checkin(forms) {
  return request(`${prefix}/iterates/check-in`, {
    method: 'POST',
    data: forms,
  });
}

export async function revise(forms) {
  return request(`${prefix}/iterates/revise`, {
    method: 'POST',
    data: forms,
  });
}

export async function undoCheckout(forms) {
  return request(`${prefix}/iterates/undo-checkout`, {
    method: 'POST',
    data: forms,
  });
}

export async function origin(objectType, objectId) {
  return request(`${prefix}/iterates/${objectType}/${objectId}/origin`);
}

export async function working(objectType, objectId) {
  return request(`${prefix}/iterates/${objectType}/${objectId}/working`);
}

export async function goToLatest(objectType, objectId) {
  return request(`${prefix}/iterates/${objectType}/${objectId}/goToLatest`);
}

export async function setLifecycleState(param) {
  return request(`${prefix}/bom-lifecycle-states`, {
    method: 'PUT',
    data: param,
  });
}

export async function FPartDelete(partId, mode) {
  return request(`${prefix}/function-parts/${partId}?mode=${mode}`, {
    method: 'DELETE',
  });
}

export async function FAPartDelete(partId, mode) {
  return request(`${prefix}/fact-parts/${partId}?mode=${mode}`, {
    method: 'DELETE',
  });
}
export async function PPartDelete(partId, mode) {
  return request(`${prefix}/process-parts/${partId}?mode=${mode}`, {
    method: 'DELETE',
  });
}
export async function DPartDelete(partId, mode) {
  return request(`${prefix}/design-parts/${partId}?mode=${mode}`, {
    method: 'DELETE',
  });
}

export async function SPartDelete(partId, mode) {
  return request(`${prefix}/service-parts/${partId}?mode=${mode}`, {
    method: 'DELETE',
  });
}

export async function BPartDelete(partId, mode) {
  return request(`${prefix}/batch-parts/${partId}?mode=${mode}`, {
    method: 'DELETE',
  });
}

export async function FPartReview(datas) {
  return request(`${prefix}/function-parts/processes`, {
    method: 'POST',
    data: datas,
  });
}

export async function DPartReview(datas) {
  return request(`${prefix}/design-parts/processes`, {
    method: 'POST',
    data: datas,
  });
}

export async function PPartReview(datas) {
  return request(`${prefix}/process-parts/processes`, {
    method: 'POST',
    data: datas,
  });
}

export async function FAPartReview(datas) {
  return request(`${prefix}/fact-parts/processes`, {
    method: 'POST',
    data: datas,
  });
}

export async function SPartReview(datas) {
  return request(`${prefix}/service-parts/processes`, {
    method: 'POST',
    data: datas,
  });
}

export async function BPartReview(datas) {
  return request(`${prefix}/batch-parts/processes`, {
    method: 'POST',
    data: datas,
  });
}

// 重命名
export async function FPartRename(partId, values) {
  return request(`${prefix}/function-parts/${partId}/rename`, {
    method: 'PUT',
    data: values,
  });
}

export async function DPartRename(partId, values) {
  return request(`${prefix}/design-parts/${partId}/rename`, {
    method: 'PUT',
    data: values,
  });
}

export async function PPartRename(partId, values) {
  return request(`${prefix}/process-parts/${partId}/rename`, {
    method: 'PUT',
    data: values,
  });
}

export async function FAPartRename(partId, values) {
  return request(`${prefix}/fact-parts/${partId}/rename`, {
    method: 'PUT',
    data: values,
  });
}

export async function SPartRename(partId, values) {
  return request(`${prefix}/service-parts/${partId}/rename`, {
    method: 'PUT',
    data: values,
  });
}

export async function BPartRename(partId, values) {
  return request(`${prefix}/batch-parts/${partId}/rename`, {
    method: 'PUT',
    data: values,
  });
}

// 相关流程
export async function DPartProcess(partId, objectType) {
  return request(`${prefix}/design-parts/${partId}/processes?objectType=${objectType}`);
}

export async function FPartProcess(partId, objectType) {
  return request(`${prefix}/function-parts/${partId}/processes?objectType=${objectType}`);
}

export async function PPartProcess(partId, objectType) {
  return request(`${prefix}/process-parts/${partId}/processes?objectType=${objectType}`);
}

export async function FAPartProcess(partId, objectType) {
  return request(`${prefix}/fact-parts/${partId}/processes?objectType=${objectType}`);
}

export async function SPartProcess(partId, objectType) {
  return request(`${prefix}/service-parts/${partId}/processes?objectType=${objectType}`);
}

export async function BPartProcess(partId, objectType) {
  return request(`${prefix}/batch-parts/${partId}/processes?objectType=${objectType}`);
}

// 设置所有者
export async function DPartSetOwner(docId, query) {
  return request(
    `${prefix}/design-parts/${docId}/owner${stringify(query, { addQueryPrefix: true })}`,
    {
      method: 'PUT',
    },
  );
}

export async function SPartSetOwner(docId, query) {
  return request(
    `${prefix}/service-parts/${docId}/owner${stringify(query, { addQueryPrefix: true })}`,
    {
      method: 'PUT',
    },
  );
}

export async function FPartSetOwner(docId, query) {
  return request(
    `${prefix}/function-parts/${docId}/owner${stringify(query, { addQueryPrefix: true })}`,
    {
      method: 'PUT',
    },
  );
}

export async function FAPartSetOwner(docId, query) {
  return request(
    `${prefix}/fact-parts/${docId}/owner${stringify(query, { addQueryPrefix: true })}`,
    {
      method: 'PUT',
    },
  );
}

export async function PPartSetOwner(docId, query) {
  return request(
    `${prefix}/process-parts/${docId}/owner${stringify(query, { addQueryPrefix: true })}`,
    {
      method: 'PUT',
    },
  );
}

export async function BPartSetOwner(docId, query) {
  return request(
    `${prefix}/batch-parts/${docId}/owner${stringify(query, { addQueryPrefix: true })}`,
    {
      method: 'PUT',
    },
  );
}

// 设置协作者
export async function DPartSetCollaborator(partId, data) {
  return request(`${prefix}/design-parts/${partId}/collaborators`, {
    method: 'PUT',
    data,
  });
}

// 外协配套交付-采集数据包
export async function DPartGetCollect(params) {
  return request(`/package/check-package/applyforms${stringify(params, { addQueryPrefix: true })}`);
}

// 外协配套交付-下厂验收数据包
export async function DPartGetAcceptance(params) {
  return request(
    `/package/bom-package/apply-package${stringify(params, { addQueryPrefix: true })}`,
  );
}

// 文档

export async function CDocList(params) {
  return request(`${prefix}/common-docs${stringify(params, { addQueryPrefix: true })}`);
}

export async function FDocType() {
  return request(`${prefix}/function-docs/types`);
}

export async function DDocType() {
  return request(`${prefix}/design-docs/types`);
}

export async function PDocType() {
  return request(`${prefix}/process-docs/types`);
}

export async function FADocType() {
  return request(`${prefix}/fact-docs/types`);
}
export async function CDocType() {
  return request(`${prefix}/common-docs/types`);
}
export async function DocType(query) {
  return request(`${adminPrefix}/categories/children${stringify(query, { addQueryPrefix: true })}`);
}
export async function DocType1(query) {
  return request(
    `/package/data-package/categories/children${stringify(query, { addQueryPrefix: true })}`,
  );
}

// 创建文档
export async function FDocCreate(data) {
  return request(`${prefix}/function-docs`, {
    method: 'POST',
    data,
  });
}

export async function DDocCreate(data) {
  return request(`${prefix}/design-docs`, {
    method: 'POST',
    data,
  });
}

export async function PDocCreate(data) {
  return request(`${prefix}/process-docs`, {
    method: 'POST',
    data,
  });
}

export async function FADocCreate(data) {
  return request(`${prefix}/fact-docs`, {
    method: 'POST',
    data,
  });
}

export async function BDocCreate(data) {
  return request(`${prefix}/batch-docs`, {
    method: 'POST',
    data,
  });
}

export async function CDocCreate(data) {
  return request(`${prefix}/common-docs`, {
    method: 'POST',
    data,
  });
}

// 操作
export async function FDocDelete(docId, query) {
  return request(`${prefix}/function-docs/${docId}${stringify(query, { addQueryPrefix: true })}`, {
    method: 'DELETE',
  });
}

export async function FADocDelete(docId, query) {
  return request(`${prefix}/fact-docs/${docId}${stringify(query, { addQueryPrefix: true })}`, {
    method: 'DELETE',
  });
}
export async function PDocDelete(docId, query) {
  return request(`${prefix}/process-docs/${docId}${stringify(query, { addQueryPrefix: true })}`, {
    method: 'DELETE',
  });
}
export async function DDocDelete(docId, query) {
  return request(`${prefix}/design-docs/${docId}${stringify(query, { addQueryPrefix: true })}`, {
    method: 'DELETE',
  });
}

export async function CDocDelete(docId, query) {
  return request(`${prefix}/common-docs/${docId}${stringify(query, { addQueryPrefix: true })}`, {
    method: 'DELETE',
  });
}

// 设置参与者
export async function CDocSetOwner(docId, query) {
  return request(
    `${prefix}/common-docs/${docId}/owner${stringify(query, { addQueryPrefix: true })}`,
    {
      method: 'PUT',
    },
  );
}

export async function FDocSetOwner(docId, query) {
  return request(
    `${prefix}/function-docs/${docId}/owner${stringify(query, { addQueryPrefix: true })}`,
    {
      method: 'PUT',
    },
  );
}

export async function DDocSetOwner(docId, query) {
  return request(
    `${prefix}/design-docs/${docId}/owner${stringify(query, { addQueryPrefix: true })}`,
    {
      method: 'PUT',
    },
  );
}

export async function FADocSetOwner(docId, query) {
  return request(
    `${prefix}/fact-docs/${docId}/owner${stringify(query, { addQueryPrefix: true })}`,
    {
      method: 'PUT',
    },
  );
}

export async function PDocSetOwner(docId, query) {
  return request(
    `${prefix}/process-docs/${docId}/owner${stringify(query, { addQueryPrefix: true })}`,
    {
      method: 'PUT',
    },
  );
}

export async function SDocSetOwner(docId, query) {
  return request(
    `${prefix}/structure-docs/${docId}/owner${stringify(query, { addQueryPrefix: true })}`,
    {
      method: 'PUT',
    },
  );
}

// 文档详情
export async function FDocInfo(docId, query) {
  return request(`${prefix}/function-docs/${docId}${stringify(query, { addQueryPrefix: true })}`);
}

export async function DDocInfo(docId, query) {
  return request(`${prefix}/design-docs/${docId}${stringify(query, { addQueryPrefix: true })}`);
}

export async function PDocInfo(docId, query) {
  return request(`${prefix}/process-docs/${docId}${stringify(query, { addQueryPrefix: true })}`);
}

export async function FADocInfo(docId, query) {
  return request(`${prefix}/fact-docs/${docId}${stringify(query, { addQueryPrefix: true })}`);
}

export async function CDocInfo(docId, query) {
  return request(`${prefix}/common-docs/${docId}${stringify(query, { addQueryPrefix: true })}`);
}

// 编辑
export async function DDocEdit(forms) {
  return request(`${prefix}/design-docs`, {
    method: 'PUT',
    data: forms,
  });
}

export async function PDocEdit(forms) {
  return request(`${prefix}/process-docs`, {
    method: 'PUT',
    data: forms,
  });
}

export async function FDocEdit(forms) {
  return request(`${prefix}/function-docs`, {
    method: 'PUT',
    data: forms,
  });
}

export async function FADocEdit(forms) {
  return request(`${prefix}/fact-docs`, {
    method: 'PUT',
    data: forms,
  });
}

export async function CDocEdit(forms) {
  return request(`${prefix}/common-docs`, {
    method: 'PUT',
    data: forms,
  });
}

export async function FDocReview(datas) {
  return request(`${prefix}/function-docs/processes`, {
    method: 'POST',
    data: datas,
  });
}

export async function DDocReview(datas) {
  return request(`${prefix}/design-docs/processes`, {
    method: 'POST',
    data: datas,
  });
}

export async function CDocReview(datas) {
  return request(`${prefix}/common-docs/processes`, {
    method: 'POST',
    data: datas,
  });
}

export async function PDocReview(datas) {
  return request(`${prefix}/process-docs/processes`, {
    method: 'POST',
    data: datas,
  });
}

export async function FADocReview(datas) {
  return request(`${prefix}/fact-docs/processes`, {
    method: 'POST',
    data: datas,
  });
}

export async function bomReview(datas) {
  return request(`${prefix}/ultra-directories`, {
    method: 'POST',
    data: datas,
  });
}

// 重命名
export async function CDocRename(docId, values, query) {
  return request(
    `${prefix}/common-docs/${docId}/rename${stringify(query, { addQueryPrefix: true })}`,
    {
      method: 'PUT',
      data: values,
    },
  );
}

export async function DDocRename(docId, values, query) {
  return request(
    `${prefix}/design-docs/${docId}/rename${stringify(query, { addQueryPrefix: true })}`,
    {
      method: 'PUT',
      data: values,
    },
  );
}

export async function FDocRename(docId, values, query) {
  return request(
    `${prefix}/function-docs/${docId}/rename${stringify(query, { addQueryPrefix: true })}`,
    {
      method: 'PUT',
      data: values,
    },
  );
}

export async function PDocRename(docId, values, query) {
  return request(
    `${prefix}/process-docs/${docId}/rename${stringify(query, { addQueryPrefix: true })}`,
    {
      method: 'PUT',
      data: values,
    },
  );
}

export async function FADocRename(docId, values, query) {
  return request(
    `${prefix}/fact-docs/${docId}/rename${stringify(query, { addQueryPrefix: true })}`,
    {
      method: 'PUT',
      data: values,
    },
  );
}

// 流程实例
export async function DDocProcess(docId, objectType) {
  return request(`${prefix}/design-docs/${docId}/processes?objectType=${objectType}`);
}

export async function FDocProcess(docId, objectType) {
  return request(`${prefix}/function-docs/${docId}/processes?objectType=${objectType}`);
}

export async function FADocProcess(docId, objectType) {
  return request(`${prefix}/fact-docs/${docId}/processes?objectType=${objectType}`);
}

export async function PDocProcess(docId, objectType) {
  return request(`${prefix}/process-docs/${docId}/processes?objectType=${objectType}`);
}

export async function SDocProcess(docId, objectType) {
  return request(`${prefix}/structure-docs/${docId}/processes?objectType=${objectType}`);
}

export async function CDocProcess(docId, objectType) {
  return request(`${prefix}/common-docs/${docId}/processes?objectType=${objectType}`);
}

export async function CADDocProcess(docId, objectType) {
  return request(`${prefix}/cad-docs/${docId}/processes?objectType=${objectType}`);
}

// 质量数据包
export async function overview() {
  return request(`${prefix}/send-packets/statistical`);
}

export async function packetList() {
  return request(`${prefix}/send-packets`);
}

export async function createQualityPacket(values) {
  return request(`${prefix}/send-packets`, {
    method: 'POST',
    data: values,
  });
}

export async function uploadPacket(objectId, zipType) {
  return request(`${prefix}/send-packets/import/${objectId}?objectType=${zipType}`, {
    method: 'POST',
  });
}

export async function importPacket(objectId) {
  return request(`${prefix}/send-packets/${objectId}/batch`, {
    method: 'PUT',
  });
}

export async function deletePacket(packetId) {
  return request(`${prefix}/send-packets/${packetId}`, {
    method: 'DELETE',
  });
}

export async function exportPacket(packetId) {
  return request(`${prefix}/send-packets/${packetId}/export`);
}

export async function exportParts(objectType, packetId) {
  return request(`${prefix}/send-packets/${packetId}/export?objectType=${objectType}`);
}

export async function qualityFailureStatistics() {
  return request(`${prefix}/quality/failure-statistics`);
}

export async function PacketMember(packetId, query) {
  return request(
    `${prefix}/send-packets/${packetId}/members${stringify(query, { addQueryPrefix: true })}`,
  );
}

export async function CategoryTableDesign(partId, params) {
  return request(
    `${prefix}/design-parts/${partId}/component/categoryTable${stringify(params, {
      addQueryPrefix: true,
    })}`,
  );
}

export async function CategoryTableFact(partId, params) {
  return request(
    `${prefix}/fact-parts/${partId}/component/categoryTable${stringify(params, {
      addQueryPrefix: true,
    })}`,
  );
}

export async function DPartPreferredStatistical(partId, params) {
  return request(
    `${prefix}/design-parts/${partId}/component/preferred-statistical${stringify(params, {
      addQueryPrefix: true,
    })}`,
  );
}

export async function FAPartPreferredStatistical(partId, params) {
  return request(
    `${prefix}/fact-parts/${partId}/component/preferred-statistical${stringify(params, {
      addQueryPrefix: true,
    })}`,
  );
}

export async function addFactTransform(partId, values) {
  return request(`${prefix}/design-parts/${partId}/transform`, {
    method: 'POST',
    data: values,
  });
}

// 文档关联标签列表
export async function getAllTags(params) {
  return request(
    `${prefix}/tag-links${stringify(params, {
      addQueryPrefix: true,
    })}`,
  );
}

export async function lifecycleStates(params) {
  return request(
    `/admin/lifecycle-states${stringify(params, {
      addQueryPrefix: true,
    })}`,
  );
}

export async function createUltraDirectory(values) {
  return request(`${prefix}/ultra-directories`, {
    method: 'POST',
    data: values,
  });
}

export async function updateUltraDirectory(values) {
  return request(`${prefix}/ultra-directories/${values.id}`, {
    method: 'PUT',
    data: values,
  });
}

export async function getUltraDirectoriesInfo(params) {
  return request(`${prefix}/ultra-directories/${params.id}`);
}

export async function deleteUltraDirectory(params) {
  return request(`${prefix}/ultra-directories/${params.id}`, {
    method: 'DELETE',
  });
}

// 查询物料编码列表
export async function getResourceInfoList() {
  return request(`${prefix}/resource-info/list`);
}

// 修改物料编码列表
export async function editResourceInfoList(values) {
  return request(`${prefix}/resource-info`, {
    method: 'POST',
    data: values,
  });
}

// 删除物料编码
export async function deleteItem(params) {
  return request(`${prefix}/resource-info?resourceInfoId=${params.resourceInfoId}`, {
    method: 'DELETE',
  });
}
// 获取 从已有物料编码中选取 选项卡下的表格数据
export async function ResourceInfoList(params) {
  return request(`${prefix}/resource-info/list${stringify(params, { addQueryPrefix: true })}`);
}

// 通过部件获取部件的物资编码
export async function ResourceInfo(params) {
  return request(
    `${prefix}/resource-info?linkPartId=${params.linkPartId}&linkPartType=${params.linkPartType}`,
  );
}

// 重新绑定部件与物资编码的关联
export async function RebindResourceInfo(params) {
  return request(`${prefix}/resource-info/relink${stringify(params, { addQueryPrefix: true })}`, {
    method: 'POST',
  });
}

// 三维工艺数据页面增加 操作按钮 打开超链接地址
export async function openLink(partId) {
  return request(`/equipment/process-bom/viewer?partId=${partId}&mode=SECONDARY`);
}

// 获取工艺bom轻量话模型url参数
export async function viewerParams(partId) {
  return request(`/equipment/process-bom/viewer/?mode=PRIMARY&partId=${partId}`);
}

// 获取设计文档相关准则列表
export async function getCriteria() {
  return request(`/char/common-guidelines`);
}

// 获取设计文档相关准则列表子集列表
export async function getCriteriaChild(params) {
  return request(`/char/common-guidelines?parentId=${params.parentId}`);
}

// 获取文档关联的设计准则设计模式/查阅模式列表
export async function getCorrelationCriteria(params) {
  return request(`/char/common-guidelines-use-link${stringify(params, { addQueryPrefix: true })}`, {
    method: 'GET',
    // data: params,
  });
}

// 创建设计准则关联
export async function createCorrelationCriteria(params) {
  return request(
    `/char/common-guidelines-use-link?objectId=${params.objectId}&objectType=${params.objectType}`,
    {
      method: 'POST',
      data: params.data,
    },
  );
}
// 编辑设计准则关联
export async function editCorrelationCriteria(params) {
  return request(
    `/char/common-guidelines-use-link?objectId=${params.objectId}&objectType=${params.objectType}`,
    {
      method: 'PUT',
      data: params.data,
    },
  );
}

// 移除文档关联设计准则
export async function delCorrelationCriteria(params) {
  return request(`/char/common-guidelines-use-link/${params.commonGuidelinesUseLinkId}`, {
    method: 'DELETE',
  });
}

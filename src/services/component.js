import { stringify } from 'qs';
import { request } from '@cpdm/util';

const prefix = '/resource';
const suffix = 'name=密级';
const bomPrefix = '/bom';
const adminPrefix = '/admin';

// 元器件产品类别树
export async function productCategoryTree(params) {
  return request(
    `${prefix}/classification-tree?structId=${params}&objectType=com.casic.cpdm.part.entity.ComponentPart`,
  );
}
// 元器件供应商树
export async function supplierTree(params) {
  return request(
    `${prefix}/resource/component-supplier-tree${stringify(params, { addQueryPrefix: true })}`,
  );
}

// 统计数据
export async function listSalesPieDatas(params) {
  const model = params.type_ ? 'task-statistics' : 'statistics';
  delete params.type_;
  return request(`${prefix}/resources/${model}${stringify(params, { addQueryPrefix: true })}`);
}

// 申请类型统计数据
export async function listApplyPieDatas(params) {
  return request(`${prefix}/applys/statistics`, {
    method: 'GET',
    params: { ...params },
  });
}

// 元器件列表
export async function listComponents(params) {
  return request(`${prefix}/components${stringify(params, { addQueryPrefix: true })}`);
}

// 获取详情
export async function getComponentsInfo(params) {
  return request(`${prefix}/components/${params}`);
}

//获取基本信息
export async function getBasicInfo(params) {
  return request(`${prefix}/resources/root/${params}`);
}

// 获取附件对象
export async function getComponentContent(params) {
  return request(`${prefix}/resources/${params}/content`);
}

// 元器件创建
export async function create(params) {
  return request(`${prefix}/components`, {
    method: 'POST',
    data: params,
  });
}

// 元器件编辑
export async function edit(params) {
  return request(`${prefix}/components/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}

// 修订
export async function revise(params) {
  return request(`${prefix}/resource/revise`, {
    method: 'POST',
    params,
  });
}

// 检出
export async function checkout(params) {
  return request(`${bomPrefix}/iterates/check-out`, {
    method: 'POST',
    data: params,
  });
}

// 重建索引
export async function rebuildIndex(params) {
  return request(`${prefix}/parts-esp`, {
    method: 'POST',
    params,
  });
}

// 检入
export async function checkin(params) {
  return request(`${bomPrefix}/iterates/check-in`, {
    method: 'POST',
    data: params,
  });
}

// 撤销检出
export async function undoCheckout(params) {
  return request(`${bomPrefix}/iterates/undo-checkout`, {
    method: 'POST',
    data: params,
  });
}

// 元器件删除
export async function deleteComponent(params) {
  return request(`${prefix}/components/${params}`, {
    method: 'DELETE',
    data: params,
  });
}

// 元器件批量删除
export async function deleteComponents(params) {
  return request(`${prefix}/components`, {
    method: 'PUT',
    data: params,
  });
}

// 元器件分类树
export async function getTreeNode(params) {
  return request(`${prefix}/resources/tree/${params}`);
}

// 生产厂家、责任单位
export async function getOrganizations(params) {
  return request(`/admin/organizations?${stringify(params)}`);
}

// 字典列表
export async function listDicts() {
  return request(`/cpdm/dictionaries?${suffix}`);
}
// 字典条目列表
export async function listDictEntries(params) {
  return request(`/admin/dict-entries?${stringify(params)}`);
}

// 导入元器件
export async function importComponents(params) {
  return request(`${prefix}/components/import`, {
    method: 'POST',
    data: params,
  });
}

//获取物资信息
export async function getResourceInfo({ linkPartId, linkPartType }) {
  return request(`/bom/supplies-info/?linkPartId=${linkPartId}&linkPartType=${linkPartType}`);
}

//获取关键参数
export async function getKeyParameter(params) {
  return request(`${prefix}/resources/parameter/${params}`);
}

//获取目录清单
export async function getCatalogList(params) {
  return request(`${prefix}/component-dic-inventory`, {
    method: 'GET',
    params: { ...params },
  });
}

//新建 目录清单
export async function createCatalog(params) {
  return request(`${prefix}/component-dic-inventory`, {
    method: 'POST',
    data: { ...params },
  });
}

//导入目录清单
export async function onImport(params) {
  return request(`${prefix}/component-dic-inventory/import`, {
    method: 'POST',
    data: params,
  });
}

//编辑目录清单
export async function editCatalogue(params) {
  return request(`${prefix}/component-dic-inventory/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}

//删除目录清单
export async function onDeleteCatalogue(params) {
  return request(`${prefix}/component-dic-inventory/${params}`, {
    method: 'DELETE',
  });
}

//删除目录清单
export async function batchDelete(params) {
  return request(`${prefix}/component-dic-inventory/batch`, {
    method: 'DELETE',
    data: params,
  });
}

//获取分类
export async function getClassifications() {
  return request(`${prefix}/resources/tree/ComponentDicInventoryClassification`);
}

//获取分类树
export async function getClassificationTree() {
  return request(`${prefix}/component-dic-inventory/classification-tree`);
}

//获取厂家
export async function getFactoryTree() {
  return request(`${prefix}/component-dic-inventory/supplier`);
}

//获取厂家
export async function getFactorys() {
  return request(`${prefix}/components/supplier`);
}

//获取目录详情
export async function getCatalogInfo(params) {
  return request(`${prefix}/component-dic-inventory/${params}`);
}

// 关联目录清单
export async function relateComponents(params) {
  return request(`${prefix}/component-dic-inventory/relation`, {
    method: 'POST',
    params: { dicInventoryId: params.dicInventoryId },
    data: params.componentIds,
  });
}

// 元器件列表导入
export async function componentsImoprt(params) {
  return request(`${prefix}/components/import/${params.partId}/preview`, {
    method: 'POST',
    data: params.list,
  });
}

//获取元器件导入预览数据
export async function getPreview(params) {
  return request(`${prefix}/components/${params}/preview`);
}

// 获取元器件导入比较数据
export async function getCompareData(params) {
  return request(
    `${prefix}/components/import/compare${stringify(params, { addQueryPrefix: true })}`,
  );
}

/******************************  元器件选用  ******************************/

//获取原始数据
export async function getRawData(params) {
  return request(`${prefix}/data-easy`, {
    method: 'GET',
    params: { ...params },
  });
}

//获取原始数据
export async function getModels() {
  return request(`${prefix}/data-easy/models`);
}

//获取原始数据
export async function getEquipments(params) {
  return request(`${prefix}/data-easy/names`, {
    method: 'GET',
    params: { ...params },
  });
}

//获取全部链接
export async function getModelStatistics() {
  return request(`${prefix}/data-easy-url`);
}

//获取全部链接（无分页）
export async function getAllModelStatistics(params) {
  return request(`${adminPrefix}/data-easy-url/list`, { params });
}

//获取单个链接
export async function getModelStatistic(params) {
  return request(`${prefix}/data-easy-url/${params}`);
}

//新增链接
export async function addModelStatistics(params) {
  return request(`${prefix}/data-easy-url`, {
    method: 'POST',
    data: { ...params },
  });
}

//编辑链接
export async function editModelStatistics(params) {
  return request(`${prefix}/data-easy-url/${params.id}`, {
    method: 'PUT',
    data: { ...params },
  });
}

//删除链接
export async function deleteModelStatistics(params) {
  return request(`${prefix}/data-easy-url/${params}`, {
    method: 'DELETE',
  });
}

// 获取部件详情
export async function getPartInfo(partId) {
  return request(`${prefix}/design-parts/${partId}`);
}

// 获取关联元器件
export async function getRelateComponents(params) {
  return request(`${bomPrefix}/design-parts/${params.id}/sub-parts`, {
    method: 'GET',
    params: { objectType: params.objectType },
  });
}

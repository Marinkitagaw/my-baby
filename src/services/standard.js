import { stringify } from 'qs';
import { request } from '@cpdm/util';

const prefix = '/resource';
const bomPrefix = '/bom';

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

export async function listStandards(params) {
  return request(`${prefix}/standards${stringify(params, { addQueryPrefix: true })} `);
}

// 获取详情
export async function getStandard(params) {
  return request(`${prefix}/standards/${params}`);
}

//获取物资信息
export async function getResourceInfo({ linkPartId, linkPartType }) {
  return request(`/bom/supplies-info?linkPartId=${linkPartId}&linkPartType=${linkPartType}`);
}

//获取基本信息
export async function getBasicInfo(params) {
  return request(`${prefix}/resources/root/${params}`);
}

// 获取附件对象
export async function getStandardContent(params) {
  return request(`${prefix}/resources/${params}/content`);
}

// 获取一级分类属性
export async function getClassificationLevel1(params) {
  return request(`/cpdm/classifications/identifier/${params}`);
}

//  获取分类属性
export async function getClassification(params) {
  return request(`/cpdm/classifications/${params}/sub-classifications`);
}

// 创建
export async function create(params) {
  return request(`${prefix}/standards`, {
    method: 'POST',
    data: params,
  });
}

// 编辑
export async function edit(params) {
  return request(`${prefix}/standards/${params.id}`, {
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

// 删除
export async function deleteStandard(params) {
  return request(`${prefix}/standards/${params}`, {
    method: 'DELETE',
    data: params,
  });
}

// 批量删除
export async function deleteStandards(params) {
  return request(`${prefix}/standards`, {
    method: 'PUT',
    data: params,
  });
}

export async function getTreeNode(params) {
  return request(`${prefix}/resources/tree/${params}`);
}

export async function getDatas(params) {
  return request(`/admin/organizations?${stringify(params)}`);
}

// 列表
export async function listDictEntries(params) {
  return request(`/admin/dict-entries?${stringify(params)}`);
}

// 导入标准件
export async function importStandards(params) {
  // /standards/import-zip
  return request(`${prefix}/standards/import-zip`, {
    method: 'POST',
    data: params,
  });
}

// 导出
export async function listStatistic(params) {
  return request(`/forms/standards/statistics/export?${stringify(params)}`);
}

// 标准件统计
export async function listStatistics(params) {
  return request(`/forms/standards/statistics`, {
    method: 'PUT',
    data: params,
  });
}

// 标准件统计
export async function standardPartLibrary() {
  return request(`/forms/standards/library-name`);
}
// 标准件统计详情
export async function getstandardPartInfo(params) {
  return request(`/forms/standards/statistics/details`, {
    method: 'PUT',
    data: params,
  });
}
// 标准件使用频次统计
export async function standardPartUsedFrequencyStatistics(params) {
  return request(`/forms/standards/frequency-statistics`, {
    method: 'PUT',
    data: params,
  });
}
// 标准件使用频次详情统计
export async function standardPartUsedDetailsStatistics(params) {
  return request(`/forms/standards/frequency-details-statistics?standardPartMasterId=${params}`, {
    method: 'GET',
  });
}
export async function getReviewData(param) {
  return request(
    `${prefix}/resource/standard-parts/${param}/drawings?sourceType=Standard&targetType=Drawing`,
  );
}

// ---------------------物料编码

// 列表
export async function listParts(params) {
  return request(`/plm/api/public/parts${stringify(params, { addQueryPrefix: true })}`, {
    method: 'GET',
    // data: params,
  });
}
export async function getListParts(params) {
  return request(`/plm/api/v2/resource/resource/statistics`, {
    method: 'GET',
    params: params,
  });
}
// 更新
export async function updateMaterialCode(params) {
  // /stdparts/modify-material-code
  return request(`/plm/api/stdparts/modify-material-code`, {
    method: 'PUT',
    data: params,
  });
}
// 同步
export async function initialMaterialCode(params) {
  return request(`${prefix}/standards/meterialcode/initial`, {
    method: 'POST',
    data: params,
  });
}

// 详情
export async function getMaterialCode(params) {
  return request(`${prefix}/standards/meterialcode/${params}`);
}
// 获取物资信息
export async function getMaterialAttr(params) {
  return request(`/plm/api/stdparts/material-attr?codeOfMaterialA=${params}`);
}

// 获取标准件分类树
export async function getProductCategoryTree(params) {
  return request(
    `${prefix}/classification-tree?structId=${params}&objectType=com.casic.cpdm.part.entity.StandardPart`,
  );
}
// 获取标准件供应商树
export async function supplierTree() {
  return request(`${prefix}/standards/production-factory-tree`);
}

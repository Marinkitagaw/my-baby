import { stringify } from 'qs';
import { request } from '@cpdm/util';

const prefix = '/resource';
const bomPrefix = '/bom';

// 产品类别树
export async function productCategoryTree(params) {
  const objectType = params.objectType ?? 'com.casic.cpdm.part.entity.MaterialPart.';
  const structId = params.structId ?? params;

  return request(`${prefix}/classification-tree?structId=${structId}&objectType=${objectType}`);
}

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

export async function listMaterials(params) {
  return request(`${prefix}/materials${stringify(params, { addQueryPrefix: true })}`);
}

// 获取详情
export async function getMaterial(params) {
  return request(`${prefix}/materials/${params}`);
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
export async function getMaterialContent(params) {
  return request(`${prefix}/resources/${params}/content`);
}

export async function create(params) {
  return request(`${prefix}/materials`, {
    method: 'POST',
    data: params,
  });
}

export async function edit(params) {
  return request(`${prefix}/materials/${params.id}`, {
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
export async function deleteMaterial(params) {
  return request(`${prefix}/materials/${params}`, {
    method: 'DELETE',
    data: params,
  });
}

// 批量删除
export async function deleteMaterials(params) {
  return request(`${prefix}/materials`, {
    method: 'PUT',
    data: params,
  });
}

// 批量修订
export async function materialsRevise(params) {
  return request(`${prefix}/resources/revise`, {
    method: 'PUT',
    data: params,
  });
}

export async function getTreeNode(params) {
  return request(`${prefix}/resources/tree/${params}`);
}

// 导出
export async function exportMaterial(params) {
  return request(`${prefix}/materials/export?${stringify(params)}`);
}

// 列表
export async function listDictEntries(params) {
  return request(`/admin/dict-entries?${stringify(params)}`);
}

// 导入材料件
export async function importMaterials(params) {
  return request(`${prefix}/materials/import`, {
    method: 'POST',
    data: params,
  });
}

import { stringify } from 'qs';
import { request } from '@cpdm/util';

const prefix = '/change';

/**
 * 更改单统计
 */

// 更改单列表
export async function list(params) {
  return request(`${prefix}/change-statistics-list?${stringify(params)}`);
}

// 更改单列表图表
export async function listView(params) {
  return request(`${prefix}/change-statistics-list/view?${stringify(params)}`);
}

// 更改统计报表
export async function report(params) {
  return request(`${prefix}/change-statistics-report?${stringify(params)}`);
}

// 导出统计报表
export async function exportReport(params) {
  return request(`${prefix}/export-statistics-report?${stringify(params)}`);
}

// 更改统计概览
export async function getOverview(params) {
  return request(
    `${prefix}/change-statistics-overview${stringify(params, { addQueryPrefix: true })}`
  );
}

// 获取下拉选项
export async function getCommonData() {
  return request(`${prefix}/change-common-data`);
}

// 获取下拉选项
export async function getProductAndResponsibleData() {
  return request(`${prefix}/change-product-responsible-list`);
}

// BOMList
export async function BOMList() {
  return request(`${prefix}/bom-statistics-list`);
}

// BOMRoot
export async function BOMRoot(params) {
  return request(`${prefix}/bom-statistics/root?${stringify(params)}`);
}

// BOM下的结构集合
export async function BOMChildren(params) {
  return request(`${prefix}/bom-statistics/children?${stringify(params)}`);
}

// BOM节点的统计数据
export async function BOMData(params) {
  return request(`${prefix}/bom-statistics/data?${stringify(params)}`);
}

// BOM节点下的统计数据集合
export async function BOMDataChildren(params) {
  return request(`${prefix}/bom-statistics/data-children?${stringify(params)}`);
}

// BOM的数据结构
export async function BOMReports(params) {
  return request(`${prefix}/bom-statistics/data-children?${stringify(params)}`);
}

// 元器件统计详情-获取筛选条件枚举值
export async function getFilterEnumeration(params) {
  return request(`${prefix}/change-baseline-responsible-phase?${stringify(params)}`);
}

// 获取相关更改单
export async function getChangeRecords(params) {
  return request(`${prefix}/change-records/orders?${stringify(params)}`);
}

// 获取相关更改单
export async function BOMOrders(params) {
  return request(`${prefix}/bom-order-list?${stringify(params)}`);
}

// 本级
export async function getBasicLevelOrder(params) {
  console.log(1, params);
  return request(`${prefix}/bom-order-select?${stringify(params)}`);
}

// 下级
export async function getLowerLevelOrder(params) {
  return request(`${prefix}/bom-order-list?${stringify(params)}`);
}

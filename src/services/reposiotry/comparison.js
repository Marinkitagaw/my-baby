import { stringify } from 'qs';
import { request } from '@cpdm/util';

const prefix = '/repository';

// 获取比较型号
export async function getComparisonRepo(params) {
  return request(
    `${prefix}/products/model-series/common${stringify(params, { addQueryPrefix: true })}`
  );
}

// 获取
export async function getFiveTier({ primaryEndItemId }) {
  return request(`${prefix}/products/${primaryEndItemId}/five-tier`);
}

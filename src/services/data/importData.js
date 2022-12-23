import { stringify } from 'qs';
import { request } from '@cpdm/util';

const prefix = '/cpdm';

// 元器件清单记录
export async function componentList(params) {
  return request(`${prefix}/componet/upload-record${stringify(params, { addQueryPrefix: true })}`);
}

// 导入元器件清单
export async function importComponentList(param) {
  return request(`${prefix}/componet/upload${stringify(param, { addQueryPrefix: true })}`, {
    method: 'PUT',
  });
}

// 质量问题清单记录
export async function qualityList(params) {
  return request(
    `${prefix}/quality-problem/upload-record${stringify(params, { addQueryPrefix: true })}`
  );
}

// 导入质量问题清单
export async function importQualityList(param) {
  return request(`${prefix}/quality-problem/upload${stringify(param, { addQueryPrefix: true })}`, {
    method: 'PUT',
  });
}

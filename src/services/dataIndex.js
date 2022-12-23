import { stringify } from 'qs';
import { request } from '@cpdm/util';

const prefix = '/exchange';

// 索引管理

// 列表
export async function listDataIndexs(param) {
  return request(`${prefix}/data-index${stringify(param, { addQueryPrefix: true })}`);
}

// 初始化数据
export async function installData() {
  return request(`${prefix}/data-index/install`);
}

// 启动
export async function startIndex() {
  return request(`${prefix}/data-index/start`);
}

// 放开
export async function startDataType(param) {
  return request(`${prefix}/data-index-type${stringify(param, { addQueryPrefix: true })}`, {
    method: 'POST',
    data: param,
  });
}

// 关闭
export async function stopDataType(param) {
  return request(`${prefix}/data-index-type${stringify(param, { addQueryPrefix: true })}`, {
    method: 'DELETE',
  });
}

// 删除
export async function deleteDataIndexs(param) {
  return request(`${prefix}/data-index${stringify(param, { addQueryPrefix: true })}`, {
    method: 'DELETE',
  });
}

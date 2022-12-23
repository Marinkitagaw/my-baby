import { stringify } from 'qs';
import { request } from '@cpdm/util';

const prefix = '/forms';

export async function listSendRecords(params) {
  return request(`${prefix}/send-record${stringify(params, { addQueryPrefix: true })}`);
}
// 详情
export async function getSendRecord(params) {
  return request(`${prefix}/send-record/${params.sendRecordId}`, {
    method: 'GET',
  });
}

// 创建
export async function createSendRecord(params) {
  return request(`${prefix}/send-record`, {
    method: 'POST',
    data: params,
  });
}

// 编辑
export async function editSendRecord(params) {
  return request(`${prefix}/send-record/${params.sendRecordId}`, {
    method: 'PUT',
    data: params,
  });
}

// 删除
export async function deleteSendRecord(params) {
  return request(`${prefix}/send-record`, {
    method: 'PUT',
    data: params,
  });
}

// 文档列表（1.0）
export async function listDocuments(params) {
  return request(`/api/documents/owned?${stringify(params)}`);
}

// 文档关联的更改单和发送单
export async function listRalations(params) {
  return request(
    `${prefix}/send-record/${params.docId}/related-obj?objType=Document&relatedType=${params.type}`
  );
}
// 文档关联的增量的更改单和发送单
export async function listAddRalations(params) {
  return request(
    `${prefix}/send-record/related-obj-new?objId=${params.dataDocId}&objType=Document&relatedType=${params.type}&newDocId=${params.docId}`
  );
}

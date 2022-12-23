import { request } from '@cpdm/util';
import { stringify } from 'qs';

const prefix = '/package';

// 创建导入申请
export async function createApplyForms(params) {
  return request(`${prefix}/bom-packages/apply-forms`, {
    method: 'POST',
    data: params,
  });
}

// 删除
export async function deleteApplyForm({ applyId }) {
  return request(`${prefix}/bom-packages/apply-forms/${applyId}`, {
    method: 'DELETE',
  });
}

// 导入
export async function importApplyforms({ bomId }) {
  return request(`${prefix}/apply-forms/import/${bomId}`, {
    method: 'POST',
  });
}

// 获取详情
export async function getPackageInfo({ bomId, preview }) {
  return request(`${prefix}/bom-packages/${bomId}?preview=${preview}`);
}

// 获取树
export async function getPartTree(params) {
  return request(
    `${prefix}/bom-packages/${params.bomId}/node-tree${stringify(params, {
      addQueryPrefix: true,
    })}`
  );
}

// 获取部件详情
export async function getPartInfo({ bomId, partId, preview }) {
  return request(`${prefix}/bom-packages/${bomId}/parts/${partId}?preview=${preview}`);
}

// 获取文档详情
export async function getDocumentInfo({ bomId, documentId, preview }) {
  return request(`${prefix}/bom-packages/${bomId}/documents/${documentId}?preview=${preview}`);
}

// 获取元器件详情
export async function getComponentInfo({ bomId, componentId, preview }) {
  return request(`${prefix}/bom-packages/${bomId}/components/${componentId}?preview=${preview}`);
}

// 获取元器件详情
export async function getStandardInfo({ bomId, standardId, preview }) {
  return request(`${prefix}/bom-packages/${bomId}/standards/${standardId}?preview=${preview}`);
}

// 获取技术通知单详情
export async function getNoticeInfo({ bomId, noticeId, preview }) {
  return request(`${prefix}/bom-packages/${bomId}/technicals/${noticeId}?preview=${preview}`);
}

// 获取更改单详情
export async function getChangeInfo({ bomId, changeId, preview }) {
  return request(`${prefix}/bom-packages/${bomId}/changes/${changeId}?preview=${preview}`);
}

// 获取偏离单详情
export async function getDeviationInfo({ bomId, deviationId, preview }) {
  return request(`${prefix}/bom-packages/${bomId}/deviations/${deviationId}?preview=${preview}`);
}

// 获取软件部件详情
export async function getSoftwareInfo({ bomId, softwareId, preview }) {
  return request(`${prefix}/bom-packages/${bomId}/software-parts/${softwareId}?preview=${preview}`);
}

// 获取ZIP详情
export async function getZipInfo({ objectId }) {
  return request(`${prefix}/bom-packages/apply-package/${objectId}/info`);
}

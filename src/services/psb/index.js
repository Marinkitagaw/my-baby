import { stringify } from 'qs';
import { request } from '@cpdm/util';

export async function loadStructure({ partId, ...params }) {
  return request(`/cpdm/psb/${partId}/structure${stringify(params, { addQueryPrefix: true })}`);
}

export async function loadSubParts({ partId, ...params }) {
  return request(`/cpdm/psb/${partId}/sub-parts${stringify(params, { addQueryPrefix: true })}`);
}
export async function loadSubPart({ partId, ...params }) {
  return request(
    `/bom/function-parts/${partId}/sub-parts${stringify(params, { addQueryPrefix: true })}`
  );
}

export async function loadSubDrawings({ drawingId, ...params }) {
  return request(
    `/cpdm/drawings/${drawingId}/sub-drawings${stringify(params, { addQueryPrefix: true })}`
  );
}

export async function importComponent(params) {
  return request(`/psb/${params.partId}/importComponent`, {
    method: 'POST',
    data: params,
  });
}

export async function importStandard(params) {
  return request(`/psb/${params.partId}/importStandard`, {
    method: 'POST',
    data: params,
  });
}

export async function loadDrawings({ partId, ...params }) {
  return request(
    `/cpdm/psb/${partId}/drawings-described-by${stringify(params, { addQueryPrefix: true })}`
  );
}

export async function loadDescDocs({ partId, ...params }) {
  return request(
    `/cpdm/psb/${partId}/documents-described-by${stringify(params, { addQueryPrefix: true })}`
  );
}

export async function loadRefDocs({ partId, ...params }) {
  return request(
    `/cpdm/psb/${partId}/documents-reference${stringify(params, { addQueryPrefix: true })}`
  );
}

export async function addSubParts({ partId, links }) {
  return request(`/cpdm/psb/${partId}/sub-parts`, { method: 'POST', data: links });
}

import { request } from '@cpdm/util';

export async function getCostInfo(params) {
  return request('/cost/cost-lines/info', {
    params,
  });
}

export async function getCostItem(id) {
  return request(`/cost/cost-items/${id}`);
}

export async function getDictionaries(code) {
  return request(`/admin/dict-entries?code=${code}`);
}

export async function editCostItem(id, data) {
  return request(`/cost/cost-items?itemId=${id}`, {
    method: 'PUT',
    data,
  });
}

export async function statisticsPhase(params) {
  return request(`/cost/cost-statistics/phase`, {
    params,
  });
}

export async function getLineOverview(params) {
  return request(`/cost/cost-statistics/current-part`, {
    params,
  });
}

export async function getCostAssess(params) {
  return request(`/cost/cost-statistics/assess`, {
    params,
  });
}

export async function getCostAssessCompute(params) {
  return request(`/cost/cost-statistics/assess/num`, {
    params,
  });
}

export async function getHistoryInfo(lineId) {
  return request(`/cost/cost-lines/${lineId}/iterations`);
}

export async function uploadFile(data) {
  return request(`/cpdm/upload`, {
    method: 'POST',
    data,
  });
}

export async function onReview(data) {
  return request(`/cost/cost-lines/review`, {
    method: 'POST',
    data,
  });
}

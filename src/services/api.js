import { stringify } from 'qs';
import { request } from '@cpdm/util';
import func from '@/utils/Func';

export async function queryProjectNotice() {
  return request('/project/notice');
}

export async function queryActivities() {
  return request('/activities');
}

export async function queryRule(params) {
  return request(`/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params = {}) {
  return request(`/rule?${stringify(params.query)}`, {
    method: 'POST',
    data: {
      ...params.body,
      method: 'update',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/forms', {
    method: 'POST',
    data: params,
  });
}

export async function fakeChartData() {
  return request('/fake_chart_data');
}

export async function queryTags() {
  return request('/tags');
}

export async function queryBasicProfile(id) {
  return request(`/profile/basic?id=${id}`);
}

export async function queryAdvancedProfile() {
  return request('/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/fake_list?${stringify(params)}`);
}

export async function removeFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/fake_list?count=${count}`, {
    method: 'POST',
    data: {
      ...restParams,
      method: 'delete',
    },
  });
}

export async function addFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/fake_list?count=${count}`, {
    method: 'POST',
    data: {
      ...restParams,
      method: 'post',
    },
  });
}

export async function updateFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/fake_list?count=${count}`, {
    method: 'POST',
    data: {
      ...restParams,
      method: 'update',
    },
  });
}

export async function fakeAccountLogin(params) {
  return request('/login/account', {
    method: 'POST',
    data: params,
  });
}

export async function fakeRegister(params) {
  return request('/register', {
    method: 'POST',
    data: params,
  });
}

export async function queryNotices(params = {}) {
  return request(`/notices?${stringify(params)}`);
}

export async function getFakeCaptcha(mobile) {
  return request(`/captcha?mobile=${mobile}`);
}

export async function requestApi(path, params) {
  return request(path, {
    method: 'POST',
    body: func.toFormData(params),
  });
}

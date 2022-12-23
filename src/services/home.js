import { stringify } from 'qs';
import { request } from '@cpdm/util';

const prefix = '';
export async function listTodoTasks(params) {
  return request(`${prefix}/cpdm/home/tasks?${stringify(params)}`);
}

export async function processTodoTasks(params) {
  return request(`${prefix}/workflow/process-instances/monitor?${stringify(params)}`);
}

export async function exchangesTodoTasks() {
  return request(`${prefix}/cpdm/home/exchanges`);
}

export async function repositoriesTodoTasks() {
  return request(`${prefix}/cpdm/home/repositories`);
}

export async function checkoutsTodoTasks() {
  return request(`${prefix}/cpdm/home/checkouts`);
}

export async function externalLinksTodoTasks() {
  return request(`${prefix}/cpdm/home/external-links`);
}

export async function dataReleasedData() {
  return request(`${prefix}/cpdm/home/data-released`);
}

export async function userInfo() {
  return request(`${prefix}/user_info`);
}

import { request } from '@cpdm/util';
import { stringify } from 'qs';

const prefix = '/vs';

export async function allPublishJobs() {
  return request(`${prefix}/publish-jobs`);
}

export async function createPublishJobs(params) {
  return request(`${prefix}/publish-jobs${stringify(params, { addQueryPrefix: true })}`);
}

export async function downloadVsFile(jobId) {
  return request(`${prefix}/publish-jobs/${jobId}/download`);
}

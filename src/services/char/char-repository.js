import { request } from '@cpdm/util';
import { stringify } from 'qs';

const prefix = '/cpdm';

export async function getRepositorySeries() {
  return request(`${prefix}/repo-series`);
}

export async function listRepositories(params) {
  return request(`${prefix}/repositories${stringify(params, { addQueryPrefix: true })}`);
}

export async function getRepository(repositoryId) {
  return request(`${prefix}/repositories/${repositoryId}`);
}

export async function switchCharEnabled(params) {
  return request(`${prefix}/repositories/${params.id}/char?charEnabled=${params.charEnabled}`, {
    method: 'PUT',
  });
}

export async function listEndItems({ repositoryId, ...params }) {
  return request(
    `${prefix}/repositories/${repositoryId}/end-items${stringify(params, { addQueryPrefix: true })}`
  );
}

export async function setRepoTargetConfig({ repositoryId, targets }) {
  return request(`${prefix}/repositories/${repositoryId}/target-config`, {
    method: 'POST',
    data: targets,
  });
}

export async function getRepoTargetConfig({ repositoryId }) {
  return request(`${prefix}/repositories/${repositoryId}/target-config`);
}

export async function setNodeConfig({ repositoryId, endItemId, nodeIds }) {
  return request(
    `${prefix}/char-node-config${stringify({ repositoryId, endItemId }, { addQueryPrefix: true })}`,
    {
      method: 'POST',
      data: nodeIds,
    }
  );
}

export async function getNodeConfig({ repositoryId, endItemId, nodeId }) {
  return request(
    `${prefix}/char-node-config${stringify(
      { repositoryId, endItemId, nodeId },
      { addQueryPrefix: true }
    )}`
  );
}

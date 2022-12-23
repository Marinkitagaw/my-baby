import { request } from '@cpdm/util';

const prefix = '/page';

export async function getPages() {
  return request(`${prefix}/pages`);
}

export async function getPage(pageId) {
  return request(`${prefix}/pages/${pageId}`);
}

export async function savePage(page) {
  return request(`${prefix}/pages`, { method: 'POST', body: page });
}

export async function deletePage(pageId) {
  return request(`${prefix}/pages/${pageId}`, { method: 'DELETE' });
}

export async function savePageResource(pageResource) {
  return request(`${prefix}/page-resources`, { method: 'POST', body: pageResource });
}

export async function deletePageResource(pageResource) {
  return request(`${prefix}/page-resources/${pageResource.id}`, { method: 'DELETE' });
}

export async function listPageResources(pageId) {
  return request(`${prefix}/menu-items/${pageId}/page-resources`);
}

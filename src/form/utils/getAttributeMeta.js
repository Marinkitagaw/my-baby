import { request } from '@cpdm/util';

async function getAttributeMeta(url) {
  const res = await request(url);
  return Array.isArray(res) ? res : [];
}

export default getAttributeMeta;

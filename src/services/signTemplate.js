import { stringify } from 'qs';
import { request } from '@cpdm/util';

const prefix = '/admin';

// =============签名模板=============
// 列表
export async function getSignTemplates(params) {
  return request(`${prefix}/sign-templates${stringify(params, { addQueryPrefix: true })}`);
}

// 详情
export async function getSignTemplate(params) {
  return request(`${prefix}/sign-template/${params.id}`);
}
// 创建
export async function createSignTemplate(params) {
  return request(`${prefix}/sign-template`, {
    method: 'POST',
    data: params,
  });
}

export async function modifySignTemplate(params) {
  return request(`${prefix}/sign-template`, {
    method: 'PUT',
    data: params,
  });
}

export async function deleteSignTemplate(signTemplateId) {
  return request(`${prefix}/sign-template/${signTemplateId}`, {
    method: 'DELETE',
  });
}

// ==============页面==================

// 列表
export async function getSignTemplatePages(params) {
  return request(`${prefix}/sign-template/${params.signTemplateId}/pages`);
}

// 创建
export async function createSignTemplatePage(params) {
  return request(`${prefix}/sign-template/pages`, {
    method: 'POST',
    data: params,
  });
}
// 编辑
export async function modifySignTemplatePage(params) {
  return request(`${prefix}/sign-template/pages/${params.pageId}`, {
    method: 'PUT',
    data: params,
  });
}
// 删除
export async function deleteSignTemplatePage(params) {
  return request(`${prefix}/sign-template/pages/${params.pageId}`, {
    method: 'DELETE',
  });
}

// =========================签名配置============================

// 列表
export async function SignItemTemplatelist(params) {
  return request(`${prefix}/sign-template/${params.signTemplateId}/items`);
}
// 详情
export async function SignItemTemplateInfo(params) {
  return request(`${prefix}/sign-template/items/${params.signId}`);
}
// 新建
export async function SignItemTemplateCreate(params) {
  return request(`${prefix}/sign-template/item`, {
    method: 'POST',
    data: params,
  });
}
// 修改
export async function SignItemTemplateEdit(params) {
  return request(`${prefix}/sign-template/item/${params.signId}`, {
    method: 'PUT',
    data: params,
  });
}
// 删除
export async function SignItemTemplateDelete(params) {
  return request(`${prefix}/sign-template/item/${params.signId}`, {
    method: 'Delete',
  });
}

// ===============更改单签名文件预览=================

// 1.获取更改单关联的模板
export async function getSignTemplateOfChange(params) {
  return request(`${prefix}/sign-category${stringify(params, { addQueryPrefix: true })}`);
}

// 2.获取模板实例
export async function getSignTemplateOfExample(params) {
  return request(`${prefix}/sign-example-template${stringify(params, { addQueryPrefix: true })}`);
}

// 3.生成签名实例
export async function createSignTemplateExample(params) {
  return request(`${prefix}/sign-example-template`, {
    method: 'PUT',
    data: params,
  });
}

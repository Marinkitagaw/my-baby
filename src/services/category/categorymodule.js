// ！！！类型-----功能
import { stringify } from 'qs';
import { request } from '@cpdm/util';

const prefix = '/admin';

// ------------------------签名模板---------------------------------

// 获取类型关联的签名模板
export async function listSignTemOfCategory(params) {
  return request(`${prefix}/sign-category${stringify(params, { addQueryPrefix: true })}`);
}
// 创建类型关联的签名模板
export async function addSignTemOfCategory(params) {
  return request(`${prefix}/sign-category`, {
    method: 'POST',
    data: params,
  });
}
// 删除类型关联的签名模板
export async function deleteSignTemOfCategory(params) {
  return request(`${prefix}/sign-category/${params.signCategoryId}`, {
    method: 'DELETE',
    data: params,
  });
}
// 设置类型主模板
export async function setSignTemOfCategory(params) {
  // /sign-category/default-template
  return request(`${prefix}/sign-category/default-template`, {
    method: 'PUT',
    data: params,
  });
}

// -------------------------工作流----------------------
// 所有工作流模板列表
export async function listProcessDefinitions(params) {
  return request(`/workflow/process-definitions?${stringify(params)}`);
}
// 获取类型关联的工作流模板
export async function listWorkTemOfCategory(params) {
  return request(`${prefix}/categories/${params.categoryId}/workflowtemp`);
}
// 创建类型关联的工作流模板
export async function addWorkflowTemOfCategory(params) {
  return request(`${prefix}/categories/${params.categoryId}/workflowtemp/mount`, {
    method: 'POST',
    data: params,
  });
}
// 修改类型关联的工作流模板
export async function updateWorkflowTemOfCategory(params) {
  return request(
    `${prefix}/categories/${params.categoryId}/workflowtemp/${params.workflowRelationId}?workflowTempId=${params.workFlowTemplateId}`,
    { method: 'PUT' }
  );
}
// 删除类型关联的工作流模板
export async function deleteWorkflowTemOfCategory(params) {
  return request(
    `${prefix}/categories/${params.categoryId}/workflowtemp/${params.catWorkflowTempId}`,
    { method: 'DELETE' }
  );
}
export async function workflowTemOfCategoryInfo(params) {
  return request(
    `${prefix}/categories/${params.categoryId}/workflowtemp/${params.catWorkflowTempId}`,
    { method: 'GET' }
  );
}

// -------------------------生命周期----------------------
// 所有生命周期模板列表
export async function listLifecycleTemplates(param) {
  return request(`${prefix}/lifecycle-templates${stringify(param, { addQueryPrefix: true })}`);
}
// 获取类型关联的生命周期模板
export async function listLifecycleTemOfCategory(param) {
  // /categories/{categoryId}/lifecycletemp
  return request(`${prefix}/categories/${param}/lifecycletemp`);
}
// 创建类型关联的生命周期模板
export async function addLifecycleTemOfCategory(params) {
  console.log('params', params);
  // /categories/{categoryId}/lifecycletemp
  return request(
    `${prefix}/categories/${params.categoryId}/lifecycletemp?lifecycleTemplateId=${params.lifecycleTemplateId}`,
    { method: 'POST' }
  );
}

export async function editLifecycleTemOfCategory(params) {
  // /categories/{categoryId}/lifecycletemp/{categoryLifecycleTempId}
  return request(
    `${prefix}/categories/${params.categoryId}/lifecycletemp/${params.categoryLifecycleTempId}?lifecycleTemplateId=${params.lifecycleTemplateId}`,
    {
      method: 'PUT',
      data: params,
    }
  );
}
// 删除类型关联的生命周期模板
export async function deleteLifecycleTemOfCategory(params) {
  // /categories/{categoryId}/lifecycletemp/{categoryLifecycleTempId}
  return request(
    `${prefix}/categories/${params.categoryId}/lifecycletemp/${params.categoryLifecycleTempId}`,
    {
      method: 'DELETE',
      data: params,
    }
  );
}
// 生命周期模板详情
export async function getLifecycleTemplate(param) {
  return request(`${prefix}/lifecycle-templates/${param.lifecycleTemplateId}`);
}

// ------------------------编码规则---------------------------------
// 获取类型关联的编码规则
export async function listEncodesOfCategory(params) {
  return request(`${prefix}/categories/${params.categoryId}/code`);
}

// 创建类型关联的编码规则
export async function addEncodeOfCategory(params) {
  return request(`${prefix}/categories/${params.categoryId}/code?codeId=${params.codeId}`, {
    method: 'PUT',
  });
}
// 删除类型关联的编码规则
export async function deleteEncodeOfCategory(params) {
  return request(`${prefix}/categories/${params.categoryId}/code-remove`, {
    method: 'PUT',
  });
}

// ------------------------签审环节配置---------------------------------

// 签审环节配置列表
export async function listActivityConfigs(params) {
  return request(`${prefix}/categories/${params.categoryId}/activity/configs`);
}
// 创建类型的签审环节配置
export async function addActivityConfig(params) {
  return request(`${prefix}/categories/${params.categoryId}/activity/config`, {
    method: 'POST',
    data: params,
  });
}
// 签审环节配置详情
export async function activityConfigInfo(params) {
  return request(`${prefix}/categories/activity/configs/${params.activityConfigId}`, {
    method: 'GET',
  });
}
// 修改类型关联的工作流模板
export async function updateActivityConfig(params) {
  return request(`${prefix}/categories/activity/configs/${params.activityConfigId}`, {
    method: 'PUT',
    data: params,
  });
}

// 删除类型的签审环节配置
export async function deleteActivityConfig(params) {
  return request(`${prefix}/categories/activity/configs/${params.activityConfigId}`, {
    method: 'DELETE',
    data: params,
  });
}

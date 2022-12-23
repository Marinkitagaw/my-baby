import React from 'react';

export interface NavigationCriteria {
  configSpecType: string;
  baselineId: string;
  state: string;
  view: string;
  // 0只加载当前节点 1只加载子节点 2当前节点和子节点一起加载
  loadMode: number;
  // true 当前节点和子节点一起加载 false 只加载子节点
  withMe: boolean;
  workingIncluded: boolean;
  objectTypes: string[];
  categoryIdentifier: string;
  q: string;
}

export interface ProductStructureProps {
  root: string; // 根节点部件id
  criteria?: NavigationCriteria; // 过滤条件
  optionalTypes?: string[]; //可选节点类型
  readonly?: boolean;
}

export default class ProductStructureBrowser extends React.Component<ProductStructureProps, any> {}

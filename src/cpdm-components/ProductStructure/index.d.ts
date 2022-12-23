import React from 'react';
import { ColumnProps } from 'antd/lib/table/interface';

export interface NavigationCriteria {
  configSpecType: string;
  baselineId: string;
  state: string;
  view: string;
  // 0只加载当前节点 1只加载子节点 2当前节点和子节点一起加载
  loadMode: number;
  workingIncluded: boolean;
  objectTypes: string[];
  categoryIdentifier: string;
  q: string;
}

export interface ProductStructureNode {
  nodeId: string;
  nodeType: string;
  nodeDataType: string;
  nodeData: Object;
  relationshipType: string;
  relationshipData: Object;
  root: boolean;
  childrenLoaded: boolean;
  children?: ProductStructureNode[];
}

export interface ProductStructureProps<T> {
  width?: number | string;
  root: string;
  criteria: NavigationCriteria;
  onSelect: (node: ProductStructureNode, index: number) => void;
  extraColumns?: ColumnProps<T>[];
  showHeader?: boolean;
  height?: number;
  showSpliter?: boolean;
  fixed?: boolean;
  getMe?: (me: any) => {};
}

export default class ProductStructure<T> extends React.Component<ProductStructureProps<T>> {}

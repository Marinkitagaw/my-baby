import React, { Component } from 'react';
import { AgGridReact } from '@ag-grid-community/react';
import { connect } from 'umi';
import { AllModules } from '@ag-grid-enterprise/all-modules';
import '@/ag-grid-imports';

import { ItemPicker } from 'cpdm-ui-components';
import { stringify } from 'qs';
import { history, Link } from 'umi';
import {
  Icon,
  message,
  Card,
  Select,
  Radio,
  Checkbox,
  Button,
  Menu,
  Dropdown,
  Divider,
  Tooltip,
} from 'antd';

import {
  CloseSquareOutlined,
  CodeOutlined,
  ColumnHeightOutlined,
  DownOutlined,
  ExportOutlined,
  FileMarkdownOutlined,
  FileMarkdownTwoTone,
  ImportOutlined,
  PlusSquareFilled,
  PlusSquareOutlined,
  ProjectOutlined,
  ReconciliationTwoTone,
  RollbackOutlined,
  ScheduleTwoTone,
  SettingOutlined,
  SettingTwoTone,
  SnippetsOutlined,
  SnippetsTwoTone,
  SwitcherOutlined,
  SelectOutlined,
} from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Modal, SplitPane } from '@cpdm/components';
import moment from 'moment';
import { request, uuid } from '@cpdm/util';
import { AgGridLocaleText } from '@cpdm/components';
import func from '@/utils/Func';
import CheckoutIcon from '@/assets/status/IconCheckOut.gif';
import CheckinIcon from '@/assets/status/IconCheckIn.gif';
import RevisionIcon from '@/assets/status/IconRevision.gif';
import UndoCheckOut from '@/assets/status/IconUndoCheckOut.gif';
import { checkout, checkin } from '@/services/data/part';
import Info from './InfoPanel';

export async function loadStructureRequest(partId, criteria) {
  return request(`/cpdm/psb/${partId}/structure${stringify(criteria, { addQueryPrefix: true })}`);
}

async function addExistingParts(partId, links) {
  return request(`/cpdm/psb/${partId}/sub-parts`, { method: 'POST', data: links });
}

async function addExistingDrawings(partId, links) {
  return request(`/cpdm/psb/${partId}/drawings-described-by`, { method: 'POST', data: links });
}

async function addExistingDocuments(partId, links) {
  return request(`/cpdm/psb/${partId}/documents-described-by`, { method: 'POST', data: links });
}

async function listBaselines(partId, type) {
  return request(`/cpdm/parts/${partId}/baselines?type=${type}`);
}

async function listPartViews() {
  return request(`/cpdm/views`);
}

async function getDictEntries(params) {
  return request(`/admin/dict-entries?${stringify(params)}`);
}

// 移除节点
async function removeNode(params) {
  return request(`/cpdm/parts/${params.partId}/relationship/remove?${stringify(params)}`, {
    data: params.relationshipIds,
  });
}

const DEFAULT_CRITERIA = {
  configSpecType: 'latest',
  // objectTypes: ['PartDescribeDrawing', 'PartDescribeDocument'],
  objectTypes: [],
  baselineId: undefined,
  state: undefined,
  view: undefined,
  phaseMark: undefined,
  workingIncluded: false,
  excludeCategories: ['ElectronicComponent'],
};

const DEFAULT_OPTIONAL_TYPES = ['PartDescribeDocument', 'PartDescribeDrawing'];

const getRowIcon = ({ icon, nodeType }) => {
  if (icon) return <img alt="" src={icon} height={16} />;
  switch (nodeType) {
    case 'PartUsage':
      return <SettingTwoTone title="部件" style={{ fontSize: 16 }} />;
    case 'PartDescribeDrawing':
      return <FileMarkdownTwoTone twoToneColor="#f8ae2e" title="模型" style={{ fontSize: 16 }} />;
    case 'PartDescribeDocument':
      return <SnippetsTwoTone twoToneColor="#52c41a" title="文档" style={{ fontSize: 16 }} />;
    case 'PartRequirement':
      return <ReconciliationTwoTone twoToneColor="#eb2f96" title="需求" style={{ fontSize: 16 }} />;
    case 'PartCharDesign':
      return <ScheduleTwoTone twoToneColor="#5b2c7c" title="需求" style={{ fontSize: 16 }} />;
    default:
      return <SettingOutlined title="部件" style={{ fontSize: 16 }} />;
  }
};

const getIdentifier = nodeData => {
  const { code, name, version, viewName } = nodeData;
  const info = [code, name, version, viewName].filter(i => i);
  return info.join(', ');
};

const getStatus = nodeData => {
  if (nodeData.status.status === 'CHECKIN') return '';
  return (
    // <LockOutlined
    //   style={{ color: '#00502d', paddingLeft: 6 }}
    //   title={`已由${nodeData.lockerFullName}检出`}
    // />
    <img
      width="12"
      style={{ marginLeft: 4 }}
      title={`已由${nodeData.lockerFullName}检出`}
      src={CheckoutIcon}
      alt={`已由${nodeData.lockerFullName}检出`}
    />
  );
};

const getAmount = node => {
  if (!node) return '';
  const { relationshipType, relationshipData } = node;
  if (relationshipType === 'PartUsage')
    return `${Number.isNaN(Number(relationshipData.amount)) ? '-' : relationshipData.amount}${
      relationshipData.unit || ''
    }`;
  return '-';
};

class ProductStructureBrowser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [
        {
          field: 'nodeData.id',
          headerName: '',
          width: 40,
          cellRenderer: 'infoRender',
        },
        {
          field: 'nodeData.lifecycleStateDisplay',
          headerName: '状态',
          width: 64,
          cellRenderer: params => params.value,
        },
        {
          field: 'nodeData.endItem',
          headerName: '成品',
          width: 64,
          cellRenderer: params => (params.value ? '√' : ''),
        },
        {
          field: 'relationshipData.amount',
          headerName: '数量',
          width: 64,
          cellRenderer: params => getAmount(params.data),
        },
        {
          field: 'nodeData.secretLevelDisplay',
          headerName: '密级',
          width: 64,
        },
        {
          field: 'nodeData.phaseMarkDisplay',
          headerName: '研制阶段',
          width: 128,
        },
        {
          field: 'nodeData.repositoryName',
          headerName: '型号',
        },
        {
          field: 'nodeData.modelCode',
          headerName: '型号代号',
        },
        {
          field: 'nodeData.productCode',
          headerName: '产品代号',
        },
        {
          field: 'nodeData.productCategoryDisplay',
          headerName: '产品类型',
        },
        {
          field: 'nodeData.productTypeDisplay',
          headerName: '产品层次',
        },
        { field: 'nodeData.customAttributes.modelSpecification', headerName: '规格' },
        { field: 'nodeData.customAttributes.STANDARD', headerName: '采用标准' },
        { field: 'nodeData.customAttributes.GUONEISTATE', headerName: '国内外' },
        {
          field: 'nodeData.customAttributes.YUANMULUNEIWAI',
          headerName: '源目录内/外',
        },
        { field: 'nodeData.customAttributes.FENGZHUANGXINGSHI', headerName: '封装形式' },
        { field: 'nodeData.customAttributes.ProductionFactory', headerName: '生产厂家' },
        { field: 'nodeData.customAttributes.QUALITY_LEVEL', headerName: '质量等级' },
        {
          field: 'nodeData.modifyStamp',
          headerName: '修改日期',
          width: 160,
          cellRenderer: params => moment(params.value).format('YYYY-MM-DD hh:mm:ss'),
        },
      ],
      defaultColDef: {
        resizable: true,
        width: 128,
      },
      frameworkComponents: {
        infoRender: this.infoRender,
      },
      autoGroupColumnDef: {
        cellRendererParams: {
          innerRendererFramework: params => (
            <span title={getIdentifier(params.data.nodeData)}>
              {getRowIcon(params.data)}&nbsp;{getIdentifier(params.data.nodeData)}
              {getStatus(params.data.nodeData)}
            </span>
          ),
        },
        width: 400,
        headerName: '标识',
        // pinned: true,
        field: 'nodeData.name',
        lockPosition: true,
      },
      criteria: { ...DEFAULT_CRITERIA, ...props.criteria },
      baselines: [],
      views: [],
      // PhaseMark: [],
      // 是否展开所有
      expandedAll: false,
      expandedGroupIds: [],
    };
  }

  componentDidMount() {
    message.config({
      top: 200,
      duration: 2,
      maxCount: 3,
    });
    this.loadViews();
    this.loadBaselines();
    this.getDictEntries();
  }

  componentWillUnmount() {
    message.config({});
  }

  infoRender = params => {
    this.infoRender = this.infoRender.bind(this);
    const { data = {} } = params;
    const { nodeData = {} } = data;
    return (
      <Tooltip placement="topLeft" title="点击查看详细信息">
        <Link
          to={`${func.urlForInfo(nodeData.objectType, nodeData.id)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon type="info-circle" />
        </Link>
      </Tooltip>
    );
  };

  // 获取字典
  getDictEntries = async () => {
    // const res = await getDictEntries({ code: 'PhaseMark' });
    await getDictEntries({ code: 'PhaseMark' });
    // if (res && res.PhaseMark) this.setState({ PhaseMark: res.PhaseMark });
  };

  loadBaselines = async type => {
    const { root } = this.props;
    const res = await listBaselines(root, type || 'normal');
    if (res && Array.isArray(res)) this.setState({ baselines: res });
  };

  loadViews = async () => {
    const res = await listPartViews();
    if (res && Array.isArray(res)) this.setState({ views: res });
  };

  onGridReady = agGrid => {
    this.gridApi = agGrid.api;
    this.gridColumnApi = agGrid.columnApi;
    agGrid.api.setServerSideDatasource({
      getRows: async params => {
        const node = params.parentNode.data;
        const { root, getPart } = this.props;
        const partId = node ? node.nodeData.id : root;
        const { criteria } = this.state;
        const { objectTypes = ['PartUsage'] } = criteria;
        const { excludeCategories = [] } = criteria;
        const res = await loadStructureRequest(partId, {
          ...criteria,
          objectTypes: objectTypes.join(','),
          excludeCategories: excludeCategories.join(','),
          node: true,
          // 0只加载当前节点 1只加载子节点 2当前节点和子节点一起加载
          loadMode: node ? 1 : 0,
        });
        if (!node && res && res.length > 0) {
          const { nodeData = {} } = res[0];
          const { id } = nodeData;
          if (root !== id && getPart) {
            history.push(`/data/part/${id}`);
            getPart(id);
            message.warning('所选基线不含当前版本部件，已跳转至指定部件');
          }
        }

        await params.successCallback(
          res.map(item => ({
            ...item,
            parentNode: node,
            parentId: node ? node.nodeData.id : root,
          })),
          res.length,
        );
        const { expandedAll } = this.state;
        if (expandedAll) {
          await agGrid.api.forEachNode(rowNode => {
            rowNode.setExpanded(true);
          });
        }
      },
    });
    if (agGrid.api.getDisplayedRowAtIndex(0)) {
      agGrid.api.getDisplayedRowAtIndex(0).setExpanded(true);
    }
  };

  onRowClicked = e => {
    this.gridApi.deselectAll();
    e.node.setSelected(true);
    this.setState({ selectedNode: e.node });
    this.showDetail(e.node.data);
    this.setState({ parentData: e.node.parent.data });
  };

  onRowExpand = () => {
    const { selectedNode } = this.state;
    // console.log('selectedNode', selectedNode)
    // this.gridApi.forEachNode(node => {
    //   console.log(node)
    // });
    selectedNode.setExpanded(true);
  };

  panelChange = (type, newKeys) => {
    switch (type) {
      case 'insert':
        this.refreshNodes('insert', newKeys);
        break;
      default:
        this.refreshNodes('remove');
        break;
    }
  };

  showDataPicker = type => {
    const selectedNodeRows = this.gridApi.getSelectedRows();
    const [currentNode] = this.gridApi.getSelectedRows();
    if (selectedNodeRows.length > 1) {
      message.warning('只能选择一条数据插入。');
      return false;
    }
    if (currentNode) this.setState({ dataPickerVisible: true, defaultType: type, uuidKey: uuid() });
    else message.error('请选择产品结构节点以确定插入位置');
    return false;
  };

  closeDataPicker = async () => {
    this.setState({ dataPickerVisible: false });
  };

  expandedSelected = (node, newKeys) => {
    this.gridApi.forEachNode(n => {
      if (n.id.indexOf(newKeys) !== -1) {
        n.setExpanded(true);
        n.setSelected(true);
      }
    });
  };

  refreshNodes = async (type, newKeys) => {
    const { parentData, selectedNode } = this.state;
    console.log(type, newKeys, selectedNode);
    const [node] = this.gridApi.getSelectedNodes();
    if (!node) return;
    const route = this.getRoute(node);
    const parentRoute = route.filter((item, index) => index !== route.length - 1);
    setTimeout(() => {
      this.gridApi.purgeServerSideCache(parentRoute);
      if (parentData) {
        this.gridApi.forEachNode(n => {
          if (n && n.data && n.data.nodeId === parentData.nodeId) {
            n.setExpanded(true);
          }
        });
        this.expandedSelected('n', newKeys);
      }
    }, 200);
    if (!parentData) {
      this.gridApi.purgeServerSideCache();
    }
    this.setState({ refreshKey: Math.random() });
  };

  getRoute = node => {
    let start = [];
    if (node.parent) start = this.getRoute(node.parent);
    if (node.key) return [...start, node.key];
    return start;
  };

  pickupData = async data => {
    const { defaultType } = this.state;
    const [currentNode] = this.gridApi.getSelectedRows();
    switch (defaultType) {
      case 'Part':
        (async () => {
          const res = await addExistingParts(
            currentNode.nodeData.id,
            data.map(d => ({
              usedByPartId: currentNode.nodeData.id,
              usesPartMasterId: d.masterId,
              unit: currentNode.nodeData.defaultUnit,
              amount: 1,
            })),
          );
          if (!res.error) {
            this.closeDataPicker();
            this.refreshNodes();
          }
        })();
        break;
      case 'Drawing':
        (async () => {
          const res = await addExistingDrawings(
            currentNode.nodeData.id,
            data.map(d => ({ partId: currentNode.nodeData.id, drawingId: d.id })),
          );
          if (!res.error) {
            this.closeDataPicker();
            this.refreshNodes();
          }
        })();
        break;
      case 'Document':
        (async () => {
          const res = await addExistingDocuments(
            currentNode.nodeData.id,
            data.map(d => ({ partId: currentNode.nodeData.id, documentBranchId: d.revisionId })),
          );
          if (!res.error) {
            this.closeDataPicker();
            this.refreshNodes();
          }
        })();
        break;
      default:
    }
  };

  changeSpecType = e => {
    const { criteria, tempCriteria = criteria } = this.state;
    if (e.target.value === 'phaseBaseline') {
      this.loadBaselines('phaseMark');
    }
    if (e.target.value === 'baseline') {
      this.loadBaselines();
    }
    this.setState({
      tempCriteria: {
        ...tempCriteria,
        configSpecType: e.target.value,
        baselineId: undefined,
        view: undefined,
        state: undefined,
        phaseMark: undefined,
      },
    });
  };

  changePhaseMark = value => {
    const { criteria, tempCriteria = criteria } = this.state;
    this.setState({
      tempCriteria: { ...tempCriteria, phaseMark: value, baselineId: undefined },
    });
  };

  changeView = value => {
    const { criteria, tempCriteria = criteria } = this.state;
    this.setState({
      tempCriteria: { ...tempCriteria, view: value, baselineId: undefined },
    });
  };

  changeLifecycleState = value => {
    const { criteria, tempCriteria = criteria } = this.state;
    this.setState({
      tempCriteria: { ...tempCriteria, state: value, baselineId: undefined },
    });
  };

  changeBaseline = val => {
    const { criteria, tempCriteria = criteria } = this.state;
    this.setState({
      tempCriteria: { ...tempCriteria, baselineId: val, view: undefined, state: undefined },
    });
  };

  changeDataTypes = values => {
    const { criteria, tempCriteria = criteria } = this.state;
    this.setState({ tempCriteria: { ...tempCriteria, objectTypes: values } });
  };

  reload = () => {
    const { tempCriteria } = this.state;
    this.setState({ criteria: { ...tempCriteria }, tempCriteria: undefined });
    this.gridApi.purgeServerSideCache();
    if (this.gridApi.getDisplayedRowAtIndex(0)) {
      this.gridApi.getDisplayedRowAtIndex(0).setExpanded(true);
    }
  };

  reset = () => {
    this.setState({ tempCriteria: undefined });
  };

  showDetail = node => {
    if (node) {
      this.setState({ type: node.nodeDataType, id: node.nodeData.id, selected: node.nodeData });
    }
  };

  // 展开收起
  setExpanded = expanded => {
    this.setState({ expandedAll: expanded });
    this.gridApi.forEachNode(node => {
      node.setExpanded(expanded);
    });
  };

  // 移除
  handleRemoveNode = () => {
    const { root } = this.props;
    const selectedNodeRows = this.gridApi.getSelectedRows();
    const selectedNodes = selectedNodeRows.map(item => item.id || item.nodeData.id);
    if (!selectedNodeRows) {
      message.warning('请至少选择一条数据。');
    } else if (selectedNodes.includes(root)) {
      message.warning('顶层节点不能被移除。');
    } else {
      Modal.confirm({
        title: '确定要移除选中数据吗?',
        onOk: () => {
          this.removeSelectedNode(
            selectedNodeRows.map(item => item.relationshipData && item.relationshipData.id),
          );
        },
        okText: '确定',
        cancelText: '取消',
      });
    }
    return false;
  };

  removeSelectedNode = async data => {
    const { root } = this.props;
    const res = await removeNode({ partId: root, relationshipIds: data });
    // const selectedRowData = this.gridApi.getSelectedRows();
    if (!res.error) {
      message.success('移除成功');
      this.refreshNodes('remove');
      // this.gridApi.updateRowData({remove: selectedRowData});
      // this.gridApi.purgeServerSideCache()
    }
  };

  // 修改过滤条件
  changeExcludeCategories = (value, type) => {
    const { criteria, tempCriteria = criteria } = this.state;
    let categories = JSON.parse(JSON.stringify(tempCriteria.excludeCategories)) || [];
    if (value) {
      // 存在时清除查询条件
      categories = categories.filter(item => item !== type);
      this.setState({ tempCriteria: { ...tempCriteria, excludeCategories: categories } });
    } else if (!categories.includes(type)) {
      // 查询条件不存在时添加当前类型
      categories.push(type);
      this.setState({ tempCriteria: { ...tempCriteria, excludeCategories: categories } });
    }
  };

  getMenu = () => {
    const { readonly, optionalTypes = DEFAULT_OPTIONAL_TYPES } = this.props;
    const { selected } = this.state;
    return (
      <div style={{ paddingBottom: 12 }}>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item onClick={() => this.setExpanded(true)}>
                <ColumnHeightOutlined />
                &nbsp;展开全部级别
              </Menu.Item>
              <Menu.Item onClick={() => this.setExpanded(false)}>
                <RollbackOutlined />
                &nbsp;全部收起
              </Menu.Item>
            </Menu>
          }
        >
          <a style={{ color: '#000', marginRight: 16 }}>
            <ProjectOutlined rotate={-90} style={{ marginTop: 4 }} />
            &nbsp;显示&nbsp;
            <DownOutlined />
          </a>
        </Dropdown>
        {!readonly && (
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item disabled>
                  <ExportOutlined />
                  &nbsp;检出
                </Menu.Item>
                <Menu.Item disabled>
                  <ImportOutlined />
                  &nbsp;检入
                </Menu.Item>
                <Menu.Item disabled>
                  <ImportOutlined />
                  &nbsp;撤销检出
                </Menu.Item>
                <Menu.Item disabled>
                  <SwitcherOutlined />
                  &nbsp;修订
                </Menu.Item>
                <Menu.Divider />
                <Menu.SubMenu
                  title={
                    <span>
                      <PlusSquareFilled />
                      &nbsp;插入现有的&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                  }
                >
                  <Menu.Item
                    onClick={() => {
                      this.showDataPicker('Part');
                    }}
                  >
                    <SettingOutlined />
                    &nbsp;部件
                  </Menu.Item>
                  {optionalTypes.includes('PartDescribeDrawing') && (
                    <Menu.Item
                      onClick={() => {
                        this.showDataPicker('Drawing');
                      }}
                    >
                      <FileMarkdownOutlined />
                      &nbsp;模型
                    </Menu.Item>
                  )}
                  {optionalTypes.includes('PartDescribeDocument') && (
                    <Menu.Item
                      onClick={() => {
                        this.showDataPicker('Document');
                      }}
                    >
                      <SnippetsOutlined />
                      &nbsp;文档
                    </Menu.Item>
                  )}
                  {optionalTypes.includes('PartRequirement') && (
                    <Menu.Item
                      onClick={() => {
                        this.showDataPicker('Requirement');
                      }}
                    >
                      <SnippetsOutlined />
                      &nbsp;需求
                    </Menu.Item>
                  )}
                  {optionalTypes.includes('PartCharDesign') && (
                    <Menu.Item
                      onClick={() => {
                        this.showDataPicker('CharDesign');
                      }}
                    >
                      <SnippetsOutlined />
                      &nbsp;六性设计
                    </Menu.Item>
                  )}
                </Menu.SubMenu>
                <Menu.SubMenu
                  title={
                    <span>
                      <PlusSquareOutlined />
                      &nbsp;插入新建的&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                  }
                  disabled
                >
                  <Menu.Item>
                    <SettingOutlined />
                    &nbsp;部件
                  </Menu.Item>
                  <Menu.Item>
                    <FileMarkdownOutlined />
                    &nbsp;模型
                  </Menu.Item>
                  <Menu.Item>
                    <SnippetsOutlined />
                    &nbsp;文档
                  </Menu.Item>
                </Menu.SubMenu>
                <Menu.Divider />
                <Menu.Item onClick={this.handleRemoveNode}>
                  <CloseSquareOutlined />
                  &nbsp;移除
                </Menu.Item>
              </Menu>
            }
          >
            <a style={{ color: '#000', marginRight: 16 }}>
              <CodeOutlined style={{ marginTop: 4 }} />
              &nbsp;编辑&nbsp;
              <DownOutlined />
            </a>
          </Dropdown>
        )}
        {!readonly && (
          <Dropdown
            overlay={
              <Menu onClick={this.handleAction}>
                <Menu.Item
                  disabled={
                    (selected && selected.status && selected.status.status === 'PWC') || !selected
                  }
                  key="CheckOut"
                >
                  <img alt="检出" src={CheckoutIcon} width="12" />
                  &nbsp;&nbsp; 检出
                </Menu.Item>
                <Menu.Item
                  disabled={
                    (selected && selected.status && selected.status.status === 'CHECKIN') ||
                    !selected
                  }
                  key="CheckIn"
                >
                  <img alt="检入" src={CheckinIcon} width="12" />
                  &nbsp;&nbsp; 检入
                </Menu.Item>
                <Menu.Item disabled key="Revise">
                  <img alt="修订" src={RevisionIcon} width="12" />
                  &nbsp;&nbsp; 修订
                </Menu.Item>
                <Menu.Item disabled key="RevokeCheckOut">
                  <img alt="撤销检出" src={UndoCheckOut} width="12" />
                  &nbsp;&nbsp; 撤销检出
                </Menu.Item>
              </Menu>
            }
          >
            <a style={{ color: '#000', marginRight: 16 }} onClick={e => e.preventDefault()}>
              <SelectOutlined />
              &nbsp;检出 / 检入&nbsp;
              <DownOutlined />
            </a>
          </Dropdown>
        )}
      </div>
    );
  };

  getToolbar = () => {
    const { optionalTypes = DEFAULT_OPTIONAL_TYPES } = this.props;
    const { criteria, tempCriteria, views, baselines } = this.state;
    const c = tempCriteria || criteria;
    return (
      <Form layout="inline">
        <Divider style={{ margin: 1 }} />
        <Form.Item label="配置规范" style={{ marginRight: 24 }}>
          <Radio.Group size="small" value={c.configSpecType} onChange={this.changeSpecType}>
            <Radio.Button value="latest">最新</Radio.Button>
            <Radio.Button value="baseline">基线</Radio.Button>
            <Radio.Button value="phaseBaseline">阶段</Radio.Button>
          </Radio.Group>
        </Form.Item>
        {c.configSpecType === 'latest' && (
          <React.Fragment>
            {/* <Form.Item label="阶段" style={{ marginRight: 24 }}>
              <Select
                size="small"
                value={c.phaseMark}
                placeholder="选择阶段"
                style={{ width: 200 }}
                onChange={this.changePhaseMark}
              >
                {PhaseMark.map(v => (
                  <Select.Option key={v.name} value={v.value}>
                    {v.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item> */}
            <Form.Item label="视图" style={{ marginRight: 24 }}>
              <Select
                size="small"
                value={c.view}
                placeholder="选择视图"
                style={{ width: 200 }}
                onChange={this.changeView}
              >
                <Select.Option value={undefined}>不指定</Select.Option>
                {views.map(v => (
                  <Select.Option key={v.name} value={v.id}>
                    {v.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="状态" style={{ marginRight: 24 }}>
              <Select
                size="small"
                value={c.state}
                placeholder="选择状态"
                style={{ width: 200 }}
                onChange={this.changeLifecycleState}
              >
                <Select.Option value={undefined}>不指定</Select.Option>
                <Select.Option value="INWORK">正在工作</Select.Option>
                <Select.Option value="RELEASED">已发布</Select.Option>
              </Select>
            </Form.Item>
          </React.Fragment>
        )}
        {c.configSpecType !== 'latest' && (
          <Form.Item key={c.configSpecType} label="基线" style={{ marginRight: 24 }}>
            <Select
              size="small"
              value={c.baselineId}
              placeholder="选择基线"
              style={{ width: 200 }}
              onChange={this.changeBaseline}
            >
              {baselines.map(b => (
                <Select.Option key={b.id} value={b.id}>
                  {b.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        )}

        <Form.Item label="数据类型" style={{ marginRight: 24 }}>
          <Checkbox.Group value={c.objectTypes} onChange={this.changeDataTypes}>
            <Checkbox value="PartUsage" disabled checked>
              部件
            </Checkbox>
            {optionalTypes.includes('PartDescribeDocument') && (
              <Checkbox value="PartDescribeDocument">文档</Checkbox>
            )}
            {optionalTypes.includes('PartDescribeDrawing') && (
              <Checkbox value="PartDescribeDrawing">模型</Checkbox>
            )}
            {optionalTypes.includes('PartRequirement') && (
              <Checkbox value="PartRequirement">需求</Checkbox>
            )}
            {optionalTypes.includes('PartCharDesign') && (
              <Checkbox value="PartCharDesign">六性</Checkbox>
            )}
          </Checkbox.Group>
          <Checkbox
            value="ElectronicComponent"
            checked={!(c.excludeCategories || []).includes('ElectronicComponent')}
            onChange={e => this.changeExcludeCategories(e.target.checked, 'ElectronicComponent')}
          >
            元器件
          </Checkbox>
        </Form.Item>
        {!!tempCriteria && (
          <Form.Item>
            <Button type="primary" size="small" onClick={this.reload} style={{ marginRight: 12 }}>
              应用
            </Button>
            <Button size="small" onClick={this.reset} style={{ marginRight: 12 }}>
              取消
            </Button>
          </Form.Item>
        )}
      </Form>
    );
  };

  // handleAction = e => {
  //   const { handleAction } = this.props;
  //   const { selected } = this.state;
  //   console.log('selected', selected);
  //   if (handleAction) {
  //     handleAction(e, '', selected.id, this.refreshNodes);
  //   }
  // };

  handleAction = action => {
    const selectedNodeRows = this.gridApi.getSelectedRows();
    if (!selectedNodeRows) {
      message.warning('请至少选择一条数据。');
    } else {
      const { key } = action;
      const { selected } = this.state;
      const pId = selected.id;
      switch (key) {
        case 'CheckIn':
          this.handleCheckinPart(pId);
          break;
        case 'CheckOut':
          this.handleCheckoutPart(pId);
          break;
        default:
          break;
      }
    }
  };

  handleCheckoutPart = async pId => {
    const { expandedGroupIds } = this.state;
    const res = await checkout({ id: pId });
    if (res && res.id) {
      message.success('检出成功。');
      this.refreshNodes('CheckOut', res.id);
      this.setState({
        expandedGroupIds: expandedGroupIds.concat(res.id),
        refreshKey: Math.random(),
      });
    } else {
      message.error('检出失败。');
    }
  };

  handleCheckinPart = async pId => {
    const { expandedGroupIds } = this.state;
    const res = await checkin({ id: pId });
    if (res && res.id) {
      message.success('检入成功。');
      this.refreshNodes('CheckIn', res.id);
      this.setState({ expandedGroupIds: expandedGroupIds.concat(res.id) });
    } else {
      message.error('检入失败。');
    }
  };

  render() {
    const {
      columnDefs,
      defaultColDef,
      autoGroupColumnDef,
      uuidKey,
      defaultType,
      dataPickerVisible,
      frameworkComponents,
      selected = {},
    } = this.state;
    const { id, type, expandedGroupIds, refreshKey } = this.state;

    const { root, dispatch } = this.props;

    const infoProps = {
      id,
      type,
      data: selected,
      dispatch,
    };

    return (
      <Card bodyStyle={{ paddingTop: 12 }}>
        {this.getMenu()}
        {this.getToolbar()}
        <SplitPane width={480}>
          <div id="myGrid" style={{ height: '100%', width: '100%' }} className="ag-theme-balham">
            <AgGridReact
              treeData
              animateRows
              rowModelType="serverSide"
              allowContextMenuWithControlKey
              modules={AllModules}
              columnDefs={columnDefs}
              rowHeight={36}
              headerHeight={36}
              defaultColDef={defaultColDef}
              autoGroupColumnDef={autoGroupColumnDef}
              isServerSideGroup={item => item.expandable}
              getServerSideGroupKey={item => item.nodeId}
              onGridReady={this.onGridReady}
              onRowClicked={this.onRowClicked}
              localeText={AgGridLocaleText}
              rowSelection="multiple"
              getRowNodeId={item => item.nodeId}
              frameworkComponents={frameworkComponents}
              onRowGroupOpened={params => {
                const { data = {} } = params;
                const { nodeId } = data;
                if (!params.data) {
                  expandedGroupIds.push(root);
                  this.setState({
                    expandedGroupIds,
                  });
                } else if (params.node.expanded) {
                  expandedGroupIds.push(nodeId);
                  this.setState({
                    expandedGroupIds,
                  });
                } else {
                  this.setState({
                    expandedGroupIds: expandedGroupIds.filter(grpId => !grpId.startsWith(nodeId)),
                  });
                }
              }}
            />
          </div>
          <Info {...infoProps} key={refreshKey || id} onChange={this.panelChange} />
        </SplitPane>
        <ItemPicker
          key={uuidKey}
          defaultType={defaultType}
          types={[defaultType]}
          visible={dataPickerVisible}
          multi
          onOk={this.pickupData}
          onCancel={this.closeDataPicker}
          host={process.env.API_BASE_PATH}
        />
      </Card>
    );
  }
}

export default connect(({ part, loading }) => ({
  part: part.part,
  loading:
    loading.effects['part/getPart'] ||
    loading.effects['part/checkout'] ||
    loading.effects['part/checkin'] ||
    loading.effects['part/revokeCheckout'],
}))(ProductStructureBrowser);

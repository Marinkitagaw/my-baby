import React, { Component } from 'react';
import { AgGridReact } from '@ag-grid-community/react';
import { AllModules } from '@ag-grid-enterprise/all-modules';
import '@/ag-grid-imports';

import { ItemPicker } from 'cpdm-ui-components';
import { stringify } from 'qs';

import {
  CloseSquareOutlined,
  CodeOutlined,
  ColumnHeightOutlined,
  DownOutlined,
  ExportOutlined,
  FileMarkdownOutlined,
  ImportOutlined,
  LockOutlined,
  PlusSquareFilled,
  PlusSquareOutlined,
  ProjectOutlined,
  RollbackOutlined,
  SettingOutlined,
  SnippetsOutlined,
  SwitcherOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';

import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Modal } from '@cpdm/components';
import {
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
import moment from 'moment';
import { Link } from 'umi';
import { request, uuid } from '@cpdm/util';
import { AgGridLocaleText } from '@cpdm/components';
import Icon from '@/cpdm-components/Icon';

import DetailPanel from './DetailPanel';
import ChangeRecordsDrawer from './ChangeRecordsDrawer';

export async function loadUsage(dataType, partId) {
  return request(`/bom/${dataType.toLowerCase()}-parts/${partId}/parent-parts`);
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

// ?????????????????????
async function getChangeRecords(params) {
  return request(`/change/change-records/orders?${stringify(params)}`);
}

// ????????????
async function removeNode(params) {
  return request(`/cpdm/parts/${params.partId}/relationship/remove?${stringify(params)}`, {
    method: 'DELETE',
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

const getRowIcon = ({ icon, objectType }) => {
  if (icon) return <img alt="" src={icon} height={16} />;
  const type = objectType && objectType.toLowerCase();
  let objectIcon = <Icon style={{ width: 16 }} title="??????" name="type/document.svg" />;
  if (type.includes('part')) {
    objectIcon = <Icon style={{ width: 16 }} title="??????" name="type/part.svg" />;
  }
  if (type.includes('document')) {
    objectIcon = <Icon style={{ width: 16 }} title="??????" name="type/document.svg" />;
  }
  if (type.includes('cad')) {
    objectIcon = <Icon style={{ width: 16 }} title="??????" name="type/drawing.svg" />;
  }
  return objectIcon;
};

const getIdentifier = nodeData => {
  const { code, name, version, viewName } = nodeData;
  const info = [code, name, version, viewName].filter(i => i);
  return info.join(', ');
};

const getStatus = nodeData => {
  if (nodeData.status.status === 'CHECKIN') return '';
  return (
    <LockOutlined
      style={{ color: '#00502d', paddingLeft: 6 }}
      title={`??????${nodeData.lockerFullName}??????`}
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
          field: 'nodeData.lifecycleStateName',
          headerName: '??????',
          width: 64,
          cellRenderer: params => params.value,
        },
        {
          field: 'nodeData.endItem',
          headerName: '??????',
          width: 64,
          cellRenderer: params => (params.value ? '???' : ''),
        },
        {
          field: 'relationshipData.amount',
          headerName: '??????',
          width: 64,
          cellRenderer: params => getAmount(params.data),
        },
        {
          field: 'nodeData.secretLevel',
          headerName: '??????',
          width: 64,
        },
        {
          field: 'nodeData.phaseMark',
          headerName: '????????????',
          width: 128,
        },
        {
          field: 'nodeData.repositoryName',
          headerName: '??????',
          cellRenderer: params => params.data.repository.name,
        },
        {
          field: 'nodeData.modelCode',
          headerName: '????????????',
          cellRenderer: params => params.data.repository.modelCode,
        },
        {
          field: 'nodeData.productCode',
          headerName: '????????????',
        },
        {
          field: 'nodeData.productCategory',
          headerName: '????????????',
        },
        {
          field: 'nodeData.productType',
          headerName: '????????????',
        },
        { field: 'nodeData.purpose', headerName: '??????' },
        {
          field: 'nodeData.modifyStamp',
          headerName: '????????????',
          width: 160,
          cellRenderer: params => moment(params.value).format('YYYY-MM-DD hh:mm:ss'),
        },
      ],
      defaultColDef: {
        resizable: true,
        width: 128,
      },
      autoGroupColumnDef: {
        cellRendererParams: {
          innerRendererFramework: params => (
            <span
              title={getIdentifier(params.data.nodeData)}
              onClick={() => this.showChangeOrder(params.data.nodeData)}
            >
              {getRowIcon(params.data)}&nbsp;{getIdentifier(params.data.nodeData)}
              {getStatus(params.data.nodeData)}
            </span>
          ),
        },
        width: 400,
        headerName: '??????',
        // pinned: true,
        field: 'nodeData.name',
        lockPosition: true,
      },
      criteria: { ...DEFAULT_CRITERIA, ...props.criteria },
      baselines: [],
      views: [],
      // PhaseMark: [],
      // ??????????????????
      expandedAll: false,
      // ?????????????????????
      changeRecordsDrawer: false,
      changeRecords: [],
      expandedGroupIds: [],
      frameworkComponents: {
        infoRender: this.infoRender,
      },
    };
  }

  componentDidMount() {
    message.config({
      top: 200,
      duration: 2,
      maxCount: 3,
    });
    // this.loadViews();
    // this.loadBaselines();
    // this.getDictEntries();
  }

  componentWillUnmount() {
    message.config({});
  }

  infoRender = params => {
    const { path } = this.props;
    this.infoRender = this.infoRender.bind(this);
    const { data = {} } = params;
    const { nodeData = {} } = data;
    const tabPath =
      nodeData.infoUrl ||
      (path && `${path.replace(/:id/, nodeData.id)}?objectType=${nodeData.objectType}`);
    return (
      <Tooltip placement="topLeft" title="????????????????????????">
        <Link to={`${tabPath}`} target="newInfo" rel="noopener noreferrer">
          <InfoCircleOutlined />
        </Link>
      </Tooltip>
    );
  };

  // ?????????????????????
  showChangeOrder = async nodeData => {
    const { showChangeOrder } = this.props;
    if (showChangeOrder) {
      const res = await getChangeRecords({
        objectId: nodeData.id,
        // objectId: '389289158407860224',
        objectType: nodeData.objectType,
        type: 1,
      });
      if (res && Array.isArray(res))
        this.setState({ changeRecordsDrawer: true, changeRecords: res });
    }
  };

  // ????????????
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
        const { root, dataType, requestUrl, waitingReq } = this.props;
        const partId = node ? node.nodeData.id : root;
        const { criteria } = this.state;
        const { objectTypes = ['PartUsage'] } = criteria;
        const { excludeCategories = [] } = criteria;
        let res;
        const query = {
          ...criteria,
          objectTypes: objectTypes.join(','),
          excludeCategories: excludeCategories.join(','),
          node: true,
          // 0????????????????????? 1?????????????????? 2????????????????????????????????????
          loadMode: node ? 1 : 0,
        };
        if (waitingReq) {
          params.successCallback([], 0);
          return;
        }
        const response = requestUrl
          ? await requestUrl(partId, { ...query })
          : await loadUsage(dataType, partId, { ...query });
        if (Array.isArray(response) || (response && response.id)) {
          res = Array.isArray(response) ? response : [response];
          await params.successCallback(
            res.map(item => ({
              ...item,
              nodeData: {
                ...item,
                dataType,
              },
              nodeDataType: item.baseType,
              nodeId: item.id,
              parentNode: node,
              parentId: node ? node.nodeData.id : root,
              dataType,
            })),
            res.length,
          );
        } else {
          await params.successCallback([], 0);
        }
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
  };

  showDataPicker = type => {
    const selectedNodeRows = this.gridApi.getSelectedRows();
    const [currentNode] = this.gridApi.getSelectedRows();
    if (selectedNodeRows.length > 1) {
      message.warning('?????????????????????????????????');
      return false;
    }
    if (currentNode) this.setState({ dataPickerVisible: true, defaultType: type, uuidKey: uuid() });
    else message.error('????????????????????????????????????????????????');
    return false;
  };

  closeDataPicker = async () => {
    this.setState({ dataPickerVisible: false });
  };

  refreshNodes = async handleType => {
    const { root } = this.props;
    const [node] = this.gridApi.getSelectedNodes();
    if (!node) return;
    const route = this.getRoute(node);
    const parentRoute = route.filter((item, index) => index !== route.length - 1);
    const superiorParentRoute = parentRoute.filter((item, index) => index !== route.length - 2);
    const { expandable } = node.data;
    switch (handleType) {
      case 'remove':
        if (!superiorParentRoute.length) {
          this.gridApi.purgeServerSideCache();
          this.gridApi.getDisplayedRowAtIndex(0).setExpanded(true);
          if (this.gridApi.getDisplayedRowAtIndex(0)) {
            node.setExpanded(true);
          }
        } else {
          this.gridApi.purgeServerSideCache(superiorParentRoute);
          this.gridApi.purgeServerSideCache(parentRoute);
          if (this.gridApi.getDisplayedRowAtIndex(0)) {
            node.setExpanded(true);
          }
        }
        break;
      default:
        if (!expandable) {
          this.gridApi.purgeServerSideCache(parentRoute);
          if (node.data.nodeData.id === root) {
            this.gridApi.purgeServerSideCache();
            this.gridApi.getDisplayedRowAtIndex(0).setExpanded(true);
          } else {
            this.gridApi.purgeServerSideCache(parentRoute);
            this.gridApi.setRowNodeExpanded(node, true);
            node.setExpanded(true);
          }
        } else {
          this.gridApi.purgeServerSideCache(route);
          if (this.gridApi.getDisplayedRowAtIndex(0)) {
            node.setExpanded(true);
          }
        }
        break;
    }
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

  getContextMenuItems = params => {
    const { node = {} } = params;
    const { data } = node;
    const struNode = data;
    return [
      {
        name: `?????? <strong>${getIdentifier(struNode.nodeData)}</strong>`,
        action: () => {
          this.showDetail(struNode);
        },
      },
      {
        name: `???????????????????????? <strong>${getIdentifier(struNode.nodeData)}</strong>`,
        action: () => {},
      },
    ];
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
    if (node)
      this.setState({ detailPanelVisible: true, type: node.nodeDataType, id: node.nodeData.id });
  };

  // ????????????
  setExpanded = expanded => {
    this.setState({ expandedAll: expanded });
    this.gridApi.forEachNode(node => {
      node.setExpanded(expanded);
    });
  };

  // ??????
  handleRemoveNode = () => {
    const { root } = this.props;
    const selectedNodeRows = this.gridApi.getSelectedRows();
    const selectedNodes = selectedNodeRows.map(item => item.id || item.nodeData.id);
    if (!selectedNodeRows) {
      message.warning('??????????????????????????????');
    } else if (selectedNodes.includes(root)) {
      message.warning('??????????????????????????????');
    } else {
      Modal.confirm({
        title: '???????????????????????????????',
        onOk: () => {
          this.removeSelectedNode(
            selectedNodeRows.map(item => item.relationshipData && item.relationshipData.id),
          );
        },
        okText: '??????',
        cancelText: '??????',
      });
    }
    return false;
  };

  removeSelectedNode = async data => {
    const { root } = this.props;
    const res = await removeNode({ partId: root, relationshipIds: data });
    // const selectedRowData = this.gridApi.getSelectedRows();
    if (!res.error) {
      message.success('????????????');
      this.refreshNodes('remove');
      // this.gridApi.updateRowData({remove: selectedRowData});
      // this.gridApi.purgeServerSideCache()
    }
  };

  // ??????????????????
  changeExcludeCategories = (value, type) => {
    const { criteria, tempCriteria = criteria } = this.state;
    let categories = JSON.parse(JSON.stringify(tempCriteria.excludeCategories)) || [];
    if (value) {
      // ???????????????????????????
      categories = categories.filter(item => item !== type);
      this.setState({ tempCriteria: { ...tempCriteria, excludeCategories: categories } });
    } else if (!categories.includes(type)) {
      // ??????????????????????????????????????????
      categories.push(type);
      this.setState({ tempCriteria: { ...tempCriteria, excludeCategories: categories } });
    }
  };

  getMenu = () => {
    const { readonly, optionalTypes = DEFAULT_OPTIONAL_TYPES } = this.props;
    return (
      <div style={{ paddingBottom: 12 }}>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item onClick={() => this.setExpanded(true)}>
                <ColumnHeightOutlined />
                &nbsp;??????????????????
              </Menu.Item>
              <Menu.Item onClick={() => this.setExpanded(false)}>
                <RollbackOutlined />
                &nbsp;????????????
              </Menu.Item>
            </Menu>
          }
        >
          <a style={{ color: '#000', marginRight: 16 }}>
            <ProjectOutlined rotate={-90} style={{ marginTop: 4 }} />
            &nbsp;??????&nbsp;
            <DownOutlined />
          </a>
        </Dropdown>
        {!readonly && (
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item disabled>
                  <ExportOutlined />
                  &nbsp;??????
                </Menu.Item>
                <Menu.Item disabled>
                  <ImportOutlined />
                  &nbsp;??????
                </Menu.Item>
                <Menu.Item disabled>
                  <ImportOutlined />
                  &nbsp;????????????
                </Menu.Item>
                <Menu.Item disabled>
                  <SwitcherOutlined />
                  &nbsp;??????
                </Menu.Item>
                <Menu.Divider />
                <Menu.SubMenu
                  title={
                    <span>
                      <PlusSquareFilled />
                      &nbsp;???????????????&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                  }
                >
                  <Menu.Item
                    onClick={() => {
                      this.showDataPicker('Part');
                    }}
                  >
                    <SettingOutlined />
                    &nbsp;??????
                  </Menu.Item>
                  {optionalTypes.includes('PartDescribeDrawing') && (
                    <Menu.Item
                      onClick={() => {
                        this.showDataPicker('Drawing');
                      }}
                    >
                      <FileMarkdownOutlined />
                      &nbsp;??????
                    </Menu.Item>
                  )}
                  {optionalTypes.includes('PartDescribeDocument') && (
                    <Menu.Item
                      onClick={() => {
                        this.showDataPicker('Document');
                      }}
                    >
                      <SnippetsOutlined />
                      &nbsp;??????
                    </Menu.Item>
                  )}
                  {optionalTypes.includes('PartRequirement') && (
                    <Menu.Item
                      onClick={() => {
                        this.showDataPicker('Requirement');
                      }}
                    >
                      <SnippetsOutlined />
                      &nbsp;??????
                    </Menu.Item>
                  )}
                  {optionalTypes.includes('PartCharDesign') && (
                    <Menu.Item
                      onClick={() => {
                        this.showDataPicker('CharDesign');
                      }}
                    >
                      <SnippetsOutlined />
                      &nbsp;????????????
                    </Menu.Item>
                  )}
                </Menu.SubMenu>
                <Menu.SubMenu
                  title={
                    <span>
                      <PlusSquareOutlined />
                      &nbsp;???????????????&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                  }
                  disabled
                >
                  <Menu.Item>
                    <SettingOutlined />
                    &nbsp;??????
                  </Menu.Item>
                  <Menu.Item>
                    <FileMarkdownOutlined />
                    &nbsp;??????
                  </Menu.Item>
                  <Menu.Item>
                    <SnippetsOutlined />
                    &nbsp;??????
                  </Menu.Item>
                </Menu.SubMenu>
                <Menu.Divider />
                <Menu.Item onClick={this.handleRemoveNode}>
                  <CloseSquareOutlined />
                  &nbsp;??????
                </Menu.Item>
              </Menu>
            }
          >
            <a style={{ color: '#000', marginRight: 16 }}>
              <CodeOutlined style={{ marginTop: 4 }} />
              &nbsp;??????&nbsp;
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
        <Form.Item label="????????????" style={{ marginRight: 24 }}>
          <Radio.Group size="small" value={c.configSpecType} onChange={this.changeSpecType}>
            <Radio.Button value="latest">??????</Radio.Button>
            <Radio.Button value="baseline">??????</Radio.Button>
            <Radio.Button value="phaseBaseline">??????</Radio.Button>
          </Radio.Group>
        </Form.Item>
        {c.configSpecType === 'latest' && (
          <React.Fragment>
            {/* <Form.Item label="??????" style={{ marginRight: 24 }}>
              <Select
                size="small"
                value={c.phaseMark}
                placeholder="????????????"
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
            <Form.Item label="??????" style={{ marginRight: 24 }}>
              <Select
                size="small"
                value={c.view}
                placeholder="????????????"
                style={{ width: 200 }}
                onChange={this.changeView}
              >
                <Select.Option value={undefined}>?????????</Select.Option>
                {views.map(v => (
                  <Select.Option key={v.name} value={v.id}>
                    {v.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="??????" style={{ marginRight: 24 }}>
              <Select
                size="small"
                value={c.state}
                placeholder="????????????"
                style={{ width: 200 }}
                onChange={this.changeLifecycleState}
              >
                <Select.Option value={undefined}>?????????</Select.Option>
                <Select.Option value="INWORK">????????????</Select.Option>
                <Select.Option value="RELEASED">?????????</Select.Option>
              </Select>
            </Form.Item>
          </React.Fragment>
        )}
        {c.configSpecType !== 'latest' && (
          <Form.Item key={c.configSpecType} label="??????" style={{ marginRight: 24 }}>
            <Select
              size="small"
              value={c.baselineId}
              placeholder="????????????"
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

        <Form.Item label="????????????" style={{ marginRight: 24 }}>
          <Checkbox.Group value={c.objectTypes} onChange={this.changeDataTypes}>
            <Checkbox value="PartUsage" disabled checked>
              ??????
            </Checkbox>
            {optionalTypes.includes('PartDescribeDocument') && (
              <Checkbox value="PartDescribeDocument">??????</Checkbox>
            )}
            {optionalTypes.includes('PartDescribeDrawing') && (
              <Checkbox value="PartDescribeDrawing">??????</Checkbox>
            )}
            {optionalTypes.includes('PartRequirement') && (
              <Checkbox value="PartRequirement">??????</Checkbox>
            )}
            {optionalTypes.includes('PartCharDesign') && (
              <Checkbox value="PartCharDesign">??????</Checkbox>
            )}
          </Checkbox.Group>
          <Checkbox
            value="ElectronicComponent"
            checked={!(c.excludeCategories || []).includes('ElectronicComponent')}
            onChange={e => this.changeExcludeCategories(e.target.checked, 'ElectronicComponent')}
          >
            ?????????
          </Checkbox>
        </Form.Item>
        {!!tempCriteria && (
          <Form.Item>
            <Button type="primary" size="small" onClick={this.reload} style={{ marginRight: 12 }}>
              ??????
            </Button>
            <Button size="small" onClick={this.reset} style={{ marginRight: 12 }}>
              ??????
            </Button>
          </Form.Item>
        )}
      </Form>
    );
  };

  render() {
    const {
      columnDefs,
      defaultColDef,
      autoGroupColumnDef,
      uuidKey,
      defaultType,
      dataPickerVisible,
      changeRecordsDrawer,
      changeRecords,
      frameworkComponents,
    } = this.state;
    const { detailPanelVisible, id, type, expandedGroupIds } = this.state;

    const { root, noConfig } = this.props;

    const ChangeRecordsDrawerProps = {
      visible: changeRecordsDrawer,
      changeRecords,
      onClose: () => this.setState({ changeRecordsDrawer: false }),
    };

    return (
      <Card bodyStyle={{ paddingTop: !noConfig && 12 }} className={noConfig && 'noPaddingCard'}>
        {!noConfig && this.getMenu()}
        <div id="myGrid" style={{ height: 680, width: '100%' }} className="ag-theme-balham">
          <AgGridReact
            treeData
            animateRows
            rowModelType="serverSide"
            allowContextMenuWithControlKey
            getContextMenuItems={this.getContextMenuItems}
            modules={AllModules}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            autoGroupColumnDef={autoGroupColumnDef}
            isServerSideGroup={item => item.nodeId}
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
        <DetailPanel
          key={id}
          id={id}
          type={type}
          visible={detailPanelVisible}
          onClose={() => {
            this.setState({ detailPanelVisible: false });
          }}
        />
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
        <ChangeRecordsDrawer {...ChangeRecordsDrawerProps} />
      </Card>
    );
  }
}

export default ProductStructureBrowser;

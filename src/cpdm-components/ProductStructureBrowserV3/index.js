import React, { Component, Fragment } from 'react';
import { AgGridReact } from '@ag-grid-community/react';
import { AllModules } from '@ag-grid-enterprise/all-modules';
import '@/ag-grid-imports';

import { ItemPicker } from 'cpdm-ui-components';
import { stringify } from 'qs';
import { Link } from 'umi';
import { message, Card, Menu, Dropdown, Tooltip, Divider, Space } from 'antd';

import {
  ColumnHeightOutlined,
  DownOutlined,
  RollbackOutlined,
  SelectOutlined,
  InfoCircleOutlined,
  ProjectOutlined,
  PicCenterOutlined,
  PicRightOutlined,
} from '@ant-design/icons';
import '@ant-design/compatible/assets/index.css';
import { Modal, SplitPane } from '@cpdm/components';
import moment from 'moment';
import { request } from '@cpdm/util';
import { AgGridLocaleText } from '@cpdm/components';
import CheckoutIcon from '@/assets/status/Checkout.gif';
import CheckinIcon from '@/assets/status/IconCheckIn.gif';
import RevisionIcon from '@/assets/status/IconRevision.gif';
import UndoCheckOut from '@/assets/status/IconUndoCheckOut.gif';
import * as BomServise from '@/services/data/bom';
import { CheckinModal } from '@/cpdm-components/InfoPageItem/ActionModal';
import Icon from '@/cpdm-components/Icon';
import BOMPanel from './BOMPanel';
import Toolbar from './Toolbar';

export async function loadStructure(dataType, partId, criteria) {
  if (partId) {
    return request(
      `/bom/${dataType.toLowerCase()}-parts/${partId}/sub-parts${stringify(criteria, {
        addQueryPrefix: true,
      })}`
    );
  }
  return '';
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

// 移除节点
async function removeNode(params) {
  return request(`/cpdm/parts/${params.partId}/relationship/remove?${stringify(params)}`, {
    method: 'DELETE',
    data: params.relationshipIds,
  });
}

const getIdentifier = nodeData => {
  const { code, name, version, viewName, subject, objectType } = nodeData;
  let info = [subject];
  const type = objectType.toLowerCase();
  if (type.includes('part')) {
    info = subject
      ? [subject, `(${viewName})`].filter(i => i)
      : [code, name, version, viewName].filter(i => i);
  }
  if (type.includes('document')) {
    info = subject ? [subject].filter(i => i) : [code, name, version].filter(i => i);
  }
  return info && info.length && info.join(', ');
};

const getStatus = (nodeData = {}) => {
  const { status = {} } = nodeData;
  if (status.status === 'CHECKIN') return '';
  return (
    <img
      width="12"
      style={{ marginLeft: 4 }}
      title={`已由${nodeData.lockerFullName || (nodeData.locker && nodeData.locker.fullName)}检出`}
      src={CheckoutIcon}
      alt={`已由${nodeData.lockerFullName || (nodeData.locker && nodeData.locker.fullName)}检出`}
    />
  );
};

const getRowIcon = ({ icon, objectType }) => {
  if (icon) return <img alt="" src={icon} height={16} />;
  const type = objectType && objectType.toLowerCase();
  let objectIcon = <Icon style={{ width: 16 }} title="文档" name="type/document.svg" />;
  if (type.includes('part')) {
    objectIcon = <Icon style={{ width: 16 }} title="部件" name="type/part.svg" />;
  }
  if (type.includes('document')) {
    objectIcon = <Icon style={{ width: 16 }} title="文档" name="type/document.svg" />;
  }
  if (type.includes('cad')) {
    objectIcon = <Icon style={{ width: 16 }} title="文档" name="type/drawing.svg" />;
  }
  return objectIcon;
};

const getAmount = node => {
  if (!node) return '';
  const { nodeData = {} } = node;
  const { objectType } = nodeData;
  if (objectType.includes('Part') || objectType.includes('part'))
    return `${!node.amount ? '1' : node.amount || ''}`;
  return '-';
};

class ProductStructureBrowser extends Component {
  constructor(props) {
    super(props);
    const { siderBar } = this.props;
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
          field: 'nodeData.link.amount',
          headerName: '数量',
          width: 64,
          cellRenderer: params => getAmount(params.data),
        },
        {
          field: 'nodeData.secretLevel',
          headerName: '密级',
          width: 64,
        },
        {
          field: 'nodeData.phaseMarkDisplay',
          headerName: '研制阶段',
          width: 128,
        },
        {
          field: 'nodeData.repository.name',
          headerName: '型号',
        },
        {
          field: 'nodeData.repository.modelCode',
          headerName: '型号代号',
        },
        {
          field: 'nodeData.productCode',
          headerName: '产品代号',
        },
        {
          field: 'nodeData.productCategory',
          headerName: '产品分类',
        },
        {
          field: 'nodeData.productLevel',
          headerName: '产品层级',
        },
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
            <Space title={getIdentifier(params.data.nodeData)}>
              {getRowIcon(params.data.nodeData)}
              {getStatus(params.data.nodeData)}
              {getIdentifier(params.data.nodeData)}
              <span style={{ marginLeft: 8 }}>{siderBar && this.infoRender(params)}</span>
            </Space>
          ),
        },
        width: 376,
        headerName: '主题',
        field: 'nodeData.subject',
        lockPosition: true,
      },
      criteria: {},
      expandedAll: false, // 是否展开所有
      fullScreent: false,
      tabKey: '',
    };
  }

  componentDidMount() {
    message.config({
      top: 200,
      duration: 2,
      maxCount: 3,
    });
  }

  infoRender = params => {
    this.infoRender = this.infoRender.bind(this);
    const { data = {} } = params;
    const { nodeData = {} } = data;
    return (
      <Tooltip placement="topLeft" title="详细信息">
        <Link to={nodeData.infoUrl} target="newInfo" rel="noopener noreferrer">
          <InfoCircleOutlined />
        </Link>
      </Tooltip>
    );
  };

  onGridReady = agGrid => {
    const { onRefs } = this.props;
    this.gridApi = agGrid.api;
    this.gridColumnApi = agGrid.columnApi;
    if (onRefs) {
      onRefs(agGrid.api);
    }
    agGrid.api.setServerSideDatasource({
      getRows: async params => {
        const node = params.parentNode.data;
        const {
          root,
          dataType,
          requestUrl,
          query = {},
          onRowClick,
          expandedAllNode,
          waitingReq,
        } = this.props;
        const partId = node ? node.nodeData.id : root;
        const { criteria, newKeys } = this.state;
        const { objectTypes = ['Part'] } = criteria;
        const requestParam = {
          ...criteria,
          ...query,
          objectTypes:
            query && query.objectTypes ? query.objectTypes.join(',') : objectTypes.join(','),
          node: true,
          // 0只加载当前节点 1只加载子节点 2当前节点和子节点一起加载
          loadMode: node ? 1 : 0,
        };
        if (waitingReq) {
          params.successCallback([], 0);
          return;
        }
        let rowData = [];
        const response = requestUrl
          ? await requestUrl(partId, { ...requestParam }, dataType)
          : await loadStructure(dataType, partId, { ...requestParam });
        if (Array.isArray(response)) {
          rowData = response;
        }

        if (response && response.id) {
          rowData = [{ ...response, children: [] }];
        }

        if (rowData.length) {
          await params.successCallback(
            rowData.map(item => ({
              ...item,
              objectType: item.objectType || (item.nodeData && item.nodeData.objectType),
              nodeDataType: item.objectType || (item.nodeData && item.nodeData.objectType),
              nodeId: item.id || (item.nodeData && item.nodeData.id),
              parentNode: node,
              parentId: node ? node.nodeData.id : root,
              dataType,
              linkId: (item.link && item.link.id) || item.id,
              children: item.children,
              nodeData: {
                ...(item.nodeData || item),
                children: item.children,
              },
            })),
            rowData.length
          );
        } else {
          await params.successCallback([], 0);
        }
        if (newKeys) {
          await this.expandedSelectedCurrent('n', newKeys);
        }
        if (!node) {
          const rootNode = agGrid.api.getRowNode(response.id || root);
          if (rootNode) {
            if (onRowClick) {
              onRowClick(rootNode.data);
            }
            rootNode.setSelected(true);
            this.refreshInfoPanel(root);
          }
        }
        const { expandedAll } = this.state;
        if (expandedAll || expandedAllNode) {
          agGrid.api.forEachNode(rowNode => {
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
    const { onRowClick } = this.props;
    this.gridApi.deselectAll();
    e.node.setSelected(true);
    if (onRowClick) {
      onRowClick(e.node.data.nodeData, e.node.data);
    } else {
      this.showDetail(e.node.data);
      this.setState({
        parentData: e.node && e.node.parent && e.node.parent.data && e.node.parent.data.nodeData,
        currentNodeLinkId: e.node.data.nodeData.linkId,
      });
    }
  };

  panelChange = (type, newKeys) => {
    switch (type) {
      case 'insert':
        this.refreshNodes('insert', newKeys.id);
        break;
      default:
        this.refreshNodes('remove');
        break;
    }
  };

  onTabChange = tabs => {
    this.setState({ tabKey: tabs });
  };

  closeDataPicker = async () => {
    this.setState({ dataPickerVisible: false });
  };

  refreshInfoPanel = async id => {
    this.setState({
      id,
      refreshKey: Math.random(),
    });
  };

  expandedSelectedCurrent = (node, newKeys) => {
    if (this.gridApi.getRowNode(newKeys)) {
      this.gridApi.deselectAll();
      this.gridApi.getRowNode(newKeys).setExpanded(true);
      this.gridApi.getRowNode(newKeys).setSelected(true);
    }
  };

  refreshNodes = async (type, newKeys) => {
    const { parentData, currentNodeLinkId } = this.state;
    const { refreshPart, root } = this.props;
    const [node] = this.gridApi.getSelectedNodes();
    if (!node) return;
    const route = this.getRoute(node);
    this.setState({ newKeys: node.data.linkId });
    const parentRoute = route.filter((item, index) => index !== route.length - 1);
    setTimeout(() => {
      this.gridApi.purgeServerSideCache(parentRoute);
      if (parentData) {
        if (parentData.id === root) {
          this.gridApi.getDisplayedRowAtIndex(0).setExpanded(true);
          this.gridApi.getRowNode(currentNodeLinkId).setSelected(true);
        } else {
          this.gridApi.getRowNode(parentData.linkId).setExpanded(true);
        }
      }
    }, 200);
    if (!parentData) {
      if (newKeys !== node.id) {
        refreshPart(newKeys);
      } else {
        this.gridApi.purgeServerSideCache();
        if (this.gridApi.getDisplayedRowAtIndex(0)) {
          this.gridApi.getDisplayedRowAtIndex(0).setExpanded(true);
        }
      }
    }
    this.setState({ refreshKey: Math.random(), id: newKeys });
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
            }))
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
            data.map(d => ({ partId: currentNode.nodeData.id, drawingId: d.id }))
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
            data.map(d => ({ partId: currentNode.nodeData.id, documentBranchId: d.revisionId }))
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

  reload = criteria => {
    this.setState({ criteria });
    this.gridApi.deselectAll();
    this.gridApi.purgeServerSideCache();
    if (this.gridApi.getDisplayedRowAtIndex(0)) {
      this.gridApi.getDisplayedRowAtIndex(0).setExpanded(true);
    }
  };

  showDetail = node => {
    if (node) {
      this.getMenu(true, node);
      this.setState({
        type: node.nodeDataType,
        id: node.nodeData.id,
        selected: node.nodeData,
        refreshKey: Math.random(),
        tabKey: '',
      });
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
            selectedNodeRows.map(item => item.relationshipData && item.relationshipData.id)
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
    if (!res.error) {
      message.success('移除成功');
      this.refreshNodes('remove');
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

  getMenu = data => {
    const { root } = this.props;
    let status = {};
    if (data.id) {
      status = data.actions;
    } else {
      const node = this.gridApi && this.gridApi.getRowNode(root);
      if (node) status = node.data && node.data.nodeData && node.data.nodeData.actions;
    }
    const { readonly } = this.props;
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
              <Menu onClick={this.handleAction}>
                {status && status.CHECKOUT !== 2 && (
                  <Menu.Item disabled={status.CHECKOUT === 1} key="CheckOut">
                    <img alt="检出" src={CheckoutIcon} width="12" />
                    &nbsp;&nbsp; 检出
                  </Menu.Item>
                )}
                {status && status.CHECKIN !== 2 && (
                  <Menu.Item disabled={status.CHECKIN === 1} key="CheckIn">
                    <img alt="检入" src={CheckinIcon} width="12" />
                    &nbsp;&nbsp; 检入
                  </Menu.Item>
                )}
                {status && status.REVISE !== 2 && (
                  <Menu.Item disabled={status.REVISE === 1} key="Revise">
                    <img alt="修订" src={RevisionIcon} width="12" />
                    &nbsp;&nbsp; 修订
                  </Menu.Item>
                )}
                {status && status.UNDOCHECKOUT !== 2 && (
                  <Menu.Item disabled={status.UNDOCHECKOUT === 1} key="RevokeCheckOut">
                    <img alt="撤销检出" src={UndoCheckOut} width="12" />
                    &nbsp;&nbsp; 撤销检出
                  </Menu.Item>
                )}
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

  handleAction = action => {
    const selectedNodeRows = this.gridApi.getSelectedRows();
    const [node] = this.gridApi.getSelectedNodes();
    if (!selectedNodeRows) {
      message.warning('请至少选择一条数据。');
    } else {
      const { key } = action;
      const pId = node.data.id || node.data.nodeData.id;
      const pType = node.data.objectType || node.data.nodeData.objectType;
      switch (key) {
        case 'CheckIn':
          this.setState({ checkinVisible: true });
          break;
        case 'CheckOut':
          this.handleCheckoutPart(pId, pType);
          break;
        case 'Revise':
          this.handleRevisePart(pId, pType);
          break;
        case 'RevokeCheckOut':
          this.handleRevokeCheckOutPart(pId, pType);
          break;
        default:
          break;
      }
    }
  };

  handleCheckoutPart = async (pId, pType) => {
    const res = await BomServise.checkout({ id: pId, objectType: pType });
    if (res && res.id) {
      message.success('检出成功。');
      this.refreshNodes('CheckOut', res.id);
      this.setState({
        id: res.id,
        refreshKey: Math.random(),
      });
    } else {
      message.error('检出失败。');
    }
  };

  handleRevisePart = async (pId, pType) => {
    const res = await BomServise.revise({ id: pId, objectType: pType });
    if (res && res.id) {
      message.success('修订成功。');
      this.refreshNodes('Revise', res.id);
      this.setState({
        id: res.id,
        refreshKey: Math.random(),
      });
    } else {
      message.error('修订失败。');
    }
  };

  handleRevokeCheckOutPart = async (pId, pType) => {
    const res = await BomServise.undoCheckout({ id: pId, objectType: pType });
    if (res && res.id) {
      message.success('撤销检出成功。');
      this.refreshNodes('UndoCheckout', res.id);
      this.setState({
        id: res.id,
        refreshKey: Math.random(),
      });
    } else {
      message.error('撤销检出失败。');
    }
  };

  handleCheckinPart = async note => {
    const [node] = this.gridApi.getSelectedNodes();
    const pId = node.data.id || node.data.nodeData.id;
    const pType = node.data.objectType || node.data.nodeData.objectType;
    const res = await BomServise.checkin({ id: pId, objectType: pType, note });
    if (res && res.id) {
      message.success('检入成功。');
      this.setState({ checkinVisible: false });
      this.refreshNodes('CheckIn', res.id);
    } else {
      message.error('检入失败。');
    }
  };

  agGrigTable = () => {
    const { columnDefs, defaultColDef, autoGroupColumnDef, frameworkComponents } = this.state;
    const { siderBar, isIframe } = this.props;
    const columns = isIframe ? columnDefs.splice(1) : columnDefs;
    return (
      <AgGridReact
        treeData
        animateRows
        suppressContextMenu
        rowModelType="serverSide"
        allowContextMenuWithControlKey
        modules={AllModules}
        rowHeight={36}
        headerHeight={36}
        columnDefs={siderBar ? [] : columns}
        defaultColDef={defaultColDef}
        autoGroupColumnDef={autoGroupColumnDef}
        isServerSideGroup={item => item.children}
        getServerSideGroupKey={item => (item.link && item.link.id) || item.id}
        getRowNodeId={item => (item.link && item.link.id) || item.id}
        onGridReady={this.onGridReady}
        onRowClicked={this.onRowClicked}
        localeText={AgGridLocaleText}
        rowSelection="multiple"
        frameworkComponents={frameworkComponents}
      />
    );
  };

  panelInfo = () => {
    const { selected = {}, tabKey } = this.state;
    const { id, type, refreshKey } = this.state;
    const {
      root,
      dispatch,
      data = {},
      dataType,
      hideConfig,
      siderBar,
      hideInfo,
      isIframe,
      ...reset
    } = this.props;
    const infoProps = {
      id,
      type,
      data: selected,
      dispatch,
      dataType,
      isIframe,
      ...reset,
    };
    return (
      <BOMPanel
        {...infoProps}
        key={refreshKey || id}
        onChange={this.panelChange}
        tabKey={tabKey}
        onTabChange={this.onTabChange}
        type={type || 'Part'}
        parentData={selected.id ? selected : data}
      />
    );
  };

  configRender = () => {
    const { siderBar, hidePanel, height } = this.props;
    const { fullScreent } = this.state;
    if (siderBar || hidePanel) {
      return (
        <div className="ag-theme-balham" style={{ height: height || '70vh', width: '100%' }}>
          {this.agGrigTable()}
        </div>
      );
    }
    return (
      <Fragment>
        <SplitPane key={fullScreent} minWidth={480} width={fullScreent ? '100%' : 480}>
          <div
            id="myGrid"
            style={{ height: height || '70vh', width: '100%' }}
            className="ag-theme-balham"
          >
            {this.agGrigTable()}
          </div>
          {!fullScreent && this.panelInfo()}
        </SplitPane>
      </Fragment>
    );
  };

  render() {
    const {
      uuidKey,
      defaultType,
      dataPickerVisible,
      selected = {},
      checkinVisible,
      fullScreent,
    } = this.state;

    const { root, data, hideConfig, hideBorder, readonly, padding, isIframe } = this.props;

    return (
      <Card bodyStyle={{ padding, paddingTop: 12 }} bordered={!hideBorder}>
        {!hideConfig && !isIframe && (
          <Fragment>
            <div>
              <div style={{ display: 'inline-block' }}>
                {(selected.id || root) && this.getMenu(selected)}
              </div>
              <span
                onClick={() => this.setState({ fullScreent: !fullScreent })}
                style={{ float: 'right' }}
              >
                {!fullScreent ? (
                  <a>
                    <PicCenterOutlined />
                  </a>
                ) : (
                  <a>
                    <PicRightOutlined />
                  </a>
                )}
              </span>
            </div>

            {!readonly && (
              <>
                <Divider style={{ margin: 1 }} />
                <Toolbar
                  style={{ padding: '10px 0' }}
                  root={root}
                  data={data}
                  reload={this.reload}
                />
              </>
            )}
          </Fragment>
        )}
        {this.configRender()}
        <ItemPicker
          key={uuidKey}
          defaultType={defaultType}
          types={[defaultType]}
          visible={dataPickerVisible}
          multi
          rowKey={record => record.id}
          onOk={this.pickupData}
          onCancel={this.closeDataPicker}
          host={process.env.API_BASE_PATH}
        />
        {checkinVisible && (
          <CheckinModal
            visible={checkinVisible}
            onSubmit={this.handleCheckinPart}
            onCancel={() => this.setState({ checkinVisible: false })}
          />
        )}
      </Card>
    );
  }
}

export default ProductStructureBrowser;

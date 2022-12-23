import React from 'react';
import { Button, Space, Layout } from 'antd';
import { stringify } from 'qs';
import { FileOutlined, FolderOpenOutlined, FolderOutlined } from '@ant-design/icons';
import { request } from '@cpdm/util';
import { Modal } from '@cpdm/components';
import { AgGridReact } from '@ag-grid-community/react';
import { AllModules } from '@ag-grid-enterprise/all-modules';
import '@/ag-grid-imports';

import { AgGridLocaleText } from '@cpdm/components';
import GridComponents from '@/pages/ChangeConfiguration/DataSendOrder/CollectingDataModal/GridComponents';

const { Sider, Content } = Layout;
// 获取相关部件
export async function loadNodes(query) {
  return request(
    `/resource/component-supplier-tree/children${stringify(query, {
      addQueryPrefix: true,
    })}`,
  );
}

export async function loadRoot(query) {
  return request(
    `/resource/component-supplier-tree/root${stringify(query, {
      addQueryPrefix: true,
    })}`,
  );
}

class ComponentsPanel extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      defaultColDef: {
        resizable: true,
        width: 128,
      },
      autoGroupColumnDef: {
        cellRendererParams: {
          innerRendererFramework: params => {
            const record = params.data;
            let icon;
            if (record.leaf) {
              if (record.expand) {
                icon = <FolderOpenOutlined style={{ fontSize: '14px' }} />;
              } else {
                icon = <FileOutlined style={{ fontSize: '14px' }} />;
              }
            } else {
              icon = <FolderOutlined style={{ fontSize: '14px' }} />;
            }
            return (
              <Space>
                <a>{icon}</a>
                <span>{record.name}</span>
              </Space>
            );
          },
        },
        width: 400,
        headerName: '供应商分类',
        lockPosition: true,
      },
      params: {
        classificationId: '',
      },
    };
  }

  onRef = aggrid => {
    this.agGrid = aggrid;
  };

  onGridReady = agGrid => {
    this.gridApi = agGrid.api;
    this.gridColumnApi = agGrid.columnApi;
    agGrid.api.setServerSideDatasource({
      getRows: async params => {
        const node = params.parentNode.data;
        // const { root } = this.props;
        // const partId = node ? node.id : root;
        let res = [];
        let response;
        const requestParam = {
          treeKey: 'componentSupplierTree',
        };

        if (node) {
          const nodeParam = {
            leftNo: node.leftNo,
            rightNo: node.rightNo,
            depth: node.depth,
          };
          response = await loadNodes({ ...requestParam, ...nodeParam });
        } else {
          response = await loadRoot({ ...requestParam });
        }

        if (Array.isArray(response) || (response && response.content)) {
          res = Array.isArray(response) ? response : [response.content];
          await params.successCallback(res, res.length);
        } else {
          await params.successCallback([], 0);
        }
      },
    });
  };

  onGridChange = () => {
    const selectd = this.agGrid.getSelectedRows();
    this.setState({ selectedRows: [...selectd] });
  };

  render() {
    const { visible, loading, onCancel, onOk } = this.props;
    const { autoGroupColumnDef, params, selectedRows, defaultColDef } = this.state;
    const tableProps = {
      requestUrl: `${process.env.API_BASE_PATH}/resource/component-supplier`, // 部署
      pagination: true,
      hideInputSearch: true,
      columns: [
        {
          title: '供方编号',
          dataIndex: 'supplierCode',
        },
        {
          title: '供方名称',
          dataIndex: 'supplierName',
        },
        {
          title: '涉密等级',
          dataIndex: 'secretLevelDisplay',
        },
        {
          title: '联系人',
          dataIndex: 'contactPerson',
        },
        {
          title: '合作方式',
          dataIndex: 'cooperationMethod',
        },
        {
          title: '供方等级',
          dataIndex: 'supplierGrade',
        },
        {
          title: '供方类型',
          dataIndex: 'supplierTypeDisplay',
        },
        {
          title: '修改时间',
          dataIndex: 'modifyStamp',
          renderType: 'TimeStamp',
        },
      ],
      scroll: { x: '850' },
      searchBar: [
        { label: '型号规格', dataIndex: 'modelSpecification' },
        { label: '生产厂家', dataIndex: 'productionFactory' },
        { label: '质量等级', dataIndex: 'qualityLevel' },
      ],
      className: 'tableEllipsis',
      size: 'small',
      selectionType: 'checkbox',
      rowSelection: (_, rows) => this.setState({ selectedRows: rows }),
    };

    return (
      <Modal
        title="选择生产厂家"
        maskClosable={false}
        visible={visible}
        width={1000}
        bodyStyle={{ maxHeight: '70vh', overflow: 'scroll' }}
        onCancel={onCancel}
        onOk={onCancel}
        footer={[
          <Button key="back" onClick={onCancel}>
            取消
          </Button>,
          <Button
            key="submit"
            type="primary"
            disabled={!selectedRows}
            loading={loading}
            onClick={() => onOk(selectedRows)}
          >
            确定
          </Button>,
        ]}
      >
        <Layout>
          <Sider theme="light" width={300} style={{ minHeight: '70vh' }}>
            <div id="myGrid" style={{ height: '100%', width: '100%' }} className="ag-theme-balham">
              <AgGridReact
                treeData
                animateRows
                suppressContextMenu
                rowModelType="serverSide"
                allowContextMenuWithControlKey
                modules={AllModules}
                columnDefs={[]}
                defaultColDef={defaultColDef}
                autoGroupColumnDef={autoGroupColumnDef}
                isServerSideGroup={item => !item.isLeaf}
                getServerSideGroupKey={item => item.name}
                getRowNodeId={item => item.id}
                onGridReady={this.onGridReady}
                onRowClicked={item => this.setState({ params: { groupId: item.data.id } })}
                localeText={AgGridLocaleText}
                rowSelection="multiple"
              />
            </div>
          </Sider>
          <Content>
            <GridComponents
              key={params.groupId}
              requestUrl="/resource/component-supplier"
              requestParams={{
                groupId: params.groupId,
                size: 15,
              }}
              treeData={false}
              pagination
              title="生产厂家列表"
              filter={false}
              columns={tableProps.columns}
              rowSelectionType="single"
              hideSearch
              onRefs={this.onRef}
              onChange={this.onGridChange}
            />
          </Content>
        </Layout>
      </Modal>
    );
  }
}

export default ComponentsPanel;

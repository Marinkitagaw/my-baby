import React from 'react';
import { Button, Space, Tooltip, Layout, Card, Empty, Select } from 'antd';
import { stringify } from 'qs';
import { FileOutlined, FolderOutlined } from '@ant-design/icons';
import { request } from '@cpdm/util';
import { Link } from 'umi';
import { StandardDataTable } from 'cpdm-ui-components';
import { Modal } from '@cpdm/components';
import Icon from '@/cpdm-components/Icon';
import { AgGridReact } from '@ag-grid-community/react';
import { AllModules } from '@ag-grid-enterprise/all-modules';
import '@/ag-grid-imports';

import { AgGridLocaleText } from '@cpdm/components';

const { Sider, Content } = Layout;
// 获取相关部件
export async function loadComponentClassification(query) {
  return request(
    `/resource/resource/classification/children${stringify(query, {
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
              if (record.root) {
                icon = <FileOutlined style={{ marginLeft: 28, fontSize: '14px' }} />;
              } else {
                icon = <FileOutlined style={{ fontSize: '14px' }} />;
              }
            } else {
              icon = <FolderOutlined style={{ fontSize: '14px' }} />;
            }
            return (
              <Space>
                <a>{icon}</a>
                <span>{record.text}</span>
              </Space>
            );
          },
        },
        width: 400,
        headerName: '元器件分类',
        lockPosition: true,
      },
      params: {
        classificationId: '',
      },
    };
  }

  onGridReady = agGrid => {
    this.gridApi = agGrid.api;
    this.gridColumnApi = agGrid.columnApi;
    agGrid.api.setServerSideDatasource({
      getRows: async params => {
        const node = params.parentNode.data;
        const { root } = this.props;
        const partId = node ? node.id : root;
        let res = [];
        const requestParam = {
          node: partId || '0',
          type: 'ElectronicParts',
        };
        const response = await loadComponentClassification({ ...requestParam });
        if (Array.isArray(response) || (response && response.id)) {
          res = Array.isArray(response) ? response : [response];
          if (!partId) res = res.map(item => ({ ...item, root: true }));
          await params.successCallback(res, res.length);
        }
      },
    });
  };

  render() {
    const { visible, loading, onCancel, onOk, selectionType } = this.props;
    const { autoGroupColumnDef, params, selectedRows, defaultColDef, preferred } = this.state;
    const tableProps = {
      requestUrl: `${process.env.API_BASE_PATH}/resource/components`, // 部署
      pagination: true,
      hideInputSearch: true,
      defaultSearch: {
        preferred,
        classificationId: params.classificationId,
        size: 15,
      },
      columns: [
        {
          title: '编号',
          key: 'code',
          width: 200,
          dataIndex: 'code',
          render: (text, record) => (
            <Tooltip title={text} placement="topLeft">
              <Space>
                <Icon style={{ width: 16 }} title="元器件" name="type/component.svg" />
                <Link to={`/resource/component/item/${record.id}/info`} target="component">
                  {text}
                </Link>
              </Space>
            </Tooltip>
          ),
        },
        {
          title: '名称',
          key: 'name',
          width: 120,
          dataIndex: 'name',
          render: text => (
            <Tooltip placement="topLeft" title={text}>
              {text}
            </Tooltip>
          ),
        },
        {
          title: '版本',
          dataIndex: 'version',
          key: 'version',
          width: 50,
          render: text => (
            <Tooltip placement="topLeft" title={text}>
              {text}
            </Tooltip>
          ),
        },
        {
          title: '状态',
          key: 'state',
          dataIndex: 'state',
          width: 80,
          render: text => (
            <Tooltip placement="topLeft" title={text}>
              {text}
            </Tooltip>
          ),
        },
        {
          title: '型号规格',
          key: 'modelSpecification',
          dataIndex: 'modelSpecification',
          width: 100,
          render: text => (
            <Tooltip placement="topLeft" title={text}>
              {text}
            </Tooltip>
          ),
        },
        {
          title: '生产厂家',
          key: 'manufacturer',
          dataIndex: 'manufacturer',
          width: 100,
          render: text => (
            <Tooltip placement="topLeft" title={text}>
              {text}
            </Tooltip>
          ),
        },
        {
          title: '质量等级',
          key: 'qualityLevel',
          dataIndex: 'qualityLevel',
          width: 120,
          render: text => (
            <Tooltip placement="topLeft" title={text}>
              {text}
            </Tooltip>
          ),
        },
        {
          title: '目录内外',
          key: 'schoolDirectory',
          dataIndex: 'schoolDirectory',
          width: 120,
          render: text => {
            switch (text) {
              case 'true':
                return '目录内';
              case 'false':
                return '目录外';
              default:
                return '';
            }
          },
        },
        {
          title: '质量保证等级',
          key: 'qualityGradeLevel',
          dataIndex: 'qualityGradeLevel',
          width: 120,
          render: text => (
            <Tooltip placement="topLeft" title={text}>
              {text}
            </Tooltip>
          ),
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
      selectionType: selectionType || 'checkbox',
      rowSelection: (_, rows) => this.setState({ selectedRows: rows }),
    };

    return (
      <Modal
        title="添加元器件"
        maskClosable={false}
        visible={visible}
        width={1300}
        bodyStyle={{ maxHeight: 500, overflow: 'scroll' }}
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
          <Sider theme="light" width={300} style={{ minHeight: 500 }}>
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
                isServerSideGroup={item => !item.leaf}
                getServerSideGroupKey={item => item.text}
                getRowNodeId={item => item.id}
                onGridReady={this.onGridReady}
                onRowClicked={item => this.setState({ params: { classificationId: item.data.id } })}
                localeText={AgGridLocaleText}
                rowSelection="multiple"
              />
            </div>
          </Sider>
          <Content>
            <Card
              type="inner"
              size="small"
              title="元器件列表"
              extra={
                <div>
                  <span>是否优选：</span>
                  <Select
                    style={{ width: 100 }}
                    value={preferred}
                    onChange={value => this.setState({ preferred: value })}
                  >
                    <Select.Option value={!!true}>是</Select.Option>
                    <Select.Option value={false}>否</Select.Option>
                  </Select>
                </div>
              }
              className="noPaddingCard"
            >
              {params.classificationId ? (
                <StandardDataTable
                  key={params.classificationId}
                  defaultSearch={{
                    classificationId: params.classificationId,
                    size: 15,
                  }}
                  {...tableProps}
                />
              ) : (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="请先选择元器件分类" />
              )}
            </Card>
          </Content>
        </Layout>
      </Modal>
    );
  }
}

export default ComponentsPanel;

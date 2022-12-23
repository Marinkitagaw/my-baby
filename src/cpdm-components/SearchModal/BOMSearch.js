import React, { useState } from 'react';
import { Tooltip } from 'antd';
import { Modal } from '@cpdm/components';
import moment from 'moment';
import { Link } from 'umi';
import { SettingOutlined } from '@ant-design/icons';
import { StandardDataTable } from 'cpdm-ui-components';

export default props => {
  const {
    dataType,
    visible,
    onOk,
    onCancel,
    selectionType,
    title,
    requestUrl,
    infoUrl,
    query = {},
  } = props;
  const [state, setState] = useState({
    selectedRowKeys: [],
    itemVisible: false,
    addVisible: false,
    loading: false,
    dataSource: [],
    tableProps: {
      requestUrl:
        requestUrl || `${process.env.API_BASE_PATH}/bom/${dataType.toLocaleLowerCase()}-parts`, // 部署
      pagination: true,
      columns: [
        {
          title: '编号',
          width: 180,
          dataIndex: 'code',
          ellipsis: true,
          render: (text, record) => (
            <Tooltip title={text} placement="topLeft">
              <Link
                to={
                  infoUrl
                    ? `${infoUrl}/${record.id}/info`
                    : `/data/bom/${dataType.toLocaleLowerCase()}/BOM/${record.id}`
                }
                target="bom"
              >
                <SettingOutlined title="部件" style={{ fontSize: 16, marginRight: 6 }} />
                {record.code}
              </Link>
            </Tooltip>
          ),
        },
        {
          title: '名称',
          width: 180,
          dataIndex: 'name',
          ellipsis: true,
          render: text => (
            <Tooltip placement="topLeft" title={text}>
              {text}
            </Tooltip>
          ),
        },
        {
          title: '版本',
          dataIndex: 'version',
          width: 70,
          ellipsis: true,
          render: text => (
            <Tooltip placement="topLeft" title={text}>
              {text}
            </Tooltip>
          ),
        },
        {
          title: '视图',
          dataIndex: 'viewName',
          width: 100,
          ellipsis: true,
          render: text => (
            <Tooltip placement="topLeft" title={text}>
              {text}
            </Tooltip>
          ),
        },
        {
          title: '状态',
          dataIndex: 'lifecycleStateName',
          width: 100,
          ellipsis: true,
          render: text => (
            <Tooltip placement="topLeft" title={text}>
              {text}
            </Tooltip>
          ),
        },
        {
          title: '密级',
          dataIndex: 'secretLevel',
          width: 70,
          ellipsis: true,
          render: text => (
            <Tooltip placement="topLeft" title={text}>
              {text}
            </Tooltip>
          ),
        },
        {
          title: '研制阶段',
          dataIndex: 'phaseMarkDisplay',
          width: 100,
          ellipsis: true,
          render: text => (
            <Tooltip placement="topLeft" title={text}>
              {text}
            </Tooltip>
          ),
        },
        {
          title: '库',
          dataIndex: 'repositoryName',
          width: 100,
          ellipsis: true,
          render: (text, record) => (
            <Tooltip placement="topLeft" title={record.repository && record.repository.name}>
              {record.repository && record.repository.name}
            </Tooltip>
          ),
        },
        {
          title: '型号代号',
          dataIndex: 'modelCode',
          width: 100,
          ellipsis: true,
          render: (text, record) => (
            <Tooltip placement="topLeft" title={text}>
              {record.repository && record.repository.modelCode}
            </Tooltip>
          ),
        },
        {
          title: '产品层级',
          width: 100,
          dataIndex: 'productLevelDisplay',
          ellipsis: true,
          render: text => (
            <Tooltip placement="topLeft" title={text}>
              {text}
            </Tooltip>
          ),
        },

        {
          title: '修改者',
          dataIndex: 'modifierFullName',
          width: 100,
          ellipsis: true,
          render: (text, record) => (
            <Tooltip placement="topLeft" title={text}>
              {record.modifier && record.modifier.fullName}
            </Tooltip>
          ),
        },
        {
          title: '修改时间',
          dataIndex: 'modifyStamp',
          width: 140,
          sorter: true,
          ellipsis: true,
          render(text) {
            return (
              <Tooltip placement="topLeft" title={text}>
                {moment(text).format('YYYY-MM-DD HH:mm')}
              </Tooltip>
            );
          },
        },
      ],
      hideInputSearch: true,
      defaultSearch: {
        ...query,
        size: 15,
      },
      searchBar: [
        { label: '编号', dataIndex: 'code' },
        { label: '名称', dataIndex: 'name' },
      ],

      selectionType: selectionType || 'checkbox',
      rowSelection: (keys, rows) =>
        setState({ ...state, selectedRowKeys: keys, selectedRows: rows }),
    },
  });

  const titles = {
    FUNCTION: '功能部件',
    DESIGN: '设计部件',
    PROCESS: '工艺部件',
    FACT: '实物部件',
    BATCH: '批次BOM',
  };

  return (
    <>
      <Modal
        title={requestUrl ? title : titles[dataType] || title}
        width={1200}
        visible={visible}
        onCancel={onCancel}
        onOk={() => onOk(state.selectedRows)}
      >
        <StandardDataTable
          childrenColumnName={[]}
          scroll={{ x: 1000 }}
          className="tableEllipsis"
          {...state.tableProps}
        />
      </Modal>
    </>
  );
};

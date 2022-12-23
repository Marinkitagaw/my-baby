import React, { PureComponent } from 'react';
import { connect } from 'umi';
import moment from 'moment';
import { DeleteOutlined, FileAddOutlined } from '@ant-design/icons';
import { Tooltip, Button, Card, Space, Table } from 'antd';
import { StandardDataTable, ItemPicker } from 'cpdm-ui-components';
import RowIcon from '@/pages/ChangeConfiguration/DataSendOrder/CollectingDataModal/GetRowIcon';
import { Fieldset } from '@cpdm/components';

import { Link } from 'umi';

const ButtonGroup = Button.Group;

class LinkedData extends PureComponent {
  state = {
    itemVisible: false,
    refreshKey: '',
    selectedData: {},
  };

  handleAdd = data => {
    this.setState({ refreshKey: Math.random() }, () => {
      this.hideItemPicker(data);
    });
  };

  handleRemove = typeKey => {
    const { dispatch } = this.props;
    const { selectedData } = this.state;
    dispatch({
      type: `common/removeRelationships`,
      payload: selectedData[typeKey],
      callback: res => {
        if (!res.message) {
          this.setState({ refreshKey: Math.random() });
        }
      },
    });
  };

  showItemPicker = type => {
    this.setState({ actionType: type, itemVisible: true });
  };

  hideItemPicker = () => {
    this.setState({ itemVisible: false, actionType: {} });
  };

  onRowChange = (typeKey, selectedKeys) => {
    const { selectedData } = this.state;
    selectedData[typeKey] = selectedKeys;
    this.setState({ selectedData });
  };

  render() {
    const { relateType = [], loading } = this.props;
    const { actionType = {}, itemVisible, refreshKey } = this.state;
    const columns = [
      {
        key: 'id',
        dataIndex: 'id',
        width: 50,
        render: (_, record) => record.objectType && <RowIcon objectType={record.objectType} />,
      },
      {
        title: '编号',
        key: 'code',
        dataIndex: 'code',
        sorter: true,
        width: 220,
        render: (text, record = {}) => (
          <Tooltip title={record.code} placement="topLeft">
            <Link to={record.infoUrl} target="_blank">
              {record.code}
            </Link>
          </Tooltip>
        ),
      },
      {
        title: '名称',
        key: 'name',
        width: 220,
        dataIndex: 'name',
        render: (text, record = {}) => (
          <Tooltip placement="topLeft" title={record.name}>
            {record.name}
          </Tooltip>
        ),
      },
      {
        title: '版本',
        dataIndex: 'version',
        render: (text, record = {}) => (
          <Tooltip placement="topLeft" title={record.version}>
            {record.version}
          </Tooltip>
        ),
      },
      {
        title: '状态',
        key: 'state',
        dataIndex: 'lifecycleStateName',
        render: (text, record = {}) => (
          <Tooltip placement="topLeft" title={record.lifecycleStateName}>
            {record.lifecycleStateName}
          </Tooltip>
        ),
      },
      {
        title: '密级',
        key: 'secretLevel',
        dataIndex: 'secretLevel',
        render: (text, record = {}) => (
          <Tooltip placement="topLeft" title={record.secretLevel}>
            {record.secretLevel}
          </Tooltip>
        ),
      },
      {
        title: '阶段标记',
        key: 'phaseMark',
        dataIndex: 'phaseMark',
        render: (text, record = {}) => (
          <Tooltip placement="topLeft" title={record.phaseMarkDisplay || record.phaseMark}>
            {record.phaseMarkDisplay || record.phaseMark}
          </Tooltip>
        ),
      },
      {
        title: '型号代号',
        key: 'modelCode',
        dataIndex: 'modelCode',
        render: (text, record = {}) => (
          <Tooltip placement="topLeft" title={record.repository && record.repository.modelCode}>
            {record.repository && record.repository.modelCode}
          </Tooltip>
        ),
      },
      {
        title: '所有者',
        key: 'owener',
        dataIndex: 'owener',
        render: (text, record = {}) => (
          <Tooltip placement="topLeft" title={record.owner && record.owner.fullName}>
            {record.owner && record.owner.fullName}
          </Tooltip>
        ),
      },
      {
        title: '修改者',
        key: 'modify',
        dataIndex: 'modifierFullName',
        render: (text, record = {}) => (
          <Tooltip placement="topLeft" title={record.modifier && record.modifier.fullName}>
            {record.modifier && record.modifier.fullName}
          </Tooltip>
        ),
      },
      {
        title: '修改时间',
        key: 'modifyStamp',
        dataIndex: 'modifyStamp',
        align: 'right',
        width: 160,
        sorter: true,
        render(text, record = {}) {
          return (
            <Tooltip placement="topLeft">
              {record.modifyStamp && moment(record.modifyStamp).format('YYYY-MM-DD HH:mm')}
            </Tooltip>
          );
        },
      },
    ];

    const tableProps = {
      pagination: false,
      columns,
      hideInputSearch: true,
    };

    const renderExtra = item => {
      const { actions } = item;
      return (
        actions && (
          <ButtonGroup>
            <Button disabled={!actions.add} size="small" onClick={() => this.showItemPicker(item)}>
              <FileAddOutlined /> 添加
            </Button>
            <Button
              disabled={!actions.remove}
              size="small"
              onClick={() => this.handleRemove(item.key)}
            >
              <DeleteOutlined />
              移除
            </Button>
          </ButtonGroup>
        )
      );
    };

    const ItemProps = {
      defaultType: actionType.key,
      host: process.env.API_BASE_PATH,
      title: `添加${actionType.title}`,
      multi: true,
      visible: itemVisible,
      onOk: this.handleAdd,
      onCancel: this.hideItemPicker,
      types: [actionType.key],
      confirmLoading: loading,
    };

    return (
      <Card size="small">
        <Space direction="vertical" style={{ width: '100%' }}>
          {relateType.map(item => (
            <Fieldset legend={item.title} extra={renderExtra(item)}>
              {item.url ? (
                <StandardDataTable
                  key={actionType.key === item.key ? `refresh${item.key}${refreshKey}` : item.key}
                  selectionType={item.actions && 'checkbox'}
                  rowSelection={item.actions && (keys => this.onRowChange(item.key, keys))}
                  requestUrl={item.url}
                  {...tableProps}
                />
              ) : (
                <Table columns={columns} />
              )}
            </Fieldset>
          ))}
        </Space>
        {itemVisible && <ItemPicker {...ItemProps} />}
      </Card>
    );
  }
}
export default connect(({ drawing, loading }) => ({
  drawing: drawing?.drawing,
  loading: loading.effects['common/createRelationships'],
}))(LinkedData);

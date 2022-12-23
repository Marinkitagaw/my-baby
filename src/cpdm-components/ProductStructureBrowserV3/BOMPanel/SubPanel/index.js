import React, { useEffect, useState } from 'react';
import { Card, Button, Popconfirm, Tooltip } from 'antd';
import Table from '@ant-design/pro-table';
import classNames from 'classnames';
import styles from '@/cpdm-components/ProductStructureBrowserV3/index.less';
import { stringify } from 'qs';
import { Link } from 'umi';
import moment from 'moment';
import { PlusSquareOutlined, FileAddOutlined, MinusSquareOutlined } from '@ant-design/icons';
import BOMsearch from '@/cpdm-components/SearchModal/BOMSearch';
import { request } from '@cpdm/util';
// import columns from '../columns';
import * as bomService from '@/services/data/bom';
import AddNewPartPicker from './addNewPartPicker';

// 获取下级部件
export async function loadSub(dataType, partId, params) {
  return request(
    `/bom/${dataType.toLowerCase()}-parts/${partId}/sub-parts${stringify(params, {
      addQueryPrefix: true,
    })}`,
  );
}

export default props => {
  const { type, id, data = {}, dataType, parentData, onChange, ...reset } = props;
  // const { actions = {} } = parentData;
  // const { ADDPART } = actions;
  const [state, setState] = useState({ loading: false, parts: [], searchVisible: false });
  const [addVisible, setAddVisible] = useState(false);
  if (!id) {
    return '请先选择左侧树节点。';
  }

  const removeAction = {
    FUNCTION: bomService.FPartRemoveStruture,
    DESIGN: bomService.DPartRemoveStruture,
    PROCESS: bomService.PPartRemoveStruture,
    FACT: bomService.FAPartRemoveStruture,
    SERVICE: bomService.SPartRemoveStruture,
    BATCH: bomService.BPartRemoveStruture,
  };

  const handleAdd = async (selected, addNewPart) => {
    if (selected && Array.isArray(selected)) {
      if (onChange) onChange('insert', selected[0]);
      setState({
        ...state,
        searchVisible: false,
        refreshKey: !addNewPart && Math.random(),
      });
      setAddVisible(false);
    }
  };

  const handleRemove = async keys => {
    const res = await removeAction[dataType](id, keys);
    if (res && Array.isArray(res)) {
      if (onChange) onChange('insert', res[0]);
      setState({ ...state, searchVisible: false, refreshKey: Math.random() });
    }
    if (!res) {
      if (onChange) onChange('insert', { id });
      setState({ ...state, refreshKey: Math.random() });
    }
    if (res && res.id) {
      if (onChange) onChange('insert', { id: res.id });
      setState({ ...state, refreshKey: Math.random() });
    }
  };

  const inserData = async selectedRows => {
    let res;
    switch (dataType) {
      case 'FUNCTION':
        res = await bomService.FPartAddStruture(
          id,
          selectedRows.map(item => ({ id: item.id, objectType: item.objectType })),
        );
        break;
      case 'DESIGN':
        res = await bomService.DPartAddStruture(
          id,
          selectedRows.map(item => ({ id: item.id, objectType: item.objectType })),
        );
        break;
      case 'PROCESS':
        res = await bomService.PPartAddStruture(
          id,
          selectedRows.map(item => ({ id: item.id, objectType: item.objectType })),
        );
        break;
      case 'FACT':
        res = await bomService.FAPartAddStruture(
          id,
          selectedRows.map(item => ({ id: item.id, objectType: item.objectType })),
        );
        break;
      case 'BATCH':
        res = await bomService.BPartAddStruture(
          id,
          selectedRows.map(item => ({ id: item.id, objectType: item.objectType })),
        );
        break;
      case 'SERVICE':
        res = await bomService.SPartAddStruture(
          id,
          selectedRows.map(item => ({ id: item.id, objectType: item.objectType })),
        );
        break;
      default:
        break;
    }
    if (res && res.id) {
      handleAdd([res]);
    }
  };

  const SearchProps = {
    visible: state.searchVisible,
    title: '添加数据',
    dataType,
    onCancel: () => setState({ ...state, searchVisible: false }),
    onOk: selectd => inserData(selectd),
  };

  const rowSelection = {
    onChange: selectedRowKeys => {
      setState({ ...state, selectedRowKeys });
    },
    columnWidth: 40,
  };

  useEffect(() => {
    (async () => {
      setState({ loading: true });
      const res = await loadSub(dataType, id, {
        loadMode: 1,
      });
      if (res && Array.isArray(res)) {
        setState({ parts: res, loading: false });
      } else {
        setState({ parts: [], loading: false });
      }
    })();
  }, [id, type, state.refreshKey, dataType]);

  const extraArr = [
    <Button size="small" type="primary" onClick={() => setState({ ...state, searchVisible: true })}>
      <PlusSquareOutlined />
      添加数据
    </Button>,
    <Button size="small" primary onClick={() => setAddVisible(true)}>
      <FileAddOutlined />
      插入新部件
    </Button>,
    <Popconfirm
      disabled={!state.selectedRowKeys || !state.selectedRowKeys.length}
      title="确定要移除选中数据吗？"
      okText="确定"
      cancelText="取消"
      onConfirm={() => handleRemove(state.selectedRowKeys)}
    >
      <Button
        size="small"
        title={(!state.selectedRowKeys || !state.selectedRowKeys.length) && '请至少选择一条数据。'}
        disabled={!state.selectedRowKeys || !state.selectedRowKeys.length}
        danger={state.selectedRowKeys && !!state.selectedRowKeys.length}
      >
        <MinusSquareOutlined /> 移除部件
      </Button>
    </Popconfirm>,
  ];

  const columns = [
    {
      title: '主题',
      dataIndex: 'subject',
      width: 200,
      ellipsis: true,
      render(text, record) {
        return (
          <Tooltip placement="topLeft" title={record.subject}>
            <Link to={`/data/bom/${dataType.toLowerCase()}/BOM/${record.id}`} target="sub_part">
              {record.subject}
            </Link>
          </Tooltip>
        );
      },
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
      width: 90,
      ellipsis: true,
      render(text) {
        return (
          <Tooltip placement="topLeft" title={text}>
            {text}
          </Tooltip>
        );
      },
    },
    {
      title: '阶段标记',
      dataIndex: 'phaseMarkDisplay',
      key: 'phaseMarkDisplay',
      width: 100,
      ellipsis: true,
      render(text) {
        return (
          <Tooltip placement="topLeft" title={text}>
            {text}
          </Tooltip>
        );
      },
    },
    {
      title: '型号产品',
      width: 135,
      ellipsis: true,
      dataIndex: 'repository',
      render(text, record = {}) {
        return (
          <Tooltip placement="topLeft" title={record.repository && record.repository.name}>
            {record.repository && record.repository.name}
          </Tooltip>
        );
      },
    },
    {
      title: '修改者',
      dataIndex: 'modifierFullName',
      width: 60,
      ellipsis: true,
      render(text, record = {}) {
        return (
          <Tooltip placement="topLeft" title={record.modifier && record.modifier.fullName}>
            {record.modifier && record.modifier.fullName}
          </Tooltip>
        );
      },
    },
    {
      title: '修改时间',
      dataIndex: 'modifyStamp',
      width: 135,
      ellipsis: true,
      render(text, record) {
        return (
          <Tooltip
            placement="topLeft"
            title={moment(record.modifyStamp).format('YYYY-MM-DD HH:mm')}
          >
            {moment(record.modifyStamp).format('YYYY-MM-DD HH:mm')}
          </Tooltip>
        );
      },
    },
  ];

  return (
    <>
      <Card size="small" className="noPaddingCard">
        <Table
          style={{ marginTop: 8 }}
          size="small"
          className={classNames(styles.proTableStyle, 'tableEllipsis')}
          dataSource={state.parts}
          rowKey={record => record.link && record.link.id}
          pagination={false}
          columns={columns}
          childrenColumnName={[]}
          loading={state.loading}
          rowSelection={rowSelection}
          search={false}
          tableAlertRender={false}
          dateFormatter="string"
          headerTitle="下级部件"
          options={{
            reload: false,
            density: false,
          }}
          // toolBarRender={() => (ADDPART === 0 ? extraArr : [])}
          toolBarRender={() => extraArr}
          scroll={{ x: 800 }}
        />
      </Card>

      {state.searchVisible && <BOMsearch {...SearchProps} />}
      {addVisible && (
        <AddNewPartPicker
          visible={addVisible}
          addFn={newPart => handleAdd([newPart], 'new')}
          data={data}
          id={id}
          dataType={dataType}
          onCancel={() => setAddVisible(false)}
          {...reset}
        />
      )}
    </>
  );
};

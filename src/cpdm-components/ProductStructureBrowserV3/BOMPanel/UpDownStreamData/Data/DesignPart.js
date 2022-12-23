import React, { useState, useEffect } from 'react';
import { Card, Button, Popconfirm, message, Tooltip } from 'antd';
import Table from '@ant-design/pro-table';
import classNames from 'classnames';
import styles from '@/cpdm-components/ProductStructureBrowserV3/index.less';
import { request } from '@cpdm/util';
import moment from 'moment';
import { stringify } from 'qs';
import { PlusSquareOutlined, FileAddOutlined, MinusSquareOutlined } from '@ant-design/icons';
import { Links } from '@/pages/ChangeConfiguration/DataSendOrder/CollectingDataModal/CellRenderer';
import BOMsearch from '@/cpdm-components/SearchModal/BOMSearch';
import * as bomService from '@/services/data/bom';
import AddNewPartPicker from '../../SubPanel/addNewPartPicker';

// 获取上下游
export async function loadUpDownData(cardType, dataType, partId, objectType) {
  const type = cardType === 'UP' ? 'up-parts' : 'down-parts';
  return request(
    `/bom/${dataType.toLowerCase()}-parts/${partId}/${type}${stringify(
      { objectType },
      { addQueryPrefix: true },
    )}`,
  );
}

export default props => {
  const { cardType, dataType, data = {}, id, objectType } = props;
  const [state, setState] = useState({
    selectedRowKeys: [],
    searchVisible: false,
    addVisible: false,
    loading: false,
    dataSource: [],
    refreshKey: '',
  });

  const removeUpFn = {
    FUNCTION: bomService.FPartRemoveUp,
    DESIGN: bomService.DPartRemoveUp,
    FACT: bomService.FAPartRemoveUp,
    SERVICE: bomService.SPartRemoveUp,
    PROCESS: bomService.PPartRemoveUp,
    BATCH: bomService.BPartRemoveUp,
  };

  const removeSubFn = {
    FUNCTION: bomService.FPartRemoveSub,
    DESIGN: bomService.DPartRemoveSub,
    FACT: bomService.FAPartRemoveSub,
    SERVICE: bomService.SPartRemoveSub,
    PROCESS: bomService.PPartRemoveSub,
    BATCH: bomService.BPartRemoveSub,
  };

  const handleRemove = async selectedRows => {
    let res;
    if (cardType === 'UP') {
      res = await removeUpFn[dataType](
        data.id,
        selectedRows.map(item => ({ id: item.id, objectType: item.objectType })),
      );
    } else {
      res = await removeSubFn[dataType](
        data.id,
        selectedRows.map(item => ({ id: item.id, objectType: item.objectType })),
      );
    }
    if (res || !res.message) {
      setState({ ...state, refreshKey: Math.random() });
    }
  };

  const insertUpFn = {
    FUNCTION: bomService.FPartAddUp,
    DESIGN: bomService.DPartAddUp,
    FACT: bomService.FAPartAddUp,
    SERVICE: bomService.SPartAddUp,
    PROCESS: bomService.PPartAddUp,
    BATCH: bomService.BPartAddUp,
  };

  const insertDownFn = {
    FUNCTION: bomService.FPartAddSub,
    DESIGN: bomService.DPartAddSub,
    FACT: bomService.FAPartAddSub,
    SERVICE: bomService.SPartAddSub,
    PROCESS: bomService.PPartAddSub,
    BATCH: bomService.BPartAddSub,
  };

  const inserData = async (selectd, newPart) => {
    let res;
    if (cardType === 'UP') {
      res = await insertUpFn[dataType](
        id,
        newPart
          ? [{ id: selectd[0].id, objectType: selectd[0].objectType }]
          : selectd.map(item => ({ id: item.id, objectType: item.objectType })),
      );
    } else {
      res = await insertDownFn[dataType](
        id,
        newPart
          ? [{ id: selectd[0].id, objectType: selectd[0].objectType }]
          : selectd.map(item => ({ id: item.id, objectType: item.objectType })),
      );
    }
    if (res && res.id) {
      message.success('添加成功。');
      setState({ ...state, refreshKey: Math.random(), searchVisible: false, addVisible: false });
    } else {
      message.error('添加失败。');
      setState({ ...state, searchVisible: false, addVisible: false });
    }
  };

  const SearchProps = {
    visible: state.searchVisible,
    title: '添加数据',
    dataType: 'DESIGN',
    onCancel: () => setState({ ...state, searchVisible: false }),
    onOk: selectd => inserData(selectd),
  };

  const AddProps = {
    visible: state.addVisible,
    addFn: newPart => inserData([newPart], true),
    data,
    id,
    dataType: 'DESIGN',
    cardType,
    onCancel: () => setState({ ...state, addVisible: false }),
  };

  useEffect(() => {
    (async () => {
      setState({ ...state, loading: true });
      const res = await loadUpDownData(cardType, dataType, id || data.id, objectType);
      if (res && Array.isArray(res)) {
        setState({ ...state, dataSource: res, loading: false });
      } else {
        setState({ ...state, dataSource: [], loading: false });
      }
    })();
  }, [cardType, data.id, dataType, id, objectType]);

  const columns = [
    {
      title: '主题',
      dataIndex: 'subject',
      width: '20%',
      ellipsis: true,
      render: (text, record) => (
        <Links colDef={{ urlDefinition: 'infoUrl', id: 'subject' }} data={record} target="_blank" />
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
      ellipsis: true,
      dataIndex: 'lifecycleStateName',
      width: 90,
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
      ellipsis: true,
      dataIndex: 'phaseMarkDisplay',
      key: 'phaseMarkDisplay',
      width: 90,
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
      ellipsis: true,
      dataIndex: 'modifierFullName',
      width: 60,
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
      ellipsis: true,
      dataIndex: 'modifyStamp',
      width: 135,
      render(text) {
        return (
          <Tooltip placement="topLeft" title={moment(text).format('YYYY-MM-DD HH:mm')}>
            {moment(text).format('YYYY-MM-DD HH:mm')}
          </Tooltip>
        );
      },
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setState({ ...state, selectedRowKeys, selectedRows });
    },
    columnWidth: 40,
  };

  return (
    <>
      <Card size="small" className="noPaddingCard">
        <Table
          style={{ marginTop: 1 }}
          size="small"
          className={classNames(styles.proTableStyle, 'tableEllipsis')}
          columns={columns}
          loading={state.loading}
          dataSource={state.dataSource || []}
          pagination={false}
          rowKey={record => record.id}
          rowSelection={rowSelection}
          search={false}
          tableAlertRender={false}
          dateFormatter="string"
          headerTitle="设计部件"
          options={{
            reload: false,
            density: false,
          }}
          childrenColumnName={[]}
          toolBarRender={() => [
            <Button
              size="small"
              type="primary"
              onClick={() => setState({ ...state, searchVisible: true })}
            >
              <PlusSquareOutlined />
              添加数据
            </Button>,
            <Button size="small" primary onClick={() => setState({ ...state, addVisible: true })}>
              <FileAddOutlined />
              插入新数据
            </Button>,
            <Popconfirm
              disabled={!state.selectedRowKeys || !state.selectedRowKeys.length}
              title="确定要移除选中数据吗？"
              okText="确定"
              cancelText="取消"
              onConfirm={() => handleRemove(state.selectedRows)}
            >
              <Button
                size="small"
                title={
                  (!state.selectedRowKeys || !state.selectedRowKeys.length) &&
                  '请至少选择一条数据。'
                }
                disabled={!state.selectedRowKeys || !state.selectedRowKeys.length}
                danger={state.selectedRowKeys && !!state.selectedRowKeys.length}
              >
                <MinusSquareOutlined /> 移除
              </Button>
            </Popconfirm>,
          ]}
        />
        {state.searchVisible && <BOMsearch {...SearchProps} />}
        {state.addVisible && <AddNewPartPicker {...AddProps} />}
      </Card>
    </>
  );
};

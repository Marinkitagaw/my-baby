import React, { useEffect, useState } from 'react';
import { Table, Button, Popconfirm } from 'antd';
import { stringify } from 'qs';
import { PlusSquareOutlined, FileAddOutlined, MinusSquareOutlined } from '@ant-design/icons';
import { ItemPicker } from 'cpdm-ui-components';
import { request } from '@cpdm/util';
import columns from '../columns';
import AddNewPartPicker from './addNewPartPicker';

// 获取相关部件
export async function loadSub(dataType, partId, params) {
  return request(
    `/bom/${dataType.toLowerCase()}-parts/${partId}/children${stringify(params, {
      addQueryPrefix: true,
    })}`,
  );
}

// 移除节点
async function removeNode(params) {
  return request(`/cpdm/parts/${params.partId}/relationship/remove?${stringify(params)}`, {
    method: 'DELETE',
    data: params.relationshipIds,
  });
}

export default props => {
  const { type, id, data = {}, dataType, onChange, ...reset } = props;
  const [state, setState] = useState({ loading: false, parts: [], itemVisible: false });

  const handleAdd = async (selected, addNewPart) => {
    if (selected && Array.isArray(selected)) {
      if (onChange) onChange('insert', selected[0]);
      setState({
        ...state,
        itemVisible: false,
        addVisible: false,
        refreshKey: !addNewPart && Math.random(),
      });
    }
  };

  const handleRemove = async keys => {
    const res = await removeNode({
      partId: id,
      relationshipIds: keys,
    });
    if (res && Array.isArray(res)) {
      if (onChange) onChange('insert', res[0]);
      setState({ ...state, itemVisible: false, refreshKey: Math.random() });
    }
    if (!res) {
      if (onChange) onChange('remove');
      setState({ ...state, refreshKey: Math.random() });
    }
  };

  const ItemProps = {
    defaultType: 'Part',
    host: process.env.API_BASE_PATH,
    title: `添加部件`,
    multi: true,
    visible: state.itemVisible,
    onOk: selectd => handleAdd(selectd),
    onCancel: () => setState({ ...state, itemVisible: false }),
    types: ['Part'],
    ...reset,
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

  return (
    <>
      <div>
        <Button
          size="small"
          type="primary"
          onClick={() => setState({ ...state, itemVisible: true })}
        >
          <PlusSquareOutlined />
          添加数据
        </Button>
        &nbsp;
        <Button size="small" primary onClick={() => setState({ ...state, addVisible: true })}>
          <FileAddOutlined />
          插入新部件
        </Button>
        &nbsp;
        <Popconfirm
          disabled={!state.selectedRowKeys || !state.selectedRowKeys.length}
          title="确定要移除选中数据吗？"
          okText="确定"
          cancelText="取消"
          onConfirm={() => handleRemove(state.selectedRowKeys)}
        >
          <Button
            size="small"
            title={
              (!state.selectedRowKeys || !state.selectedRowKeys.length) && '请至少选择一条数据。'
            }
            disabled={!state.selectedRowKeys || !state.selectedRowKeys.length}
            danger={state.selectedRowKeys && !!state.selectedRowKeys.length}
          >
            <MinusSquareOutlined /> 移除部件
          </Button>
        </Popconfirm>
      </div>
      <Table
        style={{ marginTop: 8 }}
        size="small"
        className="tableEllipsis"
        dataSource={state.parts}
        rowKey={record => record.relationshipData && record.relationshipData.id}
        pagination={false}
        columns={columns}
        childrenColumnName={[]}
        loading={state.loading}
        rowSelection={rowSelection}
      />
      {state.itemVisible && <ItemPicker {...ItemProps} />}
      {state.addVisible && (
        <AddNewPartPicker
          visible={state.addVisible}
          addFn={newPart => handleAdd([newPart], 'new')}
          data={data}
          id={id}
          dataType={dataType}
          onCancel={() => setState({ ...state, addVisible: false })}
          {...reset}
        />
      )}
    </>
  );
};

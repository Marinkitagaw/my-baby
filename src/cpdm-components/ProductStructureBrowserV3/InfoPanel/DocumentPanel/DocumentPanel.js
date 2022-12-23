import React, { useEffect, useState } from 'react';
import { Table, Button, Popconfirm } from 'antd';
import { stringify } from 'qs';
import { PlusSquareOutlined, FileAddOutlined, MinusSquareOutlined } from '@ant-design/icons';
import { ItemPicker } from 'cpdm-ui-components';
import { request } from '@cpdm/util';
import { createRelationships, removeRelationships } from '@/services/common';
import columns from '../columns';
import AddNewDocumentPicker from './addNewDocumentPicker';

// 获取相关文档
async function getRelateDocuments(id, type) {
  const q = {
    sourceType: type,
    targetType: 'Document',
  };
  return request(`/cpdm/relationship/source/${id}?${stringify(q)}`);
}

export default props => {
  const { type, id, data = {} } = props;
  const [state, setState] = useState({ loading: false, docs: [], itemVisible: false });

  const handleAdd = async (selected, addNewPart) => {
    const params = selected.map(item => ({
      sourceId: data.id,
      sourceType: data.objectType,
      targetId: item.id,
      targetType: item.objectType,
    }));
    const res = await createRelationships(params);
    if (!res) {
      setState({
        ...state,
        itemVisible: false,
        addVisible: false,
        refreshKey: addNewPart && Math.random(),
      });
    }
  };

  const handleRemove = async keys => {
    const res = await removeRelationships(keys);
    if (!res) {
      setState({ ...state, refreshKey: Math.random() });
    }
  };

  const ItemProps = {
    defaultType: 'Document',
    host: process.env.API_BASE_PATH,
    title: `添加文档`,
    multi: true,
    visible: state.itemVisible,
    onOk: selectd => handleAdd(selectd),
    onCancel: () => setState({ ...state, itemVisible: false }),
    types: ['Document'],
  };

  const rowSelection = {
    onChange: selectedRowKeys => {
      setState({ ...state, selectedRowKeys });
    },
    columnWidth: 30,
  };

  useEffect(() => {
    (async () => {
      setState({ loading: true });
      const res = await getRelateDocuments(id, type);
      if (res && Array.isArray(res)) {
        setState({ docs: res, loading: false });
      } else {
        setState({ docs: [], loading: false });
      }
    })();
  }, [id, type, state.refreshKey]);

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
          插入新文档
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
            <MinusSquareOutlined /> 移除文档
          </Button>
        </Popconfirm>
      </div>
      <Table
        style={{ marginTop: 8 }}
        size="small"
        className="tableEllipsis"
        dataSource={state.docs}
        rowKey={record => record.id}
        pagination={false}
        columns={columns}
        loading={state.loading}
        rowSelection={rowSelection}
      />
      {state.itemVisible && <ItemPicker {...ItemProps} />}
      {state.addVisible && (
        <AddNewDocumentPicker
          visible={state.addVisible}
          addFn={newDoc => handleAdd([newDoc], 'new')}
          data={data}
          onCancel={() => setState({ ...state, addVisible: false })}
        />
      )}
    </>
  );
};

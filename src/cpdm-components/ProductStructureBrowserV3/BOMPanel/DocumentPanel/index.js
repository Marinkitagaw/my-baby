import React, { useEffect, useState } from 'react';
import { Card, Button, Popconfirm } from 'antd';
import Table from '@ant-design/pro-table';
import classNames from 'classnames';
import styles from '@/cpdm-components/ProductStructureBrowserV3/index.less';
import { PlusSquareOutlined, FileAddOutlined, MinusSquareOutlined } from '@ant-design/icons';
import DocSearch from '@/cpdm-components/SearchModal/DocSearch';
import * as bomService from '@/services/data/bom';
import TypePicker from '@/pages/Cmis/BOM/DocForm/Create/DocTypePicker';
import AddNewDocumentPicker from './addNewDocumentPicker';
import columns from '../columns';

const LoadData = {
  FUNCTION: bomService.FPartDescribeDoc,
  DESIGN: bomService.DPartDescribeDoc,
  PROCESS: bomService.PPartDescribeDoc,
  FACT: bomService.FAPartDescribeDoc,
  SERVICE: bomService.SPartDescribeDoc,
  BATCH: bomService.BPartDescribeDoc,
};

const insertData = {
  FUNCTION: bomService.FPartAddDescribeDoc,
  DESIGN: bomService.DPartAddDescribeDoc,
  PROCESS: bomService.PPartAddDescribeDoc,
  FACT: bomService.FAPartAddDescribeDoc,
  SERVICE: bomService.SPartAddDescribeDoc,
  BATCH: bomService.BPartAddDescribeDoc,
};

const removeData = {
  FUNCTION: bomService.FPartRemoveDescribeDoc,
  DESIGN: bomService.DPartRemoveDescribeDoc,
  PROCESS: bomService.PPartRemoveDescribeDoc,
  FACT: bomService.FAPartRemoveDescribeDoc,
  SERVICE: bomService.SPartRemoveDescribeDoc,
  BATCH: bomService.BPartRemoveDescribeDoc,
};

export default props => {
  const {
    type,
    id,
    data = {},
    parentData = {},
    dataType,
    objectType,
    onChange,
    hideOptions,
    title,
    param,
  } = props;
  const { actions } = parentData;
  if (!id) {
    return '请先选择BOM节点。';
  }
  const [state, setState] = useState({ loading: false, docs: [], itemVisible: false });
  const [selectTypeVisible, setSelectedTypeVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAdd = async (selected, addNewPart) => {
    setLoading(true);
    const params = selected.map(item => ({
      id: item.id,
      objectType: item.objectType,
    }));
    const res = await insertData[dataType](data.id || id, params);
    setLoading(false);
    if (res && res.id) {
      setState({
        ...state,
        itemVisible: false,
        addVisible: false,
        refreshKey: addNewPart && Math.random(),
      });
      if (onChange) onChange('insert', res);
    }
  };

  const handleRemove = async keys => {
    const res = await removeData[dataType](data.id || id, keys);
    if (!res) {
      if (onChange) onChange('insert', { id });
      setState({ ...state, refreshKey: Math.random() });
    }
  };

  const ItemProps = {
    defaultType: 'Document',
    host: process.env.API_BASE_PATH,
    title: `添加文档`,
    multi: true,
    dataType,
    visible: state.itemVisible,
    onOk: selectd => handleAdd(selectd),
    onCancel: () => setState({ ...state, itemVisible: false }),
    loading: loading,
  };

  const rowSelection = {
    onChange: selectedRowKeys => {
      setState({ ...state, selectedRowKeys });
    },
    columnWidth: 40,
  };

  const setAddNewDoc = docType => {
    setState({ ...state, docType, addVisible: true });
    setSelectedTypeVisible(false);
  };

  const typePickerProps = {
    visible: selectTypeVisible,
    // dataType,
    onCancel: () => setSelectedTypeVisible(false),
    onOk: docType => setAddNewDoc(docType),
  };

  useEffect(() => {
    (async () => {
      setState({ loading: true });
      const res = await LoadData[dataType](id, type, objectType, param);
      if (res && Array.isArray(res)) {
        setState({ docs: res, loading: false });
      } else {
        setState({ docs: [], loading: false });
      }
    })();
  }, [id, type, objectType, state.refreshKey, dataType, param]);

  const extraArr = [
    <Button size="small" type="primary" onClick={() => setState({ ...state, itemVisible: true })}>
      <PlusSquareOutlined />
      添加数据
    </Button>,
    <Button size="small" primary onClick={() => setSelectedTypeVisible(true)}>
      <FileAddOutlined />
      插入新文档
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
        <MinusSquareOutlined /> 移除文档
      </Button>
    </Popconfirm>,
  ];

  return (
    <>
      <Card size="small" className="noPaddingCard">
        <Table
          style={{ marginTop: 8 }}
          size="small"
          className={classNames(styles.proTableStyle, 'tableEllipsis')}
          dataSource={state.docs}
          rowKey={record => (record.link && record.link.id) || record.id}
          pagination={false}
          columns={columns.map(item => ({ ...item, ellipsis: true }))}
          loading={state.loading}
          rowSelection={!hideOptions && rowSelection}
          search={false}
          tableAlertRender={false}
          dateFormatter="string"
          headerTitle={title || '相关文档'}
          options={{
            reload: false,
            density: false,
          }}
          toolBarRender={() =>
            !hideOptions && actions && actions.ADDDOCUMENT === 0 ? extraArr : []
          }
          scroll={{ x: 800 }}
        />
        {/* {state.itemVisible && <ItemPicker {...ItemProps} />} */}
        {state.itemVisible && <DocSearch {...ItemProps} />}
        {state.addVisible && (
          <AddNewDocumentPicker
            visible={state.addVisible}
            addFn={newDoc => handleAdd([newDoc], 'new')}
            data={data}
            loading={loading}
            dataType={dataType}
            docType={state.docType}
            onCancel={() => setState({ ...state, addVisible: false })}
          />
        )}
        {selectTypeVisible && <TypePicker {...typePickerProps} />}
      </Card>
    </>
  );
};

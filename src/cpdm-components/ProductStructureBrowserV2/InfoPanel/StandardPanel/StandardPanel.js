import React, { useEffect, useState } from 'react';
import { Table, Button, Popconfirm } from 'antd';
import { stringify } from 'qs';
import {
  PlusSquareOutlined,
  FileAddOutlined,
  MinusSquareOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import { ItemPicker } from 'cpdm-ui-components';
import { request } from '@cpdm/util';
import ImportDataModal from '@/cpdm-components/ImportData';
import columns from '../columns';
import AddNewPartPicker from './addNewPartPicker';

// 获取相关部件
export async function loadStructureRequest(partId, params) {
  return request(`/cpdm/psb/${partId}/structure${stringify(params, { addQueryPrefix: true })}`);
}

async function addExistingParts(partId, links) {
  return request(`/cpdm/psb/${partId}/sub-parts`, { method: 'POST', data: links });
}

// 移除节点
async function removeNode(params) {
  return request(`/cpdm/parts/${params.partId}/relationship/remove?${stringify(params)}`, {
    method: 'DELETE',
    data: params.relationshipIds,
  });
}

export default props => {
  const { type, id, data = {}, dispatch } = props;
  const [state, setState] = useState({
    loading: false,
    parts: [],
    itemVisible: false,
    importDataModelVisible: false,
  });

  const handleAdd = async (selected, addNewPart) => {
    console.log('selected', selected);
    const res = await addExistingParts(
      data.id,
      selected.map(d => ({
        usedByPartId: data.id,
        usesPartMasterId: d.masterId,
        unit: data.defaultUnit,
        amount: 1,
        usesPartType: 'standard.Master',
      }))
    );
    if (res && Array.isArray(res)) {
      const { onChange } = props;
      if (onChange) onChange('insert', res[0]);
      setState({
        ...state,
        itemVisible: false,
        addVisible: false,
        importDataModelVisible: false,
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
      const { onChange } = props;
      if (onChange) onChange('insert', res[0]);
      setState({ ...state, itemVisible: false, refreshKey: Math.random() });
    }
    if (!res) {
      const { onChange } = props;
      if (onChange) onChange('remove');
      setState({ ...state, refreshKey: Math.random() });
    }
  };

  const ItemProps = {
    defaultType: 'Part',
    host: process.env.API_BASE_PATH,
    title: `添加部件`,
    defaultSearch: {
      productCategory: 'B',
    },
    multi: true,
    visible: state.itemVisible,
    onOk: selectd => handleAdd(selectd),
    onCancel: () => setState({ ...state, itemVisible: false }),
    types: ['Part'],
  };

  const rowSelection = {
    onChange: selectedRowKeys => {
      setState({ ...state, selectedRowKeys });
    },
    columnWidth: 40,
  };

  const importDataProps = {
    title: '导入标准件',
    visible: state.importDataModelVisible,
    dispatch,
    downLoadUrl: 'psb/template/standard',
    importUrl: `psb/importStandard`,
    importParams: {
      partId: id,
    },
    onOk: res => {
      handleAdd(res);
    },
    onCancel: () => setState({ ...state, importDataModelVisible: false }),
  };

  useEffect(() => {
    (async () => {
      setState({ loading: true });
      const res = await loadStructureRequest(id, {
        loadMode: 1,
        productCategory: 'standard',
      });
      if (res && Array.isArray(res)) {
        setState({ parts: res, loading: false });
      } else {
        setState({ parts: [], loading: false });
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
          插入新标准件
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
            <MinusSquareOutlined /> 移除
          </Button>
        </Popconfirm>
        &nbsp;
        <Button
          size="small"
          primary
          onClick={() => setState({ ...state, importDataModelVisible: true })}
        >
          <DownloadOutlined />
          导入
        </Button>
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
          onCancel={() => setState({ ...state, addVisible: false })}
        />
      )}
      {state.importDataModelVisible && <ImportDataModal {...importDataProps} />}
    </>
  );
};

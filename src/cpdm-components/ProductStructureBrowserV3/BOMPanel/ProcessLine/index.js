import React, { useEffect, useState } from 'react';
import { Card, Button, Popconfirm, Tooltip, Table, Space, Modal } from 'antd';
import classNames from 'classnames';
import styles from '@/cpdm-components/ProductStructureBrowserV3/index.less';
import { stringify } from 'qs';
import { Link } from 'umi';
import moment from 'moment';
import { PlusSquareOutlined, FileAddOutlined, MinusSquareOutlined } from '@ant-design/icons';
import { request } from '@cpdm/util';
// import columns from '../columns';
import * as bomService from '@/services/data/bom';
import { Fieldset } from '@/pages/Dashboard/DataTable';
import AddModal from './addModal';
import { uuid } from '@cpdm/util';

// 获取关联工艺路线
export async function loadSub(partId) {
  return request(`/mpm/process-parts/${partId}/process-routes`);
}

// 获取关联工艺路线
export async function loadAddLine(partId, params) {
  return request(`/mpm/process-parts/${partId}/process-routes`, {
    method: 'POST',
    data: params,
  });
}

export default props => {
  const { type, id, data = {}, dataType, parentData, onChange } = props;
  // const { actions = {} } = parentData;
  // const { ADDPART } = actions;
  const [state, setState] = useState({
    loading: false,
    parts: [],
    searchVisible: false,
    addVisible: false,
    gridKey: uuid(),
    tableKey: uuid(),
  });
  const [dataLine, setDataLine] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  // const onRowStyle = useRef();
  const [loading, setLoading] = useState(false);
  if (!id) {
    return '请先选择左侧树节点。';
  }

  const hasSelected = selectedRowKeys.length > 0;
  const extraArr = (
    <Space>
      <Button
        size="small"
        type="primary"
        onClick={() => {
          setState({ ...state, addVisible: true });
        }}
      >
        <PlusSquareOutlined />
        添加数据
      </Button>
      <Popconfirm
        title="确定要移除选中数据吗？"
        okText="确定"
        cancelText="取消"
        onConfirm={async () => {
          setLoading(true);
          const res = await request(`/mpm/process-parts/${id}/process-routes`, {
            method: 'DELETE',
            data: selectedRowKeys,
          });
          setLoading(false);
        }}
      >
        <Button size="small" title={hasSelected && '请至少选择一条数据。'} disabled={!hasSelected}>
          <MinusSquareOutlined /> 移除
        </Button>
      </Popconfirm>
    </Space>
  );
  const columns = [
    // {
    //   title: '',
    //   key: 'index',
    //   dataIndex: 'index',
    //   renderType: 'Index',
    //   width: 40,
    //   suppressSizeToFit: true,
    //   resizable: false,
    //   maxWidth: 40,
    // },
    {
      title: '编号',
      dataIndex: 'code',
      // id: 'code',
      renderType: 'routeCode',
      width: 160,
      sortable: true,
      suppressSizeToFit: true,
      minWidth: 160,
      render: text => <a>{text}</a>,
    },
    {
      title: '名称',
      dataIndex: 'name',
      width: 160,
      sortable: true,
      suppressSizeToFit: true,
      minWidth: 160,
    },
    {
      title: '车间',
      width: 350,
      dataIndex: 'workshop',
      renderType: 'WorkShop',
      suppressSizeToFit: true,
    },
    {
      title: '状态',
      width: 100,
      dataIndex: 'lifecycleStateName',
    },
    {
      title: '创建者',
      width: 100,
      dataIndex: 'creator.fullName',
    },
    {
      title: '创建时间',
      dataIndex: 'createStamp',
      width: 200,
      minWidth: 200,
      renderType: 'TimeStamp',
      sortable: true,
    },
  ];

  const proColumns = [
    {
      title: '序号',
      render: (_, row, index) => <>{index + 1}</>,
    },
    {
      title: '车间',
      dataIndex: 'processWorkshopName',
      render: (_, record) => {
        return <>{record?.processWorkshop?.name}</>;
      },
    },
    {
      title: '负责人',
      dataIndex: 'principalFullName',
      render: (_, record) => {
        return <>{record?.processWorkshop?.principalFullName}</>;
      },
    },
    {
      title: '工序',
      dataIndex: 'processDisplay',
      render: (_, record) => {
        return <>{record.processDisplay}</>;
      },
    },
    {
      title: '所属工艺规程',
      dataIndex: 'name',
      render: (_, record) => {
        return <Link to={`/SecondaryProcess/detail/${record.id}/PLAN`}>{record?.name}</Link>;
      },
    },
  ];
  useEffect(() => {
    (async () => {
      setState({ loading: true });
      const res = await loadSub(id);
      // onRowStyle.current = res?.[0]?.id;
      lineData(res?.[0]);
      if (res && Array.isArray(res)) {
        setState({ parts: res, loading: false });
      } else {
        setState({ parts: [], loading: false });
      }
    })();
  }, [id, type, state.tableKey, dataType, loading]);

  //获取关联归集
  const lineData = async record => {
    const res = await request(`/mpm/process-routes/${record.id}/plans`);
    if (res) {
      setDataLine(res);
    }
  };

  const addLine = async data => {
    const res = await loadAddLine(id, data);
    if (res) {
      setState({ ...state, addVisible: false, gridKey: uuid(), tableKey: uuid() });
    }
  };

  const onSelectChange = selectedRows => {
    setSelectedRowKeys(selectedRows);
  };
  // const setClassName = (record, index) => {
  //   //判断索引相等时添加行的高亮样式
  //   return record.id === onRowStyle.current ? `l-table-row-active` : '';
  // };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  return (
    <>
      <Card size="small" className="noPaddingCard">
        <Fieldset legend="工艺路线" extra={extraArr}>
          <div>
            <Table
              size="small"
              key={state.tableKey}
              rowKey={r => r.id}
              // rowClassName={setClassName} //表格行点击高亮
              onRow={record => {
                return {
                  onClick: event => {
                    lineData(record);
                    // onRowStyle.current = record.id;
                  },
                };
              }}
              bordered
              style={{
                border: '1px solid #EBEDED',
              }}
              columns={columns}
              dataSource={state.parts}
              pagination={false}
              rowSelection={rowSelection}
            />
          </div>
        </Fieldset>
        <Fieldset legend="工艺路线归集">
          <div>
            <Table
              size="small"
              rowKey={r => r.id}
              bordered
              style={{
                border: '1px solid #EBEDED',
              }}
              columns={proColumns}
              dataSource={dataLine}
              pagination={false}
            />
          </div>
        </Fieldset>
        {state.addVisible && (
          <AddModal
            visible={state.addVisible}
            onCancel={() => {
              setState({ ...state, addVisible: false });
            }}
            onOk={addLine}
            gridKey={state.gridKey}
          />
        )}
      </Card>
    </>
  );
};

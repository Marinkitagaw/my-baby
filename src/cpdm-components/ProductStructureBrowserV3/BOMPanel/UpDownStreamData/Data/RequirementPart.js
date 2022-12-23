import styles from '@/cpdm-components/ProductStructureBrowserV3/index.less';
import Table from '@ant-design/pro-table';
import { request } from '@cpdm/util';
import { Card } from 'antd';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import columns from '../../columns';

// 获取上下游
export async function loadUpDownData(cardType, dataType, partId) {
  return request(`/requirement/parts/${partId}/requirements`);
}

export default props => {
  const { cardType, dataType, data = {}, id } = props;
  const [state, setState] = useState({
    selectedRowKeys: [],
    itemVisible: false,
    addVisible: false,
    dataSource: [],
    loading: false,
  });

  useEffect(() => {
    (async () => {
      setState({ ...state, loading: true });
      const res = await loadUpDownData(cardType, dataType, id || data.id);
      if (res && Array.isArray(res)) {
        setState({ ...state, dataSource: res, loading: false });
      } else {
        setState({ ...state, dataSource: [], loading: false });
      }
    })();
  }, [cardType, data.id, dataType, id]);

  return (
    <>
      <Card size="small" className="noPaddingCard">
        <Table
          style={{ marginTop: 1 }}
          size="small"
          className={classNames(styles.proTableStyle, 'tableEllipsis')}
          columns={columns}
          dataSource={state.dataSource || []}
          pagination={false}
          loading={state.loading}
          rowKey={record => record.id}
          search={false}
          childrenColumnName={[]}
          tableAlertRender={false}
          dateFormatter="string"
          headerTitle="需求"
          options={{
            reload: false,
            density: false,
          }}
          // toolBarRender={() => [
          //   <Tooltip placement="topLeft" title={prompt}>
          //     <Button
          //       size="small"
          //       type="primary"
          //       disabled
          //       onClick={() => setState({ ...state, itemVisible: true })}
          //     >
          //       <PlusSquareOutlined />
          //       添加数据
          //     </Button>
          //   </Tooltip>,
          //   <Popconfirm
          //     disabled={!state.selectedRowKeys || !state.selectedRowKeys.length}
          //     title="确定要移除选中数据吗？"
          //     okText="确定"
          //     cancelText="取消"
          //     onConfirm={() => handleRemove(state.selectedRowKeys)}
          //   >
          //     <Button
          //       size="small"
          //       title={
          //         (!state.selectedRowKeys || !state.selectedRowKeys.length) &&
          //         '请至少选择一条数据。'
          //       }
          //       disabled={!state.selectedRowKeys || !state.selectedRowKeys.length}
          //       danger={state.selectedRowKeys && !!state.selectedRowKeys.length}
          //     >
          //       <MinusSquareOutlined /> 移除
          //     </Button>
          //   </Popconfirm>,
          // ]}
        />
      </Card>
    </>
  );
};

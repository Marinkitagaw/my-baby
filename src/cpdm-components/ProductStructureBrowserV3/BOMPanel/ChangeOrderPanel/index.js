import React, { useState } from 'react';
import { Table, Card } from 'antd';
import columns from './columns';

export default props => {
  const { data = {} } = props;
  const [state, setState] = useState({
    loading: false,
    parts: [],
    itemVisible: false,
    importDataModelVisible: false,
  });

  const rowSelection = {
    onChange: selectedRowKeys => {
      setState({ ...state, selectedRowKeys, ...data });
    },
    columnWidth: 40,
  };

  return (
    <>
      <div>
        <Card size="small" title="更改单" className="noPaddingCard">
          <Table
            style={{ marginTop: 8 }}
            size="small"
            className="tableEllipsis"
            dataSource={state.parts}
            pagination={false}
            columns={columns}
            childrenColumnName={[]}
            loading={state.loading}
            rowSelection={rowSelection}
          />
        </Card>
      </div>
    </>
  );
};

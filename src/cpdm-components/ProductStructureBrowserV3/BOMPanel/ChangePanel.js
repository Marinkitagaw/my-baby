import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { stringify } from 'qs';
import { request } from '@cpdm/util';
import { Fieldset } from '@cpdm/components';
import columns from './columns';

// 获取相关更改单
async function getChangeRecords(params) {
  return request(`/change/change-records/orders?${stringify(params)}`);
}

export default props => {
  const { id, type } = props;
  const [state, setState] = useState({ loading: false, ecns: [] });
  useEffect(() => {
    (async () => {
      setState({ loading: true });
      const res = getChangeRecords({ objectId: id, objectType: type, type: 1 });
      if (res && Array.isArray(res)) {
        setState({ ecns: res, loading: false });
      } else {
        setState({ ecns: [], loading: false });
      }
    })();
  }, [type, id]);
  return (
    <>
      <Fieldset style={{ margin: '20px 0' }} legend="问题报告">
        问题报告
      </Fieldset>
      <Fieldset style={{ margin: '20px 0' }} legend="更改请求">
        更改请求
      </Fieldset>
      <Fieldset style={{ margin: '20px 0' }} legend="更改单">
        <Table
          size="small"
          dataSource={state.ecns}
          rowKey={record => record.id}
          pagination={false}
          columns={columns}
          loading={state.loading}
        />
      </Fieldset>
    </>
  );
};

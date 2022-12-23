import React, { useState, useEffect, useMemo } from 'react';
import { StandardDataTable } from 'cpdm-ui-components';
import moment from 'moment';
import { Tooltip } from 'antd';
import RowIcon from '@/pages/ChangeConfiguration/DataSendOrder/CollectingDataModal/GetRowIcon';

const otherColumns = [
  {
    title: '更改说明',
    dataIndex: 'note',
  },
  {
    title: '修改者',
    width: '10%',
    dataIndex: 'modifier',
    render: (v, r) => <span>{r.modifier && r.modifier.fullName}</span>,
  },
  {
    title: '修改时间',
    width: '20%',
    key: 'modifyStamp',
    dataIndex: 'modifyStamp',
    align: 'center',
    render(text) {
      return text && moment(text).format('YYYY-MM-DD HH:mm');
    },
  },
];

export default props => {
  const { type, id, handler = {}, data = {}, requestUrl } = props;
  const basicColumns = useMemo(
    () => [
      {
        key: 'icon',
        dataIndex: 'icon',
        width: 36,
        render: (v, r) =>
          r.icon && <img alt="" height="25" src={`${process.env.API_BASE_PATH}/${r.icon}`} />,
      },
      {
        key: 'id',
        dataIndex: 'id',
        width: 36,
        render: (text, record) => <RowIcon objectType={record.objectType} />,
      },
      {
        title: '版本',
        width: '10%',
        dataIndex: 'version',
        render: (v, r) => (
          <a onClick={() => handler.version(r.id, { objectType: r.objectType })}>
            {`${v}`}
            {r.status && r.status.status === 'PWC' && `(${r.status.description})`}
          </a>
        ),
      },
      {
        title: '状态',
        width: '10%',
        dataIndex: 'lifecycleStateName',
      },
    ],
    [handler],
  );

  const [columns, setColumns] = useState([...basicColumns, ...otherColumns]);

  const docPrimary = useMemo(
    () => [
      {
        title: '主内容',
        width: '20%',
        dataIndex: 'primary',
        render: (v, r) => (
          <Tooltip placement="topLeft" title={r.primaryContent && r.primaryContent.name}>
            <a
              target="_self"
              href={`${process.env.TASK_PATH}${r.primaryContent && r.primaryContent.downloadUri}`}
            >
              {r.primaryContent && r.primaryContent.name}
            </a>
          </Tooltip>
        ),
      },
    ],
    [],
  );

  const commonHistoryUrl = `/bom/iterates/${type}/${id}/history`;

  const tableProps = {
    columns,
    pagination: false,
    requestUrl: `${process.env.API_BASE_PATH}${requestUrl || commonHistoryUrl}`,
    rowKey: record => record.id,
    rowSelection: false,
    Bordered: true,
    size: 'small',
    hideInputSearch: true,
  };

  useEffect(() => {
    (async () => {
      const objectType = (!!data && data.objectType) || '';
      if (objectType.includes('Document')) {
        setColumns([...basicColumns, ...docPrimary, ...otherColumns]);
      }
    })();
  }, [basicColumns, data, docPrimary, id]);

  return <StandardDataTable {...tableProps} />;
};

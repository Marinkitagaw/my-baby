import React from 'react';
import { Drawer, Table, Tooltip } from 'antd';
import { Link } from 'umi';
import moment from 'moment';
import { Fieldset } from '@cpdm/components';
import styles from '@/styles/common.less';

const columns = [
  {
    title: '编号',
    dataIndex: 'code',
    width: '20%',
    render(text, record) {
      return (
        <Tooltip placement="topLeft" title={text}>
          <Link to={`/configuration/change-order/${record.id}/info`} target="_blank">
            {record.code}
          </Link>
        </Tooltip>
      );
    },
  },
  {
    title: '名称',
    dataIndex: 'name',
    width: '20%',
    render(text) {
      return (
        <Tooltip placement="topLeft" title={text}>
          {text}
        </Tooltip>
      );
    },
  },
  {
    title: '状态',
    dataIndex: 'lifecycleStateName',
    width: 90,
    render(text, record) {
      return (
        <Tooltip placement="topLeft" title={text || record.lifecycleStateDisplay || record.state}>
          {text || record.lifecycleStateDisplay || record.state}
        </Tooltip>
      );
    },
  },
  {
    title: '阶段标记',
    dataIndex: 'phaseMarkDisplay',
    key: 'phaseMark',
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
    title: '库',
    width: 135,
    dataIndex: 'repositoryName',
    render(text, record) {
      return (
        <Tooltip placement="topLeft" title={text || record.containerName}>
          {text || record.containerName}
        </Tooltip>
      );
    },
  },
  {
    title: '修改者',
    dataIndex: 'modifierFullName',
    width: 60,
    render(text) {
      return (
        <Tooltip placement="topLeft" title={text}>
          {text}
        </Tooltip>
      );
    },
  },
  {
    title: '修改时间',
    dataIndex: 'modifyStamp',
    width: 135,
    render(text) {
      return (
        <Tooltip placement="topLeft" title={text}>
          {text && moment(text).format('YYYY-MM-DD HH:mm')}
        </Tooltip>
      );
    },
  },
];
export default props => {
  const { visible, changeRecords = [], onClose } = props;
  return (
    <Drawer visible={visible} title="相关数据" width={800} onClose={onClose}>
      <Fieldset legend="相关更改单">
        <Table
          size="small"
          dataSource={changeRecords}
          className={styles.tableEllipsis}
          rowKey={record => record.id}
          pagination={false}
          columns={columns}
        />
      </Fieldset>
    </Drawer>
  );
};

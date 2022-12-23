import React from 'react';
import { Card, Table, Tooltip } from 'antd';
import moment from 'moment';
import { Link } from 'umi';
import { Fieldset } from '@cpdm/components';

export default props => {
  const linkProcessInfo = record => {
    const { route = {} } = props;
    switch (route.name) {
      case 'requirement':
        return `/app/requirement/${record.id}/processInfo`;
      case 'meeting':
        return `/app/meeting/task/${record.id}/processInfo`;
      case 'dataPackage':
        return `/app/productPacket/myTask/${record.id}/processInfo`;
      case 'technicalNotice':
        return `/configuration/technical-notice/task/${record.id}/processInfo`;
      case 'document':
        return `/data/document/task/${record.id}/processInfo`;
      case 'part':
        return `/data/part/task/${record.id}/processInfo`;
      case 'cbb':
        return `/resource/cbb/task/${record.id}/processInfo`;
      default:
        return `/work/process/${record.id}/processInfo`;
    }
  };
  const { proccessInstanceDatas = [], changeProcessInstanceId, processInstanceId, loading } = props;
  const columns = [
    {
      title: '流程名称',
      dataIndex: 'processDefinitionName',
      key: 'processDefinitionName',
      width: '15%',
    },
    {
      title: '主题',
      dataIndex: 'subject',
      key: 'subject',
      render: (text, record) => (
        <Link target="_processInfo" to={linkProcessInfo(record)}>
          {text}
        </Link>
      ),
    },
    {
      title: '任务环节',
      dataIndex: 'activeTaskNames',
      key: 'activeTaskNames',
      width: 120,
    },
    {
      title: '创建人',
      dataIndex: 'startUserName',
      key: 'startUserName',
      width: '10%',
    },

    {
      title: '开始时间',
      dataIndex: 'startTime',
      key: 'startTime',
      width: '10%',
      render: text => (
        <Tooltip placement="topLeft" title={text}>
          {moment(text).format('YYYY-MM-DD HH:mm')}
        </Tooltip>
      ),
    },
  ];
  return (
    <>
      <Card bordered={false}>
        <Fieldset legend="流程实例">
          <Table
            rowKey={record => record.id}
            pagination={false}
            dataSource={proccessInstanceDatas || []}
            columns={columns}
            bordered
            loading={loading}
            size="middle"
            className="tableEllipsis"
            onRow={record => {
              return {
                onClick: () => changeProcessInstanceId(record.id),
              };
            }}
            rowClassName={record => (record.id === processInstanceId ? 'selectedRow' : '')}
          />
        </Fieldset>
      </Card>
    </>
  );
};

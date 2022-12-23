import React from 'react';
import { Tooltip } from 'antd';
import moment from 'moment';

// 获取详情
const getChangeInfo = (record, isEdit) => {
  setState({
    ...state,
    changeId: record.id,
    isEdit,
    addVisible: true,
  });
};
export default [
  {
    title: '序号',
    dataIndex: 'index',
    width: 50,
    render: (text, record, index) => <span>{index + 1}</span>,
  },
  {
    title: '编号',
    dataIndex: 'code',
    width: 150,
    render: (text, record) => (
      <Tooltip title={text}>
        <a onClick={() => getChangeInfo(record, false)}>{text}</a>
      </Tooltip>
    ),
  },
  {
    title: '名称',
    dataIndex: 'name',
    width: 150,
    render: text => <Tooltip title={text}>{text}</Tooltip>,
  },
  {
    title: '更改类别',
    dataIndex: 'changeType',
    width: 100,
    render: text => <Tooltip title={text}>{text}</Tooltip>,
  },
  {
    title: '更改原因',
    dataIndex: 'changeReason',
    width: 100,
    render: text => <Tooltip title={text}>{text}</Tooltip>,
  },
  {
    title: '密级',
    dataIndex: 'secretLevel',
    width: 50,
  },
  {
    title: '修改者',
    dataIndex: 'modifier',
    width: 100,
  },
  {
    title: '修改时间',
    dataIndex: 'modifyStamp',
    width: 140,
    render: text => text && moment(text).format('YYYY-MM-DD HH:mm'),
  },
  {
    title: '操作',
    dataIndex: 'edit',
    width: 80,
    render: (text, record) => (
      <div>
        {isEditPackage && (
          <Button size="small" type="primary" onClick={() => getChangeInfo(record, true)}>
            编辑
          </Button>
        )}
      </div>
    ),
  },
];

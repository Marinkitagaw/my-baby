import React, { PureComponent } from 'react';
import { CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { Table, Tooltip } from 'antd';
import moment from 'moment';

export default class ProcessData extends PureComponent {
  render() {
    const columns1 = [
      {
        title: '任务名称',
        dataIndex: 'name',
        key: 'name',
        width: 220,
      },
      // {
      //   title: '角色',
      //   dataIndex: 'assignee1',
      //   key: 'assignee1',
      //   width: 220,
      // },
      {
        title: '负责人',
        dataIndex: 'assignee',
        key: 'assignee',
        width: 220,
        render: text => <span>{text && text.join()}</span>,
      },
      {
        title: '完成人',
        dataIndex: 'completeBy',
        key: 'completeBy',
        width: 220,
        render: (val, record) =>
          record.completed ? (
            <span>
              <CheckCircleOutlined style={{ color: 'green' }} />
              &nbsp;{val}
            </span>
          ) : (
            <ClockCircleOutlined style={{ color: 'red' }} />
          ),
      },

      // {
      //   title: '审批结果',
      //   dataIndex: 'status',
      //   key: 'status',
      //   // render: text =>
      //   //   text === 'agree' ? (
      //   //     <Badge status="Success" text="成功" />
      //   //   ) : (
      //   //     <Badge status="error" text="驳回" />
      //   //     ),
      // },
      // {
      //   title: '审批意见',
      //   dataIndex: 'status1',
      //   key: 'status1',
      //   // render: text =>
      //   //   text === 'agree' ? (
      //   //     <Badge status="Success" text="成功" />
      //   //   ) : (
      //   //     <Badge status="error" text="驳回" />
      //   //     ),
      // },
      {
        title: '执行结果',
        dataIndex: 'outcome',
        key: 'outcome',
        width: 150,
        // render: text =>
        //   text === 'agree' ? (
        //     <Badge status="Success" text="成功" />
        //   ) : (
        //     <Badge status="error" text="驳回" />
        //     ),
      },
      {
        title: '分配时间',
        dataIndex: 'startTime',
        key: 'startTime',
        width: 150,
        render: text => (
          <Tooltip placement="topLeft" title={text}>
            {text && moment(text).format('YYYY-MM-DD HH:mm')}
          </Tooltip>
        ),
      },
      {
        title: '完成时间',
        dataIndex: 'endTime',
        key: 'endTime',
        width: 150,
        render: text => (
          <Tooltip placement="topLeft" title={text}>
            {text && moment(text).format('YYYY-MM-DD HH:mm')}
          </Tooltip>
        ),
      },
      {
        title: '持续时间',
        dataIndex: 'durationFormat',
        key: 'durationFormat',
        width: 150,
        // render: (text, record) =>
        //   record.duration &&
        //   (Number(record.duration) / 1000 / 60 > 1
        //     ? `${Math.round(Number(record.duration) / 1000 / 60)}分`
        //     : `${Math.round(Number(record.duration) / 1000)}秒`),
      },
      {
        title: '备注',
        dataIndex: 'description',
        key: 'description',
        onCell: () => {
          return {
            style: {
              maxWidth: 150,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            },
          };
        },
        render: text => (
          <Tooltip title={text} placement="topLeft">
            {text}
          </Tooltip>
        ),
      },
      {
        title: '签审意见',
        dataIndex: 'option',
        key: 'option',
        onCell: () => {
          return {
            style: {
              maxWidth: 50,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            },
          };
        },
        render: (text, record) => (
          <Tooltip title="点击查看签审意见" placement="topLeft">
            <a onClick={() => this.loadOptions(record)}>查看</a>
          </Tooltip>
        ),
      },
    ];
    return (
      <Table
        rowKey={record => record.id}
        pagination={false}
        dataSource={[]}
        columns={columns1}
        bordered
        size="middle"
      />
    );
  }
}

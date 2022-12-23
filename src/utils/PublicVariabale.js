import commonStyles from '@/styles/common.less';
import { getObjectUrl } from '@/utils/utils';
import { Tooltip } from 'antd';
import moment from 'moment';
import React from 'react';
import { Link } from 'umi';

export const versionObjectType = ['Document', 'Part', 'Drawing'];
export const objectType = [
  { display: '文档', value: 'Document' },
  { display: '部件', value: 'Part' },
  { display: 'CAD文档', value: 'Drawing' },
  { display: '更改单', value: 'ChangeOrder' },
  { display: '偏离单', value: 'Deviation' },
  { display: '基线', value: 'Baseline' },
  { display: '发送单', value: 'DataSendOrder' },
];
export const versionLifecycleStatus = [
  {
    display: '正在工作',
    value: 'INWORK',
  },
  {
    display: '正在审阅',
    value: 'UNDERREVIEW',
  },
  {
    display: '已发布',
    value: 'RELEASED',
  },
];
export const versionLifecycleStatus2 = [
  {
    display: '正在工作',
    value: '0',
  },
  {
    display: '正在审阅',
    value: '1',
  },
  {
    display: '修改中',
    value: '2',
  },
  {
    display: '已完成',
    value: '3',
  },
];
export const versionLifecycleStatus1 = [
  {
    display: '新增',
    value: '新增',
  },
  {
    display: '变更',
    value: '变更',
  },
  {
    display: '禁用',
    value: '禁用',
  },
  {
    display: '优选',
    value: '优选',
  },
];
// 签审记录columns
export const recordsColumns = [
  {
    title: '环节名称',
    dataIndex: 'name',
    width: '8%',
    render: (text, record) => <Link to={`/task/${record.id}/info`}>{text}</Link>,
  },
  {
    title: '签署人',
    width: '10%',
    dataIndex: 'assigneeDisplay',
  },
  {
    title: '完成选项',
    width: '10%',
    dataIndex: 'outcome',
  },
  {
    title: '签署时间',
    width: '14%',
    dataIndex: 'endTime',
    render(text) {
      return (
        <Tooltip placement="topLeft" title={text}>
          {text ? moment(text).format('YYYY-MM-DD HH:mm') : ''}
        </Tooltip>
      );
    },
  },
  {
    title: '签署意见',
    dataIndex: 'description',
    render(text) {
      return (
        <Tooltip placement="bottomLeft" title={text}>
          {text}
        </Tooltip>
      );
    },
  },
];
// 操作日志columns
export const logColumns = [
  {
    title: '操作类型',
    dataIndex: 'OperationType',
  },
  {
    title: '操作人',
    dataIndex: 'OperationFullName',
  },
  {
    title: '执行结果',
    dataIndex: 'result',
  },
  {
    title: '操作时间',
    dataIndex: 'modifyStamp',
  },
  {
    title: '备注',
    dataIndex: 'description',
  },
];
// 无版本控制数据-columns
export const noVersionColumns = [
  {
    title: '编号',
    dataIndex: 'code',
    width: '20%',
    render(text, record) {
      return (
        <Tooltip title={text} placement="topLeft">
          <img
            className={commonStyles.iconObjectList}
            style={{ marginRight: 8, display: record.icon ? 'inline-block' : 'none' }}
            alt=""
            src={`${process.env.BASE_PATH}${record.icon}`}
          />
          <Link
            target="_blank"
            style={{ marginRight: 10 }}
            to={getObjectUrl(record, {
              objectType: record.objectType,
              id: record.changeRequestId || record.id,
            })}
          >
            {text}
          </Link>
        </Tooltip>
      );
    },
  },
  {
    title: '名称',
    dataIndex: 'name',
    width: 200,
    render(text) {
      return (
        <Tooltip title={text} placement="topLeft">
          {text}
        </Tooltip>
      );
    },
  },
  {
    title: '状态',
    dataIndex: 'lifecycleStateDisplay',
    width: 80,
    render(text) {
      return (
        <Tooltip title={text} placement="topLeft">
          {text}
        </Tooltip>
      );
    },
  },
  {
    title: '阶段标记',
    dataIndex: 'phaseMarkDisplay',
    width: 80,
    render(text) {
      return (
        <Tooltip title={text} placement="topLeft">
          {text}
        </Tooltip>
      );
    },
  },
  {
    title: '库',
    dataIndex: 'repositoryDisplay',
    width: 120,
    render(text) {
      return (
        <Tooltip title={text} placement="topLeft">
          {text}
        </Tooltip>
      );
    },
  },
  {
    title: '修改时间',
    dataIndex: 'modifyStamp',
    width: 120,
    render(text) {
      return (
        <Tooltip title={text} placement="topLeft">
          {moment(text).format('YYYY-MM-DD HH:mm')}
        </Tooltip>
      );
    },
  },
];

// 版本控制数据-columns
export const versionColumns = [
  {
    title: '编号',
    dataIndex: 'code',
    render(text, record) {
      return (
        <Tooltip title={text} placement="topLeft">
          <img
            className={commonStyles.iconObjectList}
            style={{ marginRight: 8, display: record.icon ? 'inline-block' : 'none' }}
            alt=""
            src={`${process.env.BASE_PATH}${record.icon}`}
          />
          <Link target="_blank" style={{ marginRight: 10 }} to={getObjectUrl(record)}>
            {text}
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
        <Tooltip title={text} placement="topLeft">
          {text}
        </Tooltip>
      );
    },
  },
  {
    title: '版本',
    dataIndex: 'version',
    width: '8%',
    render(text) {
      return (
        <Tooltip title={text} placement="topLeft">
          {text}
        </Tooltip>
      );
    },
  },
  {
    title: '状态',
    dataIndex: 'state',
    width: '8%',
    render(text) {
      return (
        <Tooltip title={text} placement="topLeft">
          {text}
        </Tooltip>
      );
    },
  },
  {
    title: '阶段标记',
    dataIndex: 'phaseMark',
    width: '10%',
    render(text) {
      return (
        <Tooltip title={text} placement="topLeft">
          {text}
        </Tooltip>
      );
    },
  },
  {
    title: '库',
    dataIndex: 'repositoryName',
    width: '16%',
    render(text) {
      return (
        <Tooltip title={text} placement="topLeft">
          {text}
        </Tooltip>
      );
    },
  },
  {
    title: '修改时间',
    dataIndex: 'modifyStamp',
    width: '14%',
    render(text) {
      return (
        <Tooltip tooltip lines={1}>
          {moment(text).format('YYYY-MM-DD HH:mm')}
        </Tooltip>
      );
    },
  },
];
// subject控制数据-columns
export const subjectColumns = [
  {
    title: '名称',
    dataIndex: 'name',
    render(text) {
      return (
        <Tooltip title={text} placement="topLeft">
          {/* <img
            className={commonStyles.iconObjectList}
            style={{ marginRight: 8, display: record.icon ? 'inline-block' : 'none' }}
            alt=""
            src={`${process.env.BASE_PATH}${record.icon}`}
          />
          <Link
            target="_blank"
            style={{ marginRight: 10 }}
            to={getObjectUrl(record, {
              objectType: record.objectType,
              id: record.afterObjectId || record.beforeObjectId,
            })}
          >
            {text}
          </Link> */}
          {text}
        </Tooltip>
      );
    },
  },
  {
    title: '状态',
    dataIndex: 'lifecycleStateDisplay',
    width: '10%',
    render(text) {
      return (
        <Tooltip title={text} placement="topLeft">
          {text}
        </Tooltip>
      );
    },
  },
  {
    title: '阶段标记',
    dataIndex: 'phaseMarkDisplay',
    width: '10%',
    render(text) {
      return (
        <Tooltip title={text} placement="topLeft">
          {text}
        </Tooltip>
      );
    },
  },
  {
    title: '库',
    dataIndex: 'repositoryDisplay',
    width: '16%',
    render(text) {
      return (
        <Tooltip title={text} placement="topLeft">
          {text}
        </Tooltip>
      );
    },
  },
  {
    title: '产品代号',
    dataIndex: 'productCode',
    width: '14%',
    render(text) {
      return (
        <Tooltip title={text} placement="topLeft">
          {text}
        </Tooltip>
      );
    },
  },
  {
    title: '修改者',
    dataIndex: 'modifierFullName',
    width: '10%',
    render(text) {
      return (
        <Tooltip title={text} placement="topLeft">
          {text}
        </Tooltip>
      );
    },
  },
  {
    title: '修改时间',
    dataIndex: 'modifyStamp',
    width: '12%',
    render(text) {
      return (
        <Tooltip title={text} placement="topLeft">
          {text && moment(text).format('YYYY-MM-DD HH:mm')}
        </Tooltip>
      );
    },
  },
];
// 关联数据无版本控制数据-columns
export function relatedDataNoVersionColumns() {
  return [
    {
      title: '编号',
      dataIndex: 'code',
      render(text, record) {
        return (
          <Tooltip title={text} placement="topLeft">
            <img
              className={commonStyles.iconObjectList}
              style={{ marginRight: 8, display: record.icon ? 'inline-block' : 'none' }}
              alt=""
              src={`${process.env.BASE_PATH}${record.icon}`}
            />
            <Link target="_blank" style={{ marginRight: 10 }} to={getObjectUrl(record)}>
              {text}
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
          <Tooltip title={text} placement="topLeft">
            {text}
          </Tooltip>
        );
      },
    },
    {
      title: '状态',
      dataIndex: 'lifecycleStateDisplay',
      width: '16%',
      render(text) {
        return (
          <Tooltip title={text} placement="topLeft">
            {text}
          </Tooltip>
        );
      },
    },
  ];
}
// 关联数据版本控制数据-columns
export function relatedDataVersionColumns() {
  return [
    {
      title: '编号',
      dataIndex: 'code',
      render(text, record) {
        return (
          <Tooltip title={text} placement="topLeft">
            <img
              className={commonStyles.iconObjectList}
              style={{ marginRight: 8, display: record.icon ? 'inline-block' : 'none' }}
              alt=""
              src={`${process.env.BASE_PATH}${record.icon}`}
            />
            <Link target="_blank" style={{ marginRight: 10 }} to={getObjectUrl(record)}>
              {text}
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
          <Tooltip title={text} placement="topLeft">
            {text}
          </Tooltip>
        );
      },
    },
    {
      title: '版本',
      dataIndex: 'version',
      width: '10%',
      render(text) {
        return (
          <Tooltip title={text} placement="topLeft">
            {text}
          </Tooltip>
        );
      },
    },
    {
      title: '状态',
      dataIndex: 'lifecycleStateDisplay',
      width: '16%',
      render(text) {
        return (
          <Tooltip title={text} placement="topLeft">
            {text}
          </Tooltip>
        );
      },
    },
  ];
}

// basicColumns
export const BomColumns = [
  {
    title: '是否成品',
    dataIndex: 'endItem',
    width: 100,
    render: text => (
      <Tooltip placement="topLeft" title={text ? '是' : '否'}>
        {text ? '是' : '否'}
      </Tooltip>
    ),
    hideInTable: true,
  },
  {
    title: '视图',
    dataIndex: 'viewName',
    width: 100,
    render: text => (
      <Tooltip placement="topLeft" title={text}>
        {text}
      </Tooltip>
    ),
  },
  {
    title: '默认单位',
    dataIndex: 'defaultUnit',
    width: 100,
    hideInTable: true,
    render: text => (
      <Tooltip placement="topLeft" title={text}>
        {text}
      </Tooltip>
    ),
  },
  {
    title: '状态',
    dataIndex: 'lifecycleStateName',
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
    title: '密级',
    dataIndex: 'secretLevel',
    width: 90,
    hideInTable: true,
    render(text) {
      return (
        <Tooltip placement="topLeft" title={text}>
          {text}
        </Tooltip>
      );
    },
  },
  {
    title: '保密期限',
    dataIndex: 'confidentialityPeriod',
    width: 90,
    hideInTable: true,
    render(text) {
      return (
        <Tooltip placement="topLeft" title={`${text}年`}>
          {`${text}年`}
        </Tooltip>
      );
    },
  },
  {
    title: '阶段标记',
    dataIndex: 'phaseMark',
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
    title: '型号产品',
    width: 135,
    dataIndex: 'repository',
    render(text, record = {}) {
      return (
        <Tooltip placement="topLeft" title={record.repository && record.repository.name}>
          {record.repository && record.repository.name}
        </Tooltip>
      );
    },
  },
  {
    title: '型号代号',
    width: 135,
    hideInTable: true,
    dataIndex: 'modelCode',
    render(text, record = {}) {
      return (
        <Tooltip placement="topLeft" title={record.repository && record.repository.modelCode}>
          {record.repository && record.repository.modelCode}
        </Tooltip>
      );
    },
  },
  {
    title: '产品代号',
    width: 135,
    hideInTable: true,
    dataIndex: 'productCode',
    render(text) {
      return (
        <Tooltip placement="topLeft" title={text}>
          {text}
        </Tooltip>
      );
    },
  },
  {
    title: '用途',
    width: 135,
    hideInTable: true,
    dataIndex: 'purpose',
    render(text) {
      return (
        <Tooltip placement="topLeft" title={text}>
          {text}
        </Tooltip>
      );
    },
  },
  {
    title: '产品层级',
    width: 135,
    hideInTable: true,
    dataIndex: 'productLevel',
    render(text) {
      return (
        <Tooltip placement="topLeft" title={text}>
          {text}
        </Tooltip>
      );
    },
  },
  {
    title: '产品分类',
    width: 135,
    hideInTable: true,
    dataIndex: 'productCategory',
    render(text) {
      return (
        <Tooltip placement="topLeft" title={text}>
          {text}
        </Tooltip>
      );
    },
  },
  {
    title: '关重件',
    width: 135,
    hideInTable: true,
    dataIndex: 'partDegree',
    render(text) {
      return (
        <Tooltip placement="topLeft" title={text}>
          {text}
        </Tooltip>
      );
    },
  },
  {
    title: '创建者',
    dataIndex: 'creator',
    width: 60,
    hideInTable: true,
    render(text, record = {}) {
      return (
        <Tooltip placement="topLeft" title={record.creator && record.creator.fullName}>
          {record.creator && record.creator.fullName}
        </Tooltip>
      );
    },
  },
  {
    title: '修改者',
    dataIndex: 'modifierFullName',
    width: 60,
    render(text, record = {}) {
      return (
        <Tooltip placement="topLeft" title={record.modifier && record.modifier.fullName}>
          {record.modifier && record.modifier.fullName}
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
        <Tooltip placement="topLeft" title={moment(text).format('YYYY-MM-DD HH:mm')}>
          {moment(text).format('YYYY-MM-DD HH:mm')}
        </Tooltip>
      );
    },
  },
];

import React from 'react';
import { Tooltip } from 'antd';
import moment from 'moment';
import { Links } from '@/pages/ChangeConfiguration/DataSendOrder/CollectingDataModal/CellRenderer';

export default [
  {
    title: '主题',
    dataIndex: 'subject',
    width: 200,
    render: (text, record) => (
      <Tooltip title={text}>
        <Links colDef={{ urlDefinition: 'infoUrl', id: 'subject' }} data={record} target="_blank" />
      </Tooltip>
    ),
  },
  // {
  //   title: '名称',
  //   dataIndex: 'name',
  //   width: '20%',
  //   render(text, record) {
  //     const { relationshipData = {} } = record;
  //     return (
  //       <Tooltip placement="topLeft" title={text || relationshipData.name}>
  //         {text || relationshipData.name}
  //       </Tooltip>
  //     );
  //   },
  // },
  {
    title: '状态',
    dataIndex: 'lifecycleStateName',
    width: 90,
    render(text, record) {
      const { relationshipData = {}, nodeData = {} } = record;
      return (
        <Tooltip placement="topLeft" title={text || record.lifecycleStateDisplay || record.state}>
          {relationshipData.lifecycleStateDisplay ||
            nodeData.lifecycleStateDisplay ||
            text ||
            record.lifecycleStateDisplay ||
            record.state}
        </Tooltip>
      );
    },
  },
  {
    title: '阶段标记',
    dataIndex: 'phaseMarkDisplay',
    key: 'phaseMarkDisplay',
    width: 90,
    render(text, record) {
      const { relationshipData = {}, nodeData = {} } = record;
      return (
        <Tooltip
          placement="topLeft"
          title={nodeData.phaseMarkDisplay || relationshipData.phaseMarkDisplay || text}
        >
          {nodeData.phaseMarkDisplay || relationshipData.phaseMarkDisplay || text}
        </Tooltip>
      );
    },
  },
  {
    title: '型号产品',
    width: 135,
    dataIndex: 'repositoryName',
    render(text, record = {}) {
      const { relationshipData = {}, nodeData = {} } = record;
      return (
        <Tooltip
          placement="topLeft"
          title={
            (nodeData.repository && nodeData.repository.name) ||
            relationshipData.repositoryName ||
            (record.repository && record.repository.name) ||
            text
          }
        >
          {(nodeData.repository && nodeData.repository.name) ||
            relationshipData.repositoryName ||
            (record.repository && record.repository.name) ||
            text}
        </Tooltip>
      );
    },
  },
  {
    title: '修改者',
    dataIndex: 'modifierFullName',
    width: 60,
    render(text, record = {}) {
      const { relationshipData = {}, nodeData = {} } = record;
      return (
        <Tooltip
          placement="topLeft"
          title={
            (nodeData.modifier && nodeData.modifier.fullName) ||
            (relationshipData.modifier && relationshipData.modifier.fullName) ||
            (record.modifier && record.modifier.fullName) ||
            text
          }
        >
          {(nodeData.modifier && nodeData.modifier.fullName) ||
            (relationshipData.modifier && relationshipData.modifier.fullName) ||
            (record.modifier && record.modifier.fullName) ||
            text}
        </Tooltip>
      );
    },
  },
  {
    title: '修改时间',
    dataIndex: 'modifyStamp',
    width: 135,
    render: (text, record = {}) => {
      const { relationshipData = {}, nodeData = {} } = record;
      const stamp = record.modifyStamp || nodeData.modifyStamp || relationshipData.modifyStamp;
      return (
        <Tooltip placement="topLeft" title={moment(stamp).format('YYYY-MM-DD HH:mm')}>
          {moment(stamp).format('YYYY-MM-DD HH:mm')}
        </Tooltip>
      );
    },
  },
];

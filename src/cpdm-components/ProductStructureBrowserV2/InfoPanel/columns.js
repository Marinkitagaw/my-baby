import React from 'react';
import { Tooltip } from 'antd';
import { Link } from 'umi';
import moment from 'moment';
import func from '@/utils/Func';

export default [
  {
    title: '主题',
    dataIndex: 'subject',
    width: '20%',
    render(text, record) {
      const { relationshipData = {}, nodeData = {} } = record;
      const objectType = nodeData.objectType || relationshipData.objectType || record.objectType;
      const objectId = nodeData.id || relationshipData.id || record.id;
      const txt = `${nodeData.code},${nodeData.name},${nodeData.version}`;
      return (
        <Tooltip placement="topLeft" title={text || relationshipData.subject || txt}>
          <Link to={`${func.urlForInfo(objectType, objectId)}`} target="_blank">
            {record.subject || relationshipData.subject || txt}
          </Link>
        </Tooltip>
      );
    },
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
    key: 'phaseMark',
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
    title: '库',
    width: 135,
    dataIndex: 'repositoryName',
    render(text, record = {}) {
      const { relationshipData = {}, nodeData = {} } = record;
      return (
        <Tooltip
          placement="topLeft"
          title={
            nodeData.containerName ||
            relationshipData.repositoryName ||
            record.containerName ||
            text
          }
        >
          {nodeData.containerName ||
            relationshipData.repositoryName ||
            record.containerName ||
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
          title={nodeData.modifierFullName || relationshipData.modifierFullName || text}
        >
          {nodeData.modifierFullName || relationshipData.modifierFullName || text}
        </Tooltip>
      );
    },
  },
  {
    title: '修改时间',
    dataIndex: 'modifyStamp',
    width: 135,
    render(text, record = {}) {
      const { relationshipData = {}, nodeData = {} } = record;
      return (
        <Tooltip
          placement="topLeft"
          title={moment(nodeData.modifyStamp || relationshipData.modifyStamp || text).format(
            'YYYY-MM-DD HH:mm'
          )}
        >
          {(text && moment(text).format('YYYY-MM-DD HH:mm')) ||
            ((nodeData.modifyStamp || relationshipData.modifyStamp || text) &&
              moment(nodeData.modifyStamp || relationshipData.modifyStamp || text).format(
                'YYYY-MM-DD HH:mm'
              ))}
        </Tooltip>
      );
    },
  },
];

import React from 'react';
import { PageHeaderWrapper } from '@cpdm/layout';
import { Row, Col, Button, Descriptions } from 'antd';
import moment from 'moment';

import SetParticipant from './SetParticipant';
import Progress from './Progress';
import RouterStatus from './RouterStatus';

// 任务表单页面是对PageHeaderWrapper的一次封装
// 任务页面的页眉和完成按钮区域是公用的
// 用户可以任意自定义任务页面
// 自定义的部分通过本组件的props.children渲染
// 除了自定义任务表单内容，完成按钮区域也可以自定义添加其他按钮
// 另外点击完成按钮时调用的方法也可以通过传入props.onCompleteTask自定义
// 如果没有自定义完成任务按钮的方法，则会调用默认的完成任务方法
const TaskForm = props => {
  const { task, children } = props;
  const completeTask = () => {
    // console.log('默认的完成任务方式');
  };
  const saveTask = () => {
    // console.log('默认的保存任务方式');
  };

  const startupSubProcess = () => {
    // console.log('默认的开启子流程方式');
  };
  const { onComplete, onSave, onStartupSub } = props;

  const onClickCompleteTaskButton = event => {
    event.stopPropagation();
    event.preventDefault();
    if (onComplete) {
      onComplete(completeTask);
    } else {
      completeTask();
    }
  };

  const onClickStartupSubsButton = event => {
    event.stopPropagation();
    event.preventDefault();
    if (onStartupSub) {
      onStartupSub(startupSubProcess);
    } else {
      startupSubProcess();
    }
  };

  const onClickSaveTaskButton = event => {
    event.stopPropagation();
    event.preventDefault();
    if (onSave) {
      onSave(saveTask);
    } else {
      saveTask();
    }
  };

  const action = ({ enableStartupSubs, enableSave }) => (
    <div>
      <Button.Group style={{ marginRight: 8 }}>
        {enableSave && <Button onClick={onClickSaveTaskButton}>接受任务</Button>}
        {enableSave && <Button onClick={onClickSaveTaskButton}>重新分配</Button>}
        {enableStartupSubs && <Button onClick={onClickStartupSubsButton}>启动子流程</Button>}
        {/* {enableSave && <Button onClick={onClickSaveTaskButton}>保存任务</Button>} */}
      </Button.Group>
      <Button type="primary" onClick={onClickCompleteTaskButton}>
        完成任务
      </Button>
    </div>
  );

  const description = (
    <Descriptions size="small" col="2">
      <Descriptions.Item label="提交时间">
        {task && moment(task.startTime).format('YYYY-MM-DD HH:mm')}
      </Descriptions.Item>
      <Descriptions.Item label="关联数据">{task && task.processDefinitionName}</Descriptions.Item>
      <Descriptions.Item label="分配时间">2017-07-07</Descriptions.Item>
      <Descriptions.Item label="负责人">
        {task && task.processInstanceCreatorName}
      </Descriptions.Item>
      <Descriptions.Item label="备注">{task && task.processInstanceCreatorName}</Descriptions.Item>
    </Descriptions>
  );

  const extra = (
    <Row>
      <Col sm={24} md={12}>
        <div style={{ color: 'rgba(0, 0, 0, 0.43)' }}>状态</div>
        <div style={{ color: 'rgba(0, 0, 0, 0.85)', fontSize: 20 }}>待审批</div>
      </Col>
      <Col sm={24} md={12}>
        <div style={{ color: 'rgba(0, 0, 0, 0.43)' }}>最后期限</div>
        <div style={{ color: 'rgba(0, 0, 0, 0.85)', fontSize: 20 }}>2017-07-07</div>
      </Col>
    </Row>
  );

  const tabList = [
    {
      key: 'tab1',
      tab: '详细信息',
    },
    {
      key: 'tab2',
      tab: '历史记录',
    },
    {
      key: 'tab3',
      tab: '流程图',
    },
  ];
  return (
    <PageHeaderWrapper
      title={task && (task.subject || task.name) ? `任务：${task.subject || task.name}` : '任务：'}
      tabList={tabList}
      extra={action(props)}
      content={description}
      extraContent={extra}
    >
      {children}
    </PageHeaderWrapper>
  );
};

TaskForm.SetParticipant = SetParticipant;
TaskForm.Progress = Progress;
TaskForm.RouterStatus = RouterStatus;

export default TaskForm;

import React from 'react';
import { connect } from 'umi';
import { Button, Descriptions } from 'antd';
import moment from 'moment';

import { PageHeaderWrapper } from '@cpdm/layout';

@connect(({ reviewTask, dashboard, processInstance }) => ({
  reviewTask,
  dashboard,
  taskInfo: dashboard.taskInfo,
  definitionInfo: processInstance.definitionInfo,
}))
class TaskAssembly extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabActiveKey: 'info',
    };
  }

  componentDidMount() {
    const { taskId, processInstanceId } = this.props;
    if (processInstanceId) {
      this.getDefinitionInfo(processInstanceId);
    } else {
      this.loadTaskInfo(taskId);
    }
  }

  getDefinitionInfo = processInstanceId => {
    const { dispatch } = this.props;
    dispatch({
      type: 'processInstance/getDefinitionInfo',
      payload: {
        processInstanceId,
      },
    });
  };

  completeTask = () => {
    // console.log('默认的完成任务方式');
  };

  saveTask = () => {
    // console.log('默认的保存任务方式');
  };

  startupSubProcess = () => {
    // console.log('默认的开启子流程方式');
  };

  // 加载详情
  loadTaskInfo = id => {
    const {
      dispatch,
      requirement,
      reviewOrder,
      resource,
      dataSendOrder,
      assort,
      packge,
    } = this.props;
    dispatch({
      type: 'dashboard/signTask',
      payload: { taskId: id },
    });
    dispatch({
      type: 'dashboard/getTask',
      payload: id,
      callback: (response = {}) => {
        if (response && response.businessKey) {
          if (reviewOrder) {
            dispatch({
              type: 'reviewTask/getReviewOrder',
              payload: {
                reviewOrderId: response.businessKey.split(':')[1],
                taskDefinitionKey: response.taskDefinitionKey,
              },
            });
          }
          if (requirement) {
            dispatch({
              type: 'requirement/requirementRecord',
              payload: {
                dataPacketId: response.businessKey.split(':')[1],
              },
            });
          }
          if (resource) {
            dispatch({
              type: 'resouceapply/getApplyInfo',
              payload: response.businessKey.split(':')[1],
              callback: (response1 = {}) => {
                if (response1) {
                  dispatch({
                    type: 'resouceapply/getApplyRelation',
                    payload: response1,
                  });
                  dispatch({
                    type: 'resouceapply/getApplyContent',
                    payload: response1.id,
                  });
                }
              },
            });
          }
          if (dataSendOrder) {
            dispatch({
              type: 'dataSendOrder/getsendRecords',
              payload: {
                id: response.businessKey.split(':')[1],
              },
            });
          }
          if (assort) {
            dispatch({
              type: 'assort/getAssortInfoLast',
              payload: response.businessKey.split(':')[1],
            });
          }
          if (packge) {
            dispatch({
              type: 'deliverPackage/getLatestPackageInfo',
              payload: {
                packageId: response.businessKey.split(':')[1],
              },
            });
          }
        }
      },
    });
  };

  // 接受任务 重新分配
  onClickSaveTaskButton = event => {
    const { onSave } = this.props;
    event.stopPropagation();
    event.preventDefault();
    if (onSave) {
      onSave(this.saveTask);
    } else {
      this.saveTask();
    }
  };

  // 启动子流程
  onClickStartupSubsButton = event => {
    const { onStartupSub } = this.props;
    event.stopPropagation();
    event.preventDefault();
    if (onStartupSub) {
      onStartupSub(this.startupSubProcess);
    } else {
      this.startupSubProcess();
    }
  };

  // 完成任务
  onClickCompleteTaskButton = event => {
    const { onComplete } = this.props;
    event.stopPropagation();
    event.preventDefault();
    if (onComplete) {
      onComplete(this.completeTask);
    } else {
      this.completeTask();
    }
  };

  // tabChannge
  onTabChange = key => {
    this.setState({ tabActiveKey: key });
  };

  render() {
    const { taskInfo, tabConfig, definitionInfo, processInstanceId } = this.props;
    const { tabActiveKey } = this.state;
    const tabList = [
      {
        key: 'info',
        tab: '详细信息',
      },
      {
        key: 'historyRecord',
        tab: '历史记录',
      },
      {
        key: 'processChart',
        tab: '流程图',
      },
    ];
    const action = ({ enableStartupSubs, enableSave }) => (
      <div>
        <Button.Group style={{ marginRight: 8 }}>
          {enableSave && <Button onClick={this.onClickSaveTaskButton}>接受任务</Button>}
          {enableSave && <Button onClick={this.onClickSaveTaskButton}>重新分配</Button>}
          {enableStartupSubs && <Button onClick={this.onClickStartupSubsButton}>启动子流程</Button>}
        </Button.Group>
      </div>
    );

    const taskDescription = taskInfo ? (
      <Descriptions size="small" col="3">
        <Descriptions.Item label="提交时间">
          {moment(taskInfo.startTime).format('YYYY-MM-DD HH:mm')}
        </Descriptions.Item>
        <Descriptions.Item label="关联数据">{taskInfo.subject}</Descriptions.Item>
        <Descriptions.Item label="分配时间">
          {moment(taskInfo.startTime).format('YYYY-MM-DD HH:mm')}
        </Descriptions.Item>
        <Descriptions.Item label="提交人">{taskInfo.processInstanceCreatorName}</Descriptions.Item>
        <Descriptions.Item label="工作负责人">
          {taskInfo.assignee && taskInfo.assignee.join()}
        </Descriptions.Item>
      </Descriptions>
    ) : (
      ''
    );

    const processDescription = definitionInfo ? (
      <Descriptions size="small" col="3">
        <Descriptions.Item label="业务标识">{definitionInfo.businessKey}</Descriptions.Item>
        <Descriptions.Item label="启动者">{definitionInfo.startUserName}</Descriptions.Item>
        <Descriptions.Item label="开始时间">
          {moment(definitionInfo.startTime).format('YYYY-MM-DD HH:mm')}
        </Descriptions.Item>
        <Descriptions.Item label="结束时间">
          {definitionInfo.state === 'COMPLETED'
            ? moment(definitionInfo.endTime).format('YYYY-MM-DD HH:mm')
            : ''}
        </Descriptions.Item>
        <Descriptions.Item label="状态">{definitionInfo.state}</Descriptions.Item>
        <Descriptions.Item label="主题">{definitionInfo.subject}</Descriptions.Item>
      </Descriptions>
    ) : (
      ''
    );

    const taskTitle = taskInfo
      ? `任务：${taskInfo.processDefinitionName}:${taskInfo.subject},${taskInfo.name}`
      : '任务：';
    const processTitle = definitionInfo
      ? `流程名称：${definitionInfo.processDefinitionName}`
      : '流程名称：';
    return (
      <PageHeaderWrapper
        title={processInstanceId ? processTitle : taskTitle}
        tabList={tabList}
        tabActiveKey={tabActiveKey}
        extra={action(this.props)}
        content={processInstanceId ? processDescription : taskDescription}
        onTabChange={this.onTabChange}
      >
        {tabConfig[tabActiveKey]}
      </PageHeaderWrapper>
    );
  }
}

export default TaskAssembly;

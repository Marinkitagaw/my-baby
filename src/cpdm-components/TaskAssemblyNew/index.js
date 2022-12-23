import React from 'react';
import { connect, history } from 'umi';
import { Button, Card, Descriptions } from 'antd';
import moment from 'moment';

import UForm from '@/cpdm-components/UForm';
import { PageHeaderWrapper } from '@cpdm/layout';
import SharedTask from '@/cpdm-components/SharedTask';
import HistoryRecord from './HistoryRecord';
import ProcessChart from './ProcessChart';
import Participants from './Participants';
import ReAssignModal from './ReAssignModal';

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
      completed: false,
      reAssignVisible: false,
    };
  }

  componentDidMount() {
    const { taskId, processInstanceId, routerName, dispatch } = this.props;
    if (processInstanceId) {
      this.getDefinitionInfo(processInstanceId);
    } else {
      this.loadTaskInfo(taskId);
    }
    if (routerName === 'process-instance') {
      dispatch({
        type: 'revieworder/getIsAdmin',
        callback: req => {
          this.setState({ isAdmin: req });
        },
      });
    }
  }

  getDefinitionInfo = processInstanceId => {
    const { dispatch } = this.props;
    dispatch({
      type: 'processInstance/getDefinitionInfo',
      payload: {
        processInstanceId,
      },
      callback: res => {
        this.setState({
          completed: res.completed,
        });
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
      // requirement,
    } = this.props;
    dispatch({
      type: 'dashboard/getTask',
      payload: id,
      callback: res => {
        this.setState({
          completed: res.completed,
        });
      },
    });
    dispatch({
      type: 'dashboard/signTask',
      payload: { taskId: id },
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

  // 渲染Info
  renderInfo = () => {
    const {
      taskInfo,
      taskId,
      children,
      hideParticipants,
      hideAction,
      hideUform,
      hideTitle,
      saveVerification,
      processInstanceId,
      onSave,
      onReset,
      hideSupplier,
      showReviewOpinions,
      definitionInfo = {},
      isDocumentModify,
      showUploadFile,
    } = this.props;
    const { isAdmin, completed } = this.state;
    return (
      <div>
        {children}
        <Card style={{ marginTop: 16 }}>
          {showReviewOpinions && (
            <SharedTask
              processInstanceId={processInstanceId}
              taskId={taskId}
              completed={completed}
              isDocumentModify={isDocumentModify}
            />
          )}
          {!hideParticipants && (
            <Participants
              hideSupplier={hideSupplier}
              taskId={taskId}
              completed={completed}
              businessKey={taskInfo.businessKey}
              processInstanceId={processInstanceId}
              hideAction={hideAction}
              isAdmin={isAdmin || definitionInfo.edit}
            />
          )}
          {!hideUform && (
            <UForm
              saveVerification={saveVerification}
              hideTitle={hideTitle}
              showUploadFile={showUploadFile}
              taskId={taskId}
              completed={completed}
              taskName={taskInfo?.name}
              onSave={onSave}
              onReset={onReset}
              processInstanceId={processInstanceId}
            />
          )}
        </Card>
      </div>
    );
  };

  render() {
    const {
      taskInfo = {},
      definitionInfo = {},
      processInstanceId,
      taskId,
      taskDefinitionKey,
      showReviewOpinions,
      showUploadFile,
      taskInfo: { formKey },
    } = this.props;
    const { tabActiveKey, reAssignVisible } = this.state;
    let className = 'tableEllipsis';
    if (formKey) {
      if (
        formKey.indexOf('Standard') !== -1 ||
        formKey.indexOf('Component') !== -1 ||
        formKey.indexOf('Material') !== -1
      ) {
        className = 'tableEllipsis headBGC';
      }
    }
    const tabConfig = {
      info: taskInfo.businessKey || definitionInfo.businessKey ? this.renderInfo() : <Card />,
      historyRecord: (
        <HistoryRecord
          className={className}
          showReviewOpinions={showReviewOpinions}
          taskId={taskId}
          processInstanceId={processInstanceId}
          taskDefinitionKey={taskDefinitionKey}
          showUploadFile={showUploadFile}
        />
      ),
      processChart: (
        <ProcessChart
          taskId={taskId}
          processInstanceId={processInstanceId}
          taskDefinitionKey={taskDefinitionKey}
        />
      ),
    };
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
          {
            <Button type="primary" onClick={() => this.setState({ reAssignVisible: true })}>
              重新分配
            </Button>
          }
          {enableStartupSubs && <Button onClick={this.onClickStartupSubsButton}>启动子流程</Button>}
        </Button.Group>
      </div>
    );

    const description = (
      <Descriptions size="small" col="3">
        <Descriptions.Item label="提交时间">
          {taskInfo && moment(taskInfo.startTime).format('YYYY-MM-DD HH:mm')}
        </Descriptions.Item>
        <Descriptions.Item label="关联数据">{taskInfo && taskInfo.subject}</Descriptions.Item>
        <Descriptions.Item label="分配时间">
          {taskInfo && moment(taskInfo.startTime).format('YYYY-MM-DD HH:mm')}
        </Descriptions.Item>
        <Descriptions.Item label="提交人">
          {taskInfo && taskInfo.processInstanceCreatorName}
        </Descriptions.Item>
        <Descriptions.Item label="工作负责人">
          {taskInfo && taskInfo.assignee && taskInfo.assignee.join()}
        </Descriptions.Item>
      </Descriptions>
    );

    const processDescription = (
      <Descriptions size="small" col="3">
        <Descriptions.Item label="业务标识">
          {definitionInfo && definitionInfo.businessKey}
        </Descriptions.Item>
        <Descriptions.Item label="启动者">
          {definitionInfo && definitionInfo.startUserName}
        </Descriptions.Item>
        <Descriptions.Item label="开始时间">
          {definitionInfo && moment(definitionInfo.startTime).format('YYYY-MM-DD HH:mm')}
        </Descriptions.Item>
        <Descriptions.Item label="结束时间">
          {definitionInfo &&
            definitionInfo.endTime &&
            moment(definitionInfo.endTime).format('YYYY-MM-DD HH:mm')}
        </Descriptions.Item>
        <Descriptions.Item label="状态">{definitionInfo && definitionInfo.state}</Descriptions.Item>
        <Descriptions.Item label="主题">
          {definitionInfo && definitionInfo.subject}
        </Descriptions.Item>
      </Descriptions>
    );

    const title =
      taskInfo && taskInfo.name
        ? `任务：${taskInfo.processDefinitionName}:${taskInfo.subject},${taskInfo.name}`
        : '任务：';
    const processTitle =
      definitionInfo && definitionInfo.processDefinitionName
        ? `流程名称：${definitionInfo.processDefinitionName}`
        : '流程名称：';
    return (
      <PageHeaderWrapper
        title={processInstanceId ? processTitle : title}
        tabList={tabList}
        tabActiveKey={tabActiveKey}
        extra={action(this.props)}
        content={processInstanceId ? processDescription : description}
        onTabChange={this.onTabChange}
      >
        {tabConfig[tabActiveKey]}
        {reAssignVisible && (
          <ReAssignModal
            visible={reAssignVisible}
            taskInfo={taskInfo}
            onCancel={() => this.setState({ reAssignVisible: false })}
            onOk={() => {
              this.setState({ reAssignVisible: false });
              history.go(-1);
            }}
          />
        )}
      </PageHeaderWrapper>
    );
  }
}

export default TaskAssembly;

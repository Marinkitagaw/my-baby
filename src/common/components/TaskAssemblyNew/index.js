import {
  Button,
  Card,
  Descriptions,
  Table,
  Tooltip,
  Space,
  Badge,
  Radio,
  message,
  Input,
} from 'antd';
import moment from 'moment';
import { Form } from '@ant-design/compatible';
import React, { Suspense } from 'react';
import { connect, history, Link } from 'umi';
import { Fieldset } from '@cpdm/components';
import SharedTask from '@/common/components/SharedTask';
import UForm from '@/common/components/UForm';
import { PageHeaderWrapper } from '@cpdm/layout';
import HistoryRecord from './HistoryRecord';
import Participants from './Participants';
import ProcessChart from './ProcessChart';
import ReAssignModal from './ReAssignModal';
// import { taskData } from '@/services/exchange/exchange';

@connect(({ reviewTask, dashboard, processInstance, task }) => ({
  reviewTask,
  dashboard,
  // taskForm: dashboard.taskForm,
  // taskInfo: dashboard.taskInfo,
  taskInfo: task.tasks,
  definitionInfo: processInstance.definitionInfo,
}))
class TaskAssembly extends React.Component {
  constructor(props) {
    super(props);
    // const taskId = this.props.id;
    const taskId = this.props.taskId;
    const id = this.props.businessKey;
    this.state = {
      id,
      taskId,
      tabActiveKey: 'info',
      completed: false,
      reAssignVisible: false,
    };
  }

  componentDidMount() {
    const { processInstanceId, routerName, dispatch } = this.props;
    const { taskId } = this.state;
    this.getApplyData();
    if (processInstanceId) {
      this.getDefinitionInfo(processInstanceId);
    } else {
      this.loadTaskInfo();
    }
    if (routerName === 'process-instance') {
      dispatch({
        type: 'revieworder/getIsAdmin',
        callback: req => {
          this.setState({ isAdmin: req });
        },
      });
      this.getApplyData();
    }
    if (taskId) {
      dispatch({
        type: 'dashboard/getTaskForm',
        payload: { taskId },
      });
    }
  }

  //加载提交的数据
  getApplyData = () => {
    const { dispatch } = this.props;
    const { id } = this.state;
    dispatch({
      type: 'task/getTaskData',
      payload: {
        id: id,
      },
      callback: res => {
        this.setState({
          taskData: res,
        });
      },
    });
  };

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
  loadTaskInfo = () => {
    const {
      dispatch,
      // requirement,
    } = this.props;
    const { taskId } = this.state;
    dispatch({
      type: 'dashboard/getTask',
      payload: taskId,
      callback: res => {
        this.setState({
          completed: res.completed,
          applyInfo: res,
          processInstanceId: res.processInstanceId,
          taskDefinitionKey: res.taskDefinitionKey,
        });
      },
    });
    dispatch({
      type: 'dashboard/signTask',
      payload: { taskId: taskId },
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
    const { isAdmin, completed, applyInfo } = this.state;

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
      taskId,
      form,
      showReviewOpinions,
      showUploadFile,
      taskInfo: { formKey },
    } = this.props;
    const {
      tabActiveKey,
      reAssignVisible,
      applyInfo,
      value = '',
      taskDefinitionKey,
      processInstanceId,
      completed,
      taskData,
    } = this.state;
    const { getFieldDecorator, getFieldValue } = form;
    let className = 'tableEllipsis';
    const onChange = e => {
      this.setState({ value: e.target.value });
    };
    //完成任务，通过校对
    const subApply = () => {
      const { dispatch, taskForm, form } = this.props;
      const { taskId, id, applyInfo } = this.state;
      // const newName = Object.keys(taskForm)[0];
      form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          let newData = {
            taskId: taskId,
          };
          newData[`Task_Outcome_${taskId}`] = values.isAdopt;
          // newData[newName] = values.opinion;
          newData[`Activity_1gkfjtv_${taskId}`] = values.opinion;
          if (applyInfo.name === '提交') {
            dispatch({
              type: 'task/ApplyBefore',
              payload: {
                businessKey: id,
                taskId: taskId,
              },
            }).then(res => {
              dispatch({
                type: 'task/ApplyOk',
                payload: {
                  taskId: taskId,
                  ...newData,
                },
              }).then(res => {
                message.success('提交成功');
                window.open('/plm/app/tool-management/task/completed', '_self');
              });
            });
          }
          if (applyInfo.name === '批准' || applyInfo.name === '修改') {
            dispatch({
              type: 'task/ApplyOk',
              payload: {
                taskId: taskId,
                ...newData,
              },
              callback: res => {
                if (res) {
                  message.success('批准提交成功');
                } else {
                  message.error('批准提交失败或该任务已完成');
                }
              },
            });
            setTimeout(window.open('/plm/app/tool-management/task/completed', '_self'), 2000);
          }
        }
      });
      // if (value === '提交签审') {
      //   dispatch({
      //     type: 'task/ApplyBefore',
      //     payload: {
      //       businessKey: id,
      //       taskId: taskId,
      //     },
      //     callback: res => {
      //       if (res) {
      //         dispatch({
      //           type: 'task/ApplyOk',
      //           payload: {
      //             taskId: taskId,
      //             ...newData,
      //           },
      //           callback: res => {
      //             if (res) {
      //               history.push(`/task/pending`);
      //               message.success('校对提交成功');
      //             }
      //           },
      //         });
      //       }
      //     },
      //   });
      // }
    };
    const onBack = () => {
      window.open('/plm/app/tool-management/completed', '_self');
    };
    if (formKey) {
      if (
        formKey.indexOf('Standard') !== -1 ||
        formKey.indexOf('Component') !== -1 ||
        formKey.indexOf('Material') !== -1
      ) {
        className = 'tableEllipsis headBGC';
      }
    }
    const columns = [
      {
        title: '序号',
        dataIndex: 'no',
        width: 60,
        render: (_t, _r, index) => <span>{index + 1}</span>,
      },
      {
        title: '编号',
        dataIndex: 'code',
        ellipsis: true,
        render: (_t, record, _index) => {
          return (
            <Link to={`/toolset/${record.id}/info`} target="_blank">
              {record.code}
            </Link>
          );
        },
      },
      {
        title: '名称',
        dataIndex: 'name',
        ellipsis: true,
      },
      {
        title: '所属专业',
        dataIndex: 'major',
      },
      {
        title: '应用环节',
        dataIndex: 'sys',
      },
      {
        title: '版本',
        dataIndex: 'ver',
      },
      {
        title: '申请时间',
        dataIndex: 'modifyStamp',
        ellipsis: true,
        render: (text, record) => (
          <Tooltip
            placement="topLeft"
            title={record.modifyStamp && moment(record.modifyStamp).format('YYYY-MM-DD hh:mm')}
          >
            {record.modifyStamp && moment(record.modifyStamp).format('YYYY-MM-DD hh:mm')}
          </Tooltip>
        ),
      },
      {
        title: '状态',
        dataIndex: 'lifecycleStateName',
        ellipsis: true,
        render: (text, _record) => {
          switch (text) {
            case '正在工作':
              return (
                <Space>
                  <Badge status="success" text={text} />
                </Space>
              );
            case '正在审阅':
              return (
                <Space>
                  <Badge status="processing" text={text} />
                </Space>
              );
            case '修改中':
              return (
                <Space>
                  <Badge status="warning" text={text} />
                </Space>
              );
            case '已发布':
              return (
                <Space>
                  <Badge status="cyan" text={text} />
                </Space>
              );
            case '已禁用':
              return (
                <Space>
                  <Badge status="error" text="已禁用" />
                </Space>
              );
            default:
              return null;
          }
        },
      },
    ];
    const pagination = {
      defaultPageSize: 5,
    };
    const tabConfig = {
      info:
        taskInfo.businessKey || definitionInfo.businessKey ? (
          this.renderInfo()
        ) : (
          <Card>
            <Fieldset legend="审批数据">
              {applyInfo ? (
                <Table columns={columns} dataSource={taskInfo.taskData} pagination={pagination} />
              ) : null}
              {applyInfo && applyInfo.completed == false ? (
                <Form style={{ marginTop: '30px' }}>
                  {applyInfo && applyInfo.name === '批准' ? (
                    <>
                      <Form.Item label="意见" style={{ marginBottom: 0, height: '65px' }}>
                        {getFieldDecorator('opinion')(<Input maxLength={200} />)}
                      </Form.Item>
                      <Form.Item label="路由选项" style={{ marginBottom: 0, height: '65px' }}>
                        {getFieldDecorator('isAdopt', {
                          rules: [{ required: true, message: '该字段为必选' }],
                        })(
                          <Radio.Group>
                            <Radio value={'通过'}>通过</Radio>
                            <Radio value={'驳回'}>驳回</Radio>
                          </Radio.Group>
                        )}
                      </Form.Item>
                    </>
                  ) : (
                    <Form.Item label="审批意见" style={{ marginBottom: 0, height: '65px' }}>
                      {getFieldDecorator('isAdopt', {
                        rules: [{ required: true, message: '该字段为必选' }],
                      })(
                        <Radio.Group>
                          <Radio value={'提交签审'}>提交签审</Radio>
                        </Radio.Group>
                      )}
                    </Form.Item>
                  )}
                  <Form.Item>
                    <p style={{ textAlign: 'center' }}>
                      <Button type="primary" onClick={subApply}>
                        完成任务
                      </Button>
                    </p>
                  </Form.Item>
                </Form>
              ) : null}
            </Fieldset>
          </Card>
        ),
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
          {applyInfo && moment(applyInfo.startTime).format('YYYY-MM-DD HH:mm')}
        </Descriptions.Item>
        <Descriptions.Item label="关联数据">{applyInfo && applyInfo.subject}</Descriptions.Item>
        <Descriptions.Item label="分配时间">
          {applyInfo && moment(applyInfo.startTime).format('YYYY-MM-DD HH:mm')}
        </Descriptions.Item>
        <Descriptions.Item label="提交人">
          {applyInfo && applyInfo.processInstanceCreatorName}
        </Descriptions.Item>
        <Descriptions.Item label="工作负责人">
          {applyInfo && applyInfo.assignee && applyInfo.assignee.join()}
        </Descriptions.Item>
      </Descriptions>
    );

    const processDescription = (
      <Descriptions size="small" col="3">
        <Descriptions.Item label="启动者">
          {applyInfo && applyInfo.processInstanceCreatorName}
        </Descriptions.Item>
        <Descriptions.Item label="开始时间">
          {applyInfo && moment(applyInfo.startTime).format('YYYY-MM-DD HH:mm')}
        </Descriptions.Item>
        <Descriptions.Item label="状态">{applyInfo && applyInfo.processState}</Descriptions.Item>
        {/* <Descriptions.Item label="主题">{applyInfo && applyInfo.subject}</Descriptions.Item> */}
      </Descriptions>
    );

    const title =
      applyInfo && applyInfo.name
        ? `任务：${applyInfo.processDefinitionName}:${applyInfo.subject},${applyInfo.name}`
        : '任务：';
    const processTitle =
      applyInfo && applyInfo.processDefinitionName
        ? `流程名称：${applyInfo.processDefinitionName}, ${applyInfo.subject}`
        : '流程名称：';
    return (
      <PageHeaderWrapper
        title={processInstanceId ? processTitle : title}
        tabList={tabList}
        tabActiveKey={tabActiveKey}
        breadcrumb={false}
        extra={action(this.props)}
        content={processInstanceId ? processDescription : description}
        onTabChange={this.onTabChange}
      >
        {tabConfig[tabActiveKey]}
        {reAssignVisible && (
          <ReAssignModal
            visible={reAssignVisible}
            taskInfo={taskId}
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

export default Form.create()(TaskAssembly);

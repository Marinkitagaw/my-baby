import React, { Fragment } from 'react';
import { connect } from 'umi';
// import { PageHeaderWrapper } from '@cpdm/layout';
// import TaskForm from '@/common/components/TaskForm';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { DeleteOutlined, EditOutlined, MessageOutlined } from '@ant-design/icons';
import { Modal } from '@cpdm/components';
import {
  Button,
  Card,
  DatePicker,
  Divider,
  Drawer,
  Input,
  List,
  Radio,
  Select,
  Switch,
  Table,
  Tooltip,
} from 'antd';
import moment from 'moment';
// import Enclosure from './Enclosure';
import style from './index.less';
import ReplayOption from './ReplayOption';

const RadioGroup = Radio.Group;
// const { Option } = Select;
const dateFormat = 'YYYY-MM-DD';

@connect(({ dashboard, revieworder, dictionary, loading }) => ({
  dashboard,
  content: dashboard.content,
  page: dashboard.page,
  taskInfo: dashboard.taskInfo,
  dictEntries: dictionary.dictEntries,
  departments: revieworder.departments,
  loading: loading.effects['dashboard/listTaskReviewComments'],
  confirmLoading:
    loading.effects['dashboard/editReviewComment'] ||
    loading.effects['dashboard/createReviewComment'],
}))
@Form.create()
class SharedTaskComponents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerVisible: false,
      approvalInfo: null,
      replayVisible: false,
      expandedRowKeys: [],
    };
    this.columns = [
      {
        title: '序号',
        dataIndex: 'index',
        width: 50,
        // sorter: true,
        render: (text, record, index) => <span>{index + 1}</span>,
      },
      {
        title: '签审单位',
        dataIndex: 'reviewerOrg',
        width: 200,
        // sorter: true,
        render: (text) => (
          <Tooltip placement="topLeft" title={text}>
            {text}
          </Tooltip>
        ),
      },
      {
        title: '审批类别',
        dataIndex: 'reviewTypeName',
        width: 80,
        render: (text) => (
          <Tooltip placement="topLeft" title={text}>
            {text}
          </Tooltip>
        ),
      },
      {
        title: '审批人',
        dataIndex: 'reviewerName',
        width: 100,
        render: (text) => (
          <Tooltip placement="topLeft" title={text}>
            {text}
          </Tooltip>
        ),
      },
      {
        title: '审批时间',
        dataIndex: 'reviewDate',
        key: 'reviewDate',
        width: 120,
        render: (text) => (
          <Tooltip placement="topLeft" title={text}>
            {text && moment(text).format('YYYY-MM-DD HH:mm')}
          </Tooltip>
        ),
      },
      {
        title: '问题类别',
        dataIndex: 'requeryTypeName',
        // sorter: true,
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
        title: '问题描述',
        dataIndex: 'content',
        // sorter: true,
        width: 150,
        render(text) {
          return (
            <Tooltip title={text} placement="topLeft">
              {text}
            </Tooltip>
          );
        },
      },
      {
        title: '关联数据',
        dataIndex: 'associatedData',
        key: 'associatedData',
        width: 220,
        render(text) {
          return (
            <Tooltip title={text} placement="topLeft">
              {text}
            </Tooltip>
          );
        },
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        width: 200,
        render: (text, record) => (
          <span>
            <Fragment>
              <a disabled={!record.replayAccess} onClick={() => this.onReplyComment(record)}>
                <MessageOutlined style={{ marginRight: 2 }} />
                回复
              </a>
              <Divider type="vertical" />
              <a
                disabled={!record.editAccess || (record.answer && !!record.answer.length)}
                onClick={() => this.onEditComment(record)}
              >
                <EditOutlined style={{ marginRight: 2 }} />
                编辑
              </a>
              <Divider type="vertical" />
              <a disabled={!record.deleteAccess} onClick={() => this.onDeleteComment(record)}>
                <DeleteOutlined style={{ marginRight: 2 }} />
                删除
              </a>
            </Fragment>
          </span>
        ),
      },
    ];
  }

  componentDidMount() {
    const { taskId, dispatch, processInstanceId, isDocumentModify } = this.props;
    if (processInstanceId) {
      console.log(processInstanceId);
    } else {
      dispatch({
        type: 'dictionary/getDictEntries',
        payload: {
          code: 'SecretLevel,ReviewOrderType,TaskReviewType,TaskIssueType,MeetingDataType,AttendingType,PersonnelLevel',
        },
      });
      dispatch({
        type: 'revieworder/getDepartments',
      });

      if (isDocumentModify) {
        this.listProcessInstanceReviewComments();
      } else {
        this.listTaskReviewComments(taskId);
      }
    }
  }

  onExpand = (expanded, record) => {
    const { expandedRowKeys } = this.state;
    if (expanded) {
      this.setState({ expandedRowKeys: [...new Set(expandedRowKeys.push(record.id))] });
    } else {
      this.setState({
        expandedRowKeys: [...new Set(expandedRowKeys.filter((item) => item !== record.id))],
      });
    }
  };

  // 获取任务审批意见列表
  listTaskReviewComments = (id) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'dashboard/listTaskReviewComments',
      payload: { id },
    });
  };

  // 获取流程审批意见列表
  listProcessInstanceReviewComments = () => {
    const { dispatch, taskInfo } = this.props;
    dispatch({
      type: 'dashboard/listProcessInstanceReviewComments',
      payload: { params: taskInfo.processInstanceId || '' },
    });
  };

  // 关闭审批意见抽屉
  onCloseDrawer = () => {
    const {
      form: { resetFields },
    } = this.props;
    resetFields();
    this.setState({ drawerVisible: false, approvalInfo: null });
  };

  onSubmitReplay = (formValue) => {
    const { editAnswerRecord } = this.state;
    if (editAnswerRecord) {
      this.editReview(formValue);
    } else {
      this.createReview(formValue);
    }
  };

  //  回复签审意见
  createReview = (values) => {
    const { dispatch } = this.props;
    const { taskId, taskInfo } = this.props;
    const { approvalInfo } = this.state;
    dispatch({
      type: 'dashboard/createReviewComment',
      payload: {
        taskId,
        processInstanceId: taskInfo.processInstanceId,
        ...values,
        reviewCommentId: approvalInfo && approvalInfo.id,
        referenceId: approvalInfo && approvalInfo.id,
        type: 'answer',
        name: taskInfo.name,
        businessKey: taskInfo.businessKey,
      },
    }).then(() => {
      this.setState({ replayVisible: false, approvalInfo: null }, () => {
        this.listTaskReviewComments(taskId);
      });
    });
  };

  //  编辑签审意见
  editReview = (values) => {
    const { dispatch } = this.props;
    const { taskId, taskInfo } = this.props;
    const { approvalInfo } = this.state;
    dispatch({
      type: 'dashboard/editReviewComment',
      payload: {
        taskId,
        processInstanceId: taskInfo.processInstanceId,
        ...values,
        reviewCommentId: approvalInfo && approvalInfo.id,
        referenceId: approvalInfo && approvalInfo.id,
        type: 'answer',
        name: taskInfo.name,
      },
    }).then(() => {
      this.setState({ replayVisible: false, approvalInfo: null }, () => {
        this.listTaskReviewComments(taskId);
      });
    });
  };

  // 提交审批意见表单
  onSubmitForm = () => {
    const {
      form: { validateFields, resetFields },
      dispatch,
      taskInfo,
      taskId,
    } = this.props;
    const { isEdit, approvalInfo } = this.state;

    validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: isEdit ? 'dashboard/editReviewComment' : 'dashboard/createReviewComment',
          payload: {
            taskId,
            processInstanceId: taskInfo.processInstanceId,
            ...values,
            reviewCommentId: approvalInfo && approvalInfo.id,
            name: taskInfo.name,
            type: 'question',
            businessKey: taskInfo.businessKey,
          },
        }).then(() => {
          this.listTaskReviewComments(taskId);
          resetFields();
          this.setState({ drawerVisible: false, approvalInfo: null });
          // this.loadTaskInfo(id);
        });
      }
    });
    return '';
  };

  // 编辑评审意见
  onEditComment = (approvalInfo) => {
    this.setState({ drawerVisible: true, isEdit: true, approvalInfo });
  };

  //  回复签审意见
  onReplyComment = (approvalInfo, editAnswerRecord) => {
    this.setState({ editAnswerRecord }, () => {
      this.setState({ replayVisible: true, approvalInfo });
    });
  };

  // 删除评审意见
  onDeleteComment = (record) => {
    const { dispatch, taskId } = this.props;
    // dispatch({
    //   type: 'dashboard/delete',
    //   payload: {
    //     reviewCommentId: record.id,
    //     taskId,
    //   },
    // }).then(() => {
    //   this.listTaskReviewComments(taskId);
    // });
    Modal.confirm({
      title: '删除',
      content: '确定删除改签审意见吗？',
      okText: '确认',
      cancelText: '取消',
      // onOk: () => this.deleteParam(record.id),
      onOk: () => {
        dispatch({
          type: 'dashboard/delete',
          payload: {
            reviewCommentId: record.id,
            taskId,
          },
        }).then(() => {
          this.listTaskReviewComments(taskId);
        });
      },
    });
  };

  render() {
    // content  审核表格数据源
    // onDeleteComment 删除评审单意见
    // onSubmitApproval 审核表单提交
    // props = {关联数据,签审类别,签审单位,问题类别}
    const {
      content = [],
      page,
      form,
      // taskId,
      dictEntries,
      // processInstanceId,
      departments,
      completed,
      loading,
      isDocumentModify,
      confirmLoading,
    } = this.props;
    const {
      drawerVisible,
      isEdit,
      approvalInfo,
      replayVisible,
      editAnswerRecord = {},
    } = this.state;
    const { getFieldDecorator, getFieldValue } = form;
    let expandedRowKeys = [];
    if (isDocumentModify) {
      expandedRowKeys =
        page && page.content && page.content.length > 0 ? page.content.map((item) => item.id) : [];
    } else {
      expandedRowKeys = content.length ? content.map((item) => item.id) : [];
    }
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    return (
      <Card
        type="inner"
        title="签审意见"
        style={{ marginBottom: 16 }}
        className="noPaddingCard"
        extra={
          isDocumentModify ? (
            ''
          ) : (
            <Button
              size="small"
              disabled={completed}
              style={{ float: 'right' }}
              onClick={() => this.setState({ drawerVisible: true, isEdit: false })}
            >
              + 添加签审意见
            </Button>
          )
        }
      >
        <div style={{ marginTop: 1 }}>
          <Table
            size="small"
            className="tableEllipsis"
            columns={
              completed || isDocumentModify
                ? this.columns.filter((item) => item.key !== 'action')
                : this.columns
            }
            loading={loading}
            dataSource={isDocumentModify ? (page && page.content) || [] : content || []}
            pagination={false}
            scroll={{ x: 1000 }}
            rowKey={(record) => record.id}
            defaultExpandAllRows
            expandedRowKeys={expandedRowKeys}
            expandedRowRender={(record) =>
              record.answer && (
                <List
                  size="small"
                  className={style.listDescriptionColor}
                  itemLayout="vertical"
                  dataSource={record.answer || []}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        className={style.option}
                        avatar={null}
                        title={
                          <div>
                            {!!item.modifyFullName && (
                              <span
                                style={{
                                  marginRight: 30,
                                  display: 'inline-block',
                                  width: 120,
                                  overflow: 'inherit',
                                }}
                              >
                                回复人：{item.modifyFullName}
                              </span>
                            )}
                            {!!item.reviewDate && (
                              <span>
                                回复时间：{moment(item.reviewDate).format('YYYY-MM-DD HH:mm')}
                              </span>
                            )}
                          </div>
                        }
                        description={item.content}
                      >
                        <div>Content</div>
                      </List.Item.Meta>
                    </List.Item>
                  )}
                  locale={{
                    emptyText: '暂无回复信息',
                  }}
                />
              )
            }
          />
          {/* <Enclosure taskId={taskId} processInstanceId={processInstanceId} completed={completed} /> */}
          <Drawer
            title={isEdit ? '编辑审批意见' : '添加审批意见'}
            width={720}
            onClose={this.onCloseDrawer}
            visible={drawerVisible}
          >
            <Form {...formItemLayout}>
              <Form.Item label="代理意见">
                {getFieldDecorator('agent', {
                  initialValue: approvalInfo && approvalInfo.agent ? approvalInfo.agent : false,
                  rules: [
                    {
                      required: true,
                      message: '请选择代理意见',
                      type: 'boolean',
                    },
                  ],
                })(
                  <Switch
                    checkedChildren="开"
                    unCheckedChildren="关"
                    checked={getFieldValue('agent')}
                  />,
                )}
              </Form.Item>

              {getFieldValue('agent') && (
                <div>
                  <Form.Item label="签审类别">
                    {getFieldDecorator('reviewType', {
                      initialValue:
                        approvalInfo && approvalInfo.reviewType ? approvalInfo.reviewType : '',
                      rules: [
                        {
                          required: true,
                          message: '请输入签审类别',
                        },
                      ],
                    })(
                      <RadioGroup>
                        {dictEntries.TaskReviewType &&
                          dictEntries.TaskReviewType.length &&
                          dictEntries.TaskReviewType.map((item) => (
                            <Radio key={item.id} value={item.id}>
                              {item.name}
                            </Radio>
                          ))}
                      </RadioGroup>,
                    )}
                  </Form.Item>
                  <Form.Item label="签审单位">
                    {getFieldDecorator('reviewerOrg', {
                      initialValue:
                        approvalInfo && approvalInfo.reviewerOrg ? approvalInfo.reviewerOrg : '',
                      rules: [
                        {
                          required: true,
                          message: '请选择签审单位',
                        },
                      ],
                    })(
                      departments && departments.length > 0 && (
                        <Select placeholder="选择签审单位">
                          {departments.map((item) => (
                            <Select.Option key={item.id} value={item.name}>
                              {item.name}
                            </Select.Option>
                          ))}
                        </Select>
                      ),
                    )}
                  </Form.Item>
                  <Form.Item label="签审人">
                    {getFieldDecorator('reviewerName', {
                      initialValue:
                        approvalInfo && approvalInfo.reviewerName ? approvalInfo.reviewerName : '',
                      rules: [
                        {
                          required: true,
                          message: '请输入签审人',
                        },
                      ],
                    })(<Input placeholder="请输入签审人" />)}
                  </Form.Item>
                  <Form.Item label="签审日期">
                    {getFieldDecorator('reviewDate', {
                      initialValue:
                        approvalInfo &&
                        approvalInfo.reviewDate &&
                        moment(approvalInfo.reviewDate, dateFormat),
                      rules: [
                        {
                          required: true,
                          message: '请输入签审日期',
                        },
                      ],
                    })(<DatePicker style={{ width: '100%' }} format={dateFormat} />)}
                  </Form.Item>
                </div>
              )}

              <Form.Item label="问题类别">
                {getFieldDecorator('requeryType', {
                  initialValue:
                    approvalInfo && approvalInfo.requeryType ? approvalInfo.requeryType : '',
                  rules: [
                    {
                      required: true,
                      message: '请输入问题类别',
                    },
                  ],
                })(
                  <Radio.Group>
                    {dictEntries.TaskIssueType &&
                      dictEntries.TaskIssueType.length &&
                      dictEntries.TaskIssueType.map((item) => (
                        <Radio key={item.id} value={item.id}>
                          {item.name}
                        </Radio>
                      ))}
                  </Radio.Group>,
                )}
              </Form.Item>
              <Form.Item label="问题描述">
                {getFieldDecorator('content', {
                  initialValue: approvalInfo && approvalInfo.content ? approvalInfo.content : '',
                  rules: [
                    {
                      required: true,
                      message: '请输入问题描述',
                    },
                  ],
                })(<Input.TextArea rows={4} maxLength={500} placeholder="请输入问题描述" />)}
              </Form.Item>
              {approvalInfo && approvalInfo.associatedData ? (
                <Form.Item label="关联数据">
                  <span>{approvalInfo.associatedData}</span>
                </Form.Item>
              ) : null}
            </Form>
            <div
              style={{
                position: 'absolute',
                left: 0,
                bottom: 0,
                width: '100%',
                borderTop: '1px solid #e9e9e9',
                padding: '10px 16px',
                background: '#fff',
                textAlign: 'right',
              }}
            >
              <Button onClick={this.onCloseDrawer} style={{ marginRight: 8 }}>
                取消
              </Button>
              <Button loading={confirmLoading} onClick={this.onSubmitForm} type="primary">
                提交
              </Button>
            </div>
          </Drawer>
          {replayVisible && (
            <ReplayOption
              visible={replayVisible}
              title={editAnswerRecord.id ? '编辑信息' : '回复信息'}
              data={editAnswerRecord}
              onCancel={() => this.setState({ replayVisible: false })}
              onOK={(value) => this.onSubmitReplay(value)}
            />
          )}
        </div>
      </Card>
    );
  }
}
export default SharedTaskComponents;

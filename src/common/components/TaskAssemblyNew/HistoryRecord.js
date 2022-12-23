import React from 'react';
import { connect } from 'umi';
import moment from 'moment';
import { CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { Table, Tooltip, Card, Tabs } from 'antd';
import HistoryRecordOptions from './HistoryRecordOptions';
import ContentModal from './ContentModal';
import styles from './index.less';

@connect(({ dashboard, loading }) => ({
  dashboard,
  reviewData: dashboard.page,
  taskInfo: dashboard.taskInfo,
  processInstanceData: dashboard.processInstanceData,
  taskProcessStatus: dashboard.taskProcessStatus,
  processData: dashboard.processData,
  processStatus: dashboard.processStatus,
  changeLog: dashboard.changeLog,
  processChangeLog: dashboard.processChangeLog,
  structuredComments: dashboard.structuredComments,
  loading:
    loading.effects['dashboard/getTaskProcessStatus'] ||
    loading.effects['dashboard/getProcessStatus'],
  commentsLoading: loading.effects['dashboard/getStructuredComments'],
}))
class HistoryRecord extends React.Component {
  constructor(props) {
    super(props);
    const { taskId } = this.props;

    this.state = {
      id: taskId,
      // content: [],
      pagination: {
        showTotal: total => <span>共{total}条数据</span>,
        showSizeChanger: true,
        pageSizeOptions: ['20', '50', '100'],
      },
      viewOptionVisible: false,
      viewOptionRecord: {},
      contentVisible: false,
      contents: [],
    };
    this.columns = [
      {
        title: '任务名称',
        dataIndex: 'name',
        key: 'name',
        width: 100,
        render: text => (
          <Tooltip placement="topLeft" title={text}>
            {text}
          </Tooltip>
        ),
      },
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
        width: 180,
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

      {
        title: '执行结果',
        dataIndex: 'outcome',
        key: 'outcome',
        width: 150,
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
      },
      {
        title: '流程意见',
        dataIndex: 'description',
        key: 'description',
        width: 80,
        render: text => (
          <Tooltip title={text} placement="topLeft">
            {text}
          </Tooltip>
        ),
      },
    ];
  }

  componentDidMount() {
    const { processInstanceId, showReviewOpinions, taskInfo } = this.props;
    if (showReviewOpinions) {
      this.columns.push({
        title: '签审意见',
        dataIndex: 'option',
        key: 'option',
        width: 80,
        render: (text, record) => (
          <Tooltip title="点击查看签审意见" placement="topLeft">
            <a onClick={() => this.loadOptions(record)}>查看</a>
          </Tooltip>
        ),
      });
      this.getStructuredComments('target');
    }
    this.getTaskFiles1(taskInfo.processInstanceId || processInstanceId);
    if (processInstanceId) {
      this.onGetProcessStatus(processInstanceId);
      this.getProcessChangeLog(processInstanceId);
      this.fetchTableData(processInstanceId);
    } else {
      const { id } = this.state;
      this.loadTaskInfo(id);
    }
  }

  getTaskFiles1 = processInstanceId => {
    const { dispatch } = this.props;
    dispatch({
      type: 'dashboard/getTaskFiles1',
      payload: { processInstanceId },
      callback: res => {
        this.setState({
          contents: res,
        });
      },
    });
  };

  onContentClick = id => {
    this.setState({
      contentVisible: true,
      taskId: id,
    });
  };

  // 获取结构化签审意见
  getStructuredComments = searchType => {
    const { dispatch, taskInfo } = this.props;
    dispatch({
      type: 'dashboard/getStructuredComments',
      payload: {
        businessKey: taskInfo.businessKey,
        searchType,
      },
    });
  };

  // 加载详情
  loadTaskInfo = id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'dashboard/getTask',
      payload: id,
      callback: (response = {}) => {
        if (response.id) {
          this.getTaskProcessStatus(response.id);
          this.getChangeLog(response.id);
        }
      },
    });
  };

  // 流程更改日志
  getProcessChangeLog = processInstanceId => {
    const { dispatch } = this.props;
    if (processInstanceId) {
      dispatch({
        type: 'dashboard/getProcessChangeLog',
        payload: {
          processInstanceId,
        },
      });
    }
  };

  // 任务更改日志
  getChangeLog = taskId => {
    const { dispatch } = this.props;
    if (taskId) {
      dispatch({
        type: 'dashboard/getChangeLog',
        payload: {
          taskId,
        },
      });
    }
  };

  // 获取流程历史记录
  getTaskProcessStatus = id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'dashboard/getTaskProcessStatus',
      payload: id,
    }).then(() => {
      const { taskProcessStatus } = this.props;
      this.setState({ processStatusData: taskProcessStatus });
    });
  };

  // 获取流程处理记录
  onGetProcessStatus = processInstanceId => {
    const { dispatch } = this.props;
    dispatch({
      type: 'dashboard/getProcessStatus',
      payload: { processInstanceId },
    }).then(() => {
      const { processStatus } = this.props;
      this.setState({ processStatusData: processStatus });
    });
  };

  // 获取审批意见列表
  fetchTableData = (params = {}) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'dashboard/listProcessInstanceReviewComments',
      payload: {
        params,
      },
    }).then(() => {
      const {
        dashboard: { page = {} },
      } = this.props;
      const { pagination = {} } = this.state;
      const paginations = { ...pagination };
      paginations.total = Number(page.totalElements);
      paginations.pageSize = page.size;
      paginations.current = page.number + 1;
      this.setState({
        // content: page.content,
        pagination: paginations,
      });
    });
  };

  loadOptions = record => {
    this.setState({ viewOptionRecord: record }, () => {
      this.setState({ viewOptionVisible: true });
    });
  };

  hideViewOptions = () => {
    this.setState({ viewOptionVisible: false });
  };

  render() {
    const {
      structuredComments = {},
      loading,
      showReviewOpinions,
      commentsLoading,
      showUploadFile,
      className,
    } = this.props;
    const {
      processStatusData = [],
      viewOptionVisible,
      viewOptionRecord = {},
      contentVisible,
      taskId,
      contents = [],
    } = this.state;
    const processStatusData1 = processStatusData.map(item => {
      return {
        ...item,
        uploadFiles: contents.filter(obj => obj.taskId === item.id).length > 0 || false,
      };
    });
    if (showUploadFile) {
      this.columns.push({
        title: '附件信息',
        dataIndex: 'contents',
        width: 80,
        render: (text, record) => {
          if (record.uploadFiles) {
            return (
              <Tooltip title={text} placement="topLeft">
                <a onClick={() => this.onContentClick(record.id)}>附件</a>
              </Tooltip>
            );
          }
          return '';
        },
      });
    }
    const OptionsProps = {
      visible: viewOptionVisible,
      title: `${viewOptionRecord.name} - 签审意见`,
      processInstanceId: viewOptionRecord.processInstanceId,
      taskId: viewOptionRecord.id,
      onOK: this.hideViewOptions,
      onCancel: this.hideViewOptions,
    };

    const columns = [
      {
        title: '协同单位',
        dataIndex: 'reviewerOrg',
        width: 120,
        // sorter: true,
        render: text => (
          <Tooltip placement="topLeft" title={text}>
            {text}
          </Tooltip>
        ),
      },
      {
        title: '审批类别',
        dataIndex: 'reviewTypeName',
        width: 100,
        render: text => (
          <Tooltip placement="topLeft" title={text}>
            {text}
          </Tooltip>
        ),
      },
      {
        title: '审批人',
        dataIndex: 'reviewerName',
        width: 100,
        render: text => (
          <Tooltip placement="topLeft" title={text}>
            {text}
          </Tooltip>
        ),
      },
      {
        title: '审批时间',
        dataIndex: 'reviewDate',
        key: 'reviewDate',
        width: 140,
        render: text => (
          <Tooltip placement="topLeft" title={text}>
            {text && moment(text).format('YYYY-MM-DD HH:mm')}
          </Tooltip>
        ),
      },
      {
        title: '问题类别',
        dataIndex: 'requeryTypeName',
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
        render(text) {
          return (
            <Tooltip title={text} placement="topLeft">
              {text}
            </Tooltip>
          );
        },
      },
    ];

    const number = {
      title: '序号',
      dataIndex: 'index',
      width: 50,
      // sorter: true,
      render: (text, record, index) => <span>{index + 1}</span>,
    };

    const instance = {
      title: '环节',
      key: 'name',
      dataIndex: 'name',
      width: 80,
    };

    const creater = {
      title: '提出人',
      key: 'createFullName',
      dataIndex: 'createFullName',
      width: 100,
    };

    const target = {
      title: '关联数据',
      dataIndex: 'associatedData',
      key: 'associatedData',
      width: 200,
      render(text) {
        return (
          <Tooltip title={text} placement="topLeft">
            {text}
          </Tooltip>
        );
      },
    };

    return (
      <>
        <Card bordered={false} title="处理记录">
          <Table
            className={className}
            rowKey={record => record.id}
            pagination={false}
            dataSource={processStatusData1}
            loading={loading}
            columns={this.columns}
            bordered
            size="small"
            scroll={{ x: 1000 }}
          />
        </Card>
        {showReviewOpinions && (
          <Card bordered={false} title="结构化签审意见">
            <Tabs
              className={styles.noMarTab}
              animated={false}
              defaultActiveKey="target"
              onChange={key => this.getStructuredComments(key)}
            >
              <Tabs.TabPane tab="按环节" key="instance">
                <Table
                  rowKey={record => record.id}
                  pagination={false}
                  dataSource={structuredComments.content || []}
                  loading={commentsLoading}
                  columns={[number, instance, target, creater, ...columns]}
                  bordered
                  size="small"
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab="按数据" key="target">
                <Table
                  rowKey={record => record.id}
                  pagination={false}
                  dataSource={structuredComments.content || []}
                  loading={commentsLoading}
                  columns={[number, target, instance, creater, ...columns]}
                  bordered
                  size="small"
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab="按提出人" key="creator">
                <Table
                  rowKey={record => record.id}
                  pagination={false}
                  dataSource={structuredComments.content || []}
                  loading={commentsLoading}
                  columns={[number, creater, instance, target, ...columns]}
                  bordered
                  size="small"
                />
              </Tabs.TabPane>
            </Tabs>
          </Card>
        )}
        {viewOptionVisible && <HistoryRecordOptions {...OptionsProps} />}
        {contentVisible && (
          <ContentModal
            title="附件列表"
            taskId={taskId}
            onCancel={() => this.setState({ contentVisible: false })}
          />
        )}
      </>
    );
  }
}

export default HistoryRecord;

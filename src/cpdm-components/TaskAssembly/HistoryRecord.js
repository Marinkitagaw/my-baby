import React from 'react';
import { connect } from 'umi';
import moment from 'moment';
import { CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { Table, Tooltip, Card } from 'antd';

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
  loading:
    loading.effects['dashboard/getTaskProcessStatus'] ||
    loading.effects['dashboard/getProcessStatus'],
}))
class HistoryRecord extends React.Component {
  constructor(props) {
    super(props);
    const { taskId } = this.props;

    this.state = {
      id: taskId,
      pagination: {
        showTotal: total => <span>共{total}条数据</span>,
        showSizeChanger: true,
        pageSizeOptions: ['20', '50', '100'],
      },
    };
  }

  componentDidMount() {
    const { processInstanceId } = this.props;
    if (processInstanceId) {
      this.onGetProcessStatus(processInstanceId);
      this.fetchTableData(processInstanceId);
      this.getProcessChangeLog(processInstanceId);
    } else {
      const { id } = this.state;
      this.loadTaskInfo(id);
    }
  }

  // 加载详情
  loadTaskInfo = id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'dashboard/getTask',
      payload: id,
      callback: (response = {}) => {
        if (response.id) {
          this.getTaskProcessStatus(response.id);
          this.fetchTableData(response.processInstanceId);
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
        pagination: paginations,
      });
    });
  };

  render() {
    const { loading, reviewData } = this.props;
    console.log('reviewData--old', reviewData);
    const { processStatusData = [] } = this.state;

    const columns1 = [
      {
        title: '任务名称',
        dataIndex: 'name',
        key: 'name',
        width: 220,
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
        width: 220,
        render: val => {
          if (val)
            return (
              <span>
                <CheckCircleOutlined style={{ color: 'green' }} />
                &nbsp;{val}
              </span>
            );
          return <ClockCircleOutlined style={{ color: 'red' }} />;
        },
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
        title: '备注',
        dataIndex: 'description',
        key: 'description',
        width: 150,
        render: text => (
          <Tooltip title={text} placement="topLeft">
            {text}
          </Tooltip>
        ),
      },
    ];
    return (
      <Card>
        <Table
          rowKey={record => record.id}
          pagination={false}
          dataSource={processStatusData}
          loading={loading}
          columns={columns1}
          size="middle"
          scroll={{ x: 1000 }}
        />
      </Card>
    );
  }
}

export default HistoryRecord;

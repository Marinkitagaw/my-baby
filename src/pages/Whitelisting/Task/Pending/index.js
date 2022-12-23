import React from 'react';
import { connect, request, Link } from 'umi';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Table, Button, Input, Card, Space } from 'antd';
import moment from 'moment';
import { PageHeaderWrapper } from '@cpdm/layout';

@Form.create()
@connect(({ task, loading }) => ({
  completedTasks: task.tasks,
  loading: loading.effects['task/tasks'],
}))
class index extends React.Component {
  constructor(props) {
    super(props);
    // console.log('pending.props', props);
    this.state = {
      pagination: {
        showTotal: total => <span>共{total}条数据</span>,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '50', '100'],
      },
    };
  }

  componentDidMount() {
    this.onGetBacklogTasks();
  }

  // 获取任务列表
  onGetBacklogTasks = params => {
    const { dispatch } = this.props;
    dispatch({
      type: 'task/tasks',
      payload: {
        size: 10,
        ...params,
        completed: false,
        category: 'appRecord',
      },
    }).then(() => {
      const { completedTasks = {} } = this.props;
      const { pagination = {} } = this.state;
      const paginations = { ...pagination };
      paginations.total = Number(completedTasks.totalElements);
      paginations.pageSize = completedTasks.size;
      paginations.current = completedTasks.number + 1;
      this.setState({
        pagination: paginations,
      });
    });
  };

  // 表格分页
  onTableChange = paginations => {
    const { pagination } = this.state;
    const pager = { ...pagination };
    pager.current = paginations.current;
    const {
      form: { validateFields },
    } = this.props;
    validateFields((err, value) => {
      if (!err) {
        this.onGetBacklogTasks({
          size: paginations.pageSize,
          page: paginations.current - 1,
          ...value,
        });
      }
    });
  };

  // 检索
  onValidateFields = () => {
    const {
      form: { validateFields },
    } = this.props;
    validateFields((err, value) => {
      if (!err) {
        this.onGetBacklogTasks(value);
      }
    });
  };

  // 重置
  onResetFields = () => {
    const {
      form: { resetFields },
    } = this.props;
    resetFields();
    this.onGetBacklogTasks();
  };

  render() {
    const {
      form: { getFieldDecorator },
      completedTasks = {},
      loading,
    } = this.props;
    const { content: taskData = [] } = completedTasks;
    const { pagination } = this.state;
    // const onCheck = async () => {
    //   const res = await request(`/chat/task/eeabdc4c-59b0-11ed-a9b8-4437e6a13e34/info`, {
    //     method: 'GET',
    //   });
    // };
    // history.pushState(
    //   pathname: {`/task/${record.businessKey}/info`},
    //   state: {record}
    // );
    const taskColumns = [
      {
        title: '任务名称',
        dataIndex: 'name',
        key: 'name',
        width: '20%',
        render: (text, record) =>
          // {
          // return (
          //   <Space>
          //     <Link to={`/task/${record.id}/info?${record.businessKey}`} target="_blank">
          //       {text}
          //     </Link>
          //   </Space>
          // );
          // },
          record.url ? (
            <a href={`${process.env.TASK_PATH}${record.url}?${record.businessKey}`} target="_self">
              {text}
            </a>
          ) : (
            text
          ),
      },
      {
        title: '流程主题',
        dataIndex: 'subject',
        key: 'subject',
        width: '20%',
      },
      {
        title: '流程名称',
        dataIndex: 'processDefinitionName',
        key: 'processDefinitionName',
        width: '20%',
        // render: (text, record) => {
        //   return <Button onClick={onCheck}>{text}</Button>;
        // },
      },
      {
        title: '提交人',
        dataIndex: 'processInstanceCreatorName',
        key: 'processInstanceCreatorName',
        width: '20%',
      },
      {
        title: '分配时间',
        dataIndex: 'startTime',
        key: 'startTime',
        width: '20%',
        render: text => text && moment(text).format('YYYY-MM-DD HH:mm'),
      },
      // {
      //   title: '最后期限',
      //   dataIndex: 'dueDate',
      //   key: 'dueDate',
      //   width: 150,
      //   render: text => text && moment(text).format('YYYY-MM-DD HH:mm'),
      // },
    ];

    return (
      <PageHeaderWrapper title="待办任务" breadcrumb={false}>
        <Card>
          <Form layout="inline" style={{ marginBottom: 16, whiteSpace: 'nowrap' }}>
            <Form.Item label="任务名称">
              {getFieldDecorator('name')(
                <Input placeholder="按名称检索" style={{ width: '100%' }} allowClear />
              )}
            </Form.Item>
            <Form.Item label="任务主题">
              {getFieldDecorator('subject')(
                <Input placeholder="按主题检索" style={{ width: '100%' }} allowClear />
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" onClick={this.onValidateFields}>
                搜索
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.onResetFields}>
                重置
              </Button>
            </Form.Item>
          </Form>
          <Table
            rowKey={record => record.id}
            pagination={pagination}
            size="middle"
            loading={loading}
            columns={taskColumns}
            dataSource={taskData}
            onChange={this.onTableChange}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default index;

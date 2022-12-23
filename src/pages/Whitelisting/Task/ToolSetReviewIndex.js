import TaskAssembly from '@/common/components/TaskAssemblyNew';
import React from 'react';
import { connect, Link } from 'umi';
import { Fieldset } from '@cpdm/components';
import { Table, Card, Tooltip, Space, Badge, Radio, Button, Form } from 'antd';
import moment from 'moment';

@connect(({ dashboard, task }) => ({
  taskInfo: dashboard.taskInfo,
  taskData: task.taskData,
}))
class ResourceReviewIndex extends React.Component {
  constructor(props) {
    super(props);
    this.pw = React.createRef();
    const {
      match: {
        params: { taskId },
      },
    } = this.props;
    this.state = {
      taskId,
    };
  }
  componentDidMount() {
    // this.getApplyData();
  }

  render() {
    const {
      match: {
        params: { taskId },
      },
    } = this.props;
    const search = this.props.location.search;
    const businessKey = search.replace('?', '');
    const taskProps = {
      businessKey: businessKey,
      taskId: taskId,
      hideTitle: true,
      hideSupplier: true,
    };
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
            <Link to={`/toolsetlist/${record.id}/info`} target="_blank">
              {record.name}
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
        title: '申请单位',
        dataIndex: 'applicant',
      },
      {
        title: '软件类型',
        dataIndex: 'category',
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
        render: (text, record) => {
          return (
            <Space>
              <Badge status="success" text={text} />
            </Space>
          );
          //   return { text === '正在工作' && <Space>
          //   <Badge status="success" text={text} />
          // </Space> }
          //   switch (text) {
          //     case '正在工作':
          //       return (
          //         <Space>
          //           <Badge status="success" text={text} />
          //         </Space>
          //       );
          //     case '正在审阅':
          //       return (
          //         <Space>
          //           <Badge status="processing" text={text} />
          //         </Space>
          //       );
          //     case '修改中':
          //       return (
          //         <Space>
          //           <Badge status="warning" text={text} />
          //         </Space>
          //       );
          //     case '已发布':
          //       return (
          //         <Space>
          //           <Badge status="cyan" text={text} />
          //         </Space>
          //       );
          //     case '已归档':
          //       return (
          //         <Space>
          //           <Badge status="default" text={text} />
          //         </Space>
          //       );
          //     default:
          //       return null;
          //   }
        },
      },
    ];
    return (
      <div>
        <TaskAssembly id={taskId} businessKey={businessKey} {...taskProps}>
          <Card>
            <Fieldset legend="审批数据">
              <Table columns={columns} />
              <Form style={{ marginTop: '30px' }}>
                <Form.Item label="审批意见">
                  <Radio.Group
                  // onChange={onChange}
                  // value={value}
                  >
                    <Radio value={1}>通过</Radio>
                    <Radio value={2}>驳回</Radio>
                  </Radio.Group>
                </Form.Item>
              </Form>
            </Fieldset>

            <p style={{ textAlign: 'center' }}>
              <Button type="primary">完成任务</Button>
            </p>
          </Card>
        </TaskAssembly>
      </div>
    );
  }
}

export default ResourceReviewIndex;

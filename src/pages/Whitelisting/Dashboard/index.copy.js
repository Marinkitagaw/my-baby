import { PageHeader, Table, Card, Row, Col, Pie, Space, Tooltip } from 'antd';
import { RightCircleFilled } from '@ant-design/icons';
import React, { useEffect, useState, useCallback } from 'react';
import moment from 'moment';
import index from '../ToolSetList/ManageList';
import { connect, Link } from 'umi';
import { PageHeaderWrapper } from '@cpdm/layout';
import Distribution from '../Distribution';
import PieChart from '../LineChart';

const Dashboard = props => {
  const { pendingSource, completedSource, dispatch, majorData, classificationData, stepData } =
    props;
  const [taskTotal, setTaskTotal] = useState('');
  const [isHome, setIsHome] = useState(true);

  useEffect(() => {
    getMajorData('major');
    getClassificationData('classification');
    getStepData('category');
  }, []);

  useEffect(() => {
    getPendingData();
    getCompletedData();
  }, []);

  const responsiveLeft = {
    xs: 24,
    sm: 24,
    md: 19,
  };

  const responsiveRight = {
    xs: 24,
    sm: 24,
    md: 5,
  };

  const contentStyle = (
    <style>
      {`
          body{
              background:#EBEDED;  
          }
      .ant-layout{
          background:#EBEDED;
      }
      .ant-layout-footer{
          background:#EBEDED;
      }
      .ant-table-thead > tr > th{
          // background:#E8EFFC;
      }
      .ant-input{
          border:1px solid #EBEDED;
      }
      .ant-descriptions-bordered .ant-descriptions-item-label{
           background:#EBEDED; 
      }
      `}
    </style>
  );
  const getPendingData = params => {
    dispatch({
      type: 'task/pending',
      payload: {
        size: 10,
        ...params,
        completed: false,
        category: 'appRecord',
      },
    });
  };

  const getCompletedData = params => {
    dispatch({
      type: 'task/completed',
      payload: {
        size: 10,
        ...params,
        completed: true,
        category: 'appRecord',
      },
    });
  };
  const getMajorData = params => {
    dispatch({
      type: 'toolset/getMajorData',
      payload: {
        type: params,
      },
    });
  };
  const getStepData = params => {
    dispatch({
      type: 'toolset/getStepData',
      payload: {
        type: params,
      },
    });
  };
  const getClassificationData = params => {
    dispatch({
      type: 'toolset/getClassificationData',
      payload: {
        type: params,
      },
    });
  };

  const pagination = {
    defaultPageSize: 5,
    showTotal: total => <span>共{total}条数据</span>,
  };
  const columns = [
    {
      title: '任务名称',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
      render: (text, record) =>
        // {
        //   return (
        //     <Space>
        //       <Link to={`/task/${record.businessKey}/info?${record.id}`} target="_blank">
        //         {text}
        //       </Link>
        //     </Space>
        //   );
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
  ];
  return (
    <>
      {isHome ? (
        <PageHeader title="上午好,欢迎回来" style={{ padding: '0' }}>
          {/* <img src={} alt="" style={{ width: '100%', height: '150px', marginBottom: '14px' }} /> */}
          <Row gutter={[16, 16]} style={{ marginTop: 0 }}>
            <Col {...responsiveLeft}>
              <Card title="工具集概览" size="middle" style={{ height: 500, overflow: 'hidden' }}>
                <PieChart name="所属专业统计" data={majorData} color="blue" />
              </Card>
            </Col>
            <Col {...responsiveRight}>
              {/* <Card
            title="应用环节统计"
            unNeedMinHeight
            titleExtra={<span>(共60项)</span>}
            style={{ height: 443, overflow: 'hidden' }}
          >
            <Distribution.PersonalToDo name="总计" stepData={stepData} />
          </Card> */}
              <Card
                style={{ height: 500, overflow: 'hidden' }}
                bordered={false}
                title={
                  <strong style={{ borderLeft: '8px solid #4595fc', paddingLeft: '11px' }}>
                    最新通知
                  </strong>
                }
                bodyStyle={{ padding: 16, overflow: 'auto' }}
                extra={
                  <Link
                    style={{ color: '#283c53' }}
                    onClick={() => {
                      setIsHome(false);
                    }}
                  >
                    查看全部
                    <RightCircleFilled
                      style={{ color: '#a5a7ad', backgroundColor: '#ebebeb', marginLeft: '5px' }}
                    />
                  </Link>
                }
              >
                最新通知
                {/* {data.map(i => (
              <Tooltip
                key={uuid()}
                title={`${i.modifierFullName} : 于 ${
                  i.modifyStamp ? moment(i.modifyStamp).format('YYYY/MM/DD HH:mm') : '--'
                } 更新了文档：${i.name || '--'}, ${i.code || '--'}, ${i.version || '--'}, ${
                  i.lifecycleStateName || '--'
                }`}
              >
                <p
                  style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    border: '2px solid #b2daf5',
                    padding: 8,
                    borderRadius: 4,
                    fontSize: 12,
                    wordBreak: 'break-all',
                  }}
                >
                  {i.infoUrl ? (
                    <a target="_blank" href={i.infoUrl} rel="noreferrer">
                      <strong>{i.modifierFullName}</strong>
                    </a>
                  ) : (
                    <strong>{i.modifierFullName}</strong>
                  )}
                  &nbsp;于&nbsp;
                  <span>
                    {i.modifyStamp ? moment(i.modifyStamp).format('YYYY/MM/DD HH:mm') : '--'}
                  </span>
                  &nbsp;更新了文档&nbsp;
                  {`${i.name || '--'}, ${i.code || '--'}, ${i.version || '--'}, ${
                    i.lifecycleStateName || '--'
                  }`}
                </p>
              </Tooltip>
            ))} */}
              </Card>
            </Col>
          </Row>
          <Row gutter={24} style={{ marginTop: '20px' }}>
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              {/* <Card
            title="所属专业统计"
            size="middle"
            bodyStyle={{ padding: 16 }}
            style={{ marginTop: 16, height: 443, overflow: 'hidden' }}
          >
            <LineChart name="所属专业统计" data={majorData} color="blue" />
          </Card> */}
              <Card
                title={`个人待办任务(共${pendingSource.numberOfElements}个)`}
                unNeedMinHeight
                style={{ height: 443, overflow: 'hidden' }}
                extra={
                  <Link to="/tool-management/task/pending">
                    查看全部
                    <RightCircleFilled
                      style={{ color: '#a5a7ad', backgroundColor: '#ebebeb', marginLeft: '5px' }}
                    />
                  </Link>
                }
              >
                <Table
                  columns={columns}
                  dataSource={pendingSource.content}
                  rowKey={record => record.id}
                  size="small"
                  pagination={pagination}
                />
              </Card>
            </Col>
          </Row>
          {/* <Row gutter={24}>
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <Card title="工具类别统计" style={{ marginTop: 16, height: 443, overflow: 'hidden' }}>
            <LineChart name="工具类别统计" data={classificationData} color="green" />
          </Card>
        </Col>
      </Row> */}
          {/* {contentStyle} */}
        </PageHeader>
      ) : (
        <PageHeaderWrapper title="全部通知" breadcrumb={false}>
          <Card>
            {/* <Form layout="inline" style={{ marginBottom: 16, whiteSpace: 'nowrap' }}>
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
            </Form> */}
            <Table
              rowKey={record => record.id}
              pagination={pagination}
              size="middle"
              //   loading={loading}
              //   columns={taskColumns}
              //   dataSource={taskData}
              //   onChange={this.onTableChange}
            />
          </Card>
        </PageHeaderWrapper>
      )}
    </>
  );
};

export default connect(({ task, toolset }) => {
  return {
    pendingSource: task.pending,
    completedSource: task.completed,
    majorData: toolset.majorData,
    stepData: toolset.stepData,
    classificationData: toolset.classificationData,
  };
})(Dashboard);

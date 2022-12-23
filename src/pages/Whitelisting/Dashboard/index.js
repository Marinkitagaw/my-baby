import { PageHeader, Table, Card, Row, Col, Pie, Space, Tooltip, Button } from 'antd';
import { RightCircleFilled } from '@ant-design/icons';
import React, { useEffect, useState, useCallback } from 'react';
import moment from 'moment';
import index from '../ToolSetList/ManageList';
import { connect, Link } from 'umi';
import { PageHeaderWrapper } from '@cpdm/layout';
import Distribution from '../Distribution';
import PieChart from '../LineChart';
import bannerImg from '@/assets/banner.png';
import { getNoticeData } from '@/services/dashboard';
const Dashboard = props => {
  const { pendingSource, completedSource, dispatch, majorData, classificationData, stepData } =
    props;
  const [taskTotal, setTaskTotal] = useState('');
  const [isHome, setIsHome] = useState(true);
  const [noticePagination, setNoticePagination] = useState({
    showTotal: total => <span>共{total}条数据</span>,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '50', '100'],
  });
  const [noticeData, setNoticeData] = useState([]);
  const [noticeLoading, setNoticeLoading] = useState(false);

  useEffect(() => {
    getPendingData();
    getCompletedData();
  }, []);

  useEffect(() => {
    onGetNotice({ page: 0, size: 10 });
  }, [isHome]);

  const responsiveLeft = {
    xs: 24,
    sm: 24,
    md: 18,
  };

  const responsiveRight = {
    xs: 24,
    sm: 24,
    md: 6,
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

  // 表格分页
  const onTableChange = paginations => {
    const pager = { ...noticePagination };
    pager.current = paginations.current;
    onGetNotice({
      size: paginations.pageSize,
      page: paginations.current - 1,
    });
  };

  const onGetNotice = async params => {
    setNoticeLoading(true);
    const res = await getNoticeData({
      ...params,
      name: '批准',
      completed: true,
      category: 'appRecord',
    });
    if (res && res.content) {
      setNoticeData([...res.content]);
      const paginations = { ...noticePagination };
      paginations.total = Number(res.totalElements);
      paginations.pageSize = res.size;
      paginations.current = res.number + 1;
      setNoticePagination({ ...paginations });
      setNoticeLoading(false);
    }
  };
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

  const pagination = {
    defaultPageSize: 5,
    showTotal: total => <span>共{total}条数据</span>,
  };

  const noticColumns = [
    {
      title: '申请单位',
      dataIndex: 'applicant',
      key: 'applicant',
      width: '20%',
    },
    {
      title: '申请人',
      dataIndex: 'applicantPerson',
      key: 'applicantPerson',
      width: '20%',
    },
    {
      title: '申请时间',
      dataIndex: 'applicantStamp',
      key: 'applicantStamp',
      width: '20%',
      render: text => {
        return <>{text && moment(text).format('YYYY-MM-DD')}</>;
      },
    },
    {
      title: '申请类型',
      dataIndex: 'applicantType',
      key: 'applicantType',
      width: '20%',
    },
    {
      title: '申请内容',
      dataIndex: 'appToolName',
      key: 'appToolName',
      width: '20%',
    },
  ];
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
          <img
            src={bannerImg}
            alt=""
            style={{ width: '100%', height: '120px', marginBottom: '14px' }}
          />
          <Row gutter={[16, 16]} style={{ marginTop: 0 }}>
            <Col {...responsiveLeft}>
              <Card title="工具集概览" size="middle" style={{ height: 500, overflow: 'hidden' }}>
                <PieChart name="所属专业统计" data={majorData} color="blue" />
              </Card>
            </Col>
            <Col {...responsiveRight}>
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
                    <a>查看全部</a>
                    <RightCircleFilled
                      style={{ color: '#a5a7ad', backgroundColor: '#ebebeb', marginLeft: '5px' }}
                    />
                  </Link>
                }
              >
                {noticeData.map(i => (
                  <Tooltip
                    key={i.id}
                    title={`${i.applicant} - ${i.applicantPerson} - ${
                      i.applicantStamp ? moment(i.applicantStamp).format('YYYY/MM/DD') : '--'
                    }-${i.applicantType}-${i.appToolName}`}
                  >
                    <p
                      style={{
                        height: 50,
                        lineHeight: '30px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        border: '2px solid #b2daf5',
                        padding: 8,
                        fontWeight: 'bold',
                        borderRadius: 4,
                        fontSize: 12,
                        wordBreak: 'break-all',
                      }}
                    >
                      <span>
                        {i.applicant} - {i.applicantPerson} -
                        {i.applicantStamp ? moment(i.applicantStamp).format('YYYY/MM/DD') : '--'} -
                        {i.applicantType} &nbsp;{i.appToolName}
                      </span>
                    </p>
                  </Tooltip>
                ))}
              </Card>
            </Col>
          </Row>
          <Row gutter={24} style={{ marginTop: '20px' }}>
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <Card
                title={`个人待办任务(共${pendingSource.numberOfElements}个)`}
                unNeedMinHeight
                style={{ height: 443, overflow: 'hidden' }}
                extra={
                  <Link to="/task/pending">
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
        </PageHeader>
      ) : (
        <PageHeaderWrapper title="全部通知" breadcrumb={false}>
          <Card>
            <Table
              rowKey={record => record.id}
              pagination={noticePagination}
              loading={noticeLoading}
              size="middle"
              columns={noticColumns}
              dataSource={noticeData}
              onChange={onTableChange}
            />
          </Card>
          <p style={{ marginTop: '16px', textAlign: 'right' }}>
            <Button type="primary" onClick={() => setIsHome(true)}>
              返回
            </Button>
          </p>
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

import { edit } from '@/services/baseline';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import {
  Button,
  PageHeader,
  Dropdown,
  Menu,
  Descriptions,
  Card,
  Row,
  Col,
  Modal,
  message,
} from 'antd';
import { values } from 'lodash';
import { connect, history, Link } from 'umi';
import React, { Fragment, useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BasicDetails from './Tabs/BasicDetails';

const { confirm } = Modal;
const Detail = props => {
  const { dispatch, dataSource } = props;
  const { id } = useParams(props);
  const basiComp = useRef(null);
  const [tabActiveKey, setTabActiveKey] = useState('1');

  useEffect(() => {
    loadData(id);
  }, []);

  //加载详情数据
  const loadData = id => {
    dispatch({
      type: 'toolset/loadingData',
      payload: {
        id: id,
      },
    });
  };
  //编辑
  const onEdit = () => {
    history.push(`/toolset/${id}/modify`);
  };
  const onFix = () => {
    history.push(`/toolset/${id}/revision`);
  };

  //提交审批
  const onSubApply = () => {
    // const body = [dataSource];
    // console.log('body', dataSource);
    dispatch({
      type: 'toolset/subApply',
      payload: {
        body: [dataSource],
      },
    }).then(res => {
      if (res) {
        history.push(`/toolset/list`);
        message.success('提交审批成功');
      } else {
        message.error('提交审批失败');
      }
    });
  };

  //提交禁用审批
  const onSubDisableApply = () => {
    dispatch({
      type: 'toolset/subDisableApply',
      payload: {
        body: [dataSource],
      },
    }).then(res => {
      if (res) {
        history.push(`/toolset/list`);
        message.success('提交禁用审批成功');
      } else {
        message.error('提交禁用审批失败');
      }
    });
  };

  //删除
  const onDelete = () => {
    Modal.confirm({
      title: '确定要删除此条数据吗?',
      content: '删除成功后，此条数据的所有信息都会被删除',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        dispatch({
          type: 'toolset/deleteToolSet',
          payload: {
            id: id,
          },
        }).then(res => {
          if (res) {
            message.success('删除成功');
          } else {
            message.error('删除失败');
          }
        });
        history.push('/toolset/list');
      },
      onCancel() {},
    });
  };

  const onTabChange = values => {
    setTabActiveKey(values);
  };
  //更多菜单下拉选
  const menu = (
    <Menu
      onClick={({ key }) => {
        if (key === 'edit') {
          onEdit();
        }
        if (key === 'fix') {
          onFix();
        }
        if (key === 'subApply') {
          onSubApply();
        }
      }}
      items={[
        {
          label: '编辑',
          key: 'edit',
        },
        {
          label: '修订',
          key: 'fix',
        },
        {
          label: '提交审批',
          key: 'subApply',
        },
        // {
        //   label: '更新审批',
        //   key: 'updateApply',
        // },
        // {
        //   label: '禁用审批',
        //   key: 'disableApply',
        // },
      ]}
    />
  );
  //禁用详情
  const disableMenu = (
    <Menu
      onClick={({ key }) => {
        if (key === 'edit') {
          onEdit();
        }
        if (key === 'disableApply') {
          onSubDisableApply();
        }
      }}
      items={[
        {
          label: '编辑',
          key: 'edit',
        },
        // {
        //   label: '更新审批',
        //   key: 'updateApply',
        // },
        {
          label: '禁用审批',
          key: 'disableApply',
        },
      ]}
    />
  );

  const extraContent = (
    <Row>
      <Col sm={24} md={12}>
        <div style={{ color: 'rgba(0, 0, 0, 0.43)' }}>状态</div>
        <div style={{ color: 'rgba(0, 0, 0, 0.85)', fontSize: 20 }}>
          {dataSource?.lifecycleStateName || ''}
        </div>
      </Col>
      <Col sm={24} md={12}>
        <div style={{ color: 'rgba(0, 0, 0, 0.43)' }}>实现状态</div>
        <div style={{ color: 'rgba(0, 0, 0, 0.85)', fontSize: 20 }}>
          {dataSource?.status?.description || ''}
        </div>
      </Col>
    </Row>
  );
  const extra = (
    <>
      <Button
        type="primary"
        style={{ marginRight: '10px' }}
        onClick={onEdit}
        disabled={
          dataSource.lifecycleStateName === '已发布' ||
          dataSource.lifecycleStateName === '正在审阅' ||
          dataSource.lifecycleStateName === '已禁用'
        }
      >
        编辑
      </Button>
      <Button
        onClick={onFix}
        style={{ marginRight: '10px' }}
        disabled={
          dataSource.lifecycleStateName === '正在工作' ||
          dataSource.lifecycleStateName === '修改中' ||
          dataSource.lifecycleStateName === '正在审阅' ||
          dataSource.lifecycleStateName === '已禁用'
        }
      >
        修订
      </Button>
      <Button
        type="danger"
        onClick={onDelete}
        disabled={
          dataSource.lifecycleStateName === '修改中' ||
          dataSource.lifecycleStateName === '已禁用' ||
          dataSource.lifecycleStateName === '已发布' ||
          dataSource.lifecycleStateName === '正在审阅'
        }
      >
        删除
      </Button>
    </>
  );

  const content = (
    <Descriptions column={3}>
      <Descriptions.Item label="创建者">{dataSource?.creator?.fullName}</Descriptions.Item>
      <Descriptions.Item label="修改者">{dataSource?.modifier?.fullName}</Descriptions.Item>
      <Descriptions.Item label="所有者">{dataSource?.creator?.fullName}</Descriptions.Item>
      <Descriptions.Item label="创建时间">{dataSource?.modifyStamp}</Descriptions.Item>
      <Descriptions.Item label="修改时间">{dataSource?.modifyStamp}</Descriptions.Item>
      <Descriptions.Item label="发布时间"></Descriptions.Item>
    </Descriptions>
  );

  const tabList = [
    {
      tab: '基本信息',
      key: '1',
    },
    // {
    //   tab: '历史版本',
    //   key: '2',
    // },
    // {
    //   tab: '相关流程',
    //   key: '3',
    // },
    // {
    //   tab: '对象团队',
    //   key: '4',
    // },
  ];
  return (
    <PageHeaderWrapper
      title={`工具项:${dataSource?.code},${dataSource?.name},${
        dataSource?.lifecycleStateName || ''
      } ,   ${dataSource.version}`}
      extra={extra}
      content={content}
      tabList={tabList}
      breadcrumb={false}
      tabActiveKey={tabActiveKey}
      onTabChange={key => onTabChange(key)}
    >
      <Card>
        <BasicDetails dataSource={dataSource} />
      </Card>
    </PageHeaderWrapper>
  );
};

export default connect(({ toolset }) => {
  return {
    dataSource: toolset.dataSource,
  };
})(Detail);

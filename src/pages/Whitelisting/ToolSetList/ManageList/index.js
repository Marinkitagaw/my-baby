import { PlusOutlined, FolderOpenTwoTone, FolderTwoTone } from '@ant-design/icons';
import {
  PageHeader,
  Card,
  Tree,
  Table,
  Row,
  Col,
  Empty,
  Space,
  Button,
  Input,
  Form,
  Select,
  Tooltip,
  Badge,
  message,
} from 'antd';
import { PageHeaderWrapper, ProTable } from '@ant-design/pro-components';
import React, { useState, useRef, useEffect, useForm, useCallback } from 'react';
import moment from 'moment';
import { getToolList } from '@/common/services/toolset/list/toolset';
import { connect, Link, history } from 'umi';
import toolset from '@/models/toolset';
import { values } from 'lodash';

const ToolSetList = props => {
  const [rowKeys, setRowKeys] = useState([]);
  const [row, setRow] = useState('');
  const searchTreeData = useRef();
  const searchState = useRef();
  const searchData = useRef();
  const searchMajor = useRef();
  const searchSys = useRef();
  const [form] = Form.useForm();
  const formref = React.createRef();
  const { Option } = Select;
  const {
    list,
    dispatch,
    treeData,
    loading,
    treeLoading,
    submitLoading,
    lifeState,
    majorDict,
    appDict,
  } = props;

  const majorDictionary = majorDict.major;
  const appDictionary = appDict.applicationLink;

  //获取表单数据
  const getList = values => {
    if (values.stateId) {
      dispatch({
        type: 'toolset/getToolList',
        payload: {
          ...values,
          type: 'list',
        },
      });
    }
  };
  //获取工具项生命周期模板
  const getStateSearch = () => {
    dispatch({
      type: 'toolset/getState',
      payload: {
        type: '工具项生命周期模板',
      },
    });
  };

  //获取所属专业字典
  const getMajorDictionary = () => {
    dispatch({
      type: 'toolset/getMajorDictionary',
      payload: 'major',
    });
  };

  //获取应用环节字典
  const getAppDictionary = () => {
    dispatch({
      type: 'toolset/getAppDictionary',
      payload: 'applicationLink',
    });
  };

  //表头
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
      width: 140,
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
      width: 140,
    },
    {
      title: '所属专业',
      dataIndex: 'major',
      ellipsis: true,
      width: 140,
    },
    {
      title: '工具分类',
      dataIndex: 'classification',
      ellipsis: true,
      width: 140,
    },
    {
      title: '应用环节',
      dataIndex: 'sys',
      ellipsis: true,
      width: 80,
    },
    {
      title: '申请时间',
      dataIndex: 'modifyStamp',
      ellipsis: true,
      width: 160,
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
      width: 140,
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

  //渲染页面时加载结构树数据和状态数据
  useEffect(() => {
    getTree();
    getStateSearch();
    getMajorDictionary();
    getAppDictionary();
  }, []);

  //进来默认选择“已发布”状态，“正在工作”的数据
  useEffect(() => {
    (async () => {
      if (lifeState) {
        searchState.current = { stateId: lifeState[2]?.stateId };
        getList({ ...searchState.current, revision: 'A' });
      }
      formref.current?.setFieldsValue({
        //formref会把form标签中的值获取或设置
        code: undefined,
        name: undefined,
        major: undefined,
        lifeStateSearch: lifeState[2].stateId,
      });
    })();
  }, [lifeState]);

  //获取树节点
  const getTree = () => {
    dispatch({
      type: 'toolset/getTreeData',
      payload: {
        identifier: 'SoftwareTool',
        level: 'all',
        self: true,
      },
    });
  };

  //新建工具集
  const onCreate = () => {
    history.push(`/toolset/create`);
  };

  //提交审批
  const onHandleApp = () => {
    row?.map(item => {
      dispatch({
        type: 'toolset/subApply',
        payload: {
          body: [item],
        },
      }).then(res => {
        if (res) {
          message.success('提交审批成功');
          history.push(`/task/pending`);
        } else {
          message.error('提交审批失败');
        }
      });
    });
  };

  //点击树结点事件
  const onSelect = (selected, e) => {
    if (selected.length === 0) {
      e.node.dataRef = {};
    }
    const classificationId = [];
    Object.assign(classificationId, {
      classificationId: selected[0],
    });
    searchTreeData.current = classificationId;
    getList({
      ...searchData.current,
      ...searchState.current,
      ...searchTreeData.current,
      ...searchMajor.current,
      ...searchSys.current,
    });
  };

  //模糊查询
  const onSearch = values => {
    searchData.current = values;
    getList({
      ...searchData.current,
      ...searchState.current,
      ...searchTreeData.current,
      ...searchMajor.current,
      ...searchSys.current,
    });
  };

  //状态搜索
  const onSearchState = values => {
    searchState.current = { stateId: values };
    getList({
      ...searchData.current,
      ...searchState.current,
      ...searchTreeData.current,
      ...searchMajor.current,
      ...searchSys.current,
    });
  };

  //所属专业搜索
  const onSearchMajor = values => {
    searchMajor.current = { major: values };
    getList({
      ...searchData.current,
      ...searchState.current,
      ...searchTreeData.current,
      ...searchMajor.current,
      ...searchSys.current,
    });
  };

  //应用环节搜索
  const onSearchSys = values => {
    searchSys.current = { sys: values };
    getList({
      ...searchData.current,
      ...searchState.current,
      ...searchTreeData.current,
      ...searchMajor.current,
      ...searchSys.current,
    });
  };

  //重置表单
  const onReset = () => {
    formref.current?.setFieldsValue({
      //formref会把form标签中的值获取或设置
      code: undefined,
      name: undefined,
      major: undefined,
      sys: undefined,
      lifeStateSearch: lifeState[2].stateId,
    });
    searchData.current = undefined;
    searchTreeData.current = undefined;
    searchSys.current = undefined;
    searchState.current = { stateId: lifeState[2]?.stateId };
    getList({ ...searchState.current });
  };

  // 渲染协同树节点
  const renderTreeNodes = data => {
    return (
      data &&
      !!data.length &&
      data?.map(item => {
        if (item.subClassificationNodes && item.subClassificationNodes.length > 0) {
          return (
            <Tree.TreeNode
              title={item.name ? <span>{item.name}</span> : <span>{item.identifier}</span> || ''}
              key={item.id}
              dataRef={item}
              {...item}
            >
              {renderTreeNodes(item.subClassificationNodes)}
            </Tree.TreeNode>
          );
        }
        return (
          <Tree.TreeNode
            title={item.name ? <span>{item.name}</span> : <span>{item.identifier}</span> || ''}
            {...item}
            dataRef={item}
            key={item.id}
          />
        );
      })
    );
  };

  const extra = (
    <div>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        style={{ marginRight: '10px' }}
        onClick={onCreate}
      >
        新建工具集
      </Button>
    </div>
  );

  const pagination = {
    defaultPageSize: 20,
    showTotal: total => <span>共{total}条数据</span>,
  };

  return (
    <PageHeaderWrapper title="工具集列表" extra={extra} breadcrumb={false}>
      <Row gutter={16} style={{ height: 'calc(100vh - 190px)' }}>
        <Col span={5} style={{ height: '100%' }}>
          <Card
            title="工具分类"
            style={{ height: '100%' }}
            bodyStyle={{
              height: 'calc(100vh - 270px)',
              overflowY: 'auto',
            }}
          >
            {treeData.length > 0 ? (
              <Tree
                showLine={{ showLeafIcon: false }}
                showIcon
                loading={treeLoading}
                icon={p =>
                  p.expanded ? (
                    <FolderOpenTwoTone twoToneColor="#df7d09" />
                  ) : (
                    <FolderTwoTone twoToneColor="#df7d09" />
                  )
                }
                onSelect={onSelect}
              >
                {renderTreeNodes(treeData)}
              </Tree>
            ) : (
              <Empty description="暂无数据" />
            )}
          </Card>
        </Col>
        <Col span={19} style={{ height: '100%' }}>
          <Card>
            <Form
              form={form}
              layout="inline"
              className="searchForm"
              onFinish={onSearch}
              ref={formref}
            >
              <Form.Item
                label="编号"
                name="code"
                style={{ marginTop: '10px', marginRight: '10px' }}
              >
                <Input placeholder="请输入编号" allowClear />
              </Form.Item>
              <Form.Item label="名称" name="name" style={{ marginTop: '10px' }}>
                <Input placeholder="请输入名称" allowClear />
              </Form.Item>
              <Form.Item label="所属专业" name="major" style={{ marginTop: '10px' }}>
                <Select
                  allowClear
                  placeholder="请选择所属专业"
                  onChange={onSearchMajor}
                  options={majorDictionary?.map(item => {
                    return { value: item?.value, label: item?.name };
                  })}
                ></Select>
              </Form.Item>
              <Form.Item label="应用环节" name="sys" style={{ marginTop: '10px' }}>
                <Select
                  allowClear
                  placeholder="请选择应用环节"
                  onChange={onSearchSys}
                  options={appDictionary?.map(item => {
                    return { value: item?.value, label: item?.name };
                  })}
                ></Select>
              </Form.Item>
              {/* <Form.Item label="软件类型" name="category"></Form.Item> */}
              <Form.Item label="状态" style={{ marginTop: '10px' }} name="lifeStateSearch">
                <Select
                  allowClear
                  onChange={onSearchState}
                  placeholder="请选择状态 "
                  // options={lifeState?.map(item => {
                  //   return { value: item?.stateId, label: item?.stateName };
                  // })}
                >
                  <Option value={lifeState[0]?.stateId}>{lifeState[0]?.stateName}</Option>
                  <Option value={lifeState[1]?.stateId}>{lifeState[1]?.stateName}</Option>
                  <Option value={lifeState[2]?.stateId}>{lifeState[2]?.stateName}</Option>
                  <Option value={lifeState[3]?.stateId}>{lifeState[3]?.stateName}</Option>
                  <Option value={lifeState[4]?.stateId}>{lifeState[4]?.stateName}</Option>
                </Select>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginRight: '10px', marginTop: '10px' }}
                >
                  搜索
                </Button>
                <Button onClick={onReset} style={{ marginTop: '10px' }}>
                  重置
                </Button>
              </Form.Item>
            </Form>
            <Table
              size="small"
              style={{ marginTop: '10px' }}
              loading={loading}
              columns={columns}
              dataSource={list.content}
              // rowSelection={{
              //   onChange: (key, rows) => {
              //     setRowKeys(key);
              //     setRow(rows);
              //   },
              //   type: 'checkbox',
              // }}
              // selectedRows={row}
              // rowKey={record => record.id}
              pagination={pagination}
              scroll={{ x: 1000, y: 'calc(100vh - 60px)' }}
            />
          </Card>
        </Col>
      </Row>
    </PageHeaderWrapper>
  );
};

export default connect(({ toolset, loading }) => {
  return {
    list: toolset.List,
    lifeState: toolset.lifeState,
    treeData: toolset.treeData,
    majorDict: toolset.majorDict,
    appDict: toolset.appDict,
    submitLoading: loading.effects['toolset/subApply'],
    treeLoading: loading.effects['toolset/getTreeData'],
    loading: loading.effects['toolset/getToolList'],
  };
})(ToolSetList);

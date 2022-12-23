import React, { Component } from 'react';
import { Button, Table, Modal, Input, Select, Row, Col } from 'antd';
import { Form } from '@ant-design/compatible';
import moment from 'moment';
import { connect } from 'umi';

@connect(({ component, loading }) => ({
  component,
  loading: loading.effects['component/importComponents'],
}))
@Form.create()
class SelectOther extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRows: [],
      pagination: {
        showTotal: total => <span>共{total}条数据</span>,
        showSizeChanger: true,
        pageSizeOptions: ['20', '50', '100'],
      },
    };
  }
  componentDidMount() {
    this.fetchTableData({});
  }
  // 获取列表
  fetchTableData = (params = {}) => {
    // const { createdBy } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'component/listComponents',
      payload: {
        ...params,
        createdBy: true,
      },
    }).then(() => {
      const {
        component: { page = {} },
      } = this.props;
      const { pagination = {} } = this.state;
      const paginations = { ...pagination };
      paginations.total = Number(page.totalElements);
      paginations.pageSize = page.size;
      paginations.current = page.number + 1;
      this.setState({
        content: page.content,
        pagination: paginations,
      });
    });
  };
  onTableChange = paginations => {
    const { pagination, value } = this.state;
    const pager = { ...pagination };
    pager.current = paginations.current;
    this.fetchTableData({
      size: paginations.pageSize,
      page: paginations.current - 1,
      ...value,
    });
  };
  onSearch = () => {
    const {
      form: { validateFields },
    } = this.props;
    validateFields((err, value) => {
      if (err) return;
      this.fetchTableData({
        ...value,
      });
      this.setState({
        value: value,
      });
      this.fetchTableData({ ...value });
    });
  };

  formReset = () => {
    const {
      form: { resetFields },
    } = this.props;
    resetFields();
    this.fetchTableData();
  };
  hanleOk = () => {
    const { onOk } = this.props;
    const { selectedRows } = this.state;
    if (selectedRows.length !== 0) {
      onOk(this.state.selectedRows[0]);
    }
  };

  render() {
    const {
      form: { getFieldDecorator },
      visible = false,
      onCancel,
    } = this.props;
    const { content, pagination } = this.state;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const column = [
      {
        title: '编号',
        dataIndex: 'code',
        width: 100,
      },
      {
        title: '产品名称',
        dataIndex: 'name',
        width: 120,
      },
      {
        title: '产品型号',
        dataIndex: 'modelSpecification',
        width: 120,
      },
      {
        title: '生产商',
        dataIndex: 'productionFactory',
        width: 100,
      },

      {
        title: '质量等级',
        dataIndex: 'qualityLevel',
        width: 120,
      },
      {
        title: '封装外形',
        dataIndex: 'holderype',
        width: 120,
      },
      {
        title: '项目类别',
        dataIndex: 'CLASSIFICATIONS',
        width: 120,
      },
      {
        title: '是否优选',
        dataIndex: 'preferred',
        width: 120,
        ellipsis: true,
        render: text => {
          switch (text) {
            case 'true':
              return '是';
            case 'false':
              return '否';
            default:
              return '';
          }
        },
      },
      {
        title: '目录内外',
        dataIndex: 'schoolDirectory',
        width: 120,
      },
      {
        title: '工作温差范围',
        dataIndex: 'worktempRange',
        width: 170,
      },
      {
        title: '产品手册',
        dataIndex: 'deviceManual',
        width: 120,
      },
      {
        title: '修改时间',
        dataIndex: 'modifyStamp',
        width: 150,
        render(text) {
          return text && moment(text).format('YYYY-MM-DD HH:mm');
        },
      },
      {
        title: '主要性能参数',
        dataIndex: 'zyxncs',
        width: 170,
      },
    ];
    return (
      <Modal
        title="选择其他"
        visible={visible}
        onOk={() => this.hanleOk()}
        onCancel={onCancel}
        width={1200}
      >
        <Form layout="horizontal">
          <Row>
            <Col span={6}>
              <Form.Item key="q" {...formItemLayout} label="编号/名称">
                {getFieldDecorator('q')(<Input placeholder="按编号/名称检索" />)}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item key="ok" {...formItemLayout} label="是否优选">
                {getFieldDecorator('ok')(
                  <Select>
                    <Select.Option value={true}>是</Select.Option>
                    <Select.Option value={false}>否</Select.Option>
                  </Select>,
                )}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item key="reday" {...formItemLayout} label="型号规格">
                {getFieldDecorator('reday')(<Input placeholder="按型号规格检索" />)}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item key="class" {...formItemLayout} label="质量等级">
                {getFieldDecorator('class')(<Input placeholder="按质量等级检索" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <Form.Item key="catalogue" {...formItemLayout} label="目录内外">
                {getFieldDecorator('catalogue')(
                  <Select>
                    <Select.Option value={true}>目录内</Select.Option>
                    <Select.Option value={false}>目录外</Select.Option>
                  </Select>,
                )}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item key="fl" {...formItemLayout} label="分类">
                {getFieldDecorator('fl')(<Input placeholder="按分类检索" />)}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item key="cs" {...formItemLayout} label="厂商">
                {getFieldDecorator('cs')(<Input placeholder="按厂商检索" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row style={{ marginBottom: '20px' }}>
            <Col span={24} style={{ textAlign: 'center' }}>
              <Button
                style={{ marginRight: '20px' }}
                type="primary"
                onClick={() => {
                  this.onSearch();
                }}
              >
                检索
              </Button>
              <Button
                onClick={() => {
                  this.formReset();
                }}
              >
                重置
              </Button>
            </Col>
          </Row>
        </Form>
        <Table
          columns={column}
          scroll={{ x: 1300, y: 500 }}
          dataSource={content}
          rowKey={record => record.id}
          rowSelection={{
            type: 'radio',
            onChange: (selectedRowKeys, selectedRows) => {
              this.setState({ selectedRowKeys: selectedRowKeys, selectedRows: [...selectedRows] });
            },
          }}
          onChange={this.onTableChange}
          pagination={pagination}
        />
      </Modal>
    );
  }
}
export default SelectOther;

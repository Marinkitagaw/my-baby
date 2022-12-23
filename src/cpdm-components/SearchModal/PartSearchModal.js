import React, { PureComponent } from 'react';
import { connect } from 'umi';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Table, Row, Col, Input, Button, message, Tooltip, Select } from 'antd';
import { Modal, StandardFormRow } from '@cpdm/components';
import moment from 'moment';

import styles from '@/styles/table_list.less';
import indexStyle from './index.less';

export const objectTypes = [
  { display: '全部类型', value: 'all' },
  { display: '文档', value: 'Document' },
  { display: '部件', value: 'Part' },
  { display: 'CAD文档', value: 'Drawing' },
  { display: '更改单', value: 'ChangeOrder' },
  { display: '偏离单', value: 'Deviation' },
  { display: '基线', value: 'Baseline' },
  { display: '发送单', value: 'DataSendOrder' },
];

@connect(({ part, loading }) => ({
  part,
  searching: loading.effects['part/listParts'],
}))
@Form.create()
class DataSearchModal extends PureComponent {
  constructor(props) {
    super(props);
    const { objectType } = this.props;
    this.state = {
      selectedRows: [],
      selectedRowKeys: [],
      content: [],
      pagination: {
        showTotal: total => <span>共{total}条数据</span>,
        showSizeChanger: true,
        pageSize: 10,
        pageSizeOptions: ['10', '20', '50'],
      },
      objectType: objectType || 'all',
    };
  }

  componentDidMount() {
    this.handleSearch({ size: 10 });
  }

  // 取消
  onCancel = () => {
    const { onCancel } = this.props;
    this.setState({ content: [] }, () => {
      onCancel();
    });
  };

  // 确定
  onHandler = () => {
    const { selectedRowKeys, selectedRows } = this.state;
    const { onOk } = this.props;
    if (!selectedRowKeys || !selectedRowKeys.length) {
      message.warning('请至少选择一条数据。');
    } else {
      onOk(selectedRows, selectedRowKeys);
      this.setState({
        content: [],
      });
    }
  };

  // 重置表单
  handleFormReset = () => {
    const {
      form: { resetFields },
      objectType,
    } = this.props;
    resetFields();
    this.setState({ content: [] }, () => {
      if (!Array.isArray(objectType)) {
        this.handleSearch({
          objectType,
          page: 0,
          size: 10,
        });
      }
    });
  };

  // 搜索数据
  handleSearch = param => {
    const { dispatch } = this.props;
    const { objectType } = this.state;
    dispatch({
      type: 'part/listParts',
      payload: {
        ...param,
        objectType,
      },
      callback: (response = {}) => {
        const { pagination } = this.state;
        if (response && !response.message && response.status !== 500) {
          const paginations = { ...pagination };
          paginations.total = Number(response.totalElements);
          paginations.pageSize = response.size;
          paginations.current = response.number + 1;
          this.setState({
            content: response.content || [],
            pagination: paginations,
            objectType,
          });
        }
      },
    });
  };

  handleNormalSearch = () => {
    const {
      form: { validateFields },
    } = this.props;

    const { objectType } = this.state;
    validateFields((err, values) => {
      if (err) return;
      this.handleSearch({
        size: 10,
        ...values,
        page: 0,
        objectType,
      });
    });
  };

  // 监听表格分页等发生变化
  handleTableChange = (paginations, sorter) => {
    const { pagination, objectType } = this.state;
    const {
      filters = {},
      form: { validateFields },
    } = this.props;
    const pager = { ...pagination };
    pager.current = paginations.current;
    this.setState({
      pagination: pager,
    });
    const order = sorter.order && sorter.order === 'ascend' ? 'asc' : 'desc';
    const sort = sorter.columnKey && `${sorter.columnKey},${order}`;
    validateFields((err, fieldsValue) => {
      if (err) return;
      this.handleSearch(
        Object.assign(filters, fieldsValue, {
          size: paginations.pageSize,
          page: paginations.current - 1,
          sort,
          objectType: fieldsValue.objectType || objectType,
        }),
      );
    });
  };

  // 对象类型发生变化
  handleObjectType = value => {
    this.setState(
      {
        objectType: value,
      },
      () => {
        this.handleSearch({ size: 10 });
      },
    );
  };

  // 普通搜索框--已指定数据类型（可通过产品库过滤列表）
  renderNormalForm = () => {
    const {
      form: { getFieldDecorator },
      type,
    } = this.props;

    const { objectType } = this.state;

    return (
      <StandardFormRow grid last style={{ marginTop: -8, height: 40 }}>
        <Row>
          <Col span={5} className={styles.extraContent}>
            <span>
              数据类型：
              <Select
                placeholder="请选择"
                style={{ width: '55%' }}
                onChange={this.handleObjectType}
                defaultValue={objectType}
              >
                {(type || objectTypes).map(item => (
                  <Select.Option key={item.value}>{item.display}</Select.Option>
                ))}
              </Select>
            </span>
          </Col>
          <Col span={6}>
            <Form.Item label="编号">
              {getFieldDecorator('code')(<Input placeholder="按编号过滤" style={{ width: 200 }} />)}
            </Form.Item>
          </Col>
          <Col span={6} className={styles.extraContent}>
            <Form.Item label="名称">
              {getFieldDecorator('name')(<Input placeholder="按名称过滤" style={{ width: 200 }} />)}
            </Form.Item>
          </Col>

          <Col span={6} className={styles.extraContent}>
            <span className={styles.submitButtons}>
              <Button type="primary" onClick={this.handleNormalSearch}>
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
            </span>
          </Col>
        </Row>
      </StandardFormRow>
    );
  };

  // 渲染页面
  render() {
    const { title, searching, visible, checkType, confirmLoading } = this.props;
    const { content = [], pagination } = this.state;
    const columns = [
      {
        title: '编号',
        dataIndex: 'code',
        sorter: true,
        width: '21%',
        render: (text, record) => (
          <Tooltip title={record.code} placement="topLeft">
            {/* <img
              className={styles.iconObjectList}
              alt=""
              src={`${process.env.BASE_PATH}${record.icon}`}
            /> */}
            {text}
          </Tooltip>
        ),
      },
      {
        title: '名称',
        dataIndex: 'name',
        sorter: true,
        // width: '17%',
        render(text) {
          return (
            <Tooltip title={text} placement="topLeft">
              {text}
            </Tooltip>
          );
        },
      },
      {
        title: '版本',
        dataIndex: 'version',
        width: '9%',
        render(text) {
          return (
            <Tooltip title={text} placement="topLeft">
              {text}
            </Tooltip>
          );
        },
      },
      {
        title: '状态',
        dataIndex: 'state',
        width: '9%',
        render(text) {
          return (
            <Tooltip title={text} placement="topLeft">
              {text}
            </Tooltip>
          );
        },
      },
      {
        title: '阶段标记',
        dataIndex: 'phaseMark',
        width: '11%',
        render: text => (
          <Tooltip placement="topLeft" title={text}>
            {text}
          </Tooltip>
        ),
      },
      {
        title: '修改时间',
        dataIndex: 'modifyStamp',
        sorter: true,
        width: '13%',
        render(text) {
          return (
            <Tooltip title={moment(text).format('YYYY-MM-DD HH:mm')} placement="topLeft">
              {moment(text).format('YYYY-MM-DD HH:mm')}
            </Tooltip>
          );
        },
      },
    ];
    const rowSelection = {
      type: checkType || 'checkbox',
      // columnWidth: '30px',
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectedRows,
          selectedRowKeys,
        });
      },
    };
    return (
      <Modal
        title={title}
        visible={visible}
        onOk={this.onHandler}
        onCancel={this.onCancel}
        width={1100}
        maskClosable={false}
        confirmLoading={confirmLoading}
        destroyOnClose
      >
        <div className={indexStyle.tableList}>
          <div className={indexStyle.tableListForm}>{this.renderNormalForm()}</div>
        </div>
        <Table
          className={styles.tableEllipsis}
          size="small"
          columns={columns}
          loading={searching}
          dataSource={content}
          rowKey={record => record.id}
          rowSelection={rowSelection}
          pagination={content && content.length ? pagination : false}
          onChange={this.handleTableChange}
        />
      </Modal>
    );
  }
}
export default DataSearchModal;

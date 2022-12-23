import styles from '@/styles/table_list.less';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Modal, StandardFormRow } from '@cpdm/components';
import { Button, Col, Input, message, Row, Select, Table, Tooltip } from 'antd';
import moment from 'moment';
import React, { PureComponent } from 'react';
import { connect, Link } from 'umi';
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
  { display: '技术通知单', value: 'TechnicalNotice' },
  { display: '质量问题 ', value: 'QualityProblem' },
  { display: '功能部件 ', value: 'FunctionPart' },
];

@connect(({ search, loading }) => ({
  search,
  searching: loading.effects['baseline/searchData'],
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
    // this.handleSearch({ size: 10 });
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
    const { dispatch, requestUrl } = this.props;
    const { objectType } = this.state;
    dispatch({
      type: 'baseline/searchData',
      payload: {
        param: {
          ...param,
          objectType,
        },
        requestUrl,
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
  handleTableChange = (paginations, filters, sorter) => {
    const { pagination, objectType } = this.state;
    const {
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
      // () => {
      //   this.handleSearch({ size: 10 });
      // }
    );
  };

  onChangeRowSelection = (keys, rows) => {
    const { selectedRows = [] } = this.state;
    const newRows = rows.filter(item => item);
    const oldArr = [...selectedRows, ...newRows];
    const newArr = [];
    oldArr.map(item => {
      if (!newArr.some(key => key.id === item.id)) {
        newArr.push(item);
      }
      return item;
    });
    this.setState({
      selectedRows: newArr,
      selectedRowKeys: keys,
    });
  };

  // 普通搜索框--已指定数据类型（可通过产品库过滤列表）
  renderNormalForm = () => {
    const {
      form: { getFieldDecorator },
      type,
      defaultType,
    } = this.props;

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
                defaultValue={defaultType}
              >
                {(type || objectTypes).map(item => (
                  <Select.Option key={item.value}>{item.display}</Select.Option>
                ))}
              </Select>
            </span>
          </Col>
          <Col span={7}>
            <Form.Item label="编号或名称">
              {getFieldDecorator('q')(
                <Input placeholder="按编号或名称过滤" style={{ width: 200 }} />,
              )}
            </Form.Item>
          </Col>
          {/* <Col span={6} className={styles.extraContent}>
            <Form.Item label="名称">
              {getFieldDecorator('name')(<Input placeholder="按名称过滤" style={{ width: 200 }} />)}
            </Form.Item>
          </Col> */}

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

  renderDataType = type => {
    let dataType;
    if (type.includes('Process')) {
      dataType = 'process';
    }
    if (type.includes('Design')) {
      dataType = 'design';
    }
    if (type.includes('Function')) {
      dataType = 'function';
    }
    if (type.includes('Fact')) {
      dataType = 'fact';
    }
    return dataType || 'COMMON-DOCS';
  };

  // 渲染页面
  render() {
    const { title, searching, visible, checkType, confirmLoading } = this.props;
    const { content = [], pagination, selectedRowKeys } = this.state;
    const columns = [
      {
        title: '编号',
        dataIndex: 'code',
        width: '21%',
        render: (text, record) => (
          <Tooltip title={record.code} placement="topLeft">
            {record.infoUrl ? (
              <Link target="_blank" style={{ marginRight: 10 }} to={record.infoUrl}>
                {text}
              </Link>
            ) : (
              <Link
                target="_blank"
                style={{ marginRight: 10 }}
                to={`/data/bom/${this.renderDataType(record.objectType)}/BOM/${record.id}`}
              >
                {text}
              </Link>
            )}
          </Tooltip>
        ),
      },
      {
        title: '名称',
        dataIndex: 'name',
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
        title: '密级',
        dataIndex: 'secretLevel',
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
        // sorter: true,
        width: '13%',
        render(text) {
          return (
            <Tooltip title={moment(text).format('YYYY-MM-DD HH:mm')} placement="topLeft">
              {text && moment(text).format('YYYY-MM-DD HH:mm')}
            </Tooltip>
          );
        },
      },
    ];
    const rowSelection = {
      type: checkType || 'checkbox',
      // columnWidth: '30px',
      selectedRowKeys,
      onChange: (keys, selectedRows) => this.onChangeRowSelection(keys, selectedRows),
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
        okText="确认"
        cancelText="取消"
      >
        <div className={indexStyle.tableList}>
          <div className={indexStyle.tableListForm}>{this.renderNormalForm()}</div>
        </div>
        <div style={{ overflow: 'auto' }}>
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
            scroll={{ y: 400 }}
          />
        </div>
      </Modal>
    );
  }
}
export default DataSearchModal;

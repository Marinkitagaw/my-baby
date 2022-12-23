/* eslint-disable no-restricted-syntax */
import styles from '@/styles/table_list.less';
import { getObjectUrl } from '@/utils/utils';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Modal } from '@cpdm/components';
import { Button, Input, message, Select, Table, Tooltip } from 'antd';
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
];

@connect(({ search, loading }) => ({
  search,
  searching: loading.effects['search/simpleSearchData'],
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

  // 取消
  onCancel = () => {
    const { onCancel } = this.props;
    this.setState({ content: [] }, () => {
      onCancel();
    });
  };

  // 确定
  onHandler = () => {
    const { onOk } = this.props;
    const { selectedRowKeys, selectedRows } = this.state;

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
    const { dispatch, repositoryId } = this.props;
    const { objectType } = this.state;
    dispatch({
      type: 'search/simpleSearchData',
      payload: {
        ...param,
        objectType,
        repositoryId,
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
    this.setState({
      objectType: value,
    });
  };

  onChangeRowSelection = (keys, rows) => {
    const { selectedRowKeys, selectedRows } = this.state;
    const newData = [];
    // 遍历添加的数据
    for (let j = 0; j < rows.length; j += 1) {
      const obj = rows[j];
      let isExist = false;
      for (let i = 0; i < selectedRows.length; i += 1) {
        const exits = selectedRows[i];
        if (exits.id === obj.id) {
          isExist = true;
          break;
        }
      }
      if (!isExist) {
        newData.push({
          ...obj,
        });
      }
    }
    if (newData.length > 0) {
      const newDataIds = newData.map(i => i.id);
      this.setState({
        selectedRows: [...selectedRows, ...newData],
        selectedRowKeys: [...selectedRowKeys, ...newDataIds],
      });
    }
  };

  onSelectRow = (record, selected) => {
    const { checkType } = this.props;
    const { selectedRowKeys, selectedRows = [] } = this.state;
    if (selected) {
      const newData = [];
      // 遍历添加的数据
      let isExist = false;
      let key;
      for (key of selectedRows) {
        if (key.id === record.id) {
          isExist = true;
          break;
        }
      }
      if (!isExist) {
        newData.push({
          ...record,
        });
      }
      if (newData.length > 0) {
        const newDataIds = newData.map(i => i.id);
        if (checkType === 'radio') {
          this.setState({
            selectedRows: [...newData],
            selectedRowKeys: [...newDataIds],
          });
        } else {
          this.setState({
            selectedRows: [...selectedRows, ...newData],
            selectedRowKeys: [...selectedRowKeys, ...newDataIds],
          });
        }
      }
    } else {
      let i = 0;
      let key;
      for (key of selectedRows) {
        if (key.id === record.id) {
          if (checkType === 'radio') {
            this.setState({
              selectedRows: [record],
              selectedRowKeys: [record.id],
            });
          } else {
            selectedRows.splice(i, 1);
            selectedRowKeys.splice(i, 1);
            this.setState({
              selectedRows: [...selectedRows],
              selectedRowKeys: [...selectedRowKeys],
            });
          }
        }
        i += 1;
      }
    }
  };

  onSelectAll = (selected, selecteds, changedRows) => {
    const { selectedRowKeys, selectedRows = [] } = this.state;
    let record;
    for (record of changedRows) {
      if (selected) {
        // 遍历添加的数据
        let isExist = false;
        let key;
        for (key of selectedRows) {
          if (key.id === record.id) {
            isExist = true;
            break;
          }
        }
        if (!isExist) {
          selectedRows.push({
            ...record,
          });
          selectedRowKeys.push(record.id);
          this.setState({
            selectedRows: [...selectedRows],
            selectedRowKeys: [...selectedRowKeys],
          });
        }
      } else {
        let i = 0;
        let key;
        for (key of selectedRows) {
          if (key.id === record.id) {
            selectedRows.splice(i, 1);
            selectedRowKeys.splice(i, 1);
            this.setState({
              selectedRows: [...selectedRows],
              selectedRowKeys: [...selectedRowKeys],
            });
          }
          i += 1;
        }
      }
    }
  };

  // 普通搜索框--已指定数据类型（可通过产品库过滤列表）
  renderNormalForm = () => {
    const {
      form: { getFieldDecorator },
      type,
    } = this.props;

    const { objectType } = this.state;

    return (
      // <StandardFormRow grid last style={{ marginTop: -8, height: 40 }}>
      //   <Row>
      //     <Col span={5} className={styles.extraContent}>
      <div style={{ marginBottom: 6, marginTop: -4 }}>
        <Form layout="inline" autoComplete="off">
          <Form.Item>
            <span>
              数据类型：
              <Select
                placeholder="请选择"
                style={{ width: 150 }}
                onChange={this.handleObjectType}
                defaultValue={objectType}
              >
                {(type || objectTypes).map(item => (
                  <Select.Option key={item.value}>{item.display}</Select.Option>
                ))}
              </Select>
            </span>
          </Form.Item>
          <Form.Item label="编号或名称">
            {getFieldDecorator('q')(
              <Input placeholder="按编号或名称过滤" style={{ width: '100%' }} />,
            )}
          </Form.Item>
          <Form.Item>
            <div style={{ float: 'right' }}>
              <Button type="primary" onClick={this.handleNormalSearch}>
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    );
  };

  // 渲染页面
  render() {
    const { BASE_PATH } = process.env;
    const { title, searching, visible, checkType, confirmLoading, children } = this.props;
    const { content = [], pagination, selectedRowKeys } = this.state;
    const columns = [
      {
        title: '编号',
        dataIndex: 'code',
        width: '21%',
        render: (text, record) => (
          <Tooltip title={record.code} placement="topLeft">
            {record.infoUrl ? (
              <a
                href={record.infoUrl ? `${BASE_PATH}${record.infoUrl}` : ''}
                target="_blank"
                rel="noopener noreferrer"
              >
                {text}
              </a>
            ) : (
              <Link target="_blank" style={{ marginRight: 10 }} to={getObjectUrl(record)}>
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
        title: '库名称',
        dataIndex: 'repositoryName',
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
      selectedRowKeys,
      onSelect: this.onSelectRow,
      onSelectAll: this.onSelectAll,
      fixed: true,
      columnWidth: 40,
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
        {children && children}
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

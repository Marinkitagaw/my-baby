import React, { PureComponent } from 'react';
import { connect } from 'umi';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Table, Button, message, Input } from 'antd';
import { Modal } from '@cpdm/components';
import moment from 'moment';
import styles from '@/styles/table_list.less';
import indexStyle from './index.less';

@connect(({ user, loading }) => ({
  user,
  searching: loading.effects['user/listUsers'],
}))
@Form.create()
class UserSearchModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedRows: [],
      selectedRowKeys: [],
      content: [],
      pagination: {
        showTotal: total => <span>共{total}条数据</span>,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '50'],
      },
    };
  }

  componentDidMount() {
    const { userVisible } = this.props;
    if (userVisible) {
      this.handleSearch({
        size: 10,
      });
    }
  }

  // 取消
  onCancel = () => {
    const { onCancel } = this.props;
    if (onCancel) onCancel();
    this.setState({ content: [] });
  };

  // 确定
  onHandler = () => {
    const { selectedRowKeys, selectedRows } = this.state;
    const { onOk } = this.props;
    if (!selectedRowKeys || !selectedRowKeys.length) {
      message.warning('请至少选择一条数据。');
    } else {
      onOk(selectedRows, selectedRowKeys);
    }
  };

  // 搜索数据
  handleSearch = param => {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/listUsers',
      payload: {
        ...param,
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
          });
        }
      },
    });
  };

  handleNormalSearch = () => {
    const {
      form: { validateFields },
    } = this.props;
    validateFields((err, values) => {
      if (err) return;
      this.handleSearch({
        ...values,
        page: 0,
        size: 10,
      });
    });
  };

  // 监听表格分页等发生变化
  handleTableChange = (paginations, sorter) => {
    const { pagination } = this.state;
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
        }),
      );
    });
  };

  // 渲染页面
  render() {
    const { title, searching, visible, confirmLoading, form } = this.props;
    const { content = [], pagination } = this.state;
    const columns = [
      {
        title: '用户名',
        width: 180,
        dataIndex: 'username',
      },
      {
        title: '姓名',
        dataIndex: 'fullName',
      },
      {
        title: '手机号码',
        dataIndex: 'mobilePhone',
      },
      {
        title: '涉密程度',
        dataIndex: 'secretLevel',
      },
      {
        title: '修改时间',
        dataIndex: 'modifyStamp',
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm')}</span>,
      },
    ];
    const rowSelection = {
      type: 'radio',
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectedRows,
          selectedRowKeys,
        });
      },
    };

    return (
      <Modal
        className={indexStyle.modal}
        title={title}
        visible={visible}
        onOk={this.onHandler}
        onCancel={this.onCancel}
        width={900}
        maskClosable={false}
        confirmLoading={confirmLoading}
        destroyOnClose
      >
        <Form layout="inline" style={{ textAlign: 'right', marginBottom: 12 }}>
          <Form.Item label="用户名">
            {form.getFieldDecorator('username')(<Input placeholder="按用户名过滤" />)}
          </Form.Item>
          <Form.Item label="姓名">
            {form.getFieldDecorator('fullName')(<Input placeholder="按姓名过滤" />)}
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={this.handleNormalSearch}>
              查询
            </Button>
          </Form.Item>
        </Form>
        <Table
          className={styles.tableEllipsis}
          size="small"
          columns={columns}
          loading={searching}
          dataSource={content}
          rowKey={record => record.id}
          rowSelection={rowSelection}
          pagination={pagination}
          onChange={this.handleTableChange}
        />
      </Modal>
    );
  }
}
export default UserSearchModal;

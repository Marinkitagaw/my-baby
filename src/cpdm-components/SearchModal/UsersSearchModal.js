import React, { PureComponent } from 'react';
import { connect } from 'umi';
import { Table, message, Input } from 'antd';
import { Modal } from '@cpdm/components';
import moment from 'moment';
import commonStyles from '@/styles/common.less';

@connect(({ common, loading }) => ({
  userList: common.userList,
  userLoading: loading.effects['common/getUserList'],
}))
class UsersSearchModal extends PureComponent {
  state = {
    content: [],
    selectedRows: [],
    pagination: {
      showTotal: total => <span>共{total}条数据</span>,
      showSizeChanger: true,
      pageSizeOptions: ['20', '50', '100'],
    },
  };

  componentDidMount() {
    this.loadUsers();
  }

  loadUsers = (params = {}) => {
    const { dispatch } = this.props;
    const { pagination } = this.state;
    dispatch({
      type: 'common/getUserList',
      payload: {
        ...params,
      },
    }).then(() => {
      const { userList = {} } = this.props;
      const paginations = { ...pagination };
      paginations.total = Number(userList.totalElements);
      paginations.pageSize = userList.size;
      paginations.current = userList.number + 1;
      this.setState({
        content: userList.content,
        pagination: paginations,
      });
    });
  };

  handleModalOnOk = () => {
    const { selectedRows } = this.state;
    const { onOk } = this.props;
    if (selectedRows && selectedRows.length) {
      onOk(selectedRows);
    } else {
      message.warning('请至少选择一条数据。');
    }
  };

  handleTableSearch = text => {
    this.setState({
      keyword: text,
    });
    const q = text;
    this.loadUsers({
      q,
    });
  };

  handleTableChange = (paginations, filters, sorter) => {
    const { pagination } = this.state;
    const pager = { ...pagination };
    pager.current = paginations.current;
    this.setState({
      pagination: pager,
    });

    const order = sorter.order && sorter.order === 'ascend' ? 'asc' : 'desc';
    const sort = sorter.columnKey && `${sorter.columnKey},${order}`;
    const { keyword } = this.state;
    this.loadUsers({
      size: pagination.pageSize,
      page: pagination.current - 1,
      sort,
      q: keyword,
      ...filters,
    });
  };

  render() {
    const { userLoading, title, visible, confirmLoading, onCancel, handleSetOwner } = this.props;
    const { content = [], selectedRowKeys, selectedRows, pagination } = this.state;
    const columns = [
      {
        title: '用户名',
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
    const newStyle = commonStyles.backgroundInfoColor;
    // 点击行
    const onRowClick = record => {
      // const { selectedRows } = this.state;
      if (record.id !== (!!selectedRows.length && selectedRows[0].id)) {
        this.setState({
          selectedRows: [record],
          selectedRowKeys: [record.id],
        });
      }
    };
    const rowSelection = {
      type: 'radio',
      onChange: (RowKeys, Rows) => {
        this.setState({
          selectedRows: Rows,
          selectedRowKeys: RowKeys,
        });
      },
      selectedRowKeys,
    };

    return (
      <Modal
        maskClosable={false}
        destroyOnClose
        width={960}
        title={title}
        visible={visible}
        onCancel={() => onCancel()}
        confirmLoading={!!confirmLoading}
        onOk={() => handleSetOwner(selectedRowKeys)}
        okButtonProps={{
          disabled: !selectedRowKeys || !selectedRowKeys.length,
        }}
      >
        <Input.Search
          placeholder="按用户名或姓名过滤"
          enterButton="搜索"
          onSearch={value => this.handleTableSearch(value)}
          style={{ textAlign: 'center', marginBottom: 24 }}
        />
        <Table
          onRow={record => {
            return {
              onClick: () => onRowClick(record),
            };
          }}
          rowClassName={record => {
            if (record.id === (!!selectedRows.length && selectedRows[0].id)) {
              return newStyle;
            }
            return '';
          }}
          size="small"
          className={commonStyles.tableEllipsis}
          columns={columns}
          rowSelection={rowSelection}
          loading={userLoading}
          dataSource={content || []}
          rowKey={record => record.id}
          pagination={pagination}
          bordered
          onChange={this.handleTableChange}
        />
      </Modal>
    );
  }
}

export default UsersSearchModal;

import React, { PureComponent } from 'react';
import { connect } from 'umi';
import { Table, message, Tooltip, Input, Button, Pagination } from 'antd';
import { Modal } from '@cpdm/components';
import moment from 'moment';
import commonStyles from '../../styles/common.less';

@connect(({ repository, loading }) => ({
  repos: repository.page,
  loading: loading.effects['repository/page'],
}))
class RepositorySearchModal extends PureComponent {
  state = {
    selected: undefined,
    pagination: {
      showTotal: total => <span>共{total}条数据</span>,
      current: 1,
      pageSize: 10,
    },
    type: undefined,
  };

  componentDidMount() {
    this.listRepos();
  }

  listRepos = params => {
    const { dispatch } = this.props;
    const { pagination, type } = this.state;
    dispatch({
      type: 'repository/page',
      payload: params || { page: pagination.current - 1, size: pagination.pageSize, type },
      callback: res => {
        // const { repos } = this.props;
        this.setState({
          pagination: {
            total: res.totalElements,
            showTotal: total => `共 ${total} 条数据`,
            current: res.number + 1,
            pageSize: res.size,
          },
        });
      },
    });
  };

  doFilter = (p, f) => {
    const type = f.type.length === 1 ? f.type[0] : undefined;
    this.setState({ type });
    const { pagination } = this.state;
    this.listRepos({ page: pagination.current - 1, size: pagination.pageSize, type });
  };

  doPage = (p, s) => {
    const { type } = this.state;
    this.listRepos({ page: p - 1, size: s, type });
  };

  select = addToCommon => {
    const { selected } = this.state;
    const { onOk } = this.props;
    if (selected) {
      onOk(selected, addToCommon);
    } else {
      message.warning('请至少选择一条数据。');
    }
  };

  render() {
    const { repos, loading, title, visible, onCancel } = this.props;
    const { selected, pagination } = this.state;

    const columns = [
      {
        title: '型号系列',
        dataIndex: 'series',
      },
      {
        title: '型号名称',
        dataIndex: 'name',
      },
      {
        title: '类型',
        dataIndex: 'type',
        width: '8%',
        render: text => (text === 'Product' ? '产品库' : '存储库'),
        filters: [
          { text: '产品库', value: 'Product' },
          { text: '存储库', value: 'Library' },
        ],
      },
      {
        title: '型号代号',
        width: '14%',
        dataIndex: 'modelCode',
      },
      {
        title: '产品代号',
        width: '14%',
        dataIndex: 'code',
      },
      {
        title: '创建者',
        width: '12%',
        dataIndex: 'creatorFullName',
      },
      {
        title: '创建时间',
        width: '16%',
        dataIndex: 'createStamp',
        render(text) {
          return (
            <Tooltip title={moment(text).format('YYYY-MM-DD HH:mm')} placement="topLeft">
              {moment(text).format('YYYY-MM-DD HH:mm')}
            </Tooltip>
          );
        },
      },
    ];
    const newStyle = commonStyles.backgroundInfoColor;
    const onRowClick = record => {
      if (!selected || record.id !== selected.id) {
        this.setState({ selected: record });
      }
    };

    return (
      <Modal
        maskClosable={false}
        destroyOnClose
        title={title}
        visible={visible}
        width={960}
        onCancel={onCancel}
        footer={
          <React.Fragment>
            <Pagination {...pagination} onChange={this.doPage} style={{ float: 'left' }} />
            <Button
              onClick={() => {
                this.select();
              }}
              type="primary"
            >
              确定
            </Button>
            <Button
              onClick={() => {
                this.select(true);
              }}
            >
              确定并添加到常用库
            </Button>
            <Button onClick={onCancel}>取消</Button>
          </React.Fragment>
        }
      >
        <Input.Search
          placeholder="按名称或代号过滤"
          enterButton="搜索"
          onSearch={value => this.loadRepositoriesData({ q: value })}
          style={{ textAlign: 'center', marginBottom: 24 }}
        />
        <Table
          size="small"
          bordered
          pagination={false}
          loading={loading}
          columns={columns}
          dataSource={repos.content}
          className={commonStyles.tableEllipsis}
          rowKey={record => record.id}
          onRow={record => {
            return {
              onClick: () => onRowClick(record),
            };
          }}
          rowClassName={record => {
            return selected && record.id === selected.id ? newStyle : undefined;
          }}
          onChange={this.doFilter}
        />
      </Modal>
    );
  }
}
export default RepositorySearchModal;

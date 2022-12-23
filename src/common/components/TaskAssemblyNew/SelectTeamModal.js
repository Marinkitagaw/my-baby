import React from 'react';
import { Table, Tooltip, message } from 'antd';
import { Modal } from '@cpdm/components';
import { connect } from 'umi';

@connect(({ reviewTask, loading }) => ({
  commonTeams: reviewTask.commonTeams,
  loading:
    loading.effects['reviewTask/getCommonTeams'] ||
    loading.effects['reviewTask/createCommonTeams'] ||
    loading.effects['reviewTask/addCommonTeams'] ||
    loading.effects['reviewTask/deleteTeam'],
}))
class SelectTeamModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teamId: '',
      disabled: [],
      pagination: {
        showTotal: (total) => <span>共{total}条数据</span>,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '50', '100'],
      },
    };
  }

  componentDidMount() {
    this.getCommonTeams();
  }

  handleOk = (e) => {
    e.preventDefault();
    const { onOk, dispatch, taskId } = this.props;
    const { teamId } = this.state;
    if (teamId === '') {
      message.warning('请选择一条数据');
    } else {
      dispatch({
        type: 'reviewTask/addCommonTeams',
        payload: {
          taskId,
          teamId,
        },
        callback: () => {
          onOk();
        },
      });
    }
  };

  // 查询常用团队
  getCommonTeams = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'reviewTask/getCommonTeams',
      payload: {},
    });
  };

  // 删除团队
  deleteTeam = (id) => {
    Modal.confirm({
      title: '删除数据',
      content: '确定要删除当前数据吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        this.delete(id);
      },
    });
  };

  delete = (id) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'reviewTask/deleteTeam',
      payload: {
        teamId: id,
      },
      callback: () => {
        this.getCommonTeams();
      },
    });
  };

  render() {
    const { visible, onCancel, loading, commonTeams = {} } = this.props;
    const { content: teamData = [] } = commonTeams;
    const { pagination } = this.state;

    const columns = [
      {
        title: '团队名称',
        width: 180,
        dataIndex: 'name',
        render: (text) => {
          return (
            <Tooltip title={text} placement="topLeft">
              {text}
            </Tooltip>
          );
        },
      },
      {
        title: '团队成员',
        dataIndex: 'remarks',
        render: (text) => {
          return (
            <Tooltip title={text} placement="topLeft">
              {text}
            </Tooltip>
          );
        },
      },
      {
        title: '说明',
        dataIndex: 'description',
        width: 260,
        render: (text) => {
          return (
            <Tooltip title={text} placement="topLeft">
              {text}
            </Tooltip>
          );
        },
      },
      {
        title: '操作',
        fixed: 'right',
        width: 50,
        dataIndex: 'operation',
        render: (text, rec) => (
          <div>
            <a
              onClick={() => {
                this.deleteTeam(rec.id);
              }}
              disabled={rec.actions.DELETE !== 0}
            >
              删除
            </a>
          </div>
        ),
      },
    ];

    const rowSelection = {
      onChange: (selectedRowKeys) => {
        this.setState({
          teamId: selectedRowKeys.length > 0 && selectedRowKeys[0],
        });
      },
      getCheckboxProps: (record) => ({
        disabled: record.name === 'Disabled User',
        // Column configuration not to be checked
        name: record.name,
      }),
    };

    return (
      <Modal
        width={1000}
        title="选择常用团队"
        visible={visible}
        onOk={this.handleOk}
        onCancel={onCancel}
      >
        <Table
          size="small"
          columns={columns}
          dataSource={teamData}
          loading={loading}
          pagination={pagination}
          // onChange={this.onTableChange}
          rowKey={(record) => record.id}
          rowSelection={{
            type: 'radio',
            ...rowSelection,
          }}
        />
      </Modal>
    );
  }
}

export default SelectTeamModal;

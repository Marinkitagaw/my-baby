import React, { PureComponent } from 'react';
import { connect } from 'umi';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Table, Tooltip, message } from 'antd';
import { Modal, Ellipsis } from '@cpdm/components';

@connect(({ requirement, loading }) => ({
  requirement,
  loading: loading.effects['requirement/listRequirementLink'],
}))
@Form.create()
class DeliveryModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  componentDidMount() {
    const { requirementId } = this.props;
    this.setState({
      visible: true,
    });
    this.loadRequirementLink(requirementId);
  }

  // 获取关联的交付
  loadRequirementLink = id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'requirement/listRequirementLink',
      payload: { id },
      callback: response => {
        if (response && response !== 500) {
          this.setState({
            relationDatas: response || [],
          });
        }
      },
    });
  };

  // 关闭模态框
  onHandler = () => {
    const { onCancel } = this.props;
    onCancel();
    this.setState({
      visible: false,
    });
  };

  handleRemoveRelation = record => {
    const { dispatch } = this.props;
    const { id } = this.state;
    dispatch({
      type: 'requirement/removeRequirementLink',
      payload: record.linkId,
    }).then(() => {
      message.success('移除成功', 1);
      this.loadRequirementLink(id);
    });
  };

  // 下载附件
  handleDownLoad = record => {
    const { BASE_PATH } = process.env;
    window.open(`${BASE_PATH}/api/v2/requirement/requirements/download/${record.id}`, '_self');
  };

  // 渲染页面
  render() {
    const { title, loading } = this.props;
    const { relationDatas, visible } = this.state;
    const relationcolumns = [
      {
        title: '标题',
        dataIndex: 'subject',
        width: '26%',
        render(text) {
          return (
            <Ellipsis tooltip lines={1}>
              {text}
            </Ellipsis>
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
        title: '类型',
        dataIndex: 'baseType',
        width: '8%',
        render(text) {
          return (
            <Tooltip title={text} placement="topLeft">
              {text}
            </Tooltip>
          );
        },
      },
      {
        title: '实现状态',
        dataIndex: 'implState',
        width: '8%',
        render(text) {
          return (
            <Ellipsis tooltip lines={1}>
              {text}
            </Ellipsis>
          );
        },
      },
      {
        title: '实现说明',
        dataIndex: 'implDescription',
        width: '16%',
        render(text) {
          return (
            <Ellipsis tooltip lines={1}>
              {text}
            </Ellipsis>
          );
        },
      },
      {
        title: '操作',
        dataIndex: '操作',
        width: '8%',
        render: (text, record) => (
          <span>
            {/* <Popconfirm
              placement="leftBottom"
              title="确定要移除此条数据吗?"
              onConfirm={() => this.handleRemoveRelation(record)}
              okText="确定"
              cancelText="取消"
            >
              <a href="#">移除</a>
            </Popconfirm>
            <Divider type="vertical" /> */}
            {record.baseType === '附件' && (
              <a onClick={() => this.handleDownLoad(record)} target="_self">
                下载
              </a>
            )}
          </span>
        ),
      },
    ];
    return (
      <Modal
        title={title}
        visible={visible}
        onCancel={this.onHandler}
        width={1000}
        maskClosable={false}
        destroyOnClose
        footer={null}
      >
        <Table
          rowKey={record => record.id}
          pagination={false}
          dataSource={relationDatas}
          columns={relationcolumns}
          loading={loading}
          bordered
          size="small"
        />
      </Modal>
    );
  }
}
export default DeliveryModal;

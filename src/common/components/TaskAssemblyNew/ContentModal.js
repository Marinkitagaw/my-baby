import React, { PureComponent, Fragment } from 'react';
import { connect } from 'umi';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Table } from 'antd';
import { Modal } from '@cpdm/components';

@connect(({ requirement, loading }) => ({
  requirement,
  loading: loading.effects['dashboard/getTaskFiles1'],
}))
@Form.create()
class ImplModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      contents: [],
    };
  }

  componentDidMount() {
    const { taskId } = this.props;
    this.setState({
      visible: true,
    });
    this.getTaskFiles1(taskId);
  }

  getTaskFiles1 = (id) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'dashboard/getTaskFiles1',
      payload: { taskId: id },
      callback: (res) => {
        this.setState({
          contents: res,
        });
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

  // 下载附件
  handleDownLoad = (content) => {
    const { BASE_PATH } = process.env;
    window.open(
      `${BASE_PATH}/api/v2/workflow/task-files/${content.fileId}/download?fileName=${content.fileName}`,
      '_self',
    );
  };

  // 渲染页面
  render() {
    const { title, loading } = this.props;
    const { contents = [], visible } = this.state;

    const secondaryColumns = [
      {
        title: '序号',
        key: 'columns',
        align: 'center',
        width: 80,
        render: (text, record, index) => (
          <Fragment>
            <span>{index + 1}</span>
          </Fragment>
        ),
      },
      {
        title: '名称',
        dataIndex: 'fileName',
      },
      {
        title: '密级',
        dataIndex: 'confidentialityLevelName',
        width: 100,
      },
      {
        title: '操作',
        dataIndex: '操作',
        width: 120,
        // render: (text, record) => <a onClick={() => this.handleRemoveContent(record)}>移除</a>,
        render: (text, record) => (
          <span>
            <a onClick={() => this.handleDownLoad(record)} target="_self">
              下载
            </a>
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
          className="tableEllipsis"
          style={{ width: '100%', tableLayout: 'auto' }}
          rowKey={(record) => record.id}
          pagination={false}
          dataSource={contents}
          columns={secondaryColumns}
          loading={loading}
          scroll={{ x: true }}
          size="middle"
        />
      </Modal>
    );
  }
}
export default ImplModal;

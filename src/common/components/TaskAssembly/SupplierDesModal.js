import React from 'react';
import { Modal } from '@cpdm/components';
import { Input, Table, message } from 'antd';
import { connect } from 'umi';

@connect(({ processInstance, loading }) => ({
  processInstance,
  loading: loading.effects['processInstance/saveSupplierDescription'],
}))
class SupplierDesModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: props.dataSource || [],
    };
  }

  onChange = (index, record, description) => {
    const { dataSource } = this.state;
    dataSource.splice(index, 1, { ...record, description });
    this.setState({ dataSource: [...dataSource] });
  };

  onOk = () => {
    const { dataSource } = this.state;
    const { onOk, dispatch } = this.props;
    let require = false;
    dataSource.map((item) => {
      if (!item.description) {
        require = true;
      }
      return item;
    });
    if (require) {
      message.error('说明不能为空');
      return;
    }
    dispatch({
      type: 'processInstance/saveSupplierDescription',
      payload: dataSource,
      callback: onOk,
    });
  };

  render() {
    const { onCancel, visible, loading } = this.props;
    const { dataSource } = this.state;
    const columns = [
      { title: '序号', dataIndex: 'index', width: 60, render: (t, r, i) => i + 1 },
      { title: '单位', dataIndex: 'organizationName', width: 150, ellipsis: true },
      { title: '角色', dataIndex: 'role', width: 100, ellipsis: true },
      { title: '姓名', dataIndex: 'fullName', width: 150 },
      {
        title: (
          <span>
            <span style={{ color: 'red' }}>*</span>说明
          </span>
        ),
        dataIndex: 'description',
        render: (text, record, index) => (
          <Input.TextArea
            value={text}
            onChange={(e) => this.onChange(index, record, e.target.value)}
          />
        ),
      },
    ];

    return (
      <Modal
        title="填写外单位协同说明"
        visible={visible}
        onOk={this.onOk}
        onCancel={onCancel}
        width={800}
        confirmLoading={loading}
      >
        <Table columns={columns} dataSource={dataSource} size="middle" rowKey={(r) => r.userId} />
      </Modal>
    );
  }
}
export default SupplierDesModal;

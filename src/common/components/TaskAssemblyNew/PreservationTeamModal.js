import React from 'react';
import { Form } from 'antd';
import { Modal, Input, TextArea } from '@cpdm/components';
import { connect } from 'umi';

@connect(({ loading }) => ({
  createLoading: loading.effects['reviewTask/createCommonTeams'],
}))
class PreservationTeamModal extends React.Component {
  formRef = React.createRef();

  handleOk = async (e) => {
    e.preventDefault();

    const values = await this.formRef.current.validateFields();
    const { onOk, dispatch, participants = [] } = this.props;
    await dispatch({
      type: 'reviewTask/createCommonTeams',
      payload: {
        ...values,
        teamRoles: participants.map((item) => ({
          name: item.name,
          identifier: item.name,
          children: item.children.map((i) => ({
            roleName: item.name,
            memberType: 'User',
            memberId: i.memberId,
          })),
        })),
      },
    });
    onOk();
  };

  render() {
    const { createLoading, visible, onCancel } = this.props;

    const formItemLayout = {
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 18,
      },
    };

    return (
      <Modal
        destroyOnClose
        title="创建常用团队"
        visible={visible}
        onOk={this.handleOk}
        confirmLoading={createLoading}
        onCancel={onCancel}
        maskClosable={false}
      >
        <Form layout="horizontal" ref={this.formRef}>
          <Form.Item
            {...formItemLayout}
            label="名称"
            name="name"
            rules={[{ required: true, message: '请输入常用团队名称' }]}
          >
            <Input placeholder="请输入常用团队名称" />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="说明"
            name="description"
            rules={[{ required: false, message: '请填写说明' }]}
          >
            <TextArea max={200} placeholder="请填写说明" />
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}
export default PreservationTeamModal;

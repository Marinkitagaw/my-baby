import React from 'react';
import { Modal } from '@cpdm/components';
import { Form, Input } from 'antd';

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};

export default props => {
  const { visible, onSubmit, onCancel } = props;
  const [form] = Form.useForm();

  const onFinish = async () => {
    const fieldsValue = await form.validateFields();
    if (onSubmit) onSubmit(fieldsValue.note);
  };

  return (
    <Modal destroyOnClose visible={visible} title="检入说明" onCancel={onCancel} onOk={onFinish}>
      <Form {...layout} name="checkin" form={form} onFinish={onFinish}>
        <Form.Item label="说明" name="note">
          <Input.TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

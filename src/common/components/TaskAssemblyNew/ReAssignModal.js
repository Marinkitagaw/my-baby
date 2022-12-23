import { reAssign } from '@/common/services/revieworder';
import { UserAddOutlined } from '@ant-design/icons';
import { Modal, UserPicker } from '@cpdm/components';
import { Form, Input, message } from 'antd';
import React, { useState } from 'react';

export default ({ visible, onCancel, taskInfo = {}, onOk }) => {
  const [userVisible, setUserVisible] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [form] = Form.useForm();
  const [user, setUser] = useState({});

  const handleSubmit = async values => {
    setSubmitLoading(true);
    const res = await reAssign({ taskId: taskInfo, ...values, userName: null });
    setSubmitLoading(false);
    if (res && onOk) {
      message.success('操作成功。');
      onOk();
    }
  };
  return (
    <Modal
      visible={visible}
      title="重新分配工作负责人"
      onCancel={onCancel}
      width="60%"
      bodyStyle={{ maxHeight: '70vh', overflow: 'auto' }}
      okButtonProps={{
        disabled: !user.id,
      }}
      confirmLoading={submitLoading}
      onOk={() => {
        form.validateFields().then(values => {
          handleSubmit(values);
        });
      }}
    >
      <Form form={form}>
        <Form.Item
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          name="userName"
          label="用户"
          rules={[{ required: true, message: '请选择用户。' }]}
        >
          <Input disabled addonAfter={<UserAddOutlined onClick={() => setUserVisible(true)} />} />
        </Form.Item>
        <Form.Item name="userId" hidden />
        <Form.Item name="reason" labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} label="备注">
          <Input.TextArea />
        </Form.Item>
      </Form>
      {userVisible && (
        <UserPicker
          exposed
          visible={userVisible}
          onSelect={selected => {
            setUser(selected[0]);
            form.setFieldsValue({
              userId: selected[0].id,
              userName: selected[0].fullName,
            });
          }}
        />
      )}
    </Modal>
  );
};

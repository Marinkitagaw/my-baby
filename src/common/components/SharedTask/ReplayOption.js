import React, { PureComponent } from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input } from 'antd';
import { Modal } from '@cpdm/components';

@Form.create()
class ReplayOption extends PureComponent {
  handleSubmit = (e) => {
    const { form, onOK } = this.props;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        onOK(values);
      }
    });
  };

  render() {
    const { form, visible, title, onCancel, data = {} } = this.props;
    const { getFieldDecorator } = form;
    const { content } = data;

    return (
      <Modal visible={visible} title={title} onOk={this.handleSubmit} onCancel={onCancel}>
        <Form>
          <Form.Item>
            {getFieldDecorator('content', {
              initialValue: content,
              rules: [{ required: true, message: '输入信息' }],
            })(<Input.TextArea placeholder="输入信息" rows={4} />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}
export default ReplayOption;

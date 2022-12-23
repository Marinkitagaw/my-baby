import React, { Fragment } from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input } from 'antd';

class RenamePicker extends React.PureComponent {
  render() {
    const {
      form: { getFieldDecorator },
      data,
    } = this.props;
    return (
      <Fragment>
        <Form.Item label="编号">
          {getFieldDecorator('code', {
            initialValue: data.code,
          })(<Input disabled />)}
        </Form.Item>
        <Form.Item label="名称">
          {getFieldDecorator('name', {
            initialValue: data.name,
            rules: [{ required: true, message: '请填写名称' }],
          })(<Input />)}
        </Form.Item>
      </Fragment>
    );
  }
}

export default RenamePicker;

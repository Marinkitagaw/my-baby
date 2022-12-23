import React, { PureComponent } from 'react';
import { connect } from 'umi';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Select, Input } from 'antd';
import { Modal } from '@cpdm/components';

const FormItem = Form.Item;
@connect(({ requirement }) => ({
  requirement,
}))
@Form.create()
class ImplStateModal extends PureComponent {
  componentDidMount() {}

  onOk = () => {
    const { onOk, form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        onOk(values);
      }
    });
  };

  onCancel = () => {
    const { onCancel } = this.props;
    onCancel();
  };

  render() {
    const {
      form: { getFieldDecorator },
      visible,
      title,
      stateData,
    } = this.props;

    const formItemLayout = {
      labelCol: {
        sm: { span: 6 },
      },
      wrapperCol: {
        md: { span: 16 },
      },
    };

    return (
      <Modal
        destroyOnClose
        title={title}
        maskClosable={false}
        visible={visible}
        width={500}
        onOk={this.onOk}
        onCancel={this.onCancel}
      >
        <Form>
          <FormItem {...formItemLayout} label="实现状态">
            {getFieldDecorator('implState', {
              initialValue: '已实现',
              rules: [
                {
                  required: true,
                  message: '请选择实现状态',
                },
              ],
            })(
              <Select placeholder="请选择实现状态" style={{ width: '100%' }}>
                <Select.Option key="已实现">已实现</Select.Option>
                <Select.Option key="实现中">实现中</Select.Option>
              </Select>,
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="实现说明">
            {getFieldDecorator('description', {
              initialValue: stateData.implDescription || stateData.description,
              rules: [
                {
                  whitespace: true,
                  required: true,
                  message: '请填写实现说明',
                },
              ],
            })(
              <Input.TextArea
                maxLength={200}
                style={{ minHeight: 32, maxHeight: 96 }}
                placeholder="请填写实现说明"
                rows={2}
              />,
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
export default ImplStateModal;

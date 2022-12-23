import React, { PureComponent } from 'react';
import { connect } from 'umi';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input } from 'antd';
import { Modal } from '@cpdm/components';
import style from './index.less';

const { TextArea } = Input;
const FormItem = Form.Item;
@connect(({ requirement }) => ({
  requirement,
}))
@Form.create()
class ReviseModal extends PureComponent {
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
        className={style.reviseModal}
        destroyOnClose
        title={title}
        maskClosable={false}
        visible={visible}
        width={500}
        onOk={this.onOk}
        onCancel={this.onCancel}
      >
        <Form>
          <FormItem {...formItemLayout} label="变更说明">
            {getFieldDecorator('description', {
              rules: [
                {
                  required: true,
                  message: '请输入变更说明',
                },
              ],
            })(
              <TextArea
                maxLength={250}
                style={{ minHeight: 32, maxHeight: 96 }}
                placeholder="请输入变更说明"
                rows={2}
              />,
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
export default ReviseModal;

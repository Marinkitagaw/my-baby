import React, { PureComponent, Fragment } from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, message, InputNumber } from 'antd';
import { Modal } from '@cpdm/components';
import { connect } from 'umi';

@Form.create()
@connect(({ signTemplate, loading }) => ({
  signTemplate,
  getSignTemplatesLoading: loading.effects['signTemplate/createSignTemplate'],
}))
class PageControllerTemplateModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  showVisible = () => {
    this.setState({ visible: true });
  };

  hideVisible = () => {
    this.setState({ visible: false });
  };

  // 创建模板
  createSignTemplate = params => {
    const { dispatch, form, getSignTemplatePages } = this.props;
    dispatch({
      type: 'signTemplate/createSignTemplatePage',
      payload: params,
      callback: res => {
        if (res && res.status === 500) {
          message.error('创建失败');
        } else {
          message.success('创建成功');
          form.resetFields();
          getSignTemplatePages();
          this.hideVisible();
        }
      },
    });
  };

  // 编辑模板
  modifySignTemplate = params => {
    const { dispatch, form, getSignTemplatePages } = this.props;
    dispatch({
      type: 'signTemplate/modifySignTemplatePage',
      payload: {
        ...params,
      },
      callback: res => {
        if (res && res.status === 500) {
          message.error('编辑失败');
        } else {
          message.success('编辑成功');
          form.resetFields();
          getSignTemplatePages();
          this.hideVisible();
        }
      },
    });
  };

  render() {
    const { title, current = {}, children, id, form } = this.props;
    const { visible } = this.state;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    const okHandler = e => {
      e.preventDefault();
      const pageId = current ? current.id : undefined;
      form.validateFields((err, fieldsValue) => {
        if (!err) {
          const result = { ...fieldsValue };
          if (pageId) {
            this.modifySignTemplate({ ...result, signTemplateId: id, pageId });
          } else {
            this.createSignTemplate({ ...result, signTemplateId: id });
          }
        }
      });
    };

    const cancelHandler = () => {
      this.hideVisible();
    };

    return (
      <Fragment>
        <span onClick={this.showVisible}>{children}</span>
        <Modal
          destroyOnClose
          title={title}
          maskClosable={false}
          visible={visible}
          onOk={okHandler}
          onCancel={cancelHandler}
        >
          <Form layout="horizontal" onSubmit={this.okHandler}>
            <Form.Item {...formItemLayout} label="名称">
              {getFieldDecorator('name', {
                initialValue: current.name,
                rules: [
                  {
                    required: true,
                    message: '请填写名称',
                  },
                ],
              })(<Input placeholder="请输入名称" />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="起始页码">
              {getFieldDecorator('startPage', {
                initialValue: current.startPage,
                rules: [
                  {
                    required: true,
                    message: '请填写起始页码',
                  },
                ],
              })(<InputNumber style={{ width: '88%' }} />)}
              <span className="ant-form-text"> 页</span>
            </Form.Item>
            <Form.Item {...formItemLayout} label="终止页码">
              {getFieldDecorator('endPage', {
                initialValue: current.endPage,
                rules: [
                  {
                    required: true,
                    message: '请填写终止页码',
                  },
                ],
              })(<InputNumber style={{ width: '88%' }} />)}
              <span className="ant-form-text"> 页</span>
            </Form.Item>
          </Form>
        </Modal>
      </Fragment>
    );
  }
}

export default PageControllerTemplateModal;

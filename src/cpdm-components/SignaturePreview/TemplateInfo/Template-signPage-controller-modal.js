import React, { PureComponent, Fragment } from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, message, InputNumber, Radio, Row, Col, Select } from 'antd';
import { Modal } from '@cpdm/components';
import { connect } from 'umi';

@connect(({ signTemplate, dictionary, loading }) => ({
  signTemplate,
  dictionary,
  getSignTemplatesLoading: loading.effects['signTemplate/createSignTemplate'],
}))
@Form.create()
class SignItemControllerTemplateModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'dictionary/getDictEntries',
      payload: {
        code: 'FontSize,FontFamily,FontWeight',
      },
    });
  }

  showVisible = () => {
    this.setState({ visible: true });
  };

  hideVisible = () => {
    this.setState({ visible: false });
  };

  // 创建模板
  createSignTemplate = params => {
    const { dispatch, form, SignItemTemplatelist } = this.props;
    dispatch({
      type: 'signTemplate/SignItemTemplateCreate',
      payload: params,
      callback: res => {
        if (res && res.status === 500) {
          message.error('创建失败');
        } else {
          message.success('创建成功');
          form.resetFields();
          SignItemTemplatelist();
          this.hideVisible();
        }
      },
    });
  };

  // 编辑模板
  modifySignTemplate = params => {
    const { dispatch, form, SignItemTemplatelist } = this.props;
    dispatch({
      type: 'signTemplate/SignItemTemplateEdit',
      payload: {
        ...params,
      },
      callback: res => {
        if (res && res.status === 500) {
          message.error('编辑失败');
        } else {
          message.success('编辑成功');
          form.resetFields();
          SignItemTemplatelist();
          this.hideVisible();
        }
      },
    });
  };

  render() {
    const {
      title,
      current = {},
      children,
      id,
      pagesList = [],
      form,
      dictionary: { dictEntries },
    } = this.props;
    const { visible } = this.state;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };

    const okHandler = e => {
      e.preventDefault();
      const signId = current ? current.id : undefined;
      form.validateFields((err, fieldsValue) => {
        if (!err) {
          const result = { ...fieldsValue };

          if (signId) {
            this.modifySignTemplate({ ...result, signTemplateId: id, signId });
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
          width={1000}
          maskClosable={false}
          visible={visible}
          onOk={okHandler}
          onCancel={cancelHandler}
        >
          <Form layout="horizontal" onSubmit={this.okHandler}>
            <Row gutter={18}>
              <Col span={12}>
                <Form.Item {...formItemLayout} label="页面">
                  {getFieldDecorator('signTemplatePageId', {
                    initialValue: current.signTemplatePageId,
                    rules: [
                      {
                        required: true,
                        message: '请填写页面',
                      },
                    ],
                  })(
                    <Select style={{ width: '100%' }} placeholder="请选择页面">
                      {(Array.isArray(pagesList) ? pagesList : []).map(page => {
                        return (
                          <Select.Option key={page.id} value={page.id}>
                            {page.name}
                          </Select.Option>
                        );
                      })}
                    </Select>,
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item {...formItemLayout} label="签名项类型">
                  {getFieldDecorator('itemType', {
                    initialValue: current.itemType,
                    rules: [
                      {
                        required: true,
                        message: '请选择签名项类型',
                      },
                    ],
                  })(
                    <Radio.Group placeholder="请选择签名项类型">
                      <Radio value={0}>对象属性</Radio>
                      <Radio value={1}>签审信息</Radio>
                      <Radio value={2}>其他</Radio>
                    </Radio.Group>,
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item {...formItemLayout} label="唯一标识">
                  {getFieldDecorator('signKey', {
                    initialValue: current.signKey,
                    rules: [
                      {
                        required: true,
                        message: '请填写唯一标识',
                      },
                    ],
                  })(<Input placeholder="请输入唯一标识" maxLength={200} />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item {...formItemLayout} label="名称">
                  {getFieldDecorator('name', {
                    initialValue: current.name,
                    rules: [
                      {
                        required: true,
                        message: '请填写名称',
                      },
                    ],
                  })(<Input placeholder="请输入名称" maxLength={200} />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item {...formItemLayout} label="状态">
                  {getFieldDecorator('disabled', {
                    initialValue: current.disabled || false,
                    rules: [
                      {
                        required: true,
                        message: '请选择状态',
                      },
                    ],
                  })(
                    <Radio.Group placeholder="请选择状态">
                      <Radio value={false}>启用</Radio>
                      <Radio value>禁用</Radio>
                    </Radio.Group>,
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item {...formItemLayout} label="X坐标">
                  {getFieldDecorator('x', {
                    initialValue: current.x || 0,
                    rules: [
                      {
                        required: true,
                        message: '请输入X坐标',
                      },
                    ],
                  })(<InputNumber style={{ width: '100%' }} placeholder="请输入X坐标" />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item {...formItemLayout} label="X轴偏移量">
                  {getFieldDecorator('offsetX', {
                    initialValue: current.offsetX || 0,
                  })(<InputNumber style={{ width: '100%' }} placeholder="请输入X轴偏移量" />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item {...formItemLayout} label="Y坐标">
                  {getFieldDecorator('y', {
                    initialValue: current.y || 0,
                    rules: [
                      {
                        required: true,
                        message: '请输入Y坐标',
                      },
                    ],
                  })(<InputNumber style={{ width: '100%' }} placeholder="请输入Y坐标" />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item {...formItemLayout} label="Y轴偏移量">
                  {getFieldDecorator('offsetY', {
                    initialValue: current.offsetY || 0,
                  })(<InputNumber style={{ width: '100%' }} placeholder="请输入Y轴偏移量" />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item {...formItemLayout} label="旋转度">
                  {getFieldDecorator('rotation', {
                    initialValue: current.rotation || 0,
                  })(<InputNumber style={{ width: '100%' }} placeholder="请输入旋转度" />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item {...formItemLayout} label="对齐方式">
                  {getFieldDecorator('align', {
                    initialValue: current.align,
                    rules: [
                      {
                        required: true,
                        message: '请选择对齐方式',
                      },
                    ],
                  })(
                    <Radio.Group placeholder="请选择对齐方式">
                      <Radio value={0}>左对齐</Radio>
                      <Radio value={1}>居中</Radio>
                      <Radio value={2}>右对齐</Radio>
                    </Radio.Group>,
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item {...formItemLayout} label="字体">
                  {getFieldDecorator('fontFamily', {
                    initialValue: current.fontFamily,
                    rules: [
                      {
                        required: true,
                        message: '请选择字体',
                      },
                    ],
                  })(
                    <Select placeholder="请选择字体">
                      {dictEntries.FontFamily &&
                        dictEntries.FontFamily.length &&
                        dictEntries.FontFamily.map(item => (
                          <Select.Option key={item.id} value={item.value}>
                            {item.name}
                          </Select.Option>
                        ))}
                    </Select>,
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item {...formItemLayout} label="字体大小">
                  {getFieldDecorator('fontSize', {
                    initialValue: current.fontSize,
                    rules: [
                      {
                        required: true,
                        message: '请输入字体大小',
                      },
                    ],
                  })(
                    <Select placeholder="请选择字体大小">
                      {dictEntries.FontSize &&
                        dictEntries.FontSize.length &&
                        dictEntries.FontSize.map(item => (
                          <Select.Option key={item.id} value={item.value}>
                            {item.name}
                          </Select.Option>
                        ))}
                    </Select>,
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item {...formItemLayout} label="字体粗细">
                  {getFieldDecorator('fontWeight', {
                    initialValue: current.fontWeight,
                  })(
                    <Select placeholder="请选择字体粗细">
                      {dictEntries.FontWeight &&
                        dictEntries.FontWeight.length &&
                        dictEntries.FontWeight.map(item => (
                          <Select.Option key={item.id} value={item.name}>
                            {item.name}
                          </Select.Option>
                        ))}
                    </Select>,
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item {...formItemLayout} label="透明度">
                  {getFieldDecorator('alpha', {
                    initialValue: current.alpha || 0,
                  })(
                    <InputNumber
                      style={{ width: '100%' }}
                      min={0}
                      max={1}
                      placeholder="请输入透明度"
                    />,
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item {...formItemLayout} label="说明">
                  {getFieldDecorator('description', {
                    initialValue: current.description,
                  })(<Input.TextArea rows={3} placeholder="请输入说明文本" maxLength={200} />)}
                </Form.Item>
              </Col>
              {/* <Col span={12}>
                <div
                  style={{
                    textAlign: 'center',
                    marginTop: 15,
                    fontFamily: form.getFieldValue('fontFamily'),
                    fontSize: form.getFieldValue('fontSize'),
                    fontWeight: form.getFieldValue('fontWeight'),
                  }}
                >
                  示例文字
                </div>
              </Col> */}
            </Row>
          </Form>
        </Modal>
      </Fragment>
    );
  }
}
export default SignItemControllerTemplateModal;

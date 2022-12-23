import React from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Row, Col, Button } from 'antd';
import { Modal } from '@cpdm/components';
import { connect } from 'umi';
import { SupplierPicker } from 'cpdm-ui-components';
import { SolutionOutlined } from '@ant-design/icons';
import {
  CodeInput,
  CategoryPicker,
  DepartmentPicker,
  SecretLevel,
  TechSecretLevel,
  ConfidentialityPeriod,
  PhaseMark,
  Purpose,
  FolderPicker,
  ShareScope,
  // PrimaryContent,
  SecondaryContent,
  Submit,
  Cancel,
} from '@/cpdm-components/FormItem';
import * as documentService from '@/services/data/document';
import AssociatedPartPicker from './AssociatedPartPicker';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 7 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
    md: { span: 12 },
  },
};
const formItemLayoutLeft = {
  labelCol: {
    xs: { span: 24 },
    md: { span: 7 },
    lg: { span: 14 },
  },
  wrapperCol: {
    xs: { span: 24 },
    md: { span: 12 },
    lg: { span: 10 },
  },
};
const formItemLayoutRight = {
  labelCol: {
    xs: { span: 24 },
    md: { span: 7 },
    lg: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    md: { span: 12 },
    lg: { span: 10 },
  },
};

@Form.create()
class DocumentForm extends React.PureComponent {
  state = {
    companyVisible: false,
  };

  componentDidMount() {
    const { form, data = {} } = this.props;
    const { setFieldsValue } = form;
    if (data.id) {
      setFieldsValue({
        associatedPart: [data],
      });
    }
  }

  onCancel = () => {
    const { onCancel } = this.props;
    Modal.confirm({
      title: '确认是否取消',
      content: '所有未保存的数据将丢失',
      onOk: () => {
        if (onCancel) onCancel();
      },
      okText: '确定',
      cancelText: '取消',
    });
  };

  createDocument = async values => {
    const { addFn } = this.props;
    const res = await documentService.create(values);
    if (res && res.id) {
      if (addFn) addFn(res);
    }
  };

  onSubmit = () => {
    const { form } = this.props;
    const { sendTo } = this.state;
    const associatedPart = form.getFieldValue('associatedPart');
    form.validateFieldsAndScroll((err, values) => {
      if (err) return;
      const { Contents = [] } = values;
      const primaryContent = Contents.filter(item => item.contentType === '主要文件');
      const secondaryContents = Contents.filter(item => item.contentType === '附件');
      Object.assign(values, {
        ...values,
        secondaryContents,
        primaryContent: primaryContent[0],
        sendTo,
        associatedPartId:
          associatedPart && !!associatedPart.length ? associatedPart.map(item => item.id) : [],
      });
      this.createDocument(values);
    });
  };

  // 发送单位
  handleCompanyOk = selectedData => {
    const {
      form: { setFieldsValue },
    } = this.props;
    setFieldsValue({
      sendTo: selectedData[0].text,
    });
    this.setState({
      sendTo: selectedData[0].text,
      companyVisible: false,
    });
  };

  hideCompanyModal = () => {
    this.setState({ companyVisible: false });
  };

  render() {
    const { companyVisible } = this.state;
    const { form, loading, data = {}, visible } = this.props;
    const { getFieldDecorator, getFieldValue } = form;

    // 发送单位
    const companySearch = {
      host: process.env.API_BASE_PATH,
      visible: companyVisible,
      title: '选择发往单位',
      showInput: false,
      multi: false,
      onOk: this.handleCompanyOk,
      onCancel: this.hideCompanyModal,
    };

    return (
      <Modal width={1200} visible={visible} foot={null} title="新建文档">
        <Form layout="horizontal">
          <Row>
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <Form.Item {...formItemLayout} label="所属部门">
                {getFieldDecorator('departmentId', {
                  initialValue: data.departmentId,
                  rules: [
                    {
                      required: true,
                      message: '选择所属部门',
                    },
                  ],
                })(<DepartmentPicker disabled placeholder="选择所属部门" />)}
              </Form.Item>
              <Form.Item {...formItemLayout} label="类型">
                {getFieldDecorator('categoryId', {
                  rules: [
                    {
                      required: true,
                      message: '选择文档详细类型',
                    },
                  ],
                })(<CategoryPicker type="Document" placeholder="选择文档详细类型" />)}
              </Form.Item>
              <Form.Item {...formItemLayout} label="编号">
                {getFieldDecorator('code', {
                  rules: [
                    {
                      required: getFieldValue('code') !== '$default',
                      message: '输入编号',
                    },
                  ],
                })(
                  <CodeInput
                    key={getFieldValue('categoryId')}
                    // ConfigAutoCode
                    categoryIds={getFieldValue('categoryId')}
                  />,
                )}
              </Form.Item>
              <Form.Item {...formItemLayout} label="名称">
                {getFieldDecorator('name', {
                  rules: [
                    {
                      required: true,
                      message: '输入名称',
                    },
                  ],
                })(<Input placeholder="输入名称" />)}
              </Form.Item>
              <Row gutter={8}>
                <Col lg={12} md={12} sm={24}>
                  <Form.Item {...formItemLayoutLeft} label="产品系列">
                    {getFieldDecorator('series', {
                      initialValue: data.repositorySeries || undefined,
                      rules: [{ required: data.repositorySeries && true }],
                    })(<Input disabled />)}
                  </Form.Item>
                </Col>
                <Col lg={12} md={12} sm={24}>
                  <Form.Item {...formItemLayoutRight} label="型号产品">
                    {getFieldDecorator('repositoryId', {
                      initialValue: data.repositoryName,
                      rules: [{ required: true }],
                    })(<Input disabled />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={8}>
                <Col lg={12} md={12} sm={24}>
                  <Form.Item {...formItemLayoutLeft} label="存储位置">
                    {getFieldDecorator('folderId')(
                      <FolderPicker
                        repositoryId={getFieldValue('repositoryId')}
                        key={getFieldValue('repositoryId')}
                      />,
                    )}
                  </Form.Item>
                </Col>
                <Col lg={12} md={12} sm={24}>
                  <Form.Item {...formItemLayoutRight} label="产品代号">
                    {getFieldDecorator('productCode', {
                      initialValue: data.productCode,
                      rules: [
                        {
                          required: true,
                          message: '输入产品代号',
                        },
                      ],
                    })(<Input placeholder="输入产品代号" />)}
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={8}>
                <Col lg={12} md={12} sm={24}>
                  <Form.Item {...formItemLayoutLeft} label={<span className="w2">密级</span>}>
                    {getFieldDecorator('secretLevel', {
                      initialValue: data.secretLevel,
                      rules: [
                        {
                          required: true,
                          message: '选择密级',
                        },
                      ],
                    })(<SecretLevel placeholder="选择密级" />)}
                  </Form.Item>
                </Col>
                <Col lg={12} md={12} sm={24}>
                  <Form.Item {...formItemLayoutRight} label="保密期限">
                    {getFieldDecorator('confidentialityPeriod', {
                      initialValue: data.ConfidentialityPeriod,
                      rules: [
                        {
                          required: true,
                        },
                      ],
                    })(
                      <ConfidentialityPeriod
                        secretLevel={getFieldValue('secretLevel')}
                        key={getFieldValue('secretLevel')}
                      />,
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={8}>
                <Col lg={12} md={12} sm={24}>
                  <Form.Item {...formItemLayoutLeft} label="技术密级">
                    {getFieldDecorator('techSecretLevel', {
                      initialValue: data.techSecretLevel,
                    })(<TechSecretLevel />)}
                  </Form.Item>
                </Col>
                <Col lg={12} md={12} sm={24}>
                  <Form.Item {...formItemLayoutRight} label="研制阶段">
                    {getFieldDecorator('phaseMark', {
                      initialValue: data.phaseMark,
                      rules: [
                        {
                          required: true,
                          message: '选择研制阶段',
                        },
                      ],
                    })(<PhaseMark />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={8}>
                <Col lg={12} md={12} sm={24}>
                  <Form.Item {...formItemLayoutLeft} label="共享范围">
                    {getFieldDecorator('shareScope')(<ShareScope />)}
                  </Form.Item>
                </Col>
                <Col lg={12} md={12} sm={24}>
                  <Form.Item {...formItemLayoutRight} label={<span className="w2">用途</span>}>
                    {getFieldDecorator('purpose')(<Purpose />)}
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item {...formItemLayout} label="发往单位">
                {getFieldDecorator('sendTo')(
                  // <DestinationPicker />
                  <Input
                    allowClear
                    placeholder="请选择发往单位"
                    style={{ width: '100%' }}
                    addonAfter={
                      <Button
                        type="link"
                        size="small"
                        icon={<SolutionOutlined />}
                        title="选择发往单位"
                        onClick={() => {
                          this.setState({ companyVisible: true });
                        }}
                      />
                    }
                  />,
                )}
              </Form.Item>
              <Form.Item {...formItemLayout} label="关联部件">
                {getFieldDecorator('associatedPart')(
                  <AssociatedPartPicker
                    key={getFieldValue('productCode')}
                    productCode={getFieldValue('productCode')}
                    placeholder="请选择关联部件"
                  />,
                )}
              </Form.Item>
              <Form.Item {...formItemLayout} label="文件">
                {getFieldDecorator('Contents')(<SecondaryContent />)}
              </Form.Item>
              <Form.Item {...formItemLayout} label="说明">
                {getFieldDecorator('description')(<Input.TextArea />)}
              </Form.Item>
              <div style={{ textAlign: 'center' }}>
                <Submit loading={loading} onClick={this.onSubmit} style={{ marginRight: 16 }} />
                <Cancel onClick={this.onCancel} />
              </div>
            </Col>
          </Row>
        </Form>
        {/* 发送单位 */}
        {companyVisible && <SupplierPicker {...companySearch} />}
      </Modal>
    );
  }
}

export default connect(({ document, loading }) => ({
  doc: document.document,
  loading: loading.effects['document/create'] || loading.effects['document/edit'],
}))(DocumentForm);

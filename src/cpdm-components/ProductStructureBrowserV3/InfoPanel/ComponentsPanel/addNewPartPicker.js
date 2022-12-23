import React from 'react';
import { connect } from 'umi';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Row, Col } from 'antd';
import { Modal } from '@cpdm/components';
import {
  CodeInput,
  CategoryPicker,
  DestinationPicker,
  DepartmentPicker,
  SecretLevel,
  ConfidentialityPeriod,
  PhaseMark,
  Purpose,
  ShareScope,
  Submit,
  Cancel,
  SingleCheckbox,
} from '@/cpdm-components/FormItem';
import * as partService from '@/services/data/part';
import { ProductCategory, ProductType, Unit, ViewPicker } from './FormItem';
// import { PartType, ProductCategory, ProductType, Source, Unit, ViewPicker } from './FormItem';

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
class PartForm extends React.PureComponent {
  // componentDidMount() {
  //   const { dispatch, match } = this.props;
  //   dispatch({ type: 'part/getPart', payload: { id: match.params.id } });
  //   this.setState({
  //     partId: match.params.id,
  //   });
  // }

  onCancel = () => {
    const { onCancel } = this.props;
    Modal.confirm({
      title: '确认是否取消',
      content: '所有未保存的数据将丢失',
      onOk: () => {
        onCancel();
      },
      okText: '确定',
      cancelText: '取消',
    });
  };

  createPart = async values => {
    const { addFn } = this.props;
    const res = await partService.create(values);
    if (res && res.id) {
      if (addFn) addFn(res);
    }
  };

  onSubmit = async () => {
    const { form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (err) return;
      this.createPart(values);
    });
  };

  render() {
    const { form, loading, data = {}, visible, onCancel } = this.props;
    const { getFieldDecorator, getFieldValue } = form;
    return (
      <Modal width={1200} visible={visible} onCancel={onCancel} title="新建部件" footer={null}>
        <Form layout="horizontal">
          <Row>
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <Form.Item {...formItemLayout} label="所属部门">
                {getFieldDecorator('departmentId', {
                  initialValue: data.departmentId,
                  rules: [{ required: true }],
                })(<DepartmentPicker disabled />)}
              </Form.Item>
              <Form.Item {...formItemLayout} label="类型">
                {getFieldDecorator('categoryId', {
                  rules: [{ required: true }],
                })(<CategoryPicker type="Part" placeholder="选择部件详细类型" />)}
              </Form.Item>
              <Form.Item {...formItemLayout} label="编号">
                {getFieldDecorator('code', {
                  rules: [{ required: true }],
                })(<CodeInput />)}
              </Form.Item>
              <Form.Item {...formItemLayout} label="名称">
                {getFieldDecorator('name', {
                  rules: [{ required: true }],
                })(<Input />)}
              </Form.Item>

              {/* <Form.Item {...short} label="类型">
                  {getFieldDecorator('categoryId', {
                    initialValue: part.categoryId,
                  })(<CategoryPicker type="Part" placeholder="选择部件详细类型" />)}
                </Form.Item> */}
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
                  <Form.Item {...formItemLayoutLeft} label="产品代号">
                    {getFieldDecorator('productCode', {
                      initialValue: data.productCode,
                      rules: [{ required: true }],
                    })(<Input />)}
                  </Form.Item>
                </Col>
                <Col lg={12} md={12} sm={24}>
                  <Form.Item {...formItemLayoutRight} label="研制阶段">
                    {getFieldDecorator('phaseMark', {
                      initialValue: data.phaseMark,
                      rules: [{ required: true }],
                    })(<PhaseMark />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={8}>
                <Col lg={12} md={12} sm={24}>
                  <Form.Item {...formItemLayoutLeft} label="密级">
                    {getFieldDecorator('secretLevel', {
                      initialValue: data.secretLevel,
                      rules: [{ required: true }],
                    })(<SecretLevel size="small" />)}
                  </Form.Item>
                </Col>
                <Col lg={12} md={12} sm={24}>
                  <Form.Item {...formItemLayoutRight} label="保密期限(年)">
                    {getFieldDecorator('confidentialityPeriod', {
                      initialValue: data.ConfidentialityPeriod,
                      rules: [{ required: true }],
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
                  <Form.Item {...formItemLayoutLeft} label="视图">
                    {getFieldDecorator('view', {
                      initialValue: data.ViewPicker,
                      rules: [{ required: true }],
                    })(<ViewPicker />)}
                  </Form.Item>
                </Col>
                <Col lg={12} md={12} sm={24}>
                  <Form.Item {...formItemLayoutRight} label="共享范围">
                    {getFieldDecorator('shareScope', {
                      initialValue: data.ShareScope,
                    })(<ShareScope />)}
                  </Form.Item>
                </Col>
              </Row>
              {/* <Form.Item {...short} label="存储位置">
                  {getFieldDecorator('folderId', {
                    initialValue: part.folderPath,
                  })(<Input disabled />)}
                </Form.Item> */}
              <Row gutter={8}>
                <Col lg={12} md={12} sm={24}>
                  <Form.Item {...formItemLayoutLeft} label="产品分类">
                    {getFieldDecorator('productCategory', {
                      initialValue: 'WY',
                    })(<ProductCategory />)}
                  </Form.Item>
                </Col>
                <Col lg={12} md={12} sm={24}>
                  <Form.Item {...formItemLayoutRight} label="产品层次">
                    {getFieldDecorator('productLevel', {
                      initialValue: data.productLevel,
                      rules: [{ required: true }],
                    })(<ProductType />)}
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item {...formItemLayout} label="用途">
                {getFieldDecorator('purpose', {
                  initialValue: data.Purpose,
                })(<Purpose />)}
              </Form.Item>

              <Form.Item {...formItemLayout} label="发往单位">
                {getFieldDecorator('sendTo', {
                  initialValue: data.sendTo,
                })(<DestinationPicker />)}
              </Form.Item>
              {/* <Form.Item {...short} label="装配模式">
                  {getFieldDecorator('partType', {
                    initialValue: part.PartType,
                  })(<PartType />)}
                </Form.Item>
                <Form.Item {...short} label="部件来源">
                  {getFieldDecorator('source', {
                    initialValue: part.source,
                  })(<Source />)}
                </Form.Item>
                <Form.Item {...short} label="默认追踪代码">
                  {getFieldDecorator('defaultTraceCode', {
                    initialValue: part.defaultTraceCode,
                  })(<Input />)}
                </Form.Item> */}

              {/* <Form.Item {...short} label="可配置模块">
                  {getFieldDecorator('genericType', {
                    initialValue: part.genericType,
                  })(<SingleCheckbox />)}
                </Form.Item>
                <Form.Item {...short} label="虚拟制造部件">
                  {getFieldDecorator('phantom', {
                    initialValue: part.phantom,
                  })(<SingleCheckbox />)}
                </Form.Item>
                <Form.Item {...short} label="收集部件">
                  {getFieldDecorator('hidePartInStructure', {
                    initialValue: part.hidePartInStructure,
                  })(<SingleCheckbox />)}
                </Form.Item>
                <Form.Item {...short} label="可折叠">
                  {getFieldDecorator('collapsible', {
                    initialValue: part.collapsible,
                  })(<SingleCheckbox />)}
                </Form.Item>
                <Form.Item {...short} label="停止有效性传播">
                  {getFieldDecorator('effPropagationStop', {
                    initialValue: part.effPropagationStop,
                  })(<SingleCheckbox />)}
                </Form.Item> */}
              <Form.Item {...formItemLayout} label="默认单位">
                {getFieldDecorator('defaultUnit', {
                  initialValue: data.defaultUnit,
                })(<Unit />)}
              </Form.Item>
              <Form.Item {...formItemLayout} label="备注信息">
                {getFieldDecorator('description', {
                  initialValue: data.description,
                })(<Input.TextArea />)}
              </Form.Item>
              <Form.Item {...formItemLayout} label="成品">
                {getFieldDecorator('endItem', {
                  initialValue: data.endItem,
                })(<SingleCheckbox />)}
              </Form.Item>
              <div style={{ textAlign: 'center' }}>
                <Submit loading={loading} onClick={this.onSubmit} style={{ marginRight: 16 }} />
                <Cancel onClick={this.onCancel} />
              </div>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
}

export default connect(({ part, loading }) => ({
  part: part.part,
  loading: loading.effects['part/create'] || loading.effects['part/edit'],
}))(PartForm);

import React from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Select, Col, Row, Input } from 'antd';
import { connect } from 'umi';

const FormItem = Form.Item;
@connect(({ requirement }) => ({
  requirement,
}))
class ModelSeriesPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modelSeries: [],
      repositories: [],
    };
  }

  componentDidMount() {
    this.getModelSeries();
  }

  // componentWillReceiveProps(props) {
  //   const { basicInfo = {} } = this.props;
  //   if (
  //     props.basicInfo.modelSeriesId &&
  //     props.basicInfo.modelSeriesId !== basicInfo.modelSeriesId
  //   ) {
  //     this.getRepositories(props.basicInfo.modelSeriesId);
  //   }
  // }

  // 获取型号系列
  getModelSeries = () => {
    const { dispatch, modelSeriesId, form } = this.props;
    dispatch({
      type: 'requirement/getModelSeries',
      payload: { size: 100 }, // requirementEnabled: true,
      callback: response => {
        if (Array.isArray(response)) {
          this.setState({
            modelSeries: response,
          });
          if (modelSeriesId) {
            this.getRepositories(modelSeriesId, true);
          }
        }
      },
    }).then(() => {
      if (this.onSomeSelect('modelSeriesId')) {
        form.setFieldsValue({
          modelSeriesId,
        });
      }
    });
  };

  getRepositories = (series, isDefault) => {
    const { dispatch, form, basicInfo } = this.props;
    dispatch({
      type: 'requirement/getRepositories',
      payload: { type: 'Product', series, requirementEnabled: true },
      callback: response => {
        if (response && Array.isArray(response.content)) {
          this.setState({
            repositories: response.content,
          });
        }
      },
    }).then(() => {
      if (isDefault && this.onSomeSelect()) {
        form.setFieldsValue({
          repositoryId: basicInfo.repositoryId,
        });
      }
    });
  };

  onModelSeriesChange = series => {
    const { form } = this.props;
    this.getRepositories(series);
    form.setFieldsValue({
      repositoryId: undefined,
      modelCode: undefined,
      productCode: undefined,
    });
  };

  onRepositoryChange = (value, record) => {
    const { form, onChange } = this.props;
    const {
      props: {
        data: {
          modelCode,
          // code
        },
      },
    } = record;
    form.setFieldsValue({
      modelCode,
      // productCode: code,
    });
    onChange(value);
  };

  // 判断下拉选是否有默认值得ID 有进行赋值
  onSomeSelect = type => {
    const { basicInfo } = this.props;
    const { modelSeries = [], repositories = [] } = this.state;
    if (type === 'modelSeriesId') {
      return modelSeries.some(item => item.seriesId === basicInfo.modelSeriesId);
    }
    return repositories.some(item => item.id === basicInfo.repositoryId);
  };

  render() {
    const {
      form: { getFieldDecorator },
      basicInfo = {},
    } = this.props;
    const { modelSeries = [], repositories = [] } = this.state;

    const formItemLayoutRight = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 },
        md: { span: 10 },
      },
    };

    const formItemLayoutLeft = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 },
        md: { span: 10 },
      },
    };

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 14 },
      },
    };

    return (
      <span>
        <Row>
          <Col span={12}>
            <FormItem {...formItemLayoutLeft} label="型号系列">
              {getFieldDecorator('modelSeriesId', {
                rules: [{ required: true, message: '请选择型号系列' }],
              })(
                <Select
                  placeholder="选择型号系列"
                  onChange={this.onModelSeriesChange}
                  disabled={!!basicInfo.id}
                >
                  {modelSeries.map(item => (
                    <Select.Option key={item.seriesId} value={item.seriesId}>
                      {item.series}
                    </Select.Option>
                  ))}
                </Select>,
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem {...formItemLayoutRight} label="型号产品">
              {getFieldDecorator('repositoryId', {
                rules: [{ required: true, message: '请选择型号产品' }],
              })(
                <Select
                  placeholder="请选择型号产品"
                  onChange={this.onRepositoryChange}
                  disabled={!!basicInfo.id}
                >
                  {repositories.map(item => (
                    <Select.Option key={item.id} value={item.id} data={item}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>,
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem {...formItemLayout} label="型号代号">
              {getFieldDecorator('modelCode', {
                initialValue: basicInfo.modelCode,
                rules: [{ required: true, message: '请填写型号代号' }],
              })(<Input disabled />)}
            </FormItem>
          </Col>
          {/* <Col span={12}>
            <FormItem {...formItemLayoutRight} label="产品代号">
              {getFieldDecorator('productCode', {
                initialValue: basicInfo.productCode,
                rules: [{ required: true, message: '请输入产品代号' }],
              })(<Input maxLength={200} placeholder="请输入产品代号" />)}
            </FormItem>
          </Col> */}
        </Row>
      </span>
    );
  }
}
export default ModelSeriesPicker;

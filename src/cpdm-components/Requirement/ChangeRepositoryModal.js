import React, { PureComponent } from 'react';
import { connect } from 'umi';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Select } from 'antd';
import { Modal } from '@cpdm/components';

const FormItem = Form.Item;
@connect(({ requirement }) => ({
  requirement,
}))
@Form.create()
class ChangeRepositoryModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modelSeries: [],
    };
  }

  componentDidMount() {
    this.getModelSeries();
  }

  getModelSeries = () => {
    const { dispatch } = this.props;
    dispatch({
      // type: 'requirement/listAllRepositories',
      type: 'requirement/getModelSeries',
      payload: { size: 100, requirementEnabled: true }, // ,
      callback: response => {
        if (Array.isArray(response)) {
          this.setState({
            modelSeries: response,
          });
        }
      },
    });
  };

  modelSeriesChange = series => {
    const { dispatch, form } = this.props;
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
    });
    form.setFieldsValue({
      repositoryId: undefined,
    });
  };

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
      repositoryVisible,
      title,
    } = this.props;

    const { modelSeries = [], repositories = [] } = this.state;

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
        visible={repositoryVisible}
        width={500}
        onOk={this.onOk}
        onCancel={this.onCancel}
      >
        <Form>
          <FormItem {...formItemLayout} label="型号系列">
            {getFieldDecorator('modelSeriesId', {
              rules: [
                {
                  required: true,
                  message: '请选择型号系列',
                },
              ],
            })(
              <Select
                showSearch
                optionFilterProp="title"
                placeholder="请选择型号系列"
                style={{ width: '100%' }}
                onChange={this.modelSeriesChange}
              >
                {modelSeries.map(model => (
                  <Select.Option key={model.seriesId} title={model.series}>
                    {model.series}
                  </Select.Option>
                ))}
              </Select>,
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="型号产品">
            {getFieldDecorator('repositoryId', {
              rules: [
                {
                  required: true,
                  message: '请选择型号产品',
                },
              ],
            })(
              <Select
                showSearch
                optionFilterProp="title"
                style={{ width: '100%' }}
                placeholder="请选择型号产品"
              >
                {repositories.map(r => (
                  <Select.Option key={r.id} title={r.name}>
                    {r.name}
                  </Select.Option>
                ))}
              </Select>,
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
export default ChangeRepositoryModal;

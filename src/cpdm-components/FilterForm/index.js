import React, { PureComponent } from 'react';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import '@ant-design/compatible/assets/index.css';
import { Form } from '@ant-design/compatible';
import { Input, Button, Col, Row, Select } from 'antd';
import { StandardFormRow } from '@cpdm/components';
import { ModelCodePicker } from '@/cpdm-components/FormItem';
import { PhaseMark } from '@cpdm/components';
import styles from './index.less';

@Form.create()
class FilterForm extends PureComponent {
  state = {
    expand: false,
    newItems: [],
  };

  componentDidMount() {
    const { Items, rowspan } = this.props;
    this.setState({ newItems: this.renderNewArr(Items, rowspan) });
  }

  renderFieldItem = item => {
    const { form } = this.props;
    const { field, enumeration = [], placeholder } = item;
    let f;
    switch (field) {
      case 'modelCode':
        f = (
          <ModelCodePicker
            style={{ width: '100%' }}
            {...item}
            form={form}
            setSelectedRepository={repository => this.setState({ repository })}
            placeholder="选择型号"
          />
        );
        break;
      case 'phaseMark':
        f = <PhaseMark.WithOption placeholder="选择阶段标记" />;
        break;
      case 'custom':
        f = (
          <Select style={{ width: '100%' }} placeholder={placeholder || '请选择'}>
            {enumeration.map(en => (
              <Select.Option key={en.value || en.name} value={en.value || en.name}>
                {en.display}
              </Select.Option>
            ))}
          </Select>
        );
        break;
      default:
        f = <Input style={{ width: '100%' }} {...item} />;
        break;
    }
    return f;
  };

  onFieldChange = (fieldKey, value) => {
    const {
      form: { setFieldsValue },
    } = this.props;
    const currentField = {};
    currentField[fieldKey] = value;
    setFieldsValue(currentField);
  };

  handleSearch = () => {
    const {
      form: { validateFields },
      onChange,
    } = this.props;
    const { repository } = this.state;
    validateFields((err, values) => {
      if (err) return;
      if (onChange)
        onChange({
          ...values,
          repositoryId: values.repositoryId ? values.repositoryId : repository && repository.id,
        });
    });
  };

  handleFormReset = () => {
    const {
      form: { resetFields },
      resetFilterForm,
    } = this.props;
    resetFields();
    if (resetFilterForm) resetFilterForm();
  };

  toggleForm = () => {
    const { expand } = this.state;
    const { Items, rowspan } = this.props;

    this.setState({ expand: !expand }, () => {
      this.setState({
        newItems: this.renderNewArr(Items, rowspan),
      });
    });
  };

  renderNewArr = Items => {
    const { expand } = this.state;
    const newarr = [];

    if (!expand) {
      for (let i = 0; i < Items.length; ) {
        newarr.push(Items.slice(i, i + 4));
        i += 4;
      }
      newarr[0].push({ field: 'action' });
    } else {
      for (let i = 0; i < Items.length; ) {
        newarr.push(Items.slice(i, i + 5));
        i += 5;
      }
      newarr[newarr.length - 1].push({ field: 'action' });
    }
    return newarr;
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { expand, newItems = [] } = this.state;
    const actionMd = newItems[0] && newItems[0].length && newItems[0].length === 6 ? 4 : 4;
    const itemMd = newItems[0] && newItems[0].length && newItems[0].length === 6 ? 5 : 5;
    const FormAction = (
      <Col md={actionMd} sm={24}>
        <span className={styles.submitButtons}>
          <Button style={{ marginLeft: 10 }} type="primary" onClick={() => this.handleSearch()}>
            检索
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
            重置
          </Button>
          {newItems.length > 1 && (
            <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
              {expand ? '收起' : '展开'}
              {expand ? <UpOutlined /> : <DownOutlined />}
            </a>
          )}
        </span>
      </Col>
    );

    const expendStyle = { maxHeight: 40, overflow: 'hidden' };

    return (
      <Form>
        <StandardFormRow grid last style={!expand ? expendStyle : {}}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              {newItems.map(row => (
                <Row gutter={{ md: 8, lg: 24, xl: 48 }} style={{ marginBottom: 12 }}>
                  {row.map(item =>
                    item.field === 'action' ? (
                      FormAction
                    ) : (
                      <Col key={item.field} md={itemMd} sm={24}>
                        <Form.Item key={item.field} label={item.label}>
                          {getFieldDecorator(item.dataIndex)(this.renderFieldItem(item))}
                        </Form.Item>
                      </Col>
                    ),
                  )}
                </Row>
              ))}
            </div>
          </div>
        </StandardFormRow>
      </Form>
    );
  }
}
export default FilterForm;

import React, { Component } from 'react';

import { request } from '@cpdm/util';
import { stringify } from 'qs';
import { CheckOutlined } from '@ant-design/icons';
import { Form, Radio, Select, Checkbox, Button, Row, Col, message, Space } from 'antd';
import '@ant-design/compatible/assets/index.css';
import styles from './index.less';
import { baselineList } from '@/services/baseline';

async function getDictEntries(params) {
  return request(`/admin/dict-entries?${stringify(params)}`);
}

const DEFAULT_CRITERIA = {
  configSpecType: 'latest',
};

class ProductStructureToolbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      baselines: [],
      criteria: {
        ...DEFAULT_CRITERIA,
        ...props.criteria,
        objectTypes: ['Part'],
      },
    };
  }

  componentDidMount() {
    message.config({
      top: 200,
      duration: 2,
      maxCount: 3,
    });
    this.getDictEntries();
  }

  loadBaselines = async () => {
    const { root, data } = this.props;
    const res = await baselineList({ partId: root, type: data?.objectType });
    if (res && Array.isArray(res)) this.setState({ baselines: res });
  };

  getDictEntries = async () => {
    await getDictEntries({ code: 'PhaseMark' });
  };

  changePhaseMark = value => {
    const { criteria, tempCriteria = criteria } = this.state;
    this.setState({
      tempCriteria: { ...tempCriteria, phaseMark: value, baselineId: undefined },
    });
  };

  changeLifecycleState = value => {
    const { criteria, tempCriteria = criteria } = this.state;
    this.setState({
      tempCriteria: { ...tempCriteria, state: value, baselineId: undefined },
    });
  };

  changeBaseline = val => {
    const { criteria, tempCriteria = criteria } = this.state;
    this.setState({
      tempCriteria: { ...tempCriteria, baselineId: val, view: undefined, state: undefined },
    });
  };

  changeDataTypes = values => {
    const { criteria, tempCriteria = criteria } = this.state;
    this.setState({ tempCriteria: { ...tempCriteria, objectTypes: values } });
  };

  reload = () => {
    const { reload } = this.props;
    const { tempCriteria } = this.state;
    this.setState({ criteria: { ...tempCriteria }, tempCriteria: undefined }, () => {
      if (reload) reload({ ...tempCriteria });
    });
  };

  reset = () => {
    this.setState({ tempCriteria: undefined });
  };

  // ??????????????????
  onShowAllType = values => {
    const { criteria, tempCriteria = criteria } = this.state;
    this.setState({ tempCriteria: { ...tempCriteria, objectTypes: values } }, () => {
      this.reload();
    });
  };

  changeSpecType = e => {
    const { criteria, tempCriteria = criteria } = this.state;
    if (e.target.value === 'baseline') {
      this.loadBaselines();
    }
    this.setState({
      tempCriteria: {
        ...tempCriteria,
        configSpecType: e.target.value,
        baselineId: undefined,
        view: undefined,
        state: undefined,
        phaseMark: undefined,
      },
    });
  };

  render() {
    const { data = {}, packageInfo } = this.props;
    const { lifecycleStates = [] } = data;
    const { criteria, tempCriteria, baselines } = this.state;
    const c = tempCriteria || criteria;
    return (
      <Form className={styles.toobarForm} style={{ padding: '10px 0 0' }}>
        {!packageInfo ? (
          <Row>
            <Col soan={12}>
              <Form.Item label="????????????" style={{ marginRight: 24 }}>
                <Radio.Group size="small" value={c.configSpecType} onChange={this.changeSpecType}>
                  <Radio.Button value="latest">??????</Radio.Button>
                  <Radio.Button value="baseline">??????</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col soan={12}>
              {c.configSpecType === 'latest' && (
                <React.Fragment>
                  <Form.Item label="??????" style={{ marginRight: 24 }}>
                    <Select
                      size="small"
                      value={c.state}
                      placeholder="????????????"
                      style={{ width: 200 }}
                      onChange={this.changeLifecycleState}
                    >
                      {(lifecycleStates || []).map(item => (
                        <Select.Option value={item.identifier}>{item.name}</Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </React.Fragment>
              )}
              {c.configSpecType !== 'latest' && (
                <Form.Item key={c.configSpecType} label="??????" style={{ marginRight: 24 }}>
                  <Select
                    size="small"
                    value={c.baselineId}
                    placeholder="????????????"
                    style={{ width: 200 }}
                    onChange={this.changeBaseline}
                  >
                    {baselines.map(b => (
                      <Select.Option key={b.id} value={b.id}>
                        {b.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              )}
            </Col>
          </Row>
        ) : null}
        <Row>
          <Col>
            <Form.Item label="????????????">
              <Checkbox.Group value={c.objectTypes} onChange={this.changeDataTypes}>
                <Checkbox value="Document">??????</Checkbox>
                <Checkbox value="Drawing">??????</Checkbox>
                <Checkbox disabled value="Part">
                  ?????????
                </Checkbox>
                <Checkbox value="Standard">?????????</Checkbox>
                <Checkbox value="Component">?????????</Checkbox>
                <Checkbox value="Software">????????????</Checkbox>
                <Checkbox value="Change">?????????</Checkbox>
                <Checkbox value="Deviation">?????????</Checkbox>
                <Checkbox value="Technical">???????????????</Checkbox>
              </Checkbox.Group>
              <Button
                type="primary"
                size="small"
                onClick={() =>
                  this.changeDataTypes(
                    c.objectTypes && c.objectTypes.length === 8
                      ? []
                      : [
                          'Part',
                          'Software',
                          'Component',
                          'Standard',
                          'Document',
                          'Change',
                          'Technical',
                          'Deviation',
                        ],
                  )
                }
                style={{ marginLeft: 12 }}
              >
                {c.objectTypes && c.objectTypes.length === 8 ? '?????????' : '??????'}
              </Button>
              {!!tempCriteria && (
                <Space style={{ marginLeft: 8 }}>
                  <Button
                    type="primary"
                    icon={<CheckOutlined />}
                    size="small"
                    onClick={this.reload}
                  >
                    ??????
                  </Button>
                  <Button size="small" onClick={this.reset}>
                    ??????
                  </Button>
                </Space>
              )}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default ProductStructureToolbar;

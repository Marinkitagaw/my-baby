/* eslint-disable max-classes-per-file */
import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Radio, Row, Col, Slider, InputNumber } from 'antd';
import { connect } from 'umi';

@connect(({ dictionary, loading }) => ({
  dictEntries: dictionary.dictEntries,
  loading: loading.effects['dictionary/getDictEntries'],
}))
class SecretLevel extends React.PureComponent {
  componentDidMount() {
    const {
      dispatch,
      options,
      dictEntries: { SecretLevel: levels },
    } = this.props;
    if (!options && !levels) dispatch({ type: 'common/secretLevels' });
  }

  onChange = e => {
    const { onChange } = this.props;
    if (onChange) onChange(e.target.value, e.target.level);
  };

  render() {
    const {
      dictEntries: { SecretLevel: levels },
      options,
      value,
      disabled,
      loading,
      ...rest
    } = this.props;
    if (loading) return <LoadingOutlined />;
    return (
      <Radio.Group
        {...rest}
        onChange={this.onChange}
        defaultValue="非密"
        value={value}
        disabled={disabled}
      >
        {(options || levels || []).map(level => (
          <Radio.Button value={level.value} key={level.id} level={level}>
            {level.name}
          </Radio.Button>
        ))}
      </Radio.Group>
    );
  }
}

@connect(({ dictionary, loading }) => ({
  dictEntries: dictionary.dictEntries,
  loading: loading.effects['dictionary/getDictEntries'],
}))
class TechSecretLevel extends React.PureComponent {
  componentDidMount() {
    const { dispatch, options } = this.props;
    if (!options) dispatch({ type: 'common/techSecretLevels' });
  }

  onChange = e => {
    const { onChange } = this.props;
    if (onChange) onChange(e.target.value);
  };

  render() {
    const {
      dictEntries: { TechSecretLevel: levels },
      options,
      value,
      disabled,
      loading,
      ...rest
    } = this.props;
    if (loading) return <LoadingOutlined />;
    return (
      <Radio.Group {...rest} onChange={this.onChange} value={value} disabled={disabled}>
        {(options || levels || []).map(level => (
          <Radio.Button value={level.value} key={level.value}>
            {level.name}
          </Radio.Button>
        ))}
      </Radio.Group>
    );
  }
}

class ConfidentialityPeriod extends React.PureComponent {
  constructor(props) {
    super(props);
    const { secretLevel } = props;
    const periodProps = this.setConfidentialityPeriodOnChangeSecretLevel(secretLevel);
    this.onChange(periodProps.min);
    this.state = { ...periodProps };
  }

  onChange = value => {
    if (Number.isNaN(value)) {
      return;
    }
    const { onChange } = this.props;
    if (onChange) onChange(value);
  };

  setConfidentialityPeriodOnChangeSecretLevel = level => {
    switch (level) {
      case '非密':
        return { min: 0, max: 0 };
      case '内部':
        return { min: 0, max: 10 };
      case '秘密':
        return { min: 10, max: 20 };
      case '机密':
        return { min: 20, max: 30 };
      default:
        return { min: 0, max: 0 };
    }
  };

  render() {
    const { value = 0, disabled, secretLevel, ...rest } = this.props;
    const { min, max } = this.state;
    return (
      <Row gutter={6}>
        <Col span={12}>
          <Slider
            {...rest}
            disabled={!max || disabled}
            min={min}
            max={max}
            value={value}
            onChange={this.onChange}
          />
        </Col>
        <Col span={12}>
          <InputNumber
            {...rest}
            disabled={!max || disabled}
            min={min}
            max={max}
            value={value}
            onChange={this.onChange}
          />
          &nbsp; 年
        </Col>
      </Row>
    );
  }
}

export { SecretLevel, TechSecretLevel, ConfidentialityPeriod };

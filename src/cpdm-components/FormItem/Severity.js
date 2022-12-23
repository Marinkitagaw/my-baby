import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import { connect } from 'umi';

class Severity extends React.PureComponent {
  componentDidMount() {
    const {
      dispatch,
      options,
      dictEntries: { Severity: severities },
    } = this.props;
    if (!options && !severities) dispatch({ type: 'common/severities' });
  }

  onChange = value => {
    if (value) {
      const { onChange } = this.props;
      if (onChange) onChange(value);
    }
  };

  render() {
    const {
      dictEntries: { Severity: severities },
      options,
      loading,
      value,
      disabled,
      placeholder,
      ...rest
    } = this.props;
    if (loading) return <LoadingOutlined />;
    return (
      <Select
        {...rest}
        placeholder={placeholder || '选择严重程度'}
        onChange={this.onChange}
        // value={value}
        disabled={disabled}
        allowClear
        style={{ width: 90 }}
      >
        {(options || severities || []).map(mark => (
          <Select.Option key={mark.id}>{mark.name}</Select.Option>
        ))}
      </Select>
    );
  }
}

export default connect(({ dictionary, loading }) => ({
  dictEntries: dictionary.dictEntries,
  loading: loading.effects['dictionary/getDictEntries'],
}))(Severity);

import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import { connect } from 'umi';

class Opportunity extends React.PureComponent {
  componentDidMount() {
    const {
      dispatch,
      options,
      dictEntries: { HappenOpportunity: opportunities },
    } = this.props;
    if (!options && !opportunities) dispatch({ type: 'common/opportunities' });
  }

  onChange = value => {
    if (value) {
      const { onChange } = this.props;
      if (onChange) onChange(value);
    }
  };

  render() {
    const {
      dictEntries: { HappenOpportunity: opportunities },
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
        placeholder={placeholder || '选择发生时机'}
        onChange={this.onChange}
        // value={value}
        disabled={disabled}
        allowClear
        style={{ width: 90 }}
      >
        {(options || opportunities || []).map(mark => (
          <Select.Option key={mark.id}>{mark.name}</Select.Option>
        ))}
      </Select>
    );
  }
}

export default connect(({ dictionary, loading }) => ({
  dictEntries: dictionary.dictEntries,
  loading: loading.effects['dictionary/getDictEntries'],
}))(Opportunity);

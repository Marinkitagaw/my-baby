import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import { connect } from 'umi';

class QbsWhetherOrNot extends React.PureComponent {
  componentDidMount() {
    const {
      dispatch,
      options,
      dictEntries: { QbsWhetherOrNot: whetherOrNots },
    } = this.props;
    if (!options && !whetherOrNots) dispatch({ type: 'common/whetherOrNots' });
  }

  onChange = value => {
    if (value) {
      const { onChange } = this.props;
      if (onChange) onChange(value);
    }
  };

  render() {
    const {
      dictEntries: { QbsWhetherOrNot: whetherOrNots },
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
        placeholder={placeholder || ''}
        onChange={this.onChange}
        // value={value}
        disabled={disabled}
        allowClear
        style={{ width: 60 }}
      >
        {(options || whetherOrNots || []).map(mark => (
          <Select.Option key={mark.value}>{mark.name}</Select.Option>
        ))}
      </Select>
    );
  }
}

export default connect(({ dictionary, loading }) => ({
  dictEntries: dictionary.dictEntries,
  loading: loading.effects['dictionary/getDictEntries'],
}))(QbsWhetherOrNot);

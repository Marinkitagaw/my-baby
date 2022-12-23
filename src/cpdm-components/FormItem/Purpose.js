import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import { connect } from 'umi';

class Purpose extends React.PureComponent {
  componentDidMount() {
    const {
      dispatch,
      options,
      dictEntries: { Purpose: ps },
    } = this.props;
    if (!options && !ps) dispatch({ type: 'common/purposes' });
  }

  onChange = value => {
    if (value) {
      const { onChange } = this.props;
      if (onChange) onChange(value);
    }
  };

  render() {
    const {
      dictEntries: { Purpose: ps },
      loading,
      options,
      value,
      disabled,
      ...rest
    } = this.props;
    if (loading) return <LoadingOutlined />;
    return (
      <Select
        {...rest}
        placeholder="选择用途"
        onChange={this.onChange}
        value={value}
        disabled={disabled}
      >
        {(options || ps || []).map(p => (
          <Select.Option key={p.value}>{p.name}</Select.Option>
        ))}
      </Select>
    );
  }
}

export default connect(({ dictionary, loading }) => ({
  dictEntries: dictionary.dictEntries,
  loading: loading.effects['dictionary/getDictEntries'],
}))(Purpose);

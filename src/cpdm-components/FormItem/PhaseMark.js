import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import { connect } from 'umi';

class PhaseMark extends React.PureComponent {
  componentDidMount() {
    const {
      dispatch,
      options,
      dictEntries: { PhaseMark: marks },
    } = this.props;
    if (!options && !marks) dispatch({ type: 'common/phaseMarks' });
  }

  onChange = value => {
    if (value) {
      const { onChange } = this.props;
      if (onChange) onChange(value);
    }
  };

  render() {
    const {
      dictEntries: { PhaseMark: marks },
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
        placeholder={placeholder || '选择研制阶段'}
        onChange={this.onChange}
        value={value}
        disabled={disabled}
        allowClear
      >
        {(options || marks || []).map(mark => (
          <Select.Option key={mark.value}>{mark.name}</Select.Option>
        ))}
      </Select>
    );
  }
}

export default connect(({ dictionary, loading }) => ({
  dictEntries: dictionary.dictEntries,
  loading: loading.effects['dictionary/getDictEntries'],
}))(PhaseMark);

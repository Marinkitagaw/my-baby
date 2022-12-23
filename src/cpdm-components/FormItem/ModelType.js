import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import { connect } from 'umi';

class ModelType extends React.PureComponent {
  componentDidMount() {
    const {
      dispatch,
      options,
      dictEntries: { ModelType: modelTypes },
    } = this.props;
    if (!options && !modelTypes) dispatch({ type: 'common/modelTypes' });
  }

  onChange = value => {
    if (value) {
      const { onChange } = this.props;
      if (onChange) onChange(value);
    }
  };

  render() {
    const {
      dictEntries: { ModelType: modelTypes },
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
        placeholder={placeholder || '选择型号类别'}
        onChange={this.onChange}
        // value={value}
        disabled={disabled}
        allowClear
        style={{ width: 90 }}
      >
        {(options || modelTypes || []).map(mark => (
          <Select.Option key={mark.id}>{mark.name}</Select.Option>
        ))}
      </Select>
    );
  }
}

export default connect(({ dictionary, loading }) => ({
  dictEntries: dictionary.dictEntries,
  loading: loading.effects['dictionary/getDictEntries'],
}))(ModelType);

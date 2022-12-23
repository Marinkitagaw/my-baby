import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import { connect } from 'umi';

class QbdIsThreeCategories extends React.PureComponent {
  componentDidMount() {
    const {
      dispatch,
      options,
      dictEntries: { QbdIsThreeCategories: threeCategories },
    } = this.props;
    if (!options && !threeCategories) dispatch({ type: 'common/threeCategories' });
  }

  onChange = value => {
    if (value) {
      const { onChange } = this.props;
      if (onChange) onChange(value);
    }
  };

  render() {
    const {
      dictEntries: { QbdIsThreeCategories: threeCategories },
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
        placeholder={placeholder || '选择单机成熟度'}
        onChange={this.onChange}
        // value={value}
        disabled={disabled}
        allowClear
        style={{ width: 64 }}
      >
        {(options || threeCategories || []).map(mark => (
          <Select.Option key={mark.id}>{mark.name}</Select.Option>
        ))}
      </Select>
    );
  }
}

export default connect(({ dictionary, loading }) => ({
  dictEntries: dictionary.dictEntries,
  loading: loading.effects['dictionary/getDictEntries'],
}))(QbdIsThreeCategories);

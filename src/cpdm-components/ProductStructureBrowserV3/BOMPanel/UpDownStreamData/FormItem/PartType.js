import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import { connect } from 'umi';

class PartType extends React.PureComponent {
  componentDidMount() {
    const {
      dispatch,
      options,
      dictEntries: { PartType: types },
    } = this.props;
    if (!options && !types) dispatch({ type: 'common/partTypes' });
  }

  onChange = value => {
    if (value) {
      const { onChange } = this.props;
      if (onChange) onChange(value);
    }
  };

  render() {
    const {
      dictEntries: { PartType: types },
      options,
      loading,
      value,
      disabled,
      ...rest
    } = this.props;
    if (loading) return <LoadingOutlined />;
    return (
      <Select {...rest} onChange={this.onChange} value={value} disabled={disabled}>
        {(options || types || []).map(t => (
          <Select.Option key={t.value}>{t.name}</Select.Option>
        ))}
      </Select>
    );
  }
}

export default connect(({ dictionary, loading }) => ({
  dictEntries: dictionary.dictEntries,
  loading: loading.effects['dictionary/getDictEntries'],
}))(PartType);

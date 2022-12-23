/* eslint-disable max-classes-per-file */
import React from 'react';
import { Radio } from 'antd';
import { connect } from 'umi';

@connect(({ dictionary, loading }) => ({
  dictEntries: dictionary.dictEntries,
  loading: loading.effects['dictionary/getDictEntries'],
}))
class ShareLevel extends React.PureComponent {
  onChange = e => {
    const { onChange } = this.props;
    if (onChange) onChange(e.target.value);
  };

  render() {
    const { value, disabled, ...rest } = this.props;
    return (
      <Radio.Group {...rest} onChange={this.onChange} value={value} disabled={disabled}>
        <Radio value="ALL">共享</Radio>
        <Radio value="SOME">部分共享</Radio>
        <Radio value="NONE">不共享</Radio>
      </Radio.Group>
    );
  }
}

@connect(({ dictionary, loading }) => ({
  dictEntries: dictionary.dictEntries,
  loading: loading.effects['dictionary/getDictEntries'],
}))
class ShareScope extends React.PureComponent {
  componentDidMount() {
    const { dispatch, dictEntries = {} } = this.props;
    const scopes = dictEntries.ShareScope;
    if (!scopes) dispatch({ type: 'common/shareScope' });
  }

  onChange = values => {
    const { onChange } = this.props;
    if (onChange) onChange(values);
  };

  render() {
    const { value, disabled, dictEntries = {}, ...rest } = this.props;
    return (
      <Radio.Group
        {...rest}
        value={value}
        disabled={disabled}
        onChange={this.onChange}
        options={(dictEntries.ShareScope || []).map(item => ({
          label: item.name,
          value: item.value,
        }))}
      />
    );
  }
}

export { ShareLevel, ShareScope };

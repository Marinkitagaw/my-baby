import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Select, Input } from 'antd';
import { connect } from 'umi';

class SelectEnum extends React.PureComponent {
  componentDidMount() {
    const { code, dispatch } = this.props;
    if (code) {
      dispatch({
        type: 'dictionary/getDictEntries',
        payload: {
          code,
        },
      });
    }
  }

  onChange = value => {
    if (value) {
      const { onChange } = this.props;
      if (onChange) onChange(value);
    }
  };

  render() {
    const { dictEntries = {}, dispatch, code, loading, ...rest } = this.props;
    if (loading) return <LoadingOutlined />;
    return Array.isArray(dictEntries[code]) ? (
      <Select onChange={this.onChange} {...rest}>
        {(dictEntries[code] || []).map(t => (
          <Select.Option key={t.id || t.value}>{t.name || t.text}</Select.Option>
        ))}
      </Select>
    ) : (
      <Input onChange={e => this.onChange(e.target.value)} />
    );
  }
}

export default connect(({ dictionary, loading }) => ({
  dictEntries: dictionary.dictEntries,
  loading: loading.effects['dictionary/getDictEntries'],
}))(SelectEnum);

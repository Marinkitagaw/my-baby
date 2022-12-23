import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import { connect } from 'umi';

class RepoSeriesPicker extends React.PureComponent {
  componentDidMount() {
    const { dispatch, options } = this.props;
    if (!options) dispatch({ type: 'repository/series' });
  }

  onChange = value => {
    if (value) {
      const { onChange } = this.props;
      if (onChange) onChange(value);
    }
  };

  render() {
    const { series = [], loading, options, value, disabled, ...rest } = this.props;
    if (loading) return <LoadingOutlined />;
    return (
      <Select
        {...rest}
        placeholder="选择产品系列"
        onChange={this.onChange}
        value={value}
        disabled={disabled}
      >
        {(options || series || []).map(p => (
          <Select.Option key={p.id}>{p.name}</Select.Option>
        ))}
      </Select>
    );
  }
}

export default connect(({ repository, loading }) => ({
  series: repository.series,
  loading: loading.effects['repository/series'],
}))(RepoSeriesPicker);

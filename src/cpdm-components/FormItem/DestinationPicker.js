import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { TreeSelect } from 'antd';
import { connect } from 'umi';

class DestinationPicker extends React.PureComponent {
  componentDidMount() {
    const { dispatch, options } = this.props;
    if (!options) dispatch({ type: 'common/sendTo' });
  }

  onChange = selected => {
    const { onChange } = this.props;
    if (onChange) onChange(selected);
  };

  render() {
    const { value, destinations, options, loading, dispatch, ...rest } = this.props;
    if (loading) return <LoadingOutlined />;
    return (
      <TreeSelect
        {...rest}
        value={value}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        treeData={options || destinations}
        allowClear
        multiple
        placeholder="选择发往单位"
        treeDefaultExpandAll
        onChange={this.onChange}
      />
    );
  }
}

export default connect(({ common, loading }) => ({
  destinations: common.destinations,
  loading: loading.effects['common/sendTo'],
}))(DestinationPicker);

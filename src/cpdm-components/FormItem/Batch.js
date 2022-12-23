import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Radio } from 'antd';
import { connect } from 'umi';

class Batch extends React.PureComponent {
  componentDidMount() {
    // const {
    //   dispatch,
    //   options,
    //   dictEntries: { ManagementLevel: levels },
    // } = this.props;
    // if (!options && !levels) dispatch({ type: 'common/levels' });
  }

  onBatchChange = e => {
    const { onChange } = this.props;
    if (onChange) onChange(e.target.value);
  };

  render() {
    const { loading, value, disabled } = this.props;
    if (loading) return <LoadingOutlined />;
    return (
      <Radio.Group
        checked={value}
        value={value}
        disabled={disabled}
        onChange={e => this.onBatchChange(e)}
      >
        <Radio value="batch">批次</Radio>
        <Radio value="batchStage">批台次</Radio>
      </Radio.Group>
    );
  }
}

export default connect(({ dictionary, loading }) => ({
  dictEntries: dictionary.dictEntries,
  loading: loading.effects['dictionary/getDictEntries'],
}))(Batch);

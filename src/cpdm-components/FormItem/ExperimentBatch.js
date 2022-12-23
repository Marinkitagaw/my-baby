import React from 'react';
import { Select } from 'antd';
import { loadBatchLists } from '@/services/reposiotry/repository';
import { StopOutlined } from '@ant-design/icons';

class ExperimentBatch extends React.PureComponent {
  state = {
    experimentBatch: [],
  };

  componentDidMount() {
    const { repositoryId } = this.props;

    this.loadBatchLists({
      repositoryId,
    });
  }

  loadBatchLists = async params => {
    const res = await loadBatchLists({
      ...params,
    });
    if (res && Array.isArray(res)) {
      this.setState({
        experimentBatch: res || [],
      });
    }
  };

  onChange = value => {
    if (value) {
      const { onChange } = this.props;
      if (onChange) onChange(value);
    }
  };

  render() {
    const { options, loading, value, disabled, placeholder, repositoryId, ...rest } = this.props;
    const { experimentBatch = [] } = this.state;
    if (!repositoryId) {
      return (
        <span>
          <StopOutlined style={{ color: '#900' }} />
          &nbsp;尚未选择容器
        </span>
      );
    }
    return (
      <Select
        {...rest}
        placeholder=""
        onChange={this.onChange}
        disabled={disabled}
        value={value}
        allowClear
        // style={{ width: 90 }}
      >
        {(experimentBatch || []).map(batch => (
          <Select.Option key={batch.id}>{batch.batch}</Select.Option>
        ))}
      </Select>
    );
  }
}

export default ExperimentBatch;

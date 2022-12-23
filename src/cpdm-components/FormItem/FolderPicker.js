import React from 'react';
import { LoadingOutlined, StopOutlined } from '@ant-design/icons';
import { Select, Tooltip } from 'antd';
import { connect } from 'umi';

class FolderPicker extends React.PureComponent {
  constructor(p) {
    super(p);
    const { repositoryId } = p;
    if (repositoryId) {
      this.loadFolders(repositoryId);
    }
  }

  loadFolders = repo => {
    const { dispatch } = this.props;
    if (repo) dispatch({ type: 'repository/folders', payload: repo });
  };

  onChange = value => {
    if (value) {
      const { onChange } = this.props;
      if (onChange) onChange(value);
    }
  };

  render() {
    const { folders, repositoryId, loading, value, disabled, dispatch, ...rest } = this.props;
    if (loading) return <LoadingOutlined />;
    if (!repositoryId)
      return (
        <Tooltip title="请先选择容器">
          <StopOutlined style={{ color: '#700' }} />
        </Tooltip>
      );
    return (
      <Select
        {...rest}
        placeholder="选择存储位置"
        onChange={this.onChange}
        value={value}
        disabled={disabled}
      >
        <Select.OptGroup label="默认">
          <Select.Option key="$default">由模板指定</Select.Option>
        </Select.OptGroup>
        <Select.OptGroup label="自定义">
          {folders.map(f => (
            <Select.Option key={f.id}>{f.name}</Select.Option>
          ))}
        </Select.OptGroup>
      </Select>
    );
  }
}

export default connect(({ repository, loading }) => ({
  folders: repository.folders,
  loading: loading.effects['repository/folders'],
}))(FolderPicker);

import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Space, Select } from 'antd';
import { TagSelect } from '@cpdm/components';
import * as commonService from '@/services/common';
import styles from './index.less';

class CategoryState extends React.PureComponent {
  state = { loading: false, categoryStates: [] };

  componentDidMount() {
    const { templateName } = this.props;
    if (templateName) {
      this.getCategoryState(templateName);
    } else {
      this.setState({ categoryStates: [] });
    }
  }

  getCategoryState = async templateName => {
    this.setState({ loading: true });
    const res = await commonService.getCategoryState(templateName);
    if (res && res.length) this.setState({ categoryStates: res });
    this.setState({ loading: false });
  };

  onChange = value => {
    const { categoryStates = [] } = this.state;
    const { onChange } = this.props;
    if (value && onChange) {
      onChange(value.length === categoryStates.length ? [] : value);
    }
  };

  render() {
    const { noLabel, templateName, rowKey, style = {} } = this.props;
    const { loading, categoryStates = [] } = this.state;
    if (!templateName) return '';
    if (loading) return <LoadingOutlined />;
    return noLabel ? (
      <Select allowClear style={{ width: '100%' }} onChange={this.onChange}>
        {categoryStates.map(item => (
          <Select.Option
            value={rowKey ? item[rowKey] : item.stateId}
            key={rowKey ? item[rowKey] : item.stateId}
          >
            {item.stateName}
          </Select.Option>
        ))}
      </Select>
    ) : (
      <Space>
        <span style={{ verticalAlign: 'super' }}>状态筛选：</span>
        <TagSelect
          style={{ display: 'inline-block', ...style }}
          className={styles.categoryStatesTag}
          onChange={this.onChange}
        >
          {categoryStates.map(item => (
            <TagSelect.Option
              key={rowKey ? item[rowKey] : item.stateId}
              value={rowKey ? item[rowKey] : item.stateId}
            >
              {item.stateName}
            </TagSelect.Option>
          ))}
        </TagSelect>
      </Space>
    );
  }
}

export default CategoryState;

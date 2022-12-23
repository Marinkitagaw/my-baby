import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Cascader } from 'antd';
import * as bomService from '@/services/data/bom';

class Category extends React.PureComponent {
  state = { loading: false };

  componentDidMount() {
    const { identifier } = this.props;
    if (identifier) {
      this.getCategory(identifier);
    } else {
      this.setState({ categories: [] });
    }
  }

  getCategory = async identifier => {
    this.setState({ loading: true });
    const res = await bomService.DocType1({
      // ...this.props,
      identifier: identifier || 'wt.doc.WTDocument',
      level: 'all',
      self: 'true',
    });
    if (res && res.length) this.setState({ categories: res });
    this.setState({ loading: false });
  };

  onChange = value => {
    if (value) {
      const { onChange } = this.props;
      if (onChange) onChange(value);
    }
  };

  render() {
    const { options, value, disabled, ...rest } = this.props;
    const { loading, categories = [] } = this.state;
    if (loading) return <LoadingOutlined />;
    return (
      <Cascader
        {...rest}
        placeholder="选择类型"
        onChange={this.onChange}
        options={categories}
        value={value}
        disabled={disabled}
        changeOnSelect
        fieldNames={{ label: 'name', value: 'id', children: 'subcategories' }}
      />
    );
  }
}

export default Category;

import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Cascader } from 'antd';
import { connect } from 'umi';

class CategoryPicker extends React.PureComponent {
  componentDidMount() {
    const { dispatch, categories, type } = this.props;
    if (!categories) dispatch({ type: 'common/typeTree', payload: { objectType: type } });
  }

  onChange = selected => {
    const { onChange } = this.props;
    if (onChange) onChange(selected);
  };

  render() {
    const { value, categories, loading, typeTree, dispatch, ...rest } = this.props;
    if (loading) return <LoadingOutlined />;
    return (
      <Cascader
        {...rest}
        value={value && value.length ? [value] : []}
        options={categories || typeTree}
        onChange={this.onChange}
      />
    );
  }
}

export default connect(({ category, loading }) => ({
  typeTree: category.typeTree,
  loading: loading.effects['category/typeTree'],
}))(CategoryPicker);

import React from 'react';
import { StopOutlined } from '@ant-design/icons';
import { Input, Tooltip } from 'antd';
import { connect } from 'umi';

class CodeInput extends React.PureComponent {
  constructor(props) {
    super(props);
    const { autoCode } = this.props;
    this.state = {
      autoCode: autoCode || false,
    };
  }

  componentDidMount() {
    const { typeTree, categoryIds } = this.props;
    if (categoryIds) {
      const selectedCategory =
        categoryIds.length && this.filterSelectedCategory(categoryIds[0], typeTree);
      if (selectedCategory) {
        if (selectedCategory.codeRuleId) this.getCodeRule(selectedCategory.codeRuleId);
      }
    }
  }

  getCodeRule = codeRuleId => {
    const { dispatch, onChange } = this.props;
    dispatch({
      type: 'common/codeRule',
      payload: { codeRuleId },
      callback: (res = {}) => {
        if (res.autoCode) {
          this.setState({ autoCode: res.autoCode }, () => {
            if (onChange && res.autoCode) onChange('$autoCode');
          });
        }
      },
    });
  };

  filterSelectedCategory = (categoryId, categories) => {
    let selected;
    categories.map(item => {
      if (item.value === categoryId) {
        selected = item;
      } else if (item.children) {
        selected = this.filterSelectedCategory(categoryId, item.children);
      } else {
        return '';
      }
      return '';
    });
    return selected;
  };

  onChange = ({ target: { value } }) => {
    const { onChange } = this.props;
    if (onChange) onChange(value);
  };

  render() {
    const { value, categoryIds, ConfigAutoCode, onChange, ...rest } = this.props;
    const { autoCode } = this.state;
    if (!categoryIds && ConfigAutoCode)
      return (
        <Tooltip title="请先选择类型">
          <StopOutlined style={{ color: '#700' }} />
        </Tooltip>
      );
    return (
      <Input
        disabled={!!autoCode && ConfigAutoCode}
        placeholder={autoCode ? '编号自动生成' : '填写编号'}
        value={value !== '$autoCode' ? value : undefined}
        onChange={this.onChange}
        {...rest}
      />
    );
  }
}
export default connect(({ category, loading }) => ({
  typeTree: category.typeTree,
  loading: loading.effects['category/typeTree'],
}))(CodeInput);

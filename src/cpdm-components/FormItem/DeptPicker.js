import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import { connect } from 'umi';

class DeptPicker extends React.PureComponent {
  componentDidMount() {
    const { dispatch, departments, onChange } = this.props;
    if (!departments)
      dispatch({
        type: 'common/myDept',
        callback: depts => {
          const initValue = depts.length && depts[0].id;
          onChange(initValue);
        },
      });
  }

  onChange = selected => {
    const { onChange } = this.props;
    if (onChange) onChange(selected);
  };

  render() {
    const { value, departments, loading, depts = [], dispatch, ...rest } = this.props;
    const initValue = depts.length && depts[0].id;
    if (loading) return <LoadingOutlined />;
    return (
      <Select value={value || initValue} {...rest} onChange={this.onChange}>
        {(departments || depts).map(d => (
          <Select.Option value={d.id} key={d.id}>
            {d.name}
          </Select.Option>
        ))}
      </Select>
    );
  }
}

export default connect(({ common, loading }) => ({
  depts: common.departments,
  loading: loading.effects['category/typeTree'],
}))(DeptPicker);

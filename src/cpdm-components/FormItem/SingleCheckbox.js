import React from 'react';
import { Checkbox, Tooltip } from 'antd';

class SingleCheckbox extends React.PureComponent {
  render() {
    const { value, onChange, children, ...rest } = this.props;
    return (
      <Tooltip title={value ? '取消设置' : '设置'}>
        <Checkbox
          {...rest}
          checked={value}
          onChange={e => {
            if (onChange) onChange(e.target.checked);
          }}
        >
          {children}
        </Checkbox>
      </Tooltip>
    );
  }
}

export default SingleCheckbox;

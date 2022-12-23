import { Button, Space } from 'antd';
import React from 'react';

export default props => {
  const { buttons = [] } = props;
  return (
    <Space>
      {buttons.map(({ type, icon, title, handle, size = 'middle' }) => {
        return (
          <Button key={title} onClick={() => handle()} type={type} icon={icon} size={size}>
            {title}
          </Button>
        );
      })}
    </Space>
  );
};

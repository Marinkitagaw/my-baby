import { SaveOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';

export default props => {
  const { onClick, loading, ...rest } = props;
  return (
    <Button
      icon={<SaveOutlined />}
      type="primary"
      size="large"
      onClick={onClick}
      loading={loading}
      {...rest}
    >
      提交
    </Button>
  );
};

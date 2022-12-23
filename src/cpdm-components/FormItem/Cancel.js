import { Button } from 'antd';
import React from 'react';

export default props => {
  const { onClick, loading, ...rest } = props;
  return (
    <Button onClick={onClick} loading={loading} size="large" {...rest}>
      取消
    </Button>
  );
};

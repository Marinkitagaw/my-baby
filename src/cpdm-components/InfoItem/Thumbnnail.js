import React from 'react';
import { Card } from 'antd';

export default props => {
  const { image, init, loading, ...rest } = props;
  return (
    <Card
      {...rest}
      loading={loading}
      hoverable
      cover={
        image ||
        init || (
          <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
        )
      }
      actions={[<a>查看大图</a>, <a>查看表示法</a>]}
      bodyStyle={{ padding: 0 }}
    />
  );
};

import React from 'react';
import { Descriptions } from 'antd';

export default props => {
  const { data, style } = props;
  if (!data || !data.id || !data.customAttributes) return '';
  return (
    <div key={data.id} style={style}>
      <Descriptions title="其他属性" column={2} size="small" bordered>
        {Object.keys(data.customAttributes).map(k => (
          <Descriptions.Item label={k} id={k} key={k}>
            {data.customAttributes[k]}
          </Descriptions.Item>
        ))}
      </Descriptions>
    </div>
  );
};

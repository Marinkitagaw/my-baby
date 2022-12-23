import React from 'react';
import { Descriptions } from 'antd';
import moment from 'moment';

export default props => {
  const { data, short } = props;
  if (!data) return '';
  return (
    <Descriptions column={short ? 2 : { xxl: 6, xl: 5, lg: 5, md: 2, sm: 1, xs: 1 }}>
      {data.creator && data.creator.fullName && (
        <Descriptions.Item label="创建者">{data.creator.fullName}</Descriptions.Item>
      )}
      {data.createStamp && (
        <Descriptions.Item label="创建时间">
          {moment(data.createStamp).format('YYYY年MM月DD日 HH:mm')}
        </Descriptions.Item>
      )}
      {data.modifier && data.modifier.fullName && (
        <Descriptions.Item label="修改者">
          {data.modifierFullName || data.modifier.fullName}
        </Descriptions.Item>
      )}
      {data.modifyStamp && (
        <Descriptions.Item label="修改时间">
          {moment(data.modifyStamp).format('YYYY年MM月DD日 HH:mm')}
        </Descriptions.Item>
      )}
    </Descriptions>
  );
};

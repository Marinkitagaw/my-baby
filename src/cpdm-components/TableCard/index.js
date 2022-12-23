import React from 'react';
import { Card } from 'antd';
import { Table } from '@cpdm/components';
import classNames from 'classnames';
import style from './index.less';

export default props => {
  const {
    title,
    extra,
    style: s,
    bodyStyle,
    type,
    bordered,
    tableBordered,
    cardLoading,
    loading,
    size,
    noWrap,
    selectable,
    ...rest
  } = props;
  const cls = [style['table-card']];
  if (size) cls.push(style[`table-card-${size}`]);
  if (noWrap) cls.push(style['table-card-no-wrap']);
  if (type) cls.push(style[`table-card-${type}`]);
  const className = classNames(cls);
  return (
    <Card
      title={title}
      extra={extra}
      bordered={bordered}
      className={className}
      type={type}
      style={s}
      bodyStyle={bodyStyle}
      loading={cardLoading && loading}
    >
      <Table
        {...rest}
        size={size || 'middle'}
        loading={!cardLoading && loading}
        bordered={tableBordered}
      />
    </Card>
  );
};

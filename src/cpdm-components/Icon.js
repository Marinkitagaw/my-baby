/* eslint-disable global-require */
import React from 'react';

export default props => {
  const { name, ...rest } = props;
  const src = require(`@/assets/${name}`);
  return <img {...rest} alt="图标" src={src} />;
};

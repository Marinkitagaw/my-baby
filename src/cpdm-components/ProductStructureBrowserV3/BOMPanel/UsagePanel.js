import React from 'react';
import Usage from '@/cpdm-components/ProductUsage';

export default props => {
  const { id } = props;
  return (
    <div>
      <Usage noConfig root={id} readonly />
    </div>
  );
};

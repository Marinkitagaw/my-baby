import React from 'react';
import { Space } from 'antd';
import { DesignPart, ProcessPart, FactPart } from './Data';

export default props => {
  const { dataType } = props;
  let content;
  switch (dataType) {
    case 'FUNCTION':
      content = <DesignPart {...props} objectType="com.casic.cpdm.part.entity.DesignPart" />;
      break;
    case 'DESIGN':
      content = (
        <Space style={{ width: '100%' }} direction="vertical" size="middle">
          <ProcessPart {...props} objectType="com.casic.cpdm.part.entity.ProcessPart" />
          <FactPart {...props} objectType="com.casic.cpdm.part.entity.FactPart" />
        </Space>
      );
      break;
    case 'PROCESS':
      content = <FactPart {...props} objectType="com.casic.cpdm.part.entity.FactPart" />;
      break;
    default:
      content = '';
      break;
  }
  return content;
};

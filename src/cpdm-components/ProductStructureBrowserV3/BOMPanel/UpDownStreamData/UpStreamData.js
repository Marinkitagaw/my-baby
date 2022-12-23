import React from 'react';
import { Space } from 'antd';
import { DesignPart, FunctionPart, ProcessPart, RequirementPart } from './Data';

export default props => {
  const { dataType } = props;
  let content;
  switch (dataType) {
    case 'DESIGN':
      content = <FunctionPart {...props} />;
      break;
    case 'FUNCTION':
      content = <RequirementPart {...props} />;
      break;
    case 'PROCESS':
      content = <DesignPart {...props} objectType="com.casic.cpdm.part.entity.DesignPart" />;
      break;
    case 'FACT':
      content = (
        <Space style={{ width: '100%' }} direction="vertical" size="middle">
          <ProcessPart objectType="com.casic.cpdm.part.entity.ProcessPart" {...props} />
          <DesignPart {...props} objectType="com.casic.cpdm.part.entity.DesignPart" />
        </Space>
      );
      break;
    case 'SERVICE':
      content = (
        <Space style={{ width: '100%' }} direction="vertical" size="middle">
          <ProcessPart objectType="com.casic.cpdm.part.entity.ProcessPart" {...props} />
          <DesignPart {...props} objectType="com.casic.cpdm.part.entity.DesignPart" />
        </Space>
      );
      break;
    default:
      content = '';
      break;
  }
  return content;
};

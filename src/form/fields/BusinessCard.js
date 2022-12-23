import React from 'react';
import { SchemaMarkupField as Field } from '@formily/antd';
import { FormCard } from '@formily/antd-components';

const generate = globalAttributeId => {
  let component;
  switch (globalAttributeId) {
    case 'secretLevel':
      component = 'SecretLevel';
      break;
    case 'ConfidentialityPeriod':
      component = 'ConfidentialityPeriod';
      break;
    case 'departmentId':
      component = 'DepartmentPicker';
      break;
    case 'Contents':
      component = 'SecondaryContent';
      break;
    case 'repositoryId':
      component = 'RepoPicker';
      break;
    default:
      component = 'input';
      break;
  }
  return component;
};

function BusinessCard(attributeMeta) {
  return (
    <FormCard name="bussiness-card">
      {attributeMeta.map(item => (
        <Field type={item.type} name={item.name} x-component={generate(item.globalAttributeId)} />
      ))}
    </FormCard>
  );
}

export default BusinessCard;

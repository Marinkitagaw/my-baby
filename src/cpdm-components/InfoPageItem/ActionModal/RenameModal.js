import React from 'react';
import { Modal } from '@cpdm/components';
import FormGenerator from '@/cpdm-components/FormGenerator';

export default props => {
  const { visible, onCancel } = props;

  return (
    <Modal visible={visible} title="重命名" footer={null} onCancel={onCancel}>
      <FormGenerator {...props} />
    </Modal>
  );
};

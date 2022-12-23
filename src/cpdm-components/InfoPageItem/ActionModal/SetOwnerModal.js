import React from 'react';
import { UserPicker } from 'cpdm-ui-components';

export default props => {
  const { visible, onCancel, setOwner } = props;
  const userSearch = {
    host: process.env.API_BASE_PATH,
    title: '设置所有者',
    selectionType: 'radio',
    hideExpert: true,
    onOk: setOwner,
    onCancel,
    visible,
  };

  return <UserPicker {...userSearch} />;
};

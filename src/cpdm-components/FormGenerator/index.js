import React from 'react';
import Create from './CreateForm';
import CreateObjectForm from './CreateObjectForm';
import Update from './UpdateForm';
import Detail from './DetailForm';
import RenameForm from './RenameForm';
import ListFilterForm from './ListFilterForm';

export default props => {
  const { action } = props;
  switch (action) {
    case 'CREATE':
      return <Create {...props} />;
    case 'CREATE-OBJECT':
      return <CreateObjectForm {...props} />;
    case 'UPDATE':
      return <Update {...props} />;
    case 'DETAIL':
      return <Detail {...props} />;
    case 'RENAME':
      return <RenameForm {...props} />;
    case 'LIST':
      return <ListFilterForm {...props} />;
    default:
      return <Create {...props} />;
  }
};

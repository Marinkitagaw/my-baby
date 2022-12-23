// import { request } from '@cpdm/util';

async function getDefaultValues(attributeMeta, data) {
  const value = {};
  attributeMeta.map(item => {
    value[item.id] = item.defaultValue || data[item.id];
    if (data && data.id) {
      value[item.id] = data[item.id];
      if (item.id === 'viewName') {
        value.viewName = item.defaultValue;
      }
      if (item.id === 'repositoryId') {
        value.repositoryId = data.repositoryId || (data.repository && data.repository.id);
      }
      if (item.id === 'departmentId') {
        value.departmentId = data.department && data.department.name;
      }
      if (item.id === 'responsible') {
        value.responsible = data.responsible && data.responsible.id;
      }
      if (item.id === 'type') {
        const typeItem = attributeMeta.filter(attr => attr.id === 'type');
        if (typeItem && typeItem.length) {
          value.type.props['x-component-props'].identifier = typeItem[0].identities;
        }
      }
    }
    if (item.id === 'sendTo' && !item.defaultValue) {
      value.sendTo = undefined;
    }
    return false;
  });
  return value;
}

export default getDefaultValues;

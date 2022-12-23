async function getEditInitialValues(attributeMeta, data) {
  const value = {};
  const customProperties = data.link && data.link.customProperties;

  attributeMeta.map(item => {
    value.id = data.id;
    value.objectType = data.objectType;
    value[item.id] = data[item.id];
    if (item.id === 'repositoryId') {
      value.repositoryId = data.repository && data.repository.id;
    }
    if (item.id === 'applicableRepositoryId') {
      value.applicableRepositoryId = data.applicableRepository && data.applicableRepository.id;
    }
    if (item.id === 'primaryContent') {
      value.primaryContent = data.primaryContent;
    }
    if (item.id === 'secondaryContents') {
      value.secondaryContents = data.secondaryContents;
    }
    if (item.id === 'departmentId') {
      value.departmentId = data.department && data.department.id;
    }
    if (item.id === 'responsible') {
      value.responsible = data.responsible && data.responsible.id;
    }
    if (item.id === 'folderId') {
      value.folderId = data.folder && data.folder.folderId;
    }
    if (item.id === 'designPartId') {
      value.designPartId = data.designPartId;
    }
    if (item.id === 'primaryContent') {
      value.primaryContent =
        data.primaryContent &&
        data.primaryContent.id &&
        Object.assign(data.primaryContent, {
          contentType: data.primaryContent.role,
        });
    }
    if (item.id === 'secondaryContents') {
      value.secondaryContents = (data.secondaryContents || []).map(sc => ({
        ...sc,
        contentType: sc.role,
      }));
    }
    if (item.id === 'endItem') {
      value.endItem = data.endItem === 'true' || data.endItem === true ? 'true' : 'false';
    }

    if (item.id === 'type') {
      const types = data.type && data.type.split(',');
      value.type = types || [];
    }

    if (item.id === 'categoryDisplay') {
      value.categoryDisplay = data.category && data.category.path;
    }
    if (item.id === 'techCode') {
      value.techCode = data.code;
    }
    if (item.id === 'partCode') {
      value.partCode = data.partCode;
    }
    if (item.id === 'relationDoc') {
      value.relationDoc = data.id;
    }

    if (customProperties) {
      const keys = Object.keys(customProperties);
      keys.forEach(key => {
        if (key && item.id === key) {
          value[item.id] = customProperties[item.id];
        }
      });
    }

    return false;
  });
  return value;
}

export default getEditInitialValues;

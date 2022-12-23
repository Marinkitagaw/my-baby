async function getInitialValues(attributeMeta, data) {
  const value = {};
  attributeMeta.map(item => {
    value[item.id] = data[item.id] !== undefined ? data[item.id] : '--';
    if (item.id === 'repositoryId') {
      value.repositoryId = data.repository && data.repository.name;
    }
    if (item.id === 'endItem') {
      value.endItem = data.endItem === 'true' || data.endItem === true ? '是' : '否';
    }
    if (item.id === 'lifecycleTempalteId') {
      value.lifecycleTempalteId = data.lifecycleTemplateName;
    }
    if (item.id === 'stateId') {
      value.stateId = data.lifecycleStateName;
    }
    if (item.id === 'departmentId') {
      value.departmentId = data.department && data.department.name;
    }
    if (item.id === 'responsible') {
      value.responsible = data.responsible && data.responsible.name;
    }
    if (item.id === 'documentItems') {
      value.documentItems = Array.isArray(data.documentItems) ? data.documentItems : [];
    }
    if (item.id === 'folderId') {
      value.folderId = data.folder && data.folder.folderPath;
    }
    if (item.id === 'modelCode') {
      value.modelCode = data.repository && data.repository.modelCode;
    }
    if (item.id === 'confidentialityPeriod') {
      value.confidentialityPeriod = data.confidentialityPeriod;
    }
    if (item.id === 'primaryContent') {
      value.primaryContent =
        data.primaryContent &&
        data.primaryContent.id &&
        Object.assign(data.primaryContent, {
          contentType: data.primaryContent.role,
        });
    }
    if (item.id === 'reviewRecords') {
      value.reviewRecords = data.reviewRecords;
    }
    if (item.id === 'printContent') {
      value.printContent =
        data.printContent &&
        data.printContent.id &&
        Object.assign(data.printContent, {
          contentType: data.printContent.role,
        });
    }
    if (item.id === 'secondaryContents') {
      value.secondaryContents = data.secondaryContents
        ? (data.secondaryContents || []).map(sc => ({
            ...sc,
            contentType: sc.role,
          }))
        : '';
    }
    if (item.id === 'categoryIds') {
      value.categoryIds = data.category && data.category.path;
    }
    return false;
  });
  return value;
}

export default getInitialValues;

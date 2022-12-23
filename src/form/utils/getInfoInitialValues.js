async function getInfoInitialValues(attributeMeta, data) {
  const value = {};
  const customProperties = data.link && data.link.customProperties;

  attributeMeta.map(item => {
    value.id = data.id;
    value.objectType = data.objectType;
    value[item.id] = data[item.id];

    if (item.id === 'repositoryId') {
      value.repositoryId = data.repository && data.repository.name;
    }
    if (item.id === 'modelCode') {
      value.modelCode = data.repository && data.repository.modelCode;
    }
    if (item.id === 'modelSeries') {
      value.modelSeries = data.repository && data.repository.series;
    }
    if (item.id === 'stateId') {
      value.stateId = data.lifecycleStateName;
      value.lifecycleStates = data.lifecycleStates;
      value.lifecycleStateName = data.lifecycleStateName;
      value.lifecycleStateIdentifier = data.lifecycleStateIdentifier;
    }
    if (item.id === 'lifecycleTempalteId') {
      value.lifecycleTempalteId = data.lifecycleTemplateName;
    }
    if (item.id === 'ownerId') {
      value.ownerId = data.owner && data.owner.fullName;
    }
    if (item.id === 'primaryContent') {
      value.primaryContent = data.primaryContent;
    }
    if (item.id === 'secondaryContents') {
      value.secondaryContents = data.secondaryContents;
    }
    if (item.id === 'printContent') {
      value.printContent = data.printContent;
    }
    if (item.id === 'departmentId') {
      value.departmentId = data.department && data.department.name;
    }
    if (item.id === 'responsible') {
      value.responsible = data.responsible && data.responsible.id;
    }
    if (item.id === 'folderId') {
      value.folderId = data.folder && data.folder.folderPath;
      value.folderRepostoryId = data.repository && data.repository.id;
    }
    if (item.id === 'productType') {
      value.productType = data.productTypeDisplay;
    }
    if (item.id === 'productLevel') {
      value.productLevel = data.productLevelDisplay;
    }
    if (item.id === 'productCategory') {
      value.productCategory = data.productCategoryDisplay;
    }
    if (item.id === 'partDegree') {
      value.partDegree = data.partDegreeDisplay;
    }
    if (item.id === 'defaultUnit') {
      value.defaultUnit = data.defaultUnitDisplay;
    }
    if (item.id === 'purpose') {
      value.purpose = data.purposeDisplay;
    }
    if (item.id === 'shareScope') {
      value.shareScope = data.shareScopeDisplay || data.shareScope;
    }
    if (item.id === 'description') {
      value.description = data.description;
    }
    if (item.id === 'phaseMark') {
      value.phaseMark = data.phaseMarkDisplay;
    }
    if (item.id === 'engineSystemType') {
      value.engineSystemType = data.engineSystemTypeDisplay;
    }
    if (item.id === 'offSecretCode') {
      value.offSecretCode = data.offSecretCode;
    }
    if (item.id === 'batch') {
      value.batch = data.batchDisplay;
    }
    if (item.id === 'experimentBatch') {
      value.experimentBatch = data.experimentBatchDisplay;
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
      value.secondaryContents =
        data.secondaryContents &&
        (data.secondaryContents || []).map(sc => ({
          ...sc,
          contentType: sc.role,
        }));
    }
    if (item.id === 'printContent') {
      value.printContent =
        data.printContent &&
        data.printContent.id &&
        Object.assign(data.printContent, {
          contentType: data.printContent.role,
        });
    }
    if (item.id === 'endItem') {
      value.endItem = data.endItem === 'true' || data.endItem === true ? '是' : '否';
    }

    if (item.id === 'type') {
      const types = data.type && data.type.split(',');
      value.type = types || [];
    }

    if (item.id === 'categoryDisplay') {
      value.categoryDisplay = data.category && data.category.path;
    }

    if (item.id === 'contentRange') {
      value.contentRange = data.contentRangeDisplay;
    }

    if (item.id === 'applicableRepositoryId') {
      value.applicableRepositoryId = data.applicableRepository && data.applicableRepository.name;
    }

    if (item.id === 'specialty') {
      value.specialty = data.specialty;
    }

    if (item.id === 'specialty') {
      value.specialty = data.specialtyDisplay;
    }

    if (item.id === 'contentTopic') {
      value.contentTopic = data.contentTopicDisplay;
    }

    if (item.id === 'fieldOfStudy') {
      value.fieldOfStudy = data.fieldOfStudyDisplay;
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

export default getInfoInitialValues;

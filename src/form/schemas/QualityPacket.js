const blockSnippets = {
  type: 'object',
  'x-component': 'FieldsetLayout',
};

const girdSnippets = {
  'x-component': 'grid',
  'x-component-props': {
    style: {
      margin: '0 auto',
      width: '90%',
    },
  },
};

const schemaSnippetsQualityPacket = {
  CREATE: {
    type: 'object',
    properties: {
      basic: {
        ...blockSnippets,
        key: 'basic',
        name: 'basic',
        'x-component-props': {
          style: {
            marginBottom: 20,
          },
        },
        properties: {
          code_name: {
            ...girdSnippets,
          },
          phaseMark_businessType_: {
            ...girdSnippets,
          },
          repositoryId_modelPurpose: {
            ...girdSnippets,
          },
          sourceOrgId_targetOrgId: {
            ...girdSnippets,
          },
          type_batchCode: {
            ...girdSnippets,
          },
        },
      },
    },
  },
  UPDATE: {},
  DETAIL: {
    type: 'object',
    properties: {
      basic: {
        ...blockSnippets,
        key: 'basic',
        name: 'basic',
        'x-component-props': {
          style: {
            marginBottom: 20,
          },
        },
        properties: {
          code_name: {
            ...girdSnippets,
          },
          phaseMark_businessType_: {
            ...girdSnippets,
          },
          repositoryId_modelPurpose: {
            ...girdSnippets,
          },
          sourceOrgId_targetOrgId: {
            ...girdSnippets,
          },
          type_batchCode: {
            ...girdSnippets,
          },
        },
      },
    },
  },
  RENAME: {},
};

export default schemaSnippetsQualityPacket;

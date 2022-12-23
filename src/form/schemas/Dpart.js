const blockSnippets = {
  type: 'object',
  'x-component': 'FieldsetLayout',
};

const girdSnippets = {
  'x-component': 'grid',
  // 'x-component-props': {
  //   gutter: 20,
  //   style: {
  //     margin: '0 auto',
  //     width: 1000,
  //   },
  // },
};

const schemaSnippetsDpart = {
  CREATE: {
    type: 'object',
    properties: {
      basic: {
        ...blockSnippets,
        key: 'basic',
        name: 'basic',
        'x-component-props': {
          title: '基本信息',
        },
        properties: {
          viewName_productType: {
            ...girdSnippets,
            properties: {
              viewName: {
                'x-component-props': {
                  disabled: true,
                },
              },
            },
          },
          code_name: {
            ...girdSnippets,
          },
          repositoryId_productCode: {
            ...girdSnippets,
          },
          folderId_endItem: {
            ...girdSnippets,
          },
          partCode_: {
            ...girdSnippets,
            'x-component-props': {
              cols: [12, 12],
            },
          },
        },
      },
      business: {
        ...blockSnippets,
        key: 'business',
        name: 'business',
        'x-component-props': {
          title: '业务信息',
        },
        properties: {
          productLevel_productCategory: {
            ...girdSnippets,
          },
          partDegree_responsible: {
            ...girdSnippets,
          },
          secretLevel_confidentialityPeriod: {
            ...girdSnippets,
          },
          defaultUnit_phaseMark: {
            ...girdSnippets,
          },
          purpose_sendTo: {
            ...girdSnippets,
          },
          shareScope_departmentId: {
            ...girdSnippets,
          },
          description_: {
            ...girdSnippets,
            'x-component-props': {
              cols: [12, 12],
            },
          },
        },
      },
      structure: {
        ...blockSnippets,
        key: 'structure',
        name: 'structure',
        'x-component-props': {
          title: '结构件信息',
        },
        visible: false,
        properties: {
          materialCode_materialName: {
            ...girdSnippets,
          },
          materialGrade_gradeStandard: {
            ...girdSnippets,
          },
          materialSpecifications_specifications: {
            ...girdSnippets,
          },
          materialStatus_weight: {
            ...girdSnippets,
          },
        },
      },
      soft: {
        ...blockSnippets,
        key: 'soft',
        name: 'soft',
        'x-component-props': {
          title: '软件属性',
        },
        visible: false,
        properties: {
          softwareType_softwareVersion: {
            ...girdSnippets,
          },
          partDegree_responsible: {
            ...girdSnippets,
          },
          keyLevel_: {
            ...girdSnippets,
            'x-component-props': {
              cols: [12, 12],
            },
          },
        },
      },
    },
  },
  UPDATE: {
    type: 'object',
    properties: {
      basic: {
        ...blockSnippets,
        key: 'basic',
        name: 'basic',
        'x-component-props': {
          title: '基本信息',
        },
        properties: {
          viewName_productType: {
            ...girdSnippets,
            properties: {
              viewName: {
                'x-component-props': {
                  disabled: true,
                },
              },
              productType: {
                'x-component-props': {
                  disabled: true,
                },
              },
            },
          },
          code_name: {
            ...girdSnippets,
          },
          repositoryId_productCode: {
            ...girdSnippets,
          },
          folderId_endItem: {
            ...girdSnippets,
            properties: {
              folderId: {
                'x-component-props': {
                  disabled: true,
                },
              },
            },
          },
          partCode_: {
            ...girdSnippets,
            'x-component-props': {
              cols: [12, 12],
            },
          },
        },
      },
      business: {
        ...blockSnippets,
        key: 'business',
        name: 'business',
        'x-component-props': {
          title: '业务信息',
        },
        properties: {
          productLevel_productCategory: {
            ...girdSnippets,
          },
          partDegree_responsible: {
            ...girdSnippets,
          },
          secretLevel_confidentialityPeriod: {
            ...girdSnippets,
          },
          defaultUnit_phaseMark: {
            ...girdSnippets,
          },
          purpose_sendTo: {
            ...girdSnippets,
          },
          shareScope_departmentId: {
            ...girdSnippets,
          },
          description_: {
            ...girdSnippets,
            'x-component-props': {
              cols: [12, 12],
            },
          },
        },
      },
      structure: {
        ...blockSnippets,
        key: 'structure',
        name: 'structure',
        'x-component-props': {
          title: '结构件信息',
        },
        visible: false,
        properties: {
          materialCode_materialName: {
            ...girdSnippets,
          },
          materialGrade_gradeStandard: {
            ...girdSnippets,
          },
          materialSpecifications_specifications: {
            ...girdSnippets,
          },
          materialStatus_weight: {
            ...girdSnippets,
          },
        },
      },
      soft: {
        ...blockSnippets,
        key: 'soft',
        name: 'soft',
        'x-component-props': {
          title: '软件属性',
        },
        properties: {
          softwareType_softwareVersion: {
            ...girdSnippets,
          },
          partDegree_responsible: {
            ...girdSnippets,
          },
          keyLevel_: {
            ...girdSnippets,
            'x-component-props': {
              cols: [12, 12],
            },
          },
        },
      },
    },
  },
  DETAIL: {
    type: 'object',
    properties: {
      basic: {
        ...blockSnippets,
        key: 'basic',
        name: 'basic',
        'x-component-props': {
          title: '基本信息',
        },
        properties: {
          viewName_productType: {
            ...girdSnippets,
          },
          code_name: {
            ...girdSnippets,
          },
          repositoryId_productCode: {
            ...girdSnippets,
          },
          folderId_endItem: {
            ...girdSnippets,
          },
          partCode_: {
            ...girdSnippets,
            'x-component-props': {
              cols: [12, 12],
            },
          },
        },
      },
      business: {
        ...blockSnippets,
        key: 'business',
        name: 'business',
        'x-component-props': {
          title: '业务信息',
        },
        properties: {
          productLevel_productCategory: {
            ...girdSnippets,
          },
          partDegree_responsible: {
            ...girdSnippets,
          },
          secretLevel_confidentialityPeriod: {
            ...girdSnippets,
          },
          defaultUnit_phaseMark: {
            ...girdSnippets,
          },
          purpose_sendTo: {
            ...girdSnippets,
          },
          shareScope_departmentId: {
            ...girdSnippets,
          },
          description_: {
            ...girdSnippets,
            'x-component-props': {
              cols: [12, 12],
            },
          },
        },
      },
      structure: {
        ...blockSnippets,
        key: 'structure',
        name: 'structure',
        'x-component-props': {
          title: '结构件信息',
        },
        visible: false,
        properties: {
          materialCode_materialName: {
            ...girdSnippets,
          },
          materialGrade_gradeStandard: {
            ...girdSnippets,
          },
          materialSpecifications_specifications: {
            ...girdSnippets,
          },
          materialStatus_weight: {
            ...girdSnippets,
          },
        },
      },
      soft: {
        ...blockSnippets,
        key: 'soft',
        name: 'soft',
        'x-component-props': {
          title: '软件属性',
        },
        properties: {
          softwareType_softwareVersion: {
            ...girdSnippets,
          },
          partDegree_responsible: {
            ...girdSnippets,
          },
          keyLevel_: {
            ...girdSnippets,
            'x-component-props': {
              cols: [12, 12],
            },
          },
        },
      },
    },
  },
  RENAME: {
    type: 'object',
    properties: {
      code_name: {
        ...girdSnippets,
        'x-component-props': {
          cols: [24, 24],
        },
        properties: {
          code: {
            'x-component-props': {
              disabled: true,
            },
          },
          name: {
            key: 'name',
          },
        },
      },
    },
  },
};

export default schemaSnippetsDpart;

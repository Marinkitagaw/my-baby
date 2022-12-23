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
      business: {
        ...blockSnippets,
        key: 'business',
        name: 'business',
        'x-component-props': {
          title: '设计信息',
        },
        properties: {
          deratingParameters_rating: {
            ...girdSnippets,
          },
          deratingLevel_deratingFactor: {
            ...girdSnippets,
          },
          annualProductionMagnitude_flightTestHistory: {
            ...girdSnippets,
          },
          singleMachineConsumption_productionBatch: {
            ...girdSnippets,
          },
          partDegree_newDevice: {
            ...girdSnippets,
          },
          anyQualityProblem_newComponents: {
            ...girdSnippets,
          },
          yesNo_componentsRestricted: {
            ...girdSnippets,
          },
          approvalOutsideCatalog_completeDPA: {
            ...girdSnippets,
          },
          completeSecondSieve_screeningUnit: {
            ...girdSnippets,
          },
          utilityValue_remarks: {
            ...girdSnippets,
          },
        },
      },
      review: {
        ...blockSnippets,
        key: 'review',
        name: 'review',
        'x-component-props': {
          title: '评审结论',
        },
        properties: {
          reviewConclusion_: {
            ...girdSnippets,
            'x-component-props': {
              cols: [12, 12],
            },
            properties: {
              reviewConclusion: {
                'x-component-props': {
                  allowClear: true,
                },
              },
            },
          },
        },
      },
    },
  },
  UPDATE: {
    type: 'object',
    properties: {
      business: {
        ...blockSnippets,
        key: 'business',
        name: 'business',
        'x-component-props': {
          title: '设计信息',
        },
        properties: {
          deratingParameters_deratingLevel: {
            ...girdSnippets,
          },
          rating_deratingFactor: {
            ...girdSnippets,
          },
          utilityValue_annualProductionMagnitude: {
            ...girdSnippets,
          },
          flightTestHistory_singleMachineConsumption: {
            ...girdSnippets,
          },
          productionBatch_screeningUnit: {
            ...girdSnippets,
          },
          newDevice_partDegree: {
            ...girdSnippets,
          },
          componentsRestricted_approvalOutsideCatalog: {
            ...girdSnippets,
          },
          completeDpa_completeSecondSieve: {
            ...girdSnippets,
          },
          newComponents_anyQualityProblem: {
            ...girdSnippets,
          },
          yesNo_: {
            ...girdSnippets,
            visible: false,
          },
        },
      },
      review: {
        ...blockSnippets,
        key: 'review',
        name: 'review',
        'x-component-props': {
          title: '评审结论',
        },
        properties: {
          reviewConclusion_: {
            ...girdSnippets,
            'x-component-props': {
              cols: [12, 12],
            },
            properties: {
              reviewConclusion: {
                'x-component-props': {
                  allowClear: true,
                },
              },
            },
          },
          dealMethod_: {
            ...girdSnippets,
            'x-component-props': {
              cols: [20, 12],
              style: {
                marginLeft: '-18%',
              },
            },
          },
        },
      },
      descriptionBolck: {
        ...blockSnippets,
        key: 'descriptionBolck',
        name: 'descriptionBolck',
        'x-component-props': {
          title: '',
        },
        properties: {
          remarks_: {
            ...girdSnippets,
            'x-component-props': {
              cols: [20, 12],
              style: {
                marginLeft: '-18%',
              },
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

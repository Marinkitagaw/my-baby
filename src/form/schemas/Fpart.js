const blockSnippets = {
  type: 'object',
  'x-component': 'FieldsetLayout',
};

const girdSnippets = {
  'x-component': 'grid',
};

const schemaSnippetsFpart = {
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
          // designPartId_: {
          //   ...girdSnippets,
          // },
          // batch_experimentBatch: {
          //   ...girdSnippets,
          // },
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
          // designPartId_: {
          //   ...girdSnippets,
          //   designPartId: {
          //     'x-component-props': {
          //       disabled: true,
          //     },
          //   },
          // },
          // batch_experimentBatch: {
          //   ...girdSnippets,
          //   batch: {
          //     'x-component-props': {
          //       disabled: true,
          //     },
          //   },
          //   experimentBatch: {
          //     'x-component-props': {
          //       disabled: true,
          //     },
          //   },
          // },
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
            properties: {
              code: {
                'x-component-props': {
                  disabled: true,
                },
              },
              name: {
                'x-component-props': {
                  disabled: true,
                },
              },
            },
          },
          repositoryId_productCode: {
            ...girdSnippets,
          },
          partCode_endItem: {
            ...girdSnippets,
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
            properties: {
              responsible: {
                'x-component-props': {
                  disabled: true,
                },
              },
            },
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
            properties: {
              departmentId: {
                'x-component-props': {
                  disabled: true,
                },
              },
            },
          },
          description_: {
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
          batch_experimentBatch: {
            ...girdSnippets,
          },
          viewName_productType: {
            ...girdSnippets,
          },
          code_name: {
            ...girdSnippets,
          },
          repositoryId_productCode: {
            ...girdSnippets,
          },
          partCode_endItem: {
            ...girdSnippets,
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
      system: {
        ...blockSnippets,
        key: 'system',
        name: 'system',
        'x-component-props': {
          title: '系统信息',
        },
        properties: {
          lifecycleTempalteId_stateId: {
            ...girdSnippets,
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

export default schemaSnippetsFpart;

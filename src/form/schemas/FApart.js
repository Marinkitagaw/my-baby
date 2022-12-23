const blockSnippets = {
  type: 'object',
  'x-component': 'FieldsetLayout',
};

const girdSnippets = {
  'x-component': 'grid',
};

const schemaSnippetsFApart = {
  CREATE: {
    type: 'object',
    properties: {
      block_$1: {
        ...blockSnippets,
        key: 'block_$1',
        name: 'block_$1',
        'x-component-props': {
          title: '基本信息',
        },
        properties: {
          designPartId_: {
            ...girdSnippets,
            'x-component-props': {
              cols: [12, 12],
            },
          },
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
          batch_experimentBatch: {
            ...girdSnippets,
          },
          partCode_endItem: {
            ...girdSnippets,
          },
        },
      },
      block_$2: {
        ...blockSnippets,
        key: 'block_$2',
        name: 'block_$2',
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
      product: {
        ...blockSnippets,
        key: 'product',
        name: 'product',
        'x-component-props': {
          title: '产品信息',
        },
        properties: {
          productionUnit_dueTime: {
            ...girdSnippets,
          },
          installationLocation_expirationDate: {
            ...girdSnippets,
          },
          deliveryUnit_restrictions: {
            ...girdSnippets,
          },
        },
      },
    },
  },
  UPDATE: {
    type: 'object',
    properties: {
      block_$1: {
        ...blockSnippets,
        key: 'block_$1',
        name: 'block_$1',
        'x-component-props': {
          title: '基本信息',
        },
        properties: {
          // designPartId_: {
          //   ...girdSnippets,
          //   'x-component-props': {
          //     cols: [12, 12],
          //     disabled: true,
          //   },
          // },
          viewName_productType: {
            ...girdSnippets,
          },
          code_name: {
            ...girdSnippets,
          },
          repositoryId_productCode: {
            ...girdSnippets,
            properties: {
              repositoryId: {
                'x-component-props': {
                  disabled: true,
                },
              },
            },
          },
          batch_experimentBatch: {
            ...girdSnippets,
            properties: {
              batch: {
                'x-component-props': {
                  disabled: true,
                },
              },
              experimentBatch: {
                'x-component-props': {
                  disabled: true,
                },
              },
            },
          },
          partCode_endItem: {
            ...girdSnippets,
          },
        },
      },
      block_$2: {
        ...blockSnippets,
        key: 'block_$2',
        name: 'block_$2',
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
      product: {
        ...blockSnippets,
        key: 'product',
        name: 'product',
        'x-component-props': {
          title: '产品信息',
        },
        properties: {
          productionUnit_dueTime: {
            ...girdSnippets,
          },
          installationLocation_expirationDate: {
            ...girdSnippets,
          },
          deliveryUnit_restrictions: {
            ...girdSnippets,
          },
        },
      },
    },
  },
  DETAIL: {
    type: 'object',
    properties: {
      block_$1: {
        ...blockSnippets,
        key: 'block_$1',
        name: 'block_$1',
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
          partCode_endItem: {
            ...girdSnippets,
          },
        },
      },
      block_$2: {
        ...blockSnippets,
        key: 'block_$2',
        name: 'block_$2',
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
          description: {
            ...girdSnippets,
            'x-component-props': {
              cols: [12, 12],
            },
          },
        },
      },
      product: {
        ...blockSnippets,
        key: 'product',
        name: 'product',
        'x-component-props': {
          title: '产品信息',
        },
        properties: {
          productionUnit_dueTime: {
            ...girdSnippets,
          },
          installationLocation_expirationDate: {
            ...girdSnippets,
          },
          deliveryUnit_restrictions: {
            ...girdSnippets,
          },
        },
      },
      block_$3: {
        ...blockSnippets,
        key: 'block_$3',
        name: 'block_$3',
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

export default schemaSnippetsFApart;

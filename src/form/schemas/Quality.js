const blockSnippets = {
  type: 'object',
  'x-component': 'FieldsetLayout',
};

const girdSnippets = {
  'x-component': 'grid',
};

const schemaSnippetsQuality = {
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
          departmentId_repositoryId: {
            ...girdSnippets,
          },
          productName_code: {
            ...girdSnippets,
            properties: {
              code: {
                'x-component-props': {
                  disabled: true,
                  placeholder: '系统自动生成',
                },
              },
            },
          },
          name_: {
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
          title: '业务属性',
        },
        properties: {
          secretLevel_confidentialityPeriod: {
            ...girdSnippets,
          },
          responsible_phaseMark: {
            ...girdSnippets,
          },
        },
      },
      contents: {
        ...blockSnippets,
        key: 'contents',
        name: 'contents',
        'x-component-props': {
          title: '内容文件',
        },
        properties: {
          secondaryContents_: {
            ...girdSnippets,
            'x-component-props': {
              style: {
                marginLeft: '-2.5%',
              },
            },
            properties: {
              secondaryContents: {
                'x-props': {
                  labelCol: 3,
                  wrapperCol: 18,
                },
                'x-component-props': {
                  contentRole: 'SECONDARY',
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
      basic: {
        ...blockSnippets,
        key: 'basic',
        name: 'basic',
        'x-component-props': {
          title: '基本信息',
        },
        properties: {
          departmentId_repositoryId: {
            ...girdSnippets,
            properties: {
              repositoryId: {
                'x-component-props': {
                  disabled: true,
                },
              },
            },
          },
          categoryDisplay_productCode: {
            ...girdSnippets,
            properties: {
              categoryDisplay: {
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
          description_folderId: {
            ...girdSnippets,
            properties: {
              description: {
                maxLength: 500,
              },
            },
          },
        },
      },
      business: {
        ...blockSnippets,
        key: 'business',
        name: 'business',
        'x-component-props': {
          title: '基本信息',
        },
        properties: {
          secretLevel_confidentialityPeriod: {
            ...girdSnippets,
          },
          responsible_phaseMark: {
            ...girdSnippets,
          },
        },
      },
      contents: {
        ...blockSnippets,
        key: 'contents',
        name: 'contents',
        'x-component-props': {
          title: '内容文件',
        },
        properties: {
          primaryContent_: {
            ...girdSnippets,
            'x-component-props': {
              style: {
                marginLeft: '-2.5%',
              },
            },
            properties: {
              primaryContent: {
                'x-props': {
                  labelCol: 3,
                  wrapperCol: 18,
                },
                'x-component-props': {
                  contentRole: 'PRIMARY',
                  accept: '.pdf',
                },
              },
            },
          },
          secondaryContents_: {
            ...girdSnippets,
            'x-component-props': {
              style: {
                marginLeft: '-2.5%',
              },
            },
            properties: {
              secondaryContents: {
                'x-props': {
                  labelCol: 3,
                  wrapperCol: 18,
                },
                'x-component-props': {
                  contentRole: 'SECONDARY',
                },
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
          code_name_categoryIds: {
            ...girdSnippets,
          },
          repositoryId_productCode_modelCode: {
            ...girdSnippets,
          },
          departmentId_description: {
            ...girdSnippets,
            'x-component-props': {
              cols: [8, 8],
            },
          },
        },
      },
      business: {
        ...blockSnippets,
        key: 'system',
        name: 'system',
        'x-component-props': {
          title: '业务信息',
        },
        properties: {
          secretLevel_confidentialityPeriod_phaseMark: {
            ...girdSnippets,
          },
          responsible_: {
            ...girdSnippets,
            'x-component-props': {
              cols: [8, 8],
            },
          },
        },
      },
      contents: {
        ...blockSnippets,
        key: 'contents',
        name: 'contents',
        full: true,
        'x-component-props': {
          title: '内容文件',
        },
        properties: {
          primaryContent_printContent: {
            ...girdSnippets,
            'x-component-props': {
              style: {
                marginLeft: '2%',
              },
            },
            properties: {
              primaryContent: {
                key: 'primaryContent',
                name: 'primaryContent',
                'x-component': 'primaryContent',
                'x-component-props': {
                  disabled: true,
                  preview: true,
                  contentRole: 'PRIMARY',
                },
                'x-props': {
                  labelCol: 3,
                  wrapperCol: 20,
                },
              },
              printContent: {
                key: 'printContent',
                name: 'printContent',
                'x-component': 'printContent',
                'x-component-props': {
                  disabled: true,
                  preview: true,
                  contentRole: 'PRINT',
                },
                'x-props': {
                  labelCol: 3,
                  wrapperCol: 20,
                },
              },
            },
          },
          secondaryContents_: {
            ...girdSnippets,
            'x-component-props': {
              style: {
                marginLeft: '-0.1%',
              },
            },
            properties: {
              secondaryContents: {
                key: 'secondaryContents',
                name: 'secondaryContents',
                'x-component': 'secondaryContents',
                'x-component-props': {
                  disabled: true,
                  preview: true,
                  contentRole: 'SECONDARY',
                },
                'x-props': {
                  labelCol: 2,
                  wrapperCol: 20,
                },
              },
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
          lifecycleTempalteId_stateId_folderId: {
            ...girdSnippets,
            properties: {
              stateId: {
                key: 'secondaryContents',
                name: 'secondaryContents',
                'x-props': {
                  labelCol: 8,
                },
              },
            },
          },
        },
      },
      review: {
        ...blockSnippets,
        key: 'review',
        name: 'review',
        'x-component-props': {
          title: '流程签审记录',
        },
        properties: {
          reviewRecords_: {
            ...girdSnippets,
            'x-component-props': {
              style: {
                marginLeft: '-0.1%',
              },
            },
            properties: {
              reviewRecords: {
                key: 'reviewRecords',
                name: 'reviewRecords',
                'x-component': 'reviewRecords',
                'x-props': {
                  labelCol: 2,
                  wrapperCol: 20,
                },
              },
            },
          },
        },
      },
    },
  },
};

export default schemaSnippetsQuality;

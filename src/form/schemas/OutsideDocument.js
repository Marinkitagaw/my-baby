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

const schemaSnippetsDocument = {
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
          code_name: {
            ...girdSnippets,
          },
          categoryIds_repositoryId: {
            ...girdSnippets,
          },
          productCode_folderId: {
            ...girdSnippets,
          },
          secretLevel_confidentialityPeriod: {
            ...girdSnippets,
          },
          phaseMark_purpose: {
            ...girdSnippets,
          },
          departmentId_sendTo: {
            ...girdSnippets,
          },
          primaryContent_: {
            ...girdSnippets,
            properties: {
              primaryContent: {
                'x-props': {
                  labelCol: 3,
                  wrapperCol: 18,
                },
              },
            },
          },
          secondaryContents_: {
            ...girdSnippets,
            properties: {
              secondaryContents: {
                'x-props': {
                  labelCol: 3,
                  wrapperCol: 18,
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
          categoryDisplay_repositoryId: {
            ...girdSnippets,
            properties: {
              categoryDisplay: {
                'x-component-props': {
                  disabled: true,
                },
              },
              repositoryId: {
                'x-component-props': {
                  disabled: true,
                },
              },
            },
          },
          productCode_folderId: {
            ...girdSnippets,
            properties: {
              folderId: {
                'x-component-props': {
                  disabled: true,
                },
              },
            },
          },
          secretLevel_confidentialityPeriod: {
            ...girdSnippets,
          },
          phaseMark_purpose: {
            ...girdSnippets,
          },
          departmentId_sendTo: {
            ...girdSnippets,
            'x-component-props': {
              cols: [12, 12],
            },
          },
          primaryContent_: {
            ...girdSnippets,
            properties: {
              primaryContent: {
                'x-props': {
                  labelCol: 3,
                  wrapperCol: 18,
                },
              },
            },
          },
          secondaryContents_: {
            ...girdSnippets,
            properties: {
              secondaryContents: {
                'x-props': {
                  labelCol: 3,
                  wrapperCol: 18,
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
          code_name: {
            ...girdSnippets,
          },
          categoryIds_phaseMark: {
            ...girdSnippets,
          },
          repositoryId_productCode: {
            ...girdSnippets,
          },
          folderId_purpose: {
            ...girdSnippets,
          },
          secretLevel_confidentialityPeriod: {
            ...girdSnippets,
          },
          sendTo_departmentId: {
            ...girdSnippets,
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
          responsible_purpose: {
            ...girdSnippets,
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
      contents: {
        ...blockSnippets,
        key: 'contents',
        name: 'contents',
        full: true,
        'x-component-props': {
          title: '',
        },
        properties: {
          primaryContent_: {
            ...girdSnippets,
            properties: {
              primaryContent: {
                key: 'primaryContent',
                name: 'primaryContent',
                'x-component': 'primaryContent',
                'x-component-props': {
                  disabled: true,
                  preview: true,
                },
                'x-props': {
                  labelCol: 2,
                  wrapperCol: 20,
                },
              },
            },
          },
          secondaryContents_: {
            ...girdSnippets,
            properties: {
              secondaryContents: {
                key: 'secondaryContents',
                name: 'secondaryContents',
                'x-component': 'secondaryContents',
                'x-component-props': {
                  disabled: true,
                  preview: true,
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

export default schemaSnippetsDocument;

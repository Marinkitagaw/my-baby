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
      primaryContents: {
        ...blockSnippets,
        key: 'primaryContents',
        name: 'primaryContents',
        'x-component-props': {
          title: '主要内容',
        },
        properties: {
          primaryContent_: {
            ...girdSnippets,
            'x-component-props': {
              style: {
                marginLeft: '-5%',
              },
            },
            properties: {
              primaryContent: {
                'x-props': {
                  labelCol: 3,
                  wrapperCol: 10,
                },
                'x-component-props': {
                  contentRole: 'PRIMARY',
                },
              },
            },
          },
        },
      },
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
                  extraQuery: {
                    type: 'Project',
                  },
                },
              },
            },
          },
          categoryIds_productCode: {
            ...girdSnippets,
          },
          code_name: {
            ...girdSnippets,
          },
          applicableRepositoryId_folderId: {
            ...girdSnippets,
          },
          description_: {
            ...girdSnippets,
            'x-component-props': {
              cols: [12, 12],
            },
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
          title: '业务属性',
        },
        properties: {
          secretLevel_confidentialityPeriod: {
            ...girdSnippets,
          },
          responsible_phaseMark: {
            ...girdSnippets,
          },
          contentRange_specialty: {
            ...girdSnippets,
            properties: {
              contentRange: {
                'x-component-props': {
                  code: 'ContentRange',
                },
              },
              specialty: {
                'x-component-props': {
                  code: 'Specialty',
                },
              },
            },
          },
          contentTopic_fieldOfStudy: {
            ...girdSnippets,
            properties: {
              contentTopic: {
                'x-component-props': {
                  code: 'ContentTopict',
                },
              },
              fieldOfStudy: {
                'x-component-props': {
                  code: 'FieldOfStudy',
                },
              },
            },
          },
        },
      },
      contents: {
        ...blockSnippets,
        key: 'contents',
        name: 'contents',
        'x-component-props': {
          title: '上传附件',
        },
        properties: {
          secondaryContents_: {
            ...girdSnippets,
            'x-component-props': {
              style: {
                marginLeft: '-5%',
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
      primaryContents: {
        ...blockSnippets,
        key: 'primaryContents',
        name: 'primaryContents',
        'x-component-props': {
          title: '主要内容',
        },
        properties: {
          primaryContent_: {
            ...girdSnippets,
            'x-component-props': {
              style: {
                marginLeft: '-5%',
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
                },
              },
            },
          },
        },
      },
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
          applicableRepositoryId_folderId: {
            ...girdSnippets,
          },
          description_: {
            ...girdSnippets,
            'x-component-props': {
              cols: [12, 12],
            },
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
          contentRange_specialty: {
            ...girdSnippets,
            properties: {
              contentRange: {
                'x-component-props': {
                  code: 'ContentRange',
                },
              },
              specialty: {
                'x-component-props': {
                  code: 'Specialty',
                },
              },
            },
          },
          contentTopic_fieldOfStudy: {
            ...girdSnippets,
            properties: {
              contentTopic: {
                'x-component-props': {
                  code: 'ContentTopict',
                },
              },
              fieldOfStudy: {
                'x-component-props': {
                  code: 'FieldOfStudy',
                },
              },
            },
          },
        },
      },
      contents: {
        ...blockSnippets,
        key: 'contents',
        name: 'contents',
        'x-component-props': {
          title: '上传附件',
        },
        properties: {
          secondaryContents_: {
            ...girdSnippets,
            'x-component-props': {
              style: {
                marginLeft: '-5%',
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

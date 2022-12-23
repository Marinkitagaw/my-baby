import React from 'react';

const blockSnippets = {
  type: 'object',
  'x-component': 'FieldsetLayout',
};

const girdSnippets = {
  'x-component': 'grid',
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
          departmentId_repositoryId: {
            ...girdSnippets,
          },
          categoryIds_productCode: {
            ...girdSnippets,
          },
          code_name: {
            ...girdSnippets,
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
          title: '业务信息',
        },
        properties: {
          secretLevel_confidentialityPeriod: {
            ...girdSnippets,
          },
          purpose_phaseMark: {
            ...girdSnippets,
          },
        },
      },
      lists: {
        ...blockSnippets,
        key: 'lists',
        name: 'lists',
        'x-component-props': {
          title: '清单列表',
        },
        properties: {
          documentItems_: {
            ...girdSnippets,
            'x-component-props': {
              style: {
                marginLeft: '-2.5%',
              },
            },
            properties: {
              documentItems: {
                'x-component-props': {
                  size: 'small',
                  renderMoveDown: () => null,
                  renderMoveUp: () => null,
                  renderAddition: () => (
                    <a style={{ display: 'inline-block', padding: 8 }}>+ 添加</a>
                  ),
                  operationsWidth: 40,
                },
                'x-props': {
                  labelCol: 3,
                  wrapperCol: 19,
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
          title: '业务信息',
        },
        properties: {
          secretLevel_confidentialityPeriod: {
            ...girdSnippets,
          },
          purpose_phaseMark: {
            ...girdSnippets,
          },
        },
      },
      lists: {
        ...blockSnippets,
        key: 'lists',
        name: 'lists',
        'x-component-props': {
          title: '清单列表',
        },
        properties: {
          documentItems_: {
            ...girdSnippets,
            'x-component-props': {
              style: {
                marginLeft: '-2.5%',
              },
            },
            properties: {
              documentItems: {
                'x-component-props': {
                  size: 'small',
                  renderMoveDown: () => null,
                  renderMoveUp: () => null,
                  renderAddition: () => (
                    <a style={{ display: 'inline-block', padding: 8 }}>+ 添加</a>
                  ),
                  operationsWidth: 40,
                },
                'x-props': {
                  labelCol: 3,
                  wrapperCol: 19,
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
          responsible_purpose_phaseMark: {
            ...girdSnippets,
          },
          secretLevel_confidentialityPeriod: {
            ...girdSnippets,
            'x-component-props': {
              cols: [8, 10],
            },
          },
        },
      },
      list: {
        ...blockSnippets,
        key: 'list',
        name: 'list',
        'x-component-props': {
          title: '清单列表',
        },
        properties: {
          documentItems_: {
            ...girdSnippets,
            'x-component-props': {
              style: {
                marginLeft: '-1.5%',
              },
            },
            properties: {
              documentItems: {
                'x-component': 'arraytable',
                'x-component-props': {
                  size: 'small',
                  rowkey: record => record.id,
                  renderMoveDown: () => null,
                  renderMoveUp: () => null,
                  renderAddition: () => null,
                  renderRemove: () => null,
                  operationsWidth: 40,
                },
                'x-props': {
                  labelCol: 2,
                  wrapperCol: 18,
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

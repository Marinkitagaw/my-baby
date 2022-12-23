const blockSnippets = {
  type: 'object',
  'x-component': 'FieldsetLayout',
};

const girdSnippets = {
  'x-component': 'grid',
  // 'x-component-props': {
  //   style: {
  //     margin: '0 auto',
  //     width: '92%',
  //   },
  // },
};
const Snippets = {
  'x-component': 'grid',
};

const schemaSnippetsTechnicalNotice = {
  CREATE: {
    type: 'object',
    properties: {
      basic: {
        ...blockSnippets,
        key: 'basic',
        name: 'basic',
        'x-component-props': {
          title: '基本信息',
          style: {
            marginBottom: 20,
          },
        },
        properties: {
          repositoryId_productCode_: {
            ...Snippets,
          },
          sendTo_departmentId_: {
            ...Snippets,
          },
          techCode_name: {
            ...Snippets,
            // properties: {
            //   code: {
            //     'x-component-props': {
            //       disabled: true,
            //     },
            //   },
            // },
          },
          deviationReason_technicalNoticeCode_: {
            ...Snippets,
          },
          phaseMark_techSecretLevel_: {
            ...Snippets,
          },
          secretLevel_confidentialityPeriod_: {
            ...Snippets,
          },
          validDate_subSystemType_: {
            ...Snippets,
          },
          responsible_purpose_: {
            ...Snippets,
          },
        },
      },
      partCode1: {
        ...blockSnippets,
        key: 'partCode1',
        name: 'partCode1',
        'x-component-props': {
          title: '关联部件',
        },
        properties: {
          partCode_: {
            ...girdSnippets,
            'x-component-props': {
              style: {
                marginLeft: '-5%',
              },
            },
            properties: {
              partCode: {
                'x-props': {
                  labelCol: 3,
                  wrapperCol: 18,
                },
              },
            },
          },
        },
      },
      relationDoc1: {
        ...blockSnippets,
        key: 'relationDoc1',
        name: 'relationDoc1',
        'x-component-props': {
          title: '关联文档',
        },
        properties: {
          relationDoc_: {
            ...girdSnippets,
            'x-component-props': {
              style: {
                marginLeft: '-5%',
              },
            },
            properties: {
              relationDoc: {
                'x-props': {
                  labelCol: 3,
                  wrapperCol: 18,
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
      content11: {
        ...blockSnippets,
        key: 'content11',
        name: 'content11',
        'x-component-props': {
          title: '通知内容',
        },
        properties: {
          content_: {
            ...girdSnippets,
            'x-component-props': {
              style: {
                marginLeft: '-5%',
              },
            },
            properties: {
              content: {
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
          style: {
            marginBottom: 20,
          },
        },
        properties: {
          repositoryId_productCode_: {
            ...Snippets,
          },
          sendTo_departmentId_: {
            ...Snippets,
          },
          techCode_name: {
            ...Snippets,
          },
          deviationReason_technicalNoticeCode_: {
            ...Snippets,
          },
          phaseMark_techSecretLevel_: {
            ...Snippets,
          },
          secretLevel_confidentialityPeriod_: {
            ...Snippets,
          },
          validDate_subSystemType_: {
            ...Snippets,
          },
          responsible_purpose_: {
            ...Snippets,
          },
        },
      },
      partCode1: {
        ...blockSnippets,
        key: 'partCode1',
        name: 'partCode1',
        'x-component-props': {
          title: '关联部件',
        },
        properties: {
          partCode_: {
            ...girdSnippets,
            'x-component-props': {
              style: {
                marginLeft: '-5%',
              },
            },
            properties: {
              partCode: {
                'x-props': {
                  labelCol: 3,
                  wrapperCol: 18,
                },
              },
            },
          },
        },
      },
      relationDoc1: {
        ...blockSnippets,
        key: 'relationDoc1',
        name: 'relationDoc1',
        'x-component-props': {
          title: '关联文档',
        },
        properties: {
          relationDoc_: {
            ...girdSnippets,
            'x-component-props': {
              style: {
                marginLeft: '-5%',
              },
            },
            properties: {
              relationDoc: {
                'x-props': {
                  labelCol: 3,
                  wrapperCol: 18,
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
      content11: {
        ...blockSnippets,
        key: 'content11',
        name: 'content11',
        'x-component-props': {
          title: '通知内容',
        },
        properties: {
          content_: {
            ...girdSnippets,
            'x-component-props': {
              style: {
                marginLeft: '-5%',
              },
            },
            properties: {
              content: {
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
          style: {
            marginBottom: 20,
          },
        },
        properties: {
          repositoryId_: {
            ...girdSnippets,
          },
          productCode_: {
            ...girdSnippets,
          },
          sendTo_departmentId_: {
            ...Snippets,
          },
          code_name_: {
            ...Snippets,
            properties: {
              code: {
                'x-component-props': {
                  disabled: true,
                },
              },
            },
          },
          deviationReason_technicalNoticeCode_: {
            ...Snippets,
          },
          phaseMark_techSecretLevel_: {
            ...Snippets,
          },
          secretLevel_confidentialityPeriod_: {
            ...Snippets,
          },
          validDate_subSystemType_: {
            ...Snippets,
          },
          purpose_: {
            ...girdSnippets,
          },
          partCode_: {
            ...girdSnippets,
          },
          relationDoc_: {
            ...girdSnippets,
          },
          secondaryContents_: {
            ...girdSnippets,
          },
          content_: {
            ...girdSnippets,
          },
        },
      },
    },
  },
  RENAME: {},
};

export default schemaSnippetsTechnicalNotice;

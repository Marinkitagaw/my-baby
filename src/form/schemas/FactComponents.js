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
  UPDATE: {
    type: 'object',
    properties: {
      business: {
        ...blockSnippets,
        key: 'business',
        name: 'business',
        'x-component-props': {
          title: '生产信息',
        },
        properties: {
          completeDpa_completeSecondSieve: {
            ...girdSnippets,
          },
          screeningUnit_: {
            ...girdSnippets,
            'x-component-props': {
              cols: [12, 12],
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
};

export default schemaSnippetsDpart;

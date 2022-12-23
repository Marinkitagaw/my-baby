const blockSnippets = {
  type: 'object',
  'x-component': 'FieldsetLayout',
};

const girdSnippets = {
  'x-component': 'grid',
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
          singleMachineConsumption_anyQualityProblem: {
            ...girdSnippets,
          },
          newDevice_partDegree: {
            ...girdSnippets,
          },
          componentsRestricted_approvalOutsideCatalog: {
            ...girdSnippets,
          },
          newComponents_: {
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
};

export default schemaSnippetsDpart;

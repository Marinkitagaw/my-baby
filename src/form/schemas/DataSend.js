const schemaSnippetsDocument = {
  LIST: {
    type: 'object',
    'x-component': 'mega-layout',
    'x-component-props': {
      grid: true,
      full: true,
      columns: 10,
    },
    properties: {
      swf1: {
        key: 'swf1',
        name: 'swf1',
        title: '标题1',
        'x-component': 'datepicker',
      },
    },
  },
};

export default schemaSnippetsDocument;

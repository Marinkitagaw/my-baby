const CONTEXT_PATH = '/plm';
export default {
  define: {
    'process.env.CONTEXT_PATH': CONTEXT_PATH,
    'process.env.BASE_PATH': CONTEXT_PATH,
    'process.env.API_BASE_PATH': CONTEXT_PATH + '/api/v2',
    'process.env.TASK_PATH': '',
    'process.env.HOST': '',
  },
  base: '/plm/app/tool-management/',
  publicPath: '/plm/static/tool-management/',
  outputPath: 'dist/tool-management',
  targets: {
    firefox: 47,
    chrome: false,
    ie: false,
    safari: false,
    edge: false,
    ios: false,
  },
};

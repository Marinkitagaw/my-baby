import { defineConfig } from 'umi';
const HOST = process.argv[3] || '192.168.10.219';
const CONTEXT_PATH = '/plm';

const TestHost = '192.168.10.38:19901';

export default defineConfig({
  define: {
    'process.env.HOST': `http://${HOST}`,
    'process.env.CONTEXT_PATH': CONTEXT_PATH,
    'process.env.BASE_PATH': `http://${HOST}${CONTEXT_PATH}`,
    'process.env.TASK_PATH': `http://${HOST}`,
    'process.env.API_BASE_PATH': CONTEXT_PATH + '/api/v2',
    'process.env.AUTHORIZATION_REQUIRED': true,
  },
  plugins: ['react-dev-inspector/plugins/umi/react-inspector'],
  inspectorConfig: {
    exclude: [],
    babelPlugins: [],
    babelOptions: {},
  },
  devtool: 'eval',
  proxy: {
    // '/plm/api/v2/siyuan/': {
    //   target: 'http://192.168.10.219:19487',
    //   changeOrigin: true,
    //   pathRewrite: { '^/plm/api/v2/siyuan/': '' },
    // },
    '/plm/api': {
      target: `http://${HOST}/`,
      changeOrigin: true,
    },
  },
  nodeModulesTransform: {
    type: 'none',
  },
});

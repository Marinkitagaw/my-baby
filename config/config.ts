import { defineConfig } from 'umi';
import settings from './settings';
import proxy from './proxy';
import routes from './routes';
import theme from './theme.json';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  // hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  layout: {
    locale: true,
    siderWidth: 208,
    ...settings,
  },
  base: `/plm/app/${settings.appname}`,
  locale: {
    default: 'zh-CN',
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@cpdm/layout/lib/PageLoading/index',
  },
  targets: {
    ie: 11,
    firefox: 52,
  },
  routes,
  theme,
  esbuild: {},
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  fastRefresh: {},
  nodeModulesTransform: { type: 'none' },
  // mfsu: {},
  //webpack5: {},
  exportStatic: {},
});

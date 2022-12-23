import { Settings as LayoutSettings } from '@ant-design/pro-components';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
  banner: string;
  appname: string;
  menuRoot: string;
} = {
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  menu: {
    locale: false,
  },
  pwa: false,
  navTheme: 'light',
  layout: 'mix',
  contentWidth: 'Fluid',
  iconfontUrl: '',
  title: '数字化工具集管理系统',
  banner:
    'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F016acb57a1a06d0000012e7e2e2fdf.jpg%403000w_1l_0o_100sh.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1636701413&t=ed71ef44deaa0dbeafec49b08e16b329',
  appname: 'tool-management',
  menuRoot: 'app_tool-management',
};

export default Settings;

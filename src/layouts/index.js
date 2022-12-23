import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import React, { useState } from 'react';
import { withRouter } from 'umi';
import { Switch, Header, Layout, Content, Sider, Footer, Menu } from 'antd';
import layouts from './layouts.less';
// import routerConfig from '../../config/router.config.js';

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem('总览', '1', <DesktopOutlined />),
  getItem('我的任务', 'sub1', <UserOutlined />, [
    getItem('代办任务', '2'),
    getItem('已办任务', '3'),
  ]),
  getItem('工具集菜单', '4', <FileOutlined />),
];

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
        <div className="logo" />
        <Menu theme="white" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        />
      </Layout>
    </Layout>
  );
};

export default App;

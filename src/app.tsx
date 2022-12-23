import type { MenuDataItem } from '@ant-design/pro-components';
import PageLoading from '@cpdm/layout/lib/PageLoading/index';
import type { RunTimeLayoutConfig } from 'umi';
import { history, request } from 'umi';
import { Space } from 'antd';
import settings from '../config/settings';
import IconMapping from '../config/icon-map';
import { HeaderNaviLayout, HeartBeat, LayoutProvider, useCurrentUser, useMenu } from '@cpdm/layout';
import React, { ReactChild, ReactFragment, ReactPortal } from 'react';
import imgs from './pages/Img/imgs';

const loginPath = '/user/login';

const {
  DefaultHeaderContainer,
  DefaultHeaderLogo,
  DefaultHeaderProfile,
  DefaultHeaderSearch,
  DefaultHeaderTitle,
  DefaultHeaderHorizontalNavi,
} = HeaderNaviLayout.Components;

async function getMenu() {
  const res = await request<MenuDataItem[]>(`${process.env.HOST}/plm/api/v2/iam/users/all/menu-access?identifier=${settings.menuRoot}`, { headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` } });
  if (Array.isArray(res)) {
    return transform(res);
  }
  return [];
}

function transform(menu: any[]): any[] {
  return menu.map(item => ({
    key: item.id,
    icon: IconMapping[item.icon],
    children: item.children && item.children.length ? transform(item.children) : undefined,
    path: item.path,
    name: item.name,
  }));
}

export const initialStateConfig = {
  loading: <PageLoading />,
};

export async function getInitialState(): Promise<{
  settings?: { title?: string | false; banner?: string; appname?: string };
  me?: { id: string; username: string; fullName: string };
}> {
  return {
    settings: { title: settings.title, banner: settings.banner, appname: settings.appname },
  };
}

function UserInfo() {
  const [user]: any = useCurrentUser();
  return (
    <>
      <DefaultHeaderContainer
      //style={{ minWidth: 220 }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Space>
            {/* <div style={{ height: 30, overflow: 'hidden', background: "red" }}>
            <DefaultHeaderSearch
              onSearch={keyword => {
                window.location.href = `/plm/app/workbench/search?keyword=${keyword || ''}`;
              }}
            />
          </div> */}

            <DefaultHeaderProfile
              user={user || { name: '未认证用户', username: '' }}
              from="main"
              sc
              profile={{ logout: true }}
            />
          </Space>
        </div>
      </DefaultHeaderContainer>
    </>
  );
}

function HeaderRenderFC() {
  const [user]: any = useCurrentUser();

  return (
    <DefaultHeaderContainer>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <DefaultHeaderLogo
          logo={imgs.logoUrl}
          size="small"
          onClick={() => {
            window.location.href = '/plm/app/tool-management/';
          }}
        />
        {/* <DefaultHeaderTitle title="数字化工具集管理系统" /> */}
      </div>
      <div style={{ flex: 1, minWidth: '30%', marginLeft: 20, height: 30, overflow: 'hidden' }}>
        <div style={{ width: '40%', margin: '0 auto' }}>
          {/* <DefaultHeaderSearch
            onSearch={keyword => {
              window.location.href = `/plm/app/workbench/search?keyword=${keyword || ''}`;
            }}
          /> */}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Space>
          <DefaultHeaderProfile
            user={user || { name: '未认证用户', username: '' }}
            from="main"
            sc
            profile={{ logout: true }}
          />
        </Space>
      </div>
    </DefaultHeaderContainer>
  );
}
const loopMenuItem = (menus: MenuDataItem[]): MenuDataItem[] =>
  menus.map(({ icon, children, ...item }) => ({
    ...item,
    icon: icon && IconMapping,
    children: children && loopMenuItem(children),
  }));
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    // menuDataRender: (i) => loopMenuItem(i),
    menuItemRender: (
      item: { icon: any; itemPath: string },
      defaultDom: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined
    ) => {
      return (
        <div
          style={{ paddingLeft: item.icon ? 0 : 8 }}
          onClick={() => {
            history.push(item.itemPath);
          }}
        >
          {defaultDom}
        </div>
      );
    },
    // logo: () => <>{imgs.logo}</>,
    rightContentRender: () => <UserInfo />,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.me?.fullName,
    },
    menu: {
      locale: false,
      defaultOpenAll: true,
      ignoreFlatMenu: true,
      // request: getMenu,
    },
    headerRender: () => <HeaderRenderFC />,
    // menuHeaderRender: () => false,
    onPageChange: () => {
      const { location } = history;
      const jwt = sessionStorage.getItem('token');

      const authorizationRequired =
        process.env.NODE_ENV === 'development' || process.env.AUTHORIZATION_REQUIRED;
      // console.log("authorizationRequired",jwt)
      if (authorizationRequired && !jwt && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },

    ...initialState?.settings,
  };
};

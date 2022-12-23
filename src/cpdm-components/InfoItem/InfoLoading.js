import React from 'react';
import { Layout, Card, Skeleton } from 'antd';
import { PageHeaderWrapper } from '@cpdm/layout';

export default () => (
  <PageHeaderWrapper content={<Skeleton active paragraph={{ rows: 1 }} avatar />}>
    <Card>
      <Layout>
        <Layout.Content>
          <Skeleton active paragraph={{ rows: 6 }} />
          <Skeleton active paragraph={{ rows: 6 }} />
          <Skeleton active paragraph={{ rows: 6 }} />
        </Layout.Content>
        <Layout.Sider width={324} theme="light" style={{ paddingLeft: 24 }}>
          <Skeleton active />
          <Skeleton active paragraph={{ rows: 6 }} />
          <Skeleton active />
        </Layout.Sider>
      </Layout>
    </Card>
  </PageHeaderWrapper>
);

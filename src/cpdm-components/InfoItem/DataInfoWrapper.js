import React from 'react';
import { PageHeaderWrapper } from '@cpdm/layout';

class DataInfoWrapper extends React.PureComponent {
  constructor(props) {
    super(props);
    const { active } = props;
    this.state = {
      active: active ? Number(active) : 0,
    };
  }

  render() {
    const { tabs, children, title, content, extra, extraContent, onTabChange, loading } = this.props;
    const { active } = this.state;
    const tabList =
      tabs &&
      tabs.length &&
      tabs.map((t, i) => ({
        key: `${i}`,
        tab: t.title,
      }));
    const activeKey = tabs && tabs.length && `${active}`;
    return (
      <PageHeaderWrapper
        breadcrumb={undefined}
        loading={loading}
        title={title}
        content={content}
        extra={extra}
        extraContent={extraContent}
        tabList={tabList}
        tabActiveKey={activeKey}
        onTabChange={k => {
          this.setState({ active: Number(k) });
          if (onTabChange) onTabChange(Number(k));
        }}
      >
        {children}
        {tabs[active].content}
      </PageHeaderWrapper>
    );
  }
}

export default DataInfoWrapper;

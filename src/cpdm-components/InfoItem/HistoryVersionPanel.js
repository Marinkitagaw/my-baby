import React from 'react';
import { Card } from 'antd';
import { StandardDataTable } from 'cpdm-ui-components';

class HistoryVersionPanel extends React.PureComponent {
  render() {
    const { columns, requestUrl } = this.props;
    const tableProps = {
      requestUrl,
      columns,
      hideInputSearch: true,
    };
    return (
      <Card>
        <StandardDataTable {...tableProps} />
      </Card>
    );
  }
}

export default HistoryVersionPanel;

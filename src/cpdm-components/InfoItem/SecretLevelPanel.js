import React from 'react';
import { Statistic, Row, Col } from 'antd';

export default props => {
  const { data } = props;
  if (!data || !data.secretLevel) return '';
  return (
    <div style={{ marginTop: -32 }}>
      <Row>
        <Col span={12}>
          <Statistic title="密级" value={data.secretLevelDisplay || data.secretLevel} />
        </Col>
        <Col span={12}>
          <Statistic title="涉密期限" value={`${data.confidentialityPeriod}年`} />
        </Col>
      </Row>
    </div>
  );
};

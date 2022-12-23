import React from 'react';
import { Row, Col } from 'antd';

export default props => {
  const { data = {}, noCurrentParticipators } = props;
  if (!data) return '';

  return (
    <Row>
      {noCurrentParticipators ? null : (
        <Col span={12}>
          <Col span={8} />
          <Col span={16}>
            <div style={{ color: 'rgba(0, 0, 0, 0.43)' }}>状态</div>
            <div style={{ color: 'rgba(0, 0, 0, 0.85)', fontSize: 20, whiteSpace: 'nowrap' }}>
              {data.lifecycleStateName}
            </div>
          </Col>
        </Col>
      )}
      <Col span={12}>
        <Col span={8} />
        <Col span={16}>
          <div style={{ color: 'rgba(0, 0, 0, 0.43)' }}>密级</div>
          <div style={{ color: 'rgba(0, 0, 0, 0.85)', fontSize: 20, whiteSpace: 'nowrap' }}>
            {data.secretLevel}
          </div>
        </Col>
      </Col>
    </Row>
  );
};

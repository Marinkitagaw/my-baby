import React, { useState } from 'react';
import { Card, Table, Input, Row, Col } from 'antd';
import { Link } from 'umi';

const expandedItemList = [
  { label: '申请理由', id: 'reason' },
  { label: '已经过的认证或认定内容与时间', id: 'certification' },
  { label: '已经过鉴定或定性内容与时间', id: 'appraisal' },
  { label: '已应用的的型号设备或其他设备的应用历史', id: 'applied' },
  { label: '已进行的应用方面的试验情况', id: 'testSituation' },
  { label: '元器件主要参数及补充要求', id: 'complement' },
];

export default props => {
  const { onChange, data = [] } = props;
  const [dataSource, setDatasource] = useState(data);

  const onComponentAttrChange = (key, index, value) => {
    const dataList = [...dataSource];
    dataList[index][key] = value;
    setDatasource([...dataList]);
    if (onChange) onChange([...dataList]);
  };

  const expandedRowForm = (record, index) => (
    <>
      {expandedItemList.map(item => (
        <Row gutter={8} key={item.id} style={{ marginBottom: 8 }}>
          <Col span={6} style={{ textAlign: 'right' }}>{`${item.label}：`}</Col>
          <Col span={16}>
            <Input.TextArea
              value={record[item.id]}
              onChange={e => onComponentAttrChange(item.id, index, e.target.value)}
              rows={3}
            />
          </Col>
        </Row>
      ))}
    </>
  );

  const columns = [
    { title: '编号', dataIndex: 'code', render: (v, r) => <Link to={r.infoUrl}>{v}</Link> },
    { title: '名称', dataIndex: 'name' },
    {
      title: '生产厂家',
      dataIndex: 'productionFactory',
      render: (v, r) => r.customAttributes?.productionFactoryName,
    },
    {
      title: '质量等级',
      dataIndex: 'qualityLevel',
      render: (v, r) => r.customAttributes?.qualityLevel,
    },
  ];

  return (
    <Card bordered={false} type="inner" size="small" title="元器件">
      <Table
        size="small"
        dataSource={dataSource}
        columns={columns}
        rowKey={record => record.id}
        expandable={{
          expandedRowRender: (record, index) => expandedRowForm(record, index),
        }}
        pagination={false}
      />
    </Card>
  );
};

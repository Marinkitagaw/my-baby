import React from 'react';
import { Table, Card } from 'antd';
import { connect } from 'umi';

@connect(({ processInstance, loading }) => ({
  supplierDescriptionList: processInstance.supplierDescriptionList,
  loading: loading.effects['processInstance/getSupplierDescription'],
}))
class SupplierDescription extends React.Component {
  componentDidMount() {
    const { dispatch, processInstanceId } = this.props;
    dispatch({
      type: 'processInstance/getSupplierDescription',
      payload: {
        processInstanceId,
      },
    });
  }

  render() {
    const { supplierDescriptionList = [], loading } = this.props;
    const columns = [
      { title: '序号', dataIndex: 'index', width: 60, render: (t, r, i) => i + 1 },
      { title: '单位', dataIndex: 'supplierName', width: 150, ellipsis: true },
      { title: '角色', dataIndex: 'role', width: 100, ellipsis: true },
      { title: '姓名', dataIndex: 'fullName', width: 150 },
      { title: '说明', dataIndex: 'description', ellipsis: true },
    ];
    return (
      supplierDescriptionList.length > 0 && (
        <Card
          title="外单位协同说明"
          type="inner"
          bodyStyle={{ padding: 8 }}
          style={{ marginTop: 16 }}
        >
          <Table
            columns={columns}
            dataSource={supplierDescriptionList}
            size="middle"
            rowKey={(r) => r.id}
            loading={loading}
          />
        </Card>
      )
    );
  }
}
export default SupplierDescription;

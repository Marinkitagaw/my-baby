import React, { Component } from 'react';
import { Table, Modal } from 'antd';
import { connect } from 'umi';
@connect(({ component, loading }) => ({
  component,
  loading: loading.effects['component/importComponents'],
}))
class ComparativeData extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { visible = false, onOk, onCancel, comparaData } = this.props;
    const column = [
      {
        dataIndex: 'typeRemark',
        width: 120,
      },
      {
        title: '元器件编号',
        dataIndex: 'code',
        width: 140,
      },
      {
        title: '物料编码',
        dataIndex: 'codeOfMaterial',
        width: 120,
      },
      {
        title: '元器件名称',
        dataIndex: 'name',
        width: 140,
      },

      {
        title: '型号规格',
        dataIndex: 'modelSpecification',
        width: 120,
      },
      {
        title: '采用标准',
        dataIndex: 'adoptionStandard',
        width: 120,
      },
      {
        title: '详细规范',
        dataIndex: 'detailSpecification',
        width: 120,
      },
      {
        title: '通用规范',
        dataIndex: 'generalSpecification',
        width: 120,
      },
      {
        title: '质量保证等级',
        dataIndex: 'qualityGradeLevel',
        width: 160,
      },
      {
        title: '质量等级',
        dataIndex: 'qualityLevel',
        width: 120,
      },
      {
        title: '生产厂家',
        dataIndex: 'productionFactory',
        width: 120,
      },
      {
        title: '分类',
        dataIndex: 'classification',
        width: 120,
      },
      //   {
      //     title: '技术参数',
      //     dataIndex: 'zyxncs',
      //     width: 130,
      //   },
    ];
    return (
      <Modal title="数据比较" visible={visible} onOk={onOk} onCancel={onCancel} width={1200}>
        <Table columns={column} scroll={{ x: 1300 }} dataSource={comparaData} />
      </Modal>
    );
  }
}
export default ComparativeData;

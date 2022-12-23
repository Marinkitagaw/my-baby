import React, { PureComponent } from 'react';
import { Input, Table } from 'antd';

export default class IndexTable extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      indexDatas: [],
      indexCount: 0,
    };
  }

  componentDidMount() {
    // this.props.onChildIndex(this);
  }

  // 列表增加指标项
  addIndexData = () => {
    const { indexCount, indexDatas } = this.state;
    const newData = {
      key: indexCount,
      indexName: ``,
      indexValue: ``,
    };
    this.setState({
      indexDatas: [...indexDatas, newData],
      indexCount: indexCount + 1,
    });
  };

  // 删除指标
  deleteIndexData = key => {
    const { indexDatas } = this.state;
    this.setState({ indexDatas: indexDatas.filter(item => item.key !== key) });
  };

  // 指标输入属性变化
  indexAttributeChange = (attr, e, record, index) => {
    const { indexDatas } = this.state;
    const row = indexDatas[index];
    const key = e.target ? e.target.value : e;
    row[attr] = key;
    this.setState({
      indexDatas,
    });
  };

  render() {
    const indexColumns = [
      {
        title: '名称',
        dataIndex: 'indexName',
        key: 'indexName',
        render: (text, record, index) => (
          <Input
            defaultValue={record.indexName}
            maxLength={100}
            style={{ minHeight: 32 }}
            placeholder="请输入名称"
            autosize
            onChange={value => this.indexAttributeChange('indexName', value, record, index)}
          />
        ),
      },
      {
        title: '指标值',
        dataIndex: 'indexValue',
        width: 425,
        render: (text, record, index) => (
          <Input
            defaultValue={record.indexValue}
            maxLength={100}
            style={{ minHeight: 32 }}
            placeholder="请输入指标值"
            autosize
            onChange={value => this.indexAttributeChange('indexValue', value, record, index)}
          />
        ),
      },
      {
        title: '操作',
        dataIndex: '操作',
        width: '10%',
        render: (text, record) => <a onClick={() => this.deleteIndexData(record.key)}>移除</a>,
      },
    ];

    const { indexDatas } = this.state;

    return (
      <Table
        rowKey={record => record.id}
        dataSource={indexDatas}
        pagination={false}
        columns={indexColumns}
        bordered
        size="middle"
      />
    );
  }
}

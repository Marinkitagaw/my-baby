import { Button, Form, Input, message, Modal, Pagination, Table } from 'antd';
import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'umi';

const { Item } = Form;

class CatalogueModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // 目录列表
      catalogList: [],
      // 分页器
      page: 1,
      size: 10,
      total: 0,
      // 已选择列id
      selectedRowKeys: [],
      // 已选择列
      selectedRows: [],
    };
  }

  formRef = React.createRef();

  componentDidMount() {
    this.getCatalogList();
  }

  // 获取目录列表
  getCatalogList = () => {
    const { page, size } = this.state;
    const { dispatch, productionFactory } = this.props;
    const val = this.formRef.current.getFieldsValue();
    dispatch({
      type: 'component/getCatalogList',
      payload: {
        page: page - 1,
        size,
        productionFactory,
        ...val,
      },
      callback: res => {
        this.setState({
          catalogList: res.content.map(item => ({ ...item, key: item.id })),
          total: res.totalElements,
        });
      },
    });
  };

  // 分页器变化
  onPageChange = (page, size) => {
    this.setState({ page, size });
    setTimeout(() => {
      this.getCatalogList();
    }, 0);
  };

  // 重置搜索表单
  resetForm = () => {
    this.formRef.current.setFieldsValue({
      name: '',
      modelSpecification: '',
    });
    this.getCatalogList();
  };

  render() {
    const { catalogList, page, total, selectedRowKeys, selectedRows } = this.state;
    const { visible, onOk, onCancel, loading } = this.props;

    const columns = [
      {
        title: '编号',
        dataIndex: 'code',
        width: 120,
        ellipsis: true,
        render: (value, record) => (
          <a
            onClick={() =>
              window.open(
                `${process.env.CONTEXT_PATH}/app/main/resource/component/component-catalogue/${record.id}/catalogue-info`,
              )
            }
          >
            {value}
          </a>
        ),
      },
      {
        title: '元器件名称',
        dataIndex: 'name',
        width: 120,
        ellipsis: true,
      },
      {
        title: '型号规格',
        dataIndex: 'modelSpecification',
        width: 120,
        ellipsis: true,
      },
      {
        title: '质量等级',
        dataIndex: 'qualityLevel',
        width: 100,
        ellipsis: true,
      },
      {
        title: '生产厂家',
        dataIndex: 'productionFactoryName',
        width: 120,
        ellipsis: true,
      },
      {
        title: '分类',
        dataIndex: 'classificationName',
        width: 100,
        ellipsis: true,
      },
      {
        title: '创建人',
        dataIndex: 'creatorFullName',
        width: 100,
        ellipsis: true,
      },
      {
        title: '创建时间',
        dataIndex: 'createStamp',
        width: 100,
        ellipsis: true,
        render: value => moment(value).format('YYYY-MM-DD'),
      },
      {
        title: '修改时间',
        dataIndex: 'modifyStamp',
        width: 100,
        ellipsis: true,
        render: value => moment(value).format('YYYY-MM-DD'),
      },
    ];

    return (
      <Modal
        width="50vw"
        title="选择目录清单"
        visible={visible}
        onOk={() => {
          if (selectedRows.length === 0) {
            message.info('请选择目录清单！');
            return;
          }
          onOk(selectedRows[0]);
        }}
        onCancel={onCancel}
      >
        <Form
          layout="inline"
          className="searchForm"
          ref={this.formRef}
          onFinish={this.getCatalogList}
        >
          <Item label="元器件名称" name="name">
            <Input />
          </Item>
          <Item label="型号规格" name="modelSpecification">
            <Input />
          </Item>
          <Item>
            <Button type="primary" htmlType="submit">
              检索
            </Button>
            <Button onClick={this.resetForm}>重置</Button>
          </Item>
        </Form>
        <Table
          className="tableEllipsis headBGC"
          size="small"
          columns={columns}
          loading={loading}
          rowSelection={{
            type: 'radio',
            selectedRowKeys,
            onChange: (s, r) => this.setState({ selectedRowKeys: s, selectedRows: r }),
          }}
          dataSource={catalogList}
          scroll={{ x: 800 }}
          pagination={false}
        />
        <Pagination
          size="small"
          style={{
            textAlign: 'right',
            marginTop: 10,
          }}
          showTotal={t => `共${t}条数据`}
          showSizeChanger
          current={page}
          total={total}
          onChange={this.onPageChange}
        />
      </Modal>
    );
  }
}

export default connect(({ loading }) => ({
  loading: loading.effects['component/getCatalogList'],
}))(CatalogueModal);

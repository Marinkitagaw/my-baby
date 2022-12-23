/* eslint-disable no-restricted-syntax */
import React, { PureComponent, Fragment } from 'react';
import { connect } from 'umi';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Table, Input, Button, message, Tooltip } from 'antd';
import { Modal } from '@cpdm/components';
import moment from 'moment';
import { Link } from 'umi';
import styles from '@/styles/table_list.less';
import indexStyle from './index.less';

@connect(({ search, loading }) => ({
  search,
  searching: loading.effects['search/simpleSearchResource'],
  // confirmLoading: loading.effects['search/simpleSearchResource'],
}))
@Form.create()
class ResourceSearchModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedRows: [],
      selectedRowKeys: [],
      content: [],
      pagination: {
        showTotal: total => <span>共{total}条数据</span>,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '50', '100'],
      },
    };
  }

  componentDidMount() {
    const { visible, resourceType } = this.props;
    console.log(resourceType);
    if (visible) {
      this.handleSearch({
        resourceType,
      });
    }
  }

  // 取消
  onCancel = () => {
    const { onCancel } = this.props;
    this.setState({ content: [] }, () => {
      onCancel();
    });
  };

  // 确定
  onHandler = () => {
    const { selectedRowKeys, selectedRows } = this.state;
    const { onOk } = this.props;
    if (!selectedRowKeys || !selectedRowKeys.length) {
      message.warning('请至少选择一条数据。');
    } else {
      onOk(selectedRows, selectedRowKeys);
      this.setState({
        content: [],
      });
    }
  };

  // 重置表单
  handleFormReset = () => {
    const {
      form: { resetFields },
    } = this.props;
    resetFields();
    this.setState({ content: [] }, () => {
      this.handleSearch({
        page: 0,
      });
    });
  };

  // 搜索数据
  handleSearch = param => {
    const { dispatch, state, baseType, baseType1, stateId, type, ojType } = this.props;
    dispatch({
      type: 'search/simpleSearchResource',
      payload: {
        ...param,
        applyType: baseType1,
        baseType,
        // state,
        stateId,
        type,
        objectType: ojType,
      },
      callback: (response = {}) => {
        const { pagination } = this.state;
        if (response && !response.message && response.status !== 500) {
          const paginations = { ...pagination };
          paginations.total = Number(response.totalElements);
          // paginations.pageSize = defaultPageSize;
          paginations.current = response.number + 1;
          this.setState({
            content: response.content,
            pagination: paginations,
          });
        } else {
          this.setState({
            content: [],
          });
        }
      },
    });
  };

  handleSimpleSearch = () => {
    const {
      form: { validateFields },
    } = this.props;

    validateFields((err, fieldsValue) => {
      if (err) return;
      this.handleSearch({
        ...fieldsValue,
        page: 0,
      });
    });
  };

  handleNormalSearch = () => {
    const {
      form: { validateFields },
    } = this.props;
    validateFields((err, values) => {
      if (err) return;
      this.handleSearch({
        ...values,
        page: 0,
      });
    });
  };

  // 监听表格分页等发生变化
  handleTableChange = (paginations, sorter) => {
    const { pagination } = this.state;
    const {
      filters = {},
      form: { validateFields },
    } = this.props;
    const pager = { ...pagination };
    pager.current = paginations.current;
    this.setState({
      pagination: pager,
    });
    const order = sorter.order && sorter.order === 'ascend' ? 'asc' : 'desc';
    const sort = sorter.columnKey && `${sorter.columnKey},${order}`;
    validateFields((err, fieldsValue) => {
      if (err) return;
      this.handleSearch(
        Object.assign(filters, fieldsValue, {
          size: paginations.pageSize,
          page: paginations.current - 1,
          sort,
          objectType: fieldsValue.objectType,
        }),
      );
    });
  };

  // 渲染搜索框
  renderForm = () => {
    const { repositorysCommon } = this.state;
    return this.renderNormalForm(repositorysCommon);
  };

  // 普通搜索框--已指定数据类型（可通过产品库过滤列表）
  renderNormalForm = () => {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const formItemLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    return (
      <Form layout="inline" autoComplete="off">
        <Form.Item label="编号">
          {getFieldDecorator('code')(<Input placeholder="按编号过滤" style={{ width: 220 }} />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="名称">
          {getFieldDecorator('name')(<Input placeholder="按名称过滤" style={{ width: 220 }} />)}
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={this.handleNormalSearch}>
            查询
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
            重置
          </Button>
        </Form.Item>
      </Form>
    );
  };

  onSelectRow = (record, selected) => {
    const { checkType } = this.props;
    const { selectedRowKeys, selectedRows = [] } = this.state;
    if (selected) {
      const newData = [];
      // 遍历添加的数据
      let isExist = false;
      let key;
      for (key of selectedRows) {
        if (key.id === record.id) {
          isExist = true;
          break;
        }
      }
      if (!isExist) {
        newData.push({
          ...record,
        });
      }
      if (newData.length > 0) {
        const newDataIds = newData.map(i => i.id);
        if (checkType === 'radio') {
          this.setState({
            selectedRows: [...newData],
            selectedRowKeys: [...newDataIds],
          });
        } else {
          this.setState({
            selectedRows: [...selectedRows, ...newData],
            selectedRowKeys: [...selectedRowKeys, ...newDataIds],
          });
        }
      }
    } else {
      let i = 0;
      let key;
      for (key of selectedRows) {
        if (key.id === record.id) {
          if (checkType === 'radio') {
            this.setState({
              selectedRows: [record],
              selectedRowKeys: [record.id],
            });
          } else {
            selectedRows.splice(i, 1);
            selectedRowKeys.splice(i, 1);
            this.setState({
              selectedRows: [...selectedRows],
              selectedRowKeys: [...selectedRowKeys],
            });
          }
        }
        i += 1;
      }
    }
  };

  onSelectAll = (selected, selecteds, changedRows) => {
    const { selectedRowKeys, selectedRows = [] } = this.state;
    let record;
    for (record of changedRows) {
      if (selected) {
        // 遍历添加的数据
        let isExist = false;
        let key;
        for (key of selectedRows) {
          if (key.id === record.id) {
            isExist = true;
            break;
          }
        }
        if (!isExist) {
          selectedRows.push({
            ...record,
          });
          selectedRowKeys.push(record.id);
          this.setState({
            selectedRows: [...selectedRows],
            selectedRowKeys: [...selectedRowKeys],
          });
        }
      } else {
        let i = 0;
        let key;
        for (key of selectedRows) {
          if (key.id === record.id) {
            selectedRows.splice(i, 1);
            selectedRowKeys.splice(i, 1);
            this.setState({
              selectedRows: [...selectedRows],
              selectedRowKeys: [...selectedRowKeys],
            });
          }
          i += 1;
        }
      }
    }
  };

  // 渲染页面
  render() {
    const {
      title,
      searching,
      visible,
      checkType,
      confirmLoading,
      baseType1,
      resourceType,
    } = this.props;
    const { content = [], pagination, selectedRowKeys = [] } = this.state;
    const columns1 = [
      {
        title: '序号',
        key: 'columns',
        align: 'center',
        width: '4%',
        render: (text, record, index) => (
          <Fragment>
            <span>{index + 1}</span>
          </Fragment>
        ),
      },
      {
        title: '编号',
        dataIndex: 'code',
        sorter: true,
        render: (text, record) => (
          <Link to={`/resource/material/item/${record.id}/info`}>{record.code}</Link>
        ),
      },
      {
        title: '名称',
        dataIndex: 'name',
        sorter: true,
        render(text) {
          return (
            <Tooltip title={text} placement="topLeft">
              {text}
            </Tooltip>
          );
        },
      },
      {
        title: '版本',
        dataIndex: 'version',
        width: '10%',
        render(text) {
          return (
            <Tooltip title={text} placement="topLeft">
              {text}
            </Tooltip>
          );
        },
      },
      {
        title: '状态',
        dataIndex: 'state',
        width: '8%',
        render(text) {
          return (
            <Tooltip title={text} placement="topLeft">
              {text}
            </Tooltip>
          );
        },
      },
      {
        title: '材料名称',
        dataIndex: 'cmat',
        render: text => (
          <Tooltip placement="topLeft" title={text}>
            {text}
          </Tooltip>
        ),
      },
      {
        title: '材料牌号',
        dataIndex: 'camatMark',
        render: text => (
          <Tooltip placement="topLeft" title={text}>
            {text}
          </Tooltip>
        ),
      },
      {
        title: '材料描述',
        dataIndex: 'camatType',
        render: text => (
          <Tooltip placement="topLeft" title={text}>
            {text}
          </Tooltip>
        ),
      },
      {
        title: '修改时间',
        dataIndex: 'modifyStamp',
        sorter: true,
        width: '12%',
        render(text) {
          return (
            <Tooltip title={moment(text).format('YYYY-MM-DD HH:mm')} placement="topLeft">
              {moment(text).format('YYYY-MM-DD HH:mm')}
            </Tooltip>
          );
        },
      },
    ];
    const columns2 = [
      {
        title: '序号',
        key: 'columns',
        align: 'center',
        width: '4%',
        render: (text, record, index) => (
          <Fragment>
            <span>{index + 1}</span>
          </Fragment>
        ),
      },
      {
        title: '编号',
        dataIndex: 'code',
        sorter: true,
        render: (text, record) => (
          <Link to={`/resource/component/item/${record.id}/info`}>{record.code}</Link>
        ),
      },
      {
        title: '名称',
        dataIndex: 'name',
        sorter: true,
        render(text) {
          return (
            <Tooltip title={text} placement="topLeft">
              {text}
            </Tooltip>
          );
        },
      },
      {
        title: '版本',
        dataIndex: 'version',
        width: '10%',
        render(text) {
          return (
            <Tooltip title={text} placement="topLeft">
              {text}
            </Tooltip>
          );
        },
      },
      {
        title: '状态',
        dataIndex: 'state',
        width: '8%',
        render(text) {
          return (
            <Tooltip title={text} placement="topLeft">
              {text}
            </Tooltip>
          );
        },
      },
      {
        title: '型号规格',
        dataIndex: 'modelSpecification',
        width: '8%',
        render: text => (
          <Tooltip placement="topLeft" title={text}>
            {text}
          </Tooltip>
        ),
      },
      {
        title: '院目录内外',
        dataIndex: 'schoolDirectory',
        width: '10%',
        render: text => {
          switch (text) {
            case 'true':
              return '目录内';
            case 'false':
              return '目录外';
            default:
              return '';
          }
        },
      },
      {
        title: '是否优选',
        dataIndex: 'preferred',
        width: '8%',
        render: text => {
          switch (text) {
            case 'true':
              return '是';
            case 'false':
              return '否';
            default:
              return '';
          }
        },
      },
      {
        title: '修改时间',
        dataIndex: 'modifyStamp',
        sorter: true,
        width: '12%',
        render(text) {
          return (
            <Tooltip title={moment(text).format('YYYY-MM-DD HH:mm')} placement="topLeft">
              {moment(text).format('YYYY-MM-DD HH:mm')}
            </Tooltip>
          );
        },
      },
    ];
    const columns3 = [
      {
        title: '序号',
        key: 'columns',
        align: 'center',
        width: '4%',
        render: (text, record, index) => (
          <Fragment>
            <span>{index + 1}</span>
          </Fragment>
        ),
      },
      {
        title: '编号',
        dataIndex: 'code',
        sorter: true,
        render: (text, record) => (
          <Link to={`/resource/standard/item/${record.id}/info`}>{record.code}</Link>
        ),
      },
      {
        title: '名称',
        dataIndex: 'name',
        sorter: true,
        render(text) {
          return (
            <Tooltip title={text} placement="topLeft">
              {text}
            </Tooltip>
          );
        },
      },
      {
        title: '版本',
        dataIndex: 'version',
        width: '10%',
        render(text) {
          return (
            <Tooltip title={text} placement="topLeft">
              {text}
            </Tooltip>
          );
        },
      },
      {
        title: '状态',
        dataIndex: 'state',
        width: '8%',
        render(text) {
          return (
            <Tooltip title={text} placement="topLeft">
              {text}
            </Tooltip>
          );
        },
      },
      {
        title: '规格',
        dataIndex: 'specification',
        render: text => (
          <Tooltip placement="topLeft" title={text}>
            {text}
          </Tooltip>
        ),
      },
      {
        title: '修改时间',
        dataIndex: 'modifyStamp',
        sorter: true,
        width: '15%',
        render(text) {
          return (
            <Tooltip title={moment(text).format('YYYY-MM-DD HH:mm')} placement="topLeft">
              {moment(text).format('YYYY-MM-DD HH:mm')}
            </Tooltip>
          );
        },
      },
    ];
    const columns4 = [
      {
        title: '序号',
        key: 'columns',
        align: 'center',
        width: '4%',
        render: (text, record, index) => (
          <Fragment>
            <span>{index + 1}</span>
          </Fragment>
        ),
      },
      {
        title: '编号',
        dataIndex: 'code',
        key: 'master.code',
        width: '21%',
        sorter: true,
        render: (text, record) => (
          <Link to={`/resource/${resourceType}/item/${record.id}/info`}>{record.code}</Link>
        ),
      },
      {
        title: '名称',
        dataIndex: 'name',
        key: 'master.name',
        width: '17%',
        sorter: true,
        render: text => (
          <Tooltip placement="topLeft" title={text}>
            {text}
          </Tooltip>
        ),
      },
      {
        title: '资源类型',
        dataIndex: 'resourceType',
        width: '8%',
        sorter: true,
        render: text => (
          <Tooltip placement="topLeft" title={text}>
            {text}
          </Tooltip>
        ),
      },
      {
        title: '版本',
        dataIndex: 'version',
        width: '8%',
        render: text => (
          <Tooltip placement="topLeft" title={text}>
            {text}
          </Tooltip>
        ),
      },
      {
        title: '状态',
        dataIndex: 'state',
        width: '8%',
        render: text => (
          <Tooltip placement="topLeft" title={text}>
            {text}
          </Tooltip>
        ),
      },
      {
        title: '修改时间',
        dataIndex: 'modifyStamp',
        sorter: true,
        width: '12%',
        render: text => (
          <Tooltip placement="topLeft" title={text}>
            {moment(text).format('YYYY-MM-DD HH:mm')}
          </Tooltip>
        ),
      },
    ];

    const rowSelection = {
      type: checkType || 'checkbox',
      selectedRowKeys,
      onSelect: this.onSelectRow,
      onSelectAll: this.onSelectAll,
      fixed: true,
      columnWidth: 40,
    };

    return (
      <Modal
        title={title}
        visible={visible}
        onOk={this.onHandler}
        onCancel={this.onCancel}
        width={1260}
        maskClosable={false}
        confirmLoading={confirmLoading}
        destroyOnClose
      >
        <div className={indexStyle.tableList}>
          <div className={indexStyle.tableListForm}>{this.renderForm()}</div>
        </div>
        <Table
          className={styles.tableEllipsis}
          size="small"
          // eslint-disable-next-line no-nested-ternary
          columns={
            // eslint-disable-next-line no-nested-ternary
            baseType1 === 'materialApply'
              ? columns1
              : // eslint-disable-next-line no-nested-ternary
              baseType1 === 'componentApply'
              ? columns2
              : // eslint-disable-next-line no-nested-ternary
              baseType1 === 'standardApply' ||
                baseType1 === 'basicApply' ||
                baseType1 === 'skeletonApply' ||
                baseType1 === 'typicalApply'
              ? columns3
              : baseType1 === 'resourceApply'
              ? columns4
              : ''
          }
          loading={searching}
          dataSource={content}
          rowKey={record => record.id}
          rowSelection={rowSelection}
          pagination={content && content.length ? pagination : false}
          onChange={this.handleTableChange}
        />
      </Modal>
    );
  }
}
export default ResourceSearchModal;

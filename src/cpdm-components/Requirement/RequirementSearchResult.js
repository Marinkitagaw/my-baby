import React, { PureComponent } from 'react';
import { connect } from 'umi';
import moment from 'moment';
import { AppstoreOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { layout, Row, Col, Button, message, Input, Tooltip, Tag } from 'antd';
import { Table } from '@cpdm/components';
import { RepositoryPicker } from 'cpdm-ui-components';
import styles from '@/styles/table_list.less';
import indexStyle from './index.less';

const { Content } = layout;
@connect(({ requirement, loading }) => ({
  requirement,
  searching: loading.effects['requirement/pageRequirements'],
}))
@Form.create()
class RequirementSearch extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedRows: [],
      selectedRowKeys: [],
      content: [],
      pagination: {
        showTotal: total => <span>共{total}条数据</span>,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '50'],
      },
      moreRepositorys: false,
    };
  }

  componentDidMount() {
    const { repositoryId, id } = this.props;

    this.handleSearch({
      repositoryId,
      id,
      size: 10,
    });
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
    }
  };

  // 搜索数据
  handleSearch = param => {
    const { dispatch, filter = {}, dataType } = this.props;
    if (dataType) {
      Object.assign(param, {
        type: dataType,
      });
    }
    dispatch({
      type: 'requirement/pageRequirements',
      payload: {
        ...param,
        ...filter,
      },
      callback: (response = {}) => {
        const { pagination } = this.state;
        if (response && !response.message && response.status !== 500) {
          const paginations = { ...pagination };
          paginations.total = Number(response.totalElements);
          paginations.pageSize = response.size;
          paginations.current = response.number + 1;
          this.setState({
            content: response.content || [],
            pagination: paginations,
            selectedRows: [],
            selectedRowKeys: [],
          });
        }
      },
    });
  };

  handleNormalSearch = () => {
    const {
      form: { validateFields },
      repositoryId,
      id,
    } = this.props;
    validateFields((err, values) => {
      if (err) return;
      this.handleSearch({
        ...values,
        page: 0,
        repositoryId,
        id,
        size: 10,
      });
    });
  };

  // 监听表格分页等发生变化
  handleTableChange = (paginations, filters, sorter) => {
    const { pagination } = this.state;
    const {
      form: { validateFields },
      repositoryId,
      id,
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
          repositoryId,
          id,
        }),
      );
    });
  };

  handleRepositorysOk = selectedData => {
    const {
      form: { setFieldsValue },
    } = this.props;
    setFieldsValue({
      modelCode: Array.isArray(selectedData) ? selectedData[0].modelCode : selectedData.modelCode,
    });
    this.setState({ moreRepositorys: false });
  };

  // 普通搜索框--已指定数据类型（可通过产品库过滤列表）
  renderNormalForm = () => {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form layout="inline">
        <Row gutter={8}>
          <Col span={6} style={{ height: 40 }}>
            <Form.Item label="编号">
              {getFieldDecorator('code')(
                <Input allowClear placeholder="按编号过滤" style={{ width: '100%' }} />,
              )}
            </Form.Item>
          </Col>
          <Col span={6} style={{ height: 40, margin: '0 10px' }}>
            <Form.Item label="名称">
              {getFieldDecorator('name')(
                <Input allowClear placeholder="按名称过滤" style={{ width: '100%' }} />,
              )}
            </Form.Item>
          </Col>
          <Col span={8} style={{ height: 40, marginRight: 10 }}>
            <Form.Item label="型号代号">
              {getFieldDecorator('modelCode')(
                <Input
                  allowClear
                  placeholder="按型号代号过滤"
                  style={{ width: '100%' }}
                  addonAfter={
                    <AppstoreOutlined
                      onClick={() => {
                        this.setState({ moreRepositorys: true });
                      }}
                    />
                  }
                />,
              )}
            </Form.Item>
          </Col>
          <Col span={3} className={styles.extraContent}>
            <Button type="primary" onClick={this.handleNormalSearch}>
              查询
            </Button>
          </Col>
        </Row>
      </Form>
    );
  };

  // 渲染页面
  render() {
    const { searching, selectType, rowSelect, isDisableRowSelect, columns, onChange } = this.props;
    const { content = [], pagination, selectedRowKeys, moreRepositorys } = this.state;

    const dataColumns = [
      {
        title: '型号系列',
        dataIndex: 'series',
        width: 110,
        render: text => (
          <Tooltip placement="topLeft" title={text}>
            {text}
          </Tooltip>
        ),
      },
      {
        title: '型号名称',
        dataIndex: 'name',
        width: 200,
        sorter: true,
        render: (text, record) => (
          <Tooltip placement="topLeft" title={text}>
            {text}&nbsp;&nbsp;{record.requirementEnabled && <Tag color="orange">需求</Tag>}
            {record.charEnabled && <Tag color="pink">六性</Tag>}
          </Tooltip>
        ),
      },
      {
        title: '型号代号',
        dataIndex: 'modelCode',
        width: 110,
        render: text => (
          <Tooltip placement="topLeft" title={text}>
            {text}
          </Tooltip>
        ),
      },
      {
        title: '产品代号',
        dataIndex: 'code',
        width: 110,
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
        width: 160,
        render: text => (
          <Tooltip placement="topLeft" title={moment(text).format('YYYY-MM-DD HH:mm')}>
            {moment(text).format('YYYY-MM-DD HH:mm')}
          </Tooltip>
        ),
      },
    ];

    const rowSelection = {
      type: selectType,
      selectedRowKeys,
      onChange: (keys, selectedRows) => {
        this.setState(
          {
            selectedRows,
            selectedRowKeys: keys,
          },
          () => {
            onChange(keys);
          },
        );
      },

      getCheckboxProps: record => ({
        disabled:
          isDisableRowSelect &&
          (rowSelect
            ? record.select === true
            : '' ||
              (record.lifecycleStateIdentifier !== 'INWORK' &&
                record.lifecycleStateIdentifier !== 'REWORK' &&
                record.lifecycleStateIdentifier !== 'CLOSEEDIT' &&
                record.lifecycleStateIdentifier !== 'RELEASED')),
      }),
    };

    const containerSearch = {
      host: process.env.API_BASE_PATH,
      title: '选择型号',
      selectionType: 'radio',
      columns: dataColumns,
      hideExpert: true,
      onOk: this.handleRepositorysOk,
      onCancel: this.hideRepositorysSearchModal,
      visible: moreRepositorys,
      searchCode: 'name',
      defaultSearch: { requirementEnabled: true },
    };

    return (
      <Content>
        <div className={indexStyle.tableList}>
          <div className={indexStyle.tableListForm}>{this.renderNormalForm()}</div>
        </div>
        <Table
          className={styles.tableEllipsis}
          size="small"
          columns={columns}
          loading={searching}
          scroll={{ y: 500 }}
          dataSource={content}
          rowKey={record => record.id}
          rowSelection={rowSelection}
          pagination={content && content.length ? pagination : false}
          onChange={this.handleTableChange}
          childrenColumnName={null}
        />
        {moreRepositorys && <RepositoryPicker {...containerSearch} />}
      </Content>
    );
  }
}
export default RequirementSearch;

import ResizableTable from '@/components/ResizableTable';
import { CategoryState } from '@/cpdm-components/FormItem';
import Icon from '@/cpdm-components/Icon';
import styles from '@/styles/table_list.less';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { AppstoreOutlined } from '@ant-design/icons';
import { Modal } from '@cpdm/components';
import { Button, Col, Input, layout, message, Row, Space, Tag, Tooltip } from 'antd';
import { RepositoryPicker } from 'cpdm-ui-components';
import moment from 'moment';
import React, { PureComponent } from 'react';
import { connect, Link } from 'umi';
import indexStyle from './index.less';

const { Content } = layout;
@connect(({ requirement, loading }) => ({
  requirement,
  searching:
    loading.effects['requirement/pageRequirements'] ||
    loading.effects['requirement/pageHasAccessRequirements'],
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
    const { repositoryId, id, query = {} } = this.props;
    const params = {
      size: 10,
      ...query,
      repositoryId,
    };
    Object.assign(params, {
      id,
    });

    // if (parentSelectedRows && parentSelectedRows.length) {
    //   Object.assign(params, {
    //     ids: parentSelectedRows.map(item => item.id),
    //   });
    // } else {

    // }

    this.handleSearch({ ...params });
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
    const { dispatch, filter = {}, dataType, query = {}, hasAccess } = this.props;
    if (dataType) {
      Object.assign(param, {
        type: dataType,
      });
    }
    dispatch({
      type: hasAccess ? 'requirement/pageHasAccessRequirements' : 'requirement/pageRequirements',
      payload: {
        ...param,
        ...filter,
        ...query,
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
      query = {},
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
          ...query,
        }),
      );
    });
  };

  handleRepositorysOk = selectedData => {
    const {
      form: { setFieldsValue },
    } = this.props;
    setFieldsValue({
      modelCode: selectedData[0].modelCode,
    });
    this.setState({ moreRepositorys: false });
  };

  hideRepositorysSearchModal = () => {
    this.setState({ moreRepositorys: false });
  };

  // 普通搜索框--已指定数据类型（可通过产品库过滤列表）
  renderNormalForm = () => {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form layout="inline">
        <Row>
          <Col span={24}>
            <Form.Item label="">
              {getFieldDecorator('stateIds')(
                <CategoryState
                  style={{ position: 'relative', top: 6 }}
                  templateName="需求审批工作模板"
                />,
              )}
            </Form.Item>
          </Col>
          <Col span={6} style={{ height: 40 }}>
            <Form.Item label="编号">
              {getFieldDecorator('code')(
                <Input allowClear placeholder="按编号过滤" style={{ width: 200 }} />,
              )}
            </Form.Item>
          </Col>
          <Col span={6} style={{ height: 40 }}>
            <Form.Item label="名称">
              {getFieldDecorator('name')(
                <Input allowClear placeholder="按名称过滤" style={{ width: 200 }} />,
              )}
            </Form.Item>
          </Col>
          <Col span={6} style={{ height: 40 }}>
            <Form.Item label="型号代号">
              {getFieldDecorator('modelCode')(
                <Input
                  allowClear
                  placeholder="按型号代号过滤"
                  style={{ width: 200 }}
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
          <Col span={6} style={{ height: 40 }} className={styles.extraContent}>
            <Form.Item>
              <Button type="primary" onClick={this.handleNormalSearch}>
                查询
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  };

  // 渲染页面
  render() {
    const {
      title,
      searching,
      requirementvisible,
      confirmLoading,
      selectType,
      rowSelect,
      isDisableRowSelect,
    } = this.props;
    const { BASE_PATH } = process.env;
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
        width: 160,
        render: text => (
          <Tooltip placement="topLeft" title={moment(text).format('YYYY-MM-DD HH:mm')}>
            {moment(text).format('YYYY-MM-DD HH:mm')}
          </Tooltip>
        ),
      },
    ];

    const columns = [
      {
        title: '编号',
        dataIndex: 'code',
        width: 200,
        ellipsis: true,
        render: (text, record) => (
          <Tooltip title={record.code} placement="topLeft">
            <Space>
              {record.icon ? (
                <img
                  height="19"
                  style={{ marginRight: 5 }}
                  src={`${BASE_PATH}${record.icon}`}
                  alt=""
                />
              ) : (
                <Icon
                  style={{ width: 16, verticalAlign: 'top' }}
                  name="icons/requirement_icon.png"
                />
              )}
              {record.hasAccess ? (
                <Link
                  className={indexStyle.tableLinkEllipsis}
                  to={`/app/requirement/${record.id}/info`}
                  target="_blank"
                >
                  {text}
                </Link>
              ) : (
                <span className={indexStyle.tableLinkEllipsis}>{text}</span>
              )}
            </Space>
          </Tooltip>
        ),
      },
      {
        title: '名称',
        dataIndex: 'name',
        width: 150,
        ellipsis: true,
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
        width: 60,
        ellipsis: true,
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
        dataIndex: 'lifecycleStateName',
        width: 0,
        ellipsis: true,
        render(text) {
          return (
            <Tooltip title={text} placement="topLeft">
              {text}
            </Tooltip>
          );
        },
      },
      {
        title: '密级',
        width: 80,
        ellipsis: true,
        dataIndex: 'secretLevel',
        render: (text, record) => (
          <Tooltip placement="topLeft" title={record.secretLevel}>
            {record.secretLevel}
          </Tooltip>
        ),
      },
      {
        title: '需求提出方',
        dataIndex: 'source',
        width: 110,
        ellipsis: true,
        render: text => (
          <Tooltip placement="topLeft" title={text}>
            {text}
          </Tooltip>
        ),
      },
      {
        title: '实现者',
        dataIndex: 'implementNames',
        width: 80,
        ellipsis: true,
        render: text => (
          <Tooltip placement="topLeft" title={text}>
            {text}
          </Tooltip>
        ),
      },
      {
        title: '修改时间',
        dataIndex: 'modifyStamp',
        width: 150,
        ellipsis: true,
        render(text) {
          return (
            <Tooltip title={moment(text).format('YYYY-MM-DD HH:mm')} placement="topLeft">
              {moment(text).format('YYYY-MM-DD HH:mm')}
            </Tooltip>
          );
        },
      },
    ];
    const rowSelection = {
      type: selectType,
      selectedRowKeys,
      onChange: (keys, selectedRows) => {
        this.setState({
          selectedRows,
          selectedRowKeys: keys,
        });
      },
      columnWidth: '50px',
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
        <Modal
          title={title}
          visible={requirementvisible}
          onOk={this.onHandler}
          onCancel={this.onCancel}
          width={1200}
          maskClosable={false}
          confirmLoading={confirmLoading}
          destroyOnClose
          className={indexStyle.modal}
        >
          <div className={indexStyle.tableList} style={{ marginBottom: 8 }}>
            <div className={indexStyle.tableListForm}>{this.renderNormalForm()}</div>
          </div>
          <ResizableTable
            className="tableEllipsis"
            columns={columns}
            loading={searching}
            dataSource={content}
            rowKey={record => record.id}
            rowSelection={rowSelection}
            pagination={content && content.length ? pagination : false}
            onChange={this.handleTableChange}
            childrenColumnName={[]}
            scroll={{ x: 1200 }}
          />
        </Modal>
        {/* {moreRepositorys && (
          <RepositorySearchModal
            title="选择型号"
            visible={moreRepositorys}
            onOk={this.handleRepositorysOk}
            onCancel={() => this.setState({ moreRepositorys: false })}
          />
        )} */}
        {moreRepositorys && <RepositoryPicker {...containerSearch} />}
      </Content>
    );
  }
}
export default RequirementSearch;

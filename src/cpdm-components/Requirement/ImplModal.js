import React, { PureComponent } from 'react';
import { connect } from 'umi';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Table, Tooltip, message } from 'antd';
import { Modal } from '@cpdm/components';
// import styles from './index.less';

@connect(({ requirement, loading }) => ({
  requirement,
  loading: loading.effects['requirement/listRequirementLink'],
}))
@Form.create()
class ImplModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  componentDidMount() {
    const { requirementId } = this.props;
    this.setState({
      visible: true,
    });
    this.loadRequirementLink(requirementId);
  }

  // 获取关联的交付
  loadRequirementLink = id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'requirement/listRequirementLink',
      payload: { id },
      callback: response => {
        if (Array.isArray(response)) {
          this.setState({
            relationDatas: response || [],
          });
        }
      },
    });
  };

  // 关闭模态框
  onHandler = () => {
    const { onCancel } = this.props;
    onCancel();
    this.setState({
      visible: false,
    });
  };

  handleRemoveRelation = record => {
    const { dispatch } = this.props;
    const { id } = this.state;
    dispatch({
      type: 'requirement/removeRequirementLink',
      payload: record.linkId,
    }).then(() => {
      message.success('移除成功', 1);
      this.loadRequirementLink(id);
    });
  };

  // 下载附件
  handleDownLoad = record => {
    const { BASE_PATH } = process.env;
    window.open(`${BASE_PATH}/api/v2/requirement/requirements/download/${record.id}`, '_self');
  };

  // 渲染页面
  render() {
    const { title, loading } = this.props;
    const { relationDatas, visible } = this.state;

    // 根据baseType及infoUrl判断是否显示下载附件
    const renderSubject = (text, record) => {
      if (record.baseType === '附件' || !record.infoUrl) {
        return <span>{text}</span>;
      }
      return (
        <a
          style={{ marginRight: 10 }}
          href={`${process.env.BASE_PATH}${record.infoUrl}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {text}
        </a>
      );
    };

    const relationcolumns = [
      {
        title: '标题',
        dataIndex: 'subject',
        width: 220,
        render(text, record) {
          return (
            <Tooltip lines={1} title={text}>
              {renderSubject(text, record)}
            </Tooltip>
          );
        },
      },
      {
        title: '状态',
        dataIndex: 'state',
        width: 110,
        render(text) {
          return (
            <Tooltip title={text} placement="topLeft">
              {text}
            </Tooltip>
          );
        },
      },
      {
        title: '阶段标记',
        dataIndex: 'phaseMark',
        width: 110,
        render(text) {
          return (
            <Tooltip title={text} placement="topLeft">
              {text}
            </Tooltip>
          );
        },
      },
      {
        title: '类型',
        dataIndex: 'baseType',
        width: 85,
        render(text) {
          return (
            <Tooltip title={text} placement="topLeft">
              {text}
            </Tooltip>
          );
        },
      },
      {
        title: '实现状态',
        dataIndex: 'implState',
        width: 100,
        render(text) {
          return (
            <Tooltip title={text} placement="topLeft">
              {text}
            </Tooltip>
          );
        },
      },
      {
        title: '实现说明',
        dataIndex: 'implDescription',
        width: 200,
        render(text) {
          return (
            <Tooltip title={text} placement="topLeft">
              {text}
            </Tooltip>
          );
        },
      },
      {
        title: '操作',
        dataIndex: '操作',
        width: 80,
        render: (text, record) => (
          <span>
            {record.baseType === '附件' && (
              <a onClick={() => this.handleDownLoad(record)} target="_self">
                下载
              </a>
            )}
          </span>
        ),
      },
    ];
    const usercolumns = [
      {
        title: '姓名',
        dataIndex: 'fullName',
        width: 230,
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
        dataIndex: 'secretLevel',
        width: 230,
        render(text) {
          return (
            <Tooltip title={text} placement="topLeft">
              {text}
            </Tooltip>
          );
        },
      },
      {
        title: '部门',
        dataIndex: 'departmentName',
        width: 190,
        render(text) {
          return (
            <Tooltip title={text} placement="topLeft">
              {text}
            </Tooltip>
          );
        },
      },
      {
        title: '实现状态',
        dataIndex: 'enterState',
        width: 200,
      },
      {
        title: '意见',
        dataIndex: 'opinion',
        width: 100,
        render(text) {
          return (
            <Tooltip title={text} placement="topLeft">
              {text}
            </Tooltip>
          );
        },
      },
    ];
    return (
      <Modal
        title={title}
        visible={visible}
        onCancel={this.onHandler}
        width={1000}
        maskClosable={false}
        destroyOnClose
        footer={null}
      >
        <Table
          style={{ width: '100%', tableLayout: 'auto' }}
          rowKey={record => record.id}
          pagination={false}
          dataSource={relationDatas}
          columns={usercolumns}
          loading={loading}
          scroll={{ x: true }}
          size="middle"
          // className={styles.requireTable}
          expandedRowRender={record => (
            <Table
              size="small"
              rowKey={row => row.id}
              columns={relationcolumns}
              dataSource={record.childrens}
              pagination={false}
              scroll={{ x: true }}
            />
          )}
        />
      </Modal>
    );
  }
}
export default ImplModal;

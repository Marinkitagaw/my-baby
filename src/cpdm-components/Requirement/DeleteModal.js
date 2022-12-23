import React, { PureComponent, Fragment } from 'react';
import { connect } from 'umi';
import { Radio, Table, Tooltip, Icon, Card, Checkbox } from 'antd';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Modal } from '@cpdm/components';

@connect(({ requirement, loading }) => ({
  requirement,
  requireStru: requirement.structureRequ,
  loading: loading.effects['requirement/structureRequ'],
}))
@Form.create()
class DeleteModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: 'LATEST_ITERATION',
      deleteSubNodes: false,
      deleteType: 'delete',
    };
  }

  componentDidMount() {
    const { data = {} } = this.props;
    if (data.id) this.getRequireStr(data.id);
  }

  getRequireStr = requireId => {
    const { dispatch } = this.props;
    dispatch({
      type: 'requirement/structureRequ',
      payload: requireId,
    });
  };

  onOk = () => {
    const { onOk } = this.props;
    const { value, deleteType, rowId = [] } = this.state;
    const v = deleteType === 'delete' ? value : value.substring(4);
    onOk(v, deleteType, rowId);
  };

  onCancel = () => {
    const { onCancel } = this.props;
    onCancel();
  };

  onChange = value => {
    this.setState({
      deleteType: 'delete',
      value: value.target.value,
    });
  };

  onDeleteItemChange = e => {
    const v = e.target.value;
    if (v.indexOf('SUB') > -1) {
      this.setState({
        deleteType: 'deleteSub',
        value: e.target.value,
      });
    } else {
      this.setState({
        deleteType: 'delete',
        value: e.target.value,
      });
    }
  };

  onCollectDataChange = e => {
    const v = e.target.checked;
    const { deleteSubNodes } = this.state;
    this.setState({
      deleteSubNodes: !deleteSubNodes,
      refreshKey: Math.random(),
      value: v ? 'SUB_LATEST_ITERATION' : 'LATEST_ITERATION',
      deleteType: v ? 'deleteSub' : 'delete',
    });
  };

  render() {
    const { title, deleteVisible, data = {}, requireStru, loading } = this.props;
    const { actions = {} } = data;
    const { DELETESUB } = actions;

    const { value, deleteSubNodes, refreshKey } = this.state;
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };

    const columns = [
      {
        title: '编号',
        key: 'code',
        dataIndex: 'code',
        width: '30%',
        render: text => (
          <Tooltip title={text} placement="topLeft">
            <Icon type="file" />
            &nbsp;
            {text}
          </Tooltip>
        ),
      },
      {
        title: '名称',
        key: 'name',
        width: '30%',
        dataIndex: 'name',
        render: text => (
          <Tooltip placement="topLeft" title={text}>
            {text}
          </Tooltip>
        ),
      },
      {
        title: '版本',
        dataIndex: 'version',
        render: text => (
          <Tooltip placement="topLeft" title={text}>
            {text}
          </Tooltip>
        ),
      },
      {
        title: '状态',
        key: 'state',
        dataIndex: 'lifecycleStateDisplay',
        render: text => (
          <Tooltip placement="topLeft" title={text}>
            {text}
          </Tooltip>
        ),
      },
    ];

    const renderExtra = (
      <span>
        收集数据：
        <Checkbox onChange={this.onCollectDataChange}>子需求</Checkbox>
      </span>
    );

    const rowSelection = {
      columnWidth: '40px',
      onChange: selecteRowKeys => {
        this.setState({
          rowId: selecteRowKeys,
          // entity: { ...selectedRow[0] },
        });
      },
      getCheckboxProps: record => ({
        disabled: !record.hasDeleteAccess,
      }),
    };

    return (
      <Modal
        destroyOnClose
        title={title}
        maskClosable={false}
        visible={deleteVisible}
        width={720}
        onOk={this.onOk}
        onCancel={this.onCancel}
        confirmLoading={loading}
      >
        <Card type="inner" title="对象列表" extra={DELETESUB === 'ENABLE' && renderExtra}>
          {data.id && (
            <Table
              className="tableEllipsis"
              loading={loading}
              key={refreshKey}
              columns={columns}
              dataSource={deleteSubNodes ? requireStru : [{ ...data, children: null }]}
              pagination={false}
              size="small"
              style={{ marginBottom: 16 }}
              bordered
              rowSelection={deleteSubNodes ? rowSelection : null}
              rowKey={record => record.id}
              defaultExpandAllRows={deleteSubNodes && true}
              childrenColumnName={deleteSubNodes ? 'requirementChildren' : null}
            />
          )}
          <Radio.Group onChange={this.onDeleteItemChange} value={value}>
            {!deleteSubNodes && (
              <Fragment>
                <Radio style={radioStyle} value="LATEST_ITERATION">
                  删除此数据最新小版本
                </Radio>
                <Radio style={radioStyle} value="SINGLE_VERSION">
                  删除此数据当前修订版本
                </Radio>
                <Radio style={radioStyle} value="ALL_VERSIONS">
                  删除此数据所有修订版本
                </Radio>
              </Fragment>
            )}

            {deleteSubNodes && (
              <Fragment>
                <Radio style={radioStyle} value="SUB_LATEST_ITERATION">
                  删除已选数据最新小版本
                </Radio>
                <Radio style={radioStyle} value="SUB_SINGLE_VERSION">
                  删除已选数据当前修订版本
                </Radio>
                <Radio style={radioStyle} value="SUB_ALL_VERSIONS">
                  删除已选数据所有修订版本
                </Radio>
              </Fragment>
            )}
          </Radio.Group>
        </Card>
      </Modal>
    );
  }
}
export default DeleteModal;

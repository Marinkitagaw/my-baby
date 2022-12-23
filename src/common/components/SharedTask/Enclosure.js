import React, { Fragment } from 'react';
import { connect } from 'umi';
import { PlusOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Table, Tooltip, Divider, Row, Col, Select, Input, Upload, message } from 'antd';
import { Modal } from '@cpdm/components';
import moment from 'moment';

const objectTypes = [
  { display: '全部类型', value: 'all' },
  { display: '文档', value: 'Document' },
  { display: '部件', value: 'Part' },
  { display: 'CAD文档', value: 'Drawing' },
  { display: '更改单', value: 'ChangeOrder' },
  { display: '偏离单', value: 'Deviation' },
  { display: '基线', value: 'Baseline' },
  { display: '发送单', value: 'DataSendOrder' },
];

@connect(({ dashboard, dictionary }) => ({
  dashboard,
  content: dashboard.content,
  taskForm: dashboard.taskForm,
  taskFiles: dashboard.taskFiles,
  processFiles: dashboard.processFiles,
  dictEntries: dictionary.dictEntries,
}))
@Form.create()
class Enclosure extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchVisible: false,
      importVisible: false,
      fileList: [],
    };
  }

  componentDidMount() {
    this.onGetFile();
  }

  // 获取文件附件
  onGetFile = () => {
    const { dispatch, taskId, processInstanceId } = this.props;
    dispatch({
      type: processInstanceId ? 'dashboard/getProcessFiles' : 'dashboard/getTaskFiles',
      payload: { taskId, processInstanceId },
    });
    dispatch({
      type: 'dictionary/getDictEntries',
      payload: {
        code: 'SecretLevel,ReviewOrderType,TaskReviewType,TaskIssueType,MeetingDataType,AttendingType,PersonnelLevel',
      },
    });
  };

  // 显示搜索页面
  showDataSearchModal = () => {
    this.setState({ searchVisible: true });
  };

  // 隐藏搜索页面
  hideDataSearchModal = () => {
    this.setState({ searchVisible: false });
  };

  // 搜索关闭
  onCancel = () => {
    const {
      form: { resetFields },
    } = this.props;
    this.hideDataSearchModal();
    resetFields();
  };

  // 搜索
  onSearch = () => {
    const {
      form: { validateFields },
    } = this.props;

    validateFields((err, values) => {
      const { dispatch } = this.props;
      dispatch({
        type: 'search/simpleSearchData',
        payload: {
          ...values,
        },
        callback: (response = {}) => {
          console.log(response);
        },
      });
    });
  };

  // 重置
  onReset = () => {
    const {
      form: { resetFields },
    } = this.props;
    resetFields();
  };

  // 保存附件
  onSaveFile = (info, values) => {
    if (info.size > 1024 * 1024 * 200) {
      return message.error('文件大小不可超过200M');
    }
    const files = {};
    Object.assign(files, { fileId: info.uid, fileName: info.name });
    const { dispatch, taskId } = this.props;
    dispatch({
      type: 'dashboard/saveTaskFiles',
      payload: {
        taskId,
        ...files,
        ...values,
      },
    }).then(() => {
      this.handleImportCancel();
      message.success('上传成功');
    });
    return '';
  };

  // 下载附件
  downloadFile = (fileId, fileName) => {
    const { BASE_PATH } = process.env;
    window.open(`${BASE_PATH}/api/v2/workflow/tasks/download/${fileId}?fileName=${fileName}`);
  };

  // 删除文件
  onDeleteComment = (taskFileId) => {
    const { dispatch, taskId } = this.props;
    dispatch({
      type: 'dashboard/deleteFile',
      payload: {
        taskId,
        taskFileId,
      },
    }).then(() => {
      message.success('保存成功。');
    });
  };

  // 上传附件
  handleUpload = () => {
    const {
      form: { validateFields },
    } = this.props;
    const { fileList } = this.state;
    if (fileList.length === 0) {
      return message.error('请添加附件');
    }
    validateFields((error, values) => {
      if (!error) {
        this.onSaveFile(fileList[0], values);
      }
    });
    return fileList;
  };

  // 取消上传
  handleImportCancel = () => {
    this.setState({ fileList: [], importVisible: false });
  };

  render() {
    const {
      content,
      taskFiles = [],
      form: { getFieldDecorator },
      processInstanceId,
      processFiles,
      dictEntries,
      completed,
    } = this.props;
    const { searchVisible, fileList, importVisible } = this.state;
    const enclosureColumns = [
      {
        title: '名称',
        dataIndex: 'fileName',
        width: 220,
        render: (text) => (
          <Tooltip placement="topLeft" title={text}>
            {text}
          </Tooltip>
        ),
      },
      // {
      //   title: '编号',
      //   dataIndex: 'code',
      //   width: 240,
      //   render: text => (
      //     <Tooltip placement="topLeft" title={text}>
      //       {text}
      //     </Tooltip>
      //   ),
      // },
      // {
      //   title: '版本',
      //   dataIndex: 'reviewDate',
      //   key: 'reviewDate',
      //   width: 200,
      //   render: text => (
      //     <Tooltip placement="topLeft" title={text}>
      //       {text && moment(text).format('YYYY-MM-DD HH:mm')}
      //     </Tooltip>
      //   ),
      // },
      {
        title: '密级',
        dataIndex: 'confidentialityLevelName',
        width: 200,
        render: (text) => (
          <Tooltip placement="topLeft" title={text}>
            {text}
          </Tooltip>
        ),
      },
      {
        title: '创建时间',
        dataIndex: 'createStamp',
        width: 150,
        render(text) {
          return (
            <Tooltip title={text} placement="topLeft">
              {text && moment(text).format('YYYY-MM-DD HH:mm')}
            </Tooltip>
          );
        },
      },
      {
        title: '创建人',
        dataIndex: 'modifyFullName',
        width: 150,
        render(text) {
          return (
            <Tooltip title={text} placement="topLeft">
              {text}
            </Tooltip>
          );
        },
      },
      {
        title: '备注',
        dataIndex: 'description',
        width: 150,
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
        dataIndex: 'operate ',
        key: 'operate ',
        width: 200,
        render: (text, record) => (
          <span>
            <Fragment>
              <a
                disabled={completed}
                onClick={() => this.downloadFile(record.fileId, record.fileName)}
              >
                下载
              </a>
              <Divider type="vertical" />
              <a disabled={completed} onClick={() => this.onDeleteComment(record.id)}>
                删除
              </a>
            </Fragment>
          </span>
        ),
      },
    ];
    const columns = [
      {
        title: '编号',
        dataIndex: 'code',
        sorter: true,
        width: '21%',
        render: (text, record) => (
          <Tooltip title={record.code} placement="topLeft">
            {text}
          </Tooltip>
        ),
      },
      {
        title: '名称',
        dataIndex: 'name',
        sorter: true,
        width: '17%',
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
        title: '阶段标记',
        dataIndex: 'cmat',
        width: 110,
        render: (text) => (
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
    // const This = this;
    const rowSelection = {
      type: 'checkbox',
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(selectedRowKeys, selectedRows);
      },
    };

    // 上传附件
    const uploadProps = {
      //   name: 'file',
      //   action: `${BASE_PATH}/api/workflow/tasks/upload`,
      //   showUploadList: false,
      //   listType: 'text',
      //   headers: {
      //     'Access-Control-Allow-Origin': '*',
      //     'Access-Control-Allow-Methods': 'POST,GET,PUT,OPTIONS,DELETE',
      //     'Access-Control-Allow-Headers':
      //       'Authorization,Content-Type,Access-Control-Allow-Origin,Access-Control-Allow-Methods,Access-Control-Allow-Headers,Access-Control-Allow-Credentials,x-requested-with',
      //   },

      //   onChange(info) {
      //     if (info.file.status === 'uploading') {
      //       //    empty
      //     }
      //     if (info.file.status === 'done') {
      //       // This.handleSaveContents(info.file);
      //       message.success(`${info.file.name} 上传完成。`);
      //       This.onSaveFile(info.file.response);
      //     } else if (info.file.status === 'error') {
      //       message.error(`${info.file.name} 上传失败。`);
      //     }
      //   },
      // };
      // if (process.env.AUTHORIZATION_REQUIRED) {
      //   Object.assign(uploadProps, {
      //     headers: {
      //       authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRfaWQiOiIxMzc4MDQxNjY2NjcxNTc1MDQiLCJzdWIiOiIxNjI3NjI4MDMwMDk0Mjk1MDQiLCJ0ZW5hbnRfbmFtZSI6IuWMl-S6rOWHr-mUkOi_nOaZr-enkeaKgOaciemZkOWFrOWPuCIsImF1dGhvcml0aWVzIjpbIuezu-e7n-euoeeQhuWRmCIsIlJPTEVfR1VFU1QiLCJST0xFX1NZU1RFTV9BRE1JTiJdLCJjbGllbnRfaWQiOiJnYXRld2F5IiwiZnVsbF9uYW1lIjoi57O757uf566h55CG5ZGYIiwidXNlcl9pZCI6IjE2Mjc2MjgwMzAwOTQyOTUwNCIsInNjb3BlIjpbImFwcCJdLCJpZCI6IjE2Mjc2MjgwMzAwOTQyOTUwNCIsImV4cCI6MTU2MDk1NzU2MiwiaWF0IjoxNTYwOTE0MzYyLCJqdGkiOiJjMWYyY2RkNi04Zjg5LTQ3YmYtODU5OC0wMjk4MzAwN2IzZWIiLCJ1c2VybmFtZSI6InN5c3RlbWFkbWluQENvcmlsZWFkIn0.PEzN2Dko__rPtbYWcJWRt4YzQv6b-ugAi3KD5qlg848wxZCBi-kIwTl5oQmtL6MmnfIjYAjAOkBsrEBLFwEsQgJxvLFHBJhYDqSu75Q6Wt66RjlfaKzgOJ70rZVmUq8vig4Cyn3QpQp0qVNE-jTBsU-07OMoXqs8o7jbHy1FUHoexTARoyA3T10Tw1QeQm8WDSZCEG7RwVPulThRS3_Dk9cKMDhJQ2k_vFVDxqyonio3FDEwv0kjaZEDojBUumJ7cJBuogNuOsgSlBAQhPbfy7_SpWZeC4l3dVikoNJMZ8M6agu9Kpy6lN6F2dhJymzWWYfzDqiCNCBm6QwhAoEAoQ`,
      //     },
      //   });
      listType: 'text',
      onChange: (info) => {
        let newFileList = [...info.fileList];
        newFileList = newFileList.slice(-1); // 限制仅能上传一个文件
        this.setState({ fileList: newFileList });
      },
      onRemove: (file) => {
        this.setState((state) => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: (file) => {
        this.setState((state) => ({
          fileList: [...state.fileList, file],
        }));
        return false;
      },
      fileList,
    };

    return (
      <div style={{ marginBottom: 16, marginTop: 16 }}>
        <div
          style={{
            marginBottom: 16,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ fontSize: 18 }}>附件</span>
          <div style={{ display: processInstanceId ? 'none' : 'block' }}>
            {/* <Upload {...uploadProps}> */}
            <Button disabled={completed} onClick={() => this.setState({ importVisible: true })}>
              + 上传附件
            </Button>
            {/* </Upload> */}
            {/* <Button onClick={this.showDataSearchModal} style={{ marginLeft: 8 }}>
              + 关联数据
            </Button> */}
          </div>
        </div>
        <Table
          size="middle"
          columns={
            processInstanceId
              ? enclosureColumns.splice(0, enclosureColumns.length - 1)
              : enclosureColumns
          }
          dataSource={processInstanceId ? processFiles : taskFiles}
          pagination={false}
          scroll={{ y: 240 }}
          // onChange={this.handleTableChange}
        />
        <Modal
          destroyOnClose
          title="添加附件"
          maskClosable={false}
          visible={importVisible}
          onOk={this.handleUpload}
          onCancel={this.handleImportCancel}
        >
          <Upload {...uploadProps} fileList={fileList}>
            <Button icon={<PlusOutlined />}>添加文件</Button>
          </Upload>
          <Form labelCol={{ span: 3 }} wrapperCol={{ span: 18 }} style={{ marginTop: 16 }}>
            <Form.Item label="密级">
              {getFieldDecorator('confidentialityLevel', {
                rules: [{ required: true, message: '请选择密级' }],
              })(
                <Select placeholder="选择密级">
                  {dictEntries.SecretLevel &&
                    dictEntries.SecretLevel.length &&
                    dictEntries.SecretLevel.map((item) => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.name}
                      </Select.Option>
                    ))}
                </Select>,
              )}
            </Form.Item>
            <Form.Item label="备注">
              {getFieldDecorator('description', {
                rules: [
                  {
                    required: false,
                    message: '请输入备注',
                  },
                ],
              })(<Input.TextArea rows={3} placeholder="请输入备注" />)}
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          title="搜索评审对象"
          visible={searchVisible}
          onOk={this.onCancel}
          onCancel={this.onCancel}
          width={1260}
          maskClosable={false}
          destroyOnClose
        >
          <div>
            <Form layout="inline">
              <Row gutter={{ md: 8, lg: 24, xl: 48 }} height={40} style={{ height: 40 }}>
                <Col span={6}>
                  <Form.Item label="数据类型">
                    {getFieldDecorator('objectType')(
                      <Select
                        placeholder="请选择"
                        style={{ width: 170 }}
                        onChange={this.handleObjectType}
                      >
                        {(objectTypes || []).map((type) => (
                          <Select.Option key={type.value}>{type.display}</Select.Option>
                        ))}
                      </Select>,
                    )}
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label="编号">
                    {getFieldDecorator('code')(<Input placeholder="按编号过滤" />)}
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label="名称">
                    {getFieldDecorator('name')(<Input placeholder="按名称过滤" />)}
                  </Form.Item>
                </Col>

                <Col span={6}>
                  <Button type="primary" onClick={this.onSearch}>
                    查询
                  </Button>
                  <Button style={{ marginLeft: 8 }} onClick={this.onReset}>
                    重置
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
          <Table
            style={{ marginTop: 16 }}
            size="small"
            columns={columns}
            dataSource={content}
            rowKey={(record) => record.id}
            rowSelection={rowSelection}
            onChange={this.handleTableChange}
          />
        </Modal>
      </div>
    );
  }
}
export default Enclosure;

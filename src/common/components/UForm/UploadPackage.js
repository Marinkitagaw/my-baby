import React, { Fragment } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { connect } from 'umi';
import { Divider, Upload, Button, message, Table, Select, Popconfirm } from 'antd';

@connect(({ dashboard }) => ({
  dashboard,
}))
class UploadPackage extends React.Component {
  constructor(props) {
    super(props);
    const { value } = this.props;
    this.state = { value };
  }

  static getDerivedStateFromProps(nextProps) {
    const { value } = nextProps;
    // 返回value，当value为空时返回一个空数组
    return { value: value || [] };
  }

  componentDidMount() {}

  // 监听附件属性变化
  onFileAttributeChange = (attr, e, record, index) => {
    const { value } = this.state;
    const row = value[index];
    const key = e.target ? e.target.value : e;
    row[attr] = key;
    this.setState({
      value,
    });
  };

  // 下载附件
  handleDownLoad = (content) => {
    const { BASE_PATH } = process.env;
    window.open(
      `${BASE_PATH}/api/v2/workflow/task-files/${content.fileId}/download?fileName=${content.fileName}`,
      '_self',
    );
  };

  // 移除附件
  handleRemoveContent = (record) => {
    const { value } = this.state;
    const { onChange, dispatch, getTaskFiles1 } = this.props;
    if (record.id) {
      dispatch({
        type: 'dashboard/deleteContent',
        payload: record.id,
        callback: () => {
          getTaskFiles1();
        },
      });
    } else {
      onChange(value.filter((item) => item.originalFileId !== record.originalFileId));
    }
  };

  render() {
    const { value } = this.state;
    const { loading, SecretLevel, processInstanceId, taskId } = this.props;
    // 保存附件
    const handleSaveContents = (info) => {
      const fileSecondary = Object.assign(info, {
        originalFileId: info.response && info.response.objectId,
        length: info.size,
        processInstanceId,
        taskId,
        fileName: info.response.fileName,
        fileId: info.response.objectId,
      });
      const { onChange } = this.props;
      onChange([...value, fileSecondary]);
    };

    const secondaryColumns = [
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
        title: '名称',
        dataIndex: 'fileName',
        width: '30%',
      },
      {
        title: '密级',
        dataIndex: 'confidentialityLevelName',
        width: '30%',
        render: (val, rec, idx) => (
          <div className="ant-legacy-form-item-required" style={{ whiteSpace: 'nowrap' }}>
            <Select
              value={val}
              style={{ width: '90%' }}
              onChange={(values) =>
                this.onFileAttributeChange('confidentialityLevelName', values, rec, idx)
              }
            >
              {SecretLevel &&
                SecretLevel.length > 0 &&
                SecretLevel.map((item) => (
                  <Select.Option value={item.name} key={item.id}>
                    {item.name}
                  </Select.Option>
                ))}
            </Select>
          </div>
        ),
      },
      {
        title: '操作',
        dataIndex: '操作',
        width: '10%',
        render: (text, record) => (
          <span>
            <Popconfirm
              placement="leftBottom"
              title="确定要移除此条数据吗?"
              onConfirm={() => this.handleRemoveContent(record)}
              okText="确定"
              cancelText="取消"
            >
              <a href="#">移除</a>
            </Popconfirm>
            <Divider type="vertical" />
            <a onClick={() => this.handleDownLoad(record)} target="_self">
              下载
            </a>
          </span>
        ),
      },
    ];

    // 上传附件
    const { API_BASE_PATH } = process.env;
    const uploadProps = {
      action: `${API_BASE_PATH}/workflow/upload-task-file`,
      showUploadList: false,
      listType: 'text',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST,GET,PUT,OPTIONS,DELETE',
        'Access-Control-Allow-Headers':
          'Authorization,Content-Type,Access-Control-Allow-Origin,Access-Control-Allow-Methods,Access-Control-Allow-Headers,Access-Control-Allow-Credentials,x-requested-with',
      },
      beforeUpload: (info) => {
        if (info && info.size > 200 * 1024 * 1024) {
          message.warning(`单个文件大小不超过200MB。${info.name} 上传失败。`, 2);
          return false;
        }
        return true;
      },
      onChange(info) {
        let str = false;
        value.map((item) => {
          if (item.name === info.file.name) {
            str = true;
          }
          return str;
        });
        if (info.file.status === 'uploading') {
          // message.success(`${info.file.name} 正在上传...`);
        }
        if (info.file.status === 'done') {
          if (str) {
            message.error(`${info.file.name} 已存在。`);
            return;
          }
          handleSaveContents(info.file);
          message.success(`${info.file.name} 上传完成。`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} 上传失败。`);
        }
      },
    };

    if (process.env.AUTHORIZATION_REQUIRED) {
      Object.assign(uploadProps, {
        headers: {
          authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      });
    }
    return (
      <fieldset style={{ margin: '-20px 30px 0 80px' }}>
        <legend>
          <span style={{ fontSize: 14, color: '#666' }}>附件信息</span>
          <div style={{ float: 'right' }}>
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />} type="primary">
                上传附件
              </Button>
            </Upload>
          </div>
        </legend>
        <Table
          rowKey={(record) => record.originalFileId}
          pagination={false}
          dataSource={value}
          loading={loading}
          columns={secondaryColumns}
          bordered
          size="small"
        />
      </fieldset>
    );
  }
}

export default UploadPackage;

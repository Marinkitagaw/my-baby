import React, { Fragment } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Fieldset } from '@cpdm/components';
import { Input, Upload, Tooltip, Button, message, Table, Select, Popconfirm } from 'antd';

class UploadPackage extends React.Component {
  constructor(props) {
    super(props);
    const { uploadDatas } = this.props;
    this.state = { uploadDatas };
  }

  static getDerivedStateFromProps(nextProps) {
    const { uploadDatas } = nextProps;
    // 返回value，当value为空时返回一个空数组
    return { uploadDatas: uploadDatas || [] };
  }

  componentDidMount() {}

  // 监听附件属性变化
  onFileAttributeChange = (attr, e, record, index) => {
    const { uploadDatas } = this.state;
    const row = uploadDatas[index];
    const key = e.target ? e.target.value : e;
    row[attr] = key;
    this.setState({
      uploadDatas,
    });
  };

  // 移除附件
  handleRemoveContent = record => {
    const { uploadDatas } = this.state;
    const { onChange } = this.props;
    onChange(uploadDatas.filter(item => item.originalFileId !== record.originalFileId));
  };

  render() {
    const { uploadDatas } = this.state;
    const { loading, SecretLevel } = this.props;
    // 保存附件
    const handleSaveContents = info => {
      const fileSecondary = Object.assign(info, {
        originalFileId: info.response && info.response.objectId,
        length: info.size,
        role: 'SECONDARY',
      });
      const { onChange } = this.props;
      onChange([...uploadDatas, fileSecondary]);
    };

    const secondaryColumns = [
      {
        title: '序号',
        key: 'columns',
        align: 'center',
        width: '10%',
        render: (text, record, index) => (
          <Fragment>
            <span>{index + 1}</span>
          </Fragment>
        ),
      },
      {
        title: '名称',
        dataIndex: 'fileName',
        width: '15%',
        ellipsis: true,
        render: text => (
          <Tooltip placement="topLeft" title={text}>
            {text}
          </Tooltip>
        ),
      },
      {
        title: '大小',
        dataIndex: 'fileSize',
        width: '10%',
        // render: (val, rec, idx) => (
        //   <div className="ant-legacy-form-item-required" style={{ whiteSpace: 'nowrap' }}>
        //     <Select
        //       value={val}
        //       style={{ width: '90%' }}
        //       onChange={values => this.onFileAttributeChange('secretLevel', values, rec, idx)}
        //     >
        //       {SecretLevel &&
        //         SecretLevel.length > 0 &&
        //         SecretLevel.map(item => (
        //           <Select.Option value={item.name} key={item.id}>
        //             {item.name}
        //           </Select.Option>
        //         ))}
        //     </Select>
        //   </div>
        // ),
      },
      {
        title: '备注',
        dataIndex: 'description',
        render: (text, record, index) => (
          <Input
            defaultValue={record.description}
            style={{ minHeight: 32, width: '100%' }}
            maxLength={100}
            placeholder="请输入文件备注信息"
            autosize
            onChange={values => this.onFileAttributeChange('description', values, record, index)}
          />
        ),
      },
      {
        title: '操作',
        dataIndex: '操作',
        width: '10%',
        // render: (text, record) => <a onClick={() => this.handleRemoveContent(record)}>移除</a>,
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
          </span>
        ),
      },
    ];

    // 上传附件
    const { API_BASE_PATH } = process.env;
    const uploadProps = {
      action: `${API_BASE_PATH}/resource/resources/upload`,
      showUploadList: false,
      listType: 'text',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST,GET,PUT,OPTIONS,DELETE',
        'Access-Control-Allow-Headers':
          'Authorization,Content-Type,Access-Control-Allow-Origin,Access-Control-Allow-Methods,Access-Control-Allow-Headers,Access-Control-Allow-Credentials,x-requested-with',
      },
      beforeUpload: info => {
        if (info && info.size > 200 * 1024 * 1024) {
          message.warning(`单个文件大小不超过200MB。${info.name} 上传失败。`, 2);
          return false;
        }
        return true;
      },
      onChange(info) {
        let str = false;
        uploadDatas.map(item => {
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
      <Fieldset
        style={{ marginTop: 16 }}
        legend="附件信息"
        extra={
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />} type="primary">
              上传附件
            </Button>
          </Upload>
        }
      >
        <Table
          rowKey={record => record.originalFileId}
          pagination={false}
          dataSource={uploadDatas}
          loading={loading}
          columns={secondaryColumns}
          bordered
          size="small"
          scroll={{ y: 400 }}
        />
      </Fieldset>
    );
  }
}

export default UploadPackage;

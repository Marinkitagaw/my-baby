import React, { Component, Fragment } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Upload, Alert, message, Table } from 'antd';
import { Modal, StandardFormRow } from '@cpdm/components';

const { BASE_PATH } = process.env;
@Form.create()
class ImportModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
    };
  }

  componentDidMount() {}

  // 导入时的确定按钮
  handleUpload = () => {
    const { fileList } = this.state;
    if (fileList.length === 0) {
      return message.error('请添加文件');
    }
    this.onSaveFile(fileList[0]);
    return fileList;
  };

  onSaveFile = info => {
    const { onOk, importParams = {} } = this.props;
    const formData = new FormData();
    const obj = info;
    formData.append('file', obj);
    if (importParams) {
      Object.assign(formData, importParams);
    }
    if (info.size > 1024 * 1024 * 200) {
      return message.error('文件大小不可超过200M');
    }
    const { dispatch, importUrl } = this.props;
    dispatch({
      type: importUrl,
      payload: formData,
      callback: response => {
        if (!response) {
          message.success('导入成功');
          onOk();
        } else {
          message.error('导入失败');
        }
      },
    });
    return '';
  };

  // 导入时的取消按钮
  handleImportCancel = () => {
    const { onCancel } = this.props;
    onCancel();
    this.setState({
      fileList: [],
    });
  };

  // -------------下载模板
  handleDownLoad = () => {
    const { downLoadUrl, noDownload } = this.props;
    window.open(
      `  ${noDownload ? `${downLoadUrl}` : `${BASE_PATH}/api/v2/${downLoadUrl}`}   `,
      '_self'
    );
  };

  // 监听文件变化
  onFileChange = info => {
    const { file } = info;
    if (file.status === 'done') {
      // 上传成功后预览
      this.previewData(file);
      setTimeout(() => {
        this.setState({ uploading: undefined });
      }, 1000);
    } else if (file.status === 'uploading') {
      this.setState({ uploading: info.file });
    }
  };

  // 预览数据
  previewData = file => {
    const {
      dispatch,
      form: { validateFields },
      previewUrl,
    } = this.props;
    if (file.size > 1024 * 1024 * 200) {
      return message.error('文件大小不可超过200M');
    }
    const fileId = file && file.response && file.response.objectId;
    validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: previewUrl,
          payload: {
            formData: {
              ...values,
              fileId,
              fileList: undefined,
            },
          },
          callback: response => {
            if (response) {
              this.setState({
                previewDataSource: response,
              });
            }
          },
        });
      }
    });
    // const file = getFieldValue('fileList')[0];
    this.setState({
      // fileId,
    });
    return '';
  };

  render() {
    const {
      visible,
      title,
      importLoading,
      showPreview,
      columns,
      preLoading,
      noDownload,
      renderNoDownloadInfo,
    } = this.props;
    const { fileList, uploading, previewDataSource = [] } = this.state;
    // 导入的数据
    const uploadProps = {
      listType: 'text',
      accept: '.xls,.xlsx',
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: file => {
        this.setState(state => ({
          fileList: [...state.fileList, file],
        }));
        return false;
      },
      fileList,
    };
    const renderAlertInfo = (
      <Fragment>
        <p>
          1.
          <a onClick={() => this.handleDownLoad()} target="_self">
            下载{title}模板
          </a>
          ，准备导入数据
        </p>
        <p>2. 导入的属性字段请参考模板要求，存在字段不符合规则的，所有数据不予以导入</p>
      </Fragment>
    );

    // 导入条件表单
    const importConditionForm = (
      <StandardFormRow grid last style={{ marginTop: -8, width: '70%' }}>
        <Form.Item label="选择文件 (支持扩展名：.xls和.xlsx)">
          <Upload accept=".xls,.xlsx" {...uploadProps} onChange={this.onFileChange}>
            <Button>
              {uploading && uploading.percent < 100 && `${Math.floor(uploading.percent)}%已上传`}
              {uploading && uploading.percent === 100 && '文件上传完成'}
              {!uploading && (
                <a title="上传并预览">
                  <UploadOutlined /> 上传并预览
                </a>
              )}
            </Button>
          </Upload>
        </Form.Item>
      </StandardFormRow>
    );

    return (
      <Fragment>
        <Modal
          width={showPreview ? 1200 : 600}
          destroyOnClose
          title={title ? `${title}` : '导入数据'}
          maskClosable={false}
          visible={visible}
          onOk={this.handleUpload}
          onCancel={this.handleImportCancel}
          footer={[
            <Button key="cancle" onClick={this.handleImportCancel}>
              取消
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={importLoading}
              onClick={this.handleUpload}
              disabled={!fileList.length}
            >
              导入
            </Button>,
          ]}
        >
          {noDownload ? (
            <Alert
              message="提示信息"
              description={renderNoDownloadInfo}
              type="info"
              style={{ marginBottom: '24px' }}
            />
          ) : (
            <Alert
              message="提示信息"
              description={renderAlertInfo}
              type="info"
              style={{ marginBottom: '24px' }}
            />
          )}
          {showPreview ? (
            importConditionForm
          ) : (
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>上传文件</Button>
            </Upload>
          )}
          {showPreview && (
            <Fragment>
              <div style={{ overflow: 'hidden', lineHeight: '32px' }}>
                <h3 style={{ float: 'left' }}>预览数据</h3>
              </div>
              <Table
                // className={styles.previewTable}
                style={{ marginBottom: 12 }}
                size="small"
                columns={columns}
                rowKey={record => record.id}
                loading={preLoading}
                dataSource={previewDataSource || []}
                pagination={false}
              />
            </Fragment>
          )}
        </Modal>
      </Fragment>
    );
  }
}
export default ImportModal;

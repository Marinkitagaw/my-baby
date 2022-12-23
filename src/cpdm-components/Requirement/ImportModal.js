import React, { PureComponent } from 'react';
import { connect } from 'umi';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Upload, message, Alert } from 'antd';
import { Modal } from '@cpdm/components';

@connect(({ requirement, loading }) => ({
  requirement,
  loading: loading.effects['requirement/requirementPreview'],
}))
class ImportModal extends PureComponent {
  state = {
    fileList: [],
  };

  handleOk = () => {
    const { fileList } = this.state;
    if (fileList.length === 0) {
      return message.error('请添加文件');
    }
    if (fileList.length > 1) {
      return message.error('仅支持上传单个文件');
    }
    // 预览
    this.onPreviewFile(fileList[0]);
    return fileList;
  };

  onPreviewFile = info => {
    const fileStream = new FormData();
    fileStream.append('file', info);
    if (info.size > 1024 * 1024 * 200) {
      return message.error('文件大小不可超过200M');
    }
    const {
      dispatch,
      repositoryId,
      modelSeriesId,
      modelCode,
      productCode,
      partId,
      onOk,
    } = this.props;
    dispatch({
      type: 'requirement/requirementPreview',
      payload: {
        fileStream,
        formData: {
          repositoryId,
          modelSeriesId,
          modelCode,
          productCode,
          partId,
        },
      },
      callback: response => {
        if (Array.isArray(response)) {
          onOk(response);
        } else {
          this.setState({
            importError: response.message,
          });
        }
      },
    });
    return '';
  };

  handleCancel = () => {
    const { onCancel } = this.props;
    onCancel();
    this.setState({
      fileList: [],
    });
  };

  // 下载模板
  handleDownLoad = () => {
    const { BASE_PATH } = process.env;
    window.open(`${BASE_PATH}/api/v2/requirement/requirements/template`, '_self');
  };

  render() {
    const { fileList, importError } = this.state;
    const { title, importVisible, loading } = this.props;
    // 导入

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
        this.setState(() => ({
          fileList: [file],
        }));
        return false;
      },
      fileList,
    };
    return (
      <Modal
        destroyOnClose
        title={title}
        maskClosable={false}
        visible={importVisible}
        onCancel={this.handleCancel}
        footer={[
          <Button key="back" onClick={this.handleCancel}>
            取消
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
            预览
          </Button>,
        ]}
      >
        {importError && (
          <p>
            <Alert message={`预览时发生错误：${importError}`} closable type="error" />
          </p>
        )}
        <p>
          1.{' '}
          <a onClick={() => this.handleDownLoad()} target="_self">
            下载需求导入模板
          </a>
        </p>
        <p>2. 准备导入数据</p>
        <p>3. 导入的需求属性字段请参考模板要求，存在字段不符合规则的，所有数据不予以导入</p>
        <p>4. 选择上传准备好的数据(仅支持Excel格式),点击 ‘预览’ 按钮预览后导入</p>

        <Upload {...uploadProps}>
          <Button icon={<PlusOutlined />}>添加文件</Button>
        </Upload>
      </Modal>
    );
  }
}
export default ImportModal;

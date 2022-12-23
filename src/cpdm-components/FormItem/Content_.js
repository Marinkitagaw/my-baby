/* eslint-disable max-classes-per-file */
import React, { Fragment } from 'react';
import { LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import { Upload, Input, Select, Button } from 'antd';
import { connect } from 'umi';
import TableCard from '@/cpdm-components/TableCard';
import styles from './index.less';

const commonUploadProps = {
  name: 'file',
  showUploadList: false,
  action: `${process.env.API_BASE_PATH}/cpdm/documents/dfs/upload`,
  headers: process.env.AUTHORIZATION_REQUIRED
    ? { authorization: `Bearer ${sessionStorage.getItem('token')}` }
    : undefined,
};

@connect(({ dictionary }) => ({
  dictEntries: dictionary.dictEntries,
}))
class PrimaryContent extends React.PureComponent {
  state = { uploading: undefined };

  onFileChange = info => {
    const { file } = info;
    if (file.status === 'done') {
      const { onChange, secretLevel } = this.props;
      if (onChange) onChange({ ...file.response, secretLevel });
      setTimeout(() => {
        this.setState({ uploading: undefined });
      }, 1000);
    } else if (file.status === 'uploading') {
      this.setState({ uploading: info.file });
    }
  };

  onChangeLevel = level => {
    const { onChange, value } = this.props;
    if (onChange) onChange({ ...value, secretLevel: level });
  };

  remove = () => {
    const { onChange } = this.props;
    if (onChange) onChange(undefined);
  };

  render() {
    const { disabled, value, dictEntries, dispatch, ...rest } = this.props;
    const { SecretLevel } = dictEntries;
    const { uploading } = this.state;
    const upl = (
      <Upload {...commonUploadProps} onChange={this.onFileChange}>
        {uploading && uploading.percent < 100 && `${Math.floor(uploading.percent)}%已上传`}
        {uploading && uploading.percent === 100 && '文件上传完成'}
        {!uploading && (
          <a title="上传新文件">
            <UploadOutlined />
          </a>
        )}
      </Upload>
    );
    const select = value ? (
      <Select
        value={value.secretLevel}
        onChange={this.onChangeLevel}
        dropdownMatchSelectWidth
        style={{ width: 80 }}
        placeholder="密级"
      >
        {(SecretLevel || []).map(level => (
          <Select.Option value={level.value} key={level.value}>
            {level.name}
          </Select.Option>
        ))}
      </Select>
    ) : undefined;
    return (
      <Input
        {...rest}
        className={styles.secretLevelContent}
        value={value ? value.name : undefined}
        disabled
        addonBefore={select}
        addonAfter={!disabled ? upl : undefined}
        suffix={
          value ? (
            <a onClick={this.remove} title="移除主要内容" style={{ color: 'red' }}>
              ×
            </a>
          ) : undefined
        }
      />
    );
  }
}

@connect(({ dictionary }) => ({
  dictEntries: dictionary.dictEntries,
}))
class SecondaryContent extends React.PureComponent {
  state = { uploading: false };

  onFileChange = ({ file }, contentType) => {
    if (file.status === 'done') {
      this.setState({ uploading: false });

      const { onChange, secretLevel, value = [] } = this.props;
      if (contentType === '主要文件') {
        const index = value.findIndex(item => item.contentType === contentType);
        if (index > -1) {
          value.fill({ ...file, ...file.response, secretLevel, contentType }, index, 1);
          if (onChange) onChange([...value]);
        } else {
          onChange([...value, { ...file.response, secretLevel, contentType }]);
        }
      } else if (onChange) {
        onChange([...value, { ...file.response, secretLevel, contentType }]);
      }
    } else if (file.status === 'uploading') {
      const { uploading } = this.state;
      if (!uploading) this.setState({ uploading: true });
    }
  };

  onFilesAttrChange = (attr, val, i) => {
    const { onChange, value } = this.props;
    value[i][attr] = val;
    if (onChange) onChange([...value]);
  };

  remove = record => {
    const { onChange, value } = this.props;
    const content = value.filter(item => item.originalFileId !== record.originalFileId);
    if (onChange) onChange([...content]);
  };

  render() {
    const { disabled, value = [], dictEntries } = this.props;
    const { SecretLevel } = dictEntries;
    const { uploading } = this.state;
    const btn = (
      <Fragment>
        <Upload
          {...commonUploadProps}
          accept=".pdf"
          onChange={f => this.onFileChange(f, '主要文件')}
          multiple
        >
          <Button type="upload" size="small">
            上传主要文件
          </Button>
        </Upload>
        &nbsp;
        <Upload {...commonUploadProps} onChange={f => this.onFileChange(f, '附件')} multiple>
          <Button type="upload" size="small">
            上传附件
          </Button>
        </Upload>
      </Fragment>
    );
    const columns = [
      { key: 'contentType', width: '90px', dataIndex: 'contentType', title: '类型' },
      { key: 'name', dataIndex: 'name', title: '文件名' },
      {
        key: 'secretLevel',
        dataIndex: 'secretLevel',
        title: '密级',
        width: 100,
        align: 'center',
        render: (v, r, i) => (
          <Select
            value={v}
            onChange={val => {
              this.onFilesAttrChange('secretLevel', val, i);
            }}
            dropdownMatchSelectWidth
            style={{ width: 80 }}
            placeholder="密级"
            size="small"
          >
            {(SecretLevel || []).map(level => (
              <Select.Option value={level.value} key={level.value}>
                {level.name}
              </Select.Option>
            ))}
          </Select>
        ),
      },
      {
        key: 'description',
        dataIndex: 'description',
        title: '备注',
        width: '40%',
        render: (v, r, i) => (
          <Input
            size="small"
            value={v}
            onChange={e => {
              this.onFilesAttrChange('description', e.target.value, i);
            }}
          />
        ),
      },
      {
        key: 'action',
        width: 10,
        render: (v, r) => {
          if (disabled) return undefined;
          return (
            <a style={{ color: 'red' }} onClick={() => this.remove(r)}>
              ×
            </a>
          );
        },
      },
    ];
    return (
      <TableCard
        size="small"
        bordered
        columns={columns}
        dataSource={value}
        pagination={false}
        title={
          <div>
            文件
            {uploading ? (
              <span>
                （文件上传中...&nbsp;
                <LoadingOutlined />）
              </span>
            ) : (
              ''
            )}
          </div>
        }
        extra={disabled ? undefined : btn}
        rowKey={r => r.originalFileId}
      />
    );
  }
}

export { PrimaryContent, SecondaryContent };

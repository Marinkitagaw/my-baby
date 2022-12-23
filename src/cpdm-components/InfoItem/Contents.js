import React from 'react';
import { Table, Tooltip } from 'antd';
import moment from 'moment';
import { Fieldset } from '@cpdm/components';

export default props => {
  const { data = {}, objectType, ...rest } = props;
  if (!data) return '';
  const { secondaryContents = [], primaryContent = {}, printContent = {} } = data;
  const secondary = secondaryContents
    ? secondaryContents.map(item => ({ ...item, contentType: item.role }))
    : [];
  const primary = primaryContent.name
    ? Object.assign(primaryContent, { contentType: primaryContent?.role })
    : {};
  const print = printContent.name
    ? Object.assign(printContent, { contentType: printContent?.role })
    : {};
  const Contents = [...secondary];
  if (primary.name) {
    Contents.push(primary);
  }
  if (print.name) {
    Contents.push(print);
  }
  const handleDownLoad = url => {
    window.open(`${process.env.TASK_PATH}${url}`, '_self');
  };

  const previewCol =
    objectType === 'Drawing'
      ? {
          key: 'preview',
          dataIndex: 'preview',
          title: '预览',
          width: 100,
          render: (text, rec) => {
            if (rec.contentType === '签名文件') {
              return (
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={`${rec.downloadUri || ''}?disposition=inline`}
                >
                  在线预览
                </a>
              );
            }
            if (rec.contentType === '主要文件') {
              return (
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={`${process.env.BASE_PATH}/static/viewer/index.html?path=/plm/static/viewer/amdl/Struct.json`}
                >
                  可视化预览
                </a>
              );
            }
            return null;
          },
        }
      : {};
  const columns = [
    { key: 'role', width: '90px', dataIndex: 'role', title: '类型' },
    {
      key: 'name',
      dataIndex: 'name',
      title: '文件名',
      render: (text, record) => (
        <Tooltip placement="topLeft" title={text}>
          <a onClick={() => handleDownLoad(record.downloadUri)} title={text}>
            {text}
          </a>
        </Tooltip>
      ),
    },
    {
      key: 'secretLevel',
      dataIndex: 'secretLevel',
      title: '密级',
      width: 100,
    },
    {
      key: 'description',
      dataIndex: 'description',
      title: '备注',
      width: '40%',
      render: text => (
        <Tooltip placement="topLeft" title={text}>
          {text}
        </Tooltip>
      ),
    },
    { ...previewCol },
    {
      key: 'createStamp',
      dataIndex: 'createStamp',
      title: '创建时间',
      width: 160,
      render(text) {
        return (
          <span placement="topLeft" title={text}>
            {text && moment(text).format('YYYY-MM-DD HH:mm')}
          </span>
        );
      },
    },
  ];
  return (
    <Fieldset legend="文件">
      <Table
        className="tableEllipsis"
        {...rest}
        columns={columns}
        dataSource={Contents || []}
        pagination={false}
        size="small"
        bordered
      />
    </Fieldset>
  );
};

import React from 'react';
import { Descriptions, Input } from 'antd';
import moment from 'moment';

export default props => {
  const { data, ...rest } = props;
  if (!data) return '';

  const handleDownLoad = url => {
    window.open(`${process.env.TASK_PATH}/${url}`, '_self');
  };
  return (
    <React.Fragment>
      {data.primaryContent && (
        <Descriptions {...rest} column={1} title="主要文件" size="small" bordered>
          <Descriptions.Item label="文件名">
            <a onClick={() => handleDownLoad(data.primaryContent.downloadUri)}>
              {data.primaryContent.name}
            </a>
          </Descriptions.Item>
          <Descriptions.Item label="上传时间">
            {moment(data.primaryContent.createStamp).format('YYYY年MM月DD日 HH:mm')}
          </Descriptions.Item>
          <Descriptions.Item label="文件大小">{data.primaryContent.size}</Descriptions.Item>
        </Descriptions>
      )}
      {data.secondaryContents && data.secondaryContents.length && (
        <Descriptions {...rest} column={3} title="附件" size="small" bordered>
          {data.secondaryContents.map(c => [
            <Descriptions.Item label="文件名">
              <a onClick={() => handleDownLoad(c.downloadUri)}>{c.name}</a>
            </Descriptions.Item>,
            <Descriptions.Item label="上传时间">
              {moment(c.createStamp).format('YYYY年MM月DD日 HH:mm')}
            </Descriptions.Item>,
            <Descriptions.Item label="文件大小">{c.size}</Descriptions.Item>,
            <Descriptions.Item label="密级">{c.secretLevel}</Descriptions.Item>,
            <Descriptions.Item label="备注" span={2}>
              <Input.TextArea value={c.description} autoSize />
            </Descriptions.Item>,
          ])}
        </Descriptions>
      )}
    </React.Fragment>
  );
};

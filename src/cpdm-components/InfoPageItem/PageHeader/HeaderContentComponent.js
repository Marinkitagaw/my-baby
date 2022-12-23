import React, { useState } from 'react';
import { Descriptions, Tag, Space } from 'antd';
import moment from 'moment';
import { CurrentParticipators } from '@/pages/ChangeConfiguration/DataSendOrder/CollectingDataModal/CellRenderer';

export default props => {
  const { data, short, handler, setCollaborator, dataType, noCurrentParticipators } = props;
  if (!data) return '';
  const {
    actions: { ADDOWNER = 2 },
  } = data;
  const [collaborators, setCollaborators] = useState(data.collaborators);
  const [editState, setEditState] = useState(false);

  const onClick = () => {
    handler.COLLABORATORS(true);
  };

  const editCollaborators = () => {
    if (collaborators && collaborators.length) {
      setCollaborators(collaborators.map(item => ({ ...item, edit: true })));
      setEditState(true);
    }
  };

  const saveCollaborators = () => {
    if (setCollaborator) {
      setCollaborator(collaborators);
      setEditState(false);
    }
  };

  const onClose = id => {
    setCollaborators(collaborators.filter(co => co.id !== id));
  };

  return (
    <Descriptions column={short ? 2 : 3}>
      {data.creator && data.creator.fullName && (
        <Descriptions.Item label="创建者">{data.creator.fullName}</Descriptions.Item>
      )}
      {data.modifier && data.modifier.fullName && (
        <Descriptions.Item label="修改者">
          {data.modifierFullName || data.modifier.fullName}
        </Descriptions.Item>
      )}
      {
        <Descriptions.Item label="所有者">
          <Space>
            <span>{data.owner && data.owner.fullName}</span>
            {ADDOWNER === 0 && <a onClick={() => handler.ADDOWNER()}>[设置所有者]</a>}
          </Space>
        </Descriptions.Item>
      }
      {data.createStamp && (
        <Descriptions.Item label="创建时间">
          {moment(data.createStamp).format('YYYY年MM月DD日 HH:mm')}
        </Descriptions.Item>
      )}
      {data.modifyStamp && (
        <Descriptions.Item label="修改时间">
          {moment(data.modifyStamp).format('YYYY年MM月DD日 HH:mm')}
        </Descriptions.Item>
      )}
      {
        <Descriptions.Item label="发布时间">
          {data.releaseDate ? moment(data.releaseDate).format('YYYY年MM月DD日 HH:mm') : ''}
        </Descriptions.Item>
      }
      {noCurrentParticipators ? null : (
        <Descriptions.Item label="当前签审人">{CurrentParticipators({ data })}</Descriptions.Item>
      )}
      {dataType === 'DESIGN' && (
        <Descriptions.Item label="协作者">
          {!!collaborators &&
            !!collaborators.length &&
            collaborators.map(item => (
              <Tag onClose={() => onClose(item.id)} closable={item.edit}>
                {item.fullName}
              </Tag>
            ))}
          {ADDOWNER === 0 && (
            <Space>
              {!!collaborators && !!collaborators.length && !editState && (
                <a onClick={editCollaborators}>[编辑]</a>
              )}
              {!!collaborators && !!collaborators.length && (
                <a onClick={() => onClick({ key: 'COLLABORATORS' })}>[添加]</a>
              )}
              {!!collaborators && !!editState && <a onClick={saveCollaborators}>[保存]</a>}
              {!collaborators && <a onClick={() => onClick({ key: 'COLLABORATORS' })}>[设置]</a>}
            </Space>
          )}
        </Descriptions.Item>
      )}
    </Descriptions>
  );
};

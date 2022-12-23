import React, { useState } from 'react';
import { SettingOutlined } from '@ant-design/icons';
import { Input, message } from 'antd';
import { Modal } from '@cpdm/components';
import GridComponents from '@/pages/ChangeConfiguration/DataSendOrder/CollectingDataModal';

const columns = [{ title: '类别标识', key: 'identifier' }];

export default props => {
  const { identifier, title, onOK, ...reset } = props;
  const [visible, setVisible] = useState(false);
  const [aggrid, setAggrid] = useState();

  const saveValue = () => {
    const select = aggrid.getSelectedRows();
    if (Array.isArray(select) && select.length) {
      if (onOK) onOK(select[0]);
      setVisible(false);
    } else {
      message.warning('请至少选择一条数据。');
    }
  };

  return (
    <>
      <Input addonAfter={<SettingOutlined onClick={() => setVisible(true)} />} {...reset} />
      <Modal visible={visible} title={title} onOk={saveValue} onCancel={() => setVisible(false)}>
        <GridComponents
          treeData
          columns={columns}
          groupColumn={{ key: 'name', title: '产品分类' }}
          requestUrl={`/admin/classification-structs/nodes?identifier=${identifier}`}
          noInheritanceUrl
          childrenColumnName="subClassificationNodes"
          suppressRowClickSelection={false}
          onRefs={ag => setAggrid(ag)}
        />
      </Modal>
    </>
  );
};

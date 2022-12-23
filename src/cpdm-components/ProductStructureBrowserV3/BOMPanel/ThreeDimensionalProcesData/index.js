import GridComponents from '@/pages/ChangeConfiguration/DataSendOrder/CollectingDataModal/GridComponents';
import { useState } from 'react';
import { openLink } from '@/services/data/bom';
import { Modal } from '@cpdm/components';
import { ExclamationCircleOutlined } from '@ant-design/icons';

export default ({ type, id, data, dataType, objectType }) => {
  const handleOpenModal = async () => {
    const res = await openLink(id);
    if (res) {
      Modal.confirm({
        title: '即将打开外部应用，是否继续？',
        icon: <ExclamationCircleOutlined />,
        okText: '继续',
        cancelText: '取消',
        onOk() {
          window.open(`SVMAN-A://-o=${res}`, 'linkInfo');
        },
      });
    }
  };
  return (
    <>
      <GridComponents
        treeData={false}
        hideSearch
        requestUrl={`/plm/api/v2/cpdm/content-items?objectType=${objectType}&objectId=${id}&roles=SECONDARY`}
        title="三维工艺数据"
        columns={[
          { title: '序号', dataIndex: 'index', renderType: 'Index' },
          { title: '名称', dataIndex: 'name' },
          { title: '主文件', dataIndex: 'fileName' },
          { title: '上传时间', dataIndex: 'createStamp', renderType: 'TimeStamp' },
        ]}
        actions={[
          {
            label: '查看',
            field: 'a',
            type: 'primary',
            onClick: () => handleOpenModal(),
          },
          {},
        ]}
      />
    </>
  );
};

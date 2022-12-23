import GridComponents from '@/pages/ChangeConfiguration/DataSendOrder/CollectingDataModal/GridComponents';
import { getLinkdClassication, saveLinkdClassication } from '@/services/common';
import { Modal, SplitPane } from '@cpdm/components';
import { uuid } from '@cpdm/util';
import { Card, message, Table } from 'antd';
import { useEffect, useState } from 'react';

export default ({ visible, onCancel, onOk, categoryId }) => {
  const [selected, setSelected] = useState([]);
  const [agGrid, setAgGrid] = useState();
  const [refreshKey, setRefreshKey] = useState('');

  useEffect(() => {
    let unmount = false;

    (async () => {
      const res = await getLinkdClassication({ categoryId });
      if (!unmount && Array.isArray(res)) {
        setSelected(res);
      }
    })();
    return () => {
      unmount = true;
    };
  }, [refreshKey]);

  const saveLink = async () => {
    const rows = agGrid && agGrid.getSelectedRows();
    if (rows.length) {
      const res = await saveLinkdClassication({
        categoryId,
        data: rows.map(item => ({
          classificationStructId: item.structId,
          classificationNodeId: item.id,
        })),
      });
      if (res) {
        setRefreshKey(uuid());
        agGrid.deselectAll();
      }
    } else {
      message.warning('请至少选择一条分类节点。');
    }
  };

  return (
    <Modal width={1000} title="选择分类" visible={visible} onCancel={onCancel} onOk={onOk}>
      <SplitPane width={500}>
        <Card
          type="inner"
          size="small"
          title="分类树"
          className="associatedCard"
          actions={[<span onClick={() => saveLink()}>关联</span>]}
          bodyStyle={{
            height: '60vh',
            overflow: 'auto',
          }}
        >
          <GridComponents
            treeData
            requestUrl="/admin/classification-structs?size=100"
            subStructureUrl="/admin/classification-structs/:id/nodes"
            groupColumn={{
              title: '名称',
              key: 'name',
              width: 500,
            }}
            columns={[]}
            rowSelectionType="multiple"
            childrenColumnName="id"
            onRefs={ag => setAgGrid(ag)}
          />
        </Card>
        <Card
          type="inner"
          size="small"
          title="已选择分类"
          actions={[<span style={{ color: 'red' }}> 解除关联</span>]}
          bodyStyle={{
            height: '60vh',
            overflow: 'auto',
          }}
        >
          <Table
            size="small"
            bordered
            columns={[{ title: '标题', dataIndex: 'name' }]}
            dataSource={[...selected]}
            rowKey="id"
            rowSelection={{
              type: 'checkbox',
            }}
            showHeader={false}
            pagination={false}
          />
        </Card>
      </SplitPane>
    </Modal>
  );
};

import React from 'react';
import { Drawer, Table, Tooltip, Dropdown, Menu } from 'antd';
import { FileTextOutlined, PlusSquareOutlined, DownOutlined } from '@ant-design/icons';
import { Link } from 'umi';
import moment from 'moment';
import { stringify } from 'qs';
import { Fieldset } from '@cpdm/components';
import styles from '@/styles/common.less';
import func from '@/utils/Func';

const columns = [
  {
    title: '编号',
    dataIndex: 'code',
    width: '20%',
    render(text, record) {
      const { relationshipData = {} } = record;
      const objectType = relationshipData.objectType || record.objectType;
      const objectId = relationshipData.id || record.id;
      return (
        <Tooltip placement="topLeft" title={text || relationshipData.code}>
          <Link to={`${func.urlForInfo(objectType, objectId)}`} target="_blank">
            {record.code || relationshipData.code}
          </Link>
        </Tooltip>
      );
    },
  },
  {
    title: '名称',
    dataIndex: 'name',
    width: '20%',
    render(text, record) {
      const { relationshipData = {} } = record;
      return (
        <Tooltip placement="topLeft" title={text || relationshipData.name}>
          {text || relationshipData.name}
        </Tooltip>
      );
    },
  },
  {
    title: '状态',
    dataIndex: 'lifecycleStateName',
    width: 90,
    render(text, record) {
      return (
        <Tooltip placement="topLeft" title={text || record.lifecycleStateDisplay || record.state}>
          {text || record.lifecycleStateDisplay || record.state}
        </Tooltip>
      );
    },
  },
  {
    title: '阶段标记',
    dataIndex: 'phaseMarkDisplay',
    key: 'phaseMark',
    width: 90,
    render(text, record) {
      const { relationshipData = {} } = record;
      return (
        <Tooltip placement="topLeft" title={text || relationshipData.phaseMarkDisplay}>
          {text || relationshipData.phaseMarkDisplay}
        </Tooltip>
      );
    },
  },
  {
    title: '库',
    width: 135,
    dataIndex: 'repositoryName',
    render(text, record = {}) {
      const { relationshipData = {} } = record;
      return (
        <Tooltip
          placement="topLeft"
          title={text || record.containerName || relationshipData.repositoryName}
        >
          {text || record.containerName || relationshipData.repositoryName}
        </Tooltip>
      );
    },
  },
  {
    title: '修改者',
    dataIndex: 'modifierFullName',
    width: 60,
    render(text, record = {}) {
      const { relationshipData = {} } = record;
      return (
        <Tooltip placement="topLeft" title={text || relationshipData.modifierFullName}>
          {text || relationshipData.modifierFullName}
        </Tooltip>
      );
    },
  },
  {
    title: '修改时间',
    dataIndex: 'modifyStamp',
    width: 135,
    render(text, record = {}) {
      const { relationshipData = {} } = record;
      return (
        <Tooltip
          placement="topLeft"
          title={text || moment(relationshipData.modifyStamp).format('YYYY-MM-DD HH:mm')}
        >
          {(text && moment(text).format('YYYY-MM-DD HH:mm')) ||
            (relationshipData.modifyStamp &&
              moment(relationshipData.modifyStamp).format('YYYY-MM-DD HH:mm'))}
        </Tooltip>
      );
    },
  },
];
export default props => {
  const { visible, changeRecords = [], Documents = [], onClose, clickedRecord = {} } = props;
  const query = {
    id: clickedRecord.id,
    subject:
      clickedRecord.subject ||
      `${clickedRecord.code},${clickedRecord.name},${clickedRecord.version}`,
  };
  const handleMenuClick = e => {
    console.log('e', e.key);
  };

  const addmenu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="create-document">
        <Link
          target="_blank"
          to={`/data/document/create${stringify(query, { addQueryPrefix: true })}`}
        >
          <FileTextOutlined />
          &nbsp;新建文档
        </Link>
      </Menu.Item>
    </Menu>
  );
  return (
    <Drawer visible={visible} title="相关数据" width={800} onClose={onClose}>
      <Fieldset
        legend="相关文档"
        extra={
          <Dropdown overlay={addmenu}>
            <a>
              <PlusSquareOutlined />
              &nbsp;添加数据 <DownOutlined />
              {/* <Icon size="small" type="down" /> */}
            </a>
          </Dropdown>
        }
      >
        <Table
          size="small"
          dataSource={Documents}
          className={styles.tableEllipsis}
          rowKey={record => record.id}
          pagination={false}
          columns={columns}
        />
      </Fieldset>
      <Fieldset style={{ margin: '20px 0' }} legend="相关更改单">
        <Table
          size="small"
          dataSource={changeRecords}
          className={styles.tableEllipsis}
          rowKey={record => record.id}
          pagination={false}
          columns={columns}
        />
      </Fieldset>
    </Drawer>
  );
};

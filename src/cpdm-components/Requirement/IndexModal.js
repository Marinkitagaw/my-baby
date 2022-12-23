import { isBlank } from '@/utils/StringUtils';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import {
  BookOutlined,
  CloseSquareOutlined,
  FolderFilled,
  FormOutlined,
  MinusSquareOutlined,
  PlusSquareOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import { Modal } from '@cpdm/components';
import { Button, Card, Input, Layout, notification, Table, Tooltip, TreeSelect } from 'antd';
import React from 'react';
import { connect } from 'umi';
import style from './index.less';

const { TreeNode } = TreeSelect;

@Form.create()
@connect(({ requirement, targetLib, loading }) => ({
  requirement,
  library: targetLib.library,
  targets: targetLib.targets,
  loading: loading.effects['targetLib/library'],
}))
class IndexModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temp: props.indexDatas ? JSON.parse(JSON.stringify(props.indexDatas)) : [],
      err: [],
      treeData: [],
      expandedKeys: [],
      selectedRowKeys: [],
    };
  }

  componentDidMount() {
    this.library();
  }

  library = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'targetLib/library',
      callback: this.init,
    });
  };

  init = () => {
    const { library = [] } = this.props;
    this.setState({
      treeData: library,
    });
  };

  children = ({ parentId }) => {
    const { dispatch, readOnly, targetType } = this.props;
    const { treeData, expandedKeys } = this.state;
    dispatch({
      type: 'targetLib/library',
      payload: {
        parentId,
        type: readOnly && targetType,
      },
      callback: res => {
        const parent = this.findParent(treeData, parentId);
        if (parent) {
          parent.children = res.map(item => ({
            ...item,
            children: item.children ? [] : undefined,
          }));
          this.setState({
            treeData: [...treeData],
            selected: parentId,
            expandedKeys: [...expandedKeys, parentId],
          });
        }
      },
    });
  };

  refreshData = () => {
    const { parentId } = this.state;
    if (parentId === '-1' || !parentId) {
      this.setState({ selected: undefined, parentId: undefined });
      this.library();
    } else {
      this.children({ parentId });
    }
  };

  clear = () => {
    this.setState({ temp: [], err: [], items: [] });
  };

  save = () => {
    const { temp } = this.state;
    const { onOk, readOnly } = this.props;
    if (readOnly) {
      onOk(temp);
      this.clear();
    }

    if (this.validate()) {
      onOk(temp);
      this.clear();
    } else {
      notification.error({
        message: '错误',
        description: '请完善需要填写的内容',
      });
    }
  };

  validate = () => {
    const { temp } = this.state;
    let err;

    err = temp.map((target, index) => {
      if (isBlank(target.indexName) || isBlank(target.indexValue)) {
        return index;
      }
      return null;
    });
    err = err.filter(e => e !== null);
    this.setState({ err });
    return !err.length;
  };

  createFromLibrary = () => {
    const { temp, selectedRows = [] } = this.state;
    selectedRows.map(record => {
      if (!temp.some(item => item.indexName === record.name)) {
        temp.push({
          indexName: record.name,
          id: record.id,
        });
      }
      return temp;
    });
    this.setState({ temp: [...temp] });
  };

  contains = (list, record) => {
    return list.filter(i => i.indexName === record.name);
  };

  create = () => {
    const { temp } = this.state;
    temp.push({
      indexName: '',
      indexValue: '',
    });
    this.setState({ temp: [...temp] });
  };

  delete = idx => {
    const { temp } = this.state;
    temp.splice(idx, 1);
    this.setState({ temp: [...temp] });
  };

  close = () => {
    const { onCancel } = this.props;
    this.clear();
    onCancel();
  };

  onChange = (value, field, index) => {
    const { temp } = this.state;
    const newObj = { ...temp[index] };
    newObj[field] = value;
    temp.splice(index, 1, newObj);
    this.setState({ temp: [...temp] });
  };

  onSelect = keys => {
    this.library({
      type: keys,
    });
    this.setState({
      selectedRowKeys: [],
      selectedRows: [],
    });
  };

  renderScope = data =>
    data.map(item => {
      const { nodeData } = item;
      const props = { title: nodeData.name, key: item.nodeId, value: item.nodeId };
      if (item.children && item.children.length) {
        return <TreeNode {...props}>{this.renderScope(item.children)}</TreeNode>;
      }
      return <TreeNode {...props} />;
    });

  targetChildren = params => {
    const { dispatch } = this.props;
    const { items, expandedKeys, views = [], selected } = this.state;
    this.setState({ selected: params.parentId }, () => {
      const parent = this.findParent(items, params.parentId);
      dispatch({
        type: 'targetLib/targetChildren',
        payload: {
          parentId: params.parentId || selected,
          catalogs: views.join(','),
        },
        callback: res => {
          parent.children = res.map(item => ({
            ...item,
            // parentId: params.parentId,
            children: item.children ? [] : undefined,
          }));
          this.setState({
            items: [...items],
            expandedKeys: [...expandedKeys, params.parentId],
          });
        },
      });
    });
  };

  findParent = (dataSource, selectedId) => {
    let parent;
    dataSource.forEach(item => {
      if (item.id === selectedId) {
        parent = item;
      } else if (item.children && item.children.length > 0) {
        parent = this.findParent(item.children, selectedId);
      }
    });
    return parent;
  };

  render() {
    const { visible, loading, creating, library, readOnly } = this.props;
    const libraryItem = library && library.length && library[0].children;
    const {
      temp,
      err,
      selectedRowKeys = [],
      expandedKeys,
      treeData,
      selected,
      onChange,
    } = this.state;

    const columns = [
      {
        key: 'err',
        width: 30,
        render: (val, row, idx) =>
          err.includes(idx) ? (
            <span title="信息填写不完整" style={{ color: 'red' }}>
              <WarningOutlined />
            </span>
          ) : null,
      },
      {
        title: '名称',
        dataIndex: 'indexName',
        key: 'indexName',
        render: (val, row, idx) => (
          <Input
            value={val}
            maxLength={100}
            size="small"
            onChange={({ target: { value } }) => this.onChange(value, 'indexName', idx)}
          />
        ),
      },
      {
        title: '指标值',
        dataIndex: 'indexValue',
        key: 'indexValue',
        render: (val, row, idx) => (
          <Input
            value={val}
            maxLength={100}
            size="small"
            onChange={({ target: { value } }) => this.onChange(value, 'indexValue', idx)}
          />
        ),
      },
      {
        key: 'actions',
        width: 20,
        render: (val, row, idx) => (
          <a onClick={() => this.delete(idx)}>
            <CloseSquareOutlined />
          </a>
        ),
      },
    ];

    const readOnlyColumns = [
      {
        title: '名称',
        dataIndex: 'indexName',
        key: 'indexName',
      },
      {
        key: 'actions',
        width: 20,
        render: (val, row, idx) => (
          <a onClick={() => this.delete(idx)}>
            <CloseSquareOutlined />
          </a>
        ),
      },
    ];

    const extra = (
      <TreeSelect
        style={{ width: 140 }}
        placeholder="请选择指标"
        treeDefaultExpandAll
        onSelect={groupId => {
          this.groupItems({ groupId });
        }}
        size="small"
      >
        {libraryItem && this.renderScope(libraryItem)}
      </TreeSelect>
    );

    const nameColumns = [
      {
        title: '指标/分组名称',
        dataIndex: 'name',
        key: 'name',
        render: (v, r) => {
          const icon =
            !v || !r.asTarget ? (
              <FolderFilled style={{ color: 'orange' }} title="指标分组" />
            ) : (
              <BookOutlined title="指标" />
            );
          return (
            <Tooltip title={v}>
              {icon} {v}
            </Tooltip>
          );
        },
      },
    ];

    const ResizableTableProps = {
      dataSource: treeData,
      loading,
      rowKey: r => r.id,
      expandedRowKeys: expandedKeys,
      onExpand: (expanded, record) => {
        if (expanded) {
          if (record.children && record.children.length) {
            this.setState({ expandedKeys: [...expandedKeys, record.id] });
          } else {
            this.children({ parentId: record.id });
          }
        } else {
          this.setState({ expandedKeys: expandedKeys.filter(item => item !== record.id) });
        }
      },
      onRow: record => {
        return {
          onClick: () => {
            if (selected === record.id) {
              this.setState({ selected: undefined, selectedData: undefined });
            } else {
              this.setState({ selected: record.id, selectedData: record });
            }
          },
        };
      },
      className: 'tableEllipsis',
      size: 'small',
      pagination: false,
      expandable: {
        expandIcon: ({ expanded, onExpand, record }) =>
          record.children &&
          (expanded ? (
            <MinusSquareOutlined
              style={{ marginRight: 6, fontSize: 16, color: '#1890ff' }}
              onClick={e => onExpand(record, e)}
            />
          ) : (
            <PlusSquareOutlined
              style={{ marginRight: 6, fontSize: 16, color: '#1890ff' }}
              onClick={e => onExpand(record, e)}
            />
          )),
      },
    };

    const readOnlyResizableTableProps = {
      ...ResizableTableProps,
      columns: [...nameColumns],
      rowSelection: {
        selectedRowKeys,
        columnWidth: 40,
        onChange: (keys, rows) => {
          this.setState({ selectedRowKeys: keys, selectedRows: rows }, () => {
            if (onChange) onChange(rows);
          });
        },
        getCheckboxProps: (record = {}) => ({
          disabled: !record.asTarget,
        }),
      },
    };

    return (
      <Modal
        width={1024}
        title="添加指标"
        visible={visible}
        onCancel={this.close}
        onOk={() => {
          if (!temp.length) {
            message.warning('请至少选择一条数据。');
          } else {
            this.save();
          }
        }}
        okButtonProps={{ loading: creating, disabled: !temp.length }}
        cancelButtonProps={{ disabled: creating }}
        className={style.indexModal}
      >
        <div>
          <Layout>
            <Layout.Sider theme="light" width={320}>
              <Card
                size="small"
                title="从指标库选择"
                bodyStyle={{
                  height: 459,
                  overflow: 'auto',
                  padding: 0,
                  marginTop: 1,
                }}
                bordered={false}
                extra={extra}
                type="inner"
              >
                <Table {...readOnlyResizableTableProps} />
              </Card>

              <div style={{ borderTop: '1px solid #ddd', textAlign: 'right', padding: 8 }}>
                <Button.Group size="small">
                  <Button onClick={this.createFromLibrary} type="primary">
                    添加
                  </Button>
                </Button.Group>
              </div>
            </Layout.Sider>
            <Layout.Content>
              <Card
                className={style.indexCard}
                title="已添加指标"
                type="inner"
                size="small"
                bordered={false}
                bodyStyle={{
                  height: 500,
                  overflow: 'auto',
                  background: '#fff',
                  borderLeft: '1px solid #ddd',
                  padding: 0,
                  marginTop: 1,
                }}
                extra={
                  !readOnly && (
                    <Button size="small" icon={<FormOutlined />} onClick={this.create}>
                      手工输入新指标
                    </Button>
                  )
                }
              >
                <Table
                  size="middle"
                  columns={readOnly ? readOnlyColumns : columns}
                  dataSource={temp}
                  rowKey={r => r.uuid}
                  pagination={false}
                />
              </Card>
            </Layout.Content>
          </Layout>
        </div>
      </Modal>
    );
  }
}

export default IndexModal;

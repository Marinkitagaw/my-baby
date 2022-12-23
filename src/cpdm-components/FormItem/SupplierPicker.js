import React from 'react';
import { connect } from 'umi';
import { WarningOutlined } from '@ant-design/icons';
import { Modal } from '@cpdm/components';
import { Card, Tree } from 'antd';

const { TreeNode } = Tree;

@connect(({ common, loading }) => ({
  common,
  suppliersLoading: loading.effects['common/getSuppliers'],
}))
class DeModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedKeys: [],
      currentOrg: {},
      expandedKeys: [],
    };
    this.cacheData = [].map(item => ({ ...item }));
  }

  componentDidMount() {
    this.showModelHandler();
  }

  // 展开树节点
  onExpandSupplier = expandedKeys => {
    this.setState({
      expandedKeys,
    });
  };

  // 单位树选择
  handleSelect = (selectedKeys, e) => {
    if (!e.selected) {
      return;
    }
    this.setState({ currentOrg: e.node.props.dataRef.data, selectedKeys });
  };

  // 显示modal控件
  showModelHandler = e => {
    if (e) e.stopPropagation();
    const { dispatch, records = {} } = this.props;
    const { deliveries = [] } = records;
    this.setState({
      tableList: deliveries,
    });
    dispatch({
      type: 'common/getSuppliers',
      payload: {
        parentId: 0,
      },
    }).then(() => {
      const { common = {} } = this.props;
      const { suppliers = [] } = common;
      const supplierList = [];
      suppliers.forEach(element => {
        supplierList.push(element);
      });
      this.setState({
        treeData: [...supplierList],
      });
    });
  };

  // Modal点击确定
  handleOk = () => {
    const { onOk } = this.props;
    const { currentOrg } = this.state;
    onOk(currentOrg);
  };

  // Modal点击取消
  handleCancel = () => {
    const { onCancel } = this.props;
    if (onCancel) onCancel();
  };

  // 接收设置中列的编辑
  handleColumnsEdit = key => {
    const { tableList } = this.state;
    const newData = [...tableList];
    const target = newData.filter(item => key === item.destinationOrgId)[0];
    if (target) {
      target.editable = true;
      this.setState({ tableList: newData });
    }
  };

  // 加载协同单位子节点
  loadChildrenData = treeNode =>
    new Promise(resolve => {
      const { dispatch } = this.props;
      const { treeData } = this.state;
      dispatch({
        type: 'common/SupplierChildren',
        payload: {
          parentId: treeNode.props.dataRef.key || treeNode.props.dataRef.id,
        },
        callback: res => {
          this.setState({
            treeData: this.updateTreeData(treeData, treeNode.props.eventKey, res),
          });
          resolve();
        },
      });
    });

  updateTreeData = (list, key, children) => {
    return list.map(node => {
      if (node.id === key) {
        return { ...node, children };
      }
      if (node.children && Array.isArray(node.children)) {
        return { ...node, children: this.updateTreeData(node.children, key, children) };
      }

      return node;
    });
  };

  renderTreeNodes = data =>
    data &&
    Array.isArray(data) &&
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.data.name} key={item.id} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} title={item.data.name} key={item.id} dataRef={item} />;
    });

  render() {
    const { title, visible } = this.props;
    const { treeData = [], expandedKeys, selectedKeys } = this.state;

    return (
      <>
        <Modal
          title={title}
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          destroyOnClose
          maskClosable={false}
        >
          <Card type="inner" title="接收单位" size="small">
            {(Array.isArray(treeData) ? treeData : []).length ? (
              <Tree
                defaultExpandedKeys={['0']}
                expandedKeys={expandedKeys}
                selectedKeys={selectedKeys}
                loadData={this.loadChildrenData}
                onSelect={this.handleSelect}
                onExpand={this.onExpandSupplier}
              >
                {this.renderTreeNodes(treeData)}
              </Tree>
            ) : (
              <span style={{ display: 'inline-block', color: '#e48d1d' }}>
                <WarningOutlined style={{ marginRight: 6 }} />
                暂未查询到相关数据！
              </span>
            )}
          </Card>
        </Modal>
      </>
    );
  }
}

export default DeModal;

import React, { PureComponent } from 'react';
import { connect } from 'umi';
import { Card, Tree } from 'antd';
import { Modal } from '@cpdm/components';
import treeFolder from '@/assets/tree-folder.png';
import style from './index.less';

@connect(({ loading }) => ({
  folderLoading: loading.effects['repository/loadFolderTree'],
}))
class FolderSearchModal extends PureComponent {
  constructor(props) {
    super(props);
    const {
      selectedRepository: { name, id },
    } = this.props;
    this.state = {
      treeData: [],
      targetLocationDisplay: [name],
      targetLocationId: [id],
      expandedKeys: [],
    };
  }

  componentDidMount() {
    const { selectedRepository = {} } = this.props;
    this.loadFolderTree(selectedRepository.id);
  }

  onExpandNode = keys => {
    this.setState({ expandedKeys: keys });
  };

  onSelectNode = ([key], event) => {
    if (event.selected) {
      this.setState({
        targetLocationId: [key],
        targetLocationDisplay: event.node.props.dataRef.position || [
          event.node.props.dataRef.title,
        ],
      });
    }
  };

  // 加载文件夹树
  loadFolderTree = repositoryId => {
    const { dispatch } = this.props;
    dispatch({
      type: 'repository/loadFolderTree',
      payload: {
        repositoryId,
      },
      callback: (response = {}) => {
        if (!(response.status === 500)) {
          this.setState({
            treeData: response,
            expandedKeys: [response[0].key],
          });
        } else {
          this.setState({
            treeData: [],
          });
        }
      },
    });
  };

  // tree 加载子节点
  loadChildrenData = treeNode =>
    new Promise(resolve => {
      const { dispatch } = this.props;
      const { treeData } = this.state;
      if (treeNode.props.children) {
        return;
      }
      dispatch({
        type: 'repository/loadFolderTree',
        payload: {
          parentId: treeNode.props.eventKey,
        },
        callback: response => {
          const rep = response.map(item => {
            Object.assign(item, {
              position: treeNode.props.dataRef.position
                ? [...treeNode.props.dataRef.position, item.title]
                : [...[treeNode.props.dataRef.title], item.title],
            });
            return item;
          });
          Object.assign(treeNode.props.dataRef, {
            children: rep || [],
          });
          this.setState({
            treeData: [...treeData],
          });
          resolve();
        },
      });
    });

  handleModalOnOk = () => {
    const { targetLocationDisplay, targetLocationId } = this.state;
    const { onOk } = this.props;
    onOk(targetLocationDisplay, targetLocationId);
  };

  renderTreeNodes = data =>
    Array.isArray(data) &&
    data.map(item => {
      if (item.children) {
        return (
          <Tree.TreeNode
            title={item.title}
            icon={() => (
              <img style={{ width: 26, height: 24, marginTop: -5 }} src={treeFolder} alt="文件夹" />
            )}
            key={item.key}
            dataRef={item}
          >
            {this.renderTreeNodes(item.children)}
          </Tree.TreeNode>
        );
      }
      return (
        <Tree.TreeNode
          {...item}
          key={item.key}
          icon={() => (
            <img src={treeFolder} style={{ width: 26, height: 24, marginTop: -5 }} alt="文件夹" />
          )}
          dataRef={item}
          title={<span style={{ marginLeft: 5 }}>{item.title || item.text}</span>}
        />
      );
    });

  render() {
    const { visible, title, onCancel, confirmLoading } = this.props;
    const { targetLocationDisplay, expandedKeys, treeData } = this.state;

    return (
      <Modal
        maskClosable={false}
        destroyOnClose
        title={title}
        visible={visible}
        onCancel={onCancel}
        confirmLoading={!!confirmLoading}
        onOk={this.handleModalOnOk}
      >
        <p>
          目标位置：
          {`${
            targetLocationDisplay.length === 1
              ? `${targetLocationDisplay[0]}/`
              : targetLocationDisplay.join('/')
          }`}
        </p>
        <Card className={style.foldCard}>
          <Tree
            showIcon
            expandedKeys={expandedKeys}
            onSelect={this.onSelectNode}
            onExpand={this.onExpandNode}
            loadData={this.loadChildrenData}
          >
            {this.renderTreeNodes(treeData)}
          </Tree>
        </Card>
      </Modal>
    );
  }
}
export default FolderSearchModal;

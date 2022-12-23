import React from 'react';
import { stringify } from 'qs';
import { Layout } from 'antd';
import { request } from '@cpdm/util';
import Structure from './Structure';

export async function loadStructureRequest(partId, criteria) {
  return request(`/cpdm/psb/${partId}/structure${stringify(criteria, { addQueryPrefix: true })}`);
}

class StructureWrapper extends React.PureComponent {
  constructor(props) {
    super(props);
    const { width } = this.props;
    this.state = {
      siderWidth: width || 400,
      left: undefined,
      resizing: false,
      stru: [],
      expandedNodeIds: [],
    };
  }

  componentDidMount() {
    this.loadStructure(null);
    const { getMe } = this.props;
    if (getMe) getMe(this);
  }

  componentWillUnmount = () => {
    this.setState = () => {};
  };

  onMouseDown = e => {
    const { siderWidth } = this.state;
    this.setState({ resizing: true, left: e.clientX - siderWidth });
  };

  onMouseUp = () => {
    this.setState({ resizing: false, left: undefined });
  };

  onMouseMove = e => {
    const { resizing, left } = this.state;
    if (resizing) {
      if (window.getSelection) window.getSelection().removeAllRanges();
      else document.selection.empty();
      const move = e.clientX - left;
      this.setState({ siderWidth: move });
    }
  };

  loadStructure = async (parentNode, reload) => {
    this.setState({ loading: true });
    const { criteria, root, getDataFn } = this.props;
    const partId = parentNode ? parentNode.nodeData.id : root;
    const loaded = parentNode ? parentNode.childrenLoaded : false;
    if (loaded && !reload) {
      this.setState({ loading: false });
      return;
    }
    const { objectTypes = ['PartUsage'] } = criteria;
    let resp;
    if (getDataFn) {
      resp = await getDataFn(partId, {
        node: true,
        // 0只加载当前节点 1只加载子节点 2当前节点和子节点一起加载
        loadMode: parentNode ? 1 : 2,
      });
    } else {
      resp = await loadStructureRequest(partId, {
        ...criteria,
        objectTypes: objectTypes.join(','),
        node: true,
        // 0只加载当前节点 1只加载子节点 2当前节点和子节点一起加载
        loadMode: parentNode ? 1 : 2,
      });
    }

    (res => {
      if (res && Array.isArray(res)) {
        if (parentNode) {
          const { stru } = this.state;
          Object.assign(parentNode, {
            childrenLoaded: true,
            children: res.length ? res.map(item => ({ ...item, nodeData: item })) : undefined,
            nodeData: { ...parentNode },
          });
          this.setState({ stru: [...stru], loading: false });
        } else {
          this.setState({
            stru: res.map(item => ({
              ...item,
              nodeData: item,
              children:
                item.children && item.children.length
                  ? item.children.map(c => ({ ...c, nodeData: c }))
                  : null,
            })),
            expandedNodeIds: res.map(n => n.nodeId),
            loading: false,
          });
        }
      } else {
        this.setState({ loading: false });
      }
    })(resp);
  };

  onSelect = (partNode, index) => {
    this.setState({ selectedNode: partNode.nodeId });
    const { onSelect } = this.props;
    if (onSelect) onSelect(partNode, index);
  };

  onLoadStructure = node => {
    this.loadStructure(node);
  };

  render() {
    const {
      root,
      children,
      showSpliter,
      height,
      showHeader,
      extraColumns,
      onSelect,
      ...rest
    } = this.props;
    if (!root) return '';
    const { siderWidth, stru, loading, expandedNodeIds, selectedNode } = this.state;
    const spliter = (
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 4,
          border: '1px solid #bbb',
          width: 4,
          cursor: 'w-resize',
          borderRadius: 2,
          backgroundColor: '#bbb',
          height: '100%',
        }}
        onMouseDown={this.onMouseDown}
      />
    );
    const tableProps = {
      scroll: height && height > 0 ? { y: height } : undefined,
      pagination: false,
      noWrap: true,
      selectable: true,
      rowKey: r => r.id,
      showHeader: !!extraColumns && !!extraColumns.length && showHeader !== false,
      title: '产品结构',
      data: stru,
      extraColumns,
      loading,
      expanded: expandedNodeIds || [],
      setExpand: keys => {
        this.setState({ expandedNodeIds: keys });
      },
      loadData: this.onLoadStructure,
      selected: selectedNode,
      onSelect: onSelect ? this.onSelect : undefined,
    };
    if (!children) return <Structure {...tableProps} {...rest} />;
    return (
      <Layout onMouseMove={this.onMouseMove} onMouseUp={this.onMouseUp}>
        <Layout.Sider
          theme="light"
          width={siderWidth}
          ref={ref => {
            this.sider = { ref };
          }}
        >
          <Structure {...tableProps} {...rest} />
        </Layout.Sider>
        <Layout.Content style={{ position: 'relative' }}>
          {showSpliter && spliter}
          <div style={{ marginLeft: showSpliter ? 12 : 6 }}>{children}</div>
        </Layout.Content>
      </Layout>
    );
  }
}

export default StructureWrapper;

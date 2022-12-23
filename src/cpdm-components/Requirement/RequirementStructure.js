import React, { Component } from 'react';
import { connect } from 'umi';
import { Table, Tooltip, message } from 'antd';
import { Ellipsis } from '@cpdm/components';
// import RequirementDeliverData from '@/pages/AppService/Requirement/Info/RequirementDeliverData';

@connect(({ requirement, loading }) => ({
  requirement,
  loading: loading.effects['requirement/listRequirementStructure'],
}))
class RequirementStructure extends Component {
  constructor(props) {
    super(props);
    const { basicInfo = {} } = this.props;
    this.state = {
      parentId: basicInfo && basicInfo.id,
      structure: [basicInfo],
      expandedKeys: [basicInfo && basicInfo.id],
    };
  }

  componentDidMount() {
    const { parentId } = this.state;
    this.listRequirementStructure({
      parentId,
    });
  }

  listRequirementStructure = (params = {}) => {
    const { dispatch, onChange } = this.props;
    const { selectedRowKeys } = this.state;
    dispatch({
      type: 'requirement/listSubRequirementStructure',
      payload: params,
      callback: response => {
        if (response && Array.isArray(response)) {
          const { structure, expandedKeys, parentId } = this.state;
          const obj = this.renderChildren(structure, parentId, response);
          this.setState({ expandedKeys, structure: obj }, () => {
            if (onChange) onChange(obj, selectedRowKeys);
          });
        }
      },
    });
  };

  // 渲染子节点
  renderChildren = (datas, requirementId, response) => {
    const newdata = datas.map(item => {
      if (item.id === requirementId) {
        Object.assign(item, {
          children: response,
        });
      } else if (item.children) {
        Object.assign(item, {
          children: this.renderChildren(item.children, requirementId, response),
        });
      }
      return item;
    });
    return newdata;
  };

  // 展开加载下级节点
  onExpandSubs = (expanded, record) => {
    if (expanded) {
      const { expandedKeys } = this.state;
      expandedKeys.push(record.id);
      this.setState(
        {
          parentId: record.id,
          expandedKeys,
        },
        () => {
          const { parentId } = this.state;
          this.listRequirementStructure({ parentId });
        },
      );
    } else {
      const { expandedKeys } = this.state;
      const result = expandedKeys.reduce((items, next) => {
        if (next !== record.id) {
          items.push(next);
        }
        return items;
      }, []);
      this.setState({
        expandedKeys: result,
      });
    }
  };

  codeClick = id => {
    window.open(`/plm/app/main/app/requirement/${id}/info`, '_blank');
  };

  onHandler = () => {
    const { selectedRowKeys, selectedRows } = this.state;
    const { onOk } = this.props;
    if (!selectedRowKeys || !selectedRowKeys.length) {
      message.warning('请至少选择一条数据。');
    } else {
      onOk(selectedRows, selectedRowKeys);
    }
  };

  onCancel = () => {
    const { onCancel } = this.props;
    onCancel();
  };

  render() {
    const { loading, rowId, taskInfo, onChange } = this.props;
    let reviewType = '';
    if (taskInfo.name === '需求编制' || taskInfo.name === '需求修改') {
      reviewType = 'review';
    }
    if (taskInfo.name === '提交闭环' || taskInfo.name === '闭环修改') {
      reviewType = 'close';
    }
    const { structure = [], expandedKeys, selectedRowKeys = [] } = this.state;

    const columns = [
      {
        title: '名称',
        dataIndex: 'name',
        width: 200,
        onCell: () => {
          return {
            style: {
              maxWidth: 200,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            },
          };
        },
        render(text) {
          return (
            <Tooltip title={text} placement="topLeft">
              {text}
            </Tooltip>
          );
        },
      },
      {
        title: '编号',
        dataIndex: 'code',
        width: 200,
        render: (text, record) => (
          <Tooltip title={text} placement="topLeft">
            <a onClick={() => this.codeClick(record.id)}>{text}</a>
          </Tooltip>
        ),
      },
      {
        title: '版本',
        width: 80,
        dataIndex: 'version',
      },
      {
        title: '状态',
        width: 100,
        dataIndex: 'lifecycleStateDisplay',
      },
      {
        title: '所属分类',
        dataIndex: 'classificationId',
        width: 100,
        render: (text, record) => (
          <span placement="topLeft" title={record.classification}>
            {record.classification}
          </span>
        ),
      },
      {
        title: '实现确认',
        width: 120,
        dataIndex: 'enterState',
      },
      {
        title: '阶段标记',
        width: 120,
        dataIndex: 'phaseMark',
      },
      {
        title: '需求提出方',
        width: 100,
        dataIndex: 'source',
      },
      {
        title: '需求描述',
        dataIndex: 'description',
        render: text => (
          <Ellipsis tooltip lines={1}>
            {text}
          </Ellipsis>
        ),
      },
    ];

    const buildDta = (datas, record, selected) => {
      const dataSource = [...datas];
      dataSource.map(item => {
        if (item.id === record.id) {
          Object.assign(item, {
            checked: selected,
          });
        } else if (item.children && item.children.length) {
          buildDta(item.children, record, selected);
        }
        return false;
      });
      this.setState({ structure: dataSource }, () => {
        if (onChange) onChange(dataSource, selectedRowKeys);
      });
    };

    const rowSelection = {
      selectedRowKeys,
      onChange: (keys, selectedRows) => {
        this.setState({
          selectedRows,
          selectedRowKeys: keys,
        });
        if (onChange) {
          onChange(structure, keys);
        }
      },
      getCheckboxProps: record => ({
        disabled:
          reviewType === 'review'
            ? record.lifecycleStateIdentifier !== 'INWORK' ||
              record.id === rowId ||
              record.select === true
            : record.lifecycleStateIdentifier !== 'RELEASED' ||
              record.id === rowId ||
              record.select === true,
      }),
      columnWidth: 60,
      onSelect: (record, selected) => {
        buildDta(structure, record, selected);
      },
    };

    return (
      <Table
        expandedRowKeys={expandedKeys}
        rowKey={record => record.id}
        loading={loading}
        size="small"
        columns={columns}
        pagination={false}
        dataSource={structure}
        onExpand={this.onExpandSubs}
        rowSelection={rowSelection}
      />
    );
  }
}

export default RequirementStructure;

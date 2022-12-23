import React from 'react';
import { Tooltip } from 'antd';
import classNames from 'classnames';
import TableCard from '@/cpdm-components/TableCard';
import RowIcon from '@/pages/ChangeConfiguration/DataSendOrder/CollectingDataModal/GetRowIcon';

export default props => {
  const { loading, data = [], extraColumns = [], fixed, ...rest } = props;
  const { onSelect, selected, extraRowClassNames } = props;
  const { loadData, expanded = [], setExpand } = props;
  const treeProps = loadData && {
    expandedRowKeys: expanded,
    onExpandedRowsChange: setExpand,
    onExpand: (e, r) => {
      if (e && !r.childrenLoaded) loadData(r);
    },
  };

  return (
    <TableCard
      {...rest}
      className="tableEllipsis"
      dataSource={data}
      loading={loading}
      columns={[
        {
          key: 'name',
          title: '标识',
          fixed,
          render: (v, r) => {
            const {
              nodeData: { code, name, version, viewName, lifecycleStateDisplay, objectType },
            } = r;
            const info = [code, name, version, viewName, lifecycleStateDisplay].filter(i => i);

            return (
              <Tooltip title={`${info.join(', ')}`}>
                <span style={{ wordBreak: 'keep-all', whiteSpace: 'nowrap' }}>
                  <RowIcon objectType={objectType} />
                  {` ${info.join(', ')}`}
                </span>
              </Tooltip>
            );
          },
        },
        ...extraColumns,
      ]}
      {...treeProps}
      onRow={(r, i) => ({
        onClick: () => {
          if (onSelect) onSelect(r, i);
        },
      })}
      rowClassName={r => {
        const classes = extraRowClassNames ? extraRowClassNames(r) : undefined;
        const clsNames = [
          onSelect ? 'selectable-row' : undefined,
          r.nodeId === selected ? 'selectable-row-selected' : undefined,
        ];
        if (Array.isArray(classes)) {
          return classNames([...clsNames, ...classes]);
        }
        return classNames([...clsNames, classes]);
      }}
      rowKey={r => r.nodeId}
      indentSize={8}
    />
  );
};

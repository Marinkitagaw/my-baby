import React from 'react';
import { Select, TreeSelect } from 'antd';
import { connect } from 'umi';

class ViewPicker extends React.PureComponent {
  componentDidMount() {
    const { dispatch, views } = this.props;
    if (!views.length) dispatch({ type: 'common/listViews' });
  }

  render() {
    const { value, views = [], onChange, loading, viewManage, ...rest } = this.props;
    return (
      <div>
        {views && (
          <TreeSelect
            {...rest}
            allowClear
            value={value}
            placeholder="请选择视图"
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            treeDefaultExpandAll
            treeData={views}
            disabled={loading}
            onChange={v => {
              if (onChange) onChange(v);
            }}
          />
        )}
        {!views.length && (
          <Select
            {...rest}
            value={value}
            onChange={v => {
              if (onChange) onChange(v);
            }}
          >
            {[
              { value: 'DESIGN', name: '设计' },
              { value: 'PROCESS', name: '工艺' },
              { value: 'MANUFACTURE', name: '制造' },
              { value: 'FUNCTION', name: '功能' },
            ].map(v => (
              <Select.Option key={v.value}>{v.name}</Select.Option>
            ))}
          </Select>
        )}
      </div>
    );
  }
}

export default connect(({ common, loading }) => ({
  views: common.views,
  loading: loading.effects['common/listViews'],
}))(ViewPicker);

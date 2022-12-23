import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Input, Select, Divider, Tooltip } from 'antd';
import { connect } from 'umi';
import { RepositoryPicker } from 'cpdm-ui-components';
import moment from 'moment';

class RepoPicker extends React.PureComponent {
  state = { showMore: false, selected: undefined };

  componentDidMount() {
    const { commonEnabled, dispatch } = this.props;
    if (commonEnabled) {
      dispatch({ type: 'repository/common' });
    }
  }

  onChange = value => {
    if (value !== 'more') {
      const { onChange } = this.props;
      if (onChange) onChange(value);
    } else {
      this.setState({ showMore: true });
    }
  };

  select = (value, addToCommon) => {
    const selecteDValue = value[0];
    if (value) {
      const { onChange } = this.props;
      this.setState({ selected: selecteDValue });
      if (onChange) onChange(selecteDValue.id);
      this.setState({ showMore: false });
      if (addToCommon) {
        const { dispatch } = this.props;
        dispatch({ type: 'repository/addToCommon', payload: selecteDValue.id });
      } else {
        const { dispatch, commonRepos } = this.props;
        dispatch({ type: 'repository/$common', payload: [...commonRepos, selecteDValue] });
      }
    }
  };

  renderType = repo => (repo.type === 'Product' ? '产品库' : '资源库');

  render() {
    const {
      value,
      options,
      commonRepos,
      loading,
      disabled,
      commonEnabled,
      dispatch,
      seriesId,
      ...rest
    } = this.props;
    const { showMore, selected } = this.state;
    if (loading) return <LoadingOutlined />;

    const columns = [
      {
        title: '型号系列',
        dataIndex: 'series',
      },
      {
        title: '型号名称',
        dataIndex: 'name',
      },
      {
        title: '类型',
        dataIndex: 'type',
        width: '8%',
        render: text => (text === 'Product' ? '产品库' : '存储库'),
        filters: [
          { text: '产品库', value: 'Product' },
          { text: '存储库', value: 'Library' },
        ],
      },
      {
        title: '型号代号',
        width: '14%',
        dataIndex: 'modelCode',
      },
      {
        title: '产品代号',
        width: '14%',
        dataIndex: 'code',
      },
      {
        title: '创建者',
        width: '12%',
        dataIndex: 'creatorFullName',
      },
      {
        title: '创建时间',
        width: '16%',
        dataIndex: 'createStamp',
        render(text) {
          return (
            <Tooltip title={moment(text).format('YYYY-MM-DD HH:mm')} placement="topLeft">
              {moment(text).format('YYYY-MM-DD HH:mm')}
            </Tooltip>
          );
        },
      },
    ];

    const PickerProps = {
      host: process.env.API_BASE_PATH,
      showInput: false,
      visible: true,
      columns,
      selectionType: 'radio',
      title: '选择库',
      hideExpert: true,
      defaultSearch: {
        size: 10,
        series: seriesId,
      },
      searchCode: 'name',
      onOk: this.select,
      onCancel: () => this.setState({ showMore: false }),
    };
    return (
      <React.Fragment>
        {commonEnabled && (
          <Select
            style={{ width: '100%' }}
            {...rest}
            disabled={disabled}
            value={value}
            onChange={this.onChange}
          >
            {(options || commonRepos).map(r => (
              <Select.Option key={r.id}>
                <span>{this.renderType(r)}</span>
                <Divider type="vertical" />
                <span>{r.series}</span>
                <Divider type="vertical" />
                <span>{r.name}</span>
              </Select.Option>
            ))}
            <Select.Option key="more">
              <strong>
                <a>更多...</a>
              </strong>
            </Select.Option>
          </Select>
        )}
        {!commonEnabled && (
          <Input
            {...rest}
            disabled
            value={selected ? selected.name : undefined}
            addonAfter={
              <a
                onClick={() => {
                  this.setState({ showMore: true });
                }}
              >
                更多
              </a>
            }
          />
        )}
        {showMore && <RepositoryPicker {...PickerProps} />}
      </React.Fragment>
    );
  }
}

export default connect(({ repository, loading }) => ({
  commonRepos: repository.common,
  loading: loading.effects['repository/common'] || loading.effects['repository/addToCommon'],
}))(RepoPicker);

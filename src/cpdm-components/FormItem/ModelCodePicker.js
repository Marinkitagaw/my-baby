import React from 'react';
import { AppstoreOutlined, CloseCircleFilled, LoadingOutlined } from '@ant-design/icons';
import { Input, Tooltip } from 'antd';
import { RepositoryPicker } from '@cpdm/components';
import moment from 'moment';
import { reset } from '@/services/data/document';

class ModelCodePicker extends React.PureComponent {
  state = { showMore: false };

  onChange = value => {
    if (value !== 'more') {
      const { onChange, setSelectedRepository } = this.props;
      if (onChange) onChange(value);
      if (setSelectedRepository) setSelectedRepository(value);
    } else {
      this.setState({ showMore: true });
    }
  };

  handleRepositorysOk = selectedData => {
    const {
      form: { setFieldsValue },
      setSelectedRepository,
    } = this.props;
    setFieldsValue({
      modelCode: selectedData[0].modelCode,
    });
    if (setSelectedRepository) {
      setSelectedRepository(selectedData[0]);
    }
    this.setState({ showMore: false });
  };

  renderType = repo => (repo.type === 'Product' ? '产品库' : '资源库');

  render() {
    const { values, loading, style = {} } = this.props;
    const { showMore } = this.state;
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
      title: '选择型号',
      selectionType: 'radio',
      columns,
      hideExpert: true,
      onOk: this.handleRepositorysOk,
      onCancel: () => this.setState({ showMore: false }),
      visible: showMore,
      searchCode: 'name',
    };
    return (
      <React.Fragment>
        <Input
          {...reset}
          placeholder="按型号代号过滤"
          value={values}
          disabled
          style={{ width: style.width || 200 }}
          onChange={this.onChange}
          addonAfter={
            <a>
              <AppstoreOutlined
                onClick={() => {
                  this.setState({ showMore: true });
                }}
              />
            </a>
          }
          suffix={
            <CloseCircleFilled
              style={{ color: `rgba(0,0,0,${values ? 0.25 : 0})` }}
              onClick={values && (() => this.onChange(''))}
            />
          }
        />
        {showMore && <RepositoryPicker {...PickerProps} />}
      </React.Fragment>
    );
  }
}

export default ModelCodePicker;

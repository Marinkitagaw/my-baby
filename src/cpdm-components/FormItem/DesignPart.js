import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { request } from '@cpdm/util';
import { Input } from 'antd';
import { connect } from 'umi';
import BOMsearch from '@/cpdm-components/SearchModal/BOMSearch';
import { SettingOutlined } from '@ant-design/icons';

class DesignPart extends React.PureComponent {
  state = { searchVisible: false, designPart: {} };

  componentDidMount() {}

  getPart = async (dataType, id) => {
    const res = await request(`/bom/${dataType}-parts/${id}`);
    if (res && res.id) {
      this.setState({ part: res });
    }
  };

  setDesignPart = selectd => {
    const { onChange } = this.props;
    this.setState({ designPart: selectd[0] }, () => {
      this.setState({ searchVisible: false });
    });
    if (onChange) {
      onChange(selectd[0].id);
    }
  };

  render() {
    const { loading, disabled } = this.props;
    const { searchVisible, designPart = {} } = this.state;
    if (loading) return <LoadingOutlined />;
    const SearchProps = {
      visible: searchVisible,
      title: '选择设计部件',
      dataType: 'DESIGN',
      selectionType: 'radio',
      onCancel: () => this.setState({ searchVisible: false }),
      onOk: this.setDesignPart,
    };
    return (
      <>
        <Input
          defaultValue={designPart?.id && `${designPart?.subject}`}
          className="ant-form-item-control"
          style={{ display: 'inline-block', width: 400, verticalAlign: 'middle' }}
          disabled
          key={designPart?.id}
          addonAfter={
            <a>
              <SettingOutlined
                disabled={disabled}
                onClick={() => this.setState({ searchVisible: true })}
              />
            </a>
          }
        />

        {searchVisible && <BOMsearch {...SearchProps} />}
      </>
    );
  }
}

export default connect(({ dictionary, loading }) => ({
  dictEntries: dictionary.dictEntries,
  loading: loading.effects['dictionary/getDictEntries'],
}))(DesignPart);

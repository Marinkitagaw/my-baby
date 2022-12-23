import React, { Fragment } from 'react';
import { Link } from 'umi';
import { List, Icon, Typography, Popconfirm } from 'antd';
import { ItemPicker } from 'cpdm-ui-components';
import { SettingOutlined, DeleteOutlined } from '@ant-design/icons';

class AssociatedPartPicker extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ItemVisible: false,
    };
  }

  onChange = selected => {
    const { onChange } = this.props;
    if (onChange) onChange(selected);
  };

  handleOk = selected => {
    const { onChange, value = [] } = this.props;
    const newV = [...value, ...selected];
    const newValue = [...new Set(newV)];
    if (onChange) onChange(newValue);
    this.hideItemPicker();
  };

  hideItemPicker = () => {
    this.setState({ ItemVisible: false });
  };

  removePart = removePartId => {
    const { value, onChange } = this.props;
    const filterPart = value.filter(item => removePartId !== item.id);
    if (onChange) onChange(filterPart);
  };

  render() {
    const { value = [], productCode, loading, typeTree, dispatch, ...rest } = this.props;
    const { ItemVisible } = this.state;
    if (loading) return <Icon type="loading" />;

    const ItemProps = {
      host: process.env.API_BASE_PATH,
      defaultType: 'Part',
      title: '选择部件',
      multi: true,
      types: ['Part'],
      defaultSearch: { productCode },
      visible: ItemVisible,
      onOk: this.handleOk,
      onCancel: this.hideItemPicker,
    };

    return (
      <Fragment>
        {/* <Input
          {...rest}
          readOnly
          addonAfter={<Icon onClick={() => this.setState({ ItemVisible: true })} type="setting" />}
          value={value}
        /> */}
        <List
          size="small"
          {...rest}
          header={
            <div>
              关联列表
              <a style={{ float: 'right' }} onClick={() => this.setState({ ItemVisible: true })}>
                添加
              </a>
            </div>
          }
          footer={null}
          bordered
          dataSource={value}
          renderItem={item => (
            <List.Item
              extra={
                <Popconfirm
                  title="确定要移除此条数据吗?"
                  onConfirm={() => this.removePart(item.id)}
                  okText="确定"
                  cancelText="取消"
                >
                  <Typography.Text type="danger">
                    <DeleteOutlined />
                    {/* <Icon title="移除此数据" style={{ marginRight: 8 }} type="minus-square-o" /> */}
                  </Typography.Text>
                </Popconfirm>
              }
            >
              <Link to={`/data/part/${item.id}`}>
                <SettingOutlined />
                {item.subject ? `${item.subject}` : `${item.code},${item.name},${item.version}`}
              </Link>
            </List.Item>
          )}
        />
        {ItemVisible && <ItemPicker {...ItemProps} />}
      </Fragment>
    );
  }
}

export default AssociatedPartPicker;

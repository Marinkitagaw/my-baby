import React from 'react';
import { FileOutlined, SettingOutlined } from '@ant-design/icons';
import { Card, Table, Tooltip, Radio } from 'antd';
import { Modal } from '@cpdm/components';

class DeletePanel extends React.PureComponent {
  state = {
    model: 'ALL_VERSIONS',
  };

  onChange = value => {
    this.setState({ model: value });
  };

  renderIcon = objectType => {
    let icon;
    switch (objectType) {
      case 'Document':
        icon = <FileOutlined />;
        break;
      case 'Part':
        icon = <SettingOutlined />;
        break;
      default:
        icon = <FileOutlined />;
    }
    return icon;
  };

  render() {
    const { data = {}, visible, onOk, onCancel, title, is } = this.props;
    const { model } = this.state;
    const columns = [
      { key: 'id', dataIndex: 'id', width: 36, render: () => this.renderIcon(data.objectType) },
      {
        title: '编号',
        key: 'code',
        dataIndex: 'code',
        sorter: true,
        width: '30%',
        render: text => (
          <Tooltip title={text} placement="topLeft">
            {text}
          </Tooltip>
        ),
      },
      {
        title: '名称',
        key: 'name',
        width: '30%',
        dataIndex: 'name',
        render: text => (
          <Tooltip placement="topLeft" title={text}>
            {text}
          </Tooltip>
        ),
      },
      {
        title: '版本',
        dataIndex: 'version',
        render: text => (
          <Tooltip placement="topLeft" title={text}>
            {text}
          </Tooltip>
        ),
      },
      {
        title: '状态',
        key: 'state',
        dataIndex: is ? 'lifecycleStateName' : 'lifecycleStateDisplay',
        render: text => (
          <Tooltip placement="topLeft" title={text}>
            {text}
          </Tooltip>
        ),
      },
    ];
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };
    return (
      <Modal
        width={720}
        title={title}
        visible={visible}
        onOk={() => onOk(model)}
        onCancel={onCancel}
      >
        <Card type="inner" title="对象列表">
          {data.id ? (
            <div>
              <Table
                columns={columns}
                dataSource={[data]}
                pagination={false}
                size="small"
                bordered
              />
              <Radio.Group onChange={e => this.onChange(e.target.value)} value={model}>
                <Radio style={radioStyle} value="ALL_VERSIONS">
                  删除已选对象所有修订版本
                </Radio>
                <Radio style={radioStyle} value="SINGLE_VERSION">
                  删除已选对象当前修订版本
                </Radio>
                <Radio style={radioStyle} value="LATEST_ITERATION">
                  删除已选对象最新小版本
                </Radio>
              </Radio.Group>
            </div>
          ) : (
            '暂时未找到关联的对象列表'
          )}
        </Card>
      </Modal>
    );
  }
}

export default DeletePanel;

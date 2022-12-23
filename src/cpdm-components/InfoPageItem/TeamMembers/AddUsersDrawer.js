import React, { PureComponent } from 'react';
import { UserOutlined } from '@ant-design/icons';
import '@ant-design/compatible/assets/index.css';
import { Input, Button, Drawer, Select, Form, Card } from 'antd';
import { connect } from 'umi';
import { ParticipantPicker } from '@cpdm/components';
import * as commonApi from '@/services/common';

@connect(({ dictionary }) => ({
  dictEntries: dictionary.dictEntries,
}))
class AddRoleModal extends PureComponent {
  formRef = React.createRef();

  state = {
    userVisible: false,
    loading: false,
  };

  componentDidMount() {
    this.listDictionartEntry();
  }

  // 字典
  listDictionartEntry = async () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'dictionary/getDictEntries',
      payload: { code: 'TeamRole' },
    });
  };

  handleAddRole = roleList => {
    const { dispatch, teamId, onOk } = this.props;
    dispatch({
      type: 'common/addRole',
      payload: {
        teamId,
        roleList,
      },
      callback: res => {
        if (res && Array.isArray(res) && onOk) {
          onOk();
        }
      },
    });
  };

  saveMemberLink = () => {
    const { selected } = this.props;
    const { userIdList } = this.state;
    const members = [];
    userIdList.map(item =>
      selected.map(role =>
        members.push({
          memberType: item.type === 'Group' ? 'Group' : 'User',
          memberId: item.id,
          roleIdentifier: role.identifier,
        }),
      ),
    );
    return members;
  };

  handleAddMembers = async () => {
    const { teamId, onOk } = this.props;
    const res = await commonApi.addMember({
      teamId,
      datas: this.saveMemberLink(),
    });
    if (!res) {
      if (onOk) onOk();
    }
  };

  // 保存按钮
  handleSave = async () => {
    const {
      dictEntries: { TeamRole = [] },
      addRoleOnly,
    } = this.props;
    const values = await this.formRef.current.validateFields();
    const { role = [] } = values;
    const roleList = TeamRole.filter(r => role.includes(r.id));
    if (addRoleOnly) {
      this.handleAddRole(roleList.map(item => ({ identifier: item.value, name: item.name })));
    } else {
      this.handleAddMembers({
        roleList,
        ...values,
      });
    }
  };

  // 成员
  showUserSearchModal = () => {
    this.setState({
      userVisible: true,
    });
  };

  hideUserSearchModal = () => {
    this.setState({
      userVisible: false,
    });
  };

  handleUserOk = newValue => {
    this.setState({
      userIdList: newValue,
    });
    this.formRef.current.setFieldsValue({
      userIdList: newValue.map(item => item.fullName || item.name).join(','),
    });
    this.hideUserSearchModal();
  };

  render() {
    const {
      recordId,
      onClose,
      userDrawerVisible,
      addRoleOnly,
      dictEntries: { TeamRole = [] },
      selected = [],
    } = this.props;
    const { userVisible, loading } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      },
    };

    return (
      <Drawer
        title={recordId ? '修改角色/成员' : '添加角色/成员'}
        placement="right"
        width="500"
        maskClosable={false}
        onClose={onClose}
        visible={userDrawerVisible}
      >
        <Card bordered={false}>
          <Form
            {...formItemLayout}
            initialValues={{
              role: selected && Array.isArray(selected) ? selected.map(item => item.name) : [],
              memberType: 'user',
            }}
            ref={this.formRef}
          >
            <Form.Item label="角色" name="role" rules={[{ required: true, message: '请选择角色' }]}>
              <Select allowClear mode="multiple" disabled={selected && selected.length}>
                {TeamRole.map(d => (
                  <Select.Option key={d.id} value={d.id}>
                    {d.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            {!addRoleOnly && (
              <>
                <Form.Item
                  label="成员"
                  name="userIdList"
                  rules={[{ required: true, message: '请选择成员' }]}
                >
                  <Input
                    placeholder="点击图标选择成员"
                    readOnly
                    allowClear
                    addonAfter={
                      <Button
                        type="link"
                        size="small"
                        icon={<UserOutlined />}
                        title="选择成员"
                        onClick={() => this.showUserSearchModal()}
                      />
                    }
                  />
                </Form.Item>
              </>
            )}
            {userVisible && (
              <ParticipantPicker
                visible={userVisible}
                multi
                scope={['User', 'Group']}
                title="成员选择器"
                onCancel={() => {
                  this.setState({ userVisible: false });
                }}
                onOk={this.handleUserOk}
              />
            )}
          </Form>
        </Card>

        <div
          style={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            width: '100%',
            borderTop: '1px solid #e9e9e9',
            padding: '10px 16px',
            background: '#fff',
            textAlign: 'right',
          }}
        >
          <Button disabled={loading} onClick={onClose} style={{ marginRight: 8 }}>
            取消
          </Button>
          <Button loading={loading} onClick={this.handleSave} type="primary">
            保存
          </Button>
        </div>
      </Drawer>
    );
  }
}

export default AddRoleModal;

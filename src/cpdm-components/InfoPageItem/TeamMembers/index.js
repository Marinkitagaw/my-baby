import React, { Component } from 'react';
import { PlusOutlined, MinusOutlined, MenuOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Card, Button, Space } from 'antd';
import * as commonApi from '@/services/common';
import GridComponents from '@/pages/ChangeConfiguration/DataSendOrder/CollectingDataModal/GridComponents';
import AddUsersDrawer from './AddUsersDrawer';

class TeamMembersList extends Component {
  formRef = React.createRef();

  state = {
    userDrawerVisible: false,
    roleEnabledValue: 'role',
    selectedRows: [],
  };

  columns = [
    {
      title: '部门',
      dataIndex: 'departmentName',
    },
    {
      title: '密级',
      dataIndex: 'secretLevel',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
  ];

  onRefs = aggrid => {
    this.agGrid = aggrid;
  };

  handleRefreshGrid = () => {
    this.agGrid.purgeServerSideCache();
    this.agGrid.deselectAll();
    if (this.agGrid.getDisplayedRowAtIndex(0)) {
      this.agGrid.getDisplayedRowAtIndex(0).setExpanded(true);
    }
  };

  // 切换成员显示方式-树/列表
  changeRoleEnabled = value => {
    this.setState({ roleEnabledValue: value });
    this.agGrid.deselectAll();
  };

  // 添加角色
  addRole = type => {
    this.setState({
      userDrawerVisible: true,
      addType: type,
    });
  };

  // 移除角色
  handleRemoveRoles = async () => {
    const { info } = this.props;
    const { selectedRows } = this.state;
    const res = await commonApi.removeRoles({
      teamId: info.teamId,
      datas: selectedRows.map(item => item.identifier),
    });
    if (!res) {
      this.handleRefreshGrid();
    }
  };

  // 移除成员
  handleRemoveMembers = async (record = {}) => {
    const { info } = this.props;
    const { selectedRows } = this.state;
    const res = await commonApi.removeMembers({
      teamId: info.teamId,
      datas: record.id ? [record.id] : selectedRows.map(item => item.id),
    });
    if (!res) {
      this.handleRefreshGrid();
    }
  };

  // 关闭抽屉
  closeDrawer = () => {
    this.setState({
      userDrawerVisible: false,
    });
  };

  closeDrawerAndRefresh = () => {
    this.closeDrawer();
    this.handleRefreshGrid();
  };

  render() {
    const { info = {}, repositoryInfo = {} } = this.props;
    const { operation = {} } = repositoryInfo;
    const { userDrawerVisible, selectedRows, addType, roleEnabledValue } = this.state;

    const hasUsers = selectedRows.filter(
      item => item.memberType === 'User' || item.memberType === 'Group'
    );

    const viewMode = (
      <Button.Group>
        <Button
          value="role"
          title="按角色"
          icon={<MenuUnfoldOutlined />}
          onClick={() => {
            this.changeRoleEnabled('role');
          }}
        />
        <Button
          value="list"
          title="平铺"
          icon={<MenuOutlined />}
          onClick={() => {
            this.changeRoleEnabled('list');
          }}
        />
      </Button.Group>
    );

    const actions = (
      <Button.Group>
        <Button
          type="primary"
          title="添加角色"
          icon={<PlusOutlined />}
          disabled={selectedRows.length}
          onClick={() => this.addRole('role')}
        >
          添加角色
        </Button>
        <Button
          type="primary"
          title="添加成员"
          icon={<PlusOutlined />}
          disabled={!selectedRows.length || hasUsers.length}
          onClick={this.addRole}
        >
          添加成员
        </Button>
        <Button
          type="danger"
          title="移除角色"
          disabled={!selectedRows.length || hasUsers.length}
          icon={<MinusOutlined />}
          onClick={this.handleRemoveRoles}
        >
          移除角色
        </Button>
        <Button
          type="danger"
          title="移除成员"
          disabled={!selectedRows.length || hasUsers.length !== selectedRows.length}
          icon={<MinusOutlined />}
          onClick={this.handleRemoveMembers}
        >
          移除成员
        </Button>
      </Button.Group>
    );

    return (
      <div>
        <Card
          bordered={false}
          title="团队成员"
          extra={
            <Space>
              {(roleEnabledValue === 'role' && operation.operation === 'enable') && actions}
              {viewMode}
            </Space>
          }
        >
          {roleEnabledValue === 'role' && (
            <GridComponents
              hideToolbars
              rowSelectionType="multiple"
              onRefs={this.onRefs}
              treeData
              columns={this.columns}
              childrenColumnName="children"
              groupColumn={{
                title: '角色/成员',
                key: 'name',
              }}
              rowKey="id"
              requestUrl={`/iam/teams/${info.teamId}/roles`}
              subStructureUrl="/iam/team-roles/:id/members"
              onChange={rows => this.setState({ selectedRows: rows })}
            />
          )}
          {roleEnabledValue !== 'role' && (
            <GridComponents
              hideSearch
              showDataOnly
              onRefs={this.onRefs}
              treeData={false}
              columns={[
                { title: '成员', key: 'name' },
                { title: '角色', key: 'roleName' },
                ...this.columns,
              ]}
              requestUrl={`/iam/teams/${info.teamId}/members`}
              filter
              filtersItems={[
                { id: 'fullName', displayIdentifier: '成员名称', componentType: 'input' },
              ]}
              actions={[
                {
                  label: '移除',
                  field: 'a',
                  type: 'danger',
                  onClick: this.handleRemoveMembers,
                },
              ]}
            />
          )}
        </Card>
        {userDrawerVisible && (
          <AddUsersDrawer
            userDrawerVisible={userDrawerVisible}
            onClose={this.closeDrawer}
            selected={selectedRows}
            teamId={info.teamId}
            addRoleOnly={addType === 'role'}
            onOk={this.closeDrawerAndRefresh}
          />
        )}
      </div>
    );
  }
}

export default TeamMembersList;

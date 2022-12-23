import React from 'react';
import {
  CloseOutlined,
  PlusOutlined,
  UserOutlined,
  HomeTwoTone,
  CaretDownOutlined,
} from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import {
  Table,
  Button,
  Tree,
  Input,
  message,
  Tabs,
  Card,
  List,
  Spin,
  Typography,
  TreeSelect,
  Space,
} from 'antd';
import { connect } from 'umi';
import { Fieldset } from '@cpdm/components';
import SupplierDescription from '../TaskAssembly/SupplierDescription';
import style from './index.less';
import SupplierDesModal from '../TaskAssembly/SupplierDesModal';
import PreservationTeamModal from './PreservationTeamModal';
import SelectTeamModal from './SelectTeamModal';

@Form.create()
@connect(({ reviewTask, common, supplier, loading, dashboard, group }) => ({
  participants: reviewTask.participants,
  commonTeams: reviewTask.commonTeams,
  allUsers: reviewTask.allUsers,
  common,
  departmentMembers: common.departmentMembers,
  processParticipants: reviewTask.processParticipants,
  contacts: supplier.contacts,
  taskInfo: dashboard.taskInfo,
  groupList: group.page,
  addMembersLoading:
    loading.effects['reviewTask/batchAddProcessParticipants'] ||
    loading.effects['reviewTask/batchAddParticipants'],
  loading:
    loading.effects['reviewTask/getProcessParticipants'] ||
    loading.effects['reviewTask/getParticipants'] ||
    loading.effects['reviewTask/getCommonTeams'] ||
    loading.effects['reviewTask/createCommonTeams'] ||
    loading.effects['reviewTask/addCommonTeams'] ||
    loading.effects['reviewTask/deleteTeams'],
}))
class Participants extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      replace: false,
      departmentTreeData: [],
      newSelectedRows: [],
      expandedKeys: [],
      activeKey: '本单位',
      pagination: {
        showTotal: (total) => <span>共{total}条数据</span>,
        showSizeChanger: true,
        pageSizeOptions: ['20', '50', '100'],
      },
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    // 获取部门树
    dispatch({
      type: 'common/getNewDepartments',
      payload: {
        parentId: 0,
      },
      callback: this.transformTreeData,
    });
    this.onGetParticipants();
    this.getSuppliersRoots();
  }

  // 查询协同单位根节点
  getSuppliersRoots = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'supplier/listRoots',
      payload: {
        parentId: '0',
      },
      callback: (response) => {
        const supplierList = [];
        (Array.isArray(response) ? response : []).forEach((element) => {
          supplierList.push(element);
        });
        this.setState({
          treeData: [...supplierList],
        });
      },
    });
  };

  // 获取流程参与者
  onGetParticipants = () => {
    const { dispatch, taskId, processInstanceId, businessKey } = this.props;

    dispatch({
      type: processInstanceId ? 'reviewTask/getProcessParticipants' : 'reviewTask/getParticipants',
      payload: {
        taskId,
        processInstanceId,
        businessKey,
      },
    }).then(() => {
      const { participants, processParticipants } = this.props;
      const participants1 = participants.filter((item) => item.activityConfigState !== 'NEEDLESS');
      this.setState({ participants: participants1, processParticipants });
    });
  };

  // 创建常用团队
  createCommonTeams = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'reviewTask/createCommonTeams',
      payload: {},
    });
  };

  // 保存常用团队
  openPreservationTeamModal = () => {
    this.setState({
      preservationTeamVisible: true,
    });
  };

  // 保存常用团队模态框确定按钮
  closePreservationTeamModalAndRefresh = () => {
    this.closePreservationTeamModal();
  };

  // 保存常用团队模态框取消按钮
  closePreservationTeamModal = () => {
    this.setState({
      preservationTeamVisible: false,
    });
  };

  // 选择常用团队
  openSelectTeamModal = () => {
    this.setState({
      selectTeamVisible: true,
    });
  };

  // 选择常用团队模态框确定按钮
  closeSelectTeamModalAndRefresh = () => {
    this.onGetParticipants();
    this.closeSelectTeamModal();
  };

  // 选择常用团队模态框取消按钮
  closeSelectTeamModal = () => {
    this.setState({
      selectTeamVisible: false,
    });
  };

  // 拼装树
  renderScope = (data) =>
    data.map((item) => {
      const props = {
        title: (
          <Space>
            <HomeTwoTone twoToneColor="#f96868" />
            {item.name}
          </Space>
        ),
        key: item.id,
        value: item.id,
        ...item,
      };
      if (item.children && item.children.length) {
        return <Tree.TreeNode {...props}>{this.renderScope(item.children)}</Tree.TreeNode>;
      }
      return <Tree.TreeNode {...props} />;
    });

  // 渲染协同树节点
  renderTreeNodes = (data) => {
    return (
      data &&
      !!data.length &&
      data.map((item) => {
        if (item.children) {
          return (
            <Tree.TreeNode
              title={
                <Space>
                  <HomeTwoTone twoToneColor="#f96868" />
                  {item.data.shortName}
                </Space>
              }
              key={item.id}
              dataRef={item}
            >
              {this.renderTreeNodes(item.children)}
            </Tree.TreeNode>
          );
        }
        return (
          <Tree.TreeNode
            title={
              <Space>
                <HomeTwoTone twoToneColor="#f96868" />
                {item.data.shortName}
              </Space>
            }
            {...item}
            dataRef={item}
            key={item.id}
          />
        );
      })
    );
  };

  // 添加参与者
  addMember = (roleIdentifier) => {
    const {
      newSelectedRows,
      activeKey,
      checkedGroupKeys = [],
      checkedDepartmentKeys = [],
    } = this.state;
    const { dispatch, taskId, processInstanceId, isAdmin } = this.props;
    this.getSupplierDescription();
    let value;
    switch (activeKey) {
      case '部门': {
        value = checkedDepartmentKeys.map((item) => {
          return { memberId: item, roleIdentifier, type: 'Department' };
        });
        break;
      }
      case '组':
        value = checkedGroupKeys.map((item) => {
          return { memberId: item, roleIdentifier, type: 'Group' };
        });
        break;
      default:
        value = newSelectedRows.map((item) => {
          return { memberId: item.id, roleIdentifier, type: 'User' };
        });
        break;
    }
    dispatch({
      type: processInstanceId
        ? 'reviewTask/batchAddProcessParticipants'
        : 'reviewTask/batchAddParticipants',
      payload: {
        taskId,
        processInstanceId,
        value,
      },
    }).then(() => {
      this.onGetParticipants();
      if (isAdmin) {
        dispatch({
          type: 'processInstance/evaluateParticipants',
          payload: processInstanceId,
        });
      }
    });
  };

  onAddParticipants = (row) => {
    const { newSelectedRows, groupData = [], departmentData = [], activeKey } = this.state;
    const { addMembersLoading, processInstanceId, taskInfo = {} } = this.props;
    if (activeKey === '组') {
      if (groupData.length > 0) {
        this.addMember(row.identifier);
      } else {
        message.error('请选择要添加的组');
      }
      return;
    }
    if (activeKey === '部门') {
      if (departmentData.length > 0) {
        this.addMember(row.identifier);
      } else {
        message.error('请选择要添加的部门');
      }
      return;
    }
    if (newSelectedRows && newSelectedRows.length > 0) {
      if (!addMembersLoading) {
        const supplierMember = [];
        newSelectedRows.map((item) => {
          if (item.exchange) {
            supplierMember.push({
              organizationName: item.organizationName,
              fullName: item.fullName,
              role: row.name,
              userId: item.id,
              processInstanceId: processInstanceId || taskInfo.processInstanceId,
            });
          }
          return item;
        });
        if (supplierMember.length > 0) {
          this.setState({
            processRowIdentifier: row.identifier,
            supplierMember,
            supplierDesVisible: true,
          });
        } else {
          this.addMember(row.identifier);
        }
      }
    } else {
      message.warning('请选择人员');
    }
  };

  // 部门树
  transformTreeData = (data) => {
    this.setState({
      departmentTreeData: data,
    });
  };

  getSupplierDescription = () => {
    const { dispatch, processInstanceId, taskInfo = {} } = this.props;
    this.setState({ supplierDesVisible: false });
    dispatch({
      type: 'processInstance/getSupplierDescription',
      payload: {
        processInstanceId: processInstanceId || taskInfo.processInstanceId,
      },
    });
  };

  deleteSupplierDescription = (userId) => {
    const { dispatch, processInstanceId, taskInfo = {} } = this.props;
    dispatch({
      type: 'processInstance/deleteSupplierDescription',
      payload: {
        processInstanceId: processInstanceId || taskInfo.processInstanceId,
        userId,
      },
      callback: this.getSupplierDescription,
    });
  };

  // 移除已选中专家
  onDelete = (row) => {
    const { dispatch, taskId, processInstanceId, isAdmin } = this.props;
    this.deleteSupplierDescription(row.memberId);
    dispatch({
      type: processInstanceId
        ? 'reviewTask/deleteProcessParticipants'
        : 'reviewTask/deleteParticipants',
      payload: {
        taskId,
        processInstanceId,
        teamRoleMemberId: row.id,
      },
    }).then(() => {
      this.onGetParticipants();
      if (isAdmin) {
        dispatch({
          type: 'processInstance/evaluateParticipants',
          payload: processInstanceId,
        });
      }
    });
  };

  // 点击树
  onTreeSelect = (selectedKeys) => {
    if (selectedKeys.length) {
      this.hanldeFolderData(selectedKeys[0]);
    }
    this.setState({ treeKeys: selectedKeys });
  };

  // 加载部门成员数据
  hanldeFolderData = (id, value) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'common/getDepartmentsMembers',
      payload: {
        departmentId: id,
        value: {
          ...value,
          currentDepartment: true,
        },
      },
    });
  };

  // 搜索
  onValidateFields = () => {
    const {
      form: { validateFields },
    } = this.props;
    const { treeKeys } = this.state;
    validateFields((err, value) => {
      if (!err) {
        if (treeKeys && treeKeys.length > 0) {
          this.hanldeFolderData(treeKeys[0], value);
        } else {
          message.error('请选择部门');
        }
      }
    });
  };

  // 重置
  onResetFields = () => {
    const {
      form: { resetFields },
    } = this.props;
    const { activeKey } = this.state;
    resetFields();
    if (activeKey === '本单位') {
      this.onValidateFields();
    } else {
      this.onSearchCollabExperts();
    }
  };

  // 保存已选择人员
  onChangeSaveUser = (rowKeys, rows) => {
    const { newSelectedRows } = this.state;
    newSelectedRows.push(...rows);
    const newArr = [];
    for (let i = 0; i < newSelectedRows.length; i += 1) {
      const row = newSelectedRows[i];
      let isExist = false;
      let isNew = false;
      for (let j = 0; j < rowKeys.length; j += 1) {
        const key = rowKeys[j];
        if (row.identifier === key || row.id === key) {
          isExist = true;
          break;
        }
      }
      if (isExist) {
        for (let j = 0; j < newArr.length; j += 1) {
          const key = newArr[j];
          if (row.identifier === key.identifier || row.id === key.id) {
            isNew = true;
            break;
          }
        }
        if (!isNew) {
          newArr.push(row);
        }
      }
    }
    this.setState({ selectedRowKeys: rowKeys, newSelectedRows: newArr });
  };

  // 展开树节点
  onExpandSupplier = (expandedKeys) => {
    this.setState({
      expandedKeys,
    });
  };

  onSelectSupplier = ([supplierId], e = {}) => {
    const { node = {} } = e;
    const { dataRef = {} } = node;
    const { data = {} } = dataRef;
    this.setState({ selectedSupplier: supplierId, showSupplierDepartments: false });
    this.doSearchCollabExperts(supplierId);
    if (data && data.tenantId) {
      this.getSupplierDepartments(data.tenantId);
    }
  };

  doSearchCollabExperts = (supplierId, departmentId) => {
    const { dispatch } = this.props;
    const {
      form: { validateFields },
    } = this.props;
    validateFields((err, value) => {
      if (err) return;
      if (supplierId) {
        if (departmentId) {
          Object.assign(value, { departmentId });
        }
        dispatch({
          type: 'supplier/getSupplierUsers',
          payload: { supplierId, ...value },
        });
      }
    });
  };

  // 协同搜索
  onSearchCollabExperts = (departmentId) => {
    const { selectedSupplier } = this.state;
    if (!selectedSupplier) {
      message.warning('请先选择专家所在的协同单位');
    }
    this.doSearchCollabExperts(selectedSupplier, departmentId);
  };

  // 获取协同单位树
  getSupplierDepartments = (tenantId) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'common/getNewDepartments',
      payload: {
        parentId: 0,
        tenantId,
      },
      callback: (res) => {
        this.setState({ supplierDepartments: res, showSupplierDepartments: true });
      },
    });
  };

  // 加载协同单位子节点
  loadChildrenData = (treeNode) =>
    new Promise((resolve) => {
      const { dispatch } = this.props;
      if (!treeNode) {
        return;
      }
      if (treeNode.props.children) {
        resolve();
        return;
      }
      const newtreeNode = { ...treeNode };
      dispatch({
        type: 'supplier/SupplierChildren',
        payload: {
          parentId: treeNode.props.eventKey,
        },
        callback: (response) => {
          const { treeData } = this.state;
          newtreeNode.dataRef.children = response || [];
          this.setState({
            treeData: [...treeData],
          });
          resolve();
        },
      });
    });

  onCheckTree = (type, checkedKeys) => {
    if (type === 'group') {
      this.setState({ checkedGroupKeys: checkedKeys });
    } else {
      this.setState({ checkedDepartmentKeys: checkedKeys });
    }
  };

  onCheckTree = (type, checkedKeys, rowData) => {
    const { departmentData = [] } = this.state;
    if (type === 'group') {
      this.setState({ checkedGroupKeys: checkedKeys, groupData: [...rowData] });
    } else {
      const { checked = [] } = checkedKeys;
      const { node = {} } = rowData;
      departmentData.push({ name: node.name, code: node.code, shortName: node.shortName });
      this.setState({ checkedGroupKeys: checked, departmentData: [...departmentData] });
      this.setState({ checkedDepartmentKeys: checked });
    }
  };

  renderColumns = () => {
    const { activeKey } = this.state;
    const drawerColumns = [
      {
        title: '',
        dataIndex: '',
        width: 20,
        render: () => <UserOutlined style={{ color: '#1890ff' }} />,
      },
      {
        title: '姓名',
        dataIndex: 'fullName',
        width: 100,
        ellipsis: true,
        render: (text, record) => <span>{record.fullName || record.name}</span>,
      },
      {
        title: '用户名',
        dataIndex: 'username',
        ellipsis: true,
      },
      {
        title: '密级',
        width: 60,
        ellipsis: true,
        dataIndex: 'secretLevel',
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        ellipsis: true,
      },
    ];
    const departmentColumns = [
      {
        title: '名称',
        dataIndex: 'name',
        ellipsis: true,
      },
      {
        title: '编号',
        dataIndex: 'code',
        width: 100,
        ellipsis: true,
      },
      {
        title: '简称',
        ellipsis: true,
        dataIndex: 'shortName',
      },
    ];
    const groupColumns = [
      {
        title: '名称',
        dataIndex: 'name',
        ellipsis: true,
      },
      {
        title: '说明',
        ellipsis: true,
        dataIndex: 'description',
      },
    ];
    switch (activeKey) {
      case '部门':
        return departmentColumns;
      case '组':
        return groupColumns;
      default:
        return drawerColumns;
    }
  };

  renderTableData = () => {
    const { activeKey, departmentData = [], groupData } = this.state;
    const { departmentMembers = [], contacts = [] } = this.props;
    switch (activeKey) {
      case '本单位':
        return departmentMembers;
      case '部门':
        return departmentData;
      case '组':
        return groupData;
      default:
        return contacts;
    }
  };

  renderForm = () => {
    const { activeKey, showSupplierDepartments, supplierDepartments = [] } = this.state;
    const {
      form: { getFieldDecorator },
    } = this.props;
    switch (activeKey) {
      case '部门':
        return <Fieldset legend="已选部门" bordered={false} bodyStyle={{ padding: 0 }} />;
      case '组':
        return <Fieldset legend="已选组" bordered={false} bodyStyle={{ padding: 0 }} />;
      case '本单位':
        return (
          <div>
            <Form.Item label="关键字">
              {getFieldDecorator('fullName', { initialValue: '' })(
                <Input placeholder="按关键字查询" />,
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" onClick={this.onValidateFields}>
                查询
              </Button>
              <Button style={{ marginLeft: 16 }} onClick={this.onResetFields}>
                重置
              </Button>
            </Form.Item>
          </div>
        );
      default:
        return (
          <div>
            {showSupplierDepartments && (
              <Form.Item label="部门">
                {getFieldDecorator('departmentId')(
                  <TreeSelect
                    showSearch
                    style={{ width: 200 }}
                    dropdownStyle={{ maxHeight: 200 }}
                    placeholder="请选择部门"
                    allowClear
                    treeDefaultExpandAll
                  >
                    {this.renderScope(supplierDepartments)}
                  </TreeSelect>,
                )}
              </Form.Item>
            )}
            <Form.Item label="关键字">
              {getFieldDecorator('keyword')(<Input placeholder="按关键字查询" />)}
            </Form.Item>
            <Form.Item>
              <Button
                style={{ marginRight: 16 }}
                type="primary"
                onClick={() => this.onSearchCollabExperts()}
              >
                查询
              </Button>
              <Button onClick={this.onResetFields}>重置</Button>
            </Form.Item>
          </div>
        );
    }
  };

  render() {
    const {
      departmentTreeData,
      treeData,
      selectedRowKeys,
      replace,
      expandedKeys,
      activeKey,
      participants = [],
      processParticipants = [],
      pagination,
      supplierDesVisible,
      supplierMember,
      processRowIdentifier,
      preservationTeamVisible,
      selectTeamVisible,
    } = this.state;
    const {
      processInstanceId,
      completed,
      hideSupplier,
      loading,
      isAdmin,
      taskInfo = {},
      taskId,
      hideAction,
    } = this.props;

    const rowSelection = {
      type: replace ? 'radio' : 'checkbox',
      selectedRowKeys,
      onChange: (rowKeys, rows) => {
        this.onChangeSaveUser(rowKeys, rows);
      },
    };

    return (
      <>
        <Card
          bordered={false}
          title={!processInstanceId ? '选择流程参与者' : '选择流程团队'}
          bodyStyle={{ padding: 0 }}
          extra={
            <div>
              <Button onClick={() => this.openPreservationTeamModal()}>保存常用团队</Button>
              <Button onClick={() => this.openSelectTeamModal()}>选择常用团队</Button>
            </div>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Tabs
              animated={false}
              onChange={(key) =>
                this.setState({ activeKey: key, selectedRowKeys: [], newSelectedRows: [] })
              }
              activeKey={activeKey}
              style={{ width: '20%', borderRight: '5px solid #edf0f5' }}
            >
              <Tabs.TabPane tab={<span>&nbsp;&nbsp;本单位&nbsp;&nbsp;</span>} key="本单位">
                <div
                  style={{
                    minHeight: 300,
                    maxHeight: 700,
                    overflow: 'auto',
                  }}
                >
                  {departmentTreeData && departmentTreeData.length > 0 ? (
                    <Tree
                      onSelect={this.onTreeSelect}
                      defaultExpandAll
                      switcherIcon={<CaretDownOutlined style={{ fontSize: 14 }} />}
                    >
                      {this.renderScope(departmentTreeData)}
                    </Tree>
                  ) : null}
                </div>
              </Tabs.TabPane>
              {!hideSupplier && (
                <Tabs.TabPane tab={<span>&nbsp;&nbsp;协同单位&nbsp;&nbsp;</span>} key="协同单位">
                  <div
                    style={{
                      minHeight: 300,
                      maxHeight: 700,
                      overflow: 'auto',
                    }}
                  >
                    {treeData && treeData.length > 0 ? (
                      <Tree
                        switcherIcon={<CaretDownOutlined style={{ fontSize: 14 }} />}
                        defaultExpandedKeys={['0']}
                        expandedKeys={expandedKeys}
                        loadData={this.loadChildrenData}
                        onSelect={this.onSelectSupplier}
                        onExpand={this.onExpandSupplier}
                      >
                        {this.renderTreeNodes(treeData)}
                      </Tree>
                    ) : null}
                  </div>
                </Tabs.TabPane>
              )}
              {/* 暂时注释  后台功能不好用 */}
              {/* <Tabs.TabPane tab="部门" key="部门">
                <div
                  style={{
                    width: 250,
                    minHeight: 300,
                    maxHeight: 700,
                    marginRight: 8,
                    overflow: 'auto',
                  }}
                >
                  {departmentTreeData && departmentTreeData.length > 0 ? (
                    <Tree
                      onSelect={this.onTreeSelect}
                      defaultExpandAll
                      switcherIcon={<CaretDownOutlined style={{ fontSize: 14 }} />}
                      checkable
                      checkStrictly
                      onCheck={(keys, e) => this.onCheckTree('department', keys, e)}
                      checkedKeys={checkedDepartmentKeys}
                    >
                      {this.renderScope(departmentTreeData)}
                    </Tree>
                  ) : null}
                </div>
              </Tabs.TabPane>
              <Tabs.TabPane tab="组" key="组">
                <div>
                  <StandardDataTable
                    requestUrl="/iam/groups"
                    pagination
                    hideInputSearch
                    showHeader={false}
                    columns={[{ title: '11', dataIndex: 'name' }]}
                    rowSelection={(keys, rows) => this.onCheckTree('group', keys, rows)}
                    scroll={{
                      y: 700,
                    }}
                  />
                </div>
              </Tabs.TabPane> */}
            </Tabs>
            <div style={{ width: '41%', borderRight: '5px solid #edf0f5', padding: '8px 8px 0' }}>
              <Form
                layout="inline"
                style={{
                  whiteSpace: 'nowrap',
                }}
              >
                {this.renderForm()}
              </Form>
              <Table
                style={{ marginTop: 8 }}
                rowSelection={activeKey === '部门' || activeKey === '组' ? false : rowSelection}
                columns={this.renderColumns()}
                size="small"
                dataSource={this.renderTableData()}
                rowKey={(row) => row.identifier || row.id}
                pagination={pagination}
                scroll={{ y: 550 }}
              />
            </div>
            <div style={{ flex: 1, minHeight: 300, maxHeight: 715, overflow: 'auto' }}>
              <Spin spinning={!!loading}>
                {(processInstanceId ? processParticipants : participants).map((item) => (
                  <List
                    key={item.id}
                    className={style.antListHeader}
                    size="small"
                    header={
                      <div
                        style={{
                          fontWeight: 'bold',
                          color: '#03608d',
                          marginLeft: 3,
                          cursor: 'pointer',
                        }}
                        onClick={() =>
                          (isAdmin || item.canAddUser) &&
                          !hideAction &&
                          !completed &&
                          item.addAction !== 2
                            ? this.onAddParticipants(item)
                            : null
                        }
                      >
                        {(isAdmin || item.canAddUser) && !hideAction && !completed && (
                          <PlusOutlined
                            style={{ marginRight: 3, visibility: item.addAction === 2 && 'hidden' }}
                          />
                        )}
                        {item.name}
                        {item.activityConfigState === 'REQUIRED' && (
                          <Typography.Text type="danger">*</Typography.Text>
                        )}
                      </div>
                    }
                    dataSource={item.children || []}
                    renderItem={(listItem) => (
                      <div
                        style={{
                          color: '#2f54eb',
                          background: '#f0f5ff',
                          border: '1px solid #adc6ff',
                          borderRadius: 4,
                          padding: 5,
                          margin: '8px 0 8px 8px',
                          display: 'inline-block',
                        }}
                      >
                        <UserOutlined />
                        {listItem.name},{listItem.department}
                        {(isAdmin || item.canRemoveUser) &&
                          !hideAction &&
                          !completed &&
                          item.deleteAction !== 2 && (
                            <CloseOutlined
                              style={{ marginLeft: 4, fontSize: 12 }}
                              onClick={() => this.onDelete(listItem)}
                            />
                          )}
                      </div>
                    )}
                    locale={{ emptyText: <span /> }}
                  />
                ))}
              </Spin>
            </div>
          </div>
        </Card>
        {(taskInfo.processInstanceId || processInstanceId) && (
          <SupplierDescription
            processInstanceId={processInstanceId || taskInfo.processInstanceId}
          />
        )}
        {supplierDesVisible && (
          <SupplierDesModal
            visible={supplierDesVisible}
            dataSource={supplierMember}
            onOk={() => this.addMember(processRowIdentifier)}
            onCancel={() => this.setState({ supplierDesVisible: false })}
          />
        )}
        {preservationTeamVisible && (
          <PreservationTeamModal
            visible={preservationTeamVisible}
            onOk={this.closePreservationTeamModalAndRefresh}
            onCancel={this.closePreservationTeamModal}
            participants={this.state.participants}
            loading={loading}
          />
        )}
        {selectTeamVisible && (
          <SelectTeamModal
            visible={selectTeamVisible}
            onOk={this.closeSelectTeamModalAndRefresh}
            onCancel={this.closeSelectTeamModal}
            taskId={taskId}
            loading={loading}
          />
        )}
      </>
    );
  }
}

export default Participants;

import { Fieldset } from '@cpdm/components';
import { Card, Descriptions, Dropdown, Empty, Menu, Modal, Popover, Space, Table } from 'antd';
import React, { Component } from 'react';
import { getCostInfo, onReview } from './services';
import PopoverContent from './components/PopoverContent';
import CostOverview from './components/CostOverview';
import AssessmentOverview from './components/Assessment';
import HistoryRecord from './components/HistoryRecord';
import { ExclamationCircleOutlined } from '@ant-design/icons';

export default class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      info: {},
      columns: [],
      loading: false,
      overViewVisible: false,
      assessmentVisible: false,
      historyVisible: false,
      record: {},
      empty: false,
    };
  }

  componentDidMount() {
    this.getCostInfo();
  }

  // 分类
  getType = () => {
    return 'total';
    // switch (level) {
    //   case '武器系统':
    //   case 'WQ系统':
    //   case '系统':
    //   case '分系统':
    //     return 'total';
    //   case '单元体':
    //   case '装置':
    //     return 'current'
    //   default:
    //     return '';
    // }
  };

  // 获取展示值
  getValue = (record, subjectIdentifier) => {
    let value = 0;
    if (Array.isArray(record.itemDtos)) {
      record.itemDtos.forEach(item => {
        if (item.subjectIdentifier === subjectIdentifier && item.totalCost) {
          value = item.totalCost;
        }
      });
    }
    return value;
  };

  // 编辑成功
  onSuccess = async (record, sort) => {
    this.setState({ [`${record.type}${sort}${record.lineId}`]: false });
    this.getCostInfo();
  };

  // 提交签审
  onReview = id => {
    if (!id) return;
    Modal.confirm({
      title: '提交签审',
      content: '确认提交签审？',
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        this.setState({ loading: true });
        onReview([id])
          .then(res => {
            this.setState({ loading: false });
            if (res && res.status === 500) return;
            window.open('/plm/app/cost/cost-package/task/pending');
            this.getCostInfo();
          })
          .catch(() => this.setState({ loading: false }));
      },
    });
  };

  // 获取成本信息
  getCostInfo = async () => {
    const { data } = this.props;
    if (!data.id) return;
    const params = {
      partId: data.id,
      partType: data.objectType,
    };
    this.setState({ loading: true });
    const info = await getCostInfo(params);
    this.setState({ loading: false });
    if (info) {
      this.setState({ empty: info.empty });
      if (!info.targetCost && !info.estimateCost && !info.realityCost) {
        return;
      }
      if (info.targetCost) {
        info.targetCost.type = '目标';
      }
      if (info.estimateCost) {
        info.estimateCost.type = '估算';
      }
      if (info.realityCost) {
        info.realityCost.type = '实际';
      }
      this.setState({ info });
    }
  };

  getColumns = () => {
    const columns = [
      {
        title: '产品成本',
        key: 'product',
        render: (value, record) => {
          const type = this.getType(record.productLevelDisplay || record.productLevel);
          if (!type) {
            return 0;
          }

          return (
            <Popover
              visible={this.state[`${record.type}product${record.lineId}`]}
              onVisibleChange={v => this.setState({ [`${record.type}product${record.lineId}`]: v })}
              trigger="click"
              destroyTooltipOnHide
              content={
                <PopoverContent
                  isEdit={record.productItemEdit}
                  onSuccess={() => this.onSuccess(record, 'product')}
                  subjectIdentifier="productCostCourse"
                  title="编辑产品成本"
                  record={record}
                  sort="product"
                  type={type}
                />
              }
            >
              <div
                style={{
                  width: '100%',
                  cursor: 'pointer',
                  border: '1px solid #1890ff',
                  textIndent: 10,
                }}
              >
                {this.getValue(record, 'productCostCourse')}
              </div>
            </Popover>
          );
        },
      },
      {
        title: '研制试验成本',
        key: 'test',
        render: (value, record) => {
          const type = this.getType(record.productLevelDisplay || record.productLevel);
          if (!type || type === 'single') {
            return 0;
          }

          return (
            <Popover
              visible={this.state[`${record.type}test${record.lineId}`]}
              onVisibleChange={v => this.setState({ [`${record.type}test${record.lineId}`]: v })}
              trigger="click"
              destroyTooltipOnHide
              content={
                <PopoverContent
                  isEdit={record.nstituteItemEdit}
                  onSuccess={() => this.onSuccess(record, 'test')}
                  subjectIdentifier="experimentCostCourse"
                  title="编辑试验成本"
                  record={record}
                  sort="test"
                  type={type}
                />
              }
            >
              <div
                style={{
                  width: '100%',
                  cursor: 'pointer',
                  border: '1px solid #1890ff',
                  textIndent: 10,
                }}
              >
                {this.getValue(record, 'experimentCostCourse')}
              </div>
            </Popover>
          );
        },
      },
      {
        title: '研制设计成本',
        key: 'design',
        render: (value, record) => {
          const type = this.getType(record.productLevelDisplay || record.productLevel);
          if (!type || type === 'single') {
            return 0;
          }

          return (
            <Popover
              visible={this.state[`${record.type}design${record.lineId}`]}
              onVisibleChange={v => this.setState({ [`${record.type}design${record.lineId}`]: v })}
              trigger="click"
              destroyTooltipOnHide
              content={
                <PopoverContent
                  isEdit={record.nstituteItemEdit}
                  onSuccess={() => this.onSuccess(record, 'design')}
                  subjectIdentifier="designCostCourse"
                  title="编辑设计成本"
                  record={record}
                  sort="design"
                  type={type}
                />
              }
            >
              <div
                style={{
                  width: '100%',
                  cursor: 'pointer',
                  border: '1px solid #1890ff',
                  textIndent: 10,
                }}
              >
                {this.getValue(record, 'designCostCourse')}
              </div>
            </Popover>
          );
        },
      },
      {
        title: '操作',
        key: 'action',
        align: 'center',
        width: 150,
        render: (v, r) => (
          <Space>
            <a onClick={() => this.setState({ record: r, historyVisible: true })}>历史记录</a>
            {r.review && <a onClick={() => this.onReview(r.lineId)}>提交签审</a>}
          </Space>
        ),
      },
    ];
    return columns;
  };

  render() {
    const {
      info,
      loading,
      overViewVisible,
      assessmentVisible,
      historyVisible,
      record,
      empty,
    } = this.state;

    const columns = this.getColumns();

    return (
      <Card
        size="small"
        title={
          empty ? (
            <span>
              当前部件未启用成本
              <a
                onClick={() =>
                  window.open(
                    `/plm/app/cost/cost-package/create-model?partId=${this.props.data.id}`,
                  )
                }
              >
                去创建
              </a>
            </span>
          ) : (
            <span>
              <span>{`${info.targetCost?.subject || '-'}`}</span>
              <span style={{ marginLeft: 50 }}>{`研制成本负责人：${
                info.targetCost?.nstituteLeaderName || '-'
              }`}</span>
              <span style={{ marginLeft: 50 }}>{`产品成本负责人：${
                info.targetCost?.productLeaderName || '-'
              }`}</span>
            </span>
          )
        }
        loading={loading}
      >
        {empty ? (
          <Empty />
        ) : (
          <>
            <Fieldset
              legend="该节点总成本"
              headStyle={{ backgroundColor: '#fff' }}
              extra={
                <Dropdown
                  overlay={
                    <Menu>
                      <Menu.Item onClick={() => this.setState({ overViewVisible: true })}>
                        成本概览
                      </Menu.Item>
                      <Menu.Item onClick={() => this.setState({ assessmentVisible: true })}>
                        成本工程考核目标
                      </Menu.Item>
                    </Menu>
                  }
                >
                  <a>统计</a>
                </Dropdown>
              }
            >
              <Descriptions size="small" column={3} bordered>
                <Descriptions.Item label="目标成本">{info.total?.targetCost}</Descriptions.Item>
                <Descriptions.Item label="估算成本">{info.total?.estimateCost}</Descriptions.Item>
                <Descriptions.Item label="实际成本">{info.total?.realityCost}</Descriptions.Item>
              </Descriptions>
            </Fieldset>
            <Fieldset
              legend="目标成本"
              headStyle={{ backgroundColor: '#fff' }}
              extra={
                <span>
                  <span>{`当前版本：${info.targetCost?.lineVersion || '-'}`}</span>
                  <span style={{ marginLeft: 50 }}>{`当前状态：${
                    info.targetCost?.lifecycleStateDis || '-'
                  }`}</span>
                  <span style={{ marginLeft: 50 }}>{`当前阶段：${
                    info.targetCost?.phaseMark || '-'
                  }`}</span>
                </span>
              }
            >
              <Table
                size="small"
                columns={columns}
                dataSource={info.targetCost ? [info.targetCost] : []}
                pagination={false}
              />
            </Fieldset>
            <Fieldset
              legend="估算成本"
              headStyle={{ backgroundColor: '#fff' }}
              extra={
                <span>
                  <span>{`当前版本：${info.estimateCost?.lineVersion || '-'}`}</span>
                  <span style={{ marginLeft: 50 }}>{`当前状态：${
                    info.estimateCost?.lifecycleStateDis || '-'
                  }`}</span>
                  <span style={{ marginLeft: 50 }}>{`当前阶段：${
                    info.targetCost?.phaseMark || '-'
                  }`}</span>
                </span>
              }
            >
              <Table
                size="small"
                columns={columns}
                dataSource={info.estimateCost ? [info.estimateCost] : []}
                pagination={false}
              />
            </Fieldset>
            <Fieldset
              legend="实际成本"
              headStyle={{ backgroundColor: '#fff' }}
              extra={
                <span>
                  <span>{`当前版本：${info.realityCost?.lineVersion || '-'}`}</span>
                  <span style={{ marginLeft: 50 }}>{`当前状态：${
                    info.realityCost?.lifecycleStateDis || '-'
                  }`}</span>
                  <span style={{ marginLeft: 50 }}>{`当前阶段：${
                    info.targetCost?.phaseMark || '-'
                  }`}</span>
                </span>
              }
            >
              <Table
                size="small"
                columns={columns}
                dataSource={info.realityCost ? [info.realityCost] : []}
                pagination={false}
              />
            </Fieldset>
          </>
        )}
        {overViewVisible && (
          <CostOverview
            onClose={() => this.setState({ overViewVisible: false })}
            overViewInfo={info.targetCost}
            visible={overViewVisible}
          />
        )}
        {assessmentVisible && (
          <AssessmentOverview
            onClose={() => this.setState({ assessmentVisible: false })}
            overViewInfo={info.targetCost}
            visible={assessmentVisible}
          />
        )}
        {historyVisible && (
          <HistoryRecord
            visible={historyVisible}
            record={record}
            onCancel={() => this.setState({ historyVisible: false })}
          />
        )}
      </Card>
    );
  }
}

import React from 'react';
import { Drawer, Descriptions, Spin, Select, Table, Tooltip, Button } from 'antd';
import { Fieldset } from '@cpdm/components';
import { getLineOverview, statisticsPhase } from '../services';

const descriptionsItem = [
  { lable: '所属型号/部件类型', dataIndex: 'repositoryDisplay' },
  { lable: '当前阶段', dataIndex: 'phase', type: 'select' },
  { lable: '研制目标成本', dataIndex: 'nstituteTargetCost' },
  { lable: '研制估算成本(万元)', dataIndex: 'nstituteEstimateCost' },
  { lable: '目标成本研制费用率', dataIndex: 'nstitutePercent', addonAfter: '%' },
  { lable: '产品目标成本(万元)', dataIndex: 'productTargetCost' },
  { lable: '产品估算成本(万元)', dataIndex: 'productEstimateCost' },
  { lable: '目标成本设计符合度', dataIndex: 'productPercent', addonAfter: '%' },
];

class CostOverview extends React.Component {
  state = {
    selectPhase: [],
    lineOverview: {},
    loading: false,
  };

  componentDidMount() {
    this.getStatisticsPhase();
  }

  getStatisticsPhase = async () => {
    const { overViewInfo = {} } = this.props;
    if (!overViewInfo.partId) return;

    const params = {
      partId: overViewInfo.partId,
      partType: overViewInfo.partType,
    };
    this.setState({ loading: true });
    const res = await statisticsPhase(params);
    this.setState({ loading: false });
    if (Array.isArray(res)) {
      const [phase] = res;
      if (phase) {
        this.getLineOverview(phase);
      }
      this.setState({ selectPhase: res });
    }
  };

  getLineOverview = async phase => {
    const { overViewInfo } = this.props;

    const params = {
      partId: overViewInfo.partId,
      partType: overViewInfo.partType,
      phase,
    };
    this.setState({ phase, loading: true });
    const res = await getLineOverview(params);
    this.setState({ loading: false });
    if (res && res.status !== 500) {
      this.setState({ lineOverview: res });
    }
  };

  renderDescriptions = item => {
    const { selectPhase = [], phase, lineOverview } = this.state;
    const { currentOverViewDto = {} } = lineOverview;
    switch (item.type) {
      case 'select':
        return (
          <Select
            value={phase}
            onChange={newPhase => this.getLineOverview(newPhase)}
            style={{ width: 120 }}
            placeholder="请选择阶段"
          >
            {selectPhase.map(newPhase => (
              <Select.Option key={newPhase}>{newPhase}</Select.Option>
            ))}
          </Select>
        );
      default:
        return currentOverViewDto[item.dataIndex] || currentOverViewDto[item.dataIndex] === 0
          ? `${currentOverViewDto[item.dataIndex]}${item.addonAfter || ''}`
          : '';
    }
  };

  render() {
    const { lineOverview, loading } = this.state;
    const { visible, onClose, overViewInfo } = this.props;
    const { currentOverViewDto = {}, childrenOverViewDtos = [] } = lineOverview;
    const columns = [
      {
        title: '部件名称',
        dataIndex: 'name',
        width: 150,
        render: text => <Tooltip title={text}>{text}</Tooltip>,
      },
      {
        title: '部件编号',
        dataIndex: 'code',
        width: 150,
        render: text => <Tooltip title={text}>{text}</Tooltip>,
      },
      {
        title: '产品批产目标成本',
        children: [
          {
            title: '数值',
            dataIndex: 'productTargetCost',
            width: 70,
          },
          {
            title: '占比(%)',
            dataIndex: 'productTargetCostPercent',
            width: 100,
          },
        ],
      },
      {
        title: '产品批产估算成本',
        children: [
          {
            title: '数值',
            dataIndex: 'productEstimateCost',
            width: 70,
          },
          {
            title: '占比(%)',
            dataIndex: 'productEstimateCostPercent',
            width: 100,
          },
        ],
      },
      {
        title: '研制目标成本',
        children: [
          {
            title: '数值',
            dataIndex: 'nstituteTargetCost',
            width: 70,
          },
          {
            title: '占比(%)',
            dataIndex: 'nstituteTargetCostPercent',
            width: 100,
          },
        ],
      },
      {
        title: '研制估算成本',
        children: [
          {
            title: '数值',
            dataIndex: 'nstituteEstimateCost',
            width: 70,
          },
          {
            title: '占比(%)',
            dataIndex: 'nstituteEstimateCostPercent',
            width: 100,
          },
        ],
      },
    ];
    return (
      <Drawer
        title={<span style={{ color: '#1890ff' }}>成本概览</span>}
        visible={visible}
        width={1100}
        headerStyle={{
          textAlign: 'center',
          fontSize: 16,
          fontWeight: 'bold',
          borderBottom: '1px solid #EAF3FF',
        }}
        onClose={onClose}
      >
        <div style={{ margin: '0 24px 24px' }}>
          <Spin spinning={loading}>
            <Fieldset
              legend="当前部件批准成本概览"
              extra={
                <Button
                  disabled={!overViewInfo?.partId}
                  onClick={() =>
                    window.open(
                      `/plm/api/v2/cost/cost-statistics/export?partId=${overViewInfo?.partId}&partType=${overViewInfo?.partType}`,
                    )
                  }
                >
                  导出
                </Button>
              }
            >
              <Descriptions
                bordered
                contentStyle={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
                labelStyle={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                <Descriptions.Item label="编号(名称,版本)" span={2}>
                  {`${currentOverViewDto.code || ''}(${currentOverViewDto.name || ''},${
                    currentOverViewDto.version || ''
                  })`}
                </Descriptions.Item>
                {descriptionsItem.map(item => (
                  <Descriptions.Item label={item.lable} key={item.dataIndex}>
                    {this.renderDescriptions(item)}
                  </Descriptions.Item>
                ))}
              </Descriptions>
            </Fieldset>
            <Fieldset legend="下级部件产品批产、研制的批准目标成本和估算成本(金额单位：万元)">
              <Table
                columns={columns}
                dataSource={childrenOverViewDtos}
                rowKey={rec => rec.code}
                pagination={false}
                bordered
              />
            </Fieldset>
          </Spin>
        </div>
      </Drawer>
    );
  }
}
export default CostOverview;

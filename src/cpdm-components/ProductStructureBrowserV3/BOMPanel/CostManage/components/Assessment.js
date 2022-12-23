import React from 'react';
import { Drawer, Spin, InputNumber, Button, Descriptions } from 'antd';
import { Fieldset } from '@cpdm/components/es/display';
import { getCostAssess, getCostAssessCompute } from '../services';

class Assessment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      planCompletionPercent: 0,
      testSuccessPercent: 0,
      nsituteLossPercent: 0,
      nsitutePercent: '0%',
      assessment: {},
      loading: false,
      computeLoading: false,
    };
  }

  componentDidMount() {
    this.getLineOverview();
  }

  getLineOverview = async () => {
    const { overViewInfo } = this.props;

    const params = {
      partId: overViewInfo.partId,
      partType: overViewInfo.partType,
    };
    this.setState({ loading: true });
    const res = await getCostAssess(params);
    this.setState({ loading: false });
    if (res && res.code) {
      this.setState({ assessment: res });
    }
  };

  // 计算
  getCostAssessCompute = async () => {
    const {
      assessment,
      planCompletionPercent,
      testSuccessPercent,
      nsituteLossPercent,
    } = this.state;

    const params = {
      planCompletionPercent,
      testSuccessPercent,
      nsituteLossPercent,
      nsitutePercent: assessment.nsitutePercent || 0,
    };
    this.setState({ computeLoading: true });
    const res = await getCostAssessCompute(params);
    this.setState({ computeLoading: false });
    if (res && !res.status === 500) {
      this.setState({ nsitutePercent: `${res}%` });
    }
  };

  render() {
    const { loading, assessment, computeLoading } = this.state;
    const { visible, onClose, overViewInfo } = this.props;

    return (
      <Drawer
        title={<span style={{ color: '#1890ff' }}>成本工程考核目标</span>}
        width={800}
        visible={visible}
        onClose={onClose}
        headerStyle={{
          textAlign: 'center',
          fontSize: 16,
          fontWeight: 'bold',
          borderBottom: '1px solid #EAF3FF',
        }}
      >
        <div style={{ margin: '0 24px 24px' }}>
          <Spin spinning={loading}>
            <Fieldset
              legend="基本信息"
              extra={
                <Button
                  disabled={!overViewInfo.partId}
                  onClick={() =>
                    window.open(
                      `/plm/api/v2/cost/cost-assess/export?partId=${overViewInfo.partId}&partType=${overViewInfo.partType}`,
                    )
                  }
                >
                  导出
                </Button>
              }
            >
              <Descriptions labelStyle={{ fontWeight: 'bold' }} bordered column={2}>
                <Descriptions.Item label="编号（名称，版本）">{`${assessment.code || ''}(${
                  assessment.name || ''
                },${assessment.version || ''})`}</Descriptions.Item>
                <Descriptions.Item label="所属型号/部件类型">
                  {assessment.repositoryDisplay || ''}
                </Descriptions.Item>
                <Descriptions.Item
                  label={<span style={{ color: '#1890ff' }}>目标成本设计符合度</span>}
                >
                  {assessment.productPercent || '0%'}
                </Descriptions.Item>
                <Descriptions.Item
                  label={<span style={{ color: '#1890ff' }}>目标成本研制(阶段)符合度</span>}
                >
                  {this.state.nsitutePercent || '0%'}
                </Descriptions.Item>
              </Descriptions>
            </Fieldset>
            <Fieldset legend="目标成本设计符合度的指标要素">
              <Descriptions labelStyle={{ fontWeight: 'bold' }} bordered column={2}>
                <Descriptions.Item label="产品目标成本">
                  {assessment.productTargetCost || ''}
                </Descriptions.Item>
                <Descriptions.Item label="产品估算成本">
                  {assessment.productEstimateCost || ''}
                </Descriptions.Item>
              </Descriptions>
            </Fieldset>
            <Fieldset legend="目标成本研制(阶段)符合度的指标要素">
              <Descriptions labelStyle={{ fontWeight: 'bold' }} bordered column={2}>
                <Descriptions.Item label={<span style={{ color: '#1890ff' }}>计划完成率</span>}>
                  <InputNumber
                    min={0}
                    defaultValue={0}
                    precision={2}
                    onChange={value => this.setState({ planCompletionPercent: value })}
                    value={this.state.planCompletionPercent}
                  />
                </Descriptions.Item>
                <Descriptions.Item label={<span style={{ color: '#1890ff' }}>试验成功率</span>}>
                  <InputNumber
                    min={0}
                    defaultValue={0}
                    precision={2}
                    onChange={value => this.setState({ testSuccessPercent: value })}
                    value={this.state.testSuccessPercent}
                  />
                </Descriptions.Item>
                <Descriptions.Item
                  label={<span style={{ color: '#1890ff' }}>研制质量损失占比</span>}
                >
                  <InputNumber
                    min={0}
                    defaultValue={0}
                    precision={2}
                    onChange={value => this.setState({ nsituteLossPercent: value })}
                    value={this.state.nsituteLossPercent}
                  />
                </Descriptions.Item>
                <Descriptions.Item
                  label={<span style={{ color: '#1890ff' }}>型号或产品研制成本费用率</span>}
                >
                  {assessment.nsitutePercent || '0%'}
                </Descriptions.Item>
                <Descriptions.Item label="产品研制估算成本">
                  {assessment.nstituteEstimateCost || ''}
                </Descriptions.Item>
                <Descriptions.Item label="相应研制目标成本">
                  {assessment.nstituteTargetCost || ''}
                </Descriptions.Item>
              </Descriptions>
            </Fieldset>
            <div style={{ textAlign: 'center' }}>
              <Button type="primary" loading={computeLoading} onClick={this.getCostAssessCompute}>
                计算
              </Button>
            </div>
          </Spin>
        </div>
      </Drawer>
    );
  }
}
export default Assessment;

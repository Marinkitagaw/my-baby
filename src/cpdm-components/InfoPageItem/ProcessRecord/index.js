import React from 'react';
import { connect } from 'umi';
import { Space } from 'antd';
import Participants from '@/cpdm-components/TaskAssemblyNew/Participants';
import HistoryRecord from '@/cpdm-components/TaskAssemblyNew/HistoryRecord';
import ProcessChart from '@/cpdm-components/TaskAssemblyNew/ProcessChart';
import * as BomServise from '@/services/data/bom';
import * as bacselineService from '@/services/baseline';
import * as changeOrderService from '@/services/changeOrder';
import ProcessInstance from './ProcessInstance';

const docTypeProcess = {
  'DESIGN-DOCS': BomServise.DDocProcess,
  'FUNCTION-DOCS': BomServise.FDocProcess,
  'FACT-DOCS': BomServise.FADocProcess,
  'PROCESS-DOCS': BomServise.PDocProcess,
  'STRUCTURE-DOCS': BomServise.SDocProcess,
  'COMMON-DOCS': BomServise.CDocProcess,
  'CAD-DOCS': BomServise.CADDocProcess,
  DESIGN: BomServise.DPartProcess,
  FUNCTION: BomServise.FPartProcess,
  FACT: BomServise.FAPartProcess,
  SERVICE: BomServise.SPartProcess,
  PROCESS: BomServise.PPartProcess,
  BATCH: BomServise.BPartProcess,
  baseline: bacselineService.baselineProgress,
  ChangeOrder: changeOrderService.ChangeOrderProcesses,
};

@connect(({ processInstance }) => ({
  definitionInfo: processInstance?.definitionInfo,
  page: processInstance?.page,
}))
class ReviewProcesses extends React.Component {
  state = { processInstanceId: undefined };

  componentDidMount() {
    const {
      data: { id, objectType },
    } = this.props;
    this.getProcesses(id, objectType);
  }

  getProcesses = async (id, objectType) => {
    const { dataType } = this.props;
    this.setState({ loadingProcess: true });
    const res = await docTypeProcess[dataType](id, objectType);
    if (res && Array.isArray(res) && res.length) {
      this.setState({
        processInstanceId: res[0].id,
        proccessInstanceDatas: res,
        loadingProcess: false,
      });
    } else {
      this.setState({ loadingProcess: false });
    }
  };

  render() {
    const { processInstanceId, proccessInstanceDatas = [], loadingProcess } = this.state;
    return (
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <ProcessInstance
          proccessInstanceDatas={proccessInstanceDatas || []}
          changeProcessInstanceId={selected => this.setState({ processInstanceId: selected })}
          loading={loadingProcess}
          processInstanceId={processInstanceId}
        />
        {processInstanceId && (
          <>
            <HistoryRecord
              key={processInstanceId}
              processInstanceId={processInstanceId}
              hideStructured="hideStructured"
            />
            <ProcessChart
              style={{ marginTop: 0 }}
              height={400}
              key={processInstanceId}
              processInstanceId={processInstanceId}
            />
            <Participants key={processInstanceId} processInstanceId={processInstanceId} />
          </>
        )}
      </Space>
    );
  }
}

export default ReviewProcesses;

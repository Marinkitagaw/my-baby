import React from 'react';
import { connect } from 'umi';
import { Card } from 'antd';
import { WorkflowViewer, Fieldset } from '@cpdm/components';

@connect(({ reviewTask, processInstance }) => ({
  taskXml: reviewTask.xml,
  processXml: processInstance.xml,
}))
class ProcessChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
      xml: null,
    };
  }

  componentDidMount() {
    const { taskId, dispatch, processInstanceId } = this.props;
    if (processInstanceId) {
      dispatch({
        type: 'processInstance/getProcessXml',
        payload: { processInstanceId },
      }).then(() => {
        const { processXml } = this.props;
        this.setState({ isShow: true, xml: processXml });
      });
    } else {
      dispatch({
        type: 'dashboard/getTask',
        payload: taskId,
        callback: () => {
          dispatch({
            type: 'reviewTask/getTaskXml',
            payload: { taskId },
          }).then(() => {
            const { taskXml } = this.props;
            this.setState({ isShow: true, xml: taskXml });
          });
        },
      });
    }
  }

  render() {
    const { isShow, xml } = this.state;
    return (
      <Card style={{ marginTop: 16 }}>
        <Fieldset legend="流程图">
          <div style={{ height: 800 }}>
            {isShow && xml && xml.xml ? (
              <WorkflowViewer diagramXml={xml.xml} activeTasks={xml.activeTasks} />
            ) : null}
          </div>
        </Fieldset>
      </Card>
    );
  }
}

export default ProcessChart;

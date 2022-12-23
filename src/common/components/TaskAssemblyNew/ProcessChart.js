import React from 'react';
import { connect } from 'umi';
import { Card, Empty } from 'antd';
import WorkflowViewer from './WorkflowViewer';

@connect(({ reviewTask, processInstance, loading }) => ({
  taskXml: reviewTask.xml,
  processXml: processInstance.xml,
  xmlLoading:
    loading.effects['processInstance/getProcessXml'] || loading.effects['reviewTask/getTaskXml'],
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
    } else if (taskId) {
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
    const { height, style, xmlLoading } = this.props;
    let view = <Empty description="无流程图" />;
    if (isShow && xml && xml.xml)
      view = (
        <div style={{ height: height || 800 }}>
          <WorkflowViewer diagramXml={xml.xml} activeTasks={xml.activeTasks} />
        </div>
      );

    return (
      <Card
        bordered={false}
        style={style}
        title="流程图"
        loading={xmlLoading}
        bodyStyle={{ height: '50vh', overflow: 'auto' }}
      >
        {view}
      </Card>
    );
  }
}

export default ProcessChart;

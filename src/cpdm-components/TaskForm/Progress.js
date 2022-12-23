import React, { Fragment } from 'react';
import { Card, Steps } from 'antd';
import moment from 'moment';
import styles from './index.less';

const { Step } = Steps;
class Process extends React.Component {
  componentDidMount() {}

  renderActivity = item => {
    const desc2 = (
      <div className={styles.stepDescription}>
        {/* <Fragment>
           <Icon type="dingding-o" style={{ color: '#00A0E9', marginLeft: 4 }} />
          
        </Fragment> */}
        <Fragment>
          {item.assignee}
          {/* <Icon type="dingding-o" style={{ marginRight: 8 }} /> */}
        </Fragment>
        <div>
          {/* <a href="">催一下</a> */}

          {item.endTime ? moment(item.endTime).format('YYYY-MM-DD HH:mm') : ''}
        </div>
      </div>
    );
    if (item.name) {
      return <Step title={item.name} description={desc2} />;
    }
    return '';
  };

  render() {
    const { task, onGetProcessInstanceData } = this.props;

    // 确定当前节点
    let number = 0;
    if (onGetProcessInstanceData && onGetProcessInstanceData.length && task && task.name) {
      for (let i = 1; i < onGetProcessInstanceData.length; i += 1) {
        if (task.name === onGetProcessInstanceData[i].name) {
          number = i;
          break;
        }
      }
    }

    return (
      <Card type="inner" title="流程进度" style={{ marginTop: 16 }} bordered={false}>
        <Steps current={number}>
          {onGetProcessInstanceData &&
            onGetProcessInstanceData.length &&
            onGetProcessInstanceData.map(this.renderActivity)}
        </Steps>
      </Card>
    );
  }
}

export default Process;

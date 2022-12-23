import React, { PureComponent } from 'react';
import { FrownOutlined } from '@ant-design/icons';
import { Steps, Popover, Badge, Tag, Table } from 'antd';
import classNames from 'classnames';
import moment from 'moment';
import { Ellipsis } from '@cpdm/components';
import styles from '@/styles/info.less';
import commonStyle from '@/styles/common.less';

const { Step } = Steps;

export default class ProcessData extends PureComponent {
  constructor(props) {
    super(props);
    const { content } = this.props;
    this.state = {
      stepDirection: 'horizontal',
      progressInfo: content || [],
    };
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps = newProps => {
    this.setState({
      progressInfo: newProps.content,
    });
  };

  // 渲染卡片的容
  popoverContent = index => {
    const { content } = this.props;
    const { progressInfo } = content;
    const messageContent = progressInfo[index].message;
    return (
      <div style={{ width: 160 }}>
        {messageContent.name}&nbsp;
        <span>
          <Badge
            status="default"
            text={<span style={{ color: 'rgba(0, 0, 0, 0.45)' }}>{messageContent.info}</span>}
          />
        </span>
        <div style={{ marginTop: 4 }}>{messageContent.timeConsuming}</div>
      </div>
    );
  };

  render() {
    const { stepDirection, progressInfo } = this.state;
    const agentPtcp = (
      <Tag color="blue" title="签审代理人">
        代
      </Tag>
    );
    const constantPtcp = (
      <Tag color="geekblue" title="接口人">
        接
      </Tag>
    );
    const normalPtcp = (
      <Tag color="cyan" title="本单位签审人">
        本
      </Tag>
    );
    // 渲染流程中状态点匹配
    const renderStatus = status => {
      let result = '';
      switch (status) {
        case 'Processing':
          result = 'processing';
          break;
        case 'Receive':
          result = 'warning';
          break;
        case 'Success':
          result = 'success';
          break;
        case 'Warning':
          result = 'default';
          break;
        default:
          result = 'default';
          return result;
      }
      return result;
    };

    // 渲染流程节点值
    const popoverContent = (title, index) => (
      <div style={{ width: 160 }}>
        {title}
        <span className={styles.textSecondary} style={{ float: 'right' }}>
          <Badge
            status={renderStatus(progressInfo[index].status)}
            text={
              <span style={{ color: 'rgba(0, 0, 0, 0.45)' }}>
                {progressInfo[index].statusDisplay}
              </span>
            }
          />
        </span>
      </div>
    );
    // 渲染点状步骤条
    const customDot = (dot, { index, title }) => (
      <Popover placement="topLeft" arrowPointAtCenter content={popoverContent(title, index)}>
        {dot}
      </Popover>
    );
    const columns = [
      {
        title: '名称',
        dataIndex: 'principalName',
        render: (text, record) => (
          <span>
            {record.principalType === 'Agent' && agentPtcp}
            {record.principalType === 'Contacts' && constantPtcp}
            {record.principalType === 'User' && normalPtcp}
            {text}
          </span>
        ),
      },
      {
        title: '状态',
        dataIndex: 'statusDisplay',
        render: (text, record) => (
          <Badge
            status={renderStatus(record.status)}
            text={<span style={{ color: 'rgba(0, 0, 0, 0.45)' }}>{text || '未开始'}</span>}
          />
        ),
      },
      {
        title: '开始时间',
        dataIndex: 'claimTime',
        render: val => <span>{val && moment(val).format('YYYY-MM-DD HH:mm')}</span>,
      },
      {
        title: '结束时间',
        dataIndex: 'endTime',
        render: val => <span>{val && moment(val).format('YYYY-MM-DD HH:mm')}</span>,
      },
      {
        title: '说明',
        dataIndex: 'description',
      },
    ];

    // 渲染显示正在进行中的流程
    const renderCount = progresList => {
      if (
        progresList.find(
          value =>
            value.status.toLowerCase() === 'processing' || value.status.toLowerCase() === 'receive'
        )
      ) {
        return progresList.findIndex(
          value =>
            value.status.toLowerCase() === 'processing' || value.status.toLowerCase() === 'receive'
        );
      }
      return progresList.filter(value => value.status.toLowerCase() === 'success').length - 1;
    };
    // 渲染流程数据显示描述
    const renderDescri = item => {
      let result = '';
      if (item.multiInstance) {
        result = item.members.length ? (
          <span>
            <Ellipsis length={4} tooltip style={{ display: 'inline' }}>
              会签参与者小组
            </Ellipsis>
            ·{item.statusDisplay}
          </span>
        ) : (
          ''
        );
      } else if (item.name === '提交审签' || item.name === '修改' || !item.members.length) {
        result = item.assigneeDisplay && (
          <span>
            <Ellipsis length={4} tooltip style={{ display: 'inline' }}>
              {item.assigneeDisplay}
            </Ellipsis>
            ·{item.statusDisplay}
          </span>
        );
      } else {
        item.members.map(mem => {
          result += `${mem.principalName},`;
          return result;
        });
        result = (
          <span>
            <Ellipsis length={4} tooltip style={{ display: 'inline' }}>
              {result.substr(0, result.length - 1)}
            </Ellipsis>
            ·{item.statusDisplay}
          </span>
        );
      }
      const content = memberTeam => (
        <div className={styles.stepDescription_popover}>
          <Table
            columns={columns}
            dataSource={memberTeam}
            size="small"
            pagination={false}
            rowKey={record => record.principalId}
          />
        </div>
      );
      const PopItem = (
        <Tag
          style={{ marginLeft: 4, marginTop: 0, marginBottom: -4 }}
          color={item.multiInstance ? 'cyan' : 'blue'}
        >
          {item.multiInstance ? '会签' : '或签'}
        </Tag>
      );
      const PopoverDisplay = (
        <Popover content={content(item.members)} overlayClassName={styles.c_pop} title="签审小组">
          {result}
          {item.name !== '提交审签' && item.name !== '修改' && item.members.length > 1
            ? PopItem
            : ''}
        </Popover>
      );
      return (
        <div className={classNames(styles.stepDescription)}>
          {item.name !== '提交审签' && item.name !== '修改' ? PopoverDisplay : result}
          {item.endTime && <div>{moment(item.endTime).format('YYYY-MM-DD HH:mm')}</div>}
        </div>
      );
    };
    return (
      <div>
        {Array.isArray(progressInfo) && progressInfo.length ? (
          <Steps
            direction={stepDirection}
            progressDot={customDot}
            current={renderCount(progressInfo)}
          >
            {Array.isArray(progressInfo) &&
              progressInfo.map(progres => (
                <Step
                  title={progres.name}
                  key={progres.userTaskId}
                  description={renderDescri(progres)}
                />
              ))}
          </Steps>
        ) : (
          <div className={commonStyle.noData}>
            <FrownOutlined />
            暂未查询到相关数据，请稍后重试。
          </div>
        )}
      </div>
    );
  }
}

import React from 'react';
import { connect } from 'umi';
import moment from 'moment';
import { Table, List, Tooltip } from 'antd';
import { Modal } from '@cpdm/components';
import style from './index.less';

@connect(({ dashboard, loading }) => ({
  dashboard,
  page: dashboard.page,
  loading: loading.effects['dashboard/listProcessInstanceReviewComments'],
}))
class HistoryRecordOptions extends React.Component {
  componentDidMount() {
    const { processInstanceId } = this.props;
    if (processInstanceId) {
      this.fetchTableData(processInstanceId);
    }
  }

  // 获取审批意见列表
  fetchTableData = (processInstanceId) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'dashboard/listProcessInstanceReviewComments',
      payload: { params: processInstanceId },
    });
  };

  render() {
    const { visible, page = {}, onOK, onCancel, title, loading } = this.props;
    const { content = [] } = page;
    const columns = [
      {
        title: '序号',
        dataIndex: 'index',
        width: 50,
        // sorter: true,
        render: (text, record, index) => <span>{index + 1}</span>,
      },
      {
        title: '协同单位',
        dataIndex: 'reviewerOrg',
        width: 200,
        // sorter: true,
        render: (text) => (
          <Tooltip placement="topLeft" title={text}>
            {text}
          </Tooltip>
        ),
      },
      {
        title: '审批类别',
        dataIndex: 'reviewTypeName',
        width: 100,
        render: (text) => (
          <Tooltip placement="topLeft" title={text}>
            {text}
          </Tooltip>
        ),
      },
      {
        title: '审批人',
        dataIndex: 'reviewerName',
        width: 100,
        render: (text) => (
          <Tooltip placement="topLeft" title={text}>
            {text}
          </Tooltip>
        ),
      },
      {
        title: '审批时间',
        dataIndex: 'reviewDate',
        key: 'reviewDate',
        width: 140,
        render: (text) => (
          <Tooltip placement="topLeft" title={text}>
            {text && moment(text).format('YYYY-MM-DD HH:mm')}
          </Tooltip>
        ),
      },
      {
        title: '问题类别',
        dataIndex: 'requeryTypeName',
        width: 100,
        render(text) {
          return (
            <Tooltip title={text} placement="topLeft">
              {text}
            </Tooltip>
          );
        },
      },
      {
        title: '问题描述',
        dataIndex: 'content',
        // sorter: true,
        width: 150,
        render(text) {
          return (
            <Tooltip title={text} placement="topLeft">
              {text}
            </Tooltip>
          );
        },
      },
      {
        title: '关联数据',
        dataIndex: 'associatedData',
        key: 'associatedData',
        width: 200,
        render(text) {
          return (
            <Tooltip title={text} placement="topLeft">
              {text}
            </Tooltip>
          );
        },
      },
    ];
    return (
      <Modal
        className="tableEllipsis"
        visible={visible}
        title={title}
        onOk={onOK}
        onCancel={onCancel}
        width={1000}
        destroyOnClose
      >
        <Table
          size="small"
          bordered
          scroll={{ x: true }}
          columns={columns}
          loading={loading}
          dataSource={content}
          pagination={false}
          rowKey={(record) => record.id}
          defaultExpandAllRows
          expandedRowKeys={content.length ? content.map((item) => item.id) : []}
          expandedRowRender={(record) =>
            record.answer && (
              <List
                size="small"
                locale={{
                  emptyText: '暂无回复信息',
                }}
                className={style.listDescriptionColor}
                itemLayout="vertical"
                dataSource={record.answer || []}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      className={style.option}
                      avatar={null}
                      title={
                        <div>
                          {!!item.modifyFullName && (
                            <span
                              style={{
                                marginRight: 30,
                                display: 'inline-block',
                                width: 120,
                                overflow: 'inherit',
                              }}
                            >
                              回复人：{item.modifyFullName}
                            </span>
                          )}
                          {!!item.reviewDate && (
                            <span>
                              回复时间：{moment(item.reviewDate).format('YYYY-MM-DD HH:mm')}
                            </span>
                          )}
                        </div>
                      }
                      description={item.content}
                    />
                  </List.Item>
                )}
              />
            )
          }
        />
      </Modal>
    );
  }
}

export default HistoryRecordOptions;

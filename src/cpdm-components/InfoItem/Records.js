import React, { Component } from 'react';
import { FileOutlined } from '@ant-design/icons';
import { Tooltip, Radio, Space } from 'antd';
import { StandardDataTable } from 'cpdm-ui-components';
import moment from 'moment';
import { uuid } from '@cpdm/util';

class Records extends Component {
  constructor(props) {
    super(props);
    const { data } = props;
    if (!data) return '';
    this.state = {
      invalid: true,
      tableProps: {
        requestUrl: `${process.env.API_BASE_PATH}/cpdm/review-records/list-by-object`,
        defaultSearch: {
          invalid: true,
          objectId: data.revisionId || data.objectId || data.id,
          objectType: data.objectType,
        },
        pagination: false,
        hideInputSearch: true,
        rowSelection: false,
        columns: [
          { key: 'id', dataIndex: 'id', width: 36, render: () => <FileOutlined /> },
          {
            title: '签审环节',
            key: 'activityName',
            dataIndex: 'activityName',
            width: 200,
            render: text => (
              <Tooltip placement="topLeft" title={text}>
                {text}
              </Tooltip>
            ),
          },
          {
            title: '签审人',
            key: 'reviewerFullName',
            dataIndex: 'reviewerFullName',
            render: text => (
              <Tooltip placement="topLeft" title={text}>
                {text}
              </Tooltip>
            ),
          },
          {
            title: '签审结果',
            key: 'reviewRoute',
            dataIndex: 'reviewRoute',
            width: 100,
            ellipsis: true,
          },
          {
            title: '签审意见',
            key: 'completionComment',
            dataIndex: 'completionComment',
            render: text => (
              <Tooltip placement="topLeft" title={text}>
                {text}
              </Tooltip>
            ),
          },
          {
            title: '签审时间',
            key: 'reviewTime',
            width: 150,
            dataIndex: 'reviewTime',
            render: text => <span>{text && moment(text).format('YYYY-MM-DD HH:mm')}</span>,
          },

          {
            title: '是否有效',
            key: 'invalid',
            dataIndex: 'invalid',
            width: 80,
            render: text => (text ? '是' : '否'),
          },
        ],
      },
      refreshKey: uuid(),
    };
  }

  render() {
    const { tableProps, refreshKey, invalid } = this.state;
    const { data } = this.props;

    const onChange = ({ target = {} }) => {
      const { value } = target;
      Object.assign(tableProps.defaultSearch, { invalid: value });
      this.setState({
        tableProps,
        invalid: value,
        refreshKey: uuid(),
      });
    };

    return (
      <Space direction="vertical">
        <Radio.Group onChange={onChange} value={invalid}>
          <Radio value={false}>全部记录</Radio>
          <Radio value={!!true}>正式签审记录</Radio>
        </Radio.Group>
        <StandardDataTable key={refreshKey || data.id} {...tableProps} />
      </Space>
    );
  }
}

export default Records;

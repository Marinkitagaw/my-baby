import { Fieldset, Modal } from '@cpdm/components';
import { Popover, Table } from 'antd';
import moment from 'moment';
import React, { Component } from 'react';
import { getHistoryInfo } from '../services';
import PopoverContent from './PopoverContent';

export default class HistoryRecord extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: [],
      columns: [
        {
          title: '版本',
          dataIndex: 'lineVersion',
          ellipsis: true,
          width: 80,
        },
        {
          title: '创建时间',
          dataIndex: 'createStamp',
          ellipsis: true,
          width: 150,
          render: v => (v ? moment(v).format('YYYY-MM-DD hh:mm:ss') : ''),
        },
        {
          title: '创建者',
          dataIndex: 'creatorFullName',
          ellipsis: true,
          width: 80,
        },
        // {
        //   title: '修改时间',
        //   dataIndex: 'modifyStamp',
        //   ellipsis: true,
        //   width: 150,
        //   render: v => (v ? moment(v).format('YYYY-MM-DD hh:mm:ss') : ''),
        // },
        {
          title: '修改者',
          dataIndex: 'modifierFullName',
          ellipsis: true,
          width: 80,
        },
        {
          title: '研制成本负责人',
          dataIndex: 'nstituteLeaderName',
          ellipsis: true,
          width: 120,
        },
        {
          title: '产品成本负责人',
          dataIndex: 'productLeaderName',
          ellipsis: true,
          width: 120,
        },
        {
          title: '状态',
          dataIndex: 'lifecycleStateDis',
          ellipsis: true,
          width: 80,
        },
      ],
      loading: false,
    };
  }

  componentDidMount() {
    this.getHistoryInfo();
  }

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

  getHistoryInfo = async () => {
    const { columns } = this.state;
    const { record } = this.props;

    if (record && record.lineId) {
      this.setState({ loading: true });
      const res = await getHistoryInfo(record.lineId);
      this.setState({ loading: false });
      if (res) {
        if (Array.isArray(res.costLineDtoList)) {
          this.setState({
            dataSource: res.costLineDtoList.map(item => ({
              ...item,
              subject: record.subject,
              phaseMarkDisplay: record.phaseMarkDisplay,
            })),
          });
        }

        const arr = [...columns];
        if (Array.isArray(res.orderPhaseDtoList)) {
          res.orderPhaseDtoList.forEach(item => {
            arr.push({
              title: item.phase,
              children: [
                {
                  title: '产品成本',
                  key: 'product',
                  width: 120,
                  render: (_v, r) => (
                    <Popover
                      visible={this.state[`${item.phase}product${r.lineId}`]}
                      onVisibleChange={v =>
                        this.setState({ [`${item.phase}product${r.lineId}`]: v })
                      }
                      trigger="click"
                      destroyTooltipOnHide
                      content={
                        <PopoverContent
                          isHistory
                          subjectIdentifier="productCostCourse"
                          title="查看产品成本"
                          record={r}
                          sort="product"
                          type="total"
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
                        {this.getValue(r, 'productCostCourse')}
                      </div>
                    </Popover>
                  ),
                },
                {
                  title: '研制试验成本',
                  key: 'test',
                  width: 120,
                  render: (_v, r) => (
                    <Popover
                      visible={this.state[`${item.phase}test${r.lineId}`]}
                      onVisibleChange={v => this.setState({ [`${item.phase}test${r.lineId}`]: v })}
                      trigger="click"
                      destroyTooltipOnHide
                      content={
                        <PopoverContent
                          isHistory
                          subjectIdentifier="experimentCostCourse"
                          title="查看试验成本"
                          record={r}
                          sort="test"
                          type="total"
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
                        {this.getValue(r, 'experimentCostCourse')}
                      </div>
                    </Popover>
                  ),
                },
                {
                  title: '研制设计成本',
                  key: 'design',
                  width: 120,
                  render: (_v, r) => (
                    <Popover
                      visible={this.state[`${item.phase}design${r.lineId}`]}
                      onVisibleChange={v =>
                        this.setState({ [`${item.phase}design${r.lineId}`]: v })
                      }
                      trigger="click"
                      destroyTooltipOnHide
                      content={
                        <PopoverContent
                          isHistory
                          subjectIdentifier="designCostCourse"
                          title="查看设计成本"
                          record={r}
                          sort="design"
                          type="total"
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
                        {this.getValue(r, 'designCostCourse')}
                      </div>
                    </Popover>
                  ),
                },
              ],
            });
          });
          arr.push(
            {
              title: '产品成本总计',
              key: 'productTotal',
              width: 120,
              render: (_v, r) => this.getValue(r, 'productCostTotal'),
            },
            {
              title: '研制成本总计',
              key: 'nsituteTotal',
              width: 120,
              render: (_v, r) => this.getValue(r, 'nsituteCostCourse'),
            },
          );
          this.setState({ columns: arr });
        }
      }
    }
  };

  render() {
    const { visible, onCancel, record } = this.props;
    const { dataSource, columns, loading } = this.state;
    const { subject, type } = record;

    return (
      <Modal visible={visible} onCancel={onCancel} width={1000} title="历史记录" footer={false}>
        <Fieldset legend={`${subject || '-'}的${type || '-'}成本历史记录`} loading={loading}>
          <Table
            size="small"
            bordered
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            scroll={{ x: 1000, y: 500 }}
          />
        </Fieldset>
      </Modal>
    );
  }
}

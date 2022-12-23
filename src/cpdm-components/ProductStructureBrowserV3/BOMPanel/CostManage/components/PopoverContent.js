import { Fieldset } from '@cpdm/components';
import { uuid } from '@cpdm/util';
import { Button, Col, Input, InputNumber, message, Row, Select, Table, Tag, Upload } from 'antd';
import React, { Component } from 'react';
import { getCostItem, getDictionaries, editCostItem, uploadFile } from '../services';
import Required from './Required';

export default class PopoverContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      info: {},
      loading: false,
      detailDtos: [],
      experimentType: [],
      submitLoading: false,
      fileLoading: false,
    };
  }

  componentDidMount() {
    this.getExperimentType();
    this.getInfo();
  }

  // 获取试验类型
  getExperimentType = async () => {
    const res = await getDictionaries('ExperimentType');
    if (Array.isArray(res.ExperimentType)) {
      this.setState({ experimentType: res.ExperimentType });
    }
  };

  // 获取详情
  getInfo = async () => {
    const { record, subjectIdentifier } = this.props;

    let itemId = '';
    if (Array.isArray(record.itemDtos)) {
      record.itemDtos.forEach(item => {
        if (item.subjectIdentifier === subjectIdentifier && item.id) {
          itemId = item.id;
        }
      });
    }

    if (itemId) {
      this.setState({ loading: true });
      const info = await getCostItem(itemId);
      this.setState({ loading: false });
      if (info && info.id) {
        this.setState({ info });

        if (Array.isArray(info.detailDtos)) {
          this.setState({ detailDtos: info.detailDtos.map(item => ({ ...item, key: uuid() })) });
        }
      }
    }
  };

  // 求和
  getSum = arr => {
    let i = 0;
    if (Array.isArray(arr)) {
      arr.forEach(item => {
        if (!isNaN(item * 1)) {
          i = i + item * 1;
        }
      });
    }
    return i;
  };

  // 更新本级成本值
  updataCurrentCost = data => {
    const { info } = this.state;
    this.setState({
      info: {
        ...info,
        currentHierarchyCost: this.getSum([
          ...data.map(item => item.selfCost),
          ...data.map(item => item.experimentCost),
          ...data.map(item => item.otherCost),
        ]),
      },
    });
  };

  // 表格值改变
  onValueChange = (key, name, value) => {
    const { detailDtos } = this.state;

    const arr = detailDtos.map(item => {
      if (item.key === key) {
        return {
          ...item,
          [name]: value,
        };
      }
      return item;
    });

    this.setState({ detailDtos: arr });
    this.updataCurrentCost(arr);
  };

  // 提交
  onSubmit = async () => {
    const { record, subjectIdentifier, onSuccess } = this.props;
    const { info, detailDtos } = this.state;

    let tableData = [...detailDtos];
    if (Array.isArray(tableData)) {
      tableData = tableData.filter(item => {
        let bool = false;
        const arr = Object.keys(item);
        arr.forEach(i => {
          if (i !== 'id' && item[i] && item[i] !== '0.00') {
            bool = true;
          }
        });
        return bool;
      });
    }

    for (let i = 0; i < tableData.length; i++) {
      const item = tableData[i];
      if (!item.name || !item.experimentTypeId) {
        message.info('有必填项未填写，请检查');
        return;
      }
    }

    const data = {
      ...info,
      detailDtos: tableData,
      costLineId: record.lineId,
      itemId: info.id,
      partId: record.partId,
      partType: record.partType,
      partVersion: record.partVersion,
      phase: record.phaseMarkDisplay,
      productLevel: record.productLevel,
      subjectIdentifier,
    };

    this.setState({ submitLoading: true });
    const res = await editCostItem(info.id || '', data);
    this.setState({ submitLoading: false });
    if (res && res.id) {
      onSuccess();
    }
  };

  // 删除行
  onRowDelete = r => {
    const { detailDtos } = this.state;
    const arr = detailDtos.filter(item => item.key !== r.key);
    this.setState({ detailDtos: arr });
    this.updataCurrentCost(arr);
  };

  // 上传附件
  uploadFile = async file => {
    const { info } = this.state;
    const formData = new FormData();
    formData.append('file', file);
    this.setState({ fileLoading: true });
    const res = await uploadFile(formData);
    this.setState({ fileLoading: false });
    if (res && res.fileName) {
      this.setState({ info: { ...info, ...res } });
    }
    return false;
  };

  // 删除附件
  deleteFile = e => {
    const { info } = this.state;
    e.preventDefault();
    this.setState({ info: { ...info, fileName: undefined, fileId: undefined } });
  };

  render() {
    const { info, loading, detailDtos, experimentType, submitLoading, fileLoading } = this.state;
    const { title, record, sort, type, isHistory, isEdit } = this.props;

    const columns = [
      {
        title: '序号',
        width: 50,
        key: 'no',
        render: (v, r, i) => i + 1,
      },
      {
        title: <Required>试验名称</Required>,
        width: 120,
        dataIndex: 'name',
        render: (v, r) => (
          <Input
            disabled={!isEdit}
            value={v || ''}
            readOnly={isHistory}
            style={{ width: '100%' }}
            onChange={e => this.onValueChange(r.key, 'name', e.target.value)}
          />
        ),
      },
      {
        title: <Required>试验类型</Required>,
        width: 120,
        dataIndex: 'experimentTypeId',
        render: (v, r) => (
          <Select
            disabled={!isEdit}
            value={v || ''}
            readOnly={isHistory}
            style={{ width: '100%' }}
            onChange={i => this.onValueChange(r.key, 'experimentTypeId', i)}
          >
            {experimentType.map(item => (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        ),
      },
      {
        title: <Required>参试品成本</Required>,
        width: 100,
        dataIndex: 'selfCost',
        render: (v, r) => (
          <InputNumber
            disabled={!isEdit}
            min={0}
            precision={2}
            readOnly={isHistory}
            value={v || 0}
            style={{ width: '100%' }}
            onChange={i => this.onValueChange(r.key, 'selfCost', i)}
          />
        ),
      },
      {
        title: <Required>试验成本</Required>,
        width: 100,
        dataIndex: 'experimentCost',
        render: (v, r) => (
          <InputNumber
            disabled={!isEdit}
            min={0}
            precision={2}
            readOnly={isHistory}
            value={v || 0}
            style={{ width: '100%' }}
            onChange={i => this.onValueChange(r.key, 'experimentCost', i)}
          />
        ),
      },
      {
        title: <Required>其他成本</Required>,
        width: 100,
        dataIndex: 'otherCost',
        render: (v, r) => (
          <InputNumber
            disabled={!isEdit}
            min={0}
            precision={2}
            readOnly={isHistory}
            value={v || 0}
            style={{ width: '100%' }}
            onChange={i => this.onValueChange(r.key, 'otherCost', i)}
          />
        ),
      },
      {
        title: '试验成本合计',
        width: 100,
        align: 'right',
        key: 'total',
        render: (v, r) => this.getSum([r.selfCost, r.experimentCost, r.otherCost]),
      },
      {
        title: '修改原因',
        width: 120,
        dataIndex: 'modifyReason',
        render: (v, r) => (
          <Input
            disabled={!isEdit}
            value={v || ''}
            readOnly={isHistory}
            style={{ width: '100%' }}
            onChange={e => this.onValueChange(r.key, 'modifyReason', e.target.value)}
          />
        ),
      },
      {
        title: '操作',
        width: 80,
        align: 'center',
        key: 'action',
        render: (v, r) => (
          <Button
            type="link"
            danger
            disabled={isHistory || !isEdit}
            onClick={() => this.onRowDelete(r)}
          >
            删除
          </Button>
        ),
      },
    ];

    return (
      <Fieldset
        style={{ marginBottom: 0, width: sort === 'test' ? 1000 : 500 }}
        loading={loading}
        legend={
          <span>
            {title}
            <span style={{ fontSize: 14, color: 'rgba(0, 0, 0, 0.5)' }}> 单位（万元）</span>
          </span>
        }
        actions={
          isHistory || !isEdit
            ? undefined
            : [
                <Button loading={submitLoading} type="primary" onClick={this.onSubmit}>
                  确定
                </Button>,
              ]
        }
        extra={
          fileLoading ? (
            '请稍后...'
          ) : info.fileId ? (
            <Tag
              closable={!isHistory}
              color="green"
              style={{ cursor: 'pointer' }}
              onClick={() =>
                window.open(
                  `/plm/api/v2/cpdm/download-files?fileId=${info.fileId}&fileName=${info.fileName}`,
                )
              }
              onClose={this.deleteFile}
            >
              {info.fileName}
            </Tag>
          ) : (
            <Upload disabled={isHistory} beforeUpload={this.uploadFile}>
              <a>上传附件</a>
            </Upload>
          )
        }
      >
        <Row gutter={[8, 8]}>
          <Col span={12}>{`部件：${record.subject || '-'}`}</Col>
          <Col span={12}>{`阶段：${record.phaseMarkDisplay || '-'}`}</Col>
          <Col span={12}>
            本级成本：
            <InputNumber
              disabled={!isEdit}
              min={0}
              precision={0}
              readOnly={isHistory || sort === 'test'}
              value={info.currentHierarchyCost || 0}
              onChange={value => this.setState({ info: { ...info, currentHierarchyCost: value } })}
            />
          </Col>
          {type === 'total' && (
            <>
              <Col span={12}>{`下级汇总值：${info.subCostTotal || 0}`}</Col>
              <Col span={12}>
                合计（本级+下级）：
                <InputNumber
                  disabled={!isEdit}
                  min={0}
                  precision={0}
                  readOnly
                  value={this.getSum([info.currentHierarchyCost, info.subCostTotal])}
                />
              </Col>
              <Col span={12}>
                总填报值：
                <InputNumber
                  disabled={!isEdit}
                  min={0}
                  precision={0}
                  readOnly={isHistory}
                  value={info.totalCost || 0}
                  onChange={value => this.setState({ info: { ...info, totalCost: value } })}
                />
              </Col>
            </>
          )}
          {sort === 'test' && (
            <Fieldset
              legend="试验成本"
              style={{ width: '100%' }}
              extra={
                <Button
                  type="primary"
                  disabled={isHistory || !isEdit}
                  onClick={() => this.setState({ detailDtos: [...detailDtos, { key: uuid() }] })}
                >
                  新建
                </Button>
              }
            >
              <Table
                size="small"
                bordered
                dataSource={detailDtos}
                rowKey="key"
                columns={columns}
                pagination={false}
                scroll={{ x: 1000, y: 300 }}
                summary={data => {
                  let selfCostSum = this.getSum(data.map(item => item.selfCost));
                  let experimentCostSum = this.getSum(data.map(item => item.experimentCost));
                  let otherCostSum = this.getSum(data.map(item => item.otherCost));
                  return (
                    <Table.Summary.Row style={{ textAlign: 'right' }}>
                      <Table.Summary.Cell colSpan={3}>合计</Table.Summary.Cell>
                      <Table.Summary.Cell>{selfCostSum}</Table.Summary.Cell>
                      <Table.Summary.Cell>{experimentCostSum}</Table.Summary.Cell>
                      <Table.Summary.Cell>{otherCostSum}</Table.Summary.Cell>
                      <Table.Summary.Cell>
                        {this.getSum([selfCostSum, experimentCostSum, otherCostSum])}
                      </Table.Summary.Cell>
                    </Table.Summary.Row>
                  );
                }}
              />
            </Fieldset>
          )}
        </Row>
      </Fieldset>
    );
  }
}

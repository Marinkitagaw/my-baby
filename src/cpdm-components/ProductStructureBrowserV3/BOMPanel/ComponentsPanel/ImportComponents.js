import React, { Component, Fragment } from 'react';
import { connect } from 'umi';
import { PlusOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { uuid } from '@cpdm/util';
import { Button, Upload, Alert, message, Tabs, Table, Tooltip, Space } from 'antd';
import { Modal } from '@cpdm/components';
import SelectOther from './SelectOther';
import ComparativeData from './ComparativeData';
import Resizable from '../../../../pages/AppService/ProcessDataCollection/DeliverPacket/tabs/components/Resizable';
const { BASE_PATH } = process.env;
@connect(({ component, loading }) => ({
  component,
  loading: loading.effects['component/importComponents'],
  TableLoading: loading.effects['component/getPreview'],
}))
@Form.create()
class UploadModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
      otherVisible: false,
      compareVisible: false,
      selectedRows: [],
      selectKeys: [],
      selectedNotRows: [],
      selectNotKeys: [],
      tabkeys: 'exactMatchs',
      tableKey: uuid(),
      previewData: {},
      exactMatchs: [],
      fuzzyMatchs: [],
      notMatchs: [],
      updateList: {},
      comparaData: [],
    };
  }

  componentDidMount() {}

  // 导入时的确定按钮
  handleUpload = () => {
    const { exactMatchs, notMatchs, fuzzyMatchs } = this.state;
    const { dispatch, onOk, previewParams } = this.props;
    let newData = [];
    fuzzyMatchs.forEach(v => {
      let obj = {};
      if (v.other === true || v.tj === true) {
        obj.importId = v.importId;
        obj.importType = 'update';
        obj.id = v.id;
        newData.push(obj);
      } else if (v.xj === true) {
        obj.importId = v.importId;
        obj.importType = 'create';
        newData.push(obj);
      }
    });
    notMatchs.forEach(v => {
      let obj = {};
      if (v.xj === true) {
        obj.importId = v.importId;
        obj.importType = 'create';
        newData.push(obj);
      } else if (v.other === true || v.tj === true) {
        obj.importId = v.importId;
        obj.importType = 'update';
        obj.id = v.id;
        newData.push(obj);
      }
    });
    exactMatchs.forEach(v => {
      let obj = {};
      obj.id = v.id;
      newData.push(obj);
    });

    dispatch({
      type: 'component/componentsImoprt',
      payload: { list: newData, partId: previewParams.partId },
      callback: () => {
        message.success('导入成功');
        this.setState({ visible: false });
        onOk();
      },
    });
  };

  //选择其他数据确认
  otherOk = selectedRows => {
    const { otherNow, tabkeys, fuzzyMatchs, notMatchs, updateList } = this.state;
    let newList = [];
    let newUpdateList = { ...updateList };
    let newOtherNow = { ...selectedRows };
    newOtherNow.importId = otherNow.importId;
    newOtherNow.other = true;
    if (tabkeys === 'fuzzyMatchs') {
      fuzzyMatchs.forEach(v => {
        if (v.importId === otherNow.importId) {
          newList.push(newOtherNow);
        } else {
          newList.push(v);
        }
      });
      this.setState({
        fuzzyMatchs: [...newList],
      });
    }
    if (tabkeys === 'notMatchs') {
      notMatchs.forEach(v => {
        if (v.importId === otherNow.importId) {
          newList.push(newOtherNow);
        } else {
          newList.push(v);
        }
      });
      this.setState({
        notMatchs: [...newList],
      });
    }
    newUpdateList[otherNow.importId] = otherNow;
    this.setState({
      otherVisible: false,
      tableKey: uuid(),
      updateList: { ...newUpdateList },
    });
  };
  //还原初始数据
  reductionData = record => {
    const { updateList, tabkeys, fuzzyMatchs, notMatchs } = this.state;
    let newData = {};
    let newList = [];
    Object.keys(updateList).forEach(v => {
      if (v === record.importId) {
        newData = { ...updateList[v] };
      }
    });
    if (tabkeys === 'fuzzyMatchs') {
      fuzzyMatchs.forEach(v => {
        if (v.importId === newData.importId) {
          newData.xj = false;
          newData.tj = false;
          newList.push({ ...newData, xj: false, tj: false });
        } else {
          newList.push(v);
        }
      });
      this.setState({
        fuzzyMatchs: [...newList],
      });
    }

    if (tabkeys === 'notMatchs') {
      notMatchs.forEach(v => {
        if (v.importId === otherNow.importId) {
          newData.xj = false;
          newData.tj = false;
          newList.push({ ...newData });
        } else {
          newList.push(v);
        }
      });
      this.setState({
        notMatchs: [...newList],
      });
    }

    this.setState({ tableKey: uuid() });
  };

  otherCancel = () => {
    this.setState({
      otherVisible: false,
    });
  };
  compareOk = () => {
    this.setState({
      compareVisible: false,
    });
  };
  compareCancel = () => {
    this.setState({
      compareVisible: false,
    });
  };

  onSaveFile = info => {
    const { onOk } = this.props;
    const formData = new FormData();
    const obj = info;
    formData.append('file', obj);
    if (info.size > 1024 * 1024 * 200) {
      return message.error('文件大小不可超过200M');
    }
    const { dispatch } = this.props;
    dispatch({
      type: 'component/importComponents',
      payload: formData,
      callback: response => {
        if (!response) {
          message.success('导入成功');
          onOk();
        } else {
          message.error('导入失败');
        }
      },
    });
    return '';
  };

  // 导入时的取消按钮
  handleImportCancel = () => {
    const { onCancel } = this.props;
    onCancel();
    this.setState({
      fileList: [],
    });
  };

  // -------------下载模板
  handleDownLoad = () => {
    window.open(
      // http://localhost:8080/download-templates?type=component
      `${BASE_PATH}/api/v2/resource/resources/download-templates?type=component`,
      '_blank',
    );
  };
  callback = tabkeys => {
    this.setState({
      tabkeys: tabkeys,
    });
  };
  onTj = record => {
    Object.assign(record, { tj: true, xj: false });
    this.setState({ tableKey: uuid() });
  };
  onXj = record => {
    Object.assign(record, { tj: false, xj: true });
    this.setState({ tableKey: uuid() });
  };
  handleTj = () => {
    const { selectedRows } = this.state;
    selectedRows.forEach(v => {
      Object.assign(v, { tj: true, xj: false });
    });
    this.setState({ tableKey: uuid() });
  };
  handleXj = () => {
    const { selectedRows } = this.state;
    selectedRows.forEach(v => {
      Object.assign(v, { tj: false, xj: true });
    });
    this.setState({ tableKey: uuid() });
  };
  notMatchsXj = () => {
    const { selectedNotRows } = this.state;
    selectedNotRows.forEach(v => {
      Object.assign(v, { xj: true });
    });
    this.setState({ tableKey: uuid(), selectedNotRows: [] });
  };
  notMatchsQxXj = () => {
    const { selectedNotRows } = this.state;
    selectedNotRows.forEach(v => {
      Object.assign(v, { xj: false });
    });
    this.setState({ tableKey: uuid(), selectedNotRows: [] });
  };

  getPreviewData = id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'component/getPreview',
      payload: id,
      callback: response => {
        this.setState({
          previewData: response,
          exactMatchs: response.exactMatchs,
          fuzzyMatchs: response.fuzzyMatchs,
          notMatchs: response.notMatchs,
        });
      },
    });
  };

  //获取数据比较数据
  getComparaData = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'component/getCompareData',
      payload: { componentId: record.id, importId: record.importId },
      callback: res => {
        this.setState({
          comparaData: res,
          compareVisible: true,
        });
      },
    });
  };

  import = async () => {
    this.setState({ importLoading: true });
    const { onOk, id } = this.props;
    const { previewDataSource } = this.state;
    await BomServise.importPreviewComponents(id, previewDataSource);
    this.setState({ importLoading: false });
    onOk(id);
  };

  render() {
    const { visible, title, loading, TableLoading } = this.props;
    const {
      fileList,
      tableKey,
      compareVisible,
      otherVisible,
      exactMatchs,
      fuzzyMatchs,
      notMatchs,
      comparaData,
    } = this.state;
    // 导入的数据
    const uploadProps = {
      action: `${BASE_PATH}/api/v2/package/data-packages/upload`,
      showUploadList: true,
      accept: '.xls,.xlsx',
      listType: 'text',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST,GET,PUT,OPTIONS,DELETE',
        'Access-Control-Allow-Headers':
          'Authorization,Content-Type,Access-Control-Allow-Origin,Access-Control-Allow-Methods,Access-Control-Allow-Headers,Access-Control-Allow-Credentials,x-requested-with',
      },
      onChange: info => {
        const { TuploadLoading } = this.state;
        let newFileList = [...info.fileList];
        newFileList = newFileList.slice(-1); // 限制仅能上传一个文件
        this.setState({ fileList: newFileList });
        this.setState({ uploadLoading: true });
        if (!TuploadLoading) {
          if (this.state.importCode) {
            message.success(`${info.file.name} 正在上传...`);
            this.setState({ importCode: false });
          }
        }
        if (info.file.status === 'done') {
          this.setState({
            uploadLoading: false,
            setFileSecret: true,
            newFile: info.file && [info.file],
          });
          this.getPreviewData(info.file.response.objectId);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} 上传失败。`);
          this.setState({ uploadLoading: false });
        }
      },
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: file => {
        this.setState(state => ({
          fileList: [...state.fileList, file],
        }));
      },
      fileList,
    };
    if (process.env.AUTHORIZATION_REQUIRED) {
      const token = sessionStorage.getItem('token');
      Object.assign(uploadProps, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    }
    const renderAlertInfo = (
      <Fragment>
        <p>
          1.
          <a onClick={() => this.handleDownLoad()} target="_self">
            下载元器件导入模板
          </a>
          ，准备导入数据
        </p>
        <p>2. 编辑数据请参考模板要求，不符合规格的，所有数据不能导入验证逻辑：</p>
        <p>(1)、填写物料编码的，以物料编码作为编号去匹配元器件。</p>
        <p>
          (2)、按物料编码未匹配到或未填写物料编码的，以“型号规格”、“生产厂家”、“质量等级”去匹配元器件，仍未匹配到的，则新建改该元器件，编号取“单位代号”+“型号规格”+“厂家简称”+“质量等级”；匹配到的，则比对导入文件的信息和系统中的信息的差异。
        </p>
        <p>(3)、型号规格、厂家简称、质量等级...，必填。</p>
      </Fragment>
    );
    const columns = [
      {
        title: '元器件编号',
        key: 'code',
        dataIndex: 'code',
        ellipsis: true,
        width: 100,
        render: text => (
          <Tooltip title={text} placement="topLeft">
            {text}
          </Tooltip>
        ),
      },
      {
        title: '物料编码',
        key: 'codeOfMaterial',
        dataIndex: 'codeOfMaterial',
        ellipsis: true,
        width: 100,
        render: text => (
          <Tooltip title={text} placement="topLeft">
            {text}
          </Tooltip>
        ),
      },
      {
        title: '元器件名称',
        key: 'name',
        dataIndex: 'name',
        ellipsis: true,
        width: 120,
        render: text => (
          <Tooltip title={text} placement="topLeft">
            {text}
          </Tooltip>
        ),
      },
      {
        title: '型号规格',
        key: 'modelSpecification',
        dataIndex: 'modelSpecification',
        ellipsis: true,
        width: 80,
        render: text => (
          <Tooltip title={text} placement="topLeft">
            {text}
          </Tooltip>
        ),
      },
      {
        title: '采用标准',
        key: 'adoptionStandard',
        dataIndex: 'adoptionStandard',
        ellipsis: true,
        width: 80,
        render: text => (
          <Tooltip title={text} placement="topLeft">
            {text}
          </Tooltip>
        ),
      },
      {
        title: '详细规范',
        key: 'detailSpecification',
        dataIndex: 'detailSpecification',
        ellipsis: true,
        width: 80,
        render: text => (
          <Tooltip title={text} placement="topLeft">
            {text}
          </Tooltip>
        ),
      },
      {
        title: '通用规范',
        key: 'generalSpecification',
        dataIndex: 'generalSpecification',
        ellipsis: true,
        width: 80,
        render: text => (
          <Tooltip title={text} placement="topLeft">
            {text}
          </Tooltip>
        ),
      },
      {
        title: '质量保障等级',
        key: 'qualityGradeLevel',
        dataIndex: 'qualityGradeLevel',
        ellipsis: true,
        width: 120,
        render: text => (
          <Tooltip title={text} placement="topLeft">
            {text}
          </Tooltip>
        ),
      },
      {
        title: '质量等级',
        key: 'qualityLevel',
        dataIndex: 'qualityLevel',
        ellipsis: true,
        width: 100,
        render: text => (
          <Tooltip title={text} placement="topLeft">
            {text}
          </Tooltip>
        ),
      },
      {
        title: '生产厂家',
        key: 'productionFactory',
        dataIndex: 'productionFactory',
        ellipsis: true,
        width: 80,
        render: text => (
          <Tooltip title={text} placement="topLeft">
            {text}
          </Tooltip>
        ),
      },
      {
        title: '分类',
        key: 'classification',
        dataIndex: 'classification',
        ellipsis: true,
        width: 80,
        render: text => (
          <Tooltip title={text} placement="topLeft">
            {text}
          </Tooltip>
        ),
      },
      {
        title: '技术参数',
        key: 'jscs',
        dataIndex: 'jscsd',
        ellipsis: true,
        width: 80,
        render: text => (
          <Tooltip title={text} placement="topLeft">
            {text}
          </Tooltip>
        ),
      },
    ];
    const contentStyle = {
      display: 'inline-block',
      width: 72,
      textAlign: 'center',
      color: '#03bf16',
    };
    const operColumns = [
      {
        title: '操作',
        key: 's',
        dataIndex: 'd',
        fixed: 'right',
        ellipsis: true,
        width: 230,
        render: (text, record) => (
          <Space>
            {record.other === true ? (
              <Button onClick={() => this.reductionData(record)}>还原数据</Button>
            ) : (
              <>
                {record.xj ? (
                  <span style={contentStyle}>√已新建</span>
                ) : (
                  <Button
                    bordered="false"
                    size="small"
                    style={{ backgroundColor: '#d9001b', color: 'white' }}
                    onClick={() => {
                      this.onXj(record);
                    }}
                  >
                    标记新建
                  </Button>
                )}
                <Button
                  bordered="false"
                  size="small"
                  style={{ backgroundColor: '#02a7f0', color: 'white' }}
                  onClick={() => {
                    this.setState({ otherVisible: true, otherNow: record });
                  }}
                >
                  选择其他
                </Button>
              </>
            )}
          </Space>
        ),
      },
    ];
    const operationColumns = [
      {
        title: '操作',
        key: 's',
        dataIndex: 'd',
        ellipsis: true,
        fixed: 'right',
        width: 350,
        render: (text, record) => (
          <Space>
            {record.other === true ? (
              <Button
                bordered="false"
                size="small"
                type="primary"
                onClick={() => this.reductionData(record)}
              >
                还原数据
              </Button>
            ) : (
              <>
                {record.tj ? (
                  <span style={contentStyle}>√已接受</span>
                ) : (
                  <>
                    <Button
                      size="small"
                      bordered="false"
                      disabled={record.useButton ? false : true}
                      style={record.useButton ? { backgroundColor: '#f59a23', color: 'white' } : {}}
                      onClick={() => {
                        this.onTj(record);
                      }}
                    >
                      使用推荐
                    </Button>
                  </>
                )}
                {record.xj ? (
                  <span style={contentStyle}>√已新建</span>
                ) : (
                  <Button
                    bordered="false"
                    size="small"
                    style={{ backgroundColor: '#d9001b', color: 'white' }}
                    onClick={() => {
                      this.onXj(record);
                    }}
                  >
                    标记新建
                  </Button>
                )}

                <Button
                  bordered="false"
                  size="small"
                  style={{ backgroundColor: '#02a7f0', color: 'white' }}
                  onClick={() => {
                    this.setState({ otherVisible: true, otherNow: record });
                  }}
                >
                  选择其他
                </Button>
                <Button
                  bordered="false"
                  size="small"
                  style={{ backgroundColor: '#c280ff', color: 'white' }}
                  onClick={() => {
                    this.getComparaData(record);
                  }}
                >
                  数据比较
                </Button>
              </>
            )}
          </Space>
        ),
      },
    ];
    const otherProps = {
      visible: otherVisible,
      onOk: this.otherOk,
      onCancel: this.otherCancel,
    };
    const compareProps = {
      visible: compareVisible,
      comparaData: comparaData,
      onOk: this.compareOk,
      onCancel: this.compareCancel,
    };
    return (
      <Fragment>
        <Modal
          width={1400}
          destroyOnClose
          title={title}
          maskClosable={false}
          visible={visible}
          onOk={this.handleUpload}
          onCancel={this.handleImportCancel}
          footer={[
            <Button key="cancle" onClick={this.handleImportCancel}>
              取消
            </Button>,
            <Button key="submit" type="primary" loading={loading} onClick={this.handleUpload}>
              导入
            </Button>,
          ]}
        >
          <Alert
            message="提示信息"
            description={renderAlertInfo}
            type="info"
            style={{ marginBottom: '24px' }}
          />
          <p>如果分类不存在，先导入分类,仅支持Excel格式</p>
          <Upload {...uploadProps} fileList={fileList}>
            <Button icon={<PlusOutlined />}>上传文件并预览</Button>
          </Upload>

          <Tabs defaultActiveKey="exactMatchs" onChange={this.callback}>
            <Tabs.TabPane tab="精准匹配" key="exactMatchs">
              <Resizable
                scroll={{ x: 1800 }}
                columns={columns}
                loading={TableLoading}
                rowKey={r => r.importId}
                dataSource={exactMatchs}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="模糊匹配" key="fuzzyMatchs">
              <p>
                <Button
                  style={{ backgroundColor: '#f59a23', color: 'white' }}
                  onClick={() => this.handleTj()}
                >
                  使用推荐
                </Button>
                <Button
                  style={{ backgroundColor: '#d9001b', color: 'white' }}
                  onClick={() => this.handleXj()}
                >
                  标记新建
                </Button>
              </p>

              <Resizable
                scroll={{ x: 1800 }}
                columns={[...columns, ...operationColumns]}
                rowKey={r => r.importId}
                loading={TableLoading}
                dataSource={fuzzyMatchs}
                key={tableKey}
                rowSelection={{
                  type: 'checkbox',
                  fixed: true,
                  defaultSelectedRowKeys: this.state.selectKeys,
                  onChange: (keys, selectedRows) => {
                    this.setState({ selectedRows: selectedRows, selectKeys: keys });
                  },
                }}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="未匹配" key="notMatchs">
              <p>
                <Button
                  onClick={() => this.notMatchsXj()}
                  style={{ backgroundColor: '#d9001b', color: 'white' }}
                >
                  标记新建
                </Button>
                <Button onClick={() => this.notMatchsQxXj()}>取消新建</Button>
              </p>
              <Resizable
                scroll={{ x: 1600 }}
                columns={[...columns, ...operColumns]}
                loading={TableLoading}
                rowKey={r => r.importId}
                dataSource={notMatchs}
                rowSelection={{
                  type: 'checkbox',
                  fixed: true,
                  defaultSelectedRowKeys: this.state.selectKeys,
                  onChange: (keys, selectedRows) => {
                    this.setState({ selectedNotRows: selectedRows, selectNotKeys: keys });
                  },
                }}
              />
            </Tabs.TabPane>
          </Tabs>
        </Modal>
        {otherVisible && <SelectOther {...otherProps} />}
        {compareVisible && <ComparativeData {...compareProps} />}
      </Fragment>
    );
  }
}
export default UploadModal;

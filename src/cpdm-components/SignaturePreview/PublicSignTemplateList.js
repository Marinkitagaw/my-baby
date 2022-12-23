import React, { Component, Fragment } from 'react';
import '@ant-design/compatible/assets/index.css';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Modal, StandardFormRow } from '@cpdm/components';
import { Form, Card, Table, Row, Col, Button, Divider, message, Radio } from 'antd';
import { connect } from 'umi';

import SignItemControllerTemplateModal from './TemplateInfo/Template-signPage-controller-modal';
import PageControllerTemplateModal from './TemplateInfo/Template-page-controller-modal';

@connect(({ signTemplate, loading }) => ({
  signTemplate,
  signexample: signTemplate.signexample,
  loading: loading.effects['signTemplate/getSignTemplates'],
}))
class PublicSigntemplateList extends Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);
    const { signexample } = this.props;
    this.state = {
      signexample,
      signTemplateId: signexample.id || '',
    };
  }

  componentDidMount() {
    this.fetchTemplateExample();
  }

  // 获取模板实例
  fetchTemplateExample = () => {
    const { dispatch } = this.props;
    const { objectId, objectType } = this.props;
    let arr = [];
    if (objectType && objectType.search('.') !== -1) {
      arr = objectType.split('.');
    }
    const type = arr.length > 0 ? arr[arr.length - 1] : objectType;
    dispatch({
      type: 'signTemplate/getSignTemplateOfExample',
      payload: {
        objectId,
        objectType: type,
      },
      callback: res => {
        this.setState(
          {
            signexample: res,
            signExampleName: res.name,
            signTemplateId: res.id,
          },
          () => {
            this.formRef.current.setFieldsValue({
              name: res.signTemplateId,
            });
          },
        );
        this.getPageAndSignItem(res.id);
      },
    }).then(() => {});
  };

  onSignTemplateChange = value => {
    // const { signExampleName } = this.state;
    // if (value.signTemplateName !== signExampleName) {
    //   console.log('value111', value)
    //   this.createSignTemplateExample(value.target.data.signTemplateId);
    // }
    this.createSignTemplateExample(value.signTemplateId);
  };

  createSignTemplateExample = value => {
    // 生成签名实例
    const { dispatch, objectId, objectType } = this.props;
    let arr = [];
    if (objectType && objectType.search('.') !== -1) {
      arr = objectType.split('.');
    }
    const type = arr.length > 0 ? arr[arr.length - 1] : objectType;

    dispatch({
      type: 'signTemplate/createSignTemplateExample',
      payload: {
        objectId,
        objectType: type,
        signTemplateId: value,
      },
      callback: response => {
        if (response.id) {
          this.setState({
            signTemplateId: response.id,
            signExampleName: response.name,
          });
        }
      },
    }).then(() => {
      const { signTemplateId } = this.state;
      this.getPageAndSignItem(signTemplateId);
      this.fetchTemplateExample();
    });
  };

  // 生成实例后，获取页面和签名配置列表
  getPageAndSignItem = signTemplateId => {
    const { dispatch } = this.props;
    dispatch({
      type: 'signTemplate/getSignTemplatePages',
      payload: {
        signTemplateId,
      },
    }).then(() => {
      const {
        signTemplate: { pagesList },
      } = this.props;
      this.setState({
        pagesList,
      });
    });
    dispatch({
      type: 'signTemplate/SignItemTemplatelist',
      payload: {
        signTemplateId,
      },
    }).then(() => {
      const {
        signTemplate: { signItemList },
      } = this.props;
      this.setState({
        signItemList,
      });
    });
  };

  // =========加载详情========
  loadSignInfo = recordId => {
    const { dispatch } = this.props;
    dispatch({
      type: 'signTemplate/getSignTemplateInfo',
      payload: {
        id: recordId,
      },
    });
  };

  // =========修改===========
  handleEditSign = record => {
    this.setState({
      // visible: true,
      // recordId: record.id,
    });
    this.loadSignInfo(record.id);
  };

  // =======模态框=======
  closeModal = () => {
    this.setState({
      // visible: false,
      // recordId: undefined,
    });
  };

  closeModalAndRefresh = () => {
    this.closeModal();
    this.fetchTableList();
  };

  downloadSignTemplateFile = params => {
    const { objectId, objectType } = this.props;
    const { signTemplateId } = this.state;
    if (objectType?.includes('ChangeRequest')) {
      window.open(
        `${process.env.BASE_PATH}/api/v2/change/change-request/${objectId}/sign?isGenerateAttachment=${params.isGenerateAttachment}&objectType=${objectType}&signTemplateId=${signTemplateId}`,
        '_blank',
      );
    }
    if (objectType?.includes('change')) {
      window.open(
        `${process.env.BASE_PATH}/api/v2/change/common-change-order/${objectId}/sign?isGenerateAttachment=${params.isGenerateAttachment}&objectType=${objectType}&signTemplateId=${signTemplateId}`,
        '_blank',
      );
    }
    if (objectType?.includes('document')) {
      window.open(
        `${process.env.BASE_PATH}/api/v2/bom/common-docs/${objectId}/sign?isGenerateAttachment=${params.isGenerateAttachment}&objectType=${objectType}&signTemplateId=${signTemplateId}`,
        '_blank',
      );
    }
    if (objectType?.includes('CadDocument')) {
      window.open(
        `${process.env.BASE_PATH}/api/v2/bom/cad-docs/${objectId}/sign?isGenerateAttachment=${params.isGenerateAttachment}&objectType=${objectType}&signTemplateId=${signTemplateId}`,
        '_blank',
      );
    }
    const type = objectType && objectType.search('document') !== -1 ? 'Document' : objectType;

    switch (type) {
      case 'Drawing':
        window.open(
          `${process.env.BASE_PATH}/api/v2/cpdm/drawings/${objectId}/sign?isGenerateAttachment=${params.isGenerateAttachment}`,
          '_self',
        );
        break;
      case 'TechnicalNotice':
        window.open(
          `${process.env.BASE_PATH}/api/v2/change/technical-notices/sign/${objectId}`,
          '_self',
        );
        break;
      default:
        break;
    }
  };

  // 删除页面配置
  deleteSignTemplatePage = pageId => {
    const { dispatch } = this.props;
    const { signexample } = this.state;
    Modal.confirm({
      title: ' 确定要移除此页面配置?',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        dispatch({
          type: 'signTemplate/deleteSignTemplatePage',
          payload: {
            signTemplateId: signexample.id,
            pageId,
          },
          callback: res => {
            if (res && res.status === 500) {
              message.error('移除失败');
            } else {
              message.success('移除成功');
              this.fetchTemplateExample();
            }
          },
        });
      },
    });
  };

  //  删除签名配置
  SignItemTemplateDelete = signId => {
    const { dispatch } = this.props;
    const { signexample } = this.state;
    Modal.confirm({
      title: ' 确定要移除此页面配置?',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        dispatch({
          type: 'signTemplate/SignItemTemplateDelete',
          payload: {
            signTemplateId: signexample.id,
            signId,
          },
          callback: res => {
            if (res && res.status === 500) {
              message.error('移除失败');
            } else {
              message.success('移除成功');
              this.fetchTemplateExample();
            }
          },
        });
      },
    });
  };

  render() {
    const { signcatogory = [], objectType } = this.props;
    const { signExampleName } = this.state;
    const { pagesList, signItemList, signexample } = this.state;

    const pagecolumns = [
      {
        title: '名称',
        dataIndex: 'name',
        width: 200,
      },
      {
        title: '页码范围',
        dataIndex: 'page',
        render: (text, record) => {
          return <span>{`${record.startPage}页 —— ${record.endPage}页`}</span>;
        },
      },
      {
        title: '操作',
        dataIndex: 'action',
        width: 100,
        render: (text, record) => {
          return (
            <Fragment>
              <PageControllerTemplateModal
                current={record}
                title="编辑模板页面"
                id={signexample && signexample.id}
                getSignTemplatePages={this.fetchTemplateExample}
              >
                <a>编辑</a>
              </PageControllerTemplateModal>
              <Divider type="vertical" />
              <a onClick={() => this.deleteSignTemplatePage(record.id)}>删除</a>
            </Fragment>
          );
        },
      },
    ];

    const templatecolumns = [
      {
        title: '签名配置模板名称',
        dataIndex: 'name',
      },
      {
        title: '所属页面',
        dataIndex: 'signTemplatePageName',
        // filters: pageFilter(),
      },
      {
        title: '标识',
        dataIndex: 'signKey',
      },
      {
        title: '签名项类型',
        dataIndex: 'itemType',
        render: val => {
          switch (val) {
            case 0:
              return '对象属性';
            case 1:
              return '签审信息';
            default:
              return '其他';
          }
        },
      },
      {
        title: '状态',
        dataIndex: 'disabled',
        render: val => (val ? '禁用' : '启用'),
      },
      {
        title: 'X轴坐标',
        dataIndex: 'x',
      },
      {
        title: 'X轴偏移量',
        dataIndex: 'offsetX',
      },
      {
        title: 'Y轴坐标',
        dataIndex: 'y',
      },
      {
        title: 'Y轴偏移量',
        dataIndex: 'offsetY',
      },
      {
        title: '旋转度',
        dataIndex: 'rotation',
      },
      {
        title: '对齐方式',
        dataIndex: 'align',
        render: val => {
          switch (val) {
            case 0:
              return '左对齐';
            case 1:
              return '居中';
            default:
              return '右对齐';
          }
        },
      },
      {
        title: '字体',
        dataIndex: 'fontFamily',
      },
      {
        title: '字体大小',
        dataIndex: 'fontSize',
      },
      {
        title: '字体粗细',
        dataIndex: 'fontWeight',
      },
      {
        title: '说明',
        dataIndex: 'description',
      },
      {
        title: '操作',
        dataIndex: 'action',
        render: (text, record) => {
          return (
            <Fragment>
              <SignItemControllerTemplateModal
                current={record}
                title="编辑签名配置模板"
                SignItemTemplatelist={this.fetchTemplateExample}
                id={signexample && signexample.id}
                pagesList={pagesList}
              >
                <a>编辑</a>
              </SignItemControllerTemplateModal>
              <Divider type="vertical" />
              <a onClick={() => this.SignItemTemplateDelete(record.id)}>删除</a>
            </Fragment>
          );
        },
      },
    ];

    return (
      <Card bordered={false}>
        <StandardFormRow grid last style={{ marginTop: 0, height: 50 }}>
          <Row gutter={10}>
            <Col span={18}>
              <Form
                layout="inline"
                initialValues={{
                  name: signExampleName,
                }}
                ref={this.formRef}
              >
                <Form.Item label="模板" name="name">
                  <Radio.Group
                    placeholder="请选择签名模板"
                    // onChange={this.onSignTemplateChange}
                  >
                    {signcatogory.map(item => (
                      <Radio
                        key={item.signTemplateId}
                        value={item.signTemplateId}
                        onClick={() => this.onSignTemplateChange(item)}
                        data={item}
                      >
                        {item.signTemplateName}
                      </Radio>
                    ))}
                  </Radio.Group>
                </Form.Item>
              </Form>
            </Col>
            <Col span={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
              {objectType === 'TechnicalNotice' ? (
                <Button type="primary" onClick={this.downloadSignTemplateFile}>
                  生成签名文件
                </Button>
              ) : (
                <div>
                  <Button
                    type="primary"
                    style={{ marginRight: 12 }}
                    onClick={() => this.downloadSignTemplateFile({ isGenerateAttachment: false })}
                    disabled={signcatogory.length === 0}
                  >
                    签名文件预览
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => this.downloadSignTemplateFile({ isGenerateAttachment: true })}
                    disabled={signcatogory.length === 0}
                  >
                    重新电子签名
                  </Button>
                </div>
              )}
            </Col>
          </Row>
        </StandardFormRow>
        <Card
          title="页面管理"
          style={{ marginTop: 20, marginBottom: 24 }}
          extra={
            <PageControllerTemplateModal
              current={{}}
              title="添加模板页面"
              id={signexample && signexample.id}
              getSignTemplatePages={this.fetchTemplateExample}
            >
              <Button
                style={{ marginLeft: 16 }}
                type="primary"
                icon={<PlusCircleOutlined />}
                size="small"
              >
                添加页面
              </Button>
            </PageControllerTemplateModal>
          }
        >
          <Table
            size="middle"
            rowKey={record => record.id}
            columns={pagecolumns}
            dataSource={Array.isArray(pagesList) ? pagesList : []}
            pagination={false}
          />
        </Card>
        <Card
          title="签名配置模板管理"
          style={{ marginBottom: 24 }}
          extra={
            <SignItemControllerTemplateModal
              current={{}}
              title="添加签名配置模板管理"
              id={signexample && signexample.id}
              SignItemTemplatelist={this.fetchTemplateExample}
              pagesList={pagesList}
            >
              <Button
                style={{ marginLeft: 16 }}
                type="primary"
                icon={<PlusCircleOutlined />}
                size="small"
              >
                添加签名配置模板
              </Button>
            </SignItemControllerTemplateModal>
          }
        >
          <Table
            size="middle"
            onChange={this.handleTableChange}
            columns={templatecolumns}
            rowKey={record => record.id}
            dataSource={Array.isArray(signItemList) ? signItemList : []}
            // pagination={pagination}
            pagination={false}
          />
        </Card>
      </Card>
    );
  }
}

export default PublicSigntemplateList;

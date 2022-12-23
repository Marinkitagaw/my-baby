import {
  Card,
  PageHeader,
  Form,
  Row,
  Col,
  Input,
  Button,
  message,
  Modal,
  Table,
  Pagination,
} from 'antd';
import { Fieldset, CreateForm, Content } from '@cpdm/components';
import { AppstoreTwoTone } from '@ant-design/icons';
import React, { useForm, useEffect, useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect, history } from 'umi';
import { values } from 'lodash';
import { useParams } from 'react-router-dom';
import UploadPackage from '../../UpLoadPackage';
import ClassificationPicker from '../../ClassificationPicker';
import { getCreateForm, getCategoryId } from '@/common/services/toolset/list/toolset';
import { ContentRole } from '@cpdm/components/es/form/Content';

const CreatrFrom = props => {
  const [form] = Form.useForm();
  const { dispatch, dataSource, treeData, createLoading, editLoading, subLoading } = props;
  const { id } = useParams(props);
  const [schemas, setSchemas] = useState();
  const [infoData, setInfoData] = useState();
  const [categoryId, setCategoryId] = useState();
  const [content, setContent] = useState([]);
  const formRef = useRef();

  const handleCreate = values => {
    setContent(values.contents);
    const classId = values.classificationId[0];
    dispatch({
      type: 'toolset/createToolSet',
      payload: {
        ...values,
        classificationId: classId,
        categoryId: categoryId,
      },
      callback: res => {
        if (res) {
          message.success('创建成功');
          window.open(`/plm/app/tool-management/toolset/${res.id}/info`, '_self');
        } else {
          message.error('创建失败');
          window.open('/plm/app/tool-management/toolset/list', '_self');
        }
      },
    });
  };
  const handleCreateAndSub = values => {
    setContent(values.contents);
    const classId = values.classificationId[0];
    dispatch({
      type: 'toolset/createToolSet',
      payload: {
        ...values,
        classificationId: classId,
        categoryId: categoryId,
      },
      callback: res => {
        if (res) {
          dispatch({
            type: 'toolset/subApply',
            payload: {
              body: [res],
            },
          }).then(res => {
            if (res && res.status !== 500) {
              message.success('保存并提交审批成功');
              window.open('/plm/app/tool-management/task/pending', '_self');
            } else {
              window.open('/plm/app/tool-management/toolset/list', '_self');
            }
          });
        } else {
          message.error('创建失败');
        }
      },
    });
  };

  const handleEdit = values => {
    setContent(values.contents);
    const classId = values.classificationId;
    dispatch({
      type: 'toolset/editToolSet',
      payload: {
        ...values,
        id: id,
        classificationId: classId,
      },
      callback: res => {
        if (res) {
          message.success('编辑成功');
          window.open(`/plm/app/tool-management/toolset/${res.id}/info`, '_self');
        } else {
          message.error('编辑失败');
          window.open('/plm/app/tool-management/toolset/list', '_self');
        }
      },
    });
  };

  const handleEditAndSub = values => {
    setContent(values.contents);
    const classId = values.classificationId[0];
    if (infoData.revision === 'A') {
      dispatch({
        type: 'toolset/editToolSet',
        payload: {
          ...values,
          id: id,
          classificationId: classId,
        },
        callback: res => {
          if (res) {
            dispatch({
              type: 'toolset/subApply',
              payload: {
                body: [res],
              },
            }).then(res => {
              if (res) {
                message.success('保存并提交审批成功');
                window.open('/plm/app/tool-managementt/task/pending', '_self');
              }
            });
          } else {
            message.error('编辑失败');
          }
        },
      });
    } else {
      dispatch({
        type: 'toolset/editToolSet',
        payload: {
          ...values,
          id: id,
          classificationId: classId,
        },
        callback: res => {
          if (res) {
            dispatch({
              type: 'toolset/subUpdateApply',
              payload: {
                body: [res],
              },
            }).then(res => {
              if (res) {
                message.success('保存并提交审批成功');
                window.open('/plm/app/tool-managementt/task/pending', '_self');
              }
            });
          } else {
            message.error('编辑失败');
          }
        },
      });
    }
  };

  useEffect(() => {
    getTree();
  }, []);

  useEffect(() => {
    if (id) {
      loadData(id);
    }
  }, [schemas]);

  useEffect(() => {
    (async () => {
      const res = await getCategoryId('ToolSet');
      if (res) {
        setCategoryId(res.id);
        const createForm = await getCreateForm({
          categoryId: res.id,
          screenTypeIdentifier: 'CREATE',
        });
        if (createForm && createForm.formContent) {
          const formSchema = JSON.parse(createForm.formContent);
          setSchemas(formSchema);
        }
      }
    })();
  }, []);

  //加载数据
  const loadData = id => {
    dispatch({
      type: 'toolset/loadingData',
      payload: {
        id: id,
      },
    }).then(res => {
      setContent(res.contents);
      setInfoData(res);
    });
  };
  const handelCancel = () => {
    window.open('/plm/app/tool-managementt/toolset/list', '_self');
  };
  //获取树节点
  const getTree = () => {
    dispatch({
      type: 'toolset/getTreeData',
      payload: {
        identifier: 'SoftwareTool',
        level: 'all',
        self: true,
      },
    });
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 7 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
      md: { span: 10 },
    },
  };
  const validateMessages = {
    required: "'${name}' 是必选字段",
    // ...
  };
  const onContent = value => {
    setContent(value);
  };
  return (
    <PageHeaderWrapper title={id ? '修改工具项' : '创建工具项'} breadcrumb={false}>
      <Card bordered={false}>
        <Form form={form} style={{ marginTop: 8 }}>
          <Fieldset legend="基本信息">
            {schemas && schemas.schema && (
              <CreateForm schema={schemas} ref={formRef} initialValues={infoData} />
            )}
          </Fieldset>
          <Form style={{ marginRight: 'calc(25%)' }}>
            <Form.Item label="主要文件" labelCol={{ span: 3, offset: 1 }} required>
              <Content
                value={content}
                contentRole={ContentRole.SECONDARY}
                onChange={onContent}
                ref={formRef}
              />
            </Form.Item>
          </Form>
          <Form.Item>
            <p style={{ textAlign: 'center' }}>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginRight: '15px' }}
                onClick={() => {
                  if (formRef && formRef?.current?.form?.submit) {
                    formRef.current.form.submit(values => {
                      values.contents = content;
                      if (id) {
                        handleEdit(values);
                      } else {
                        handleCreate(values);
                      }
                    });
                  } else {
                    message.error('报错了');
                  }
                }}
                loading={createLoading}
              >
                保存
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginRight: '15px' }}
                onClick={() => {
                  if (formRef && formRef?.current?.form?.submit) {
                    formRef.current.form.submit(values => {
                      values.contents = content;
                      if (id) {
                        handleEditAndSub(values);
                      } else {
                        handleCreateAndSub(values);
                      }
                    });
                  } else {
                    message.error('报错了');
                  }
                }}
                loading={subLoading}
              >
                保存并提交
              </Button>
              <Button onClick={handelCancel}>取消</Button>
            </p>
          </Form.Item>
        </Form>
      </Card>
    </PageHeaderWrapper>
  );
};

export default connect(({ toolset, loading }) => {
  return {
    dataSource: toolset.dataSource,
    treeData: toolset.treeData,
    createLoading: loading.effects['toolset/createToolSet'],
    subLoading: loading.effects['toolset/subApply'],
    editLoading: loading.effects['toolset/editToolSet'],
  };
})(CreatrFrom);

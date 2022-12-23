import React from 'react';
import { connect } from 'umi';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { SchemaForm, Submit, createFormActions, FormButtonGroup } from '@uform/antd';
import { Modal } from '@cpdm/components';
import { message, Button } from 'antd';
import { history } from 'umi';
import UploadPackage from './UploadPackage';

const actions = createFormActions();

@connect(({ dashboard, loading, requirement, deliverPackages }) => ({
  dashboard,
  taskForm: dashboard.taskForm,
  taskInfo: dashboard.taskInfo,
  packageInfo: deliverPackages.packageInfo,
  loading: loading.effects['dashboard/completeTask'],
  contentLoading: loading.effects['dashboard/getTaskFiles1'],
  requirementRecord: requirement.requirementRecord,
}))
@Form.create()
class UForm extends React.Component {
  state = {
    secretLevelDatas: [],
    contents: [],
  };

  componentDidMount() {
    const { dispatch, taskId } = this.props;
    dispatch({
      type: 'dashboard/getTaskForm',
      payload: { taskId },
    });
    this.getTaskFiles1();

    dispatch({
      type: 'dictionary/getDictEntries',
      payload: {
        code: 'SecretLevel',
      },
      callback: (response) => {
        this.setState({
          secretLevelDatas: response.SecretLevel,
        });
      },
    });
  }

  getTaskFiles1 = () => {
    const { dispatch, taskId, processInstanceId } = this.props;
    dispatch({
      type: 'dashboard/getTaskFiles1',
      payload: { taskId, processInstanceId },
      callback: (res) => {
        this.setState({
          contents: res,
        });
      },
    });
  };

  // 保存任务
  onSchemaSaveForm = () => {
    const { onSaveForm } = this.props;
    if (!onSaveForm) {
      return message.error('未找到保存方法');
    }
    onSaveForm();
    return '';
  };

  // 完成任务
  onSchemaSubmitForm = (formValue) => {
    const { onSave, confirmContent, packageInfo, taskInfo } = this.props;
    console.log(taskInfo);

    if (taskInfo.name === '上传数据包') {
      if (packageInfo.id) {
        if (onSave) {
          onSave(() => this.onSubmit(formValue));
          return;
        }
        if (confirmContent) {
          Modal.confirm({
            content: confirmContent,
            okText: '确认',
            cancelText: '取消',
            onOk: () => this.onSubmit(formValue),
          });
        } else {
          this.onSubmit(formValue);
        }
      } else {
        message.error('请上传数据包');
      }
    } else {
      if (onSave) {
        onSave(() => this.onSubmit(formValue));
        return;
      }
      if (confirmContent) {
        Modal.confirm({
          content: confirmContent,
          okText: '确认',
          cancelText: '取消',
          onOk: () => this.onSubmit(formValue),
        });
      } else {
        this.onSubmit(formValue);
      }
    }
  };

  onSubmit = (formValue) => {
    const { dispatch, taskId, saveVerification, form, showUploadFile } = this.props;
    let flag = true;
    if (saveVerification) {
      flag = saveVerification(formValue);
    }

    const location = window.location.search.substr(1);
    if (flag) {
      if (showUploadFile) {
        form.validateFieldsAndScroll((err, values) => {
          const { contents = [] } = values;
          let confidentialityLevelName = false;
          if (contents && contents.length > 0) {
            contents.map((item) => {
              if (!item.confidentialityLevelName) {
                confidentialityLevelName = true;
              }
              return item;
            });
          }
          if (confidentialityLevelName) {
            message.error('附件密级不能为空');
            return;
          }
          if (contents.length > 0) {
            dispatch({
              type: 'dashboard/saveContents',
              payload: {
                fileList: contents,
              },
              callback: () => {
                dispatch({
                  type: 'dashboard/completeTask',
                  payload: {
                    taskId,
                    ...formValue,
                  },
                  callback: () => {
                    if (location.indexOf('utm_source') > -1) {
                      // cpdm1.0跳转
                      const locationArr = window.location.search.substr(1).split('&');
                      let pendingName = null;
                      locationArr.map((item) => {
                        if (item.indexOf('utm_source') > -1) {
                          const name = item.split('=')[1];
                          pendingName = name;
                        }
                        return '';
                      });
                      window.location.href = `${process.env.BASE_PATH}${pendingName}`;
                    } else {
                      history.go(-1);
                    }
                  },
                });
              },
            });
          } else {
            dispatch({
              type: 'dashboard/completeTask',
              payload: {
                taskId,
                ...formValue,
              },
              callback: () => {
                if (location.indexOf('utm_source') > -1) {
                  // cpdm1.0跳转
                  const locationArr = window.location.search.substr(1).split('&');
                  let pendingName = null;
                  locationArr.map((item) => {
                    if (item.indexOf('utm_source') > -1) {
                      const name = item.split('=')[1];
                      pendingName = name;
                    }
                    return '';
                  });
                  window.location.href = `${process.env.BASE_PATH}${pendingName}`;
                } else {
                  history.go(-1);
                }
              },
            });
          }
        });
      } else {
        dispatch({
          type: 'dashboard/completeTask',
          payload: {
            taskId,
            ...formValue,
          },
          callback: () => {
            if (location.indexOf('utm_source') > -1) {
              // cpdm1.0跳转
              const locationArr = window.location.search.substr(1).split('&');
              let pendingName = null;
              locationArr.map((item) => {
                if (item.indexOf('utm_source') > -1) {
                  const name = item.split('=')[1];
                  pendingName = name;
                }
                return '';
              });
              window.location.href = `${process.env.BASE_PATH}${pendingName}`;
            } else {
              history.go(-1);
            }
          },
        });
      }
    }
  };

  render() {
    const {
      form,
      taskForm,
      hideTitle,
      onSave,
      onReset,
      completed,
      loading,
      taskId,
      processInstanceId,
      contentLoading,
      showUploadFile,
      taskInfo,
    } = this.props;
    const { getFieldDecorator } = form;
    const { sendMessage = false } = taskInfo;
    const { secretLevelDatas = [], contents = [] } = this.state;
    let schema = null;
    // const proper = {};
    if (taskForm) {
      schema = { type: 'object', properties: taskForm };
    }
    return (
      <div style={{ marginTop: 16 }}>
        {hideTitle ? null : (
          <div style={{ marginBottom: 16 }}>
            <span style={{ fontSize: 18 }}>审核结果</span>
          </div>
        )}
        {taskForm && !completed && !sendMessage ? (
          <div>
            {showUploadFile ? (
              <Form.Item>
                {getFieldDecorator('contents', {
                  initialValue: contents,
                })(
                  <UploadPackage
                    getTaskFiles1={this.getTaskFiles1}
                    loading={contentLoading}
                    taskId={taskId}
                    processInstanceId={processInstanceId}
                    SecretLevel={secretLevelDatas}
                  />,
                )}
              </Form.Item>
            ) : (
              ''
            )}
            <SchemaForm
              schema={schema}
              labelCol={2}
              wrapperCol={12}
              onSubmit={this.onSchemaSubmitForm}
              actions={actions}
              className="Uform"
            >
              {onSave ||
              (onSave && taskInfo.name !== '指定会签者' && taskInfo.name !== '协同会签') ? (
                <FormButtonGroup offset={10}>
                  <Button onClick={() => onSave()} type="primary">
                    保存
                  </Button>
                  {onReset ? <Button onClick={() => onReset()}>重置</Button> : null}
                  <Submit loading={loading} style={{ padding: 0 }}>
                    <Button loading={loading} type="primary">
                      保存并完成任务
                    </Button>
                  </Submit>
                </FormButtonGroup>
              ) : (
                <FormButtonGroup offset={11}>
                  <Submit loading={loading} style={{ padding: 0 }}>
                    <Button loading={loading} type="primary">
                      完成任务
                    </Button>
                  </Submit>
                </FormButtonGroup>
              )}
            </SchemaForm>
          </div>
        ) : null}
      </div>
    );
  }
}
export default UForm;

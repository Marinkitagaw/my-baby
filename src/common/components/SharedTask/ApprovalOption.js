import React, { PureComponent } from 'react';
import { connect } from 'umi';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Switch, Radio, Select, Input, DatePicker, Button } from 'antd';
import moment from 'moment';

const RadioGroup = Radio.Group;
const dateFormat = 'YYYY-MM-DD';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

@connect(({ revieworder, dictionary }) => ({
  dictEntries: dictionary.dictEntries,
  departments: revieworder.departments,
}))
@Form.create()
class ApprovalOption extends PureComponent {
  componentDidMount() {
    const { dispatch, processInstanceId } = this.props;
    if (processInstanceId) {
      console.log(processInstanceId);
    } else {
      dispatch({
        type: 'dictionary/getDictEntries',
        payload: {
          code: 'SecretLevel,ReviewOrderType,TaskReviewType,TaskIssueType,MeetingDataType,AttendingType,PersonnelLevel',
        },
      });
      dispatch({
        type: 'revieworder/getDepartments',
      });
    }
  }

  onSubmitForm = () => {
    const {
      form: { validateFields },
      onOk,
    } = this.props;
    validateFields((err, values) => {
      if (!err && onOk) {
        console.log('values', values);
        onOk(values);
      }
    });
  };

  render() {
    const { form, dictEntries, departments } = this.props;
    const { approvalInfo = {}, onCancel, confirmLoading } = this.props;
    console.log('approvalInfo', approvalInfo, dictEntries);
    const { getFieldDecorator, getFieldValue } = form;
    return (
      <Form {...formItemLayout}>
        <Form.Item label="代理意见">
          {getFieldDecorator('agent', {
            initialValue: approvalInfo && approvalInfo.agent ? approvalInfo.agent : false,
            rules: [
              {
                required: true,
                message: '请选择代理意见',
                type: 'boolean',
              },
            ],
          })(
            <Switch checkedChildren="开" unCheckedChildren="关" checked={getFieldValue('agent')} />,
          )}
        </Form.Item>
        {getFieldValue('agent') && (
          <div>
            <Form.Item label="签审类别">
              {getFieldDecorator('reviewType', {
                initialValue:
                  approvalInfo && approvalInfo.reviewType ? approvalInfo.reviewType : '',
                rules: [
                  {
                    required: true,
                    message: '请输入签审类别',
                  },
                ],
              })(
                <RadioGroup>
                  {dictEntries.TaskReviewType &&
                    dictEntries.TaskReviewType.length &&
                    dictEntries.TaskReviewType.map((item) => (
                      <Radio key={item.id} value={item.id}>
                        {item.name}
                      </Radio>
                    ))}
                </RadioGroup>,
              )}
            </Form.Item>
            <Form.Item label="签审单位">
              {getFieldDecorator('reviewerOrg', {
                initialValue:
                  approvalInfo && approvalInfo.reviewerOrg ? approvalInfo.reviewerOrg : '',
                rules: [
                  {
                    required: true,
                    message: '请选择签审单位',
                  },
                ],
              })(
                departments && departments.length > 0 && (
                  <Select placeholder="选择签审单位">
                    {departments.map((item) => (
                      <Select.Option key={item.id} value={item.name}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                ),
              )}
            </Form.Item>
            <Form.Item label="签审人">
              {getFieldDecorator('reviewerName', {
                initialValue:
                  approvalInfo && approvalInfo.reviewerName ? approvalInfo.reviewerName : '',
                rules: [
                  {
                    required: true,
                    message: '请输入签审人',
                  },
                ],
              })(<Input placeholder="请输入签审人" />)}
            </Form.Item>
            <Form.Item label="签审日期">
              {getFieldDecorator('reviewDate', {
                initialValue:
                  approvalInfo &&
                  approvalInfo.reviewDate &&
                  moment(approvalInfo.reviewDate, dateFormat),
                rules: [
                  {
                    required: true,
                    message: '请输入签审日期',
                  },
                ],
              })(<DatePicker style={{ width: '100%' }} format={dateFormat} />)}
            </Form.Item>
          </div>
        )}

        <Form.Item label="问题类别">
          {getFieldDecorator('requeryType', {
            initialValue: approvalInfo && approvalInfo.requeryType ? approvalInfo.requeryType : '',
            rules: [
              {
                required: true,
                message: '请输入问题类别',
              },
            ],
          })(
            <Radio.Group>
              {dictEntries.TaskIssueType &&
                dictEntries.TaskIssueType.length &&
                dictEntries.TaskIssueType.map((item) => (
                  <Radio key={item.id} value={item.id}>
                    {item.name}
                  </Radio>
                ))}
            </Radio.Group>,
          )}
        </Form.Item>
        <Form.Item label="问题描述">
          {getFieldDecorator('content', {
            initialValue: approvalInfo && approvalInfo.content ? approvalInfo.content : '',
            rules: [
              {
                required: true,
                message: '请输入问题描述',
              },
            ],
          })(<Input.TextArea rows={4} placeholder="请输入问题描述" />)}
        </Form.Item>
        {approvalInfo && approvalInfo.associatedData ? (
          <Form.Item label="关联数据">
            <span>{approvalInfo.associatedData.subject}</span>
          </Form.Item>
        ) : null}
        <div
          style={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            width: '100%',
            borderTop: '1px solid #e9e9e9',
            padding: '10px 16px',
            background: '#fff',
            textAlign: 'right',
          }}
        >
          <Button onClick={onCancel} style={{ marginRight: 8 }}>
            取消
          </Button>
          <Button loading={confirmLoading} onClick={this.onSubmitForm} type="primary">
            提交
          </Button>
        </div>
      </Form>
    );
  }
}
export default ApprovalOption;

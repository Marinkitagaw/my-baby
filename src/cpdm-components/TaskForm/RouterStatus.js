import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Card, Button, Input, Radio, Upload } from 'antd';

const RadioGroup = Radio.Group;
@Form.create()
class RouterStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 1 };
  }

  componentDidMount() {}

  render() {
    const { value } = this.state;
    const { loading, form, onComplete } = this.props;
    const completeTask = () => {
      // console.log('默认的完成任务方式');
    };
    const customCompleteTask = event => {
      event.stopPropagation();
      event.preventDefault();
      if (onComplete) {
        onComplete(completeTask);
      } else {
        completeTask();
      }
    };
    const { getFieldDecorator } = form;
    const formItemLayout1 = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 2 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 10 },
      },
    };

    return (
      <Card title="审批结果">
        <Form {...formItemLayout1}>
          <Form.Item label="备注">
            {getFieldDecorator('description', {
              rules: [
                {
                  required: false,
                  message: '请输入备注',
                },
              ],
            })(<Input.TextArea rows={3} placeholder="请输入问题描述" />)}
          </Form.Item>

          <Form.Item label="问题类别">
            <RadioGroup onChange={this.valueOnChange} value={value}>
              <Radio value={1}>通过</Radio>
              <Radio value={2}>驳回</Radio>
              <Radio value={3}>快速驳回</Radio>
            </RadioGroup>
          </Form.Item>

          <Form.Item label="上传文件">
            <Upload>
              <Button>
                <UploadOutlined /> 上传文件
              </Button>
              <div>支持扩展名：.rar .zip .doc .docx .pdf .jpg...</div>
            </Upload>
            ,
          </Form.Item>
          <Button size="large" style={{ marginLeft: 500, marginRight: 20 }}>
            保存任务
          </Button>
          <Button
            size="large"
            type="primary"
            loading={loading}
            onClick={customCompleteTask}
          ></Button>
        </Form>
      </Card>
    );
  }
}

export default RouterStatus;

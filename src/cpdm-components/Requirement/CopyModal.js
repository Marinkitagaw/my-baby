import React, { PureComponent } from 'react';
import { connect } from 'umi';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Radio, TreeSelect, message } from 'antd';
import { Modal } from '@cpdm/components';
import { Repository } from '@cpdm/components';

const FormItem = Form.Item;
@connect(({ requirement, loading }) => ({
  requirement,
  loading: loading.effects['requirement/copyRequirements'],
}))
@Form.create()
class CopyModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      parentDataSource: [],
    };
  }

  componentDidMount() {
    const { repositoryId } = this.props;
    // this.getModelSeries();
    this.listRequirements({ repositoryId }, 'data');
  }

  // -------获取父类需求第一级
  listRequirements = (params = {}, itemType) => {
    const { dispatch, form } = this.props;
    const { parentDataSource, dataSource } = this.state;
    form.setFieldsValue({
      parentId: undefined,
    });
    dispatch({
      type: 'requirement/listRequirements',
      payload: params,
      callback: response => {
        if (Array.isArray(response)) {
          const arr = response.map(item => ({
            id: item.id,
            pId: 0,
            title: `${item.code},${item.name}`,
            value: item.id,
            isLeaf: item.leaf,
          }));
          this.setState({
            parentDataSource: itemType !== 'data' ? arr : parentDataSource,
            dataSource: itemType === 'data' ? arr : dataSource,
          });
        }
      },
    });
  };

  // ------异步加载树
  onLoadParentRequirements = (treeNode, itemType) =>
    new Promise(resolve => {
      const { dispatch } = this.props;
      const { parentDataSource, dataSource } = this.state;
      const {
        props: { id },
      } = treeNode;
      dispatch({
        type: 'requirement/listSubRequirementStructure',
        payload: {
          parentId: id,
        },
        callback: response => {
          if (response && Array.isArray(response)) {
            const content = response.map(item => ({
              id: item.id,
              value: item.id,
              pId: id,
              title: `${item.code},${item.name}`,
              isLeaf: item.leaf,
            }));

            this.setState({
              parentDataSource:
                itemType !== 'data' ? parentDataSource.concat(content) : parentDataSource,
              dataSource: itemType === 'data' ? dataSource.concat(content) : dataSource,
            });
            resolve();
          }
        },
      });
    });

  handleCopyOk = () => {
    const { dispatch, form, onOk } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'requirement/copyRequirements',
          payload: {
            ...values,
          },
          callback: res => {
            if (!res.message) {
              message.success('复制成功。');
              onOk();
            } else {
              message.error('复制失败。');
            }
          },
        });
        onOk();
      }
    });
  };

  handleCopyCancel = () => {
    const { onCancel } = this.props;
    onCancel();
  };

  OnRepositoryChange = value => {
    this.listRequirements({ repositoryId: value });
    // this.modelSeriesChange(value);
  };

  render() {
    const {
      form: { getFieldDecorator, getFieldValue },
      title,
      copyVisible,
      loading,
    } = this.props;
    const { dataSource = [], parentDataSource = [] } = this.state;

    const formItemLayout = {
      labelCol: {
        sm: { span: 6 },
      },
      wrapperCol: {
        md: { span: 16 },
      },
    };
    return (
      <Modal
        destroyOnClose
        title={title}
        visible={copyVisible}
        width={600}
        maskClosable={false}
        onOk={this.handleCopyOk}
        confirmLoading={loading}
        onCancel={this.handleCopyCancel}
        style={{ padding: 5 }}
      >
        <FormItem {...formItemLayout} style={{ height: 30 }} label="本型号数据">
          {getFieldDecorator('requirementId', {
            rules: [
              {
                required: true,
                message: '请选择数据',
              },
            ],
          })(
            <TreeSelect
              treeDataSimpleMode
              style={{ width: '100%' }}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder="请选择数据"
              loadData={treeNode => this.onLoadParentRequirements(treeNode, 'data')}
              treeData={dataSource || []}
            />,
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="型号">
          {getFieldDecorator('repositoryId', {
            // initialValue: basicInfo.repositoryId,
            rules: [
              {
                required: true,
                whitespace: true,
                message: '请输入型号',
              },
            ],
          })(
            <Repository
              onChange={this.OnRepositoryChange}
              extraQuery={{ requirementEnabled: true }}
            />,
          )}
        </FormItem>
        <FormItem {...formItemLayout} style={{ height: 30 }} label="目标父项需求">
          {getFieldDecorator(
            'parentId',
            {},
          )(
            <TreeSelect
              disabled={!getFieldValue('repositoryId')}
              treeDataSimpleMode
              style={{ width: '100%' }}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder="请选择目标父项需求"
              loadData={this.onLoadParentRequirements}
              treeData={parentDataSource || []}
              allowClear
            />,
          )}
        </FormItem>
        <FormItem {...formItemLayout} style={{ height: 25 }} label="交付项">
          {getFieldDecorator('deliver', {
            rules: [
              {
                required: true,
                message: '请选择',
              },
            ],
          })(
            <Radio.Group>
              <Radio value>复制</Radio>
              <Radio value={false}>不复制</Radio>
            </Radio.Group>,
          )}
        </FormItem>
        <FormItem {...formItemLayout} style={{ height: 25 }} label="创建人">
          {getFieldDecorator('creator', {
            rules: [
              {
                required: true,
                message: '请选择创建人',
              },
            ],
          })(
            <Radio.Group>
              <Radio value="old">保留原需求创建人</Radio>
              <Radio value="me">我</Radio>
            </Radio.Group>,
          )}
        </FormItem>
      </Modal>
    );
  }
}
export default CopyModal;

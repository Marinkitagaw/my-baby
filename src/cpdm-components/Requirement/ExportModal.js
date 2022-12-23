import React, { PureComponent } from 'react';
import { connect } from 'umi';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Select, TreeSelect } from 'antd';
import { Modal } from '@cpdm/components';

const { Option } = Select;
const FormItem = Form.Item;
@connect(({ requirement }) => ({
  requirement,
}))
@Form.create()
class ExportModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      rowVisible: false,
      parentDataSource: [],
    };
  }

  // -------获取父类需求第一级
  listRequirements = (params = {}) => {
    const { dispatch, repositoryId } = this.props;
    dispatch({
      type: 'requirement/listRequirements',
      payload: repositoryId ? { repositoryId } : params,
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
            parentDataSource: arr,
          });
        }
      },
    });
  };

  // ------异步加载树
  onLoadParentRequirements = treeNode =>
    new Promise(resolve => {
      const { dispatch } = this.props;
      const { parentDataSource } = this.state;
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
              parentDataSource: parentDataSource.concat(content),
            });
            resolve();
          }
        },
      });
    });

  selectOnchange = value => {
    if (value === 'select') {
      this.setState(
        {
          rowVisible: true,
        },
        () => {
          this.listRequirements();
        },
      );
    } else {
      this.setState({
        rowVisible: false,
      });
    }
  };

  handleExportOk = () => {
    const { BASE_PATH } = process.env;
    const { form, repositoryId, onOk, partId } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // eslint-disable-next-line prefer-destructuring
        const fileName = values.fileName;
        const exportId = values.requirementId;
        // eslint-disable-next-line prefer-destructuring
        const type = values.type;
        window.open(
          `${BASE_PATH}/api/v2/requirement/requirements/export?repositoryId=${repositoryId}&requirementId=${
            exportId || ''
          }&fileName=${fileName || ''}&type=${type || ''}&partId=${partId || ''}`,
          '_self',
        );
        onOk();
        this.setState({
          rowVisible: false,
        });
      }
    });
  };

  handleExportCancel = () => {
    const { onCancel } = this.props;
    this.setState({
      rowVisible: false,
    });
    onCancel();
  };

  render() {
    const {
      form: { getFieldDecorator },
      title,
      exportVisible,
    } = this.props;

    const { parentDataSource = [], rowVisible } = this.state;

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
        visible={exportVisible}
        width={500}
        maskClosable={false}
        onOk={this.handleExportOk}
        onCancel={this.handleExportCancel}
      >
        <FormItem {...formItemLayout} label="文件名">
          {getFieldDecorator('fileName', {
            rules: [
              {
                required: true,
                message: '请输入文件名',
              },
            ],
          })(<Input maxLength={50} placeholder="请输入文件名" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="要导出的数据">
          {getFieldDecorator('type', {
            initialValue: 'all',
            rules: [
              {
                required: true,
                message: '请选择',
              },
            ],
          })(
            <Select style={{ width: '100%' }} onChange={this.selectOnchange}>
              <Option value="all">全部记录</Option>
              <Option value="select">选中记录</Option>
            </Select>,
          )}
        </FormItem>
        {rowVisible ? (
          <FormItem {...formItemLayout} label="选择数据">
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
                loadData={this.onLoadParentRequirements}
                treeData={parentDataSource || []}
              />,
            )}
          </FormItem>
        ) : (
          ''
        )}
      </Modal>
    );
  }
}
export default ExportModal;

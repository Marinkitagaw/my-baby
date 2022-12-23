import React from 'react';
import '@ant-design/compatible/assets/index.css';
import { Modal } from '@cpdm/components';
import { Space, Button } from 'antd';
import * as bomService from '@/services/data/bom';
import FormGenerator from '@/cpdm-components/FormGenerator';
import { createFormActions } from '@formily/antd';
import BomSelectPicker from '../BomSelectPicker';
import { stringify } from 'qs';

export const actions = createFormActions();

class NewPart extends React.PureComponent {
  state = { referencePart: undefined, submitLoading: false };

  handleCancel = () => {
    const { onCancel } = this.props;
    Modal.confirm({
      title: '确认是否取消',
      content: '所有未保存的数据将丢失',
      onOk: () => {
        onCancel();
      },
      okText: '确定',
      cancelText: '取消',
    });
  };

  createPart = async values => {
    const { addFn, dataType, id } = this.props;
    let res;
    switch (dataType) {
      case 'FUNCTION':
        res = await bomService.FPartAddStruture(id, [values]);
        break;
      case 'DESIGN':
        res = await bomService.DPartAddStruture(id, [values]);
        break;
      case 'PROCESS':
        res = await bomService.PPartAddStruture(id, [values]);
        break;
      case 'FACT':
        res = await bomService.FAPartAddStruture(id, [values]);
        break;
      case 'SERVICE':
        res = await bomService.SPartAddStruture(id, [values]);
        break;
      case 'BATCH':
        res = await bomService.BPartAddStruture(id, [values]);
        break;
      default:
        break;
    }
    if (res && res.id) {
      if (addFn) addFn(res);
    } else {
      this.setState({ submitLoading: false });
    }
  };

  newPart = async values => {
    const { addFn, dataType } = this.props;
    let res;
    switch (dataType) {
      case 'FUNCTION':
        res = await bomService.FPartCreate(values);
        break;
      case 'DESIGN':
        res = await bomService.DPartCreate(values);
        break;
      case 'PROCESS':
        res = await bomService.PPartCreate(values);
        break;
      case 'FACT':
        res = await bomService.FAPartCreate(values);
        break;
      case 'SERVICE':
        res = await bomService.SPartCreate(values);
        break;
      case 'BATCH':
        res = await bomService.BPartCreate(values);
        break;
      default:
        break;
    }
    if (res && res.id) {
      if (addFn) addFn(res);
    } else {
      this.setState({ submitLoading: false });
    }
  };

  onSubmit = async values => {
    const { cardType } = this.props;
    this.setState({ submitLoading: true });
    if (cardType) {
      this.newPart(values);
    } else {
      this.createPart(values);
    }
  };

  render() {
    const { visible, dataType, parentData = {}, params = {} } = this.props;
    const { referencePart, submitLoading } = this.state;
    const pageProps = {
      action: 'CREATE',
      dataType,
      data:
        dataType === 'FACT' || dataType === 'SERVICE'
          ? referencePart
          : { ...parentData, code: null, name: null, productLevel: null },
      getAttrUrl: `/bom/${dataType.toLowerCase()}-parts/forms/create-json-schema?${stringify({
        ...params,
      })}`,
      onSubmit: this.onSubmit,
      hideSubmitButton: true,
      actions,
    };

    return (
      <Modal
        width={1200}
        visible={visible}
        onCancel={() => this.handleCancel()}
        title="新建部件"
        footer={
          <Space>
            <Button
              type="primary"
              loading={submitLoading}
              onClick={() => {
                actions.getFormState(state => {
                  actions
                    .validate()
                    .catch()
                    .then(() => {
                      this.onSubmit(state.values);
                    });
                });
              }}
            >
              确定
            </Button>
            <Button disabled={submitLoading} onClick={this.handleCancel}>
              取消
            </Button>
          </Space>
        }
      >
        {(dataType === 'FACT' || dataType === 'SERVICE') && (
          <BomSelectPicker
            dataType="DESIGN"
            onChange={selectd => this.setState({ referencePart: selectd })}
          />
        )}
        <FormGenerator key={referencePart && referencePart.id} {...pageProps} />
      </Modal>
    );
  }
}

export default NewPart;

import React, { useState } from 'react';
import { Space, Button } from 'antd';
import '@ant-design/compatible/assets/index.css';
import { Modal } from '@cpdm/components';
import FormGenerator from '@/cpdm-components/FormGenerator';
import * as bomService from '@/services/data/bom';
import { createFormActions } from '@formily/antd';
import { stringify } from 'qs';

export const actions = createFormActions();

export default props => {
  const { visible, docType, dataType, addFn, onCancel, params = {} } = props;
  const [submitLoading, setsubmitLoading] = useState(false);
  const renderDataType = type => {
    let t;
    if (type.includes('Structure')) {
      t = 'STRUCTURE-DOCS';
    }
    if (type.includes('InsideDocument')) {
      t = 'INSIDE-DOCS';
    }
    if (type.includes('OutsideDocument')) {
      t = 'OUTSIDE-DOCS';
    }
    if (type.includes('KnowledgeDocument')) {
      t = 'KNOWLEDGE-DOCS';
    }
    return t || 'COMMON-DOCS';
  };

  const createDoc = {
    FUNCTION: bomService.FDocCreate,
    DESIGN: bomService.DDocCreate,
    PROCESS: bomService.PDocCreate,
    FACT: bomService.FADocCreate,
    BATCH: bomService.BDocCreate,
    SERVICE: bomService.CDocCreate,
    COMMON: bomService.CDocCreate,
  };

  const onSubmit = async value => {
    setsubmitLoading(true);
    const res = await createDoc[dataType]({ ...value, objectType: docType });
    setsubmitLoading(false);
    if (res && res.id) {
      if (addFn) addFn(res);
    }
  };

  const handleCancel = () => {
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

  const pageProps = {
    action: 'CREATE',
    dataType: docType ? renderDataType(docType) : 'COMMON-DOCS',
    getAttrUrl: `/bom/${
      dataType === 'SERVICE' ? 'common' : dataType.toLowerCase()
    }-docs/forms/create-json-schema?${stringify({ ...params, objectType: docType })}`,
    params,
    onSubmit,
    hideSubmitButton: true,
    actions,
  };
  return (
    <Modal
      width={1200}
      visible={visible}
      onCancel={onCancel}
      bodyStyle={{ height: '70vh', overflow: 'auto' }}
      title="新建文档"
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
                    onSubmit(state.values);
                  });
              });
            }}
          >
            确定
          </Button>
          <Button disabled={submitLoading} onClick={handleCancel}>
            取消
          </Button>
        </Space>
      }
    >
      <FormGenerator {...pageProps} />
    </Modal>
  );
};

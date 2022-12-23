import React from 'react';
import { Drawer, Button, Space } from 'antd';
import FormGenerator from '@/cpdm-components/FormGenerator';
import { createFormActions } from '@formily/antd';
import * as BomServise from '@/services/data/bom';

const editComponents = {
  DESIGN: BomServise.DPartEditComponents,
  FACT: BomServise.FAPartEditComponents,
};

export const actions = createFormActions();

class DrawerForm extends React.Component {
  onSubmit = async values => {
    const { dataType, record, onOk } = this.props;
    const linkId = record.link && record.link.id;
    const res = await editComponents[dataType](linkId, values);
    if (res && res.id) {
      onOk(res.id);
    }
  };

  render() {
    const { visible, onCancel, record, dataType } = this.props;
    const customRecord = record;
    const pageProps = {
      labelCol: 9,
      wrapperCol: 15,
      action: 'UPDATE',
      dataType: `${dataType}-COMPONENTS`,
      getAttrUrl: `/bom/design-parts/components/forms/create-json-schema`,
      onSubmit: this.onSubmit,
      onCancel,
      hideSubmitButton: true,
      data: customRecord,
      actions,
    };

    return (
      <>
        <Drawer
          title="编辑"
          width={820}
          onClose={onCancel}
          visible={visible}
          footer={
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Space>
                <Button
                  type="primary"
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
                <Button onClick={onCancel}>取消</Button>
              </Space>
            </div>
          }
        >
          <FormGenerator {...pageProps} />
        </Drawer>
      </>
    );
  }
}

export default DrawerForm;

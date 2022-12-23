import React from 'react';
import { connect } from 'umi';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Modal } from '@cpdm/components';
import * as partService from '@/services/data/part';
import FormGenerator from '@/cpdm-components/FormGenerator';
// import { PartType, ProductCategory, ProductType, Source, Unit, ViewPicker } from './FormItem';

@Form.create()
class PartForm extends React.PureComponent {
  onCancel = () => {
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
    const { addFn } = this.props;
    const res = await partService.create(values);
    if (res && res.id) {
      if (addFn) addFn(res);
    }
  };

  onSubmit = async () => {
    const { form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (err) return;
      this.createPart(values);
    });
  };

  render() {
    const { visible, onCancel, dataType } = this.props;
    const pageProps = {
      action: 'CREATE',
      dataType,
      getAttrUrl: `/bom/${dataType}-parts`,
      onSubmit: this.onSubmit,
    };
    return (
      <Modal width={1200} visible={visible} onCancel={onCancel} title="新建部件" footer={null}>
        <FormGenerator {...pageProps} />
      </Modal>
    );
  }
}

export default connect(({ part, category, loading }) => ({
  part: part.part,
  typeTree: category.typeTree,
  loading: loading.effects['part/create'] || loading.effects['part/edit'],
}))(PartForm);

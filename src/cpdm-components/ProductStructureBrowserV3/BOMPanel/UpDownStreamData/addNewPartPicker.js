import React from 'react';
import { connect } from 'umi';
import '@ant-design/compatible/assets/index.css';
import { Modal } from '@cpdm/components';
import * as bomService from '@/services/data/bom';
import FormGenerator from '@/cpdm-components/FormGenerator';
import BomSelectPicker from '../BomSelectPicker';
// import { PartType, ProductCategory, ProductType, Source, Unit, ViewPicker } from './FormItem';

class PartForm extends React.PureComponent {
  state = { referencePart: undefined };

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
    const { addFn, dataType, id } = this.props;
    let res;
    switch (dataType) {
      case 'FUNCTION':
        res = await bomService.FPartAddStruture(id, values);
        break;
      case 'DESIGN':
        res = await bomService.DPartAddStruture(id, values);
        break;
      case 'PROCESS':
        res = await bomService.PPartAddStruture(id, values);
        break;
      case 'FACT':
        res = await bomService.FAPartAddStruture(id, values);
        break;
      default:
        break;
    }
    if (res && res.id) {
      if (addFn) addFn(res);
    }
  };

  onSubmit = async values => {
    this.createPart(values);
  };

  render() {
    const { visible, onCancel, dataType, parentData = {} } = this.props;
    const { referencePart } = this.state;
    const pageProps = {
      action: 'CREATE',
      dataType,
      data: dataType === 'FACT' ? referencePart : parentData,
      getAttrUrl: `/bom/${dataType.toLowerCase()}-parts/forms/create-json-schema`,
      onSubmit: this.onSubmit,
    };
    return (
      <Modal width={1200} visible={visible} onCancel={onCancel} title="新建部件" footer={null}>
        {dataType === 'FACT' && (
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

export default connect(({ part, loading }) => ({
  part: part.part,
  loading: loading.effects['part/create'] || loading.effects['part/edit'],
}))(PartForm);

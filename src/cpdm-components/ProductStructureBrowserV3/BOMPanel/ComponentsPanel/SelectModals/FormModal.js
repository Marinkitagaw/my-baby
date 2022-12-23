import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Form, Input, Row, Col, message } from 'antd';
import { RepositoryPicker, SecretLevel } from '@cpdm/components';
import { Modal } from '@cpdm/components';
import { AppstoreAddOutlined } from '@ant-design/icons';
import ComponentTable from './ComponentTable';

const tableFormItemLayout = {
  labelCol: { span: 1 },
  wrapperCol: { span: 23 },
};

const UltraFormModal = ({ visible, loading, dispatch, title, onCancel, data = [], id }) => {
  const [form] = Form.useForm();
  const [componentDataSource, setComponentDataSource] = useState(data);
  const [pickerVisible, setPickerVisible] = useState(false);
  const [repositoryId, setRepositoryId] = useState('');
  const [partInfo, setPartInfo] = useState({});

  useEffect(() => {
    dispatch({
      type: 'component/getPartInfo',
      payload: id,
      callback: res => {
        if (res && res.id) {
          setPartInfo(res);
          form.setFieldsValue({
            name: res.name,
            secretLevel: res.secretLevel,
          });
        }
      },
    });
  }, [id]);

  const handleOk = () => {
    form.validateFields().then(values => {
      const params = {
        repositoryId,
        modelCode: values.modelCode,
        code: partInfo?.code,
        name: values.name,
        secretLevel: values.secretLevel,
        partId: partInfo?.id,
        partType: partInfo?.objectType,
        componentList: componentDataSource.map(item => ({
          id: item.id,
          objectType: item.objectType,
          reason: item.reason,
          certification: item.certification,
          appraisal: item.appraisal,
          applied: item.applied,
          testSituation: item.testSituation,
          complement: item.complement,
        })),
      };
      dispatch({
        type: 'bom/createUltraDirectory',
        payload: [params],
        callback: res => {
          if (res && res.error) return;
          message.success('操作成功！');
          onCancel();
        },
      });
    });
  };

  return (
    <Modal
      width={800}
      confirmLoading={loading || !id}
      visible={visible}
      title={title}
      onCancel={onCancel}
      onOk={handleOk}
      destroyOnClose
    >
      <Form form={form} labelCol={{ span: 6 }}>
        <Row>
          <Col span={11} offset={1}>
            <Form.Item
              name="repositoryName"
              label="选择型号"
              rules={[{ required: true, message: '请选择型号' }]}
            >
              <Input
                addonAfter={<AppstoreAddOutlined onClick={() => setPickerVisible(true)} />}
                disabled
              />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item name="modelCode" label="型号代号">
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={11} offset={1}>
            <Form.Item name="name" label="单机名称">
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item name="secretLevel" label="密级">
              <SecretLevel.WithOption style={{ width: '100%' }} disabled />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item {...tableFormItemLayout} name="componentList">
              <ComponentTable
                data={componentDataSource}
                onChange={datasource => setComponentDataSource(datasource)}
              />
            </Form.Item>
          </Col>
        </Row>
        <RepositoryPicker
          title="选择型号"
          visible={pickerVisible}
          onOk={values => {
            form.setFieldsValue({
              repositoryName: values[0].name,
              modelCode: values[0].modelCode,
            });
            setRepositoryId(values[0].id);
            setPickerVisible(false);
          }}
          onCancel={() => setPickerVisible(false)}
        />
      </Form>
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.effects['bom/createUltraDirectory'] || loading.effects['component/getPartInfo'],
}))(UltraFormModal);

import React, { useState, useEffect, useRef } from 'react';
import { Table, Modal, Button, Form, Input } from 'antd';
import { AppstoreTwoTone } from '@ant-design/icons';
import { withRouter } from 'umi';

const ClassificationPicker = props => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [row, setRow] = useState({});
  const inputValue = useRef('');
  const { treeData, id } = props;

  const columns = [
    {
      title: '分类名称',
      dataIndex: 'name',
    },
    {
      title: '分类标识',
      dataIndex: 'identifier',
    },
  ];
  const showModal = () => {
    setIsModalOpen(true);
  };
  const onSelectClassification = value => {
    // console.log(value);
    setRow(value);
  };

  const handleOk = () => {
    inputValue.current = row[0].id;
    console.log('ref', inputValue.current);
    setIsModalOpen(false);
  };
  const onHandleCancel = () => {
    setIsModalOpen(false);
  };
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 7 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
      md: { span: 10 },
    },
  };
  return (
    <div>
      <Form.Item {...formItemLayout} label="工具类别" name="classificationId">
        {id ? (
          <Input
            ref={inputValue}
            placeholder="请输入工具类别"
            style={{ width: '100%' }}
            disabled
            addonAfter={<AppstoreTwoTone onClick={showModal} />}
            // value={dataSource?.classification}
          />
        ) : (
          <Input
            placeholder="请输入工具分类"
            style={{ width: '100%' }}
            disabled
            addonAfter={<AppstoreTwoTone onClick={showModal} />}
            value={inputValue.current}
          />
        )}
      </Form.Item>
      <Modal
        title="请选择所属分类"
        onCancel={onHandleCancel}
        width={800}
        destroyOnClose={true}
        maskClosable={false}
        open={isModalOpen}
        footer={
          <>
            <Button onClick={onHandleCancel}>取消</Button>
            <Button type="primary" onClick={handleOk}>
              选择分类
            </Button>
          </>
        }
      >
        <Table
          width={700}
          columns={columns}
          dataSource={treeData}
          rowSelection={{
            onChange: (_key, rows) => {
              onSelectClassification(rows);
            },
            type: 'radio',
          }}
          rowKey={record => record.id}
          childrenColumnName="subClassificationNodes"
          defaultExpandAllRows={true}
          pagination={{
            pageSize: 10,
          }}
        />
      </Modal>
    </div>
  );
};
export default withRouter(ClassificationPicker);

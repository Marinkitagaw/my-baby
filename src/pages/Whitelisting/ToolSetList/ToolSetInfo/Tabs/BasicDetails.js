import { PageHeader, Table, Radio, Card, Descriptions, Tooltip, Button } from 'antd';
import { Fieldset } from '@cpdm/components';
import React, { useState, forwardRef } from 'react';
import moment from 'moment';
import { useParams, withRouter } from 'react-router-dom';
import { connect } from 'umi';
import { downLoadDocumentd } from '@/common/services/toolset/list/toolset';

const BasticDetails = props => {
  const [value, setValue] = useState(1);
  const { dataSource } = props;
  const onChange = e => {
    setValue(e.target.value);
  };

  //下载附件
  // const handleDownLoad = async values => {
  //   console.log('value', values);
  //   const res = await downLoadDocument({
  //     id: values.originalFileId,
  //   });
  //   const content = res;
  //   const blob = new Blob([content]);
  //   const fileName = `${values.name}`;
  //   if ('download' in document.createElement('a')) {
  //     // 非IE下载
  //     const elink = document.createElement('a');
  //     elink.download = fileName;
  //     elink.style.display = 'none';
  //     elink.href = URL.createObjectURL(blob);
  //     document.body.appendChild(elink);
  //     elink.click();
  //     URL.revokeObjectURL(elink.href); // 释放URL 对象
  //     document.body.removeChild(elink);
  //     // setLoadings(false);
  //   } else {
  //     // IE10+下载
  //     navigator.msSaveBlob(blob, fileName);
  //   }
  // };

  const columns = [
    {
      title: '序号',
      dataIndex: 'idx',
      width: 40,
      align: 'center',
      render: (t, r, idx) => <span>{idx + 1}</span>,
    },
    {
      title: <strong>名称</strong>,
      dataIndex: 'name',
      key: 'name',
      width: 120,
      ellipsis: true,
    },
    {
      title: <strong>密级</strong>,
      dataIndex: 'secretLevel',
      width: 120,
      key: 'secretLevel',
      ellipsis: true,
    },
    {
      title: <strong>备注</strong>,
      dataIndex: 'description',
      key: 'description',
      width: 120,
      ellipsis: true,
    },
    {
      title: <strong>操作</strong>,
      dataIndex: 'camatType',
      width: 120,
      ellipsis: true,
      // render: (_text, _record) => (
      //   <span>
      //     <Button type="link" 
      //     // onClick={record => handleDownLoad(record)}
      //     >
      //       下载
      //     </Button>
      //   </span>
      // ),
    },
  ];
  return (
    <>
      <Fieldset legend="基本信息">
        <Descriptions bordered size="small" column={2} style={{ marginLeft: '36px' }}>
          <Descriptions.Item label="编号">{dataSource?.code}</Descriptions.Item>
          <Descriptions.Item label="版本号">{dataSource?.ver}</Descriptions.Item>
          <Descriptions.Item label="中文名称">{dataSource?.name}</Descriptions.Item>
          <Descriptions.Item label="所属专业">{dataSource?.major}</Descriptions.Item>
          <Descriptions.Item label="英文名称">{dataSource?.englishName}</Descriptions.Item>
          <Descriptions.Item label="工具分类">{dataSource?.classification}</Descriptions.Item>
          <Descriptions.Item label="国别">{dataSource?.country}</Descriptions.Item>
          <Descriptions.Item label="适用环节">{dataSource?.sys}</Descriptions.Item>
          <Descriptions.Item label="厂家">{dataSource?.factory}</Descriptions.Item>
          <Descriptions.Item label="申请单位">{dataSource?.applicant}</Descriptions.Item>
          <Descriptions.Item label="主要功能">{dataSource?.function}</Descriptions.Item>
        </Descriptions>
      </Fieldset>
      <Fieldset legend="附件信息">
        <Table
          style={{ marginLeft: '36px' }}
          columns={columns}
          dataSource={dataSource.contents}
          size="small"
          rowKey={record => record.id}
        />
      </Fieldset>
    </>
  );
};

export default withRouter(BasticDetails);

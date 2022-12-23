import { Descriptions } from 'antd';
import React from 'react';
import BusinessAttributePanel from './BusinessAttributePanel';
import { Fieldset } from '@cpdm/components';
import styles from '@/styles/common.less';

export default props => {
  // const { data, style, column, handle = {} } = props;
  const { data, style, column } = props;
  // const { actions = {} } = data;
  if (!data || !data.id) return '';
  return (
    <div key={data.id} style={style}>
      <Fieldset legend="基本信息" className={styles.fieldsetDetail}>
        <Descriptions column={column || 2} size="small" bordered>
          <Descriptions.Item label="编号">{data.code}</Descriptions.Item>
          <Descriptions.Item label="型号名称">
            {data.repository && data.repository.name}
          </Descriptions.Item>
          <Descriptions.Item label="名称">{data.name}</Descriptions.Item>
          <Descriptions.Item label="型号代号">
            {data.repository && data.repository.modelCode}
          </Descriptions.Item>
          {/* 未知字段-文件名称 */}
          <Descriptions.Item label="文件名称">{data.cadName}</Descriptions.Item>
          <Descriptions.Item label="产品代号">{data.productCode}</Descriptions.Item>
          <Descriptions.Item label="责任单位">
            {data.responsible && data.responsible.name}
          </Descriptions.Item>
          {/* 未知字段-所有者 */}
          <Descriptions.Item label="所有者">{data.owner && data.owner.fullName}</Descriptions.Item>
          <Descriptions.Item label="所属部门">{data.departmentName}</Descriptions.Item>
          {/* 未知字段-协作者 */}
          <Descriptions.Item label="协作者">{data.collaborators}</Descriptions.Item>
        </Descriptions>
      </Fieldset>
      <BusinessAttributePanel data={data} />
    </div>
  );
};

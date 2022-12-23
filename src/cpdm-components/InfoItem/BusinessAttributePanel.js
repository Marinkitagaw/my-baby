import React from 'react';
import { Descriptions } from 'antd';
import { Fieldset } from '@cpdm/components';
import styles from '@/styles/common.less';
// import { SetOwnerPanel } from '@/cpdm-components/InfoItem';

export default props => {
  // const { data, style, column, handle = {} } = props;
  const { data, style, column } = props;
  // const { actions = {} } = data;
  if (!data || !data.id) return '';
  return (
    <Fieldset legend="业务信息" key={data.id} style={style} className={styles.fieldsetDetail}>
      <Descriptions column={column || 2} size="small" bordered>
        <Descriptions.Item label="类型">{data.category && data.category.name}</Descriptions.Item>
        <Descriptions.Item label="文件夹">
          {data.folder && data.folder.folderPath}
        </Descriptions.Item>
        <Descriptions.Item label="密级">{data.secretLevel}</Descriptions.Item>
        <Descriptions.Item label="涉密期限">{data.confidentialityPeriod}年</Descriptions.Item>
        <Descriptions.Item label="研制阶段">{data.phaseMark}</Descriptions.Item>
        <Descriptions.Item label="用途">{data.purposeDisplay}</Descriptions.Item>
        <Descriptions.Item label="说明">
          <div style={{ whiteSpace: 'pre-wrap' }}>{data.description}</div>
        </Descriptions.Item>
      </Descriptions>
    </Fieldset>
  );
};

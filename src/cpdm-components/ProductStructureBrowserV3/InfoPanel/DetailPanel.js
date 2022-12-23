import React, { useEffect, useState } from 'react';
import { Descriptions, Skeleton } from 'antd';
import { request } from '@cpdm/util';
import { AttributePanel, Content, Subject, SystemAttributeBar } from '@/cpdm-components/InfoItem';

async function partInfo(id) {
  return request(`/bom/function-parts/${id}`);
}
async function drawingInfo(id) {
  return request(`/cpdm/drawings/${id}`);
}

async function docInfo(id) {
  return request(`/cpdm/documents/${id}`);
}

const renderContent = (type, state) => {
  if (state.loading) return <Skeleton active paragraph={{ rows: 10 }} />;
  if (!state.info) return null;
  return (
    <React.Fragment>
      <SystemAttributeBar data={state.info} short />
      <AttributePanel data={state.info} />
      {type === 'Part' && (
        <React.Fragment>
          <Descriptions column={1} title="部件属性" bordered size="small" style={{ marginTop: 30 }}>
            <Descriptions.Item label="视图">{state.info.viewName}</Descriptions.Item>
            <Descriptions.Item label="产品分类">
              {state.info.productCategoryDisplay}
            </Descriptions.Item>
            <Descriptions.Item label="产品层级">{state.info.productTypeDisplay}</Descriptions.Item>
            <Descriptions.Item label="来源">{state.info.sourceDisplay}</Descriptions.Item>
            <Descriptions.Item label="装配模式">{state.info.infoTypeDisplay}</Descriptions.Item>
            <Descriptions.Item label="默认单位">{state.info.defaultUnitDisplay}</Descriptions.Item>
            <Descriptions.Item label="成品">{state.info.endItem ? '是' : '否'}</Descriptions.Item>
            <Descriptions.Item label="可配置模块">
              {state.info.genericType ? '是' : '否'}
            </Descriptions.Item>
            <Descriptions.Item label="虚拟制造部件">
              {state.info.phantom ? '是' : '否'}
            </Descriptions.Item>
            <Descriptions.Item label="收集部件">
              {state.info.hideinfoInStructure ? '是' : '否'}
            </Descriptions.Item>
            <Descriptions.Item label="可折叠">
              {state.info.collapsible ? '是' : '否'}
            </Descriptions.Item>
            <Descriptions.Item label="停止有效性传播">
              {state.info.effPropagationStop ? '是' : '否'}
            </Descriptions.Item>
            <Descriptions.Item label="默认追踪代码">
              {state.info.defaultTraceCode ? '是' : '否'}
            </Descriptions.Item>
          </Descriptions>
          <Descriptions column={1} title="材料" bordered size="small" style={{ marginTop: 30 }}>
            <Descriptions.Item label="名称">{state.info.cmat}</Descriptions.Item>
            <Descriptions.Item label="牌号">{state.info.camatMark}</Descriptions.Item>
            <Descriptions.Item label="规格">{state.info.camatSpec}</Descriptions.Item>
          </Descriptions>
        </React.Fragment>
      )}
      {type === 'Drawing' && (
        <Descriptions column={1} title="模型属性" bordered size="small" style={{ marginTop: 30 }}>
          <Descriptions.Item label="创作程序">
            {state.info.authoringApp || '未知应用程序'}
          </Descriptions.Item>
          <Descriptions.Item label="创作程序版本">
            {state.info.authoringAppVersion || '未知版本'}
          </Descriptions.Item>
          <Descriptions.Item label="模型表现形式">{state.info.docType || '未知'}</Descriptions.Item>
        </Descriptions>
      )}
      {!type === 'Document' && (
        <Descriptions column={1} title="文档属性" bordered size="small" style={{ marginTop: 30 }}>
          <Descriptions.Item label="技术密级">
            {state.info.techSecretLevelDisplay || state.info.techSecretLevel}
          </Descriptions.Item>
        </Descriptions>
      )}
      <Content data={state.info} style={{ marginTop: 30 }} />
    </React.Fragment>
  );
};

export default props => {
  const { type, id, onchange } = props;
  const [state, setState] = useState({ loading: false });
  useEffect(() => {
    (async () => {
      setState({ loading: true });
      let res;
      switch (type) {
        case 'Part':
          res = await partInfo(id);
          break;
        case 'Document':
          res = await docInfo(id);
          break;
        case 'Drawing':
          res = await drawingInfo(id);
          break;
        default:
      }
      if (res && res.id) {
        setState({ info: res, loading: false });
      } else {
        setState({ info: undefined, loading: false });
      }
      onchange(res);
    })();
  }, [type, id, onchange]);

  return (
    <>
      <h3>
        <Subject data={state.info} />
      </h3>
      {renderContent(type, state)}
    </>
  );
};

import React, { useEffect, useState, useCallback } from 'react';
import { Skeleton } from 'antd';
import { request } from '@cpdm/util';
import { stringify } from 'qs';
import { Subject, SystemAttributeBar } from '@/cpdm-components/InfoItem';
import { BasicInfo } from '@/cpdm-components/InfoPageItem';

async function partInfo(dataType, id) {
  return request(`/bom/${dataType.toLowerCase()}-parts/${id}`);
}
async function drawingInfo(id, param) {
  return request(
    `/bom/cad-docs/${id}${stringify(param, {
      addQueryPrefix: true,
    })}`,
  );
}

async function docInfo(id, param) {
  return request(
    `/bom/common-docs/${id}${stringify(param, {
      addQueryPrefix: true,
    })}`,
  );
}

const renderContent = (type, state, dataType) => {
  if (state.loading) return <Skeleton active paragraph={{ rows: 10 }} />;
  if (!state.info) return '暂无相关信息。';
  const partUrl = `/bom/${dataType.toLowerCase()}-parts/forms/create-json-schema`;
  const docUrl = `/bom/common-docs/forms/create-json-schema${stringify(
    { objectType: type },
    { addQueryPrefix: true },
  )}`;

  return (
    <React.Fragment>
      <SystemAttributeBar data={state.info} short />
      <BasicInfo
        data={state.info}
        dataType={type && type.includes('Document') ? 'COMMON-DOCS' : dataType}
        action="DETAIL"
        labelCol={type && type.includes('Document') && 7}
        getAttrUrl={type && type.includes('Document') ? docUrl : partUrl}
      />
    </React.Fragment>
  );
};

export default props => {
  const { type, id, onchange, dataType } = props;
  if (!id) {
    return '请先选择BOM节点。';
  }

  const [state, setState] = useState({ loading: false });
  const getInfo = useCallback(async () => {
    setState({ loading: true });
    let res;
    if (type.includes('Part')) {
      res = await partInfo(dataType, id);
    }
    if (type.includes('Document') && !type.includes('Cad')) {
      res = await docInfo(id, { objectType: type });
    }
    if (type.includes('CadDocument')) {
      res = await drawingInfo(id, { objectType: type });
    }

    if (res && res.id) {
      setState({ info: res, loading: false });
    } else {
      setState({ info: undefined, loading: false });
    }
    onchange(res);
  }, [dataType, id, onchange, type]);
  useEffect(() => {
    getInfo();
  }, [getInfo]);

  return (
    <>
      <div key={id}>
        <h3>
          <Subject data={state.info} />
        </h3>
        {renderContent(type, state, dataType)}
      </div>
    </>
  );
};

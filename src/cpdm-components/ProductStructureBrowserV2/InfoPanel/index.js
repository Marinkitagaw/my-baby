import React, { useState } from 'react';
import Card from 'antd/es/card';
import Detail from './DetailPanel';
// import Change from './ChangePanel';
import Document from './DocumentPanel/DocumentPanel';
import Sub from './SubPanel/SubPanel';
import Standard from './StandardPanel/StandardPanel';
import Components from './ComponentsPanel/ComponentsPanel';
import Usage from './UsagePanel';

export default function InfoPanel(props) {
  const { type, id, ...rest } = props;
  const [key, setkey] = useState('detail');
  const [info, setInfo] = useState({});
  const tabs = [
    { key: 'detail', tab: '详情' },
    { key: 'usage', tab: '使用情况' },
    { key: 'sub', tab: '下级部件' },
    { key: 'standard', tab: '标准件' },
    { key: 'components', tab: '元器件' },
    { key: 'document', tab: '相关文档' },
    { key: 'upDown', tab: '上下游数据' },
    { key: 'statistical', tab: '统计报表' },
    // { key: 'change', tab: '相关更改' },
    // { key: 'requirement', tab: '相关需求' },
    // { key: 'char', tab: '相关六性' },
  ];
  const panels = {
    detail: (
      <Detail
        type={type}
        id={id}
        onchange={res => {
          setInfo(res);
        }}
      />
    ),
    usage: <Usage type={type} id={id} data={info} {...rest} />,
    sub: <Sub type={type} id={id} data={info} {...rest} />,
    standard: <Standard type={type} id={id} data={info} {...rest} />,
    components: <Components type={type} id={id} data={info} {...rest} />,
    document: <Document type={type} id={id} data={info} {...rest} />,
    // change: <Change type={type} id={id} />,
    // upDown: <UpDownStream />,
    upDown: '',
    statistical: '',
  };
  return (
    <Card type="inner" tabList={tabs} onTabChange={setkey}>
      {panels[key] || ''}
    </Card>
  );
}

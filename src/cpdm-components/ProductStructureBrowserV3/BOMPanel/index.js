import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Card, Space } from "antd";
import Icon from "@/cpdm-components/Icon";
import CompenentsList from "@/pages/Cmis/ComponentManage/Info/ComponentsListPanel"; // 元器件清单列表
import RelatedReports from "@/pages/Cmis/ComponentManage/Info/RelatedReportsPanel"; // 相关报表
import FactListsPanel from "@/pages/Cmis/ComponentManage/Info/FactListsPanel"; // 装机清单
import ReviewPanel from "@/pages/Cmis/ComponentManage/Info/ReviewPanel"; // 装机清单
import Detail from "./DetailPanel";
import Change from "./ChangePanel";
import Document from "./DocumentPanel";
import Sub from "./SubPanel";
import UpDownStreamData from "./UpDownStreamData";
import ChangeOrder from "./ChangeOrderPanel";
import Deviation from "./DeviationPanel";
import Notice from "./NoticePanel";
import Standard from "./StandardPanel";
import Components from "./ComponentsPanel";
import Usage from "./UsagePanel";
import ThreeDimensionalProcesData from "./ThreeDimensionalProcesData";
import LightweightModalPanel from "./LightweightModalComponent";
import CostManage from "./CostManage";
import ProcessLine from "./ProcessLine";

export default function InfoPanel(props) {
  const {
    dataType,
    objectType,
    type,
    id,
    hideUpDownPanel,
    tablist = [],
    parentData = {},
    tabKey,
    onTabChange,
    setRefreshComponent,
    height,
    isIframe,
    ...reset
  } = props;
  const [key, setkey] = useState(tabKey || 'detail');
  const [info, setInfo] = useState({});
  let tabs = [{ key: 'detail', tab: '详情' }];

  const sub = useMemo(
    () => ({
      key: 'sub',
      disabled: !(type && type.includes('Part')),
      tab: (
        <Space>
          <Icon style={{ width: 16 }} name="type/part.svg" />
          下级部件
        </Space>
      ),
    }),
    [type],
  );

  const upDown = useMemo(
    () => ({
      key: 'upDown',
      disabled: !(type && type.includes('Part')),
      tab: (
        <Space>
          <Icon style={{ width: 16 }} name="type/part.svg" />
          上下游数据
        </Space>
      ),
    }),
    [type],
  );

  const renderDocument = useCallback(
    (lable, documentTabkey) => ({
      key: documentTabkey || 'document',
      disabled: !(type && type.includes('Part')),
      tab: (
        <Space>
          <Icon style={{ width: 16 }} name="type/document.svg" />
          {lable || '相关文档'}
        </Space>
      ),
    }),
    [type],
  );

  const components = useMemo(
    () => ({
      key: 'components',
      disabled: !(type && type.includes('Part')),
      tab: (
        <Space>
          <Icon style={{ width: 16 }} name="type/component.svg" />
          元器件
        </Space>
      ),
    }),
    [type],
  );

  const standard = useMemo(
    () => ({
      key: 'standard',
      disabled: !(type && type.includes('Part')),
      tab: (
        <Space>
          <Icon style={{ width: 16 }} name="type/standard.svg" />
          标准件
        </Space>
      ),
    }),
    [type],
  );
  const changeOrder = useMemo(
    () => ({
      key: 'changeOrder',
      disabled: !(type && type.includes('Part')),
      tab: (
        <Space>
          <Icon style={{ width: 16 }} name="type/changeorder.svg" />
          更改单
        </Space>
      ),
    }),
    [type],
  );
  const deviation = useMemo(
    () => ({
      key: 'deviation',
      disabled: !(type && type.includes('Part')),
      tab: (
        <Space>
          <Icon style={{ width: 16 }} name="type/deviate.svg" />
          偏离单
        </Space>
      ),
    }),
    [type],
  );

  const notice = useMemo(
    () => ({
      key: 'notice',
      disabled: !(type && type.includes('Part')),
      tab: (
        <Space>
          <Icon style={{ width: 16 }} name="type/technical.svg" />
          技术通知单
        </Space>
      ),
    }),
    [type],
  );

  const componentsList = useMemo(
    () => ({
      key: 'componentsList',
      tab: (
        <Space>
          <Icon style={{ width: 16 }} name="type/standard.svg" />
          元器件列表
        </Space>
      ),
    }),
    [],
  );

  const reviewRecords = useMemo(
    () => ({
      key: 'reviewRecords',
      tab: (
        <Space>
          <Icon style={{ width: 16 }} name="type/standard.svg" />
          评审情况
        </Space>
      ),
    }),
    [],
  );

  const relatedReports = useMemo(
    () => ({
      key: 'relatedReports',
      tab: (
        <Space>
          <Icon style={{ width: 16 }} name="type/standard.svg" />
          相关报表
        </Space>
      ),
    }),
    [],
  );

  const factLists = useMemo(
    () => ({
      key: 'factLists',
      tab: (
        <Space>
          <Icon style={{ width: 16 }} name="type/standard.svg" />
          装机清单
        </Space>
      ),
    }),
    [],
  );

  const dimensional = useMemo(
    () => ({
      key: 'dimensional',
      disabled: !(type && type.includes('Part')),
      tab: (
        <Space>
          <Icon style={{ width: 16 }} name="type/part.svg" />
          三维工艺数据
        </Space>
      ),
    }),
    [type],
  );

  const lightweightModal = useMemo(
    () => ({
      key: 'lightweight',
      disabled: !(type && type.includes('Part')),
      tab: (
        <Space>
          <Icon style={{ width: 16 }} name="type/part.svg" />
          轻量化模型
        </Space>
      ),
    }),
    [type],
  );

  const processLine = useMemo(
    () => ({
      key: "processLine",
      disabled: !(type && type.includes("Part")),
      tab: (
        <Space>
          <Icon style={{ width: 16 }} name="type/part.svg" />
          工艺路线
        </Space>
      ),
    }),
    [type]
  );

  const cost = useMemo(
    () => ({
      key: 'cost',
      disabled: !(type && type.includes('Part')),
      tab: (
        <Space>
          <Icon style={{ width: 16 }} name="type/part.svg" />
          成本管理
        </Space>
      ),
    }),
    [type],
  );

  if (hideUpDownPanel) {
    tabs = tabs.filter(item => item.key !== 'upDown');
  }

  if (tablist.includes('document')) {
    tabs.push(renderDocument());
  }

  if (tablist.includes('testDoc')) {
    tabs.push(renderDocument('交付数据', 'testDoc'));
  }

  if (tablist.includes('testData')) {
    tabs.push(renderDocument('试验数据', 'testData'));
  }

  if (tablist.includes('generateDoc')) {
    tabs.push(renderDocument('在役数据', 'generateDoc'));
  }

  if (tablist.includes('assemblyDoc')) {
    tabs.push(renderDocument('总装', 'assemblyDoc'));
  }

  if (tablist.includes('inServiceDoc')) {
    tabs.push(renderDocument('在役', 'inServiceDoc'));
  }

  if (tablist.includes('upDown')) {
    tabs.push(upDown);
  }

  if (tablist.includes('sub')) {
    tabs.push(sub);
  }

  if (tablist.includes('components')) {
    tabs.push(components);
  }

  if (tablist.includes('standard')) {
    tabs.push(standard);
  }

  if (tablist.includes('changeOrder')) {
    tabs.push(changeOrder);
  }

  if (tablist.includes('deviation')) {
    tabs.push(deviation);
  }

  if (tablist.includes('notice')) {
    tabs.push(notice);
  }

  if (tablist.includes('componentsList')) {
    tabs.push(componentsList);
  }

  if (tablist.includes('reviewRecords')) {
    tabs.push(reviewRecords);
  }

  if (tablist.includes('relatedReports')) {
    tabs.push(relatedReports);
  }

  if (tablist.includes('factLists')) {
    tabs.push(factLists);
  }

  if (tablist.includes('dimensional')) {
    tabs.push(dimensional);
  }

  if (tablist.includes('lightweight')) {
    tabs.push(lightweightModal);
  }

  if (tablist.includes("processLine")) {
    tabs.push(processLine);
  }

  if (tablist.includes('cost')) {
    if (isIframe) {
      tabs = [cost];
    } else {
      tabs.push(cost);
    }
  }

  const detailComponent = useMemo(
    () => (
      <Detail
        type={type}
        id={id}
        onchange={res => {
          setInfo(res);
        }}
        dataType={dataType}
      />
    ),
    [dataType, id, type],
  );
  const usageCM = useMemo(
    () => <Usage type={type} id={id} data={info} dataType={dataType} {...reset} />,
    [dataType, id, info, reset, type],
  );
  const subComponent = useMemo(
    () => (
      <Sub type={type} id={id} data={info} dataType={dataType} parentData={parentData} {...reset} />
    ),
    [dataType, id, info, parentData, reset, type],
  );
  const standardComponent = useMemo(
    () => <Standard type={type} id={id} data={info} dataType={dataType} {...reset} />,
    [dataType, id, info, reset, type],
  );
  const changeOrderComponent = useMemo(
    () => <ChangeOrder type={type} id={id} data={info} dataType={dataType} {...reset} />,
    [dataType, id, info, reset, type],
  );
  const processLineComponent = useMemo(
    () => (
      <ProcessLine
        type={type}
        id={id}
        data={info}
        dataType={dataType}
        parentData={parentData}
        {...reset}
      />
    ),
    [dataType, id, info, parentData, reset, type]
  );
  const deviationComponent = useMemo(
    () => <Deviation type={type} id={id} data={info} dataType={dataType} {...reset} />,
    [dataType, id, info, reset, type],
  );
  const noticeComponent = useMemo(
    () => <Notice type={type} id={id} data={info} dataType={dataType} {...reset} />,
    [dataType, id, info, reset, type],
  );
  const componentsComponent = useMemo(
    () => <Components type={type} id={id} data={info} dataType={dataType} {...reset} />,
    [dataType, id, info, reset, type],
  );

  const dimensionalComponent = useMemo(
    () => (
      <ThreeDimensionalProcesData
        type={type}
        id={id}
        data={info}
        dataType={dataType}
        objectType={info.objectType}
        {...reset}
      />
    ),
    [dataType, id, info, parentData, reset, type],
  );

  const lightweightModalComponent = useMemo(
    () => (
      <LightweightModalPanel
        type={type}
        id={id}
        data={info}
        dataType={dataType}
        objectType={info.objectType}
        {...reset}
      />
    ),
    [dataType, id, info, parentData, reset, type],
  );

  const documentComponent = useMemo(
    () => (
      <Document
        title="相关文档"
        type={type}
        id={id}
        data={info}
        parentData={parentData}
        dataType={dataType}
        {...reset}
      />
    ),
    [dataType, id, info, parentData, reset, type],
  );
  const testDataComponent = useMemo(
    () => (
      <Document
        title="试验数据"
        type={type}
        id={id}
        data={info}
        parentData={parentData}
        dataType={dataType}
        objectType={parentData.objectType}
        {...reset}
      />
    ),
    [dataType, id, info, parentData, reset, type],
  );
  const testDocComponent = useMemo(
    () => (
      <Document
        key={key}
        title="交付数据"
        param={{ objectType: '交付数据' }}
        type={type}
        id={id}
        data={info}
        parentData={parentData}
        dataType={dataType}
        {...reset}
      />
    ),
    [dataType, id, info, key, parentData, reset, type],
  );
  const generateDocComponent = useMemo(
    () => (
      <Document
        title="在役数据"
        key={key}
        param={{ objectType: '在役数据' }}
        type={type}
        id={id}
        data={info}
        parentData={parentData}
        dataType={dataType}
        {...reset}
      />
    ),
    [dataType, id, info, key, parentData, reset, type],
  );
  const assemblyDocComponent = useMemo(
    () => (
      <Document
        title="总装"
        type={type}
        id={id}
        data={info}
        parentData={parentData}
        dataType={dataType}
        {...reset}
      />
    ),
    [dataType, id, info, parentData, reset, type],
  );
  const inServiceDocDocComponent = useMemo(
    () => (
      <Document
        title="在役"
        type={type}
        id={id}
        data={info}
        parentData={parentData}
        dataType={dataType}
        {...reset}
      />
    ),
    [dataType, id, info, parentData, reset, type],
  );
  const changeComponent = useMemo(() => <Change type={type} id={id} />, [id, type]);
  const upDownComponent = useMemo(
    () => (
      <UpDownStreamData dataType={dataType} id={id} data={info} key={id} parentData={parentData} />
    ),
    [dataType, id, info, parentData],
  );
  const relatedReportsComponent = useMemo(
    () => <RelatedReports id={info.id} dataType={dataType} />,
    [dataType, info],
  );
  const reviewRecordsComponent = useMemo(
    () => (
      <ReviewPanel
        id={info.id}
        dataType={dataType}
        data={info}
        onChange={(types, newKey) => setRefreshComponent(types, newKey)}
      />
    ),
    [dataType, info, setRefreshComponent],
  );
  const componentsListComponent = useMemo(
    () => (
      <CompenentsList
        dataType={dataType}
        id={info.id}
        module="Component"
        onChange={(types, newKey) => setRefreshComponent(types, newKey)}
        rowHandle={dataType}
      />
    ),
    [dataType, info.id, setRefreshComponent],
  );
  const factListsComponent = useMemo(
    () => <FactListsPanel dataType={dataType} data={info} />,
    [dataType, info],
  );

  const costComponent = useMemo(
    () => <CostManage isIframe={isIframe} data={parentData} />,
    [isIframe, parentData],
  );

  const panels = useMemo(
    () => ({
      detail: detailComponent,
      usage: usageCM,
      sub: subComponent,
      standard: standardComponent,
      changeOrder: changeOrderComponent,
      deviation: deviationComponent,
      notice: noticeComponent,
      components: componentsComponent,
      document: documentComponent,
      testData: testDataComponent,
      testDoc: testDocComponent,
      generateDoc: generateDocComponent,
      assemblyDoc: assemblyDocComponent,
      inServiceDoc: inServiceDocDocComponent,
      change: changeComponent,
      upDown: upDownComponent,
      statistical: '开发中...',
      requirement: '开发中...',
      char: '开发中...',
      deviate: '开发中...',
      relatedReports: relatedReportsComponent,
      reviewRecords: reviewRecordsComponent,
      componentsList: componentsListComponent,
      factLists: factListsComponent,
      dimensional: dimensionalComponent,
      lightweight: lightweightModalComponent,
      cost: costComponent,
      processLine: processLineComponent,
    }),
    [
      assemblyDocComponent,
      changeComponent,
      changeOrderComponent,
      componentsComponent,
      componentsListComponent,
      detailComponent,
      deviationComponent,
      documentComponent,
      factListsComponent,
      generateDocComponent,
      inServiceDocDocComponent,
      noticeComponent,
      relatedReportsComponent,
      reviewRecordsComponent,
      standardComponent,
      subComponent,
      testDataComponent,
      testDocComponent,
      upDownComponent,
      usageCM,
      dimensionalComponent,
      lightweightModalComponent,
      costComponent,
      processLine,

    ],
  );

  const handleTabChange = useCallback(
    value => {
      setkey(value);
      if (onTabChange) onTabChange(value);
    },
    [onTabChange],
  );

  useEffect(() => {
    if (isIframe) {
      setkey('cost');
    }
  }, [isIframe]);

  return (
    <Card
      type="inner"
      size="small"
      tabList={tabs}
      activeTabKey={key}
      onTabChange={handleTabChange}
      tabProps={{ size: 'small' }}
      style={{ height: height || '70vh', overflowY: 'scroll' }}
    >
      {panels[key] || ''}
    </Card>
  );
}

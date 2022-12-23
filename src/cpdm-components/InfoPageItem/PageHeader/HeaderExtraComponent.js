import {
  CarryOutOutlined,
  DeleteOutlined,
  ExportOutlined,
  ImportOutlined,
  ShareAltOutlined,
  SmallDashOutlined,
  SwitcherOutlined,
  RollbackOutlined,
  HighlightOutlined,
  EyeOutlined,
  UserSwitchOutlined,
  FormOutlined,
  CloudDownloadOutlined,
  DownloadOutlined,
  RetweetOutlined,
  BookOutlined,
} from '@ant-design/icons';

import { Menu, Dropdown, Button } from 'antd';
import React from 'react';

export default props => {
  const { data = {}, handler, operating, ...reset } = props;
  if (!data || !data.actions) return null;
  const {
    actions: {
      CHECKOUT,
      CHECKIN,
      UNDOCHECKOUT,
      REVISE,
      REVIEW,
      SETLIFECYCLESTATE,
      EDIT,
      DELETE,
      RENAME,
      ADDOWNER,
      PREVIEW,
      CADVIEW,
      TRANSFERPROCESS,
      EXPORT,
      DOWNLOAD,
      EDITTAG,
      ERPEXPORT,
      OFFLINEDOWNLOAD,
      BOMEXPORT,
      RESOURCEINFOMAINTAIN,
      DELIVERYEXPORT,
      ONEDIT,
      ONCHECK,
      HTPROCESSEXPORT,
    },
    noMenuAction,
  } = data;
  if (
    !CHECKOUT &&
    !CHECKIN &&
    !UNDOCHECKOUT &&
    !REVISE &&
    !REVIEW &&
    !EDIT &&
    !DELETE &&
    !RENAME &&
    !ADDOWNER &&
    !PREVIEW &&
    !CADVIEW &&
    !TRANSFERPROCESS &&
    !EXPORT &&
    !DOWNLOAD &&
    !SETLIFECYCLESTATE &&
    !ERPEXPORT &&
    !BOMEXPORT &&
    !ONEDIT &&
    !ONCHECK &&
    !HTPROCESSEXPORT
  )
    return null;
  const action = [];
  const br = (
    <Menu.Item key="BOMREVIEW" disabled={REVIEW === 1}>
      <ExportOutlined />
      &nbsp;提交BOM审批
    </Menu.Item>
  );

  const co = (
    <Menu.Item key="CHECKOUT" disabled={CHECKOUT === 1}>
      <ExportOutlined />
      &nbsp;检出
    </Menu.Item>
  );

  const im = (
    <Menu.Item key="EXPORT" disabled={EXPORT === 1}>
      <CloudDownloadOutlined />
      &nbsp;导出
    </Menu.Item>
  );

  const ce = (
    <Menu.Item key="CHECKOUTEDIT" disabled={CHECKOUT === 1}>
      <FormOutlined />
      &nbsp;检出并编辑
    </Menu.Item>
  );

  const ci = (
    <Menu.Item key="CHECKIN" disabled={CHECKIN === 1}>
      <ImportOutlined />
      &nbsp;检入
    </Menu.Item>
  );

  const rco = (
    <Menu.Item key="UNDOCHECKOUT" disabled={UNDOCHECKOUT === 1}>
      <RollbackOutlined />
      &nbsp;撤销检出
    </Menu.Item>
  );

  const rv = (
    <Menu.Item key="REVISE" disabled={REVISE === 1}>
      <SwitcherOutlined />
      &nbsp;修订
    </Menu.Item>
  );

  const de = (
    <Menu.Item key="DELETE" disabled={DELETE === 1}>
      <DeleteOutlined />
      &nbsp;删除
    </Menu.Item>
  );

  const ss = (
    <Menu.Item key="SETLIFECYCLESTATE">
      <ShareAltOutlined />
      &nbsp;设置生命周期状态
    </Menu.Item>
  );

  const smt = (
    <Menu.Item key="REVIEW" disabled={REVIEW === 1}>
      <CarryOutOutlined />
      &nbsp;提交审阅
    </Menu.Item>
  );

  const rn = (
    <Menu.Item key="RENAME" disabled={RENAME === 1}>
      <HighlightOutlined />
      &nbsp;重命名
    </Menu.Item>
  );

  const ed = (
    <Menu.Item key="EDIT" disabled={EDIT === 1}>
      <HighlightOutlined />
      &nbsp;编辑
    </Menu.Item>
  );

  const ao = (
    <Menu.Item key="ADDOWNER" disabled={ADDOWNER === 1}>
      <UserSwitchOutlined />
      &nbsp;设置所有者
    </Menu.Item>
  );

  const cv = (
    <Menu.Item key="CADVIEW" disabled={CADVIEW === 1}>
      <HighlightOutlined />
      &nbsp;可视化预览
    </Menu.Item>
  );

  const pr = (
    <Menu.Item key="PREVIEW">
      <EyeOutlined />
      &nbsp;签名文件预览
    </Menu.Item>
  );

  const transferProcess = (
    <Menu.Item key="TRANSFERPROCESS">
      <RetweetOutlined />
      &nbsp;BOM视图转换
    </Menu.Item>
  );

  const dl = (
    <Menu.Item key="DOWNLOAD">
      <DownloadOutlined />
      &nbsp;打包下载
    </Menu.Item>
  );
  const tag = (
    <Menu.Item key="EDITTAG">
      <BookOutlined />
      &nbsp;文档标签
    </Menu.Item>
  );
  const oe = (
    <Menu.Item key="ONEDIT">
      <FormOutlined />
      &nbsp;协同编辑附件
    </Menu.Item>
  );
  const oc = (
    <Menu.Item key="ONCHECK">
      <FormOutlined />
      &nbsp;在线批注附件
    </Menu.Item>
  );
  const rim = (
    <Menu.Item key="RESOURCEINFOMAINTAIN">
      <BookOutlined />
      &nbsp;物料编码维护
    </Menu.Item>
  );

  const erp = (
    <Menu.Item key="ERPEXPORT">
      <CloudDownloadOutlined />
      &nbsp;ERP导出
    </Menu.Item>
  );

  const offlineDownload = (
    <Menu.Item key="OFFLINEDOWNLOAD">
      <CloudDownloadOutlined />
      &nbsp;下载离线数据包
    </Menu.Item>
  );

  const htProcessExport = (
    <Menu.Item key="HTPROCESSEXPORT">
      <CloudDownloadOutlined />
      &nbsp;工艺数据包导出
    </Menu.Item>
  );

  const bom = (
    <Menu.SubMenu key="BOMEXPORT" icon={<CloudDownloadOutlined />} title="BOM导出">
      <Menu.Item key="DESGINBOMEXPORT" icon={<CloudDownloadOutlined />}>
        &nbsp;设计BOM导出
      </Menu.Item>
      <Menu.Item key="STANDARDEXPORT" icon={<CloudDownloadOutlined />}>
        &nbsp;标准件导出
      </Menu.Item>
      <Menu.Item key="SELFCONTROL" icon={<CloudDownloadOutlined />}>
        &nbsp;自制件导出
      </Menu.Item>
      <Menu.Item key="OUTSIDE" icon={<CloudDownloadOutlined />}>
        &nbsp;外购件导出
      </Menu.Item>
      <Menu.Item key="COMMMON" icon={<CloudDownloadOutlined />}>
        &nbsp;通用件导出
      </Menu.Item>
    </Menu.SubMenu>
  );

  if (CHECKIN === 0 && !noMenuAction) action.push(ci);
  if (CHECKOUT === 0 && !noMenuAction) action.push(co);
  if (CHECKOUT === 0 && !noMenuAction) action.push(ce);
  if (EDIT === 0 && !noMenuAction) action.push(ed);
  if (UNDOCHECKOUT === 0 && !noMenuAction) action.push(rco);
  if (REVISE === 0) action.push(rv);
  if (REVIEW === 0) action.push(smt, br);
  if (DELETE === 0) action.push(de);
  if (RENAME === 0) action.push(rn);
  if (SETLIFECYCLESTATE === 0) action.push(ss);
  if (ADDOWNER === 0) action.push(ao);
  if (CADVIEW === 0) action.push(cv);
  if (PREVIEW === 0) action.push(pr);
  if (EXPORT === 0) action.push(im);
  if (TRANSFERPROCESS === 0) action.push(transferProcess);
  if (DOWNLOAD === 0) action.push(dl);
  if (EDITTAG === 0) action.push(tag);
  if (ERPEXPORT === 0) action.push(erp);
  action.push(offlineDownload);
  if (HTPROCESSEXPORT === 0) action.push(htProcessExport);
  if (BOMEXPORT === 0) action.push(bom);
  if (RESOURCEINFOMAINTAIN === 0) action.push(rim);
  if (ONEDIT === 0) action.push(oe);
  if (ONCHECK === 0) action.push(oc);

  const onClick = e => {
    if (handler && handler[e.key]) handler[e.key]();
  };
  return (
    <Button.Group {...reset}>
      {CHECKOUT === 0 && (
        <Button
          disabled={CHECKOUT === 1}
          onClick={() => onClick({ key: 'CHECKOUT' })}
          loading={operating}
          type="primary"
        >
          检出
        </Button>
      )}
      {CHECKIN === 0 && (
        <Button
          disabled={CHECKIN === 1}
          onClick={() => onClick({ key: 'CHECKIN' })}
          loading={operating}
          type="primary"
        >
          检入
        </Button>
      )}
      {UNDOCHECKOUT === 0 && (
        <Button
          disabled={UNDOCHECKOUT === 1}
          onClick={() => onClick({ key: 'UNDOCHECKOUT' })}
          loading={operating}
        >
          撤销检出
        </Button>
      )}
      {EDIT === 0 && (
        <Button disabled={EDIT === 1} onClick={() => onClick({ key: 'EDIT' })} loading={operating}>
          编辑
        </Button>
      )}
      {CADVIEW === 0 && (
        <Button
          disabled={CADVIEW === 1}
          onClick={() => onClick({ key: 'CADVIEW' })}
          loading={operating}
        >
          可视化预览
        </Button>
      )}
      {DELIVERYEXPORT === 0 && (
        <Button
          disabled={DELIVERYEXPORT === 1}
          onClick={() => onClick({ key: 'DELIVERYEXPORT' })}
          loading={operating}
        >
          导出交付
        </Button>
      )}
      {action.length ? (
        <Dropdown overlay={<Menu onClick={onClick}>{action}</Menu>} trigger={['click']}>
          <Button loading={operating}>
            更多操作
            <SmallDashOutlined />
          </Button>
        </Dropdown>
      ) : null}
    </Button.Group>
  );
};

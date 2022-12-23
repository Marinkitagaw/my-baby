import React, { useState } from 'react';
import { Tooltip, Space } from 'antd';
import { Modal } from '@cpdm/components';
import moment from 'moment';
import { Link } from 'umi';
import { StandardDataTable } from 'cpdm-ui-components';
import FilterForm from '@/cpdm-components/FilterForm';
// import * as BomServise from '@/services/data/bom';
import documentImg from '@/assets/icons/document.svg';

export default props => {
  const {
    dataType = 'COMMON',
    visible,
    onOk,
    onCancel,
    title,
    params,
    ordinarySearch,
    requestUrl,
    loading,
  } = props;
  const [state, setState] = useState({
    selectedRowKeys: [],
    itemVisible: false,
    addVisible: false,
    loading: loading,
    dataSource: [],
    tableProps: {
      requestUrl: `${process.env.API_BASE_PATH}${requestUrl || '/bom/common-docs'}`, // 部署
      pagination: true,
      defaultSearch: {
        size: 15,
        ...params,
      },
      scroll: { x: 1000 },
      columns: [
        {
          title: '编号',
          key: 'code',
          width: 150,
          dataIndex: 'code',
          sorter: true,
          ellipsis: true,
          render: (text, record) => (
            <Tooltip title={text} placement="topLeft">
              <Link to={`/data/document/${record.id}?objectType=${record.objectType}`} target="bom">
                <Space>
                  <img src={documentImg} alt="文档" />
                  {text}
                </Space>
              </Link>
            </Tooltip>
          ),
        },
        {
          title: '名称',
          key: 'name',
          width: 150,
          dataIndex: 'name',
          sorter: true,
          ellipsis: true,
          render: text => (
            <Tooltip placement="topLeft" title={text}>
              {text}
            </Tooltip>
          ),
        },
        {
          title: '版本',
          dataIndex: 'version',
          width: 70,
          ellipsis: true,
          render: text => (
            <Tooltip placement="topLeft" title={text}>
              {text}
            </Tooltip>
          ),
        },
        {
          title: '状态',
          key: 'state',
          ellipsis: true,
          dataIndex: 'lifecycleStateName',
          width: 70,
          render: text => (
            <Tooltip placement="topLeft" title={text}>
              {text}
            </Tooltip>
          ),
        },
        {
          title: '密级',
          key: 'secretLevel',
          dataIndex: 'secretLevel',
          width: 70,
          ellipsis: true,
          render: text => (
            <Tooltip placement="topLeft" title={text}>
              {text}
            </Tooltip>
          ),
        },
        {
          title: '研制阶段',
          key: 'phaseMark',
          dataIndex: 'phaseMark',
          width: 100,
          ellipsis: true,
          render: text => (
            <Tooltip placement="topLeft" title={text}>
              {text}
            </Tooltip>
          ),
        },
        {
          title: '库',
          key: 'repositoryName',
          dataIndex: 'repositoryName',
          width: 100,
          ellipsis: true,
          render: (text, record) => (
            <Tooltip placement="topLeft" title={record.repository && record.repository.name}>
              {record.repository && record.repository.name}
            </Tooltip>
          ),
        },
        {
          title: '型号代号',
          key: 'modelCode',
          dataIndex: 'modelCode',
          width: 100,
          ellipsis: true,
          render: (text, record) => (
            <Tooltip placement="topLeft" title={record.repository && record.repository.modelCode}>
              {record.repository && record.repository.modelCode}
            </Tooltip>
          ),
        },
        {
          title: '修改者',
          key: 'modifierFullName',
          dataIndex: 'modifierFullName',
          width: 70,
          ellipsis: true,
          render: text => (
            <Tooltip placement="topLeft" title={text}>
              {text}
            </Tooltip>
          ),
        },
        {
          title: '修改时间',
          key: 'modifyStamp',
          dataIndex: 'modifyStamp',
          align: 'right',
          width: 160,
          ellipsis: true,
          sorter: true,
          render(text) {
            return (
              <Tooltip placement="topLeft" title={text && moment(text).format('YYYY-MM-DD HH:mm')}>
                {text && moment(text).format('YYYY-MM-DD HH:mm')}
              </Tooltip>
            );
          },
        },
      ],
      hideInputSearch: true,
      selectionType: 'checkbox',
      rowSelection: (keys, rows) =>
        setState({ ...state, selectedRowKeys: keys, selectedRows: rows }),
    },
  });

  const titles = {
    FUNCTION: '功能文件',
    DESIGN: '设计文件',
    PROCESS: '工艺文件',
    FACT: '实物文件',
    BATCH: '批次BOM',
  };

  // const getType = {
  //   FUNCTION: BomServise.FDocType,
  //   DESIGN: BomServise.DDocType,
  //   PROCESS: BomServise.PDocType,
  //   FACT: BomServise.FADocType,
  //   COMMON: BomServise.CDocType,
  // };

  // useEffect(() => {
  //   (async () => {
  //     const res = await getType[dataType]();
  //     if (res && Array.isArray(res)) {
  //       setOption(res);
  //       setState({ ...state, refreshForm: Math.random() });
  //     } else {
  //       setOption([]);
  //     }
  //   })();
  // }, []);

  const FilterFormChange = values => {
    const { tableProps } = state;
    const { defaultSearch } = tableProps;
    Object.assign(defaultSearch, { ...values });
    setState({ ...state, tableProps, refreshKey: Math.random() });
  };

  const resetFilterForm = () => {
    const { tableProps } = state;
    tableProps.defaultSearch = {};
    setState({ ...state, tableProps, refreshKey: Math.random() });
  };

  const ordinarySearchFormProps = {
    Items: [
      { label: '编号', dataIndex: 'code', placeholder: '请输入编号过滤' },
      { label: '名称', dataIndex: 'name', placeholder: '请输入名称过滤' },
    ],
    rowspan: 3,
    onChange: FilterFormChange,
    resetFilterForm,
  };

  const FormProps = {
    Items: [
      { label: '编号', dataIndex: 'code', placeholder: '请输入编号过滤' },
      { label: '名称', dataIndex: 'name', placeholder: '请输入名称过滤' },
    ],
    rowspan: 3,
    onChange: FilterFormChange,
    resetFilterForm,
  };

  return (
    <>
      <Modal
        title={titles[dataType] || title}
        width={1200}
        visible={visible}
        onCancel={onCancel}
        onOk={() => onOk(state.selectedRows)}
        confirmLoading={loading}
      >
        <FilterForm
          key={state.refreshForm}
          {...(ordinarySearch ? ordinarySearchFormProps : FormProps)}
        />
        <StandardDataTable
          scroll={{ x: true }}
          key={state.refreshKey}
          className="tableEllipsis"
          {...state.tableProps}
        />
      </Modal>
    </>
  );
};

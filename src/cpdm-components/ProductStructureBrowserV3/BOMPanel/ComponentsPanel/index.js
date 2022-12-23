import '@/ag-grid-imports';
import Icon from '@/cpdm-components/Icon';
import * as bomService from '@/services/data/bom';
import { AgGridReact } from '@ag-grid-community/react';
import { AllModules } from '@ag-grid-enterprise/all-modules';
import {
  CheckOutlined,
  DeleteOutlined,
  DownloadOutlined,
  ExclamationCircleOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
  PlusSquareOutlined,
} from '@ant-design/icons';
import { AgGridLocaleText } from '@cpdm/components';
import { request } from '@cpdm/util';
import { Button, Card, Checkbox, message, Modal, Select, Space } from 'antd';
import classNames from 'classnames';
import { stringify } from 'qs';
import React, { Fragment } from 'react';
import ReactFullScreenElement from 'react-fullscreen-element';
import { connect, Link } from 'umi';
import AddComponentData from './AddComponentData';
import EditRecordPanel from './EditRecordPanel';
import ImportDataModal from './ImportComponents';
import SuperCatalogModal from './SelectModals/FormModal';
import styles from './index.less';

// 获取相关部件
export async function loadStructureRequest(partId, params) {
  return request(`/cpdm/psb/${partId}/structure${stringify(params, { addQueryPrefix: true })}`);
}

const removeComponents = {
  DESIGN: bomService.DPartRemoveStruture,
  FUNCTION: bomService.FPartRemoveStruture,
  PROCESS: bomService.PPartRemoveStruture,
  BATCH: bomService.BPartRemoveStruture,
  FACT: bomService.FAPartRemoveStruture,
  SERVICE: bomService.SPartRemoveStruture,
};

const getComponents = {
  DESIGN: bomService.DPartStruture,
  FUNCTION: bomService.FPartStruture,
  PROCESS: bomService.PPartStruture,
  BATCH: bomService.BPartStruture,
  FACT: bomService.FAPartStruture,
  SERVICE: bomService.SPartStruture,
};

const insertComponents = {
  DESIGN: bomService.DPartAddStruture,
  FUNCTION: bomService.FPartAddStruture,
  PROCESS: bomService.PPartAddStruture,
  BATCH: bomService.BPartAddStruture,
  FACT: bomService.FAPartAddStruture,
  SERVICE: bomService.SPartAddStruture,
};

const options = [
  // { label: '元器件基本信息', value: 'component', disabled: true },
  { label: '设计信息', value: 'derating' },
  { label: '评审信息', value: 'review' },
];

const productOption = [{ label: '生产信息', value: 'product' }];

const getIdentifier = nodeData => {
  const { code, name, version, subject } = nodeData;
  const info = subject ? [subject].filter(i => i) : [code, name, version].filter(i => i);
  return info.join(', ');
};

const checkItem = {
  headerName: '',
  checkboxSelection: true,
  width: 50,
  pinned: 'left',
};

const codeColumn = hideRowSelection =>
  hideRowSelection
    ? [
        {
          field: 'code',
          headerName: '主题',
          width: 250,
          pinned: 'left',
          cellRenderer: 'infoRender',
        },
      ]
    : [
        { ...checkItem },
        {
          field: 'code',
          headerName: '主题',
          width: 250,
          pinned: 'left',
          cellRenderer: 'infoRender',
        },
      ];

const handleColumn = rowHandle => {
  return rowHandle
    ? [
        {
          field: 'handle',
          headerName: '操作',
          pinned: 'right',
          width: 60,
          cellRenderer: 'handleRender',
        },
      ]
    : [];
};

const basicInfo = [
  {
    field: 'customAttributes.modelSpecification',
    headerName: '型号规格',
    width: 72,
  },
  {
    field: 'customAttributes.adoptionStandard',
    headerName: '采用标准',
    width: 72,
  },
  {
    field: 'customAttributes.detailSpecification',
    headerName: '详细规范',
    width: 72,
  },
  {
    field: 'customAttributes.generalSpecification',
    headerName: '通用规范',
    width: 72,
  },
  {
    field: 'customAttributes.supplementalAgreement',
    headerName: '补充协议',
    width: 72,
  },
  {
    field: 'customAttributes.classification',
    headerName: '元器件类别',
    width: 102,
  },
  {
    field: 'customAttributes.colorLevel',
    headerName: '颜色等级',
    width: 72,
  },
  {
    field: 'customAttributes.qualityLevel',
    headerName: '质量等级',
    width: 72,
  },
  {
    field: 'customAttributes.holderType',
    headerName: '封装形式',
    width: 72,
  },
  {
    field: 'customAttributes.countryOfProduction',
    headerName: '生产国别',
    width: 72,
  },
  {
    field: 'customAttributes.productionFactoryName',
    headerName: '生产厂家',
    width: 72,
  },
  {
    field: 'customAttributes.factoryShortName',
    headerName: '厂家简称',
    width: 72,
  },
  {
    field: 'customAttributes.schoolDirectory',
    headerName: '院目录内外',
    width: 100,
  },
  {
    field: 'customAttributes.dicInventoryName',
    headerName: '目录清单',
    width: 100,
  },
  {
    field: 'customAttributes.secretLevel',
    headerName: '密级',
    width: 80,
  },
];

const deratingInfo = [
  {
    field: 'link.customProperties.deratingParameters',
    headerName: '降额参数',
    width: 72,
  },
  {
    field: 'link.customProperties.rating',
    headerName: '额定值',
    width: 72,
  },
  {
    field: 'link.customProperties.utilityValue',
    headerName: '实用值',
    width: 72,
  },
  {
    field: 'link.customProperties.deratingFactor',
    headerName: '降额因子',
    width: 72,
  },
  {
    field: 'link.customProperties.deratingLevel',
    headerName: '降额等级',
    width: 72,
  },
  {
    field: 'link.customProperties.annualProductionMagnitude',
    headerName: '年生产量级',
    width: 100,
  },
  {
    field: 'link.customProperties.singleMachineConsumption',
    headerName: '单机用量',
    width: 72,
  },
  {
    field: 'link.customProperties.partDegree',
    headerName: '是否关重元器件',
    width: 120,
    cellRenderer: params => {
      switch (params.value) {
        case 'true':
          return '是';
        case 'false':
          return '否';
        default:
          return params.value;
      }
    },
  },
  {
    field: 'link.customProperties.newDevice',
    headerName: '是否新器件',
    width: 100,
    cellRenderer: params => {
      switch (params.value) {
        case 'true':
          return '是';
        case 'false':
          return '否';
        default:
          return params.value;
      }
    },
  },
  {
    field: 'link.customProperties.anyQualityProblem',
    headerName: '是否发生质量问题',
    width: 140,
    cellRenderer: params => {
      switch (params.value) {
        case 'true':
          return '是';
        case 'false':
          return '否';
        default:
          return params.value;
      }
    },
  },
  {
    field: 'link.customProperties.newComponents',
    headerName: '是否新品元器件',
    width: 120,
    cellRenderer: params => {
      switch (params.value) {
        case 'true':
          return '是';
        case 'false':
          return '否';
        default:
          return params.value;
      }
    },
  },
  {
    field: 'link.customProperties.componentsRestricted',
    headerName: '是否限用元器件',
    width: 120,
    cellRenderer: params => {
      switch (params.value) {
        case 'true':
          return '是';
        case 'false':
          return '否';
        default:
          return params.value;
      }
    },
  },
  {
    field: 'link.customProperties.approvalOutsideCatalog',
    headerName: '是否完成目录外审批',
    width: 140,
    cellRenderer: params => {
      switch (params.value) {
        case 'true':
          return '是';
        case 'false':
          return '否';
        default:
          return params.value;
      }
    },
  },
];

const reviewInfo = [
  {
    field: 'link.customProperties.reviewConclusion',
    headerName: '评审结论',
    width: 72,
  },
  {
    field: 'link.customProperties.dealMethod',
    headerName: '处理方式',
    width: 72,
  },
];

const productInfo = [
  {
    field: 'link.customProperties.completeDpa',
    headerName: '是否完成DPA',
    width: 120,
    cellRenderer: params => {
      switch (params.value) {
        case 'true':
          return '是';
        case 'false':
          return '否';
        default:
          return params.value;
      }
    },
  },
  {
    field: 'link.customProperties.completeSecondSieve',
    headerName: '是否完成二筛',
    width: 120,
    cellRenderer: params => {
      switch (params.value) {
        case 'true':
          return '是';
        case 'false':
          return '否';
        default:
          return params.value;
      }
    },
  },
  {
    field: 'link.customProperties.screeningUnit',
    headerName: '筛选单位',
    width: 120,
  },
];

const remarkInfo = [
  {
    field: 'link.customProperties.remarks',
    headerName: '备注',
    width: 140,
  },
];

const basic = [{ headerName: '元器件基本信息', children: basicInfo }];

const derating = [{ headerName: '设计信息', children: deratingInfo }];

const review = [{ headerName: '评审信息', children: reviewInfo }];

const product = [{ headerName: '生产信息', children: productInfo }];

const remark = [{ headerName: '', children: remarkInfo }];

@connect(({ bom }) => ({ bom }))
class ComponentsPanel extends React.PureComponent {
  constructor(props) {
    super(props);
    const { dataType, rowHandle, hideRowSelection } = props;
    this.state = {
      importDataModelVisible: false,
      defaultColDef: {
        suppressMenu: true,
        resizable: true,
        width: 72,
        lineHeight: '32px',
        lockPosition: true,
      },
      frameworkComponents: {
        handleRender: this.handleRender,
        infoRender: this.infoRender,
      },
      editVisible: false,
      fullScreen: false,
      header:
        dataType === 'FACT'
          ? [
              ...codeColumn(hideRowSelection),
              ...basic,
              ...derating,
              ...review,
              ...product,
              ...remark,
              ...handleColumn(rowHandle),
            ]
          : [
              ...codeColumn(hideRowSelection),
              ...basic,
              ...derating,
              ...review,
              ...remark,
              ...handleColumn(rowHandle),
            ],
      countryOfProduction: [],
      schoolDirectory: [],
      superCatalogVisible: false,
      selectAll: false,
    };
  }

  handleRender = params => {
    const { data = {} } = params;
    return <a onClick={() => this.setEditVisible(true, data)}>[编辑]</a>;
  };

  infoRender = params => {
    return (
      <Space>
        <Icon style={{ width: 14 }} title="元器件" name="type/component.svg" />
        <Link to={`/resource/component/item/${params.data.id}/info`} target="component">
          {getIdentifier(params.data)}
        </Link>
      </Space>
    );
  };

  setEditVisible = (visible, record) => {
    this.setState({ editVisible: !!visible, editRecord: visible ? record : {} });
    if (!visible) {
      this.gridApi.deselectAll();
    }
  };

  setFullScreen = visible => {
    this.setState({ fullScreen: !!visible });
  };

  setHeader = value => {
    this.setState({ header: value });
  };

  onOk = newId => {
    this.setEditVisible(false);
    const { onChange, id } = this.props;
    if (onChange) onChange('insert', { id: newId || id });
    this.gridApi.purgeServerSideCache();
  };

  agRef = React.createRef();

  // 选择国内外
  selectCountryOfProduction = c => {
    const { id, dataType } = this.props;
    this.setState({ countryOfProduction: c }, async () => {
      const { schoolDirectory } = this.state;
      this.agRef.current.api.setServerSideDatasource({
        getRows: async params => {
          if (id) {
            const res = await getComponents[dataType](id, {
              objectType: 'com.casic.cpdm.part.entity.ComponentPart',
              countryOfProduction: c,
              schoolDirectory,
            });
            if (res && res.status !== 500 && !!res.length) {
              const response = res || [];
              await params.successCallback(
                response.map(item => ({
                  ...item,
                  subject: item.subject,
                })),
                response.length,
              );
            } else {
              await params.successCallback([], 0);
            }
          } else {
            await params.successCallback([], 0);
          }
        },
      });
    });
  };

  // 选择院目录内外
  selectSchoolDirectory = s => {
    const { id, dataType } = this.props;
    this.setState({ schoolDirectory: s }, async () => {
      const { countryOfProduction } = this.state;
      this.agRef.current.api.setServerSideDatasource({
        getRows: async params => {
          if (id) {
            const res = await getComponents[dataType](id, {
              objectType: 'com.casic.cpdm.part.entity.ComponentPart',
              countryOfProduction,
              schoolDirectory: s,
            });
            if (res && res.status !== 500 && !!res.length) {
              const response = res || [];
              await params.successCallback(
                response.map(item => ({
                  ...item,
                  subject: item.subject,
                })),
                response.length,
              );
            } else {
              await params.successCallback([], 0);
            }
          } else {
            await params.successCallback([], 0);
          }
        },
      });
    });
  };

  // 复选框变化
  onChecked = e => {
    if (e.target.checked) {
      this.setState({ selectAll: true });
      this.gridApi.forEachNode(rowNode => {
        rowNode.setSelected(true);
      });
    } else {
      this.setState({ selectAll: false });
      this.gridApi.forEachNode(rowNode => {
        rowNode.setSelected(false);
      });
    }
  };

  render() {
    const {
      id,
      dispatch,
      dataType,
      onChange,
      rowHandle,
      hideHandle,
      hideRowSelection,
      loading,
    } = this.props;
    const {
      importDataModelVisible,
      fullScreen,
      editVisible,
      searchVisible,
      refreshKey,
      countryOfProduction,
      schoolDirectory,
      frameworkComponents,
      defaultColDef,
      header,
      editRecord,
      superCatalogVisible,
      selectAll,
    } = this.state;

    if (dataType === 'FACT') {
      options.concat(productOption);
    }

    const handleAdd = async (selected, addNewPart) => {
      if (selected && Array.isArray(selected)) {
        if (onChange) onChange('insert', selected[0]);
        this.setState({
          searchVisible: false,
          refreshKey: !addNewPart && Math.random(),
        });
      }
    };

    const handleRemove = () => {
      const rows = this.gridApi.getSelectedRows();
      if (Array.isArray(rows) && !rows.length) {
        message.warning('请至少选择一条数据。');
      } else {
        Modal.confirm({
          title: '确定要移除选中数据?',
          icon: <ExclamationCircleOutlined />,
          okText: '确定',
          cancelText: '取消',
          onOk: async () => {
            const res = await removeComponents[dataType](
              id,
              rows.map(item => item.link && item.link.id),
            );
            if (onChange) onChange('insert', { id: res.id });
          },
        });
      }
    };

    const inserData = async selectedRows => {
      const res = await insertComponents[dataType](
        id,
        selectedRows.map(item => ({
          id: item.id,
          objectType: item.objectType || item.baseType,
        })),
      );

      if (res && res.id) {
        handleAdd([res]);
      }
    };

    const importDataProps = {
      title: '导入元器件',
      dataType,
      id,
      visible: importDataModelVisible,
      dispatch,
      downLoadUrl: 'psb/templates/download?type=standard',
      importUrl: 'bom/uploadComponents',
      previewUrl: 'bom/importPreviewComponents',
      showPreview: true,
      previewParams: {
        partId: id,
        type: 'preview',
      },
      columns: [...basicInfo, ...deratingInfo, ...reviewInfo],
      module: 'NEW',
      onOk: newId => {
        if (onChange) onChange('insert', { id: newId || id });
        this.setState({ importDataModelVisible: false });
      },
      onCancel: () => this.setState({ importDataModelVisible: false }),
    };

    const onGridReady = agGrid => {
      const { onRefs } = this.props;
      if (onRefs) {
        onRefs(agGrid.api);
      }
      if (header.length === 3) {
        agGrid.api.sizeColumnsToFit();
      }
      this.gridApi = agGrid.api;
      this.gridColumnApi = agGrid.columnApi;
      agGrid.api.setServerSideDatasource({
        getRows: async params => {
          if (id) {
            const res = await getComponents[dataType](id, {
              objectType: 'com.casic.cpdm.part.entity.ComponentPart',
            });
            if (res && res.status !== 500 && !!res.length) {
              const response = res || [];
              await params.successCallback(
                response.map(item => ({
                  ...item,
                  subject: item.subject,
                })),
                response.length,
              );
            } else {
              await params.successCallback([], 0);
            }
          } else {
            await params.successCallback([], 0);
          }
        },
      });
    };

    const onCheckboxChange = checkedValues => {
      let arr = [...codeColumn(hideRowSelection), ...basic];
      if (Array.isArray(checkedValues) && checkedValues.length) {
        checkedValues.map(item => {
          if (item === 'derating') arr = arr.concat(derating);
          if (item === 'review') arr = arr.concat(review);
          if (item === 'product') arr = arr.concat(product);
          return '';
        });
        arr = arr.concat(remark, handleColumn(rowHandle));
      }
      this.setHeader(arr);
      return '';
    };

    const signAndReview = () => {
      const rows = this.gridApi.getSelectedRows();
      if (Array.isArray(rows) && !rows.length) {
        message.info('请至少选择一条数据。');
        return;
      }
      this.setState({ superCatalogVisible: true });
    };

    const SearchProps = {
      visible: searchVisible,
      title: '添加元器件',
      dataType,
      onCancel: () => this.setState({ searchVisible: false }),
      onOk: selectd => inserData(selectd),
      requestUrl: `${process.env.API_BASE_PATH}/resource/components`,
      infoUrl: `/resource/component/item`,
    };

    return (
      <div key={id || refreshKey}>
        <ReactFullScreenElement fullScreen={fullScreen} allowScrollbar>
          <Card
            className={classNames(['noPaddingCard', styles.agCard])}
            size="small"
            bordered={false}
            title={
              <>
                <Checkbox.Group
                  options={dataType === 'FACT' ? [...options, ...productOption] : options}
                  defaultValue={
                    dataType === 'FACT'
                      ? ['component', 'derating', 'review', 'product']
                      : ['component', 'derating', 'review']
                  }
                  onChange={onCheckboxChange}
                />
                &nbsp;国内外:
                <Select
                  size="small"
                  allowClear
                  style={{ width: 140, marginLeft: 10 }}
                  placeholder="请选择国内外"
                  value={countryOfProduction}
                  onChange={this.selectCountryOfProduction}
                >
                  <Select.Option value="">全部</Select.Option>
                  <Select.Option value="国内">国内</Select.Option>
                  <Select.Option value="国外">国外</Select.Option>
                </Select>
                &nbsp;目录内外:
                <Select
                  size="small"
                  allowClear
                  style={{ width: 140, marginLeft: 10 }}
                  placeholder="请选择目录内外"
                  value={schoolDirectory}
                  onChange={this.selectSchoolDirectory}
                >
                  <Select.Option value="">全部</Select.Option>
                  <Select.Option value="目录内">目录内</Select.Option>
                  <Select.Option value="目录外">目录外</Select.Option>
                </Select>
              </>
            }
            extra={
              <Space style={{ float: 'right' }}>
                {!hideHandle && (
                  <Fragment>
                    <Button size="small" type="primary" onClick={signAndReview} loading={loading}>
                      <CheckOutlined />
                      提交超目录申请
                    </Button>
                    <Button size="small" onClick={() => this.setState({ searchVisible: true })}>
                      <PlusSquareOutlined />
                      添加数据
                    </Button>
                    <Button
                      size="small"
                      primary
                      onClick={() => this.setState({ importDataModelVisible: true })}
                    >
                      <DownloadOutlined />
                      导入
                    </Button>
                    <Button size="small" danger onClick={handleRemove}>
                      <DeleteOutlined />
                      移除数据
                    </Button>
                  </Fragment>
                )}

                <a onClick={() => this.setFullScreen(!fullScreen)}>
                  {!fullScreen ? <FullscreenOutlined /> : <FullscreenExitOutlined />}
                  <span>{fullScreen ? '退出全屏' : '全屏'}</span>
                </a>
              </Space>
            }
          >
            <div
              id="myGrid"
              style={{
                height: fullScreen ? document.body.clientHeight - 182 : 400,
                width: fullScreen ? '100vw' : '100%',
                display: 'block',
              }}
              className="ag-theme-balham"
            >
              <div className={styles.checkBoxBar}>
                <Checkbox
                  checked={selectAll}
                  defaultChecked={false}
                  onChange={this.onChecked}
                  style={{
                    fontSize: 12,
                    color: '#727373',
                    fontWeight: 'bold',
                  }}
                >
                  全选
                </Checkbox>
              </div>
              <AgGridReact
                ref={this.agRef}
                animateRows
                key={header.length}
                rowModelType="serverSide"
                allowContextMenuWithControlKey
                modules={AllModules}
                columnDefs={header}
                defaultColDef={defaultColDef}
                getServerSideGroupKey={item => item.holderIdentifier}
                onGridReady={onGridReady}
                localeText={AgGridLocaleText}
                rowSelection="multiple"
                isServerSideGroup={item => item.children}
                frameworkComponents={frameworkComponents}
                rowMultiSelectWithClick
              />
            </div>
            {importDataModelVisible && <ImportDataModal {...importDataProps} />}
            {editVisible && (
              <EditRecordPanel
                record={editRecord || {}}
                dataType={dataType}
                onCancel={() => this.setEditVisible(false)}
                visible={editVisible}
                onOk={this.onOk}
              />
            )}
            {searchVisible && <AddComponentData {...SearchProps} />}
            {superCatalogVisible && (
              <SuperCatalogModal
                title="创建超目录申请单"
                visible={superCatalogVisible}
                data={this.gridApi.getSelectedRows()}
                onCancel={() => this.setState({ superCatalogVisible: false })}
                id={id}
              />
            )}
          </Card>
        </ReactFullScreenElement>
      </div>
    );
  }
}

export default ComponentsPanel;

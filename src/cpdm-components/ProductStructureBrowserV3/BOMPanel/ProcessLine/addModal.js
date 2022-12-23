import React, { useEffect, useState } from "react";
import { Card, Button, Popconfirm, Tooltip, Table, Space } from "antd";
import Modal from "antd/lib/modal/Modal";
import { girdRenderTypes, GridComponents } from '@/pages/Dashboard/DataTable';
export default (props) => {
    const { visible,onCancel,onOk,gridKey } = props;
		const [agGrid, setAgGrid] = useState();
		const [selectRow,setSelectRow] = useState([])
  
    const proColumns = [
      {
        title: "序号",
        render: (_, row, index) => <>{index + 1}</>,
      },
      {
        title: "车间",
        dataIndex: "name",
      },
      {
        title: "负责人",
        dataIndex: "name3",
      },
      {
        title: "工艺",
        dataIndex: "name1",
      },
      {
        title: "所属工艺规程",
        dataIndex: "name2",
      },
      {
        title: "修改时间",
        dataIndex: "modifyStamp",
        width: 135,
        ellipsis: true,
        render(text, record) {
          return (
            <Tooltip
              placement="topLeft"
              title={moment(record.modifyStamp).format("YYYY-MM-DD HH:mm")}
            >
              {moment(record.modifyStamp).format("YYYY-MM-DD HH:mm")}
            </Tooltip>
          );
        },
      },
    ];
    const onGridChange = selectedRow => {
			setSelectRow([...selectedRow])
		};
		const onSubmit = () => {
			onOk(selectRow)
		}
  
    const columns = [
        {
            title: '',
            key: 'index',
            dataIndex: 'index',
            renderType: 'Index',
            width: 40,
            suppressSizeToFit: true,
            resizable: false,
            maxWidth: 40,
        },
        {
            title: '编号',
            dataIndex: 'code',
            // id: 'code',
            renderType: 'routeCode',
            width: 160,
            sortable: true,
            suppressSizeToFit: true,
            minWidth: 160,
        },
        {
            title: '名称',
            dataIndex: 'name',
            width: 160,
            sortable: true,
            suppressSizeToFit: true,
            minWidth: 160,
        },
        {
            title: '车间',
            width:500,
            dataIndex: 'workshop',
            renderType: 'WorkShop',
            suppressSizeToFit: true,
        },
        {
            title: '状态',
            dataIndex: 'lifecycleStateName',
        },
        {
            title: '创建者',
            dataIndex: 'creator.fullName',
        },
        {
            title: '创建时间',
            dataIndex: 'createStamp',
            width: 150,
            minWidth: 150,
            renderType: 'TimeStamp',
            sortable: true,
        },
    ];
    return (
      <Modal title='选择关联工艺路线' width={900} visible={visible} footer={<Space><Button onClick={()=>{onCancel()}}>取消</Button><Button type="primary" onClick={()=>{onSubmit()}}>确认</Button></Space>} onCancel={onCancel}>
       <GridComponents
			    key={gridKey}
			    rowSelectionType="multiple"
					onChange={onGridChange}
					customFrameworkComponents={{
							routeCode: girdRenderTypes.routeCode
					}}
					treeData={false}
					pagination
					filter
					requestUrl="/mpm/process-routes"
          requestParams={{ size: 10 }}
					onRefs={setAgGrid}
					columns={columns}
					childrenColumnName="children"
					filtersItems={[
							{
									id: "code",
									displayIdentifier: "编号",
									componentType: 'input',
							},
							{
									id: "name",
									displayIdentifier: "名称",
									componentType: 'input',
							},
					]}
        />
      </Modal>
    );
  };
  
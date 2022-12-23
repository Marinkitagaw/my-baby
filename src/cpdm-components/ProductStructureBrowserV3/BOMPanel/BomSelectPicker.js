import React, { useState } from 'react';
import '@ant-design/compatible/assets/index.css';
import { Input } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import BOMsearch from '@/cpdm-components/SearchModal/BOMSearch';

export default props => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState({});
  const { lable, dataType, onChange } = props;
  const lableObj = {
    DESIGN: '设计部件编号：',
    FUNCTION: '功能部件编号：',
    FACT: '实物部件编号：',
    PROCESS: '工艺部件编号：',
    SERVICE: '服务部件编号：',
  };

  const setSelectedData = data => {
    setSelected(data);
    setVisible(false);
    if (onChange) onChange(data);
  };

  const SearchProps = {
    visible,
    title: '选择部件',
    dataType,
    selectionType: 'radio',
    onCancel: () => setVisible(false),
    onOk: selectd => setSelectedData(selectd[0]),
  };

  return (
    <>
      <p style={{ textAlign: 'center' }}>
        <span>{lable || lableObj[dataType]}</span>
        <Input
          defaultValue={selected.id && `${selected.subject}`}
          className="ant-form-item-control"
          style={{ display: 'inline-block', width: 400, verticalAlign: 'middle' }}
          disabled
          key={selected.id}
          addonAfter={
            <a>
              <SettingOutlined onClick={() => setVisible(true)} />
            </a>
          }
        />
      </p>
      {visible && <BOMsearch {...SearchProps} />}
    </>
  );
};

import React, { useState } from 'react';
import { ItemPicker } from 'cpdm-ui-components';
import AddNewPartPicker from './addNewPartPicker';
import UpStreamData from './UpStreamData';
import DownStreamData from './DownStreamData';

export default props => {
  const { type, id, data = {}, dataType, onChange, ...reset } = props;
  if (!id) {
    return '请先选择左侧树节点。';
  }
  const [state, setState] = useState({ loading: false, parts: [], itemVisible: false });

  const handleAdd = async (selected, addNewPart) => {
    if (selected && Array.isArray(selected)) {
      if (onChange) onChange('insert', selected[0]);
      setState({
        ...state,
        itemVisible: false,
        addVisible: false,
        refreshKey: !addNewPart && Math.random(),
      });
    }
  };

  const ItemProps = {
    defaultType: 'Part',
    host: process.env.API_BASE_PATH,
    title: `添加部件`,
    multi: true,
    visible: state.itemVisible,
    onOk: selectd => handleAdd(selectd),
    onCancel: () => setState({ ...state, itemVisible: false }),
    types: ['Part'],
    ...reset,
  };

  return (
    <>
      <UpStreamData dataType={dataType} data={data} cardType="UP" {...props} />
      <div style={{ marginBottom: 8 }} />
      <DownStreamData dataType={dataType} data={data} cardType="DOWN" {...props} />
      {state.itemVisible && <ItemPicker {...ItemProps} />}
      {state.addVisible && (
        <AddNewPartPicker
          visible={state.addVisible}
          addFn={newPart => handleAdd([newPart], 'new')}
          data={data}
          id={id}
          dataType={dataType}
          onCancel={() => setState({ ...state, addVisible: false })}
          {...reset}
        />
      )}
    </>
  );
};

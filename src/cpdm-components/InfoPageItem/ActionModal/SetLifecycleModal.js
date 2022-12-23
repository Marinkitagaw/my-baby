import React, { useState } from 'react';
import { Modal } from '@cpdm/components';
import { Slider, Space } from 'antd';

export default props => {
  const { visible, data = {}, onCancel, onOk } = props;
  const { lifecycleStateIdentifier, lifecycleStates } = data;
  const current = lifecycleStateIdentifier;

  const [value, setValue] = useState(current);
  const [loading, setLoading] = useState(false);

  const getIndex = (states, values) => {
    for (let i = 0; i < states.length; i += 1) {
      if (values === states[i].identifier) return i;
    }
    return undefined;
  };

  const getMarks = (states, currents) => {
    const marks = {};
    states.map((s, i) => {
      const style =
        s.identifier === currents ? { fontWeight: 'bold', color: '#2db7f5' } : undefined;
      const label = (
        <span>
          {s.name}
          <br />
          {s.identifier === currents && '(当前状态)'}
        </span>
      );
      marks[i] = { style, label };
      return s;
    });
    return marks;
  };

  const handleOk = () => {
    if (onOk) {
      setLoading(true);
      onOk(value);
    }
  };

  return (
    <Modal
      width={600}
      destroyOnClose
      visible={visible}
      title="设置生命周期状态"
      onCancel={onCancel}
      onOk={handleOk}
      confirmLoading={loading}
    >
      <Space direction="vertical" style={{ width: '90%', margin: '20px' }}>
        <strong>请选择目标生命周期状态:</strong>
        <Slider
          min={0}
          max={lifecycleStates.length - 1}
          marks={getMarks(lifecycleStates, current)}
          step={null}
          included={false}
          value={getIndex(lifecycleStates, value)}
          onChange={v => {
            setValue(lifecycleStates[v].identifier);
          }}
          tipFormatter={v => lifecycleStates[v].name}
        />
      </Space>
    </Modal>
  );
};

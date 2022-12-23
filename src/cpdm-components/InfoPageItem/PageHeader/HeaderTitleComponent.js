import React from 'react';
import { GeneralStatus } from '@cpdm/components';
import { Tooltip, Space } from 'antd';
import latest2 from '@/assets/latest3.png';
import Icon from '@/cpdm-components/Icon';

export default props => {
  const {
    data = {},
    switchOriginalCopy,
    switchWorkingCopy,
    checkinable,
    handler,
    type,
    objectTypeDisplay,
  } = props;
  if (!data) return '';
  const { actions = {} } = data;
  const { GOTOLATEST } = actions;

  return (
    <div>
      <div
        style={{
          display: 'inline-block',
          verticalAlign: 'middle',
          textAlign: 'justify',
          wordBreak: 'break-all',
        }}
      >
        {typeof GOTOLATEST === 'number' && GOTOLATEST !== 2 && (
          <Tooltip title="转至最新">
            <img
              onClick={() => handler.GOTOLATEST()}
              src={latest2}
              width={20}
              style={{ marginRight: 8, cursor: 'pointer' }}
              alt="转至最新"
            />
          </Tooltip>
        )}
        <Space>
          {type && <Icon style={{ width: 28 }} width="28" name={`type/${type}.svg`} />}
          <span>{data.objectTypeDisplay || objectTypeDisplay}:&nbsp;</span>
        </Space>
        {data.code && <span>{data.code}</span>}
        {data.name && <span>,&nbsp;{data.name}</span>}
        {data.version && <span>,&nbsp;{data.version}</span>}
        {data.status && (
          <small>
            <GeneralStatus
              switchOriginalCopy={switchOriginalCopy}
              switchWorkingCopy={switchWorkingCopy}
              data={data}
              checkinable={checkinable}
            />
          </small>
        )}
      </div>
    </div>
  );
};

import React from 'react';
import { GeneralStatus } from '@cpdm/components';

export default props => {
  const { data, handleJumpVersion } = props;
  if (!data) return '';
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
        {data.categoryDisplay && <span>{data.categoryDisplay}:&nbsp;</span>}
        {data.code && <span>{data.code}</span>}
        {data.name && <span>,&nbsp;{data.name}</span>}
        {data.version && <span>,&nbsp;{data.version}</span>}
        {data.status && (
          <small>
            <GeneralStatus handleJumpVersion={handleJumpVersion} data={data} checkinable />
          </small>
        )}
      </div>
    </div>
  );
};

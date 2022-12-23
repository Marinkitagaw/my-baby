import React from 'react';

export default props => {
  const { url, init, width = 128, height = 72 } = props;
  if (!url)
    return (
      init || (
        <img
          alt="缩略图"
          width={width}
          height={height}
          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        />
      )
    );
  return <img alt="缩略图" width={width} height={height} src={url} />;
};

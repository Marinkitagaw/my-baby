import { useState, useEffect } from 'react';
import { viewerParams } from '@/services/data/bom';
import { Skeleton } from 'antd';

export default ({ type, id, data, dataType, objectType }) => {
  const [url, setUrl] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let unmount = false;

    (async () => {
      setLoading(true);
      const res = await viewerParams(id);
      console.log('res', res);
      setLoading(false);
      if (!unmount && res && !res.error) {
        setUrl(res);
      }
    })();
    return () => {
      unmount = true;
    };
  }, []);
  return (
    <>
      {loading ? (
        <Skeleton />
      ) : url ? (
        <iframe
          style={{ width: '100%', height: '60vh', border: 0 }}
          src={`${process.env.BASE_PATH}/static/mpm-viewer/index.html?${url}`}
        />
      ) : (
        '暂无相关数据'
      )}
    </>
  );
};

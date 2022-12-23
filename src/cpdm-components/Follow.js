import React, { useEffect, useCallback } from 'react';
import { connect } from 'umi';
import { Button, Rate } from 'antd';

const FollowButton = ({
  dispatch,
  objectCode,
  objectName,
  objectId,
  objectType,
  isFollow,
  followLoading,
}) => {
  const getFollow = useCallback(() => {
    dispatch({
      type: 'follow/getFollow',
      payload: {
        objectId,
        objectType,
      },
    });
  }, [dispatch, objectId, objectType]);

  const follow = () => {
    if (isFollow) {
      dispatch({
        type: 'follow/unFollow',
        payload: {
          objectId,
        },
        callback: () => {
          getFollow();
        },
      });
    } else {
      dispatch({
        type: 'follow/follow',
        payload: {
          objectCode,
          objectName,
          objectId,
          objectType,
        },
        callback: () => {
          getFollow();
        },
      });
    }
  };

  useEffect(() => {
    getFollow();
  }, [getFollow]);

  return (
    <Button
      style={{ paddingTop: 0, paddingBottom: 35 }}
      onClick={follow}
      type="primary"
      loading={followLoading}
    >
      <Rate tooltips={isFollow ? ['取消关注'] : ['关注']} count={1} value={isFollow ? 1 : 0} />
    </Button>
  );
};

export default connect(({ follow, loading }) => ({
  isFollow: follow.isFollow,
  followLoading:
    loading.effects['follow/getFollow'] ||
    loading.effects['follow/unFollow'] ||
    loading.effects['follow/follow'],
}))(FollowButton);

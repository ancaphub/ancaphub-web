import React, { useEffect, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserPostsRequest } from '../../../redux/ducks/posts/actions';
import PostForm from '../../../components/posts/PostForm';
import PostCard from '../../../components/posts/PostCard';
import { CircularLoader } from 'snake-ui';

const Feed = ({ user }: any) => {
  const dispatch = useDispatch();
  const { items: posts, loading } = useSelector((state: any) => state.posts);
  const auth = useSelector((state: any) => state.auth);

  const verifyIfIsOwnProfile =
    auth.isAuthenticated && auth.user.username === user;

  useEffect(() => {
    dispatch(getUserPostsRequest(user));
  }, [dispatch, user]);

  return (
    <>
      {verifyIfIsOwnProfile && <PostForm />}

      <div style={{ width: '100%', marginTop: 16 }}>
        {!loading ? (
          <>
            {Object.values(posts).map((item: any) => (
              <PostCard data={item} key={item._id} />
            ))}
          </>
        ) : (
          <div
            style={{
              width: '100%',
              justifyContent: 'center',
              display: 'flex',
              padding: 16,
            }}
          >
            <CircularLoader size={72} />
          </div>
        )}
      </div>
    </>
  );
};

export default memo(Feed);

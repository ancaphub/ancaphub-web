import React from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import {
  getPostsRequest as getPostsAction,
  getMorePostsRequest,
} from '../../redux/ducks/posts/actions';

import { Container } from 'snake-ui';

import PostForm from '../../components/posts/PostForm';
import LastItemsWidget from '../../components/library/LastItemsWidget';
import ShowPosts from '../../components/posts/ShowPosts';
import { FeedContainer } from './styles';

const Feed = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getPostsAction());
  }, [dispatch]);

  const { items, loading } = useSelector((state: any) => state.posts);

  return (
    <Container>
      <FeedContainer>
        <div id="posts">
          <PostForm />
          <div style={{ marginTop: 16, width: '100%' }}>
            <ShowPosts posts={items} getMore={getMorePostsRequest} />
          </div>
        </div>
        <div id="sidebar">
          <LastItemsWidget />
          <div style={{ marginTop: 16 }} />
        </div>
      </FeedContainer>
    </Container>
  );
};

export default Feed;

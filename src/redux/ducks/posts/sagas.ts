import {
  takeEvery,
  putResolve,
  takeLatest,
  call,
  fork,
  put,
} from 'redux-saga/effects';

import { PostsTypes } from './types';
import * as actions from './actions';
import * as api from '../../../api/posts';
import { addAlert } from '../../actions/alerts';

import { getUsersCount } from '../../actions/users';
import { getUsersRelationsips } from '../../actions/relationships';

function* createPost(action: any) {
  try {
    const post = yield call(api.createPost, action.payload);
    yield put(actions.createPostSuccess(post.data));
  } catch (e) {
    yield put(actions.poststError());
  }
}

function* deletePost(action: any) {
  try {
    yield call(api.deletePost, action.payload);
    yield put(actions.deletePostSuccess(action.payload));
  } catch (e) {
    yield put(
      addAlert({
        type: 'error',
        title: 'Erro ao deletar publicação',
        description: e.message,
      })
    );
  }
}

function* getPosts() {
  try {
    const posts = yield call(api.getFeedPosts, { currentPage: 1 });
    yield put(actions.getPostsSuccess(posts.data));
  } catch (e) {
    yield put(actions.poststError());
  }
}

function* getMorePosts(action: any) {
  try {
    const posts = yield call(api.getFeedPosts, {
      currentPage: action.payload.page,
    });
    yield put(actions.getMorePostsSuccess(posts.data));
  } catch (e) {
    yield put(actions.poststError());
  }
}

function* likePost(action: any) {
  try {
    const likedPost = yield call(() => api.likePost(action.payload));
    yield put(actions.likePostSuccess(likedPost.data));
  } catch (e) {
    yield put(actions.poststError());
  }
}

function* getPostLikes(action: any) {
  try {
    const post = yield call(() => api.getLikes(action.payload));
    yield putResolve(getUsersCount(post.data.likes));
    yield putResolve(getUsersRelationsips(post.data.likes));
    yield put(actions.getPostLikesSuccess(post.data));
  } catch (e) {
    yield put(actions.poststError());
  }
}

function* votePostPoll(action: any) {
  try {
    const { postId, pollId, vote } = action.payload;
    const data = yield call(api.votePostPoll, { pollId, option: vote });
    yield put(actions.votePostPollSuccess({ postId, data: data.data }));
  } catch (e) {
    yield put(actions.poststError());
  }
}

function* getUserPosts(action: any) {
  try {
    const posts = yield call(api.getUserPosts, action.payload);
    yield put(actions.getUserPostsSuccess(posts.data));
  } catch (e) {
    yield put(actions.poststError());
  }
}

function* watchGetUserPostsRequest() {
  yield takeLatest(PostsTypes.GET_USER_POSTS_REQUEST, getUserPosts);
}

function* watchGetPostsRequest() {
  yield takeEvery(PostsTypes.GET_POSTS_REQUEST, getPosts);
}

function* watchGetMorePostsRequest() {
  yield takeEvery(PostsTypes.GET_MORE_POSTS_REQUEST, getMorePosts);
}

function* watchCreatePostRequest() {
  yield takeLatest(PostsTypes.CREATE_POST_REQUEST, createPost);
}

function* watchLikePostRequest() {
  yield takeLatest(PostsTypes.LIKE_POST_REQUEST, likePost);
}

function* watchGetLikesRequest() {
  yield takeLatest(PostsTypes.GET_POST_LIKE_REQUEST, getPostLikes);
}

function* watchVotePostPollRequest() {
  yield takeLatest(PostsTypes.VOTE_POST_POLL_REQUEST, votePostPoll);
}

function* watchDeletePostRequest() {
  yield takeLatest(PostsTypes.DELETE_POST_REQUEST, deletePost);
}

export default [
  fork(watchCreatePostRequest),
  fork(watchGetPostsRequest),
  fork(watchGetUserPostsRequest),
  fork(watchLikePostRequest),
  fork(watchGetLikesRequest),
  fork(watchVotePostPollRequest),
  fork(watchDeletePostRequest),
  fork(watchGetMorePostsRequest),
];

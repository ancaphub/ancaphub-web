import { action } from 'typesafe-actions';
import { PostsTypes, Post } from './types';

export const getPostsRequest = (data?: any) =>
  action(PostsTypes.GET_POSTS_REQUEST, data);
export const getPostsSuccess = (data: Post[]) =>
  action(PostsTypes.GET_POSTS_SUCCESS, data);

export const getMorePostsRequest = (data: any) =>
  action(PostsTypes.GET_MORE_POSTS_REQUEST, data);
export const getMorePostsSuccess = (data: Post[]) =>
  action(PostsTypes.GET_MORE_POSTS_SUCCESS, data);

export const getUserPostsRequest = (handle: string) =>
  action(PostsTypes.GET_USER_POSTS_REQUEST, handle);
export const getUserPostsSuccess = (data: Post[]) =>
  action(PostsTypes.GET_POST_LIKE_SUCCESS, data);

export const createPostRequest = (data: any) =>
  action(PostsTypes.CREATE_POST_REQUEST, data);
export const createPostSuccess = (data: Post) =>
  action(PostsTypes.CREATE_POST_SUCCESS, data);

export const deletePostRequest = (postId: string) =>
  action(PostsTypes.DELETE_POST_REQUEST, postId);
export const deletePostSuccess = (postId: string) =>
  action(PostsTypes.DELETE_POST_SUCCESS, postId);

export const getPostLikesRequest = (postId: string) =>
  action(PostsTypes.GET_POST_LIKE_REQUEST, postId);
export const getPostLikesSuccess = (data: any) =>
  action(PostsTypes.GET_POST_LIKE_SUCCESS, data);

export const likePostRequest = (postId: string) =>
  action(PostsTypes.LIKE_POST_REQUEST, postId);
export const likePostSuccess = (data: any) =>
  action(PostsTypes.LIKE_POST_SUCCESS, data);

export const sharePostRequest = (postId: string) =>
  action(PostsTypes.SHARE_POST_REQUEST, postId);
export const sharePostSuccess = (data: any) =>
  action(PostsTypes.SHARE_POST_SUCCESS, data);

export const votePostPollRequest = (data: any) =>
  action(PostsTypes.VOTE_POST_POLL_REQUEST, data);
export const votePostPollSuccess = (data: any) =>
  action(PostsTypes.VOTE_POST_POLL_SUCCESS, data);

export const poststError = () => action(PostsTypes.POST_ERROR);

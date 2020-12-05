export enum PostsTypes {
  CREATE_POST_REQUEST = 'posts/create_post_request',
  CREATE_POST_SUCCESS = 'posts/create_post_success',
  GET_POSTS_REQUEST = 'posts/get_posts_request',
  GET_POSTS_SUCCESS = 'posts/get_posts_success',
  GET_POSTS_FAILURE = 'posts/get_posts_failure',
  GET_MORE_POSTS_REQUEST = 'posts/get_more_posts_request',
  GET_MORE_POSTS_SUCCESS = 'posts/get_more_posts_success',
  GET_MORE_POSTS_FAILURE = 'posts/get_more_posts_failure',
  GET_USER_POSTS_REQUEST = 'posts/get_user_posts_request',
  GET_USER_POSTS_SUCCESS = 'posts/get_user_posts_success',
  GET_USER_POSTS_ERROR = 'posts/get_user_posts_error',
  LIKE_POST_REQUEST = 'posts/like_post_request',
  LIKE_POST_SUCCESS = 'posts/like_post_success',
  SHARE_POST_REQUEST = 'posts/share_post_request',
  SHARE_POST_SUCCESS = 'posts/share_post_success',
  DELETE_POST_REQUEST = 'posts/delete_post_request',
  DELETE_POST_SUCCESS = 'posts/delete_post_success',
  VOTE_POST_POLL_REQUEST = 'posts/vote_post_poll_request',
  VOTE_POST_POLL_SUCCESS = 'posts/vote_post_poll_success',
  GET_POST_LIKE_REQUEST = 'posts/get_post_like_request',
  GET_POST_LIKE_SUCCESS = 'posts/get_post_like_success',
  POST_ERROR = 'posts/post_error',
}

export interface Post {
  id: string;
  content: string;
  user_id: string;
  user: string;
  hasLiked: boolean;
  created_at: string;
  updated_at: string;
}

export interface PostsState {
  readonly items: Post[];
  readonly error: string;
  readonly postLikesLoading: boolean;
  readonly loading: boolean;
}

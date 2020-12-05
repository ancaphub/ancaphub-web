import { PostsTypes, PostsState } from './types';
import arrayToObject from '../../../utils/arrayToObject';
import { Reducer } from 'redux';

const INITIAL_STATE: PostsState = {
  items: [],
  error: '',
  postLikesLoading: true,
  loading: true,
};

const reducer: Reducer<PostsState> = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case PostsTypes.CREATE_POST_SUCCESS:
      return {
        ...state,
        items: {
          [payload.id]: payload,
          ...state.items,
        },
      };
    case PostsTypes.GET_POSTS_REQUEST:
    case PostsTypes.GET_USER_POSTS_REQUEST:
      return { ...state, loading: true };
    case PostsTypes.GET_POSTS_SUCCESS:
    case PostsTypes.GET_USER_POSTS_SUCCESS:
      return {
        ...state,
        items: arrayToObject(payload.items, 'id'),
        loading: false,
      };
    case PostsTypes.GET_MORE_POSTS_SUCCESS:
      return {
        ...state,
        items: {
          ...state.items,
          ...arrayToObject(payload.items, 'id'),
        },
        loading: false,
      };
    case PostsTypes.LIKE_POST_REQUEST:
      return {
        ...state,
        items: {
          ...state.items,
          [payload]: {
            ...state.items[payload],
            hasLiked: !state.items[payload].hasLiked,
          },
        },
      };
    case PostsTypes.DELETE_POST_SUCCESS: {
      const newObj = { ...state.items };
      delete newObj[payload];

      return {
        ...state,
        items: newObj,
      };
    }

    case PostsTypes.LIKE_POST_SUCCESS:
      return {
        ...state,
        items: {
          ...state.items,
          [payload.id]: {
            ...state.items[payload.id],
            ...payload,
          },
        },
      };
    case PostsTypes.GET_POST_LIKE_REQUEST:
      return { ...state, postLikesLoading: true };
    case PostsTypes.GET_POST_LIKE_SUCCESS:
      return {
        ...state,
        items: {
          ...state.items,
          [payload.id]: {
            ...state.items[payload.id],
            likes: payload.likes,
          },
        },
        postLikesLoading: false,
      };
    case PostsTypes.VOTE_POST_POLL_SUCCESS:
      return {
        ...state,
        items: {
          ...state.items,
          [payload.postId]: {
            ...state.items[payload.postId],
            poll: {
              ...payload.data,
              allVotesCount: payload.data.allVotes.length,
            },
          },
        },
      };
    case PostsTypes.POST_ERROR:
      return { ...state, errorMessage: payload.errorMessage };
    default:
      return state;
  }
};

export default reducer;

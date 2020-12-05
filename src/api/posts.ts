import axios from './axios';

type Filters = {
  currentPage?: number;
  pageSize?: number;
};

export const createPost = (data: any) => axios.post('/posts', data);
export const deletePost = (postId: string) => axios.delete(`/posts/${postId}`);
export const likePost = (postId: string) =>
  axios.post(`/posts/${postId}/favorites`);
export const unlikePost = (postId: string) =>
  axios.delete(`/posts/${postId}/favorites`);
export const getLikes = (postId: string) =>
  axios.get(`/posts/${postId}/favorites`);
export const getFeedPosts = ({ currentPage = 1, pageSize = 5 }: Filters) =>
  axios.get('/timeline/home', { params: { currentPage, pageSize } });
export const getUserPosts = (handle: string) =>
  axios.get(`/timeline/profile/${handle}`);
export const votePostPoll = (data: any) =>
  axios.post(`/posts/${data.pollId}/vote`, { vote: data.option });

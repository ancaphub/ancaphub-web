import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProjectPostCard from '../../../../components/projects/ProjectPostCard';
import { getProjectPostsRequest } from '../../../../redux/actions/projects';
import { LoadContent } from '../../../../components';

const ProjectFeed = ({ project }: any) => {
  const { posts, loadingPosts } = useSelector((state: any) => state.projects);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjectPostsRequest(project.id));
  }, [project.id, dispatch]);

  return (
    <LoadContent loading={loadingPosts}>
      {posts.map((post: any) => (
        <ProjectPostCard post={post} key={post.id} />
      ))}
    </LoadContent>
  );
};

export default ProjectFeed;

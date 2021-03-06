import React from 'react';
import { Link } from 'react-router-dom';
import { Paper } from 'snake-ui';
import defaultProjectCover from '../../../assets/default-group-cover.png';
import FollowProjectButton from '../FollowProjectButton';
import { ProjectCover, ProjectInfo } from './styles';

interface ProjectCardProps {
  data: {
    id: string;
    name: string;
    cover: string;
    cover_url: string;
    peopleWatching: number;
    hasEnrolled: boolean;
    description: string;
  };
}

const ProjectCard: React.FC<ProjectCardProps> = ({ data }) => {
  const { id, name, cover_url, description } = data;
  return (
    <div style={{ width: '100%' }}>
      <Paper>
        <Link to={`/projects/${id}`}>
          <ProjectCover cover={cover_url || defaultProjectCover} />
        </Link>
        <ProjectInfo>
          <h4>
            <Link to="/projects/id">{name}</Link>
          </h4>
          <span>{description}</span>
        </ProjectInfo>
      </Paper>
    </div>
  );
};

export default ProjectCard;

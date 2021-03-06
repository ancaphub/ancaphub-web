import React from 'react';
import { FiCalendar as CalendarIcon } from 'react-icons/fi';
import { FormattedDate } from 'react-intl';
import { parseISO, addDays } from 'date-fns';
import { Link } from 'react-router-dom';
import defaultCover from '../../../assets/default-article-cover.jpg';
import { Post } from './styles';

const ProjectFeed = ({ post }: any) => {
  const getExperpt = () => {
    /*
    const { blocks } = JSON.parse(post.content);
    const mappedBlocks = blocks.map(
      (block: any) => (!block.text.trim() && '\n') || block.text
    );

    return mappedBlocks.reduce((acc: any, block: any) => {
      let returned = acc;
      if (block === '\n') returned += block;
      else returned += `${block}\n`;
      return returned;
    }, '');*/
    return 'asdasdasd';
  };

  return (
    <Post>
      <div className="post-cover">
        <Link to={`/projects/${post.project.id}/posts/${post.id}`}>
          <img
            alt="cover"
            src={
              post.thumbnail && post.thumbnail !== ''
                ? post.thumbnail
                : defaultCover
            }
          />
        </Link>
      </div>
      <div className="post-content">
        <div className="date">
          <CalendarIcon />
          <span>
            <FormattedDate
              value={addDays(parseISO(post.created_at), 1)}
              year="numeric"
              month="long"
              day="2-digit"
            />
          </span>
        </div>
        <Link to={`/projects/${post.project.id}/posts/${post.id}`}>
          <h3>{post.title}</h3>
        </Link>
        <p>{getExperpt().substring(0, 120)}...</p>
      </div>
    </Post>
  );
};

export default ProjectFeed;

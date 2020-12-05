import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FiCheckCircle as VotedIcon } from 'react-icons/fi';
import { FormattedMessage } from 'react-intl';
import { votePostPollRequest } from '../../../redux/ducks/posts/actions';
import { PostPollOption, PostPollOptionProgress, PostPollWrap } from './styles';

interface PostPollProps {
  post: any;
}

const PostPoll: React.FC<PostPollProps> = ({ post }) => {
  const { user } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const [showingResults, setShowingResults] = React.useState(false);

  const hasVoted = post.poll.allVotes.includes(user._id);

  const handleVote = ({
    pollId,
    vote,
    postId,
  }: {
    pollId: string;
    vote: any;
    postId: string;
  }) => {
    if (hasVoted) return;
    dispatch(votePostPollRequest({ postId, pollId, vote }));
    setShowingResults(true);
  };

  const toggleShowResults = () => {
    if (hasVoted) return;
    setShowingResults((prev) => !prev);
  };

  React.useEffect(() => {
    if (hasVoted) {
      setShowingResults(true);
    }
  }, [setShowingResults, hasVoted]);

  return (
    <PostPollWrap>
      {post.poll.options.map((option: any) => (
        <PostPollOption
          hasVoted={hasVoted}
          key={option._id}
          onClick={() =>
            handleVote({
              pollId: post.media.data,
              postId: post._id,
              vote: option.title,
            })
          }
        >
          <div className="option-title">
            <div>
              <span>{option.title}</span>
              {option.votes && option.votes.includes(user._id) && <VotedIcon />}
            </div>

            {showingResults && (
              <span>
                {option.votesCount === 0
                  ? 0
                  : (
                      (option.votesCount / post.poll.allVotesCount) *
                      100
                    ).toFixed(2)}
                %
              </span>
            )}
          </div>

          {showingResults && (
            <div className="progress-bar">
              <PostPollOptionProgress // @ts-ignore
                percentage={
                  option.votesCount === 0
                    ? 0
                    : (
                        (option.votesCount / post.poll.allVotesCount) *
                        100
                      ).toFixed(2)
                }
              />
            </div>
          )}
        </PostPollOption>
      ))}
      {!hasVoted && (
        <span
          onClick={() => toggleShowResults()}
          role="presentation"
          style={{ margin: '1em 0', cursor: 'pointer' }}
        >
          <FormattedMessage
            id={`common.${showingResults ? 'hide' : 'show'}Results`}
          />
        </span>
      )}
      <span>
        <FormattedMessage
          id="components.postPoll.votesTotal"
          values={{ votes: post.poll.allVotesCount || 0 }}
        />
      </span>
    </PostPollWrap>
  );
};
export default PostPoll;

import React, { useEffect, memo } from 'react';
import { FiX as CloseIcon } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import { getPostLikesRequest } from '../../../redux/ducks/posts/actions';
import UserList from '../../users/UserList';
import { Modal, Card, CardHeader, CardBody, CircularLoader } from 'snake-ui';

interface ShowPostLikesProps {
  open: boolean;
  onClose(): void;
  postId: string;
}

const ShowPostLikes: React.FC<ShowPostLikesProps> = ({
  open,
  onClose,
  postId,
}) => {
  const dispatch = useDispatch();
  const likes = useSelector((state: any) => state.posts);

  useEffect(() => {
    if (open) {
      dispatch(getPostLikesRequest(postId));
    }
  }, [open]);

  return (
    <Modal open={open} onClose={onClose}>
      {open && (
        <Card>
          <CardHeader // @ts-ignore
            title={<FormattedMessage id="common.likePlural" />}
            actions={[
              {
                type: 'icon',
                show: true,
                action: onClose,
                label: <CloseIcon />,
              },
            ]}
          />
          {/* @ts-ignore */}
          <CardBody style={{ overflowX: 'auto' }}>
            {likes.postLikesLoading ? (
              <div
                style={{
                  width: '100%',
                  height: 60,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <CircularLoader size={48} />
              </div>
            ) : (
              <UserList users={likes.items[postId].likes} />
            )}
          </CardBody>
        </Card>
      )}
    </Modal>
  );
};

export default memo(ShowPostLikes);

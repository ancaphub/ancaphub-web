import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage, FormattedDate } from 'react-intl';
import LocationIcon from 'react-ionicons/lib/IosPinOutline';
import BirthIcon from 'react-ionicons/lib/IosEggOutline';
import SiteIcon from 'react-ionicons/lib/IosLinkOutline';
import EditIcon from 'react-ionicons/lib/IosCreate';
import defaultProfilePicture from '../../assets/default-profile-picture.jpg';
import defaultProfileCover from '../../assets/default-profile-cover.jpg';

import {
  Paper,
  Button,
  Spinner,
  Container,
  Tabs,
  Tab,
} from '../../components/ui';

import FollowButton from '../../components/users/FollowButton';
import EditProfile from '../../components/users/EditProfile';
import EditAvatar from '../../components/users/EditAvatar';

import { getSingleUserRequest } from '../../actions/users';
import {
  ProfileHeader,
  ProfilePicture,
  ProfileInfo,
  UserAbout,
  ProfileContent,
} from './styles';

const Feed = lazy(() => import('./Feed'));
const Lists = lazy(() => import('./Lists'));
const Contributions = lazy(() => import('./Contributions'));
const Followers = lazy(() => import('./Followers'));
const Following = lazy(() => import('./Following'));

const Profiles = () => {
  const { user, loading } = useSelector((state) => state.profile);
  const counts = useSelector((state) => state.usersCount);
  const auth = useSelector((state) => state.auth);

  const [Page, setPage] = useState();
  const [editProfile] = useState(false);
  const [editAvatar, setEditAvatar] = useState(false);

  const { id: userId, page: pageParam } = useParams();
  const dispatch = useDispatch();

  const verifyIfIsOwnProfile = auth.isAuthenticated && auth.user._id === userId;

  const pages = {
    undefined: <Feed user={userId} />,
    lists: <Lists />,
    contributions: <Contributions />,
    followers: <Followers user={userId} />,
    following: <Following user={userId} />,
  };

  useEffect(() => {
    dispatch(getSingleUserRequest(userId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, getSingleUserRequest]);

  useEffect(() => {
    setPage(() => pages[pageParam]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageParam]);

  return (
    <Container>
      {loading ? (
        <div
          style={{
            display: 'flex',
            flexBasis: '100%',
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Spinner size={128} />
        </div>
      ) : (
        <>
          {verifyIfIsOwnProfile && (
            <EditAvatar
              open={editAvatar}
              onClose={() => setEditAvatar(false)}
            />
          )}

          <ProfileHeader>
            <div className="profile-cover">
              <img src={defaultProfileCover} alt="default cover pic" />
            </div>
            <ProfilePicture isOwn={verifyIfIsOwnProfile}>
              <div className="avatar">
                <img
                  alt="user avatar"
                  src={
                    user.avatar && user.avatar !== ''
                      ? user.avatar
                      : defaultProfilePicture
                  }
                />
                {verifyIfIsOwnProfile && (
                  <div
                    role="presentation"
                    className="edit-profile-picture"
                    onClick={() => setEditAvatar(true)}
                  >
                    <EditIcon />
                  </div>
                )}
              </div>
            </ProfilePicture>
            <ProfileInfo>
              <div className="follower-count">
                <ul>
                  <li>
                    <Link to={`/${userId}/followers`} className="counter">
                      {counts[userId] ? counts[userId].followersCount : 0}
                    </Link>
                    <span>
                      <FormattedMessage
                        id="common.followers"
                        description="Info quantidade de seguidores"
                      />
                    </span>
                  </li>
                  <li>
                    <Link to={`/${userId}/following`} className="counter">
                      {counts[userId] ? counts[userId].followingCount : 0}
                    </Link>
                    <span>
                      <FormattedMessage
                        id="common.following"
                        description="Info quantidade de usuário seguidos"
                      />
                    </span>
                  </li>
                </ul>
              </div>

              <div className="user-name">
                <h3>{user.name}</h3>
                <span>@{user.username}</span>
              </div>

              <div className="user-action-buttons">
                <FollowButton user={userId} />
                {verifyIfIsOwnProfile && <EditProfile open={editProfile} />}

                {!verifyIfIsOwnProfile && (
                  <Button color="primary">
                    <FormattedMessage
                      id="common.sendMessage"
                      description="Enviar Mensagem"
                    />
                  </Button>
                )}
              </div>
            </ProfileInfo>
          </ProfileHeader>
          <ProfileContent>
            <UserAbout>
              <Paper>
                <h3>
                  <FormattedMessage id="common.about" description="Sobre" />
                </h3>
                {user.bio && <p>{user.bio}</p>}

                <ul>
                  {user.currentCity && (
                    <li>
                      <LocationIcon />
                      <span>{user.currentCity}</span>
                    </li>
                  )}

                  {user.birthday && (
                    <li>
                      <BirthIcon />
                      <span>
                        <FormattedDate
                          value={user.birthday}
                          year="numeric"
                          month="long"
                          day="2-digit"
                        />
                      </span>
                    </li>
                  )}

                  {user.site && (
                    <li>
                      <SiteIcon />
                      <span>
                        <a href="http://example.com" target="_black">
                          {user.site}
                        </a>
                      </span>
                    </li>
                  )}
                </ul>
              </Paper>
            </UserAbout>
            <div>
              <Paper className="profile-menu">
                <Tabs>
                  <Tab
                    current={pageParam === undefined}
                    label={<FormattedMessage id="common.feed" />}
                    link={`/${userId}`}
                  />
                  <Tab
                    current={pageParam === 'following'}
                    label={<FormattedMessage id="common.following" />}
                    link={`/${userId}/following`}
                  />
                  <Tab
                    current={pageParam === 'followers'}
                    label={<FormattedMessage id="common.followers" />}
                    link={`/${userId}/followers`}
                  />
                </Tabs>
              </Paper>

              <div className="profile-content">
                <Suspense fallback={<Spinner size={96} />}>{Page}</Suspense>
              </div>
            </div>
          </ProfileContent>
        </>
      )}
    </Container>
  );
};

export default Profiles;
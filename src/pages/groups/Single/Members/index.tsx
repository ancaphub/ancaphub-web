import React from 'react';
import { FormattedMessage } from 'react-intl';

import UserCard from '../../../../components/users/UserCard';
import { LoadContent } from '../../../../components/ui';

import { Paper, Grid } from 'snake-ui';

const users = [
  {
    user: {
      _id: '5e322ab7fefdfa7cb9843640',
      name: 'Samuel Casseb',
      username: 'cassebsamuel',
      avatar:
        'https://ancaphub.s3.amazonaws.com/1580346118891-Screenshot_20200112-021949.png',
      bio: 'Estudando Tec. em Comércio Exterior',
      isVerified: false,
      followersCount: 27,
      followingCount: 58,
      followed_by: true,
      following: true,
    },
  },
  {
    user: {
      _id: '5e2f354bf125e30409ad20dd',
      name: 'Leonardo',
      username: 'leonardo',
      bio: 'Oi.',
      isVerified: false,
      followersCount: 24,
      followingCount: 21,
      followed_by: true,
      following: true,
    },
  },
  {
    user: {
      _id: '5e2f17eaf125e30409ad1f0d',
      name: 'Lini',
      username: 'lini',
      avatar:
        'https://ancaphub.s3.amazonaws.com/1580144923968-images%20%288%29.jpeg',
      bio: '',
      isVerified: false,
      followersCount: 30,
      followingCount: 65,
      followed_by: true,
      following: true,
    },
  },
  {
    user: {
      _id: '5e40ac5cfa661f054fde466b',
      name: 'Lucas Zanotti',
      username: 'lucaszanotti',
      avatar:
        'https://ancaphub.s3.sa-east-1.amazonaws.com/1581391930006-Untitled-2.png',
      bio: '',
      isVerified: false,
      followersCount: 24,
      followingCount: 66,
      followed_by: true,
      following: true,
    },
  },
  {
    user: {
      _id: '5e2f5715f125e30409ad213d',
      name: '@WaifuSul',
      username: 'waifusul',
      avatar:
        'https://ancaphub.s3.sa-east-1.amazonaws.com/file-1586815729929.jpeg',
      bio:
        'steamcommunity.com/id/deadwar666 Discord: Dead...#9201 myanimelist.net/profile/DeadWar',
      isVerified: false,
      followersCount: 35,
      followingCount: 80,
      followed_by: true,
      following: true,
    },
  },
  {
    user: {
      _id: '5e55391f5606b61e900b4159',
      name: 'Victor Matheus',
      username: 'victor',
      avatar:
        'https://ancaphub.s3.sa-east-1.amazonaws.com/file-1582647960889.jpg',
      bio: '',
      isVerified: false,
      followersCount: 8,
      followingCount: 17,
      followed_by: true,
      following: true,
    },
  },
];

const Members = () => (
  <LoadContent loading={false}>
    {users.length === 0 ? (
      <Paper padding>
        <FormattedMessage
          id="profile.followers.noFollowers"
          description="User has no followers"
        />
      </Paper>
    ) : (
      <Grid container spacing={2} style={{ marginTop: 8 }}>
        {users.map((user: any) => (
          <Grid item xs={3} key={user.id}>
            <UserCard user={user.user} />
          </Grid>
        ))}
      </Grid>
    )}
  </LoadContent>
);

export default Members;

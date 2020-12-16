import { takeEvery, takeLatest, call, fork, put } from 'redux-saga/effects';

import * as actions from '../actions/users';
import * as alerts from '../actions/alerts';
import * as api from '../../api/users';
import { getUsersCount } from '../actions/users';
import { addAlert } from '../actions/alerts';
import { getUsersRelationsips } from '../actions/relationships';

function* getUsers() {
  try {
    const users = yield call(api.getUsers, { page: 1 });
    const parsedUsers = users.data.map((user) => ({
      user: user,
    }));

    yield put(getUsersCount(parsedUsers));
    yield put(getUsersRelationsips(parsedUsers));
    yield put(actions.getUsersSuccess(parsedUsers));
  } catch (e) {
    yield put(alerts.addAlert('error', e.message));
  }
}

function* loadMorePosts({ payload }) {
  try {
    const users = yield call(api.getUsers, { page: payload.page });
    yield put(getUsersCount(users.data));
    yield put(getUsersRelationsips(users.data));
    yield put(actions.loadMoreUsersSuccess({ items: users.data }));
  } catch (e) {
    yield put(alerts.addAlert('error', e.message));
  }
}

function* getSingleUser(action) {
  try {
    const user = yield call(() => api.getSingleUser(action.payload));
    yield put(getUsersCount([{ user: user.data }]));
    yield put(getUsersRelationsips([{ user: user.data }]));
    yield put(actions.getSingleUserSuccess(user.data));
  } catch (e) {
    yield put(alerts.addAlert('error', e.message));
  }
}

function* getUserFollowers(action) {
  try {
    const users = yield call(() => api.getUserFollowers(action.payload));
    const parsedUsers = users.data.map((user) => ({
      user: user,
    }));

    yield put(getUsersCount(parsedUsers));
    yield put(getUsersRelationsips(parsedUsers));
    yield put(actions.getUserFollowersSuccess(parsedUsers));
  } catch (e) {
    yield put(alerts.addAlert('error', e.message));
  }
}

function* getUserFollowing(action) {
  try {
    const users = yield call(() => api.getUserFollowing(action.payload));
    const parsedUsers = users.data.map((user) => ({
      user: user,
    }));

    yield put(getUsersCount(parsedUsers));
    yield put(getUsersRelationsips(parsedUsers));
    yield put(actions.getUserFollowingSuccess(parsedUsers));
  } catch (e) {
    yield put(alerts.addAlert('error', e.message));
  }
}

function* createUser({ payload }) {
  try {
    const result = yield call(api.createUser, payload);
    localStorage.setItem('token', result.data.token);
    document.location.reload();
    yield put(actions.createUserSuccess(result.data));
  } catch (e) {
    yield put(actions.createUserError());
    yield put(alerts.addAlert('error', e.message));
  }
}

function* updateUserInfo({ payload }) {
  try {
    const result = yield call(api.updateUserInfo, payload);
    yield put(actions.updateProfileInfoSuccess(result.data));
    yield put(
      addAlert({
        title: 'Sucesso',
        description: 'Perfil atualizado com sucesso',
        type: 'success',
      })
    );
  } catch (e) {
    yield put(alerts.addAlert('error', e.message));
  }
}

function* updateUserAvatar({ payload }) {
  try {
    const result = yield call(api.updateUserAvatar, payload);
    yield put(actions.updateProfilePictureSuccess(result.data));
    yield put(
      addAlert({
        title: 'Sucesso',
        description: 'Avatar atualizado com sucesso',
        type: 'success',
      })
    );
  } catch (e) {
    yield put(alerts.addAlert('error', e.message));
  }
}

function* updateUserCover({ payload }) {
  try {
    const result = yield call(api.updateUserCover, payload);
    yield put(actions.updateProfileCoverSuccess(result.data));
    yield put(
      addAlert({
        title: 'Sucesso',
        description: 'Capa atualizada com sucesso',
        type: 'success',
      })
    );
  } catch (e) {
    yield put(alerts.addAlert('error', e.message));
  }
}

function* watchGetUsersRequest() {
  yield takeEvery(actions.Types.GET_USERS_REQUEST, getUsers);
}

function* watchLoadMoreUsersRequest() {
  yield takeEvery(actions.Types.LOAD_MORE_USERS_REQUEST, loadMorePosts);
}

function* watchGetSingleUser() {
  yield takeLatest(actions.Types.GET_SINGLE_USER_REQUEST, getSingleUser);
}

function* watchCreateUserRequest() {
  yield takeLatest(actions.Types.CREATE_USER_REQUEST, createUser);
}

function* watchGetUserFollowers() {
  yield takeLatest(actions.Types.GET_USER_FOLLOWERS_REQUEST, getUserFollowers);
}

function* watchGetUserFollowing() {
  yield takeLatest(actions.Types.GET_USER_FOLLOWING_REQUEST, getUserFollowing);
}

function* watchUpdateUserInfo() {
  yield takeLatest(actions.Types.UPDATE_PROFILE_INFO_REQUEST, updateUserInfo);
}

function* watchUpdateUserAvatar() {
  yield takeLatest(
    actions.Types.UPDATE_PROFILE_PICTURE_REQUEST,
    updateUserAvatar
  );
}

function* watchUpdateUserCover() {
  yield takeLatest(actions.Types.UPDATE_PROFILE_COVER_REQUEST, updateUserCover);
}

export default [
  fork(watchGetUsersRequest),
  fork(watchLoadMoreUsersRequest),
  fork(watchCreateUserRequest),
  fork(watchGetSingleUser),
  fork(watchGetUserFollowers),
  fork(watchUpdateUserInfo),
  fork(watchUpdateUserAvatar),
  fork(watchGetUserFollowing),
  fork(watchUpdateUserCover),
];

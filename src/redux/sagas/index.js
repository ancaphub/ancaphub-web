import { all } from 'redux-saga/effects';

import UserSagas from './users';
import AuthSagas from './auth';
import PostSagas from '../ducks/posts';
import SettingsSagas from './settings';
import CommentSagas from './comments';
import LibrarySagas from './library';
import RelationshipsSagas from './relationships';
import SearchSagas from './search';
import CategoriesSagas from './categories';
import ProjectsSagas from './projects';
import ChatsSagas from './chats';
import AuthorsSagas from './authors';

export default function* rootSaga() {
  yield all([
    ...UserSagas,
    ...AuthSagas,
    ...PostSagas,
    ...SettingsSagas,
    ...CommentSagas,
    ...LibrarySagas,
    ...RelationshipsSagas,
    ...SearchSagas,
    ...CategoriesSagas,
    ...ProjectsSagas,
    ...ChatsSagas,
    ...AuthorsSagas,
  ]);
}

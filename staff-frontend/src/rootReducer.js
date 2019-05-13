import { combineReducers } from 'redux';
import countryProperties from './countryProperties/reducer';
import filter from './filter/reducer';
import pagination from './pagination/reducer';
import auth from './auth/reducer';
import users from './users/reducer';

export default combineReducers({
  countryProperties,
  filter,
  pagination,
  auth,
  users,
});

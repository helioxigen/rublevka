import { combineReducers } from 'redux';
import countryProperties from './countryProperties/reducer';
import filter from './filter/reducer';
import pagination from './pagination/reducer';

export default combineReducers({
  countryProperties,
  filter,
  pagination,
});

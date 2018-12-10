import * as types from 'cem/constants/settlements/actions';

export default (id, location) => ({
  type: types.CHANGE_LOCATION,
  id,
  location,
});

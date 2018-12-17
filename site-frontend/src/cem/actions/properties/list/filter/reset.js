import * as types from 'cem/constants/properties/actions';

export default () => dispatch =>
  dispatch({
    type: types.RESET_FILTER,
  });

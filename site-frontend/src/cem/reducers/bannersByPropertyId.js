import * as types from 'cem/constants/properties/actions';
import { handleActions } from 'redux-actions';

const initialState = {};

export default handleActions(
  {
    [types.LOAD_BANNERS]: (state, { propertyId, bannerState }) => ({
      ...state,
      [propertyId]: {
        ...(state[propertyId] || {}),
        isFetching: true,
        [bannerState]: { isFetching: true },
      },
    }),

    [types.LOAD_BANNERS_SUCCESS]: (state, { propertyId, bannerState, items }) => ({
      ...state,
      [propertyId]: {
        ...(state[propertyId] || {}),
        isFetching: false,
        [bannerState]: { items },
      },
    }),

    [types.LOAD_BANNERS_FAIL]: (state, { propertyId, bannerState, errors }) => ({
      ...state,
      [propertyId]: {
        ...(state[propertyId] || {}),
        isFetching: false,
        [bannerState]: { errors },
      },
    }),
  },
  initialState,
);

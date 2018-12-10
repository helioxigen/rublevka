import { API } from 'core/config/sources';
import * as types from 'cem/constants/properties/actions';

const loadBannersStarted = (propertyId, category, bannerState) => ({
  type: types.LOAD_BANNERS,
  propertyId,
  category,
  bannerState,
});

const loadBannersSucceeded = (propertyId, bannerState, { items }) => ({
  type: types.LOAD_BANNERS_SUCCESS,
  propertyId,
  bannerState,
  items,
});

const loadBannersFailed = (propertyId, bannerState, { errors }) => ({
  type: types.LOAD_BANNERS_FAIL,
  propertyId,
  bannerState,
  errors,
});

export default function loadBanners(propertyId, category, state) {
  return (dispatch) => {
    dispatch(loadBannersStarted(propertyId, category, state));
    const filter = { state };

    return API.get(`/v1/properties/${category}/${propertyId}/banners`, { filter })
      .then(({ body }) => dispatch(loadBannersSucceeded(propertyId, state, body)))
      .catch(({ body }) => dispatch(loadBannersFailed(propertyId, state, body)));
  };
}

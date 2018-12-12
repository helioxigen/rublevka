import { API } from 'core/config/sources';
import * as types from 'cem/constants/properties/actions';

const createBannerStarted = (propertyId, category, data) => ({
  type: types.CREATE_BANNER,
  propertyId,
  category,
  data,
});

const createBannerSucceeded = (propertyId, bannerId) => ({
  type: types.CREATE_BANNER_SUCCESS,
  propertyId,
  bannerId,
});

const createBannerFailed = (propertyId, data, { errors }) => ({
  type: types.CREATE_BANNER_FAIL,
  propertyId,
  data,
  errors,
});

export default function createBanner(propertyId, category, data) {
  return (dispatch) => {
    dispatch(createBannerStarted(propertyId, category, data));

    return API.post(`/v1/properties/${category}/${propertyId}/banners`, data)
      .then(({ headers }) => {
        const locationSplit = headers.location.split('/');
        const bannerId = locationSplit[locationSplit.length - 1];

        return dispatch(createBannerSucceeded(propertyId, bannerId));
      })
      .catch(({ body }) => dispatch(createBannerFailed(propertyId, body, body)));
  };
}

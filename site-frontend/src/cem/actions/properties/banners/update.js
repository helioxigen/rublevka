import { API } from 'core/config/sources';
import * as types from 'cem/constants/properties/actions';
import { PROPERTY_BANNERS_CHANGED_STATE, PROPERTY_BANNERS_GAVE_ACTIVE } from 'cem/constants/analytics';
import sendAnalytics from 'core/actions/analytics';

const updateBannerStarted = (propertyId, category, bannerId, data) => ({
  type: types.UPDATE_BANNER,
  propertyId,
  category,
  bannerId,
  data,
});

const updateBannerSucceeded = (propertyId, bannerId) => ({
  type: types.UPDATE_BANNER_SUCCESS,
  propertyId,
  bannerId,
});

const updateBannerFailed = (propertyId, bannerId, { errors }) => ({
  type: types.UPDATE_BANNER_FAIL,
  propertyId,
  bannerId,
  errors,
});

export default function updateBanner(propertyId, category, bannerId, data) {
  return (dispatch) => {
    const { state } = data;
    dispatch(updateBannerStarted(propertyId, category, bannerId, data));
    dispatch(sendAnalytics(PROPERTY_BANNERS_CHANGED_STATE, {
      propertyId,
      category,
      bannerId,
      state,
    }));

    if (state === 'active') {
      dispatch(sendAnalytics(PROPERTY_BANNERS_GAVE_ACTIVE, {
        propertyId,
        category,
        bannerId,
      }));
    }

    return API.put(`/v1/properties/${category}/${propertyId}/banners/${bannerId}`, data)
      .then(({ body }) => dispatch(updateBannerSucceeded(propertyId, bannerId, body)))
      .catch(({ body }) => dispatch(updateBannerFailed(propertyId, bannerId, body)));
  };
}

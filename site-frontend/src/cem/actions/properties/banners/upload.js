import { API } from 'core/config/sources';
import * as types from 'cem/constants/properties/actions';

const uploadBannerStarted = (propertyId, category, bannerId) => ({
  type: types.UPLOAD_BANNER,
  propertyId,
  category,
  bannerId,
});

const uploadBannerSucceeded = (propertyId, bannerId) => ({
  type: types.UPLOAD_BANNER_SUCCESS,
  propertyId,
  bannerId,
});

const uploadBannerFailed = (propertyId, bannerId, { errors }) => ({
  type: types.UPLOAD_BANNER_FAIL,
  propertyId,
  bannerId,
  errors,
});

export default function uploadBanner(propertyId, category, bannerId, src) {
  return (dispatch) => {
    dispatch(uploadBannerStarted(propertyId, category, bannerId, src));

    return API.post(`/v1/properties/${category}/${propertyId}/banners/${bannerId}/image`, { src })
      .then(({ body }) => dispatch(uploadBannerSucceeded(propertyId, bannerId, body)))
      .catch(({ body }) => dispatch(uploadBannerFailed(propertyId, bannerId, body)));
  };
}

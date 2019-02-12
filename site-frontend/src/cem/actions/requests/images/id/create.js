import { API } from 'core/config/sources';
import * as types from 'cem/constants/requests/images/actions';
import { REQUESTS_IMAGES_BY_KIND_SUBMITTED } from 'cem/constants/analytics';
import sendAnalytics from 'core/actions/analytics';

const createImageRequestStarted = () => ({
  type: types.CREATE_IMAGES_REQUEST,
});

const createImageRequestSucceeded = ({
  propertyId,
  propertyCategory,
  kind,
  ...data
}) => {
  const eventName = REQUESTS_IMAGES_BY_KIND_SUBMITTED(kind);

  return dispatch => {
    dispatch(
      sendAnalytics(eventName, {
        propertyId,
        propertyCategory,
      }),
    );

    return dispatch({
      type: types.CREATE_IMAGES_REQUEST_SUCCESS,
      id: data.id,
      data,
    });
  };
};

const createImageRequestFailed = ({ errors }) => ({
  type: types.CREATE_IMAGES_REQUEST_FAIL,
  errors,
});

export default function createImageRequest(data) {
  return dispatch => {
    dispatch(createImageRequestStarted());

    return API.post('/v1/orders/images', data)
      .then(({ headers }) =>
        API.get(headers.location).then(({ body }) =>
          dispatch(createImageRequestSucceeded(body)),
        ),
      )
      .catch(({ body }) => {
        dispatch(createImageRequestFailed(body));
        return body;
      });
  };
}

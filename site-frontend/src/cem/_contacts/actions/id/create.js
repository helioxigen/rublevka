import {
  createElement,
  createElementStarted,
  createElementFailed,
  createElementSucceeded,
} from 'core/fetcher/actions';

import * as types from 'cem/_contacts/constants/actions';

// TODO Move dependencies to another place
import { transform, uploadPhoto } from 'cem/_contacts/old_actions/helpers';

const create = ({ photo, ...restContactData }) => (dispatch) => {
  dispatch(createElementStarted(types.CREATE));

  return createElement('contacts', transform(restContactData)).then(
    ({ id }) => {
      if (photo) {
        uploadPhoto(id, photo).then(() =>
          dispatch(createElementSucceeded(types.CREATE_SUCCEEDED, id)),
        );
      } else {
        dispatch(createElementSucceeded(types.CREATE_SUCCEEDED, id));
      }

      return { id };
    },
    (errors) => {
      dispatch(createElementFailed(types.CREATE_FAILED, errors));
      return { errors };
    },
  );
};

export default create;

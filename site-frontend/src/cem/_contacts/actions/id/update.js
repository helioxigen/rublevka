import {
  updateElement,
  updateElementStarted,
  updateElementFailed,
  updateElementSucceeded,
} from 'core/fetcher/actions';

import * as types from 'cem/_contacts/constants/actions';

// TODO Move dependencies to another place
import { transform, uploadPhoto } from 'cem/_contacts/old_actions/helpers';

const update = ({ photo, ...data }) => (dispatch) => {
  dispatch(updateElementStarted(types.UPDATE, data.id));

  return updateElement('contacts', data.id, transform(data)).then(
    () => {
      uploadPhoto(data.id, photo).then(() => {
        // TODO Load contact data after photo uploading

        dispatch(updateElementSucceeded(types.UPDATE_SUCCEEDED, data.id));
      });

      return data;
    },
    (errors) => {
      dispatch(updateElementFailed(types.UPDATE_FAILED, data.id, errors));
      return { errors };
    },
  );
};

export default update;

import {
  LOAD_PROPERTIES_START,
  LOAD_PROPERTIES_DONE,
} from 'cem/_contacts/constants/actions';
import { API } from 'core/config/sources';

function loadProperties(contactId, propertyCategory, offset) {
  return dispatch => {
    dispatch({
      type: LOAD_PROPERTIES_START,
      propertyCategory,
    });

    const options = {
      filter: {
        linkedContactIds: contactId,
      },
      pagination: {
        offset,
      },
    };

    API.get(`/v1/properties/${propertyCategory}`, options).then(response => {
      const items = response.body.items;
      const pagination = response.body.pagination;

      dispatch({
        type: LOAD_PROPERTIES_DONE,
        propertyCategory,
        items,
        pagination,
      });
    });
  };
}

export default loadProperties;

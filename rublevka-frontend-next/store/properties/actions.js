import api from '@api';
import { router, filter as filterUtils } from '@utils';

export const LOAD_PROPERTIES_REQUEST = 'Properties.Load.Request';
export const LOAD_PROPERTIES_SUCCESS = 'Properties.Load.Success';
export const LOAD_PROPERTIES_ERROR = 'Properties.Load.Error';

export const fetchProperties = (pagination, filterQuery, userFilter) => ({
    types: [LOAD_PROPERTIES_REQUEST, LOAD_PROPERTIES_SUCCESS, LOAD_PROPERTIES_ERROR],
    shouldCall: state => !state.properties[pagination.offset],
    call: () => api.properties.getMany(pagination, filterQuery),
    payload: {
        pagination,
        filter: userFilter,
    },
});

export const CHANGE_SORT = 'Properties.Sort.Change';

export const changeSort = type => ({
    type: CHANGE_SORT,
    payload: {
        type,
    },
});

export const UPDATE_FILTER_FIELD = 'Properties.Filter.UpdateField';
export const updateFilterField = (fieldName, value) => (dispatch, getState) => {
    dispatch({
        type: UPDATE_FILTER_FIELD,
        payload: {
            fieldName,
            value,
        },
    });

    const { filter = {} } = getState().properties;

    router.pushFilter(filter);
};

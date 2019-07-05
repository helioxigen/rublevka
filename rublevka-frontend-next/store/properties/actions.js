import api from '@api';
import { router } from '@utils';

export const LOAD_PROPERTIES_REQUEST = 'Properties.Load.Request';
export const LOAD_PROPERTIES_SUCCESS = 'Properties.Load.Success';
export const LOAD_PROPERTIES_ERROR = 'Properties.Load.Error';

export const fetchProperties = (pagination, filterQuery, userFilter, userOrder) => ({
    types: [LOAD_PROPERTIES_REQUEST, LOAD_PROPERTIES_SUCCESS, LOAD_PROPERTIES_ERROR],
    shouldCall: state => !state.properties[pagination.offset],
    call: () => api.properties.getMany(pagination, filterQuery),
    payload: {
        pagination,
        filter: userFilter,
        orderBy: userOrder,
    },
});

export const LOAD_PROPERTY_REQUEST = 'Properties.LoadItem.Request';
export const LOAD_PROPERTY_SUCCESS = 'Properties.LoadItem.Success';
export const LOAD_PROPERTY_ERROR = 'Properties.LoadItem.Error';

export const fetchProperty = id => ({
    types: [LOAD_PROPERTY_REQUEST, LOAD_PROPERTY_SUCCESS, LOAD_PROPERTY_ERROR],
    shouldCall: state => !state.properties.items[id],
    call: () => api.properties.getOne(id),
    payload: {
        id,
    },
});

export const CHANGE_ORDER = 'Properties.OrderBy.Change';
export const changeOrderBy = type => dispatch => {
    dispatch({
        type: CHANGE_ORDER,
        payload: {
            type,
        },
    });

    router.pushQuery({ orderBy: type });
};

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

import api from '@api';

export const LOAD_PROPERTIES_REQUEST = 'Properties.Load.Request';
export const LOAD_PROPERTIES_SUCCESS = 'Properties.Load.Success';
export const LOAD_PROPERTIES_ERROR = 'Properties.Load.Error';

export const fetchProperties = (pagination, filter) => ({
    types: [LOAD_PROPERTIES_REQUEST, LOAD_PROPERTIES_SUCCESS, LOAD_PROPERTIES_ERROR],
    shouldCall: state => !state.properties[pagination.offset],
    call: () => api.properties.getMany(pagination, filter),
    payload: {
        pagination,
        filter,
    },
});

export const CHANGE_SORT = 'Properties.Sort.Change';

export const changeSort = type => ({
    type: CHANGE_SORT,
    payload: {
        type,
    },
});

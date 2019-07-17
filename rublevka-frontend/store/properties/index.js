import keyBy from 'lodash/keyBy';
import { createReducer } from '../../utils/store';
import {
    LOAD_PROPERTIES_REQUEST,
    LOAD_PROPERTIES_SUCCESS,
    LOAD_PROPERTIES_ERROR,
    CHANGE_ORDER,
    UPDATE_FILTER_FIELD,
    LOAD_PROPERTY_SUCCESS,
    SET_DEAL_TYPE,
    SET_FILTER,
} from './actions';

export const propertiesInitialState = {
    dealType: '',
    fetching: false,
    items: {},
    list: [],
    orderBy: '',
    pagination: {
        total: 0,
        offset: 0,
        limit: 24,
    },
    cache: {},
    filter: {},
    error: {
        hasError: false,
        message: '',
    },
};

export const propertiesReducer = createReducer({
    [SET_DEAL_TYPE]: ({ dealType }) => ({
        dealType,
    }),
    [LOAD_PROPERTIES_REQUEST]: () => ({
        fetching: true,
    }),
    [LOAD_PROPERTIES_SUCCESS]: (
        {
            response: {
                items,
                pagination: { total, offset },
            },
            filter,
            orderBy,
        },
        state
    ) => ({
        fetching: false,
        items: {
            ...state.items,
            ...keyBy(items, i => i.id),
        },
        list: items,
        filter,
        orderBy,
        pagination: {
            ...state.pagination,
            total,
            offset,
        },
    }),
    [LOAD_PROPERTIES_ERROR]: err => ({
        fetching: false,
        error: {
            hasError: true,
            message: err,
        },
    }),
    [LOAD_PROPERTY_SUCCESS]: ({ response, id }, state) => ({
        items: {
            ...state.items,
            [id]: response,
        },
    }),
    [CHANGE_ORDER]: ({ payload: { type } }) => ({
        orderBy: type,
    }),
    [SET_FILTER]: ({ payload: { filter } }) => ({
        filter,
    }),
    [UPDATE_FILTER_FIELD]: ({ payload: { fieldName, value } }, state) => ({
        filter: {
            ...state.filter,
            [fieldName]: value,
        },
    }),
})(propertiesInitialState);

import keyBy from 'lodash/keyBy';
import { createReducer } from '../../utils/store';
import {
    LOAD_PROPERTIES_REQUEST,
    LOAD_PROPERTIES_SUCCESS,
    LOAD_PROPERTIES_ERROR,
    CHANGE_SORT,
    UPDATE_FILTER_FIELD,
    LOAD_PROPERTY_SUCCESS,
} from './actions';

export const propertiesInitialState = {
    fetching: false,
    items: {},
    lists: {},
    sort: '',
    pagination: {
        total: 0,
        offset: 0,
        limit: 24,
    },
    filter: {},
    error: {
        hasError: false,
        message: '',
    },
};

export const propertiesReducer = createReducer({
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
        },
        state
    ) => ({
        fetching: false,
        items: {
            ...state.items,
            ...keyBy(items, i => i.id),
        },
        lists: {
            ...state.lists,
            [offset]: items,
        },
        filter,
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
    [CHANGE_SORT]: ({ payload: { type } }) => ({
        sort: type,
    }),
    [UPDATE_FILTER_FIELD]: ({ payload: { fieldName, value } }, state) => ({
        filter: {
            ...state.filter,
            [fieldName]: value,
        },
    }),
})(propertiesInitialState);

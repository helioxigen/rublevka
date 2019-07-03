import keyBy from 'lodash/keyBy';
import { createReducer } from '../../utils/store';
import { LOAD_PROPERTIES_REQUEST, LOAD_PROPERTIES_SUCCESS, LOAD_PROPERTIES_ERROR, CHANGE_SORT } from './actions';

export const propertiesInitialState = {
    fetching: false,
    items: {},
    lists: {},
    sort: 'price',
    pagination: {
        offset: 0,
        limit: 24,
    },
    error: {
        hasError: false,
        message: '',
    },
};

export const propertiesReducer = createReducer({
    [LOAD_PROPERTIES_REQUEST]: () => ({
        fetching: true,
    }),
    [LOAD_PROPERTIES_SUCCESS]: ({ response: { items }, pagination: { offset = 0 } }, state) => ({
        fetching: false,
        items: {
            ...state.items,
            ...keyBy(items, i => i.id),
        },
        lists: {
            ...state.lists,
            [offset]: items,
        },
        pagination: {
            ...state.pagination,
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
    [CHANGE_SORT]: ({ payload: { type } }) => ({
        sort: type,
    }),
})(propertiesInitialState);

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
    LOAD_SETTLEMENT_PROPERTIES_SUCCESS,
} from './actions';

export const propertiesInitialState = {
    dealType: '',
    fetching: false,
    items: {},
    list: {
        sale: [],
        rent: [],
    },
    settlementLists: {
        sale: [],
        rent: [],
    },
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
            query,
            asMore,
            dealType,
        },
        state
    ) => ({
        fetching: false,
        items: {
            ...state.items,
            ...keyBy(items, i => i.id),
        },
        list: {
            ...state.list,
            [dealType]: asMore ? [...state.list[dealType], ...items] : items,
        },
        query,
        filter,
        orderBy,
        pagination: {
            ...state.pagination,
            total,
            offset,
            isLoadedMore: asMore,
        },
    }),
    [LOAD_SETTLEMENT_PROPERTIES_SUCCESS]: (
        {
            response: {
                items,
                pagination: { total, offset },
            },
            filter,
            orderBy,
            query,
            asMore,
            dealType,
        },
        state
    ) => ({
        fetching: false,

        items: {
            ...state.items,
            ...keyBy(items, i => i.id),
        },
        settlementLists: {
            ...state.settlementLists,
            [dealType]: items,
        },
        query,
        filter,
        orderBy,
        pagination: {
            ...state.pagination,
            total,
            offset,
            isLoadedMore: asMore,
        },
    }),
    [LOAD_PROPERTIES_ERROR]: ({ error }) => ({
        fetching: false,
        error: {
            hasError: true,
            message: error,
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

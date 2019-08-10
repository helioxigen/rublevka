import keyBy from 'lodash/keyBy';
import { createReducer } from '../../utils/store';
import { settlementsFetchTypes, settlementsItemFetchTypes, SET_SETTLEMENT_ITEM_DEAL_TYPES } from './actions';

const initialState = {
    fetching: false,
    items: {},
    list: [],
    currentProperties: [],
    currentItem: {
        id: 0,
        dealTypes: [],
    },
    error: {
        hasError: false,
        message: '',
    },
};

const reducer = createReducer({
    [settlementsFetchTypes.request]: () => ({
        fetching: true,
    }),
    [settlementsFetchTypes.success]: ({ response: { items } }, state) => ({
        fetching: false,
        items: {
            ...state.items,
            ...keyBy(items, i => i.id),
        },
        list: items,
    }),
    [settlementsItemFetchTypes.request]: () => ({
        fetching: true,
    }),
    [settlementsItemFetchTypes.success]: ({ response, id }, state) => ({
        items: {
            ...state.items,
            [id]: response,
        },
    }),
    [SET_SETTLEMENT_ITEM_DEAL_TYPES]: ({ payload: { id, dealTypes } }) => ({
        currentItem: {
            id,
            dealTypes,
        },
    }),
    // [LOAD_settlements_ERROR]: err => ({
    //     fetching: false,
    //     error: {
    //         hasError: true,
    //         message: err,
    //     },
    // }),
    // [LOAD_PROPERTY_SUCCESS]: ({ response, id }, state) => ({
    //     items: {
    //         ...state.items,
    //         [id]: response,
    //     },
    // }),
    // [CHANGE_ORDER]: ({ payload: { type } }) => ({
    //     orderBy: type,
    // }),
    // [SET_FILTER]: ({ payload: { filter } }) => ({
    //     filter,
    // }),
    // [UPDATE_FILTER_FIELD]: ({ payload: { fieldName, value } }, state) => ({
    //     filter: {
    //         ...state.filter,
    //         [fieldName]: value,
    //     },
    // }),
})(initialState);

export default {
    initialState,
    reducer,
};

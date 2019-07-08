import { createReducer } from '../../utils/store';
import { LOAD_MAP_PROPERTIES_REQUEST, LOAD_MAP_PROPERTIES_ERROR, LOAD_MAP_PROPERTIES_SUCCESS } from './actions';

export const mapInitialState = {
    fetching: false,
    list: [],
    cache: {},
    error: {
        hasError: false,
        message: '',
    },
};

export const mapReducer = createReducer({
    [LOAD_MAP_PROPERTIES_REQUEST]: () => ({
        fetching: true,
    }),
    [LOAD_MAP_PROPERTIES_SUCCESS]: ({ response, response: { items, total }, cacheKey }, state) => ({
        fetching: false,
        list: items,
        total,
        cache: {
            ...state.cache,
            [cacheKey]: response,
        },
    }),
    [LOAD_MAP_PROPERTIES_ERROR]: err => ({
        fetching: false,
        error: {
            hasError: true,
            message: err,
        },
    }),
})(mapInitialState);

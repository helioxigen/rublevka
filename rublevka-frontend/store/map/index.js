import { createReducer } from '../../utils/store';
import {
    LOAD_MAP_PROPERTIES_REQUEST,
    LOAD_MAP_PROPERTIES_ERROR,
    LOAD_MAP_PROPERTIES_SUCCESS,
    SET_DISPLAYED_ITEMS_IDS,
} from './actions';

export const mapInitialState = {
    fetching: false,
    chunks: {
        current: 0,
        parts: 0,
    },
    total: 0,
    list: [],
    cache: {},
    displayedIds: [],
    clusterId: null,
    error: {
        hasError: false,
        message: '',
    },
};

export const mapReducer = createReducer({
    [LOAD_MAP_PROPERTIES_REQUEST]: () => ({
        fetching: true,
    }),
    [LOAD_MAP_PROPERTIES_SUCCESS]: (
        {
            response: {
                items,
                pagination: { total },
            },
            parts,
            current,
        },
        state
    ) => ({
        fetching: parts !== current,
        list: state.chunks.parts !== parts || total <= 256 ? items : [...state.list, ...items],
        total,
        chunks: {
            parts,
            current,
        },
        // cache: {
        //     ...state.cache,
        //     [cacheKey]: [...(state.cache[cacheKey] || []), ...items],
        // },
    }),
    [LOAD_MAP_PROPERTIES_ERROR]: err => ({
        fetching: false,
        error: {
            hasError: true,
            message: err,
        },
    }),
    [SET_DISPLAYED_ITEMS_IDS]: ({ payload: { ids, clusterId } }) => ({
        displayedIds: ids,
        clusterId,
    }),
})(mapInitialState);

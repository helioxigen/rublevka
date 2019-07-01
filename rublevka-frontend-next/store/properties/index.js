import { createReducer } from '../../utils/store';
import { LOAD_PROPERTIES_REQUEST, LOAD_PROPERTIES_SUCCESS, LOAD_PROPERTIES_ERROR } from './actions';

export const propertiesInitialState = {
    fetching: false,
    items: [],
    error: {
        hasError: false,
        message: '',
    },
};

export const propertiesReducer = createReducer({
    [LOAD_PROPERTIES_REQUEST]: () => ({
        fetching: true,
    }),
    [LOAD_PROPERTIES_SUCCESS]: ({ response: { items } }) => ({
        fetching: false,
        items,
    }),
    [LOAD_PROPERTIES_ERROR]: err => ({
        fetching: false,
        error: {
            hasError: true,
            message: err,
        },
    }),
})(propertiesInitialState);

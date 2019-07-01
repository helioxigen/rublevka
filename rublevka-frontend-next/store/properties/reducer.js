import { createReducer } from '../../utils/store';
import { LOAD_PROPERTIES_SUCCESS, LOAD_PROPERTIES_ERROR, LOAD_PROPERTIES_REQUEST } from './index';

export const initialState = {
    fetching: false,
    items: [],
    error: {
        hasError: false,
        message: '',
    },
};

export default createReducer({
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
})(initialState);

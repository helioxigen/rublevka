import types from './types';

function fetchingRequest(key) {
    return {
        type: types.FETCHING_REQUEST,
        payload: {
            key,
        },
    };
}

function fetchingSuccess(key) {
    return {
        type: types.FETCHING_SUCCESS,
        payload: {
            key,
        },
    };
}

function fetchingError(key, error) {
    return {
        type: types.FETCHING_ERROR,
        payload: {
            key,
            error,
        },
    };
}

export default {
    fetchingRequest,
    fetchingSuccess,
    fetchingError,
};

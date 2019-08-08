import actions from './actions';

function runFetch(key, apiCall, action) {
    return dispatch => {
        dispatch(actions.fetchingRequest(key));

        return apiCall().then(
            response => {
                dispatch(action(response));
                dispatch(actions.fetchingSuccess(key));
            },
            error => dispatch(actions.fetchingError(key, error))
        );
    };
}

export default {
    runFetch,
};

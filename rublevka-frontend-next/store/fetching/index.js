import { createAction, createReducer } from '../../utils/store';

const FETCHING = 'Fetch.Started';
const FETCHED = 'Fetch.Finished';
const FETCH_FAILED = 'Fetch.Failed';

const fetchStarted = createAction(FETCHING);
const fetchFinished = createAction(FETCHED);
const fetchFailed = createAction(FETCH_FAILED);

export function fetching(title) {
    return (request = () => new Promise()) => dispatch => {
        dispatch(fetchStarted({ title }));
        request(dispatch)
            .then(() => dispatch(fetchFinished({ title })))
            .catch(error => dispatch(fetchFailed({ title, error })));
    };
}

export const initialFetchingState = {
    fetching: {},
};

export default createReducer({
    [FETCHING]: (_, payload) => ({
        fetching: {
            [payload.title]: true,
        },
    }),
})(initialFetchingState);

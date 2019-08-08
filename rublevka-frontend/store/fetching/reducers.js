import { duck } from '@utils';
import actions from './actions';

const initialState = {
    fetching: [],
    errors: {},
};

export default duck.create({
    [actions.fetchingRequest]: ({ key }, state) => ({
        fetching: [...state.fetching, key],
    }),
    [actions.fetchingSuccess]: ({ key }, state) => ({
        fetching: state.fetching.filter(k => k !== key),
    }),
    [actions.fetchingError]: ({ key, error }, state) => ({
        fetching: state.fetching.filter(k => k !== key),
        errors: {
            ...state.errors,
            [key]: error,
        },
    }),
})(initialState);

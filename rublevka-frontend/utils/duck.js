import mapValues from 'lodash/mapValues';
import { combineReducers } from 'redux';

const createDuck = reducersMap => (initialState = {}) => ({
    initialState,
    reducer: (state = initialState, action) => {
        const createState = reducersMap[action.type] || (() => state);

        const nextState = Object.assign({}, state, createState(action, state));

        return nextState;
    },
});

const combineDucks = ducksMap => {
    const initialState = mapValues(ducksMap, duck => duck.initialState);
    const reducers = mapValues(ducksMap, duck => duck.reducer);

    return {
        initialState,
        reducer: combineReducers(reducers),
    };
};

export default {
    create: createDuck,
    combine: combineDucks,
};

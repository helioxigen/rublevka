export const createReducer = reducersMap => initialState => (state = initialState, action) => {
    const createState = reducersMap[action.type] || (() => state);

    const nextState = Object.assign({}, state, createState(action, state));

    return nextState;
};

export const createAction = type => payload => ({
    type,
    payload,
});

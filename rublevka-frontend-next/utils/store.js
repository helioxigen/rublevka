export const createReducer = reducersMap => initialState => (state = initialState, action) => {
    const createState = reducersMap[action.type] || (() => state);

    const nextState = Object.assign({}, state, createState(action, state));

    return nextState;
};

export const createAction = type => payload => ({
    type,
    payload,
});

export const createApiCallTypes = (reducerName, resultName, noCache = true) => {
    const types = {
        request: `${reducerName}.${resultName}.LoadRequest`,
        success: `${reducerName}.${resultName}.LoadSuccess`,
        error: `${reducerName}.${resultName}.LoadError`,
        ...(noCache ? {} : { error: `${reducerName}.${resultName}.LoadCacheRestore` }),
    };

    return {
        ...types,
        value: [types.request, types.success, types.error],
    };
};

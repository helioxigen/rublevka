import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';
import propertiesReducer, { initialState as propertiesState } from './properties/reducer';
import fetchingReducer, { initialFetchingState } from './fetching';
import { apiCallMiddleware } from './middlewares';

const initialState = {
    fetching: initialFetchingState,
    properties: propertiesState,
};

const reducer = combineReducers({
    properties: propertiesReducer,
    fetching: fetchingReducer,
});

export const makeStore = (initState = initialState, options) => {
    return createStore(reducer, initState, composeWithDevTools(applyMiddleware(reduxThunk, apiCallMiddleware)));
};

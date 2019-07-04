import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';
import { propertiesInitialState, propertiesReducer } from './properties';
import { apiCallMiddleware } from './middlewares';
import { userReducer, userInitialState } from './user';

export { updateFilterField } from './properties/actions';

const initialState = {
    user: userInitialState,
    properties: propertiesInitialState,
};

const reducer = combineReducers({
    user: userReducer,
    properties: propertiesReducer,
});

export const makeStore = (initState = initialState) => {
    return createStore(reducer, initState, composeWithDevTools(applyMiddleware(reduxThunk, apiCallMiddleware)));
};

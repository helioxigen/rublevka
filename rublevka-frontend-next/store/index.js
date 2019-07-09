import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';
import { propertiesInitialState, propertiesReducer } from './properties';
import { apiCallMiddleware } from './middlewares';
import { userReducer, userInitialState } from './user';
import { mapInitialState, mapReducer } from './map';

export { fetchFavorite, setFavorite } from './user/actions';
export { fetchMapPropertiesSubset, setDisplayedItemsIds } from './map/actions';
export {
    updateFilterField,
    fetchProperties,
    fetchProperty,
    changeOrderBy,
    setDealType,
    setFilter,
} from './properties/actions';

const initialState = {
    user: userInitialState,
    properties: propertiesInitialState,
    map: mapInitialState,
};

const reducer = combineReducers({
    user: userReducer,
    properties: propertiesReducer,
    map: mapReducer,
});

export const makeStore = (initState = initialState) => {
    return createStore(reducer, initState, composeWithDevTools(applyMiddleware(reduxThunk, apiCallMiddleware)));
};

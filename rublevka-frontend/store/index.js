import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';
// import catalogDuck from './catalog';
// import fetchingDuck from './fetching';
import { propertiesInitialState, propertiesReducer } from './properties';
import { apiCallMiddleware } from './middlewares';
import { userReducer, userInitialState } from './user';
import { mapInitialState, mapReducer } from './map';
import settlements from './settlements';
// import { duck } from '@utils';

export { fetchFavorite, setFavorite, setCurrency, initUser } from './user/actions';
export { fetchMapPropertiesSubset, setDisplayedItemsIds } from './map/actions';
export { fetchSettlements, fetchSettlementsItem, setSettlementItemDealTypes } from './settlements/actions';
export {
    updateFilterField,
    fetchProperties,
    fetchProperty,
    changeOrderBy,
    setDealType,
    setFilter,
    fetchSettlementProperties,
} from './properties/actions';

// const { initialState, reducer } = duck.combine({
//     catalog: catalogDuck,
//     fetching: fetchingDuck,
// });

export const initialState = {
    user: userInitialState,
    properties: propertiesInitialState,
    map: mapInitialState,
    settlements: settlements.initialState,
};

const reducer = combineReducers({
    user: userReducer,
    properties: propertiesReducer,
    map: mapReducer,
    settlements: settlements.reducer,
});

export const makeStore = (initState = initialState) => {
    return createStore(reducer, initState, composeWithDevTools(applyMiddleware(reduxThunk, apiCallMiddleware)));
};

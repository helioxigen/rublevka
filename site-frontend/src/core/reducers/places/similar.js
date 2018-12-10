import { handleActions } from 'redux-actions';
// import {
//   LOAD_SIMILAR_PLACES, LOAD_SIMILAR_PLACES_SUCCEEDED, LOAD_SIMILAR_PLACES_FAILED,
// } from '../../constants/places';

const initialState = {};

const similarPlaces = handleActions({
  // [LOAD_SIMILAR_PLACES]: (state, action) => {
  //   const { id } = action;
  //
  //   return {
  //     ...state,
  //     [id]: {
  //       isFetching: true,
  //     },
  //   };
  // },
  //
  // [LOAD_SIMILAR_PLACES_SUCCEEDED]: (state, action) => {
  //   const { id, data } = action;
  //
  //   return {
  //     ...state,
  //     [id]: {
  //       isFetching: false,
  //       data,
  //     },
  //   };
  // },
  //
  // [LOAD_SIMILAR_PLACES_FAILED]: (state, action) => {
  //   const { id, error } = action;
  //
  //   return {
  //     ...state,
  //     [id]: {
  //       isFetching: false,
  //       error,
  //     },
  //   };
  // },
}, initialState);

export default similarPlaces;

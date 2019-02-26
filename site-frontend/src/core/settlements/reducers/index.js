import { handleActions } from 'redux-actions';
import sortBy from 'lodash/sortBy';
// import groupBy from 'lodash/groupBy';

import * as types from 'core/settlements/constants/actions';
import {
  listLoadStart,
  listLoadFail,
  listLoadSuccess,
  elementCreateStart,
  elementCreateFail,
  elementCreateSuccess,
  elementLoadStart,
  elementLoadFail,
  elementLoadSuccess,
  elementUpdateStart,
  elementUpdateFail,
  elementUpdateSuccess,
} from 'core/fetcher2/reducers';

const initialState = {};

export default handleActions(
  {
    // list
    [types.LOAD_LIST]: (state, { group }) => listLoadStart(state, group),

    [types.LOAD_LIST_FAILED]: (state, { group, errors }) => listLoadFail(state, group, errors),

    [types.LOAD_LIST_SUCCEEDED]: (state, { group, items }) => listLoadSuccess(state, group, items),

    [types.LOAD_LIST_BY_LETTER_SUCCEEDED]: (state, { group, items }) => {
      const fetcherResult = listLoadSuccess(state, group, items);

      // FIXME simplify and move to helpers
      // console.log(groupBy(items, 'name[0]'));
      const firstSort = items.reduce((acc, item) => {
        const letter = item.name[0].toUpperCase();
        return { ...acc, [letter]: [...(acc[letter] || []), item.id] };
      }, {});

      const secondSort = Object.keys(firstSort)
        .sort()
        .reduce((acc, item) => ({ ...acc, [item]: firstSort[item] }), {});

      const thirdSort = Object.keys(secondSort).reduce(
        (acc, item) => ({ ...acc, [item]: sortBy(secondSort[item], 'name') }),
        {},
      );

      const result = {
        ...fetcherResult,
        [group]: { ...fetcherResult[group], idsByLetter: thirdSort },
      };

      return result;
    },

    // create
    [types.CREATE]: state => elementCreateStart(state),

    [types.CREATE_FAILED]: state => elementCreateFail(state),

    [types.CREATE_SUCCEEDED]: state => elementCreateSuccess(state),

    // read
    [types.LOAD]: (state, { id }) => elementLoadStart(state, id),

    [types.LOAD_FAILED]: (state, { id, errors }) => elementLoadFail(state, id, errors),

    [types.LOAD_SUCCEEDED]: (state, { id, data }) => elementLoadSuccess(state, id, data),

    // update
    [types.UPDATE]: state => elementUpdateStart(state),

    [types.UPDATE_FAILED]: state => elementUpdateFail(state),

    [types.UPDATE_SUCCEEDED]: state => elementUpdateSuccess(state),
  },
  initialState,
);

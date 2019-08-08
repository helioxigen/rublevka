import isEmpty from 'lodash/isEmpty';

import * as actions from './actions';
import { dict, page, tools } from '@utils';

function updateFilterField(fieldName, value) {
    return (dispatch, getState) => {
        dispatch(actions.updateFilterField(fieldName, value));

        const { filter: currentFilter } = getState().catalog;

        const filter = tools.cleanObject(currentFilter);

        const isKindOnly = Object.keys(filter).length === 1 && filter.kind && filter.kind.length === 1;

        if (isKindOnly) {
            const kind = dict.translit.byWord(filter.kind[0]);

            return page.pushQuery({ filter: null }, { kind }, kind);
        }

        return page.pushQuery({ filter: !isEmpty(filter) && JSON.stringify(filter) });
    };
}

function setOrder(orderType) {
    return dispatch => {
        dispatch(actions.setOrder(orderType));

        page.pushQuery({ orderBy: orderType });
    };
}

function updatePagination(total, offset, limit = 24) {
    return dispatch => {
        dispatch(actions.updatePagination(total, offset, limit));
    };
}

export default { setCatalogFilter: actions.setFilter, updateFilterField, setOrder, updatePagination };

import { API } from 'core/config/sources';

// import { loadList, loadListStarted, loadListFailed, loadListSucceeded } from 'core/fetcher2/actions';

import * as types from 'cem/_reports/constants/actions';
import {
  getDefaultsByGroup,
  apiPathByGroup,
} from 'cem/_reports/constants/defaults';

import recursiveCleanUp from 'core/helpers/recursiveCleanUp';
import { mergeParams } from 'core/fetcher2/helpers';
import { mapParams } from 'cem/_reports/helpers';
import transformInputValues from 'cem/_reports/helpers/transformInputFunnelValues';

export default (queryParams, group, options = {}) => dispatch => {
  const defaultQueryParams = getDefaultsByGroup(group, options);
  const params = recursiveCleanUp(
    mapParams(mergeParams(defaultQueryParams, queryParams)),
  );

  // dispatch(loadListStarted(types.LOAD_FUNNEL, group, options.append, params));

  API.get(apiPathByGroup[group], params).then(({ body }) => {
    const { items } = body;

    dispatch({
      type: types.LOAD_FUNNEL_SUCCEEDED,
      group,
      items: items.map(transformInputValues),
    });
  });
};

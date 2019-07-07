import Router from 'next/router';
import pickBy from 'lodash/pickBy';
import isEmpty from 'lodash/isEmpty';
// import { filter as filterUtils } from '@utils';

const pushFilter = filter => {
    const { page, dealType } = Router.query;

    const cleanFilter = pickBy(filter, v => !isEmpty(v));

    const query = pickBy(
        {
            page,
            filter: !isEmpty(cleanFilter) ? JSON.stringify(cleanFilter) : {},
        },
        v => !isEmpty(v)
    );

    Router.push(
        {
            pathname: '/catalog',
            query,
        },
        {
            pathname: `/zagorodnaya/${dealType}`,
            query,
        },
        { shallow: true }
    );
};

const pushQuery = queryObj => {
    const { dealType, ...pageQuery } = Router.query;

    const query = pickBy(
        {
            ...pageQuery,
            ...queryObj,
        },
        v => !isEmpty(v)
    );

    Router.push(
        {
            pathname: '/catalog',
            query: {
                ...query,
                dealType,
            },
        },
        {
            pathname: `/zagorodnaya/${dealType}`,
            query,
        },
        { shallow: true }
    );
};

export default {
    pushFilter,
    pushQuery,
};

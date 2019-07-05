// import compact from 'lodash/compact';

const transformToQuery = obj =>
    Object.entries(obj)
        .map(([key, value]) =>
            Object.entries(value).map(([valueKey, valueValue]) => `${key}[${valueKey}]=${valueValue}`)
        )
        .reduce((acc, v) => acc.concat(v))
        .join('&');

// const cleanRouterQuery = (...objs) => compact(objs).reduce((acc, ));

export default {
    get: transformToQuery,
};

const transformToQuery = obj =>
    Object.entries(obj)
        .map(([key, value]) =>
            Object.entries(value).map(([valueKey, valueValue]) => `${key}[${valueKey}]=${valueValue}`)
        )
        .reduce((acc, v) => acc.concat(v))
        .join('&');

export default {
    get: transformToQuery,
};

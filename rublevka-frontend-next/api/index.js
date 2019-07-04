import { instance } from './instance';

const limit = 24;

export default {
    properties: {
        getMany: (page, filter) =>
            instance('properties/country', { pagination: { limit, offset: page * limit - limit }, ...filter }),
        getOne: id => instance(`properties/country/${id}`),
    },
};

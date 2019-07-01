import { instance } from './instance';

export default {
    properties: {
        getMany: (pagination, filter) => instance('properties/country', { pagination, filter }),
        getOne: id => instance(`properties/country/${id}`),
    },
};

const fieldTypes = {
    checkboxes: v => v.split(','),
    price: (v, fields) => {
        const [from, to] = v.split('..');

        return {
            from,
            to,
            currency: fields.currency,
        };
    },
    range: v => {
        const [from, to] = v.split('..');

        return {
            from,
            to,
        };
    },
    radio: v => v,
};

const transform = {
    kind: fieldTypes.checkboxes,
    price: fieldTypes.price,
    area: fieldTypes.range,
    landArea: fieldTypes.range,
    distance: fieldTypes.range,
    renovate: fieldTypes.checkboxes,
    bedrooms: fieldTypes.range,
};

export const fromQuery = (fieldName, value) => {
    if (fieldName in transform) {
        return transform[fieldName](value);
    }
};

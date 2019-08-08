export const fieldTypes = {
    name: {
        placeholder: 'Имя',
        required: true,
    },
    phone: {
        placeholder: 'Телефон',
        type: 'tel',
        required: true,
    },
    email: {
        placeholder: 'Email',
        type: 'email',
        required: true,
    },
    comment: {
        placeholder: 'Комментарий',
        type: 'textarea',
    },
};

/**
 * @typedef {keyof typeof fieldTypes} Fields
 * @param {Array<Fields | [Fields, boolean]>} fieldsList
 */
export const getFields = (...fieldsList) =>
    fieldsList.reduce((formFields, field) => {
        const [fieldName, isRequired] = typeof field === 'string' ? [field] : field;

        const params = fieldTypes[fieldName];

        if (typeof isRequired !== 'undefined') {
            params.required = isRequired;
        }

        return Object.assign(formFields, { [fieldName]: params });
    }, {});

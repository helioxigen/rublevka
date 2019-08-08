import pickBy from 'lodash/pickBy';
import isEmpty from 'lodash/isEmpty';

const cleanObject = obj => pickBy(obj, v => !isEmpty(v));

export default {
    cleanObject,
};

import compact from 'lodash/compact';

const use = (value, orElse, getterFn) => (value ? getterFn(value) : orElse);

export default {
    use,
    str: (...bites) => compact(bites),
};

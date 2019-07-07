const use = (value, getterFn, orElse) => (value ? getterFn(value) : orElse);

export default {
    use,
};

const use = (value, orElse, getterFn) => (value ? getterFn(value) : orElse);

export default {
    use,
};

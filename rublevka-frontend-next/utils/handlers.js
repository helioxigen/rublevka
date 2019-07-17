const preventNative = handlerFn => e => {
    e.preventDefault();
    e.stopPropagation();

    handlerFn(e);
};

export default {
    preventNative,
};

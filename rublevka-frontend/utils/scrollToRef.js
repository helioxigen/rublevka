const calculateOffsetTop = (value, elem) => {
    if (elem.offsetParent) {
        return calculateOffsetTop(value + elem.offsetTop, elem.offsetParent);
    }
    return value;
};

export default ref => {
    // this function should work only on mobiles
    if (window.innerWidth >= 992) {
        return;
    }
    window.scrollTo(0, calculateOffsetTop(0, ref.current) - 100);
};

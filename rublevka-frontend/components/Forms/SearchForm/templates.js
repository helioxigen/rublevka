export const getRangeName = ({ from, to }, template) => {
    if (!from && !to) {
        return '';
    }

    if ((from && to) || (from === 0 && !!to)) {
        return template(`${from} - ${to}`);
    }

    if (from || from === 0) {
        return template(`От ${from}`);
    }

    if (to) {
        return template(`До ${to}`);
    }

    return '';
};

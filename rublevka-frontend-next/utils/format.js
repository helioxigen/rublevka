function declOfNum(number, titles) {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]];
}

const prefixZero = num => (num < 10 ? `0${num}` : num);

export default {
    titleByNumber: (number, titles, onlyTitle) =>
        number && (onlyTitle ? declOfNum(number, titles) : `${number} ${declOfNum(number, titles)}`),
    prefixZero,
};

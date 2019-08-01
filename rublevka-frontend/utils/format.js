function declOfNum(number, titles) {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]];
}

const prefixZero = num => (num < 10 ? `0${num}` : num);

const price = (value = 0, currency) => {
    const formattedValue = value.toLocaleString('ru');

    switch (currency) {
        case 'RUB':
            return `${formattedValue} руб`;
        case 'USD':
            return `$${formattedValue}`;
        case 'EUR':
            return `€${formattedValue}`;
        default:
            return 0;
    }
};

export default {
    titleByNumber: (number, titles, onlyTitle) =>
        number &&
        (onlyTitle ? declOfNum(number, titles) : `${number.toLocaleString('ru')} ${declOfNum(number, titles)}`),
    prefixZero,
    capitalize: string => string.charAt(0).toUpperCase() + string.slice(1),
    replaceEnd: (string = '', search, replaceWith) => string.replace(new RegExp(`${search}$`), replaceWith),
    price,
};

import sbjs from 'sourcebuster';

const phones = {
  default: {
    country: '74954324545',
    city: '74954324545',
  },
  yandex: {
    country: '74959683505',
    city: '74959683505',
  },
  google: {
    country: '74959683505',
    city: '74959683505',
  },
};

const getPhones = () => {
  if (typeof document !== 'undefined') {
    sbjs.init();
    const { src } = sbjs.get.first;
    const currentPhones = phones[src && src.replace('(', '')];

    return currentPhones || phones.default;
  }
  return phones.default;
};

export default {
  theme: 'default',
  name: 'JQ Estate',
  domain: 'jqestate.ru',
  postfix: 'jqestate',
  phones: getPhones(),
  landing: {
    cityProperties: [11341, 11232, 11768, 18, 11514, 9],
  },
  routes: [
    { name: 'Рублёво-Успенское', id: 1178 },
    { name: 'Новорижское', id: 1186 },
    { name: 'Ильинское', id: 1192 },
    { name: 'Минское', id: 1179 },
    { name: 'Сколковское', id: 1181 },
    { name: 'Киевское', id: 1177 },
    { name: 'Калужское', id: 1183 },
  ],
  routesSelect: [
    { value: 1178, label: 'Рублёво-Успенское' },
    { value: 1186, label: 'Новорижское' },
    { value: 1192, label: 'Ильинское' },
    { value: 1179, label: 'Минское' },
    { value: 1181, label: 'Сколковское' },
    { value: 1177, label: 'Киевское' },
    { value: 1183, label: 'Калужское' },
  ],
  seo: {
    title:
      'Агентство элитной загородной недвижимости JQ Estate: продажа элитной недвижимости в Подмосковье.',
    description:
      'Элитная недвижимость Подмосковья: дома, таунхаусы и участки на Рублёво-Успенском, Новорижском, Киевском и Минском направлениях. Продажа и аренда.',
    keywords: '',
  },
  brand: 'jqestate-logo',
  banner: {
    logo: 'jqestate',
    logoClassName: 'jqestate',
    image: '//s3.eu-central-1.amazonaws.com/dt-marketing/assets/hero.jpg',
    title: 'Начните поиск элитной недвижимости',
  },
  retargetingKeys: {
    vk: {
      default:
        'H1Nu04qhQ3N/U/msuM9WiMY5bbio6W55DEXzLXWqyp5bABzghrx6ovIxZVImkIZNQl*SvQ8n*VfigNDbjPWV3h9nJjhYTulEqo6Mw1O/cM11iOwjQXrKOWQkpm5FRGthYEvnu*q1dbRfEJCrcayq7HF*Ij1K7AkLpvCtDseWAT4-',
      shared:
        'rj86tJbSUKdk9XN98qEKslT2KRfIzVGhO5s5GioPSF7ssMoJg4KYx4rjuDfbnwUMzUhWQS2hdzKwyjI5dCzpEiLJ7jCINpwGM/aON0vtB7dCsPd4LMZlkHTEfnemL2iThMZ*Ebu*X*su9kWqUYBuL2XAQdZyjv71iOUxaeMAj60-',
    },
  },
};

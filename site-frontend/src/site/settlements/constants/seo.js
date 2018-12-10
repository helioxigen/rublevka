import global from 'window-or-global';
import { getPrevNext, getTitlePostfix } from 'core/helpers/seo';
import { prepositionalRoutesById } from 'core/places/constants/dictionaries';
import { translitKinds } from 'site/constants/properties/dictionaries';

const { config: { domain }, config } = global;
const canonical = `https://${domain}/zagorodnaya/kottedzhnye-poselki`;

export const list = {
  h1: 'Посёлки',
  title: queryPage =>
    `Коттеджные посёлки в Московской области на ${domain}${getTitlePostfix(queryPage)}`,

  meta: () => [
    {
      name: 'description',
      content: `Коттеджные посёлки в ${domain}. Лучшие предложения на ${domain}!`,
    },
    {
      name: 'keywords',
      content: `коттеджные посёлки, ${domain}, цена, стоимость, КП, Московская область, Подмосковье`,
    },
  ],
  link: (queryPage, totalPages) => [
    {
      rel: 'canonical',
      href: canonical,
    },
    ...getPrevNext(canonical, queryPage, totalPages),
  ],
};

export const show = {
  title: ({ name, location: { routeId } = {} }, dealType) => {
    if (!name) {
      return '';
    }

    const route = prepositionalRoutesById[routeId];

    if (dealType === 'sale') {
      return `Коттеджный поселок ${name} на ${route} шоссе — купить дом или участок в КП ${name} | ${config.name}`;
    }

    if (dealType === 'rent') {
      return `Коттеджный поселок ${name} на ${route} шоссе — арендовать дом в КП ${name} | ${config.name}`;
    }
  },
  description: (name, dealType, kind) => {
    if (!name) {
      return '';
    }
    const dictionary = {
      sale: {
        title: 'Купить',
        titleWithCategory: 'Продажа',

        townhouse: 'таунхаусов',
        house: 'домов',
        flat: 'квартир',
        land: 'участков',
      },
      rent: {
        title: 'Взять в аренду',
        titleWithCategory: 'Снять',

        townhouse: 'таунхаус',
        house: 'дом',
        flat: 'квартиру',
        land: 'участок',
      },
    };

    if (!kind) {
      return `${dictionary[dealType]
        .title} недвижимость в коттеджном поселке ${name}. Лучшие предложения на ${global.config
        .domain}!`;
    }
    return `${dictionary[dealType].titleWithCategory} ${dictionary[dealType][
      kind
    ]} в коттеджном поселке ${name}. Лучшие предложения на ${domain}!`;
  },
  // `${name}, коттеджный поселок, коттедж, дом, квартира, таунхаус, участок, Москва, Московская область, Подмосковье, КП, цена, купить, продажа, аренда, снять, отзывы, недвижимость, карта, www.jqestate.ru`,
  keywords: (name, dealType, translitKind) => {
    const kind = translitKinds[translitKind];
    const dictionary = {
      dealType: {
        sale: ['купить', 'продажа'],
        rent: ['снять', 'аренда'],
      },
      kind: {
        townhouse: ['таунхаус', 'таунхауса'],
        house: ['дом', 'дома'],
        flat: ['квартиру', 'квартиры'],
        land: ['участок', 'участка'],
      },
    };

    if (!kind) {
      // районы, загородная недвижимость, список, перечень, Московская область, Подмосковье, {адрес сайта}
      return `${dictionary.dealType[dealType][0]} недвижимость, ${dictionary.dealType[
        dealType
      ][1]} недвижимости, коттеджный поселок, ${name}, ${global.config
        .domain}, цена, стоимость, отзывы, квартира, таунхаус, участок, дом`;
    }
    return `${dictionary.dealType[dealType][0]} ${dictionary.kind[kind][0]}, ${dictionary.dealType[
      dealType
    ][1]} ${dictionary.kind[kind][1]}, коттеджный поселок, ${name}, ${global.config
      .domain}, цена, стоимость, отзывы`;
  },
};

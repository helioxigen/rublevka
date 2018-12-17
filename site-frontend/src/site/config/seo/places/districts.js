import global from 'window-or-global';
// import { format } from '@dtrussia/utils.js';

export default {
  list: {
    h1: 'Район',
    title: `Найти недвижимость в Московской области по району – ${global.config.domain}`,
    description: `Список районов для поиска недвижимости в Помосковье на ${global.config.domain}`,
    keywords: `районы, загородная недвижимость, список, перечень, Московская область, Подмосковье, ${global
      .config.domain}`,
  },
  show: {
    h1: ({ name }, dealType, kind) => {
      if (!name) {
        return '';
      }
      const dictionary = {
        sale: {
          title: 'Продажа',
          kind: {
            townhouse: 'таунхаусов',
            house: 'домов',
            flat: 'квартир',
            land: 'участков',
            penthouse: 'пентхаусов',
          },
        },
        rent: {
          title: 'Аренда',
          kind: {
            townhouse: 'таунхауса',
            penthouse: 'пентхауса',
            house: 'дома',
            flat: 'квартиры',
            land: 'участка',
          },
        },
      };

      if (!kind) {
        return `${dictionary[dealType].title} недвижимости – ${name} район`;
      }
      return `${dictionary[dealType].title} ${dictionary[dealType].kind[kind]} – ${name} район`;
    },
    title: ({ name }, dealType, kind, queryPage) => {
      if (!name) {
        return '';
      }
      const dictionary = {
        sale: {
          title: 'Продажа',
          titleWithCategory: 'Купить',

          townhouse: 'таунхаус',
          penthouse: 'пентхаус',
          house: 'дом',
          flat: 'квартиру',
          land: 'участок',
        },
        rent: {
          title: 'Аренда',
          titleWithCategory: 'Аренда',

          townhouse: 'таунхаус',
          penthouse: 'пентхаус',
          house: 'дома',
          flat: 'квартиры',
          land: 'участка',
        },
      };

      if (!kind) {
        return `${dictionary[dealType]
          .title} загородной недвижимости – ${name}, Московская область | ${global.config
          .domain} ${queryPage ? `— страница ${queryPage}` : ''}`;
      }
      return `${dictionary[dealType].titleWithCategory} ${dictionary[dealType][
        kind
      ]} – ${name}, Московская область | ${global.config.domain} ${queryPage
        ? `— страница ${queryPage}`
        : ''}`;
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
          penthouse: 'пентхаусов',
          house: 'домов',
          flat: 'квартир',
          land: 'участков',
        },
        rent: {
          title: 'Взять в аренду',
          titleWithCategory: 'Снять',

          townhouse: 'таунхаус',
          penthouse: 'пентхаус',
          house: 'дом',
          flat: 'квартиру',
          land: 'участок',
        },
      };

      if (!kind) {
        return `${dictionary[dealType]
          .title} недвижимость - ${name}, Подмосковье. Лучшие предложения на ${global.config
          .domain}!`;
      }
      return `${dictionary[dealType].titleWithCategory} ${dictionary[dealType][
        kind
      ]} – ${name}, Подмосковье. Лучшие предложения на ${global.config.domain}!`;
    },
    // `${name}, коттеджный поселок, коттедж, дом, квартира, таунхаус, участок, Москва, Московская область, Подмосковье, КП, цена, купить, продажа, аренда, снять, отзывы, недвижимость, карта, www.jqestate.ru`,
    keywords: (name, dealType, kind) => {
      const dictionary = {
        dealType: {
          sale: ['купить', 'продажа'],
          rent: ['снять', 'аренда'],
        },
        kind: {
          townhouse: ['таунхаус', 'таунхауса'],
          penthouse: ['пентхаус', 'пентхауса'],
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
      return `${dictionary.dealType[dealType][0]} ${dictionary.kind[kind][0]}, ${dictionary
        .dealType[dealType][1]} ${dictionary.kind[kind][1]}, коттеджный поселок, ${name}, ${global
        .config.domain}, цена, стоимость, отзывы`;
    },
  },
};

import global from 'window-or-global';
// import { format } from '@dtrussia/utils.js';
import { prepositionalRoutesById } from 'core/places/constants/dictionaries';

const isJQ = global.config.domain === 'jq.estate';

function generateLink(routeSlugName, ruDealType, ruKind) {
  if (ruKind) {
    return `https://${
      global.config.domain
    }/zagorodnaya/shosse/${routeSlugName}/${ruDealType}/${ruKind}`;
  }
  return `https://${
    global.config.domain
  }/zagorodnaya/shosse/${routeSlugName}/${ruDealType}`;
}

export default {
  list: {
    h1: 'Шоссе',
    title: `Найти недвижимость в Московской области по шоссе – ${
      global.config.domain
    }`,
    description: `Список основных направлений для поиска недвижимости в Подмосковье на ${
      global.config.domain
    }`,
    keywords: `шоссе, автомагистрали, загородная недвижимость, список, перечень, Московская область, Подмосковье, ${
      global.config.domain
    }`,
  },
  show: {
    link: (routeSlugName, ruDealType, ruKind, queryPage, totalPages) => {
      if (queryPage === totalPages) {
        return [
          {
            rel: 'canonical',
            href: generateLink(routeSlugName, ruDealType, ruKind),
          },
          {
            rel: 'prev',
            href: `${generateLink(
              routeSlugName,
              ruDealType,
              ruKind,
            )}?page=${queryPage - 1}`,
          },
        ];
      } else if (queryPage === 2) {
        return [
          {
            rel: 'canonical',
            href: generateLink(routeSlugName, ruDealType, ruKind),
          },
          {
            rel: 'next',
            href: `${generateLink(
              routeSlugName,
              ruDealType,
              ruKind,
            )}?page=${queryPage + 1}`,
          },
          {
            rel: 'prev',
            href: generateLink(routeSlugName, ruDealType, ruKind),
          },
        ];
      } else if (queryPage > 2) {
        return [
          {
            rel: 'canonical',
            href: generateLink(routeSlugName, ruDealType, ruKind),
          },
          {
            rel: 'next',
            href: `${generateLink(
              routeSlugName,
              ruDealType,
              ruKind,
            )}?page=${queryPage + 1}`,
          },
          {
            rel: 'prev',
            href: `${generateLink(
              routeSlugName,
              ruDealType,
              ruKind,
            )}?page=${queryPage - 1}`,
          },
        ];
      }
      return [
        {
          rel: 'canonical',
          href: generateLink(routeSlugName, ruDealType, ruKind),
        },
        {
          rel: 'next',
          href: `${generateLink(routeSlugName, ruDealType, ruKind)}?page=2`,
        },
      ];
    },

    h1: ({ name, id }, dealType, kind) => {
      if (!name) {
        return '';
      }

      const route = prepositionalRoutesById[id];

      const dictionary = {
        sale: {
          townhouse: 'Таунхаусы',
          house: 'Дома',
          flat: 'Квартиры',
          land: 'Участки',
        },
        rent: {
          townhouse: 'таунхаусов',
          house: 'домов',
          flat: 'квартир',
          land: 'участков',
        },
      };

      if (dealType === 'sale') {
        return `${
          kind ? dictionary[dealType][kind] : 'Недвижимость'
        } на ${route} шоссе`;
      }

      if (dealType === 'rent') {
        return `Аренда ${
          kind ? dictionary[dealType][kind] : 'недвижимости'
        } на ${route} шоссе`;
      }
    },
    title: ({ name, id }, dealType, kind, queryPage) => {
      if (!name) {
        return '';
      }

      const dictionary = {
        1178: {
          sale:
            'Недвижимость на Рублево-Успенском шоссе - купить дом на Рублевке в Москве: фото и цены',
          rent: 'Аренда недвижимости на Рублевке (Рублево-Успенском шоссе)',

          house: {
            sale:
              'Дома на Рублевке - продажа домов на Рублево - Успенском шоссе в Москве: фото и цены',
            rent:
              'Снять дом на Рублево-успенском шоссе - аренда домов на Рублевке в Москве',
          },
          flat: {
            sale:
              'Квартиры на Рублево-Успенском шоссе - купить квартиру на Рублевке',
            rent: 'Аренда квартиры на Рублевке',
          },
          townhouse: {
            sale:
              'Таунхаусы на Рублево-Успенском шоссе - купить таунхаус на Рублевке',
            rent: 'Аренда таунхауса на Рублевке',
          },
          land: {
            sale:
              'Купить участок на Рублевке - продажа земельных участков на Рублево-Успенском шоссе: цены',
          },
        },
        1186: {
          sale:
            'Купить дом, таунхаус или участок на Новой Риге — недвижимость на Новорижском шоссе',
          rent:
            'Аренда дома или таунхауса на Новой Риге — снять недвижимость на Новорижском шоссе',

          house: {
            sale:
              'Купить дом на Новой Риге - продажа домов на Новорижском шоссе',
            rent: 'Аренда дома на Новорижском шоссе - снять дом на Новой Риге',
          },
          flat: {
            sale:
              'Купить квартиру на Новой Риге - продажа квартир на Новорижском шоссе',
            rent:
              'Снять квартиру на Новорижском шоссе - снять квартиру на Новой Риге',
          },
          townhouse: {
            sale:
              'Таунхаусы на Новой Риге - Купить таунхаус по Новорижскому шоссе в подмосковье',
            rent:
              'Снять таунхаус на Новой Риге - аренда таунхаусов по Новорижскому шоссе',
          },
          land: {
            sale:
              'Участки на Новой Риге - купить замельные участки по Новорижскому шоссе',
          },
        },
        1179: {
          sale: 'Купить недвижимость на Минском шоссе',
          rent: 'Аренда недвижимости на Минском шоссе',

          house: {
            sale: 'Купить дом или коттедж по Минскому шоссе в Подмосковье',
            rent: 'Аренда дома или коттеджа на Минском шоссе',
          },
          flat: {
            sale: 'Купить квартиру по Минскому шоссе',
            rent: 'Аренда квартиры на Минском шоссе',
          },
          townhouse: {
            sale: 'Купить таунхаус по Минскому шоссе',
            rent: 'Аренда таунхауса на Минском шоссе',
          },
          land: {
            sale:
              'Купить участок по Минскому шоссе - продажа земельных участков на Минском направлении',
          },
        },
        1192: {
          sale: 'Недвижимость на Ильинском шоссе',
          rent: 'Аренда недвижимости на Ильинском шоссе',

          house: {
            sale: 'Купить дом на Ильинском шоссе в Московской области',
            rent: 'Аренда дома или коттеджа на Ильинском шоссе',
          },
          flat: {
            sale: 'Купить квартиру на Ильинском шоссе',
            rent: 'Аренда квартиры на Ильинском шоссе',
          },
          townhouse: {
            sale: 'Купить таунхаус на Ильинском шоссе',
            rent: 'Аренда таунхауса на Ильинском шоссе',
          },
          land: {
            sale: 'Купить участок на Ильинском шоссе',
          },
        },
        1177: {
          sale: 'Недвижимость на Киевском шоссе',
          rent: 'Аренда недвижимости на Киевском шоссе',

          house: {
            sale: 'Купить дом на Киевском шоссе в Московской области',
            rent: 'Аренда дома или коттеджа на Киевском шоссе',
          },
          flat: {
            sale: 'Купить квартиру на Киевском шоссе',
            rent: 'Аренда квартиры на Киевском шоссе',
          },
          townhouse: {
            sale: 'Купить таунхаус на Киевском шоссе',
            rent: 'Аренда таунхауса на Киевском шоссе',
          },
          land: {
            sale: 'Купить участок на Киевском шоссе',
          },
        },
        1181: {
          sale: 'Недвижимость на Сколковском шоссе',
          rent: 'Аренда недвижимости на Сколковском шоссе',

          house: {
            sale: 'Купить дом на Сколковском шоссе в Московской области',
            rent: 'Аренда дома или коттеджа на Сколковском шоссе',
          },
          flat: {
            sale: 'Купить квартиру на Сколковском шоссе',
            rent: 'Аренда квартиры на Сколковском шоссе',
          },
          townhouse: {
            sale: 'Купить таунхаус на Сколковском шоссе',
            rent: 'Аренда таунхауса на Сколковском шоссе',
          },
          land: {
            sale: 'Купить участок на Сколковскому шоссе',
          },
        },
        1183: {
          sale: 'Недвижимость на Калужском шоссе',
          rent: 'Аренда недвижимости на Калужском шоссе',

          house: {
            sale: 'Купить дом на Калужском шоссе в Московской области',
            rent: 'Аренда дома или коттеджа на Калужском шоссе',
          },
          flat: {
            sale: 'Купить квартиру на Калужском шоссе',
            rent: 'Аренда квартиры на Калужском шоссе',
          },
          townhouse: {
            sale: 'Купить таунхаус на Калужском шоссе',
            rent: 'Аренда таунхауса на Калужском шоссе',
          },
          land: {
            sale: 'Купить участок на Калужском шоссе',
          },
        },
      };

      if (kind) {
        return `${dictionary[id][kind][dealType]} | ${
          isJQ ? 'JQ Estate' : global.config.domain
        } ${queryPage ? `— страница ${queryPage}` : ''}`;
      }
      return `${dictionary[id][dealType]} | ${
        isJQ ? 'JQ Estate' : global.config.domain
      } ${queryPage ? `— страница ${queryPage}` : ''}`;
    },
    description: (name, dealType, kind) => {
      if (!name || !dealType) {
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
        return `${
          dictionary[dealType].title
        } недвижимость - ${name}, Подмосковье. Лучшие предложения на ${
          global.config.domain
        }!`;
      }
      return `${dictionary[dealType].titleWithCategory} ${
        dictionary[dealType][kind]
      } – ${name}, Подмосковье. Лучшие предложения на ${global.config.domain}!`;
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
        return `${dictionary.dealType[dealType][0]} недвижимость, ${
          dictionary.dealType[dealType][1]
        } недвижимости, коттеджный поселок, ${name}, ${
          global.config.domain
        }, цена, стоимость, отзывы, квартира, таунхаус, участок, дом`;
      }
      return `${dictionary.dealType[dealType][0]} ${
        dictionary.kind[kind][0]
      }, ${dictionary.dealType[dealType][1]} ${
        dictionary.kind[kind][1]
      }, коттеджный поселок, ${name}, ${
        global.config.domain
      }, цена, стоимость, отзывы`;
    },
  },
};

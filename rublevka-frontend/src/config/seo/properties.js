import global from 'window-or-global';

const domain = global.config.domain;

function generateLink(ruDealType, ruKind) {
  if (ruKind) {
    return `https://${domain}/zagorodnaya/${ruDealType}/${ruKind}`;
  }
  return `https://${domain}/zagorodnaya/${ruDealType}`;
}

function numberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

export default {
  list: {
    city: {
      h1: (dealType, kind) => {
        const dictionary = {
          dealType: {
            sale: 'Продажа',
            rent: 'Аренда',
          },
          kind: {
            flat: 'квартир',
            house: 'домов',
            apartment: 'апартаментов',
            penthouse: 'пентхаусов',
            office: 'офисов',
          },
        };

        if (!kind) {
          return `${dictionary.dealType[dealType]} недвижимости в Москве`;
        }
        return `${dictionary.dealType[dealType]} ${
          dictionary.kind[kind]
        } в Москве`;
      },
      title: (dealType, kind) => {
        const dictionary = {
          sale: {
            title: 'Купить недвижимость',
            titleWithCategory: 'Купить',

            flat: 'квартиру',
            house: 'дом',
            apartment: 'апартаменты',
            penthouse: 'пентхаус',
            office: 'офис',
          },
          rent: {
            title: 'Аренда недвижимости',
            titleWithCategory: 'Аренда',

            flat: 'квартиры',
            house: 'дома',
            apartment: 'апартаментов',
            penthouse: 'пентхауса',
            office: 'офиса',
          },
        };

        if (!kind) {
          return `${dictionary[dealType].title} в Москве – ${domain}`;
        } else if (kind === 'apartment') {
          return `Снять апартаменты в Москве – ${domain}`;
        }
        return `${dictionary[dealType].titleWithCategory} ${
          dictionary[dealType][kind]
        } в Москве – ${domain}`;
      },
      description: () => '',
      keywords: () => '',
    },
    country: {
      link: (ruDealType, ruKind, queryPage, totalPages) => {
        if (queryPage === totalPages) {
          return [
            {
              rel: 'canonical',
              href: generateLink(ruDealType, ruKind),
            },
            {
              rel: 'prev',
              href: `${generateLink(ruDealType, ruKind)}?page=${queryPage - 1}`,
            },
          ];
        } else if (queryPage === 2) {
          return [
            {
              rel: 'canonical',
              href: generateLink(ruDealType, ruKind),
            },
            {
              rel: 'next',
              href: `${generateLink(ruDealType, ruKind)}?page=${queryPage + 1}`,
            },
            {
              rel: 'prev',
              href: generateLink(ruDealType, ruKind),
            },
          ];
        } else if (queryPage > 2) {
          return [
            {
              rel: 'canonical',
              href: generateLink(ruDealType, ruKind),
            },
            {
              rel: 'next',
              href: `${generateLink(ruDealType, ruKind)}?page=${queryPage + 1}`,
            },
            {
              rel: 'prev',
              href: `${generateLink(ruDealType, ruKind)}?page=${queryPage - 1}`,
            },
          ];
        }
        return [
          {
            rel: 'canonical',
            href: generateLink(ruDealType, ruKind),
          },
          {
            rel: 'next',
            href: `${generateLink(ruDealType, ruKind)}?page=2`,
          },
        ];
      },

      h1: (dealType, kind) => {
        const dictionary = {
          dealType: {
            sale: 'Продажа',
            rent: 'Аренда',
          },
          kind: {
            townhouse: 'таунхаусов',
            apartment: 'апартаментов',
            house: 'домов',
            flat: 'квартир',
            land: 'участков',
            office: 'офисов',
          },
        };

        if (!kind) {
          return `${dictionary.dealType[dealType]} загородной недвижимости`;
        }
        return `${dictionary.dealType[dealType]} ${dictionary.kind[kind]}`;
      },
      title: (dealType, kind, queryPage) => {
        const pagination = queryPage > 1 ? ` — cтраница ${queryPage}` : '';

        const { theme } = global.config;
        const dicts = require('./data/list.titles.json');

        if (theme in dicts) {
          const themeDict = dicts[theme][dealType];

          const title = themeDict[kind || 'root'];

          if (title) return title + pagination;
        }

        const dictionary = {
          sale: {
            title: 'Продажа',
            titleWithCategory: 'Купить',

            townhouse: 'таунхаус',
            penthouse: 'пентхаус',
            apartment: 'апартаменты',
            house: 'дом',
            flat: 'квартиру',
            land: 'участок',
            office: 'офис',
          },
          rent: {
            title: 'Аренда',
            titleWithCategory: 'Аренда',

            townhouse: 'таунхауса',
            penthouse: 'пентхауса',
            apartment: 'апартаментов',
            house: 'дома',
            flat: 'квартиры',
            office: 'офиса',
          },
        };

        if (!kind) {
          return `${
            dictionary[dealType].title
          } загородной недвижимости в Московской области на ${domain}${pagination}`;
        }
        return `${dictionary[dealType].titleWithCategory} ${
          dictionary[dealType][kind]
        } в Московской области на ${domain}${pagination}`;
      },

      titleH1: (dealType, kind) => {
        const dictionary = {
          sale: {
            title: 'Элитная недвижимость',
            titleWithCategory: ['Элитные', 'Элитные', 'Элитные'],

            townhouse: 'таунхаусы',
            penthouse: 'пентхаусы',
            apartment: 'апартаменты',
            house: 'дома',
            flat: 'квартиры',
            land: 'участки',
            office: 'офисы',
          },
          rent: {
            title: 'Аренда элитной недвижимости',
            titleWithCategory: [
              'Аренда элитного',
              'Аренда элитной',
              'Аренда элитных',
            ],

            townhouse: 'таунхауса',
            penthouse: 'пентхауса',
            apartment: 'апартаментов',
            house: 'дома',
            flat: 'квартиры',
            land: 'участка',
            office: 'офиса',
          },
        };

        if (!kind) {
          return `${dictionary[dealType].title} в Подмосковье`;
        } else if (kind === 'flat') {
          return `${dictionary[dealType].titleWithCategory[1]} ${
            dictionary[dealType][kind]
          } в Подмосковье`;
        } else if (kind === 'apartment') {
          return `${dictionary[dealType].titleWithCategory[2]} ${
            dictionary[dealType][kind]
          } в Подмосковье`;
        }
        return `${dictionary[dealType].titleWithCategory[0]} ${
          dictionary[dealType][kind]
        } в Подмосковье`;
      },

      description: (dealType, kind) => {
        const { theme } = global.config;
        const dicts = require('./data/list.descriptions.json');

        if (theme in dicts) {
          const themeDict = dicts[theme][dealType];

          const description = themeDict[kind || 'root'];

          if (description) return description;
        }

        const dictionary = {
          sale: {
            title: 'Купить загородную недвижимость в Московской области',
            titleWithCategory: 'Продажа',

            townhouse: 'таунхаусов',
            penthouse: 'пентхаусов',
            apartment: 'апартаментов',
            house: 'домов',
            flat: 'квартир',
            land: 'участков',
            office: 'офисов',
          },
          rent: {
            title: 'Аренда загородной недвижимости в Подмосковье',
            titleWithCategory: 'Аренда',
          },

          townhouse: 'таунхаусов',
          penthouse: 'пентхаусов',
          apartment: 'апартаментов',
          house: 'домов',
          flat: 'квартир',
          land: 'участков',
          office: 'офисов',
        };

        const { title, titleWithCategory } = dictionary[dealType] || {};

        if (!kind) {
          return `${title} на ${domain}. Лучшие предложения на ${domain}!`;
        }
        return `${titleWithCategory} в Подмосковье. Лучшие предложения на ${domain}!`;
      },
      keywords: (dealType, kind) => {
        const dictionary = {
          withoutKind: {
            sale: 'купить загородную недвижимость, продажа недвижимости',
            rent: 'аренда загородной недвижимости',
          },
          dealType: {
            sale: ['купить', 'продажа'],
            rent: ['снять', 'аренда'],
          },
          kind: {
            townhouse: ['таунхаус', 'таунхауса'],
            penthouse: ['пентхаус', 'пентхауса'],
            apartment: ['апартаменты', 'апартаментов'],
            house: ['дом', 'дома'],
            flat: ['квартиру', 'квартиры'],
            land: ['участок', 'участка'],
            office: ['офис', 'офиса'],
          },
        };

        if (!kind) {
          return `${
            dictionary.withoutKind[dealType]
          }, ${domain}, цена, стоимость, Московская область, Подмосковье, отзывы`;
        } else if (dealType === 'sale') {
          return `${dictionary.dealType[dealType][0]} ${
            dictionary.kind[kind][0]
          }, ${dictionary.dealType[dealType][1]} ${
            dictionary.kind[kind][1]
          }, недвижимость, ${domain}, цена, стоимость, Москва, Московская область, Подмосковье, отзывы`;
        } else if (dealType === 'rent') {
          return `${dictionary.dealType[dealType][0]} ${
            dictionary.kind[kind][0]
          }, ${dictionary.dealType[dealType][1]} ${
            dictionary.kind[kind][1]
          }, недвижимость, ${domain}, цена, стоимость, Москва, Московская область, Подмосковье, отзывы`;
        }
      },
    },
  },

  show: {
    city: {
      h1: (dealType, kind, street) => {
        const dictionary = {
          dealType: {
            sale: 'Продажа',
            rent: 'Аренда',
          },
          kind: {
            flat: 'квартиры',
            house: 'дома',
            apartment: 'апартаментов',
            penthouse: 'пентхаусов',
            office: 'офисов',
          },
        };

        return `${dictionary.dealType[dealType]} ${dictionary.kind[kind]}${
          street ? ` на ${street}` : ''
        } в Москве`;
      },
      title: (dealType, kind, id, street, totalArea, price, subLocality) => {
        const dictionary = {
          sale: {
            title: 'Купить',

            flat: 'квартиру',
            house: 'дом',
            apartment: 'апартаменты',
            penthouse: 'пентхаус',
            office: 'офис',
          },
          rent: {
            title: 'Аренда',

            flat: 'квартиры',
            house: 'дома',
            apartment: 'апартаментов',
            penthouse: 'пентхауса',
            office: 'офиса',
          },
        };

        return `${dictionary[dealType].title} ${
          dictionary[dealType][kind]
        } ID ${id}${street ? ` на ${street}` : ''} в Москве${
          totalArea ? `, общей площадью ${totalArea} м²` : ''
        }, по цене ${price}${
          subLocality ? `, ${subLocality}` : ''
        } – ${domain}`;
      },
      description: () => '',
      keywords: () => '',
    },
    country: {
      link: (ruDealType, ruKind, id) => [
        {
          rel: 'canonical',
          href: `https://${domain}/zagorodnaya/${ruDealType}/${ruKind}/${id}`,
        },
      ],
      h1: (kind, area, landArea, settlement) => {
        const dictionary = {
          kind: {
            townhouse: 'Таунхаус',
            penthouse: 'Пентхаус',
            apartment: 'Апартаменты',
            house: 'Дом',
            flat: 'Квартира',
            land: 'Участок',
            office: 'Офис',
          },
        };

        return `${dictionary.kind[kind]} ${
          area ? `${numberWithCommas(area)} м²` : ''
        } ${
          !area && landArea ? `${numberWithCommas(landArea)} сот` : ''
        } в посёлке «${settlement}»`;
      },
      title: (
        dealType,
        kind,
        id,
        name,
        mkadDistance,
        area,
        price,
        route,
        meta,
      ) => {
        if (meta) return meta;

        const dictionary = {
          sale: {
            title: 'Продажа',
            titleWithCategory: 'Купить',

            townhouse: 'таунхаус',
            penthouse: 'пентхаус',
            apartment: 'апартаменты',
            house: 'дом',
            flat: 'квартиру',
            land: 'участок',
            office: 'офис',
          },
          rent: {
            title: 'Аренда',
            titleWithCategory: 'Аренда',

            townhouse: 'таунхауса',
            penthouse: 'пентхауса',
            apartment: 'апартаментов',
            house: 'дома',
            flat: 'квартиры',
            land: 'участка',
            office: 'офиса',
          },
        };

        if (!kind) {
          return `${
            dictionary[dealType].title
          } недвижимости Московской области на ${domain}`;
        }
        return `${dictionary[dealType].titleWithCategory} ${
          dictionary[dealType][kind]
        } ID ${id}${name ? ` в поселке «${name}»` : ''}${
          mkadDistance ? `, ${mkadDistance} км от МКАД` : ''
        }${area ? `, общей площадью ${area} м²` : ''}, по цене ${price}${
          route ? `, ${route}` : ''
        } на ${domain}`;
      },
      description: (
        dealType,
        kind,
        id,
        name,
        mkadDistance,
        area,
        price,
        route,
        district,
        region,
        meta,
      ) => {
        if (meta) return meta;

        const dictionary = {
          sale: {
            title: 'Купить',

            townhouse: 'таунхаус',
            penthouse: 'пентхаус',
            apartment: 'апартаменты',
            house: 'дом',
            flat: 'квартиру',
            land: 'участок',
            office: 'офис',
          },
          rent: {
            title: 'Снять',

            townhouse: 'таунхаус',
            penthouse: 'пентхаус',
            apartment: 'апартаменты',
            house: 'дом',
            flat: 'квартиру',
            land: 'участок',
            office: 'офис',
          },
        };

        const { title } = dictionary[dealType];

        return `${title} ${
          dictionary[dealType][kind]
        } ID ${id} по цене ${price} ${name &&
          `в поселке «${name}»`} ${mkadDistance &&
          `в ${mkadDistance} км от МКАД`} ${route &&
          `на ${route} направлении`}${area &&
          `, площадью ${area} м²`}${region && `, ${region}`} – ${domain}!`;
      },
      keywords: (name, dealType, kind, region, district, route, meta) => {
        if (meta) return meta;

        const dictionary = {
          dealType: {
            sale: ['купить', 'продажа'],
            rent: ['снять', 'аренда'],
          },
          kind: {
            townhouse: ['таунхаус', 'таунхауса'],
            penthouse: ['пентхаус', 'пентхауса'],
            apartment: ['апартаменты', 'апартаментов'],
            house: ['дом', 'дома'],
            flat: ['квартиру', 'квартиры'],
            land: ['участок', 'участка'],
            office: ['офис', 'офиса'],
          },
        };

        // снять таунхаус, аренда таунхауса, недвижимость, {адрес сайта}, цена, стоимость, {наименование региона}, {наименование района}, {наименование шоссе}, {ID}, {цена}
        return `${dictionary.dealType[dealType][0]} ${
          dictionary.kind[kind][0]
        }, ${dictionary.dealType[dealType][1]} ${
          dictionary.kind[kind][1]
        }, ${domain}${region ? `, ${region}` : ''}${
          district ? `, ${district} район` : ''
        }${route ? `, ${route} направление` : ''}`;
      },
    },
  },
};

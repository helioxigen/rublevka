import global from 'window-or-global';

export default {
  list: {
    h1: 'Элитные жилые комплексы Москвы',
    title: queryPage =>
      `Список элитных жилых комплексов Москвы | ${global.config.domain}${
        queryPage > 1 ? ` — cтраница ${queryPage}` : ''
      }`,
    description: `Лучшие жилые комплексы Москвы | ${global.config.domain}`,
    keywords: `список ЖК, жилые комплексы, Москва, аренда, продажа, купить, снять, ${
      global.config.domain
    }`,
    link: (queryPage, totalPages) => {
      if (queryPage === totalPages) {
        return [
          {
            rel: 'canonical',
            href: `https://${global.config.domain}/gorodskaya/zhilye-kompleksy`,
          },
          {
            rel: 'prev',
            href: `https://${
              global.config.domain
            }/gorodskaya/zhilye-kompleksy?page=${queryPage - 1}`,
          },
        ];
      } else if (queryPage === 2) {
        return [
          {
            rel: 'canonical',
            href: `https://${global.config.domain}/gorodskaya/zhilye-kompleksy`,
          },
          {
            rel: 'next',
            href: `https://${
              global.config.domain
            }/gorodskaya/zhilye-kompleksy?page=${queryPage + 1}`,
          },
          {
            rel: 'prev',
            href: `https://${global.config.domain}/gorodskaya/zhilye-kompleksy`,
          },
        ];
      } else if (queryPage > 2) {
        return [
          {
            rel: 'canonical',
            href: `https://${global.config.domain}/gorodskaya/zhilye-kompleksy`,
          },
          {
            rel: 'next',
            href: `https://${
              global.config.domain
            }/gorodskaya/zhilye-kompleksy?page=${queryPage + 1}`,
          },
          {
            rel: 'prev',
            href: `https://${
              global.config.domain
            }/gorodskaya/zhilye-kompleksy?page=${queryPage - 1}`,
          },
        ];
      }
      return [
        {
          rel: 'canonical',
          href: `https://${global.config.domain}/gorodskaya/zhilye-kompleksy`,
        },
        {
          rel: 'next',
          href: `https://${
            global.config.domain
          }/gorodskaya/zhilye-kompleksy?page=2`,
        },
      ];
    },
  },
  show: {
    h1: name => {
      if (!name) {
        return '';
      }
      return `ЖК ${name}`;
    },
    title: (name, street) => {
      if (!name) {
        return '';
      }
      return `ЖК ${name} — аренда и продажа квартир в жилом комплексе ${name}${
        street ? ` — ${street}` : ''
      }, Москва | ${global.config.domain}`;
    },
    description: (name, street) => {
      if (!name) {
        return '';
      }
      return `Купить или снять квартиру в ЖК ${name}, расположенного в Москве${
        street ? ` на ${street}` : ''
      }. Лучшие предложения в элитных жилых комплексах Москвы | ${
        global.config.domain
      }`;
    },
    keywords: (name, street) => {
      if (!name) {
        return '';
      }
      return `ЖК, ${name}${
        street ? `, ${street}` : ''
      }, Москва, аренда, продажа, купить, снять, ${global.config.domain}`;
    },
  },
};

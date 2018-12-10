import qs from 'qs';

const qsStringify = (...args) => qs.stringify(...args, { addQueryPrefix: true });

export const getPrevNext = (baseUrl, queryPage, totalPages) => {
  if (queryPage === totalPages) {
    const prev = queryPage - 1;

    return [
      {
        rel: 'prev',
        href: baseUrl + qsStringify({ page: prev }),
      },
    ];
  } else if (queryPage === 2) {
    const next = queryPage + 1;

    return [
      {
        rel: 'prev',
        href: baseUrl,
      },
      {
        rel: 'next',
        href: baseUrl + qsStringify({ page: next }),
      },
    ];
  } else if (queryPage > 2) {
    const next = queryPage + 1;
    const prev = queryPage - 1;

    return [
      {
        rel: 'prev',
        href: baseUrl + qsStringify({ page: prev }),
      },
      {
        rel: 'next',
        href: baseUrl + qsStringify({ page: next }),
      },
    ];
  }

  return [
    {
      rel: 'next',
      href: baseUrl + qsStringify({ page: 2 }),
    },
  ];
};

export const getTitlePostfix = (queryPage) => {
  if (queryPage > 1) return ` — cтраница ${queryPage}`;

  return '';
};

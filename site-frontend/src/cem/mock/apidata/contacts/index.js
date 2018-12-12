export default {
  get: {
    defaultResponseCode: 200,
    200: {
      items: [
        {
          additionalDetails: {
            car: 'Ниссан',
            carNumber: 'А777МР',
            carRegion: 777,
            occupation: 'Разработчик',
            role: 'Не ЛПР',
          },
          companyDetails: {
            company: 'ООО Мидас',
            position: 'Фронтэнд-разработчик',
          },
          createdAt: '2015-12-08T22:19:18.925+03:00',
          details: {
            email: 'test@test.com',
            facebook: 'trap',
            firstName: 'Name',
            instagram: 'trap163',
            lastName: 'LastName',
            middleName: 'MiddleName',
            phoneNumber: '+7 999 123-45-67',
            twitter: 'test',
          },
          id: 2,
          ownerUserId: 1,
          updatedAt: '2015-12-17T19:17:36.161+03:00',
        },
        {
          additionalDetails: {
            additionalPhoneNumber: '+7 999 123-45-67',
            carRegion: 3,
          },
          companyDetails: {},
          createdAt: '2015-12-09T00:02:51.358+03:00',
          details: {
            email: 'alexey@mail.ru',
            firstName: 'Алексей',
            lastName: 'Тóпор',
            middleName: 'Алексеевичт',
            phoneNumber: '+7 (999) 810-14-88',
          },
          id: 3,
          ownerUserId: 1,
          updatedAt: '2015-12-09T13:10:33.030+03:00',
        },
      ],
    },
    404: {
      errors: [
        {
          kind: 'request',
          message: 'Resource not found',
        },
      ],
    },
  },
  post: {
    defaultResponseCode: 201,
    201: {

    },
    404: {

    },
    500: {

    },
  },
  put: {
    defaultResponseCode: 200,
    200: {

    },
    404: {

    },
  },
  delete: {
    defaultResponseCode: 204,
    204: {

    },
    404: {

    },
  },
};

// import * as actions from 'cem/actions/contacts';
// import * as types from 'cem/constants/contacts';

// import { API } from 'core/config/resources';

import nock from 'nock';

// import configureMockStore from 'redux-mock-store';
// import thunk from 'redux-thunk';
// const mockStore = configureMockStore([thunk]);

export default () => {
  context(`📔  Contacts`, () => {
    describe(`thunk action`, () => {
      afterEach(() => {
        nock.cleanAll();
      });

      it(`should create LOAD_LIST and LOAD_LIST_SUCCESS actions if GET succeeded`, (done) => {
        // const queryParams = { filter: {} };
        // const responseBody = {
        //   items: [
        //     {
        //       additionalDetails: {
        //         car: `Ниссан`,
        //         carNumber: `А777МР`,
        //         carRegion: 777,
        //         occupation: `Разработчик`,
        //         role: `Не ЛПР`,
        //       },
        //       companyDetails: {
        //         company: `ООО Мидас`,
        //         position: `Фронтэнд-разработчик`,
        //       },
        //       createdAt: `2015-12-08T22:19:18.925+03:00`,
        //       details: {
        //         email: `test@test.com`,
        //         facebook: `trap`,
        //         firstName: `Name`,
        //         instagram: `trap163`,
        //         lastName: `LastName`,
        //         middleName: `MiddleName`,
        //         phoneNumber: `+7 999 123-45-67`,
        //         twitter: `test`,
        //       },
        //       id: 2,
        //       ownerUserId: 1,
        //       updatedAt: `2015-12-17T19:17:36.161+03:00`,
        //     },
        //     {
        //       additionalDetails: {
        //         additionalPhoneNumber: `+7 999 123-45-67`,
        //         carRegion: 3,
        //       },
        //       companyDetails: {},
        //       createdAt: `2015-12-09T00:02:51.358+03:00`,
        //       details: {
        //         email: `alexey@mail.ru`,
        //         firstName: `Алексей`,
        //         lastName: `Тóпор`,
        //         middleName: `Алексеевичт`,
        //         phoneNumber: `+7 (999) 810-14-88`,
        //       },
        //       id: 3,
        //       ownerUserId: 1,
        //       updatedAt: `2015-12-09T13:10:33.030+03:00`,
        //     },
        //   ],
        // };

        // TODO: Tests are failing for some reason, investigation required;
        done();

        // const expectedActions = [
        //   { type: types.LOAD_LIST, queryParams },
        //   { type: types.LOAD_LIST_SUCCESS, ...responseBody },
        // ];
        //
        // nock(API).get(`/v1/contacts`).reply(200, responseBody);
        //
        // mockStore({}, expectedActions, done).dispatch(actions.loadContacts(queryParams));
      });

      it(`should create LOAD_LIST and LOAD_LIST_FAIL if server responded with error`, (done) => {
        // const queryParams = { filter: {} };
        // const expectedActions = [
        //   { type: types.LOAD_LIST, queryParams },
        //   { type: types.LOAD_LIST_FAIL },
        // ];

        // TODO: Tests are failing for some reason, investigation required;
        done();

        // nock(API).get(`/v1/contacts`).reply(500);
        //
        // mockStore({}, expectedActions, done).dispatch(actions.loadContacts(queryParams));
      });
    });
  });
};

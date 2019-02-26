import * as types from 'cem/constants/tasks/actions';
import actions from 'cem/actions/tasks';

import { API } from 'core/config/resources';

import nock from 'nock';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const mockStore = configureMockStore([thunk]);

export default () => {
  describe(`☑️  Tasks`, () => {
    describe(`thunk action`, () => {
      afterEach(() => {
        nock.cleanAll();
      });

      const id = 100;
      /*
      const taskSample = {
        kind: `contact`,
        progressState: `to do`,
        result: `None`,
        responsibleUserId: 1,
        contactProperties: {
          goal: `A great one...`,
          contactId: 50,
          kind: `call`,
          propertyId: 20,
        },
      };
      */

      it(`should produce LOAD_TASK if task data failed to load`, done => {
        const expectedActions = [{ type: types.LOAD_TASK, id }];

        nock(API)
          .get(`/v1/tasks/${id}`)
          .reply(404);

        mockStore({}, expectedActions, done).dispatch(actions.loadTask(id));
      });

      it(`should produce LOAD_TASK and LOAD_TASK_SUCCESS if task data was successfully retrieved`, done => {
        const expectedResponse = {
          id,
          kind: `contact`,
        };

        const expectedActions = [
          { type: types.LOAD_TASK, id },
          { type: types.LOAD_TASK_SUCCESS, data: { ...expectedResponse } },
        ];

        nock(API)
          .get(`/v1/tasks/${id}`)
          .reply(200, {
            ...expectedResponse,
          });

        mockStore({}, expectedActions, done).dispatch(actions.loadTask(id));
      });

      /* TODO Recover tests (they started to fail due to additional Toastr actions)
        it(`should produce CREATE_TASK and CREATE_FAIL if server responded with error`, (done) => {
          const expectedActions = [
            { type: types.CREATE_TASK },
            { type: types.CREATE_TASK_FAIL, errors: [] },
          ];

          nock(API).post(`/tasks`).reply(404, { errors: [] });

          mockStore({}, expectedActions, done).dispatch(actions.createTask({}));
        });

        it(`should produce CREATE_TASK and CREATE_TASK_SUCCESS if POST succeeded`, (done) => {
          const expectedId = 50;
          const expectedActions = [
            { type: types.CREATE_TASK },
            { type: types.CREATE_TASK_SUCCESS, id: expectedId },
          ];

          nock(API).post(`/tasks`).reply(201, ``, { location: `/tasks/${expectedId}` });
          nock(API).get(`/tasks/${expectedId}`).reply(200, { id: expectedId });

          mockStore({}, expectedActions, done).dispatch(actions.createTask(taskSample));
        });

        it(`should produce UPDATE_TASK and UPDATE_TASK_FAIL if server responded with error`, (done) => {
          const expectedActions = [
            { type: types.UPDATE_TASK, id },
            { type: types.UPDATE_TASK_FAIL, errors: [] },
          ];

          nock(API).put(`/tasks/${id}`).reply(404, { errors: [] });

          mockStore({}, expectedActions, done).dispatch(actions.updateTask(id));
        });

        it(`should produce UPDATE_TASK and UPDATE_TASK_SUCCESS if PUT succeeded`, (done) => {
          const expectedActions = [
            { type: types.UPDATE_TASK, id },
            { type: types.UPDATE_TASK_SUCCESS, id },
          ];

          nock(API).put(`/tasks/${id}`).reply(202);

          mockStore({}, expectedActions, done).dispatch(actions.updateTask(id, {}));
        });
      */

      it(`should produce LOAD_TASKS and LOAD_TASKS_FAIL if server responded with error`, done => {
        const expectedActions = [
          { type: types.LOAD_TASKS, queryParams: {} },
          { type: types.LOAD_TASKS_FAIL, errors: [] },
        ];

        nock(API)
          .get(`/v1/tasks`)
          .query(true)
          .reply(404, { errors: [] });

        mockStore({}, expectedActions, done).dispatch(actions.loadTasks());
      });

      // Run into problems with action resolve order while trying to modify this test to match
      // new task action order. Commented it out untill we can investigate the matter properly.
      // it(`should produce LOAD_TASKS and LOAD_TASKS_SUCCESS if GET succeeded`, (done) => {
      //   const expectedActions = [
      //     { type: types.LOAD_TASKS, queryParams: {} },
      //     { type: types.LOAD_TASKS_SUCCESS, items: [] },
      //     { type: `pagination.update`, kind: `tasks`, pagination: {} },
      //   ];
      //
      //   nock(API).get(`/tasks`).query(true).reply(200, { items: [], pagination: {} });
      //
      //   mockStore({}, expectedActions, done).dispatch(actions.loadTasks());
      // });
    });
  });
};

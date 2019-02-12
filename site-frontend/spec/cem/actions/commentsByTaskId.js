import * as types from 'cem/constants/comments/actions';
import actions from 'cem/actions/tasks/comments';

import { API } from 'core/config/resources';

import nock from 'nock';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const mockStore = configureMockStore([thunk]);

export default () => {
  describe(`💬  Comments`, () => {
    describe(`thunk action`, () => {
      afterEach(() => {
        nock.cleanAll();
      });

      const id = 100;

      it(`should produce LOAD_COMMENTS_FOR_TASK and LOAD_COMMENTS_FOR_TASK_FAIL if server responded with error`, done => {
        const expectedActions = [
          { type: types.LOAD_COMMENTS_FOR_TASK, id },
          { type: types.LOAD_COMMENTS_FOR_TASK_FAIL, id, errors: [] },
        ];

        nock(API)
          .get(`/v1/tasks/${id}/comments`)
          .reply(404, { errors: [] });

        mockStore({}, expectedActions, done).dispatch(
          actions.loadCommentsForTask(id),
        );
      });

      it(`should produce LOAD_COMMENTS_FOR_TASK and LOAD_COMMENTS_FOR_TASK_SUCCESS if GET succeeded`, done => {
        const expectedActions = [
          { type: types.LOAD_COMMENTS_FOR_TASK, id },
          { type: types.LOAD_COMMENTS_FOR_TASK_SUCCESS, id, items: [] },
        ];

        nock(API)
          .get(`/v1/tasks/${id}/comments`)
          .reply(200, { items: [] });

        mockStore({}, expectedActions, done).dispatch(
          actions.loadCommentsForTask(id),
        );
      });

      it(`should produce CREATE_COMMENT_FOR_TASK and CREATE_COMMENT_FOR_TASK_FAIL if server responded with error`, done => {
        const expectedActions = [
          { type: types.CREATE_COMMENT_FOR_TASK, id },
          { type: types.CREATE_COMMENT_FOR_TASK_FAIL, id, errors: [] },
        ];

        nock(API)
          .post(`/v1/tasks/${id}/comments`)
          .reply(404, { errors: [] });

        mockStore({}, expectedActions, done).dispatch(
          actions.createCommentForTask(id, { text: `Texting...`, userId: 5 }),
        );
      });

      it(`should produce CREATE_COMMENT_FOR_TASK and CREATE_COMMENT_FOR_TASK_SUCCESS if POST succeeded `, done => {
        const expectedActions = [
          { type: types.CREATE_COMMENT_FOR_TASK, id },
          { type: types.CREATE_COMMENT_FOR_TASK_SUCCESS, id },
        ];

        nock(API)
          .post(`/v1/tasks/${id}/comments`)
          .reply(201);

        mockStore({}, expectedActions, done).dispatch(
          actions.createCommentForTask(id, { text: `Texting...`, userId: 5 }),
        );
      });

      it(`should produce SET_ACTIVE_COMMENT_FOR_TASK with task ID and comment ID`, done => {
        const taskId = 500;
        const commentId = 52;
        const expectedActions = [
          { type: types.SET_ACTIVE_COMMENT_FOR_TASK, taskId, commentId },
        ];

        mockStore({}, expectedActions, done).dispatch(
          actions.setActiveCommentForTask(taskId, commentId),
        );
      });
    });
  });
};

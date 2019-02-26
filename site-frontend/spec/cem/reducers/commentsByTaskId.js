import chai from 'chai';
const { expect } = chai;

import * as types from 'cem/constants/comments/actions';
import reducer from 'cem/reducers/commentsByTaskId';

export default () => {
  describe(`💬  Comments`, () => {
    const defaultInitialState = {
      200: {
        list: { items: [] },
      },
      50: {
        list: { items: [] },
      },
    };
    const taskId = 50;

    it(`should not change state on LOAD_COMMENTS_FOR_TASK`, () => {
      expect(
        reducer(defaultInitialState, {
          type: types.LOAD_COMMENTS_FOR_TASK,
          id: taskId,
        }),
      ).to.deep.equal(defaultInitialState);
    });

    it(`should handle LOAD_COMMENTS_FOR_TASK_FAIL`, () => {
      expect(
        reducer(defaultInitialState, {
          type: types.LOAD_COMMENTS_FOR_TASK_FAIL,
          id: taskId,
          errors: [],
        }),
      ).to.deep.equal({
        ...defaultInitialState,
        [taskId]: {
          list: {
            errors: [],
          },
        },
      });
    });

    it(`should handle LOAD_COMMENTS_FOR_TASK_SUCCESS`, () => {
      expect(
        reducer(defaultInitialState, {
          type: types.LOAD_COMMENTS_FOR_TASK_SUCCESS,
          id: taskId,
          items: [],
        }),
      ).to.deep.equal({
        ...defaultInitialState,
        [taskId]: {
          list: {
            items: [],
          },
        },
      });
    });

    it(`should handle SET_ACTIVE_COMMENT_FOR_TASK`, () => {
      const selectedCommentId = 50;
      expect(
        reducer(defaultInitialState, {
          type: types.SET_ACTIVE_COMMENT_FOR_TASK,
          taskId,
          commentId: selectedCommentId,
        }),
      ).to.deep.equal({
        ...defaultInitialState,
        [taskId]: {
          ...defaultInitialState[taskId.toString()],
          activeCommentId: selectedCommentId,
        },
      });
    });
  });
};

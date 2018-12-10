import chai from 'chai';
const { expect } = chai;

import * as types from 'cem/constants/tasks/actions';
import reducer from 'cem/reducers/tasks';

export default () => {
  describe(`☑️  Tasks`, () => {
    const id = 50;
    const defaultInitialState = {
      list: {
        items: [
          {
            id: 50,
            kind: `contact`,
            progressState: `to_do`,
            result: `None`,
            responsibleUserId: 5,
            contactProperties: {
              goal: `Hey!`,
              contactId: 10,
              kind: `call`,
              propertyId: 11,
            },
            createdAt: `2015-01-17T23:19:18.925+03:00`,
            updatedAt: `2015-01-17T23:19:18.925+03:00`,
            deadline: `2015-01-22T23:19:18.925+03:00`,
          },
        ],
      },
      50: {
        data: {
          id: 50,
          kind: `contact`,
          progressState: `to_do`,
          result: `None`,
          responsibleUserId: 5,
          contactProperties: {
            goal: `Hey!`,
            contactId: 10,
            kind: `call`,
            propertyId: 11,
          },
          createdAt: `2015-01-17T23:19:18.925+03:00`,
          updatedAt: `2015-01-17T23:19:18.925+03:00`,
          deadline: `2015-01-22T23:19:18.925+03:00`,
        },
      },
    };

    it(`should not change state as task loading begins`, () => {
      expect(reducer({}, { type: types.LOAD_TASK, id })).to.deep.equal({});
    });

    it(`should handle LOAD_TASK_SUCCESS and include tasks data`, () => {
      expect(reducer({}, { type: types.LOAD_TASK_SUCCESS, data: { id } })).to.deep.equal({
        [id]: {
          data: { id },
        },
      });
    });

    it(`should not handle LOAD_TASKS`, () => {
      expect(reducer(defaultInitialState, { type: types.LOAD_TASKS })).to.deep.equal(defaultInitialState);
    });

    it(`should handle LOAD_TASKS_FAIL`, () => {
      expect(reducer(defaultInitialState, { type: types.LOAD_TASKS_FAIL, errors: [] })).to.deep.equal({
        ...defaultInitialState,
        list: {
          errors: [],
        },
      });
    });
  });
};

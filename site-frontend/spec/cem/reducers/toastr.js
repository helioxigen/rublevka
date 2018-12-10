import chai from 'chai';
const { expect } = chai;

import * as types from 'cem/constants/toastr';
import reducer from 'cem/reducers/toastr';

export default () => {
  context(`🔔  Toastr`, () => {
    it(`should be empty after FLUSH`, () => {
      const currentState = {
        notifications: [
          {
            id: 1450890086337,
            kind: `danger`,
            title: `Ошибка удаления слова!`,
            body: undefined,
            timeout: undefined,
          },
        ],
      };

      const action = { type: types.FLUSH };

      const nextState = reducer(currentState, action);

      expect(nextState).to.deep.equal({ notifications: [] });
    });

    describe(`on POP`, () => {
      const currentState = {
        notifications: [],
      };

      it(`should add the transmitted message to notifications array`, () => {
        const expectedMessage = `Oh, yeah...`;
        const action = {
          type: types.POP,
          title: expectedMessage,
          body: undefined,
          kind: `danger`,
          timeout: 5000,
        };

        const nextState = reducer(currentState, action);

        expect(nextState.notifications[0]).to.have.property(`title`, expectedMessage);
      });

      it(`should handle multiple messages`, () => {
        const actions = [
          { type: types.POP, kind: `danger`, title: `Be cautious!` },
          { type: types.POP, kind: `danger`, title: `Be cautious one more time!` },
        ];

        const nextState = actions.reduce(reducer, currentState);

        expect(nextState.notifications[0].title).to.equal(`Be cautious!`);
        expect(nextState.notifications[1].title).to.equal(`Be cautious one more time!`);
      });
    });
  });
};

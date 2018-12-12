import chai from 'chai';
const { expect } = chai;

import { recursiveTraverseChanges } from 'core/helpers';

export default () => {
  context(`🔩  Helpers`, () => {
    describe(`'recursiveTraverseChanges'`, () => {
      const left = {
        simpleField: `Karl Marx`,
        topParent: {
          innerParent: {
            simpleNestedValue: `Dusk`,
            simpleNestedValueToRemove: `Babel (must be removed)`,
          },
        },
        stringArrayField: [`tv`, `camera`, `phone`],
        anotherStringArrayField: [`donut`, `pie (must be removed)`, `marshmallow`],
        objectArrayField: [
          {
            id: 1,
            name: `Kirk Hinric`,
          },
          {
            id: 2,
            name: `Dwayne Wade`,
          },
          {
            id: 3,
            name: `Denis Rodman`,
          },
        ],
        anotherObjectArrayField: [
          {
            id: 1,
            name: `MTS`,
          },
          {
            id: 2,
            name: `Vodafone (must be removed)`,
          },
          {
            id: 3,
            name: `Orange`,
          },
        ],
        oneMoreObjectArrayField: [
          {
            id: 1,
            name: `iMac`,
          },
          {
            id: 2,
            name: `iPad`,
          },
          {
            id: 3,
            name: `iPod`,
          },
        ],
      };

      const right = {
        simpleField: `Vladimir Lenin (changed)`,
        topParent: {
          innerParent: {
            simpleNestedValue: `Dawn (changed)`,
            newSimpleNestedValue: `Newcomer (added)`,
          },
        },
        stringArrayField: [`tv`, `camera`, `phone`, `keyboard (added)`],
        anotherStringArrayField: [`donut`, `marshmallow`],
        objectArrayField: [
          {
            id: 2,
            name: `Dwayne Wade`,
          },
          {
            id: 3,
            name: `Denis Rodman`,
          },
          {
            id: 1,
            name: `Kirk Hinrich`,
          },
        ],
        anotherObjectArrayField: [
          {
            id: 1,
            name: `MTS`,
          },
          {
            id: 3,
            name: `Orange`,
          },
        ],
        oneMoreObjectArrayField: [
          {
            id: 1,
            name: `iMac`,
          },
          {
            id: 2,
            name: `iPad`,
          },
          {
            id: 3,
            name: `iPod`,
          },
          {
            id: 4,
            name: `MacBook`,
          },
        ],
      };

      const changes = {
        simpleField: [
          `Karl Marx`,
          `Vladimir Lenin (changed)`,
        ],
        topParent: {
          innerParent: {
            simpleNestedValue: [
              `Dusk`,
              `Dawn (changed)`,
            ],
            simpleNestedValueToRemove: [
              `Babel (must be removed)`,
              0,
              0,
            ],
            newSimpleNestedValue: [
              `Newcomer (added)`,
            ],
          },
        },
        stringArrayField: {
          3: [
            `keyboard (added)`,
          ],
          _t: `a`,
        },
        anotherStringArrayField: {
          _t: `a`,
          _1: [
            `pie (must be removed)`,
            0,
            0,
          ],
        },
        objectArrayField: {
          2: {
            name: [
              `Kirk Hinric`,
              `Kirk Hinrich`,
            ],
          },
          _t: `a`,
          _0: [
            ``,
            2,
            3,
          ],
        },
        anotherObjectArrayField: {
          _t: `a`,
          _1: [
            {
              id: 2,
              name: `Vodafone (must be removed)`,
            },
            0,
            0,
          ],
        },
        oneMoreObjectArrayField: {
          3: [
            {
              id: 4,
              name: `MacBook`,
            },
          ],
          _t: `a`,
        },
      };

      const changeEvents = recursiveTraverseChanges(changes, left, right);

      // NOTE Keep it here for awhile too
      // console.log(JSON.stringify(changeEvents, null, 2))

      it(`should return an array that processed changes object with correct number of keys`, () => {
        expect(changeEvents.length).to.equal(10);
      });

      it(`should detect changes to a simple top-level value field`, () => {
        expect(changeEvents).to.include({
          id: `simpleField`,
          keyPath: `simpleField`,
          index: null,
          type: `changed`,
          oldValue: `Karl Marx`,
          value: `Vladimir Lenin (changed)`,
        });
      });

      it(`should detect changes to a simple value field that is deeply nested`, () => {
        expect(changeEvents).to.include({
          id: `topParent.innerParent.simpleNestedValue`,
          keyPath: `topParent.innerParent.simpleNestedValue`,
          index: null,
          type: `changed`,
          oldValue: `Dusk`,
          value: `Dawn (changed)`,
        });
      });

      it(`should detect addition of simple field`, () => {
        expect(changeEvents).to.include({
          id: `topParent.innerParent.newSimpleNestedValue`,
          keyPath: `topParent.innerParent.newSimpleNestedValue`,
          index: null,
          type: `added`,
          value: `Newcomer (added)`,
        });
      });

      it(`should detect removal of simple field`, () => {
        expect(changeEvents).to.include({
          id: `topParent.innerParent.simpleNestedValueToRemove`,
          keyPath: `topParent.innerParent.simpleNestedValueToRemove`,
          index: null,
          type: `deleted`,
          value: `Babel (must be removed)`,
        });
      });

      it(`should detect addition of a new element to simple array field`, () => {
        expect(changeEvents).to.include({
          id: `stringArrayField`,
          keyPath: `stringArrayField[3]`,
          index: 3,
          type: `added`,
          value: `keyboard (added)`,
        });
      });

      it(`should detect element removal from simple array field`, () => {
        expect(changeEvents).to.include({
          id: `anotherStringArrayField`,
          keyPath: `anotherStringArrayField[1]`,
          index: 1,
          type: `deleted`,
          value: `pie (must be removed)`,
        });
      });

      it(`should keep parent index for element of complex array field`, () =>
        expect(changeEvents.filter(item => item.id === `objectArrayField.name`)[0].index).to.equal(2)
      );

      it(`should detect update of an element in complex array field`, () => {
        expect(changeEvents).to.include({
          id: `objectArrayField.name`,
          keyPath: `objectArrayField[2].name`,
          index: 2,
          type: `changed`,
          parentValue: {
            id: 1,
            name: `Kirk Hinrich`,
          },
          oldValue: `Kirk Hinric`,
          value: `Kirk Hinrich`,
        });
      });

      it(`should detect change of element position in complex array field`, () => {
        expect(changeEvents).to.include({
          id: `objectArrayField`,
          keyPath: `objectArrayField[0]`,
          index: 0,
          type: `moved`,
          value: {
            id: 1,
            name: `Kirk Hinric`,
          },
          newIndex: 2,
        });
      });

      it(`should detect element removal from complex array field`, () => {
        expect(changeEvents).to.include({
          id: `anotherObjectArrayField`,
          keyPath: `anotherObjectArrayField[1]`,
          index: 1,
          type: `deleted`,
          value: {
            id: 2,
            name: `Vodafone (must be removed)`,
          },
        });
      });
    });
  });
};

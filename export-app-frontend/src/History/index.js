import React from 'react';
import flatten from 'lodash/flatten';
import orderBy from 'lodash/orderBy';
import format from 'date-fns/format';
import { diff } from 'json-diff';

function reduceToDiff(log) {
  return Object.keys(log).map(id => log[id].reduce(
    (prev, curr, currIdx) => [
      ...prev,
      {
        ...log[id][currIdx],
        diff: diff(log[id][currIdx - 1], log[id][currIdx]),
      },
    ],
    [],
  ));
}

export default function ({ history = {} }) {
  const reduced = orderBy(
    flatten(reduceToDiff(history)),
    el => el.updatedAt.seconds,
    'desc',
  );

  return (
    <section>
      {reduced.map(item => (
        <pre
          style={{ padding: '24px', background: '#fff', marginBottom: '20px' }}
        >
          {item.id}
          {' '}
          {item.updatedBy}
          {' '}
          {format(item.updatedAt.seconds * 1000, 'Do MMM HH:mm:ss')}
          {' '}
          {item.kind === 'remove' && `removed this ${item.id}`}
          {' '}
          {item.diff.__new && `added this ${item.id}`}
          {item.diff.premium && (
            <>
              {'premium: '}
              {JSON.stringify(item.diff.premium.__old)}
              {' → '}
              {JSON.stringify(item.diff.premium.__new)}
            </>
          )}
          {item.diff.top3 && (
            <>
              {'top3: '}
              {JSON.stringify(item.diff.top3.__old)}
              {' → '}
              {JSON.stringify(item.diff.top3.__new)}
            </>
          )}
        </pre>
      ))}
    </section>
  );
}

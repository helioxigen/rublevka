import React from 'react';

export default (s = {}) => props => (
  <dl className={s.list}>
    <dt className={s.listTitle}>{props.title}</dt>
    {props.items.map((item, index) => <dd key={index} className={s.listItem}>{item}</dd>)}
  </dl>
);

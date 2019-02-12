import React from 'react';
import { Link } from 'react-router';

import s from 'cem/styles/ui/tabs';
import sUtils from 'cem/styles/utils';

export default props => (
  <div className={sUtils.scrollX}>
    <div className={s.tabsContainer}>
      {props.id !== 'create' && (
        <Link
          className={s.tab}
          activeClassName={s.active}
          to={`/deals/${props.id}/about`}
        >
          Информация
        </Link>
      )}
      {props.id !== 'create' && (
        <Link
          className={s.tab}
          activeClassName={s.active}
          to={`/deals/${props.id}/tasks`}
        >
          Задачи
        </Link>
      )}
    </div>
  </div>
);

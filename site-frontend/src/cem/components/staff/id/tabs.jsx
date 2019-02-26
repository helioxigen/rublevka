import React from 'react';
import { Link } from 'react-router';
import cn from 'classnames';

import s from 'cem/styles/ui/tabs';
import sUtils from 'cem/styles/utils';

export default ({ id, currentUserId }) => (
  <div className={sUtils.scrollX}>
    <div className={cn(s.tabsContainer, sUtils.minWidthXs60)}>
      <Link
        className={s.tab}
        activeClassName={s.active}
        to={`/staff/${id}/about`}
      >
        Информация
      </Link>
      <Link
        className={s.tab}
        activeClassName={s.active}
        to={`/staff/${id}/subordinates`}
      >
        Подчиненные
      </Link>
      {Number(id) === currentUserId && (
        <Link
          className={s.tab}
          activeClassName={s.active}
          to={`/staff/${id}/notifications`}
        >
          Уведомления
        </Link>
      )}
    </div>
  </div>
);

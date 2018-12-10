import React from 'react';
import { Link } from 'react-router';

import cn from 'classnames';
import s from 'cem/styles/ui/tabs';
import sUtils from 'cem/styles/utils';

export default ({ id }) => (
  <div className={sUtils.scrollX}>
    <div className={cn(s.tabsContainer, sUtils.minWidthXs60)}>
      <Link className={s.tab} activeClassName={s.active} to={`/contacts/${id}/about`}>Информация</Link>
      <Link className={s.tab} activeClassName={s.active} to={`/contacts/${id}/properties`}>Объекты</Link>
      <Link className={s.tab} activeClassName={s.active} to={`/contacts/${id}/deals`}>Сделки</Link>
      <Link className={s.tab} activeClassName={s.active} to={`/contacts/${id}/client_leads`}>Лиды</Link>
      <Link className={s.tab} activeClassName={s.active} to={`/contacts/${id}/tasks`}>Задачи</Link>
    </div>
  </div>
);

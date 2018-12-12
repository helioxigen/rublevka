import React from 'react';
import { Link } from 'react-router';

import cn from 'classnames';
import s from 'cem/styles/ui/tabs';
import sUtils from 'cem/styles/utils';

export default ({ id }) => (
  <div className={sUtils.scrollX}>
    <div className={cn(s.tabsContainer, sUtils.minWidthXs60)}>
      {id !== 'create' && <Link className={s.tab} activeClassName={s.active} to={`/places/complexes/${id}/about`}>Информация</Link>}
      {id !== 'create' && <Link className={s.tab} activeClassName={s.active} to={`/places/complexes/${id}/photos`}>Фото</Link>}
    </div>
  </div>
);

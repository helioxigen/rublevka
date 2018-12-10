import React from 'react';
import { Link } from 'react-router';

import cn from 'classnames';
import s from 'cem/styles/ui/tabs';
import sUtils from 'cem/styles/utils';

export default ({ id, isDocumentsPreviewAndUpdateAllowed }) => (
  <div className={sUtils.scrollX}>
    <div className={cn(s.tabsContainer, sUtils.minWidthXs60)}>
      {id !== 'create' && <Link className={s.tab} activeClassName={s.active} to={`/places/complexes/buildings/${id}/about`}>Информация</Link>}
      {id !== 'create' && <Link className={s.tab} activeClassName={s.active} to={`/places/complexes/buildings/${id}/photos`}>Фото</Link>}
      {id !== 'create' && isDocumentsPreviewAndUpdateAllowed && <Link className={s.tab} activeClassName={s.active} to={`/places/complexes/buildings/${id}/documents`}>Документы</Link>}
      {id !== 'create' && <Link className={s.tab} activeClassName={s.active} to={`/places/complexes/buildings/${id}/properties`}>Объекты</Link>}
    </div>
  </div>

);

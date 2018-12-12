import React from 'react';
import { Link } from 'react-router';
import cn from 'classnames';

import s from 'cem/styles/ui/tabs';
import sUtils from 'cem/styles/utils';

export default ({ category, id, isDocumentsUploadAllowed, isSensitiveDataVisible, isHistoryVisible }) => (
  <div className={sUtils.scrollX}>
    <div className={cn(s.tabsContainer, sUtils.minWidthXs120Sm120)}>
      <Link className={s.tab} activeClassName={s.active} to={`/properties/${category}/${id}/about`}>Информация</Link>
      {id !== 'create' && (
        <Link className={s.tab} activeClassName={s.active} to={`/properties/${category}/${id}/photos`}>Фото и планировки</Link>
      )}
      {id !== 'create' && (isDocumentsUploadAllowed || isSensitiveDataVisible) && (
        <Link className={s.tab} activeClassName={s.active} to={`/properties/${category}/${id}/documents`}>Документы</Link>
      )}
      {id !== 'create' && (
        <Link className={s.tab} activeClassName={s.active} to={`/properties/${category}/${id}/tasks`}>Задачи</Link>
      )}
      {id !== 'create' && (
        <Link className={s.tab} activeClassName={s.active} to={`/properties/${category}/${id}/client_leads`}>Лиды</Link>
      )}
      {id !== 'create' && isHistoryVisible && (
        <Link className={s.tab} activeClassName={s.active} to={`/properties/${category}/${id}/history`}>История</Link>
      )}
      {id !== 'create' && (
        <Link className={s.tab} activeClassName={s.active} to={`/properties/${category}/${id}/marketing`}>Маркетинг</Link>
      )}
    </div>
  </div>
);

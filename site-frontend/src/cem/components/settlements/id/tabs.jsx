import React from 'react';
import { Link } from 'react-router';
import cn from 'classnames';

import s from 'cem/styles/ui/tabs';
import sUtils from 'cem/styles/utils';

export default ({ id, hasAnyRight }) => (
  <div className={sUtils.scrollX}>
    <div className={cn(s.tabsContainer, sUtils.minWidthXs60)}>
      {id !== 'create' && (
        <Link
          className={s.tab}
          activeClassName={s.active}
          to={`/places/settlements/${id}/about`}
        >
          Информация
        </Link>
      )}
      {id !== 'create' && (
        <Link
          className={s.tab}
          activeClassName={s.active}
          to={`/places/settlements/${id}/photos`}
        >
          Фото
        </Link>
      )}
      {id !== 'create' &&
        hasAnyRight(['settlement_documents', 'settlement_sensitive_data']) && (
          <Link
            className={s.tab}
            activeClassName={s.active}
            to={`/places/settlements/${id}/documents`}
          >
            Документы
          </Link>
        )}
      {id !== 'create' && (
        <Link
          className={s.tab}
          activeClassName={s.active}
          to={`/places/settlements/${id}/properties`}
        >
          Объекты
        </Link>
      )}
      {id !== 'create' && (
        <Link
          className={s.tab}
          activeClassName={s.active}
          to={`/places/settlements/${id}/seo`}
        >
          SEO
        </Link>
      )}
    </div>
  </div>
);

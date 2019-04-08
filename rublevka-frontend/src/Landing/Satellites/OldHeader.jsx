import React from 'react';

import global from 'window-or-global';

// UI
import UI from 'ui';

// styles
import cn from 'classnames';
import s from 'styles/landing/satellites/list';
import sUtils from 'styles/utils';

const isRublevka = global.config.domain === 'rublevka.ru';
const isRiga = global.config.domain === 'riga.ru';
const {
  Icon,
  Grid: { Row, Col },
} = UI;

export default () => (
  <Row>
    <Col xs="12" className={s.headerContainer}>
      {/* {(!isRublevka && !isRiga) && (
      <h2 className={s.titleXSm}>{global.config.banner.logo}</h2>
        )}
      {isRublevka && (
      <Icon className={s.icon} icon="rublevka" />
        )}
      {isRiga && (
      <Icon className={s.icon} icon="riga" />
        )} */}

      <p
        className={cn(
          s.textSm,
          (!isRublevka || !isRiga) && sUtils.pushedTopXs1_9Sm1_3Md2,
          (isRublevka || isRiga) && sUtils.pushedTopXs0Sm1_3Md2,
        )}
      >
        Начните поиск среди самых лучших домов {global.config.banner.route}
      </p>
    </Col>
  </Row>
);

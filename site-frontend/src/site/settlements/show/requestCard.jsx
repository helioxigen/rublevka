import React, { Component } from 'react';
import global from 'window-or-global';

import StaticMask from 'core/components/ui/staticMask';

import RequestModal from 'site/request/selectionModal';
import UI from 'site/ui';
const {
  Button,
  Grid: { Col },
} = UI;

import s from 'site/styles/components/card';
import sUtils from 'site/styles/utils';

class RequestCard extends Component {
  render() {
    return (
      <Col xs="12" sm="6" md="4" className={sUtils.hideXs}>
        <div className={s.cardRequest}>
          <p className={s.cardRequestTitle}>Поможем выбрать дом</p>
          <a href={`tel:${global.config.phones.country}`} id="comagicDTPhoneNumber" className={s.textLg}>
            <StaticMask pattern="+1 (111) 111-11-11">
              {global.config.phones.country}
            </StaticMask>
          </a>

          <div className={s.divider}>
            <p className={s.textSm}>Или закажите звонок</p>

            <RequestModal category="country">
              <Button className={s.btn} kind="success" size="sm">Заказать звонок</Button>
            </RequestModal>
          </div>
        </div>
      </Col>
    );
  }
}

export default RequestCard;

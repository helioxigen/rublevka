import React, { Component } from 'react';
import global from 'window-or-global';

import StaticMask from 'core/components/ui/staticMask';
import RequestModal from 'site/request/selectionModal';
import UI from 'site/ui';
const {
  Button,
  Grid: { Row, Col },
} = UI;

import cn from 'classnames';
import s from 'site/styles/components/request';
import sUtils from 'site/styles/utils';

class LandingRequest extends Component {
  state = {
    isOpened: false,
  };

  toggleModal(isOpened) {
    this.setState({
      isOpened,
    });
  }

  render() {
    return (
      <Row xs="center" className={cn(s.mainContainer)}>
        <Col xs="12" className={s.zIndex3}>
          <h2 className={s.titleLg}>Поможем выбрать дом</h2>
          <a className={cn(s.titleMd, sUtils.pushedTopXs_4Sm0)} href={`tel:+${global.config.phones.country}`} id="comagicDTPhoneNumber">
            <StaticMask pattern="+1 (111) 111-11-11">
              {global.config.phones.country}
            </StaticMask>
          </a>
          <p className={cn(s.text, sUtils.pushedTop3_5)}>Или мы вам перезвоним</p>

          <RequestModal category="country">
            <Button className={cn(s.btn, sUtils.pushedTop1_5)} kind="success" size="lg">Заказать звонок</Button>
          </RequestModal>
        </Col>
      </Row>
    );
  }
}

export default LandingRequest;

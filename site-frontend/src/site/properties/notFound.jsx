import React, { Component } from 'react';
import global from 'window-or-global';

import StaticMask from 'core/components/ui/staticMask';
import RequestModal from 'site/request/selectionModal';
import UI from 'site/ui';
const {
  Button,
  Grid: { Container, Row, Col },
} = UI;

import cn from 'classnames';
import s from 'site/styles/components/request';
import sUtils from 'site/styles/utils';

class NotFound extends Component {
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
      <Container fluid className={cn(s.negativeMarginTop)}>
        <Row xs="center" className={cn(s.mainContainer, s.padding3_0)}>
          <Col xs="12" className={s.zIndex3}>
            <h2 className={cn(s.titleMd, s.light)}>
              На сайте нет таких объектов
            </h2>
            <p className={s.textMd}>Подберем из закрытых предложений?</p>
            <a
              className={cn(s.titleMd, sUtils.pushedTopXs3Sm1_5)}
              href={`tel:+${global.config.phones.country}`}
              id="comagicDTPhoneNumber"
            >
              <StaticMask pattern="+1 (111) 111-11-11">
                {global.config.phones.country}
              </StaticMask>
            </a>

            <div>
              <RequestModal category="country">
                <Button
                  className={cn(s.btn, sUtils.pushedTopXs2Sm5)}
                  kind="success"
                  size="lg"
                >
                  Заказать звонок
                </Button>
              </RequestModal>
              <Button
                className={cn(s.btnRound, sUtils.pushedTopXs2Sm5)}
                onClick={this.props.resetFilter}
              >
                Сбросить фильтр
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default NotFound;

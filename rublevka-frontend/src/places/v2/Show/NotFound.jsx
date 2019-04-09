import React, { Component } from 'react';
import global from 'window-or-global';

import { Link } from 'react-router';

import StaticMask from 'core/components/ui/staticMask';
import RequestModal from 'request/selectionModal';
import UI from 'ui';

import cn from 'classnames';
import s from 'styles/components/request';
import sUtils from 'styles/utils';

import styled from 'styled-components';
import media from 'styles/media';

const {
  Button,
  Grid: { Container, Row, Col },
} = UI;

export const StLink = styled(Link)`
  color: #000;
  display: inline-block;
  margin-top: 5rem;
  padding: 1.6rem 4.5rem;
  font-size: 1.8rem;
  background: ${p => p.theme.brandWhite};
  border-color: ${p => p.theme.brandWhite};
  border-radius: 10rem;
  vertical-align: bottom;
  &:hover,
  &:focus {
    background: ${p => p.theme.bodyBg};
    border-color: ${p => p.theme.bodyBg};
  }
  ${media.sm`
    font-size: 2rem;
    margin-left: 2rem;
  `};
`;

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
    const { place, dealType, translatedPlaceKind } = this.props;

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
                <Button className={s.btn} kind="success" size="lg">
                  Заказать звонок
                </Button>
              </RequestModal>
              {/* <Button
                className={cn(s.btnRound, sUtils.pushedTopXs2Sm5)}
                onClick={this.props.resetFilter}
              >
                Сбросить фильтр
              </Button> */}
              <StLink
                to={`/zagorodnaya/${translatedPlaceKind}/${place}/${dealType}`}
                onClick={this.props.resetFilter}
              >
                Сбросить фильтр
              </StLink>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default NotFound;

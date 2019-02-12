import React, { Component } from 'react';

import cn from 'classnames';

import { connect } from 'react-redux';
import { track } from 'core/analytics';

// constants
import { cloudfront } from 'core/config/resources';
import * as dict from 'site/constants/complexes/complexBuilding';
import events from 'site/constants/analytics/events';

// components
import { FormattedCurrency } from 'react-formatted';
import ByPropertyModal from 'site/request/byPropertyModal';
import CurrentDutyCard from 'site/currentDuty/card';

// ui
import UI from 'site/ui';
const {
  Button,
  Icon,
  Image,
  ParamList,
  CountIndicator,
  Visibility,
  Grid: { Container, Row, Col },
} = UI;

// styles
import s from 'site/styles/complexes/id/offers';
import sUtils from 'site/styles/utils';

class CardExtended extends Component {
  render() {
    const {
      data,
      specification,
      information,
      publicLayoutImages,
      cbData,
    } = this.props;
    const layoutImages = publicLayoutImages && !!publicLayoutImages.length;

    if (data && layoutImages) {
      return (
        <Container fluid className={s.descriptionContainer}>
          <Row>
            <Col md="5" className={sUtils.pushedBottomXs3}>
              <Image
                src={`${global.config.cloudfront || cloudfront}/${
                  publicLayoutImages[0].id
                }-thumbnail-512`}
                alt="Планировка"
                responsive
              />
            </Col>

            <Col md="7">
              <Row className={cn(s.dividerBottom, sUtils.pushedBottomXs3_5)}>
                <Col sm="6" md="12">
                  <h5 className={s.titleSm}>Квартира</h5>
                  <Row className={sUtils.pushedTop1_5}>
                    <Col md="6">
                      {specification && (
                        <ParamList label="Площадь:">
                          &nbsp;
                          {specification.totalArea
                            ? specification.totalArea
                            : '—'}{' '}
                          м²
                        </ParamList>
                      )}
                      {specification && !!specification.ceilHeight && (
                        <ParamList label="Высота потолков:">
                          &nbsp;{specification.ceilHeight} м
                        </ParamList>
                      )}
                      {information && (
                        <ParamList label="Ремонт:">
                          &nbsp;
                          {information.renovate
                            ? dict.renovate[information.renovate]
                            : '—'}
                        </ParamList>
                      )}
                      {information && (
                        <ParamList label="Вентиляция:">
                          &nbsp;
                          {information.ventilation
                            ? dict.ventilation[information.ventilation]
                            : '—'}
                        </ParamList>
                      )}
                    </Col>
                    {specification && (
                      <Col md="6">
                        <ParamList label="Санузел:">
                          &nbsp;{specification.wcs ? specification.wcs : '–'}
                        </ParamList>
                        <ParamList label="Балкон:">
                          &nbsp;
                          {specification.balconies
                            ? specification.balconies
                            : 'нет'}
                        </ParamList>
                        <ParamList label="Планировка:">
                          &nbsp;
                          {specification.layout
                            ? dict.layouts[specification.layout]
                            : '—'}
                        </ParamList>
                      </Col>
                    )}
                  </Row>
                </Col>

                {cbData && cbData.details && (
                  <Col sm="6" md="12" className={sUtils.pushedTopXs3Sm0Md3_7}>
                    <h5 className={s.titleSm}>Здание</h5>
                    <Row className={sUtils.pushedTop1}>
                      {cbData.details && (
                        <Col md="6">
                          <ParamList label="Количество лифтов:">
                            &nbsp;
                            {cbData.details.elevators
                              ? cbData.details.elevators
                              : '—'}
                          </ParamList>
                          <ParamList label="Мусоропровод:">
                            &nbsp;
                            {cbData.details.withRubbishChute ? 'есть' : '—'}
                          </ParamList>
                          <ParamList label="Паркинг:">
                            &nbsp;{cbData.details.parkings ? 'есть' : '—'}
                          </ParamList>
                        </Col>
                      )}
                      {cbData && cbData.details && (
                        <Col md="6">
                          <ParamList label="Подземный гараж:">
                            &nbsp;
                            {cbData.details.undergroundGarages ? 'есть' : '—'}
                          </ParamList>
                          <ParamList label="Безопасность:">
                            &nbsp;
                            {cbData.details.security
                              ? dict.security[cbData.details.security]
                              : '–'}
                          </ParamList>
                        </Col>
                      )}
                    </Row>
                  </Col>
                )}
              </Row>
              <Row className={sUtils.pushedTopXs3Sm5}>
                <Col xs="12">
                  <Row>
                    <Col sm={layoutImages ? '6' : '4'}>
                      <CurrentDutyCard
                        propertyCategory="city"
                        dontReplacePhoneNumber
                      />
                    </Col>
                    <Col sm={layoutImages ? '6' : '4'}>
                      <div className={sUtils.pushedTopXs3_5Sm0}>
                        <ByPropertyModal
                          propertyCategory="city"
                          propertyId={data.id}
                        >
                          <Button
                            className={sUtils.displayBlockXs}
                            size="xlg"
                            kind="success"
                            type="button"
                          >
                            Забронировать просмотр
                          </Button>
                        </ByPropertyModal>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            {!layoutImages && (
              <Col sm="4" className={sUtils.pushedTopXs3_5Sm0}>
                <CurrentDutyCard
                  propertyCategory="city"
                  dontReplacePhoneNumber
                />

                <div className={sUtils.pushedTopXs3_5Sm0}>
                  <ByPropertyModal propertyCategory="city" propertyId={data.id}>
                    <Button
                      className={sUtils.displayBlockXs}
                      size="xlg"
                      kind="success"
                      type="button"
                    >
                      Забронировать просмотр
                    </Button>
                  </ByPropertyModal>
                </div>
              </Col>
            )}
          </Row>
        </Container>
      );
    } else if (!layoutImages) {
      return (
        <Container fluid className={s.descriptionContainer}>
          <Row>
            <Col md="8">
              <Row className={cn(s.dividerBottomSm, sUtils.pushedBottomXs3_5)}>
                <Col sm="6">
                  <h5 className={s.titleSm}>Квартира</h5>
                  <Row className={sUtils.pushedTop1_5}>
                    <Col xs="12">
                      {specification && (
                        <ParamList label="Площадь:">
                          &nbsp;
                          {specification.totalArea
                            ? specification.totalArea
                            : '—'}{' '}
                          м²
                        </ParamList>
                      )}
                      {specification && !!specification.ceilHeight && (
                        <ParamList label="Высота потолков:">
                          &nbsp;{specification.ceilHeight} м
                        </ParamList>
                      )}
                      {information && (
                        <ParamList label="Ремонт:">
                          &nbsp;
                          {information.renovate
                            ? dict.renovate[information.renovate]
                            : '—'}
                        </ParamList>
                      )}
                      {information && (
                        <ParamList label="Вентиляция:">
                          &nbsp;
                          {information.ventilation
                            ? dict.ventilation[information.ventilation]
                            : '—'}
                        </ParamList>
                      )}
                    </Col>
                    {specification && (
                      <Col xs="12">
                        <ParamList label="Санузел:">
                          &nbsp;{specification.wcs ? specification.wcs : '–'}
                        </ParamList>
                        <ParamList label="Балкон:">
                          &nbsp;
                          {specification.balconies
                            ? specification.balconies
                            : 'нет'}
                        </ParamList>
                        <ParamList label="Планировка:">
                          &nbsp;
                          {specification.layout
                            ? dict.layouts[specification.layout]
                            : '—'}
                        </ParamList>
                      </Col>
                    )}
                  </Row>
                </Col>
                {cbData && (
                  <Col sm="6" className={sUtils.pushedTopXs3_5Sm0}>
                    <h5 className={s.titleSm}>Здание</h5>
                    <Row className={sUtils.pushedTop1}>
                      {cbData.details && (
                        <Col xs="12">
                          <ParamList label="Количество лифтов:">
                            &nbsp;
                            {cbData.details.elevators
                              ? cbData.details.elevators
                              : '—'}
                          </ParamList>
                          <ParamList label="Мусоропровод:">
                            &nbsp;
                            {cbData.details.withRubbishChute ? 'есть' : '—'}
                          </ParamList>
                          <ParamList label="Паркинг:">
                            &nbsp;{cbData.details.parkings ? 'есть' : '—'}
                          </ParamList>
                        </Col>
                      )}
                      {cbData.details && (
                        <Col xs="12">
                          <ParamList label="Подземный гараж:">
                            &nbsp;
                            {cbData.details.undergroundGarages ? 'есть' : '—'}
                          </ParamList>
                          <ParamList label="Безопасность:">
                            &nbsp;
                            {cbData.details.security
                              ? dict.security[cbData.details.security]
                              : '–'}
                          </ParamList>
                        </Col>
                      )}
                    </Row>
                  </Col>
                )}
              </Row>
            </Col>
            <Col md="4" className={sUtils.pushedTopXs3_5Sm0}>
              <Row>
                <Col sm="6" md="12">
                  <CurrentDutyCard
                    propertyCategory="city"
                    dontReplacePhoneNumber
                  />
                </Col>
                <Col sm="6" md="12">
                  <div className={sUtils.pushedTopXs3_5Sm0Md3_5}>
                    <ByPropertyModal
                      propertyCategory="city"
                      propertyId={data.id}
                    >
                      <Button
                        className={sUtils.displayBlockXs}
                        size="xlg"
                        kind="success"
                        type="button"
                      >
                        Забронировать просмотр
                      </Button>
                    </ByPropertyModal>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      );
    }
  }
}

class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpened: false,
    };
  }

  handleClick(propertyId, data) {
    if (!this.state.isOpened) {
      track({
        event: events.COMPLEXES_ID_PROPERTY_CARD_OPENED,
        complexId: data.complexId,
        complexName: data.complexName,
        propertyId,
      });
    }

    this.setState({ isOpened: !this.state.isOpened });
  }

  render() {
    const { isOpened } = this.state;

    const { id, state } = this.props;

    // property data
    const { data = {}, isFetching } = state.cityProperties[id] || {};
    const { specification = {}, information = {}, complexBuildingId } = data;

    const salePrice = data.saleOffer && data.saleOffer.multiCurrencyPrice.usd;
    const rentPrice = data.rentOffer && data.rentOffer.multiCurrencyPrice.usd;

    // linked complex building data
    const { data: cbData = {} } =
      state.complexBuildings[complexBuildingId] || {};

    if (!isFetching) {
      const publicLayoutImages = data.layoutImages.filter(
        image => !!image.isPublic,
      );

      return (
        <section>
          <div className={s.card} onClick={() => this.handleClick(id, data)}>
            <ul className={s.flexList}>
              {specification && specification.rooms && (
                <li
                  className={cn(
                    s.listItem,
                    sUtils.bold,
                    sUtils.minWidth27,
                    s.maxWidth12,
                  )}
                >
                  <Icon className={cn(s.icon, sUtils.hideXs)} icon="room" />
                  <span className={cn(s.textMd, s.paddingLeft3)}>
                    <CountIndicator
                      count={specification.rooms}
                      declensionForms={['комната', 'комнаты', 'комнат']}
                    />
                  </span>
                </li>
              )}
              {cbData.details && (
                <li className={cn(s.listItem, sUtils.hideXs, s.maxWidth12)}>
                  <Icon className={s.icon} icon="floor" />
                  <span className={cn(s.textMd, s.paddingLeft3)}>
                    {specification.floor ? specification.floor : '—'}/
                    {cbData.details.floors} этаж
                  </span>
                </li>
              )}
              {specification && (
                <li className={cn(s.listItem, sUtils.hideXs, s.maxWidth12)}>
                  <Icon className={s.icon} icon="square" />
                  <span className={cn(s.textMd, s.paddingLeft3)}>
                    {specification.totalArea ? specification.totalArea : '–'} м²
                  </span>
                </li>
              )}
              <li className={cn(s.listItem)}>
                <span className={cn(s.textMd, s.paddingLeft3)}>
                  <Icon className={cn(s.icon, sUtils.hideXs)} icon="dollar" />
                  {salePrice && (
                    <FormattedCurrency symbol="USD" value={salePrice} />
                  )}
                  {rentPrice && (
                    <span>
                      <FormattedCurrency symbol="USD" value={rentPrice} />
                      /месяц
                    </span>
                  )}
                </span>
              </li>
              <li
                className={cn(
                  s.listItem,
                  s.textMd,
                  sUtils.hideXsSm,
                  s.maxWidth13,
                )}
              >
                ID: {id}
              </li>
              <li className={cn(s.listItem, sUtils.alignRight)}>
                <Button
                  className={cn(s.btnPrimary, isOpened && s.active)}
                  kind="primary"
                  size="sm"
                  type="button"
                >
                  <Visibility xs="hidden" sm="hidden">
                    {(isOpened && 'Скрыть') || 'Показать'}
                  </Visibility>
                  <Icon className={s.iconArrow} icon="arrow-down" />
                </Button>
              </li>
            </ul>
          </div>
          {isOpened && (
            <CardExtended
              data={data}
              cbData={cbData}
              publicLayoutImages={publicLayoutImages}
              information={information}
              specification={specification}
            />
          )}
        </section>
      );
    }
  }
}

// redux connectors
const pickState = state => {
  const { cityProperties, complexBuildings } = state;

  return {
    state: {
      cityProperties,
      complexBuildings,
    },
  };
};

export default connect(pickState)(Card);

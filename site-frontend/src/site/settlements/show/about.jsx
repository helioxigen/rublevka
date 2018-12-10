import React, { Component } from 'react';
import Scroll from 'react-scroll';
import { Link } from 'react-router';

import { cloudfront } from 'core/config/resources';
import { nameToSlug } from 'core/helpers/nameToSlug';

import CurrentDutyCard from 'site/currentDuty/card';
import RequestModal from 'site/request/selectionModal';

import cn from 'classnames';
import UI from 'site/ui';
const { Icon, Button, Grid: { Container, Row, Col } } = UI;

import s from 'site/styles/settlements/id/about';
import st from 'site/styles/themes';
import sUtils from 'site/styles/utils';

function getImgUrl(publicImages) {
  if (publicImages.length) {
    return `url(${global.config.cloudfront || cloudfront}/${publicImages[0].id}-1024)`;
  } else if (typeof window !== 'undefined') {
    return 'url(https://s3.eu-central-1.amazonaws.com/dt-marketing/assets/placeholder-settlement.jpg)';
  }
}

export default class extends Component {
  render() {
    const { data = {} } = this.props;
    const { location = {} } = data;

    const publicImages = (data.images && data.images.filter(image => !!image.isPublic)) || [];
    const imgUrl = getImgUrl(publicImages);

    return (
      <section className={s.mainContainer} style={{ backgroundImage: imgUrl }}>
        <Container className={s.contentContainer}>
          <Row xs="center">
            <Col xs="10">
              {!!data.id && (
                <nav className={s.nav}>
                  <Link to={'/zagorodnaya/prodaja'} className={s.navItem}>
                    Загородная недвижимость
                  </Link>
                  <Link to={'/zagorodnaya/kottedzhnye-poselki'} className={s.navItem}>
                    <Icon className={s.iconArrow} icon="arrow-down" />
                    Посёлки
                  </Link>
                  {location.routeName && (
                    <Link
                      to={`/zagorodnaya/shosse/${nameToSlug(
                        location.routeName,
                      )}_${location.routeId}/prodaja`}
                      className={s.navItem}
                    >
                      <Icon className={s.iconArrow} icon="arrow-down" />
                      {location.routeName}&nbsp;ш.
                    </Link>
                  )}
                  {location.districtId && (
                    <Link
                      to={`/zagorodnaya/rayon/${nameToSlug(
                        location.districtName,
                      )}_${location.districtId}/prodaja`}
                      className={s.navItem}
                    >
                      <Icon className={s.iconArrow} icon="arrow-down" />
                      {location.districtName}
                    </Link>
                  )}
                  {location.localityId && (
                    <Link
                      to={`/zagorodnaya/nas-punkt/${nameToSlug(
                        location.localityName,
                      )}_${location.localityId}/prodaja`}
                      className={s.navItem}
                    >
                      <Icon className={s.iconArrow} icon="arrow-down" />
                      {location.localityName}
                    </Link>
                  )}
                </nav>
              )}
            </Col>

            <Col xs="12" sm="5">
              {!!data.id && (
                <div className={sUtils.pushedTopSm5_5}>
                  <div className={cn(s.flexContainer, s.flexLeft)}>
                    <div className={sUtils.fullWidth}>
                      <h1 className={s.title}>
                        Коттеджный посёлок <nobr>{data.name}</nobr>
                      </h1>

                      {!!location && (
                        <p className={s.subTitle}>
                          {location.routeName} ш., {location.mkadDistance} км
                        </p>
                      )}

                      <Row className={cn(sUtils.pushedTop4_5, sUtils.hideXs)}>
                        <Col lg="5">
                          <Scroll.Link
                            activeClass="active"
                            className={cn(st.settlement.anchor, sUtils.pushedRight4)}
                            to="scrollTo"
                            spy
                            smooth
                            offset={-80}
                            duration={600}
                          >
                            Информация о поселке
                          </Scroll.Link>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </div>
              )}
            </Col>

            <Col xs="5">
              {!!data.id && (
                <div className={cn(s.contacts, sUtils.hideXs)}>
                  <div className={cn(s.flexContainer, s.flexRight)}>
                    <div className={sUtils.fullWidth}>
                      <CurrentDutyCard propertyCategory="country" />

                      <Row className={cn(sUtils.pushedTop4_5, s.dividerTopXs)}>
                        <Col lg="5">
                          <RequestModal
                            propertyCategory={this.props.params && this.props.params.category}
                          >
                            <Button className={s.button} kind="success" size="sm">
                              Заказать звонок
                            </Button>
                          </RequestModal>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
}

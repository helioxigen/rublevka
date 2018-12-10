import React from 'react';
import { Link } from 'react-router';

import { cloudfront } from 'core/config/resources';
import { nameToSlug } from 'core/helpers/nameToSlug';

import cn from 'classnames';
import UI from 'site/ui';
import placesSeo from 'site/config/seo/places';

import s from 'site/styles/places/header.css';

const { Icon, BtnGroup, Button, Visibility, Grid: { Container, Row, Col } } = UI;

export default (props) => {
  const { data = {}, placeKind, translatedPlaceKind, dealType } = props;
  const { location = {} } = data || {};
  const propertyKind = props.kind || false;
  const isHaveMainImage = data && data.images && !!data.images.length;

  return (
    <section
      className={s.header}
      style={isHaveMainImage ? { backgroundImage: `url(${cloudfront}/${data.images[0].id})` } : {}}
    >
      <Container fluid>
        <div className={s.positionRelative}>
          <Visibility xs="hidden" sm="hidden">
            <nav className={s.pushedBottom1_5}>
              <Link to={'/zagorodnaya/prodaja'} className={s.navItem}>
                Загородная недвижимость
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
            </nav>
          </Visibility>
          <Container fluid>
            <h1 className={s.title}>{placesSeo[placeKind].show.h1(data, dealType)}</h1>

            <Row className={s.pushedBtnsGroup}>
              <Col xs="12">
                <BtnGroup className={cn(s.pushedBtns2, s.btnGroup)}>
                  <Button
                    className={cn(s.btn, props.dealType === 'sale' ? s.active : s.btn)}
                    size="md"
                    to={`/zagorodnaya/${translatedPlaceKind}/${nameToSlug(
                      data.name,
                    )}_${data.id}/prodaja${propertyKind ? `/${propertyKind}` : ''}`}
                  >
                    Продажа
                  </Button>
                  <Button
                    className={cn(s.btn, props.dealType === 'rent' ? s.active : s.btn)}
                    size="md"
                    to={`/zagorodnaya/${translatedPlaceKind}/${nameToSlug(
                      data.name,
                    )}_${data.id}/arenda${propertyKind ? `/${propertyKind}` : ''}`}
                  >
                    Аренда
                  </Button>
                </BtnGroup>
              </Col>
            </Row>
          </Container>
        </div>
      </Container>
    </section>
  );
};

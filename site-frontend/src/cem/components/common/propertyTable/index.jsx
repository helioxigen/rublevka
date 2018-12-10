import React, { Component } from 'react';
import { Link } from 'react-router';

import { idResourcer } from 'core/decorators/fetcher';

import * as dict from 'cem/constants/properties/dictionaries';

import UI from 'cem/components/ui';
const { Icon, Media, Image, Heading, ParamList, Grid: { Container, Row, Col } } = UI;
import { FormattedCurrency } from 'react-formatted';

import cn from 'classnames';
import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';

const PropertyImage = ({ src }) =>
  (<Image
    className={cn({ [s.imageProperties]: !src }, s.placeholder)}
    src={
      src
        ? `${src}-64`
        : 'https://s3.eu-central-1.amazonaws.com/dt-marketing/assets/placeholder-photo.svg'
    }
    kind="circle"
    width="64"
    height="64"
  />);

const PropertyDescription = ({ id, kind, saleOffer = {}, rentOffer = {} }) =>
  (<div>
    <h4 className={s.heading}>
      {dict.kinds[kind]}
    </h4>
    {saleOffer.price &&
      <p className={s.objectDescription}>
        Продажа:{' '}
        {saleOffer.price
          ? <FormattedCurrency symbol={saleOffer.currency} value={saleOffer.price} />
          : '—'}
      </p>}
    {rentOffer.price &&
      <p className={s.objectDescription}>
        Аренда:{' '}
        {rentOffer.price
          ? <FormattedCurrency symbol={rentOffer.currency} value={rentOffer.price} />
          : '—'}
      </p>}
    <p className={s.objectDescription}>
      ID: {id}
    </p>
  </div>);

const PropertyPreviewImage = ({ src }) =>
  src
    ? <Image src={`${src}-128`} kind="circle" width="114" height="114" />
    : <Icon className={s.placeholder} icon="placeholder" />;

const PropertyPreviewDescription = ({
  id,
  kind,
  category,
  state,
  specification = {},
  saleOffer = {},
  rentOffer = {},
  location = {},
  showAddress,
}) =>
  (<Container fluid>
    <Row>
      <Col sm="6" md="5" lg="4">
        <ParamList label="ID" big>
          {id}
        </ParamList>
      </Col>
      <Col sm="7" md="5" lg="4">
        <ParamList label="Тип" big>
          {dict.kinds[kind]}
        </ParamList>
      </Col>
      <Col sm="7" md="5" lg="4">
        <ParamList label="Статус" big>
          <span className={cn(s[dict.states[state] && dict.states[state].style])}>
            {dict.states[state] && dict.states[state].title}
          </span>
        </ParamList>
      </Col>
      {showAddress &&
        <Col sm="15" lg="7">
          <ParamList label="Адрес" big>
            {category === 'country' &&
              <span>
                {location.settlementId
                  ? <Link to={`/places/settlements/${location.settlementId}`}>
                    {location.settlementName}
                    {location.mkadDistance && `, ${location.mkadDistance} км`}
                  </Link>
                  : '—'}
              </span>}
            {category === 'city' &&
              <span>
                {location.street && `${location.street},`} {location.house}
              </span>}
          </ParamList>
        </Col>}
    </Row>
    <Row className={sUtils.pushedTop2}>
      <Col sm="6" md="5" lg="4">
        <ParamList label="Состояние" big>
          {dict.conditions[specification.condition] || '—'}
        </ParamList>
      </Col>
      <Col sm="7" md="5" lg="4">
        <ParamList label="Продажа" big>
          {saleOffer.price
            ? <FormattedCurrency symbol={saleOffer.currency} value={saleOffer.price} />
            : '—'}
        </ParamList>
      </Col>
      <Col sm="7" md="5" lg="4">
        <ParamList label="Аренда" big>
          {rentOffer.price
            ? <FormattedCurrency symbol={rentOffer.currency} value={rentOffer.price} />
            : '—'}
        </ParamList>
      </Col>
    </Row>
  </Container>);

class Property extends Component {
  static defaultProps = {
    isPreview: false,
  };

  render() {
    const { id, itemData, isPreview, showAddress, title = 'Объект' } = this.props;

    return (
      <section>
        <Heading size="md">
          {title}
          <Link className={s.linkIcon} to={`/properties/${itemData.category}/${id}`}>
            <Icon className={s.icon} icon="arrow" />
          </Link>
        </Heading>
        {!isPreview &&
          <Media
            left={
              <PropertyImage
                src={itemData.images && itemData.images[0] && itemData.images[0].url}
              />
            }
            body={<PropertyDescription {...itemData} />}
          />}
        {!!isPreview &&
          <Row>
            <Col xs="20">
              <Media
                left={
                  <PropertyPreviewImage
                    src={itemData.images && itemData.images[0] && itemData.images[0].url}
                  />
                }
                body={<PropertyPreviewDescription showAddress={showAddress} {...itemData} />}
              />
            </Col>
          </Row>}
      </section>
    );
  }
}

export default idResourcer({
  id: 'properties',
  linkedResourcesSchemes: [],
})(Property);

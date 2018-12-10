import React, { Component } from 'react';
import { Link } from 'react-router';

import UI from 'cem/components/ui';
const { Media, Image, Button, Icon, ParamList, Grid: { Container, Row, Col } } = UI;
import { FormattedCurrency } from 'react-formatted';

import cn from 'classnames';
import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';

import { idResourcer } from 'core/decorators/fetcher';

import * as dict from 'cem/constants/properties/dictionaries';

import { api } from 'core/config/constants';

const PropertyImage = ({ id }) => (
  <Image
    className={cn({ [s.imageProperties]: !id }, s.placeholder)}
    src={
      id ? (
        `${api.cloudfront}/${id}-thumbnail-128`
      ) : (
        'https://s3.eu-central-1.amazonaws.com/dt-marketing/assets/placeholder-photo.svg'
      )
    }
    kind="circle"
    width="64"
    height="64"
  />
);

const PropertyDescription = ({ id, kind, saleOffer = {}, rentOffer = {} }) => (
  <div>
    <h4 className={s.heading}>{dict.kinds[kind]}</h4>
    {saleOffer.price && (
      <p className={s.objectDescription}>
        Продажа:{' '}
        {saleOffer.price ? (
          <FormattedCurrency symbol={saleOffer.currency} value={saleOffer.price} />
        ) : (
          '—'
        )}
      </p>
    )}
    {rentOffer.price && (
      <p className={s.objectDescription}>
        Аренда:{' '}
        {rentOffer.price ? (
          <FormattedCurrency symbol={rentOffer.currency} value={rentOffer.price} />
        ) : (
          '—'
        )}
      </p>
    )}
    <p className={s.objectDescription}>ID: {id}</p>
  </div>
);

const PropertyPreviewImage = ({ id }) =>
  id ? (
    <Image src={`${api.cloudfront}/${id}-thumbnail-128`} kind="circle" width="114" height="114" />
  ) : (
    <Icon icon="placeholder" className={s.placeholder} />
  );

const PropertyPreviewDescription = ({
  id,
  kind,
  category,
  state,
  isStatic,
  handleDelete = () => {},
  specification = {},
  saleOffer = {},
  rentOffer = {},
}) => (
  <Container fluid>
    <Row>
      <Col sm="6" md="5" lg="4">
        <ParamList label="ID" big>
          {id}
          <Link className={s.linkIcon} to={`/properties/${category}/${id}`}>
            <Icon className={s.icon} icon="arrow" />
          </Link>
        </ParamList>
      </Col>
      <Col sm="7" md="5" lg="4">
        <ParamList label="Тип" big>
          {dict.kinds[kind]}
        </ParamList>
      </Col>
      <Col sm="7" md="5" lg="8">
        <ParamList label="Статус" big>
          <span className={cn(s[dict.states[state] && dict.states[state].style])}>
            {dict.states[state] && dict.states[state].title}
          </span>
        </ParamList>
      </Col>
      {!isStatic && (
        <Col sm="7" md="5" lg="4" className={sUtils.textRightMd}>
          <Button
            className={sUtils.resetPaddingRight}
            type="button"
            kind="danger"
            size="xs"
            onClick={handleDelete}
          >
            Удалить
          </Button>
        </Col>
      )}
    </Row>
    <Row className={sUtils.pushedTop2}>
      <Col sm="6" md="5" lg="4">
        <ParamList label="Состояние" big>
          {dict.conditions[specification.condition] || '—'}
        </ParamList>
      </Col>
      <Col sm="7" md="5" lg="4">
        <ParamList label="Продажа" big>
          {saleOffer.price ? (
            <FormattedCurrency symbol={saleOffer.currency} value={saleOffer.price} />
          ) : (
            '—'
          )}
        </ParamList>
      </Col>
      <Col sm="7" md="5" lg="8">
        <ParamList label="Аренда" big>
          {rentOffer.price ? (
            <FormattedCurrency symbol={rentOffer.currency} value={rentOffer.price} />
          ) : (
            '—'
          )}
        </ParamList>
      </Col>
    </Row>
  </Container>
);

class Property extends Component {
  static defaultProps = {
    isPreview: false,
  };

  render() {
    const { itemData, isPreview, showAddress, isStatic, handleDelete } = this.props;
    return Object.keys(itemData).length ? (
      <section className={sUtils.pushedBottom3}>
        {!isPreview && (
          <Media
            left={
              <PropertyImage id={itemData.images && itemData.images[0] && itemData.images[0].id} />
            }
            body={<PropertyDescription {...itemData} />}
          />
        )}
        {!!isPreview && (
          <Row>
            <Col xs="20">
              <Media
                left={
                  <PropertyPreviewImage
                    id={itemData.images && itemData.images[0] && itemData.images[0].id}
                  />
                }
                body={
                  <PropertyPreviewDescription
                    showAddress={showAddress}
                    isStatic={isStatic}
                    handleDelete={handleDelete}
                    {...itemData}
                  />
                }
              />
            </Col>
          </Row>
        )}
      </section>
    ) : null;
  }
}

export default idResourcer({
  id: 'properties',
  linkedResourcesSchemes: [],
})(Property);

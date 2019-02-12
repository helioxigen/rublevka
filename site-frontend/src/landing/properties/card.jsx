import React, { Component } from 'react';

import { connect } from 'react-redux';
import { cloudfront } from 'core/config/resources';

import { FormattedCurrency } from 'react-formatted';

import CardModal from 'landing/request/cardModal';

import s from 'landing/styles/properties/card';

import UI from 'site/ui';
const {
  Grid: { Col },
} = UI;

function getImgUrl(data) {
  const { images = [] } = data;
  const publicImages = images.filter(({ isPublic }) => !!isPublic);

  if (publicImages.length) {
    return `url(${global.config.cloudfront || cloudfront}/${
      publicImages[0].id
    }-thumbnail-512)`;
  } else if (typeof window !== 'undefined') {
    return 'url(https://s3.eu-central-1.amazonaws.com/dt-marketing/assets/placeholder.jpg)';
  }
}

class Card extends Component {
  render() {
    const { state, id } = this.props;
    const { countryProperties = {} } = state;
    const { data = {} } = countryProperties[id] || {};

    const {
      saleOffer = {},
      landDetails = {},
      specification = {},
      badge = {},
    } = data;
    const { multiCurrencyPrice = {} } = saleOffer;

    const imgUrl = getImgUrl(data);

    return (
      <Col xs="12" sm="6" md="4" lg="3" className={s.container}>
        <CardModal
          data={data}
          propertyCategory="country"
          propertyId={data.id}
          dealType="sale"
        >
          <div className={s.wrapper}>
            <div style={{ backgroundImage: imgUrl }} className={s.background} />

            {!!badge && !!badge.title && (
              <div className={s.badge} style={{ background: badge.color }}>
                {badge.title}
              </div>
            )}

            <div className={s.content}>
              <p className={s.price}>
                <FormattedCurrency
                  value={multiCurrencyPrice.usd}
                  symbol="USD"
                />
              </p>

              <p className={s.text}>
                <span>{Math.floor(landDetails.area)} сот.</span>

                {!!specification.totalArea && (
                  <span className={s.area}>
                    {Math.floor(specification.totalArea)} м²
                  </span>
                )}

                {!!specification.area && (
                  <span className={s.area}>
                    {Math.floor(specification.area)} м²
                  </span>
                )}
              </p>
            </div>
          </div>
        </CardModal>
      </Col>
    );
  }
}

// redux connectors
const pickState = state => {
  const { countryProperties } = state;

  return {
    state: {
      countryProperties,
    },
  };
};

export default connect(pickState)(Card);

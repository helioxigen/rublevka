import React, { Component } from 'react';
import { Link } from 'react-router';

import { connect } from 'react-redux';

import { cloudfront } from 'core/config/resources';

import { FormattedCurrency } from 'react-formatted';

import UI from 'site/ui';
const { Grid, CountIndicator } = UI;

import s from 'site/styles/components/card';
import sUtils from 'site/styles/utils';

import { nameToSlug } from 'core/helpers/nameToSlug';

function getImgUrl(data) {
  const { images = [] } = data;
  const publicImages = images.filter(({ isPublic }) => !!isPublic);

  if (publicImages.length) {
    return `url(${global.config.cloudfront || cloudfront}/${publicImages[0].id}-thumbnail-512)`;
  } else if (typeof window !== 'undefined') {
    return 'url(https://s3.eu-central-1.amazonaws.com/dt-marketing/assets/placeholder.jpg)';
  }
}

class Card extends Component {
  render() {
    const { data = {}, selectedCurrency } = this.props;
    const { statistics = {}, location = {} } = data;
    const { salePrice = { from: {} } } = statistics;

    const imgUrl = getImgUrl(data);

    return (
      <Grid.Col xs="12" sm="6" md="4">
        <Link
          to={`/zagorodnaya/kottedzhnye-poselki/${nameToSlug(data.name)}_${data.id}`}
          className={s.settlementCard}
        >
          <div className={sUtils.pushedBottom2}>
            <div className={s.images} style={{ backgroundImage: imgUrl }}>
              <div className={s.imageOverlay}>
                <p className={sUtils.fontSize7}>{statistics.totalProperties}</p>
                <p className={s.overlayText}>
                  <CountIndicator
                    count={statistics.totalProperties}
                    declensionForms={['предложение', 'предложения', 'предложений']}
                    numberHidden
                  />
                </p>

                {!!salePrice.from.usd && (
                  <p className={sUtils.pushedTop5}>
                    от{' '}
                    <FormattedCurrency
                      symbol={selectedCurrency.toUpperCase()}
                      value={salePrice.from[selectedCurrency]}
                    />
                  </p>
                )}
              </div>
            </div>
          </div>

          <div>
            <div>
              <h1 className={s.titleSettlement}>{data.name}</h1>
              <div className={s.locationSettlement}>
                <span className={s.subLocalitySettlement}>{location.routeName} ш.,&nbsp;</span>
                <span className={s.subLocalitySettlement}>{location.mkadDistance} км</span>
              </div>
            </div>
          </div>
        </Link>
      </Grid.Col>
    );
  }
}

// redux connectors
const pickState = ({ settlements, displayOptions }, { id }) => {
  const { data = {}, isFetching } = settlements[id];

  return {
    data,
    isFetching,
    selectedCurrency: displayOptions.currency,
  };
};

export default connect(pickState)(Card);

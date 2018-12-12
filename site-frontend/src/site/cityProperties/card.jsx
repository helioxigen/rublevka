import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';

import { Link } from 'react-router';

import { cloudfront } from 'core/config/resources';
import global from 'window-or-global';

import UI from 'site/ui';
const { Grid, Icon, Visibility } = UI;

import Price from './price';

import cn from 'classnames';
import s from 'site/styles/components/card';
import sUtils from 'site/styles/utils';

import { dealTypes, kindsTranslit } from 'site/constants/properties/dictionaries';

class Card extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
  };

  renderPhoto(data) {
    const { images = [] } = data;
    const publicImages = images.filter(({ isPublic }) => !!isPublic);

    if (publicImages.length) {
      return (
        <div
          className={s.images}
          style={{
            backgroundImage: `url(${global.config.cloudfront || cloudfront}/${publicImages[0]
              .id}-thumbnail-512)`,
          }}
        />
      );
    } else if (typeof window !== 'undefined') {
      return <Icon className={s.image} icon="placeholder" />;
    }
  }

  renderLocation(data) {
    if (this.props.showLocation) {
      const { location = {} } = data;

      return (
        <div className={s.location}>
          <p className={s.subLocality}>
            {!!location.subLocalityName && location.subLocalityName}&nbsp;
          </p>
          <p className={s.locality} title={location.street}>
            <span>
              <span className={s.textTruncate}>{location.street}</span>
              {!!location.house && ', '}
              <span className={s.percentageWidth}>{location.house}</span>
            </span>
          </p>
        </div>
      );
    }

    return null;
  }

  render() {
    const { id, state } = this.props;
    const dealType = dealTypes[this.props.dealType];
    const { data = {}, isFetching } = state.cityProperties[id] || {};
    const { badge = {} } = data;
    const deal = data[`${dealType}Offer`] || {};
    const selectedCurrency = state.displayOptions.currency;

    if (!isFetching) {
      return (
        <Grid.Col xs="12" sm="6" md="4">
          <Link
            className={cn(s.card, this.props.className)}
            to={`/gorodskaya/${this.props.dealType}/${kindsTranslit[data.kind]}/${data.id}`}
          >
            <div className={s.imageContainer}>
              {this.renderPhoto(data)}

              {!!badge && !!badge.title && (
                <div className={s.badge} style={{ background: badge.color }}>
                  {badge.title}
                </div>
              )}

              <Visibility md="hidden" lg="hidden">
                {this.renderLocation(data)}
              </Visibility>
            </div>

            <div className={s.descriptionContainer}>
              <Visibility xs="hidden" sm="hidden">
                {this.renderLocation(data)}
              </Visibility>

              <div className={s.pushedTopXs1_7_Sm2_5}>
                <dl className={s.list}>
                  <dd className={cn(s.listItem, sUtils.bold)}>
                    <Price selectedCurrency={selectedCurrency} deal={deal} dealType={dealType} />
                  </dd>
                </dl>
                {data.specification &&
                data.specification.rooms && (
                  <dl className={s.list}>
                    <dd className={s.listItem}>{data.specification.rooms} комн.</dd>
                  </dl>
                )}
                {data.specification &&
                data.specification.totalArea && (
                  <dl className={s.list}>
                    <dd className={s.listItem}>{Math.floor(data.specification.totalArea)} м²</dd>
                  </dl>
                )}
                {data.landDetails &&
                !!data.landDetails.area && (
                  <dl className={s.list}>
                    <dd className={s.listItem}>{Math.floor(data.landDetails.area)} сот</dd>
                  </dl>
                )}
                {data.specification &&
                !!data.specification.area && (
                  <dl className={s.list}>
                    <dd className={s.listItem}>{Math.floor(data.specification.area)} м²</dd>
                  </dl>
                )}
              </div>
            </div>
          </Link>
        </Grid.Col>
      );
    }

    return null;
  }
}

// redux connectors
const pickState = (state) => {
  const { cityProperties, displayOptions } = state;

  return {
    state: {
      cityProperties,
      displayOptions,
    },
  };
};

export default connect(pickState)(Card);

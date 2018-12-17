import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Link } from 'react-router';

import { cloudfront } from 'core/config/resources';

import global from 'window-or-global';

import UI from 'site/ui';

import Price from './show/price';

import cn from 'classnames';
import s from 'site/styles/components/card';
import sUtils from 'site/styles/utils';

import { dealTypes, kindsTranslit } from 'site/constants/properties/dictionaries';

const isJQ = global.config.domain === 'jq.estate';
const { Grid, Icon, Visibility } = UI;

class Card extends Component {
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

    return null;
  }

  renderLocation(data) {
    if (this.props.showLocation) {
      const { location = {} } = data;

      return (
        <div className={s.location}>
          <p className={cn(s.subLocality, s.settlementName)} title={isJQ && location.routeName}>
            {location.settlementName}
            <span className={sUtils.hideXsInline}>,</span>&nbsp;
          </p>
          <div className={s.subLocality}>
            <span title={isJQ && location.routeName}>
              {isJQ && location.routeName && `${location.routeName} ш.`}&nbsp;
            </span>
            <span title={isJQ && location.routeName}>
              {!!location.mkadDistance && `${location.mkadDistance} км.`}
            </span>
          </div>
        </div>
      );
    }

    return null;
  }

  render() {
    const { data = {}, isFetching } = this.props;
    const dealType = dealTypes[this.props.dealType];
    const { specification = {}, landDetails = {}, badge = {} } = data;
    const deal = data[`${dealType}Offer`] || {};

    if (!isFetching) {
      return (
        <Grid.Col xs="12" sm="6" md="4">
          <Link
            className={cn(s.card, this.props.className, s.paddingBottomSm2)}
            to={`/zagorodnaya/${this.props.dealType}/${kindsTranslit[data.kind]}/${data.id}`}
          >
            <div className={s.imageContainer}>
              {this.renderPhoto(data)}

              {!!badge && !!badge.title && (
                <div className={s.badge} style={{ background: badge.color }}>
                  {badge.title}
                </div>
              )}

              {this.props.showLocation && (
                <Visibility md="hidden" lg="hidden">
                  {this.renderLocation(data)}
                </Visibility>
              )}
            </div>

            <div className={cn(s.descriptionContainer, s.bottom1_8)}>
              {this.props.showLocation && (
                <Visibility xs="hidden" sm="hidden">
                  {this.renderLocation(data)}
                </Visibility>
              )}

              <p className={s.titleLg}>
                <Price deal={deal} dealType={dealType} />
              </p>

              <div className={s.pushedTopXs1Sm1_7}>
                <ul className={s.cardList}>
                  {!!landDetails.area && (
                    <li className={s.cardListItem}>
                      <Icon className={cn(s.cardListIcon, s.iconLand)} icon="area" />
                      {Math.floor(landDetails.area)} сот
                    </li>
                  )}

                  {!!specification.totalArea && (
                    <li className={s.cardListItem}>
                      <Icon className={cn(s.cardListIcon, s.iconHouse)} icon="house" />
                      {Math.floor(specification.totalArea)} м²
                    </li>
                  )}

                  {!!specification.area && (
                    <li className={s.cardListItem}>
                      <Icon className={cn(s.cardListIcon, s.iconHouse)} icon="house" />
                      {Math.floor(specification.area)} м²
                    </li>
                  )}
                  <li className={s.cardListItem} />
                </ul>
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
const pickState = (state, { id }) => {
  const { countryProperties } = state;
  const { data = {}, isFetching } = countryProperties[id] || {};

  return {
    data,
    isFetching,
  };
};

export default connect(pickState)(Card);

import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Link } from 'react-router';
import { FormattedCurrency } from 'react-formatted';
import { cloudfront } from 'core/config/resources';

import cn from 'classnames';
import UI from 'site/ui';
const { Grid, Icon, CountIndicator } = UI;

import s from 'site/styles/complexes/card';
import sUtils from 'site/styles/utils';

import { nameToSlug } from 'core/helpers/nameToSlug';

class Card extends Component {
  renderPhoto() {
    const { id, state } = this.props;
    const { complexes } = state;

    const { data = {} } = complexes[id] || {};
    const { location = {} } = data;

    const publicLayoutImages =
      (data.images && data.images.filter(image => !!image.isPublic)) || [];

    return (
      <div className={s.imageContainer}>
        {!!publicLayoutImages.length && (
          <div
            className={s.images}
            style={{
              backgroundImage: `url(${global.config.cloudfront || cloudfront}/${
                data.images[0].id
              }-${global.config.postfix}-1024)`,
            }}
          />
        )}
        {!publicLayoutImages.length && (
          <Icon className={s.placeholder} icon="placeholder" />
        )}
      </div>
    );
  }

  render() {
    const { id, state } = this.props;
    const { complexes } = state;

    const { data = {} } = complexes[id] || {};
    const { location = {} } = data;

    return (
      <Grid.Col xs="12" className={s.pushedBottom}>
        <Link
          className={cn(s.card, this.props.className)}
          to={`/gorodskaya/zhilye-kompleksy/${nameToSlug(data.name)}_${id}`}
        >
          {this.renderPhoto()}
          <ul className={s.list}>
            <li className={s.listItem}>
              <h2 className={s.title}>{data.name}</h2>
            </li>

            <li className={s.listItem}>
              <p className={s.subTitle}>
                {location.subLocalityName ? `${location.subLocalityName},` : ''}
                &nbsp;{location.street && location.street}
              </p>
            </li>

            {!!data.statistics && (
              <li className={s.listItem}>
                <span className={s.textSm}>
                  {data.statistics.primaryPropertiesCount ? (
                    <CountIndicator
                      count={data.statistics.primaryPropertiesCount}
                      declensionForms={[
                        'предложение',
                        'предложения',
                        'предложений',
                      ]}
                    />
                  ) : (
                    ''
                  )}
                </span>
              </li>
            )}

            {!!data.statistics && !!data.statistics.primaryPrice.from.usd && (
              <li className={cn(s.listItem, sUtils.pushedTop_5)}>
                <span className={s.textMd}>
                  от{' '}
                  <FormattedCurrency
                    symbol="USD"
                    value={data.statistics.primaryPrice.from.usd}
                  />
                </span>
              </li>
            )}
          </ul>
        </Link>
      </Grid.Col>
    );
  }
}

// redux connectors
const pickState = state => {
  const { complexes } = state;

  return {
    state: {
      complexes,
    },
  };
};

export default connect(pickState)(Card);

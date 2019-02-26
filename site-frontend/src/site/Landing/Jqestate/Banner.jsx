import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// actions
import * as FilterActions from 'core/actions/filters';

import { push } from 'react-router-redux';
import { Link } from 'react-router';

// styles
import cn from 'classnames';
import sUtils from 'site/styles/utils';
import s from 'site/styles/landing/jqestate/list';

class Landing extends Component {
  render() {
    const { stats = {} } = this.props.state;
    const { country = {}, city = {} } = stats;

    const countrySale = country.sale || {};
    const countryRent = country.rent || {};

    const citySale = city.sale || {};
    const cityRent = city.rent || {};

    return (
      <section className={sUtils.hideXsSm}>
        <div className={s.desktopBannerContainer}>
          <div className={cn(s.bannerCountry, s.skew)}>
            <div
              className={s.bannerBackground}
              style={{
                backgroundImage:
                  'url(https://s3.eu-central-1.amazonaws.com/dt-marketing/hero-images/rublevskoe.jpg)',
              }}
            />
            <div className={s.bannerContent}>
              <p className={s.title}>Загородная недвижимость</p>

              <div className={s.filter}>
                <div className={s.filterSale}>
                  <Link className={s.filterTitle} to="/zagorodnaya/prodaja">
                    Купить
                  </Link>

                  <Link className={s.filterItem} to="/zagorodnaya/prodaja/dom">
                    Дома{' '}
                    <span className={s.filterNumber}>{countrySale.house}</span>
                  </Link>
                  <Link
                    className={s.filterItem}
                    to="/zagorodnaya/prodaja/taunhaus"
                  >
                    Таунхаусы{' '}
                    <span className={s.filterNumber}>
                      {countrySale.townhouse}
                    </span>
                  </Link>
                  <Link
                    className={s.filterItem}
                    to="/zagorodnaya/prodaja/kvartira"
                  >
                    Квартиры{' '}
                    <span className={s.filterNumber}>{countrySale.flat}</span>
                  </Link>
                  <Link
                    className={s.filterItem}
                    to="/zagorodnaya/prodaja/uchastok"
                  >
                    Участки{' '}
                    <span className={s.filterNumber}>{countrySale.land}</span>
                  </Link>
                </div>

                <div className={s.filterRent}>
                  <Link className={s.filterTitle} to="/zagorodnaya/arenda">
                    Снять
                  </Link>

                  <Link className={s.filterItem} to="/zagorodnaya/arenda/dom">
                    Дома{' '}
                    <span className={s.filterNumber}>{countryRent.house}</span>
                  </Link>
                  <Link
                    className={s.filterItem}
                    to="/zagorodnaya/arenda/taunhaus"
                  >
                    Таунхаусы{' '}
                    <span className={s.filterNumber}>
                      {countryRent.townhouse}
                    </span>
                  </Link>
                  <Link
                    className={s.filterItem}
                    to="/zagorodnaya/arenda/kvartira"
                  >
                    Квартиры{' '}
                    <span className={s.filterNumber}>{countryRent.flat}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className={cn(s.bannerCity, s.skew)}>
            <div
              className={s.bannerBackground}
              style={{
                backgroundImage:
                  'url(https://s3.eu-central-1.amazonaws.com/dt-marketing/assets/city-bg.jpg)',
              }}
            />
            <div className={s.bannerContent}>
              <p className={s.title}>Городская недвижимость</p>

              <div className={s.filter}>
                <div className={s.filterSale}>
                  <Link className={s.filterTitle} to="/gorodskaya/prodaja">
                    Купить
                  </Link>

                  <Link
                    className={s.filterItem}
                    to="/gorodskaya/prodaja/kvartira"
                  >
                    Квартиры{' '}
                    <span className={s.filterNumber}>{citySale.flat}</span>
                  </Link>
                  <Link
                    className={s.filterItem}
                    to="/gorodskaya/prodaja/apartamenty"
                  >
                    Апартаменты{' '}
                    <span className={s.filterNumber}>{citySale.apartment}</span>
                  </Link>
                  <Link
                    className={s.filterItem}
                    to="/gorodskaya/prodaja/penthaus"
                  >
                    Пентхаусы{' '}
                    <span className={s.filterNumber}>{citySale.penthouse}</span>
                  </Link>
                </div>

                <div className={s.filterRent}>
                  <Link className={s.filterTitle} to="/gorodskaya/arenda">
                    Снять
                  </Link>

                  <Link
                    className={s.filterItem}
                    to="/gorodskaya/arenda/kvartira"
                  >
                    Квартиры{' '}
                    <span className={s.filterNumber}>{cityRent.flat}</span>
                  </Link>
                  <Link
                    className={s.filterItem}
                    to="/gorodskaya/arenda/apartamenty"
                  >
                    Апартаменты{' '}
                    <span className={s.filterNumber}>{cityRent.apartment}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

// redux connectors
const pickState = state => {
  const { stats } = state;

  return {
    state: {
      stats,
    },
  };
};

const pickActions = dispatch => {
  const actions = {
    push,
    ...FilterActions,
  };

  return {
    actions: bindActionCreators(actions, dispatch),
  };
};

export default connect(
  pickState,
  pickActions,
)(Landing);

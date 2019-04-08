import React, { Component } from 'react';

import { Link } from 'react-router';

import { cloudfront } from 'core/config/resources';

import { FormattedCurrency } from 'react-formatted';

import UI from 'ui';
const {
  Icon,
  CountIndicator,
  Visibility,
  Grid: { Row, Col },
} = UI;

import cn from 'classnames';
import s from 'styles/complexes/id/banner';
import sUtils from 'styles/utils';

import * as dict from 'constants/complexes/complexBuilding';

class Banner extends Component {
  render() {
    const { data } = this.props;
    const { location = {} } = data;

    const publicImages =
      (data.images && data.images.filter(image => !!image.isPublic)) || [];

    return (
      <Row sm="center">
        <div
          className={s.banner}
          style={{
            backgroundImage: publicImages.length
              ? `url(${global.config.cloudfront || cloudfront}/${
                  publicImages[0].id
                }-${global.config.postfix}-1024)`
              : `url(${global.config.banner.image})`,
          }}
        />

        <Col xs="12">
          <div className={s.contentContainer}>
            <Row>
              <Col xs="12">
                <Visibility xs="hidden">
                  <nav className={sUtils.pushedTop3_5}>
                    <Link to={'/gorodskaya/prodaja'} className={s.link}>
                      Городская недвижимость
                      <Icon className={s.iconXs} icon="arrow-down" />
                    </Link>
                    <Link
                      to={'/gorodskaya/zhilye-kompleksy'}
                      className={s.link}
                    >
                      Жилые комплексы
                      {/* <Icon className={s.iconXs} icon="arrow-down" />*/}
                    </Link>

                    {/* <span className={s.link}>{item && item.name}</span>*/}
                  </nav>
                </Visibility>
              </Col>
              <Col xs="12" className={sUtils.pushedTopXs5_2Sm6_4}>
                <h2 className={s.titleLg}>{data.name || ''}</h2>
                <p className={s.text}>
                  {location.subLocalityName && (
                    <span>{location.subLocalityName}, </span>
                  )}
                  {location.street && <span>{location.street}, </span>}
                  {location.house || ''}
                </p>

                <div className={sUtils.pushedTop3}>
                  <h3 className={s.titleMd}>
                    {data.statistics && (
                      <CountIndicator
                        count={data.statistics.primaryPropertiesCount}
                        declensionForms={[
                          'предложение',
                          'предложения',
                          'предложений',
                        ]}
                      />
                    )}
                    &nbsp;
                    {!!data.statistics &&
                      !!data.statistics.primaryPrice.from.usd && (
                        <span>
                          от{' '}
                          <FormattedCurrency
                            symbol="USD"
                            value={data.statistics.primaryPrice.from.usd}
                          />
                        </span>
                      )}
                  </h3>
                </div>
              </Col>
              {data.details && data.details.constructionStage && (
                <Col xs="12" className={sUtils.pushedTopXs4_5Sm6_4}>
                  <span className={cn(s.label, s.primary)}>
                    {dict.constructionStages[data.details.constructionStage]}
                  </span>
                </Col>
              )}
            </Row>
          </div>
        </Col>
      </Row>
    );
  }
}

export default Banner;

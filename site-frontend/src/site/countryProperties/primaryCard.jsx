import React, { Component } from 'react';

import { connect } from 'react-redux';

import { cloudfront } from 'core/config/resources';

import * as dict from 'site/constants/places/index';

import PrimaryCardModal from 'site/request/primaryCardModal';

import cn from 'classnames';
import UI from 'site/ui';
import Price from './show/price';

import s from 'site/styles/settlements/id/properties';
import st from 'site/styles/themes';
import sUtils from 'site/styles/utils';

const { Visibility, CountIndicator, Grid: { Container, Row, Col } } = UI;

function getImgUrl(data) {
  const { images = [], kind } = data;
  const publicImages = images.filter(image => !!image.isPublic);

  if (publicImages.length) {
    return `url(${global.config.cloudfront || cloudfront}/${publicImages[0].id}-thumbnail-256)`;
  } else if (typeof window !== 'undefined' && kind === 'land') {
    return 'url(https://s3.eu-central-1.amazonaws.com/dt-marketing/assets/placeholder-land.png)';
  } else if (typeof window !== 'undefined') {
    return 'url(https://s3.eu-central-1.amazonaws.com/dt-marketing/assets/placeholder-house.png)';
  }
}

class Card extends Component {
  render() {
    const { id, data = {}, isFetching, dealType } = this.props;
    const { specification = {}, landDetails = {} } = data;
    const { landscapeKind = [] } = landDetails;

    const deal = data[`${dealType}Offer`] || {};

    const imgUrl = getImgUrl(data);

    if (!isFetching) {
      return (
        <PrimaryCardModal propertyId={id} dealType="sale">
          <section className={s.card}>
            <Visibility xs="hidden" sm="hidden" md="hidden" className={sUtils.fullWidth}>
              <Container fluid>
                <Row>
                  <Col sm="1">
                    <div className={s.image} style={{ backgroundImage: imgUrl }} />
                  </Col>

                  <Col sm="3" md="2">
                    <p className={s.textMd}>{dict.kinds[data.kind]}</p>
                  </Col>

                  <Col md="2" className={sUtils.hideXsSm}>
                    <p className={s.textMd}>
                      <CountIndicator
                        count={Math.round(landDetails.area)}
                        declensionForms={['сотка', 'сотки', 'соток']}
                      />
                    </p>
                  </Col>

                  <Col md="2" className={sUtils.hideXsSm}>
                    {data.kind !== 'land' && (
                      <p className={s.textMd}>
                        <CountIndicator
                          count={specification.bedrooms}
                          declensionForms={['спальня', 'спальни', 'спален']}
                        />
                      </p>
                    )}

                    {data.kind === 'land' && (
                      <p className={s.textMd}>{dict.landscapeKinds[landscapeKind[0]]}</p>
                    )}
                  </Col>

                  <Col md="2" className={sUtils.hideXsSm}>
                    <p className={s.textMd}>ID: {data.id}</p>
                  </Col>

                  <Col sm="5" md="3">
                    <p className={st.settlement.price}>
                      <Price deal={deal} dealType={dealType} />
                    </p>
                  </Col>
                </Row>
              </Container>
            </Visibility>

            <Visibility xs="hidden" sm="hidden" lg="hidden" className={sUtils.fullWidth}>
              <Container fluid>
                <Row>
                  <Col sm="1">
                    <div className={s.image} style={{ backgroundImage: imgUrl }} />
                  </Col>

                  <Col sm="3" md="2">
                    <div className={sUtils.pushedLeft1}>
                      <p className={s.textMd}>{dict.kinds[data.kind]}</p>

                      <p className={s.textMd}>
                        <CountIndicator
                          count={Math.round(landDetails.area)}
                          declensionForms={['сотка', 'сотки', 'соток']}
                        />
                      </p>
                    </div>
                  </Col>

                  <Col sm="3" md="2">
                    {data.kind !== 'land' && (
                      <p className={s.textMd}>
                        <CountIndicator
                          count={specification.bedrooms}
                          declensionForms={['спальня', 'спальни', 'спален']}
                        />
                      </p>
                    )}

                    {data.kind === 'land' && (
                      <p className={s.textMd}>{dict.landscapeKinds[landscapeKind[0]]}</p>
                    )}

                    <p className={cn(s.textMd, sUtils.hideFromMd)}>ID: {data.id}</p>
                  </Col>

                  <Col sm="5" md="3">
                    <p className={st.settlement.price}>
                      <Price deal={deal} dealType={dealType} />
                    </p>
                  </Col>
                </Row>
              </Container>
            </Visibility>

            <Visibility md="hidden" lg="hidden">
              <Container fluid>
                <Row xs="start">
                  <Col xs="12">
                    <p className={st.settlement.price}>
                      <Price deal={deal} dealType={dealType} />
                    </p>
                  </Col>

                  <Col xs="12">
                    <p className={s.textMd}>{dict.kinds[data.kind]}</p>
                  </Col>

                  <Col xs="12">
                    <span className={s.descriptionText}>
                      <CountIndicator
                        count={Math.round(landDetails.area)}
                        declensionForms={['сотка', 'сотки', 'соток']}
                      />
                    </span>

                    {data.kind !== 'land' && (
                      <span className={s.descriptionText}>
                        <CountIndicator
                          count={specification.bedrooms}
                          declensionForms={['спальня', 'спальни', 'спален']}
                        />
                      </span>
                    )}

                    {data.kind === 'land' && (
                      <span className={s.descriptionText}>
                        {dict.landscapeKinds[landscapeKind[0]]}
                      </span>
                    )}

                    <span className={s.descriptionText}>ID: {data.id}</span>
                  </Col>
                </Row>
              </Container>
            </Visibility>
          </section>
        </PrimaryCardModal>
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

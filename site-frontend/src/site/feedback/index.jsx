import React, { Component } from 'react';

import Helmet from 'react-helmet';
import { helmet } from 'site/config/seo';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { notify } from 'site/actions/email';
import { setSharedRetargetingKey } from 'site/retargeting/actions';

import { offices } from 'site/feedback/constants';

import MapComponent from 'site/ui/map';
import StaticMask from 'core/components/ui/staticMask';

import UI from 'site/ui';

import cn from 'classnames';
import s from 'site/styles/pages/feedback';
import sUtils from 'site/styles/utils';

const isJQ = global.config.domain === 'jqestate.ru';
const isRublevka = global.config.domain === 'rublevka.ru';
const isRiga = global.config.domain === 'riga.ru';

const {
  Grid: { Container, Row, Col },
} = UI;

const location = isJQ ? 'zhukovkaJQ' : 'zhukovka';

const marker = {
  lat: offices[location].latitude,
  lng: offices[location].longitude,
  icon: isJQ ? 'marker' : 'markerPurple',
};

const zhukovka = offices.zhukovka;

class FeedbackContainer extends Component {
  render() {
    return (
      <section>
        <Helmet
          title={helmet.pages.feedback.title}
          meta={[
            { name: 'description', content: helmet.pages.feedback.description },
            { name: 'keywords', content: helmet.pages.feedback.keywords },
          ]}
        />

        <div className={s.mapContainer}>
          <div className={s.wrapper}>
            <Container fluid>
              <Row>
                <Col xs="12" sm="6" md="5" lg="4" className={sUtils.resetPadding}>
                  <div className={cn(s.card, s.fullWidth)}>
                    <h2 className={sUtils.bold}>Офис в Жуковке</h2>
                    <div className={sUtils.pushedTop_1}>
                      {isJQ && (
                        <p className={s.address}>
                          Рублёво-Успенское шоссе, Жуковка,&nbsp;54&nbsp;Б,&nbsp;2&nbsp;этаж
                        </p>
                      )}

                      {isRublevka && (
                        <p className={s.address}>
                          Рублёво-Успенское шоссе, Жуковка, БЦ&nbsp;«Олимп»,&nbsp;1&nbsp;этаж
                        </p>
                      )}

                      {isRiga && (
                        <p className={s.address}>Рублёво-Успенское шоссе, Жуковка,&nbsp;71</p>
                      )}

                      {!isRublevka && !isRiga && (
                        <a className={sUtils.textBlack} href="tel:+74954324545">
                          <StaticMask pattern="+1 (111) 111-11-11">74954324545</StaticMask>
                        </a>
                      )}
                      {isRublevka && (
                        <a className={sUtils.textBlack} href="tel:+74954323322">
                          <StaticMask pattern="+1 (111) 111-11-11">74954323322</StaticMask>
                        </a>
                      )}
                      {isRiga && (
                        <a className={sUtils.textBlack} href="tel:+74954321313">
                          <StaticMask pattern="+1 (111) 111-11-11">74954321313</StaticMask>
                        </a>
                      )}
                      <a className={sUtils.textBlack} href={`mailto:info@${global.config.domain}`}>
                        <p>info@{global.config.domain}</p>
                      </a>
                    </div>
                  </div>
                </Col>
              </Row>

              <Row className={sUtils.hideFromSmNotBlock}>
                <MapComponent
                  center={[zhukovka.longitude, zhukovka.latitude]}
                  markers={[
                    {
                      lat: zhukovka.latitude,
                      lng: zhukovka.longitude,
                      icon: isJQ ? 'marker' : 'markerPurple',
                    },
                  ]}
                  container={<div className={s.mapContainer} />}
                  zoom={13}
                  isFullScreenDisabled
                />
              </Row>
            </Container>
          </div>

          <MapComponent
            center={[marker.lng, marker.lat]}
            markers={[marker]}
            container={<div className={cn(sUtils.mapContainer, sUtils.hideXs)} />}
            zoom={13}
            isFullScreenDisabled
          />
        </div>
      </section>
    );
  }
}

const pickState = () => ({});
const mapDispatch = dispatch => ({
  actions: bindActionCreators({ notify, setSharedRetargetingKey }, dispatch),
});

export default connect(
  pickState,
  mapDispatch,
)(FeedbackContainer);

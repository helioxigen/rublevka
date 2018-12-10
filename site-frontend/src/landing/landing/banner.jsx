import React, { Component } from 'react';
import Scroll from 'react-scroll';

import { cloudfront } from 'core/config/resources';

import s from 'landing/styles/landing/banner';

import UI from 'site/ui';
const {
  Grid: { Container, Row, Col },
} = UI;

function getImgUrl(publicImages) {
  if (publicImages.length) {
    return `url(${global.config.cloudfront || cloudfront}/${publicImages[0].id}-1024)`;
  } else if (typeof window !== 'undefined') {
    return '';
  }
}

class Banner extends Component {
  render() {
    const { data = {} } = this.props;

    const { location = {}, details = {} } = data;

    const publicImages = data.images && data.images.filter(image => !!image.isPublic) || [];
    const imgUrl = getImgUrl(publicImages);

    return (
      <div className={s.background} style={{ backgroundImage: imgUrl }}>
        <div className={s.overlay}>
          <div className={s.content}>
            <h1 className={s.title}>{data.name}</h1>
            <p className={s.subTitle}>загородный поселок премиум класса</p>

            <Scroll.Link activeClass="active" className={s.btn} to="properties" spy smooth offset={-50} duration={800}>
              Показать предложения
            </Scroll.Link>

            <Container fluid className={s.statContainer}>
              <Row xs="center">
                <Col md="10" lg="8">
                  <Container fluid>
                    <Row>
                      <Col xs="4" sm="3">
                        <div>
                          <p className={s.statNum}>56</p>
                          <p className={s.statTitle}>домов</p>
                        </div>
                      </Col>
                      <Col xs="4" sm="3">
                        <div>
                          <p className={s.statNum}>40</p>
                          <p className={s.statTitle}>участков</p>
                        </div>
                      </Col>
                      <Col xs="4" sm="3" className={s.hideXs}>
                        <div>
                          <p className={s.statNum}>{details.area}</p>
                          <p className={s.statTitle}>гектаров</p>
                        </div>
                      </Col>
                      <Col xs="4" sm="3">
                        <div>
                          <p className={s.statNum}>{location.mkadDistance}</p>
                          <p className={s.statTitle}>км от мкад</p>
                        </div>
                      </Col>
                    </Row>
                  </Container>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    );
  }
}

export default Banner;

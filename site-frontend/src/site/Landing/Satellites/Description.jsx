import React, { Component } from 'react';

import global from 'window-or-global';

import UI from 'site/ui';
const {
  Grid: { Container, Row, Col },
} = UI;

import cn from 'classnames';
import s from 'site/styles/landing/satellites/description';
import st from 'site/styles/themes';

import { declOfNum } from 'site/helpers';

class LandingDescription extends Component {
  render() {
    const { totalProperties } = this.props;

    const word = declOfNum(totalProperties, ['предложение', 'предложения', 'предложений']);

    return (
      <Container fluid>
        <Row className={cn(s.mainContainer)}>
          <Col xs="12">
            <Container>
              <Row>
                <Col xs="12">
                  <div className={s.flex}>
                    <div>
                      <p className={st.landing.text}>
                        <span className={s.boldXs}>{global.config.banner.title}</span>
                        {global.config.banner.subTitle}
                      </p>
                    </div>
                    <img className={s.image} src="https://s3.eu-central-1.amazonaws.com/dt-marketing/assets/landing-man.png" />
                  </div>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default LandingDescription;

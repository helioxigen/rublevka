import React, { Component } from 'react';

import UI from 'cem/components/ui';
const {
  Heading,
  Grid: { Container, Row, Col },
} = UI;

import s from 'cem/styles/components/header';

class Header extends Component {
  render() {
    return (
      <Container fluid>
        <div className={s.header}>
          <Row>
            <Col xs="20">
              <Heading size="lg">Личный кабинет</Heading>
            </Col>
          </Row>
        </div>
      </Container>
    );
  }
}

export default Header;

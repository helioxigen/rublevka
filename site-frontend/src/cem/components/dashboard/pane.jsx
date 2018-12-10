import React, { Component } from 'react';

import UI from 'cem/components/ui';
const {
  Heading,
  Grid: { Row, Col },
} = UI;

import sUtils from 'cem/styles/utils';

class Pane extends Component {
  render() {
    return (
      <Row>
        <Col xs="20">
          <Heading size="lg" className={sUtils.pushedBottom1}>{this.props.title}</Heading>
          {this.props.children}
        </Col>
      </Row>
    );
  }
}

export default Pane;

import React, { Component } from 'react';

import UI from 'cem/components/ui';
const { Grid: { Row } } = UI;

import AboutCity from './city';
import AboutCountry from './country';

export default class About extends Component {
  render() {
    const { params: { category } } = this.props;

    return (
      <Row>
        {category === 'city' && <AboutCity {...this.props} />}
        {category === 'country' && <AboutCountry {...this.props} />}
      </Row>
    );
  }
}

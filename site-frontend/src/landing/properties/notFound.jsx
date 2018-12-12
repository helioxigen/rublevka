import React, { Component } from 'react';

import UI from 'site/ui';
const {
  Button,
  Grid: { Row, Col },
} = UI;

import s from 'landing/styles/properties/filter';

class NotFound extends Component {
  render() {
    return (
      <Row xs="center" className={s.notFoundContainer}>
        <Col xs="12">
          <div>
            <p>По вашему запросу ничего не найдено.</p>

            <Button className={s.notFoundBtn} onClick={this.props.resetFilter}>Сбросить фильтр</Button>
          </div>
        </Col>
      </Row>
    );
  }
}

export default NotFound;

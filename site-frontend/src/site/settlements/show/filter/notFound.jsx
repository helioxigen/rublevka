import React, { Component } from 'react';

import UI from 'site/ui';
const {
  Button,
  Grid: { Row, Col },
} = UI;

import s from 'site/styles/settlements/id/properties';
import st from 'site/styles/themes';

class NotFound extends Component {
  render() {
    return (
      <Row xs="center" className={s.notFoundContainer}>
        <Col xs="12">
          <div>
            <span>По вашему запросу ничего не найдено.</span>
            <Button className={st.settlement.notFoundBtn} onClick={this.props.resetFilter}>Сбросить фильтр</Button>
          </div>
        </Col>
      </Row>
    );
  }
}

export default NotFound;

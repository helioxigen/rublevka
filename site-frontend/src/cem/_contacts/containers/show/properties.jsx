import React, { Component } from 'react';

import ItemsTable from 'cem/_contacts/components/properties/itemsTable';

import UI from 'cem/components/ui';

// styles
import s from 'cem/styles/id/content';

const {
  Grid: { Container, Row },
  } = UI;


class Properties extends Component {
  render() {
    return (
      <Container fluid>
        <Row>
          <section className={s.section}>
            <ItemsTable propertyCategory="country" id={this.props.id} />
            <ItemsTable propertyCategory="city" id={this.props.id} />
          </section>
        </Row>
      </Container>
    );
  }
}

export default Properties;

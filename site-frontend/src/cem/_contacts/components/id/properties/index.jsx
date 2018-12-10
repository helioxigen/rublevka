import React, { Component } from 'react';

import PropertyTable from './table';
import UI from 'cem/components/ui';
const {
  Heading,
  Grid: { Row },
} = UI;

import s from 'cem/styles/id/content';

export default class extends Component {
  componentWillMount() {
    this.props.actions.loadProperties({ filter: { linkedContactIds: this.props.id } });
  }

  render() {
    const { actions, state } = this.props;
    const { items: cityPropertyItems = [] } = state.properties['city.default'].list || {};
    const { items: countryPropertyItems = [] } = state.properties['country.default'].list || {};
    const propertyItems = [...cityPropertyItems, ...countryPropertyItems];

    return (
      <Row>
        <section className={s.section}>
          {!!propertyItems && !!propertyItems.length && <PropertyTable items={propertyItems} state={state} actions={actions} />}
          {!!propertyItems && !propertyItems.length && <Heading notFound>Нет связанных объектов</Heading>}
        </section>
      </Row>
    );
  }
}

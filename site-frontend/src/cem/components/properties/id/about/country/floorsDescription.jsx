import React, { Component } from 'react';

import { mapToFloor } from 'cem/helpers/properties';

import UI from 'cem/components/ui';
const {
  List, Heading,
  Grid: { Row, Col },
} = UI;

import sUtils from 'cem/styles/utils';

class FloorsDescription extends Component {
  render() {
    const { className, layouts = [] } = this.props;

    return (
      <section className={className}>
        <Row>
          <Col xs="20">
            <Heading size="md">Поэтажное описание</Heading>
          </Col>
        </Row>
        <Row>
          {layouts.filter(layoutItem => !!layoutItem.items && layoutItem.items.length > 0).map((layoutItem, index) =>
            (<Col key={index} sm="5" className={sUtils.pushedBottom3}>
              <List items={layoutItem.items} title={mapToFloor(layoutItem.kind, layoutItem.number).title} />
            </Col>),
          )}
          {!layouts.length &&
            <Col sm="20" className={sUtils.pushedBottom3}>
              <Heading notFound>Не указано</Heading>
            </Col>
          }
        </Row>
      </section>
    );
  }
}

export default FloorsDescription;

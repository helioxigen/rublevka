import React, { Component } from 'react';

import UI from 'cem/components/ui';
const {
  Heading,
  Grid: { Container, Row, Col },
  Form: { Group, Label, Input },
} = UI;

import filterHelper from 'core/decorators/filter';

class Filter extends Component {
  render() {
    const { fields } = this.props;

    return (
      <Container fluid>
        <Row>
          <Col>
            <Heading size="md">Фильтр</Heading>
            <Group>
              <Label>ID</Label>
              <Input block type="text" {...fields.propertyIds} />
            </Group>
          </Col>
        </Row>
      </Container>
    );
  }
}

const fields = ['propertyIds'];

export default filterHelper('exportPackages.errorLogs', fields)(Filter);

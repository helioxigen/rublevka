import React, { Component } from 'react';

import FormField from 'cem/helpers/formField';

import UI from 'cem/components/ui';
const {
  Heading,
  Grid: { Row, Col },
  Select,
} = UI;

class CianPremium extends Component {
  render() {
    const { fields, isUpdateAllowed } = this.props;

    return (
      <div>
        <Heading size="md">Премиум ЦИАН-а</Heading>
        <Row>
          <Col sm="6">
            <FormField
              label="Топ-3"
              field={fields.cianDetails.top}
              static={!isUpdateAllowed}
            >
              <Select multi allowCreate {...fields.cianDetails.top} />
            </FormField>
          </Col>
          <Col sm="6" smOffset="1">
            <FormField
              label="Премиум"
              field={fields.cianDetails.premium}
              static={!isUpdateAllowed}
            >
              <Select multi allowCreate {...fields.cianDetails.premium} />
            </FormField>
          </Col>
          <Col sm="6" smOffset="1">
            <FormField
              label="Выделение цветом"
              field={fields.cianDetails.highlight}
              static={!isUpdateAllowed}
            >
              <Select multi allowCreate {...fields.cianDetails.highlight} />
            </FormField>
          </Col>
        </Row>
      </div>
    );
  }
}

export default CianPremium;

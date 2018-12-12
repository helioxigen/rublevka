import React, { Component } from 'react';

import FormField from 'cem/helpers/formField';

import UI from 'cem/components/ui';
const {
  Heading, Loading,
  Grid: { Row, Col },
  Form: { Input },
} = UI;

class CompanyInfo extends Component {
  render() {
    const { fields, isUpdateAllowed, isFetching } = this.props;

    return (
      <div>
        <Heading size="md">Сведения о компании</Heading>
        <Row>
          <Col sm="6">
            <FormField label="Название" field={fields.companyName} static={!isUpdateAllowed}>
              <Input block type="text" />
            </FormField>
          </Col>
          <Col sm="7">
            {isFetching && <Loading />}
            {!isFetching &&
              <FormField label="Телефон" field={fields.companyPhoneNumber} static={!isUpdateAllowed}>
                <Input block type="tel" mask="+7 (111) 111-11-11" placeholder="+7 (___) ___ - __ - __" autoComplete="off" />
              </FormField>
            }
          </Col>
          <Col sm="7">
            <FormField label="Email" field={fields.companyEmail} static={!isUpdateAllowed}>
              <Input block type="text" autoComplete="off" />
            </FormField>
          </Col>
        </Row>
      </div>
    );
  }
}

export default CompanyInfo;

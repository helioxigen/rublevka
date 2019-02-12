import React, { Component } from 'react';

import TwoWordForm from 'cem/components/settings/twoWordForm';

import UI from 'cem/components/ui';
const {
  Table: { Container, Row, Heading },
} = UI;

import { reduxForm } from 'redux-form';
import validate from 'cem/validators/leadSources';
import submitValidator from 'core/decorators/submitValidator';
const formSettings = {
  form: 'settingsLeadSource',
  fields: ['id', 'title', 'slug'],
  validate,
};

const LeadSourceWordForm = reduxForm(formSettings)(
  submitValidator()(TwoWordForm),
);

class LeadSourcesList extends Component {
  render() {
    const { items, isCreationAllowed, isUpdateAllowed } = this.props;
    const actions = {
      create: this.props.actions.createLeadSourceId,
      update: this.props.actions.updateLeadSourceId,
      delete: this.props.actions.deleteLeadSourceId,
    };

    return (
      <Container width="100%">
        <Row>
          <Heading width="45%">Slug</Heading>
          <Heading width="45%">Название</Heading>
          <Heading width="10%">Действия</Heading>
        </Row>
        {isCreationAllowed && (
          <LeadSourceWordForm
            {...this.props}
            formKey="create"
            actions={actions}
            isUpdateAllowed
          />
        )}
        {items.map(item => (
          <LeadSourceWordForm
            {...this.props}
            key={item.id}
            formKey={item.id.toString()}
            initialValues={item}
            actions={actions}
            isUpdateAllowed={isUpdateAllowed}
          />
        ))}
      </Container>
    );
  }
}

export default LeadSourcesList;

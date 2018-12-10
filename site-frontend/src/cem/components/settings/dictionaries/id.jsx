import React, { Component } from 'react';
import UI from 'cem/components/ui';
import { reduxForm } from 'redux-form';
import submitValidator from 'core/decorators/submitValidator';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import WordForm from '../wordForm';
import DictionariesActions from 'cem/actions/settings/dictionaries/id';

import { formFields } from 'cem/constants/dictionaries';
import validate from 'cem/validators/dictionaries';

const {
  Table: { Heading, Row, Container },
} = UI;

const formSettings = {
  form: 'dictionaries',
  fields: formFields,
  validate,
};

const DictionaryWordForm = reduxForm(formSettings)(submitValidator()(WordForm));

class Words extends Component {
  render() {
    const { items, hasRight } = this.props;
    const actions = {
      create: this.props.actions.createWord,
      update: this.props.actions.updateWord,
      delete: this.props.actions.deleteWord,
    };

    return (
      <section>
        <Container width="100%">
          <Row>
            <Heading width="85%">Слово</Heading>
            <Heading width="15%">Действия</Heading>
          </Row>

          {hasRight('dictionary_item_create') && <DictionaryWordForm {...this.props} formKey="create" actions={actions} />}
          {items.map(item => <DictionaryWordForm {...this.props} key={item.id} formKey={item.id.toString()} initialValues={item} actions={actions} />)}
        </Container>
      </section>
    );
  }
}

const pickState = ({ dictionaries }) => ({
  state: { dictionaries },
});

const pickActions = dispatch => ({
  actions: bindActionCreators(DictionariesActions, dispatch),
});

export default connect(pickState, pickActions)(Words);

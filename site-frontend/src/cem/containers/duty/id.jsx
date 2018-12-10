import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DictionaryActions from 'cem/actions/settings/dictionaries/id';
import UserActions from 'cem/actions/users/id';

import ModalDutyForm from 'cem/components/duty/modalDutyForm';

import { prepareInitialValues } from 'cem/helpers/duty';

class DutyContainer extends Component {
  componentWillMount() {
    const { actions, params: { id } } = this.props;

    if (id !== 'create') {
      actions.loadTask(id);
    }
  }

  render() {
    const { actions, state, params: { id } } = this.props;
    const data = state.duty[id] || {};

    if (id === 'create' || data) {
      const formProps = {
        id,
        formKey: id,
        initialValues: prepareInitialValues({ formKey: id, data }),
        actions,
        state,
        data,
      };

      return (
        <section>
          <ModalDutyForm {...formProps} />
        </section>
      );
    }

    return null;
  }
}

const pickState = ({ duty, users, dictionary_items }) => ({
  state: { duty, users, dictionary_items },
});

const mapDispatch = dispatch => ({
  actions: bindActionCreators({ ...UserActions, ...DictionaryActions }, dispatch),
});

export default connect(pickState, mapDispatch)(DutyContainer);

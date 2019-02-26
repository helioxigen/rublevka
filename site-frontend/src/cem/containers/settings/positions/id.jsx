import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PositionsActions from 'cem/actions/settings/positions';

import UI from 'cem/components/ui';
const {
  Grid: { Container },
} = UI;

import PositionForm from 'cem/components/settings/positions/id/form';

import s from 'cem/styles/id/content';

class Position extends Component {
  componentWillMount() {
    this.props.actions.loadPosition(this.props.params.id);
  }

  render() {
    const {
      state,
      params: { id },
      hasRight,
    } = this.props;
    const { data, errors } = state.positions[id] || {};

    if (data && !errors) {
      return (
        <section className={s.section}>
          <Container fluid>
            <PositionForm
              {...this.props}
              initialValues={data}
              isUpdateAllowed={hasRight('role_update')}
            />
          </Container>
        </section>
      );
    }

    return null;
  }
}

const pickState = ({ positions }) => ({
  state: { positions },
});

const pickActions = dispatch => ({
  actions: bindActionCreators({ ...PositionsActions }, dispatch),
});

export default connect(
  pickState,
  pickActions,
)(Position);

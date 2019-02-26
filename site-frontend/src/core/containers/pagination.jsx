import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PaginationActions from 'core/actions/pagination';

import PaginationComponent from 'core/components/pagination';

class Pagination extends Component {
  onUpdate(offset = 0) {
    const { state, actions, onUpdate, kind } = this.props;
    const { total = 0, limit = 32 } = state.pagination[kind];
    const newPagination = { limit, offset, total };

    actions.updatePagination(kind, newPagination);
    if (onUpdate) onUpdate(newPagination);
  }

  render() {
    const { state, kind } = this.props;
    const paginationData = state.pagination[kind];

    return (
      <PaginationComponent {...paginationData} onUpdate={::this.onUpdate} />
    );
  }
}

const pickState = ({ pagination }) => ({
  state: { pagination },
});

const pickActions = dispatch => ({
  actions: bindActionCreators(PaginationActions, dispatch),
});

export default connect(
  pickState,
  pickActions,
)(Pagination);

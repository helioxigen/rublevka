import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ListErrorMessage from 'cem/components/common/listErrorMessage';

import UI from 'cem/components/ui';
const {
  Loading, Button, Heading,
  Grid: { Row, Col },
} = UI;

import CountIndicator from 'cem/components/common/countIndicator';

import LeadCard from 'cem/components/dashboard/cards/leadCard';

import LeadsActions from 'cem/actions/leads';

import sUtils from 'cem/styles/utils';
import sCard from 'cem/styles/dashboard/taskCard';

class LeadsList extends Component {
  componentWillMount() {
    const { actions, kind } = this.props;

    actions._loadLeads(kind, { pagination: { limit: 5 } });
  }

  handlePaginationUpdate(offset) {
    const { actions, kind, state } = this.props;

    const pagination = state.pagination[`leads.${kind}`] || {};

    actions._loadLeads(kind, { pagination: { offset, limit: pagination.limit } }, true);
  }

  render() {
    const { state, declensionForms, kind } = this.props;

    const pagination = state.pagination[`leads.${kind}`] || {};

    const { ids = [], isFetching, errors = [] } = state.leads.lists[kind];

    return (
      <Row className={sUtils.pushedBottom6}>
        <Col xs="20">
          <Heading size="sm" className={sUtils.fontSizeMd}>
            <span className={sUtils.alignMiddle}>
              <CountIndicator count={pagination.total} declensionForms={declensionForms} />
            </span>
          </Heading>
        </Col>
        <Col xs="20">
          {!isFetching && !!errors.length && <ListErrorMessage errors={errors} />}
          {!isFetching && !errors.length && !ids.length && <Heading notFound className={sUtils.resetIndent}>Лидов нет</Heading>}

          {ids.map(id =>
            <LeadCard key={id} data={state.leads[id].data} state={state} />,
          )}
          {isFetching && <Loading />}
          {!isFetching
            && pagination
            && pagination.total > pagination.limit
            && pagination.total > ids.length
            && (
              <Button size="md" className={sCard.button} onClick={() => this.handlePaginationUpdate(pagination.offset + pagination.limit)}>
                Загрузить ещё
              </Button>
            )
          }
        </Col>
      </Row>
    );
  }
}

const pickState = ({ leads, pagination }) => ({
  state: { leads, pagination },
});

const pickActions = dispatch => ({
  actions: bindActionCreators({ ...LeadsActions }, dispatch),
});

export default connect(pickState, pickActions)(LeadsList);

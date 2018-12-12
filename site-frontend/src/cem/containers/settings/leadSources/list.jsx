import React, { Component } from 'react';


import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LeadSourcesActions from 'cem/actions/settings/leadSources';
import PaginationActions from 'core/actions/pagination';

import UI from 'cem/components/ui';
const {
  Loading, Heading,
  Grid: { Container, Row, Col },
} = UI;

import LeadSourcesList from 'cem/components/settings/leadSources/list';
import Pagination from 'core/components/pagination';

import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';

class ListContainer extends Component {
  componentWillMount() {
    this.props.actions.loadLeadSources();
  }

  componentWillReceiveProps(nextProps) {
    const { state, actions } = this.props;

    const pagination = state.pagination[`leadSources`] || {};
    const nextPagination = nextProps.state.pagination[`leadSources`] || {};

    if (pagination.offset !== undefined && pagination.offset !== nextPagination.offset) {
      const { offset, limit } = nextPagination;

      actions.loadLeadSources({ pagination: { offset, limit } });
    }
  }

  handlePaginationUpdate(offset) {
    window.scrollTo(0, 0);

    this.props.actions.updatePagination(`leadSources`, { offset });
  }

  render() {
    const { state, hasRight } = this.props;
    const pagination = state.pagination[`leadSources`] || {};
    const { items = [], isFetching } = state.leadSources.list;

    const permissionsProps = {
      isCreationAllowed: hasRight(`client_lead_source_create`),
      isUpdateAllowed: hasRight(`client_lead_source_update`),
    };

    return (
      <section className={s.section}>
        <Container fluid>
          <Row>
            <Col xs="20">
              <Heading size="md">Источники лидов</Heading>
            </Col>
          </Row>
          <Row>
            <Col xs="20">
              {isFetching && <Loading />}
              {!isFetching && <LeadSourcesList items={items} actions={this.props.actions} {...permissionsProps} />}
            </Col>
          </Row>
        </Container>
        {!isFetching && !!items.length &&
          <Container fluid>
            <Row xs="center">
              <Col sm="10" className={sUtils.pushed6_0}>
                <Pagination {...pagination} onUpdate={::this.handlePaginationUpdate} />
              </Col>
            </Row>
          </Container>
        }
      </section>
    );
  }
}

const pickState = ({ leadSources, pagination }) => ({
  state: { leadSources, pagination },
});

const pickActions = (dispatch) => ({
  actions: bindActionCreators({ ...LeadSourcesActions, ...PaginationActions }, dispatch),
});

export default connect(pickState, pickActions)(ListContainer);

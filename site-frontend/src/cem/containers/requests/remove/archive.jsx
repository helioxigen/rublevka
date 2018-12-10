import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PaginationActions from 'core/actions/pagination';
import FilterActions from 'core/actions/filters';
import RemovalRequestsActions from 'cem/actions/requests/remove';

import UI from 'cem/components/ui';
const {
  Button, Icon, Loading, Heading,
  Grid: { Container, Row, Col },
} = UI;
import Filter from 'cem/components/requests/remove/filter';
import Card from 'cem/components/requests/remove/archive/card';
import Pagination from 'core/components/pagination';

import s from 'cem/styles/components/header';
import sUtils from 'cem/styles/utils';
import sButton from 'cem/styles/buttons';

import isEqual from 'lodash/isEqual';

class ArchiveListContainer extends Component {
  componentWillMount() {
    const { actions, state } = this.props;

    const filter = state.filters.removalRequests || {};

    actions.loadPropertyRemovalRequests(`archive`, { filter });
  }

  componentWillReceiveProps(nextProps) {
    const { actions, state } = this.props;

    const pagination = state.pagination[`removalRequests.archive`] || {};
    const nextPagination = nextProps.state.pagination[`removalRequests.archive`] || {};

    const filter = state.filters.removalRequests || {};
    const nextFilter = nextProps.state.filters.removalRequests || {};

    const isPaginationUpdated = pagination.offset && pagination.offset !== nextPagination.offset;
    const isFilterUpdated = !isEqual(filter, nextFilter);

    if (isPaginationUpdated || isFilterUpdated) {
      actions.loadPropertyRemovalRequests(`archive`, { pagination: { offset: nextPagination.offset, limit: nextPagination.limit }, filter: nextFilter });
    }
  }

  handlePaginationUpdate(offset) {
    window.scrollTo(0, 0);

    this.props.actions.updatePagination(`removalRequests.archive`, { offset });
  }

  render() {
    const { state } = this.props;

    const { items = [], isFetching } = state.removalRequests.list.archive || {};
    const pagination = state.pagination[`removalRequests.archive`] || {};

    return (
      <section>
        <Container fluid>
          <div className={s.header}>
            <Row>
              <Col xs="20">
                <Heading size="lg">Архивные заявки на удаление объекта</Heading>
                <Button className={sButton.btnTo} size="xs" to="/requests/properties/to_remove">
                  <Icon className={s.iconArchive} icon="archive" />
                </Button>
              </Col>
            </Row>
            <Row>
              <Filter count={pagination.total} />
            </Row>
          </div>
        </Container>

        {isFetching && <Loading />}
        {!isFetching && !items.length && <Heading notFound>Не найдено архивных заявок</Heading>}
        {!isFetching && !!items.length && items.map(item =>
          <Card key={item.id} data={item} creatorUserData={state.users[item.createdByUserId] && state.users[item.createdByUserId].data} responsibleUserData={item.responsibleUserId && state.users[item.responsibleUserId] && state.users[item.responsibleUserId].data} />
        )}

        <Container fluid>
          <Row xs="center">
            <Col sm="10" className={sUtils.pushed6_0}>
              {!isFetching && !!items.length && <Pagination {...pagination} onUpdate={::this.handlePaginationUpdate} />}
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
}

const pickState = ({ auth, pagination, filters, users, removalRequests }) => ({
  state: { auth, pagination, filters, users, removalRequests },
});

const pickActions = dispatch => ({
  actions: bindActionCreators({ ...RemovalRequestsActions, ...PaginationActions, ...FilterActions }, dispatch),
});

export default connect(pickState, pickActions)(ArchiveListContainer);

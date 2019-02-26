import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PaginationActions from 'core/actions/pagination';
import FilterActions from 'core/actions/filters';
import SearchRequestsActions from 'cem/actions/requests/search';

import UI from 'cem/components/ui';
const {
  Button,
  Icon,
  Loading,
  Heading,
  Grid: { Container, Row, Col },
} = UI;
import Filter from 'cem/components/requests/search/filter';
import Card from 'cem/components/requests/search/archive/card';
import Pagination from 'core/components/pagination';

import s from 'cem/styles/components/header';
import sUtils from 'cem/styles/utils';
import sButton from 'cem/styles/buttons';

import isEqual from 'lodash/isEqual';

class ArchiveListContainer extends Component {
  componentWillMount() {
    const { actions, state } = this.props;

    const filter = state.filters.searchRequests || {};

    actions.loadSearchRequests(`archive`, { filter });
  }

  componentWillReceiveProps(nextProps) {
    const { actions, state } = this.props;

    const pagination = state.pagination[`searchRequests.archive`] || {};
    const nextPagination =
      nextProps.state.pagination[`searchRequests.archive`] || {};

    const filter = state.filters.searchRequests || {};
    const nextFilter = nextProps.state.filters.searchRequests || {};

    const isPaginationUpdated =
      pagination.offset && pagination.offset !== nextPagination.offset;
    const isFilterUpdated = !isEqual(filter, nextFilter);

    if (isPaginationUpdated || isFilterUpdated) {
      actions.loadSearchRequests(`archive`, {
        pagination: {
          offset: nextPagination.offset,
          limit: nextPagination.limit,
        },
        filter: nextFilter,
      });
    }
  }

  handlePaginationUpdate(offset) {
    window.scrollTo(0, 0);

    this.props.actions.updatePagination(`searchRequests.archive`, { offset });
  }

  render() {
    const { state } = this.props;

    const { items = [], isFetching } = state.searchRequests.list.archive || {};
    const pagination = state.pagination[`searchRequests.archive`] || {};

    return (
      <section>
        <Container fluid>
          <div className={s.header}>
            <Row>
              <Col xs="20">
                <Heading size="lg">
                  Архивные заявки на поиск объектов недвижимости
                </Heading>
                <Button
                  className={sButton.btnTo}
                  size="xs"
                  to="/requests/properties/search"
                >
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
        {!isFetching && !items.length && (
          <Heading notFound>Не найдено архивных заявок</Heading>
        )}
        {!isFetching &&
          !!items.length &&
          items.map(item => (
            <Card
              key={item.id}
              data={item}
              creatorUserData={
                state.users[item.createdByUser.id] &&
                state.users[item.createdByUser.id].data
              }
              responsibleUserData={
                item.responsibleUser &&
                state.users[item.responsibleUser.id] &&
                state.users[item.responsibleUser.id].data
              }
            />
          ))}

        <Container fluid>
          <Row xs="center">
            <Col xs="10" className={sUtils.pushed6_0}>
              {!isFetching && !!items.length && (
                <Pagination
                  {...pagination}
                  onUpdate={::this.handlePaginationUpdate}
                />
              )}
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
}

const pickState = ({ auth, pagination, filters, users, searchRequests }) => ({
  state: { auth, pagination, filters, users, searchRequests },
});

const pickActions = dispatch => ({
  actions: bindActionCreators(
    { ...SearchRequestsActions, ...PaginationActions, ...FilterActions },
    dispatch,
  ),
});

export default connect(
  pickState,
  pickActions,
)(ArchiveListContainer);

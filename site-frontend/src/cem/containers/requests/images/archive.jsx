import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PaginationActions from 'core/actions/pagination';
import FilterActions from 'core/actions/filters';
import ImagesRequestsActions from 'cem/actions/requests/images';

import UI from 'cem/components/ui';
const {
  Button, Icon, Loading, Heading,
  Grid: { Container, Row, Col },
} = UI;
import Filter from 'cem/components/requests/images/filter';
import Card from 'cem/components/requests/images/archive/card';
import Pagination from 'core/components/pagination';

import s from 'cem/styles/components/header';
import sUtils from 'cem/styles/utils';
import sButton from 'cem/styles/buttons';

import isEqual from 'lodash/isEqual';

class ArchiveListContainer extends Component {
  componentWillMount() {
    const { actions, state } = this.props;

    const filter = state.filters.imagesRequests || {};

    actions.loadImagesRequests(`archive`, { filter });
  }

  componentWillReceiveProps(nextProps) {
    const { actions, state } = this.props;

    const pagination = state.pagination[`imagesRequests.archive`] || {};
    const nextPagination = nextProps.state.pagination[`imagesRequests.archive`] || {};

    const filter = state.filters.imagesRequests || {};
    const nextFilter = nextProps.state.filters.imagesRequests || {};

    const isPaginationUpdated = pagination.offset && pagination.offset !== nextPagination.offset;
    const isFilterUpdated = !isEqual(filter, nextFilter);

    if (isPaginationUpdated || isFilterUpdated) {
      actions.loadImagesRequests(`archive`, { pagination: { offset: nextPagination.offset, limit: nextPagination.limit }, filter: nextFilter });
    }
  }

  handlePaginationUpdate(offset) {
    window.scrollTo(0, 0);

    this.props.actions.updatePagination(`imagesRequests.archive`, { offset });
  }

  render() {
    const { state } = this.props;

    const { items = [], isFetching } = state.imagesRequests.list.archive || {};
    const pagination = state.pagination[`imagesRequests.archive`] || {};

    return (
      <section>
        <Container fluid>
          <div className={s.header}>
            <Row>
              <Col xs="20">
                <Heading size="lg">Архивные заявки на фото и планировки</Heading>
                <Button className={sButton.btnTo} size="xs" to="/requests/properties/images">
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

const pickState = ({ auth, pagination, filters, users, imagesRequests }) => ({
  state: { auth, pagination, filters, users, imagesRequests },
});

const pickActions = dispatch => ({
  actions: bindActionCreators({ ...ImagesRequestsActions, ...PaginationActions, ...FilterActions }, dispatch),
});

export default connect(pickState, pickActions)(ArchiveListContainer);

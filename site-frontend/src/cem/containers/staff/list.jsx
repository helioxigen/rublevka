import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import loadList from 'cem/_users/actions/loadList';

import FilterActions from 'core/actions/filters';
import Filter from 'cem/components/staff/list/filter';

import PaginationActions from 'core/actions/pagination';
import Pagination from 'core/components/pagination';

import ListErrorMessage from 'cem/components/common/listErrorMessage';
import Card from 'cem/components/staff/card';
import UI from 'cem/components/ui';
const {
  Button,
  Heading,
  Grid: { Container, Row, Col },
} = UI;

import s from 'cem/styles/components/header';
import sUtils from 'cem/styles/utils';

import { resourceName } from 'cem/_users/constants/defaults';

const group = `all`;
const resource = `${resourceName}.${group}`;

// helpers
import { isPaginationOrFiltersOrOrderByUpdated as isUpdated } from 'core/helpers/shouldLoad';

class ListContainer extends Component {
  componentWillMount() {
    this.load(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (isUpdated(resource, this.props, nextProps)) {
      this.load(nextProps);
    }
  }

  load({ state, dispatch }) {
    const options = {
      pagination: state.pagination[resource],
      filter: state.filters[resource],
    };

    dispatch(loadList(options, group));
  }

  handlePaginationUpdate(offset) {
    window.scrollTo(0, 0);

    this.props.actions.updatePagination(resource, { offset });
  }

  render() {
    const { state, hasRight } = this.props;
    const { ids = [], isFetching, errors = [] } = state._users[group] || {};
    const pagination = state.pagination[resource] || {};

    return (
      <section>
        <Container fluid>
          <div className={s.header}>
            <Row>
              <Col xs="20">
                <Heading size="lg">
                  Сотрудники
                  {hasRight(`staff_user_create`) && (
                    <Button
                      className={sUtils.pushedLeftSm2}
                      kind="accent"
                      size="xs"
                      to="/staff/create"
                    >
                      добавить
                    </Button>
                  )}
                </Heading>
              </Col>
            </Row>
            <Row>
              <Filter
                resourceName={resource}
                count={pagination.total}
                group={group}
                updatePagination={this.props.actions.updatePagination}
              />
            </Row>
          </div>
        </Container>
        {!isFetching && !!errors.length && <ListErrorMessage errors={errors} />}
        {!isFetching && !errors.length && !ids.length && (
          <Heading notFound>Не найдено сотрудников</Heading>
        )}
        {ids.map(id => (
          <Card user={state._users[id] && state._users[id].data} key={id} />
        ))}
        <Container fluid>
          <Row xs="center">
            <Col sm="10" className={sUtils.pushed6_0}>
              {ids && !!ids.length && (
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

const pickState = ({ _users, auth, filters, pagination, order }) => ({
  state: { _users, auth, filters, pagination, order },
});

const pickActions = dispatch => ({
  actions: bindActionCreators(
    { ...FilterActions, ...PaginationActions },
    dispatch,
  ),
  dispatch,
});

export default connect(
  pickState,
  pickActions,
)(ListContainer);

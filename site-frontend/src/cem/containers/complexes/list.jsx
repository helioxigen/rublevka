import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ComplexesActions from 'cem/actions/complexes';
import FilterActions from 'core/actions/filters';
import PaginationActions from 'core/actions/pagination';

import Pagination from 'core/components/pagination';

import UI from 'cem/components/ui';
const {
  Button, Loading, Heading,
  Grid: { Container, Row, Col },
} = UI;

import Filter from 'cem/components/complexes/list/filter';
import Card from 'cem/components/complexes/list/card';

import s from 'cem/styles/components/header';
import sUtils from 'cem/styles/utils';

import isEqual from 'lodash/isEqual';

class List extends Component {
  componentWillMount() {
    const { state, actions } = this.props;
    const { pagination, filter } = state.complexes.list;

    actions.loadComplexes({ pagination, filter });
  }

  componentWillReceiveProps(nextProps) {
    const { state, actions } = this.props;

    const filter = state.filters.complexes || {};
    const nextFilter = nextProps.state.filters.complexes || {};

    const pagination = state.pagination.complexes || {};
    const nextPagination = nextProps.state.pagination.complexes || {};

    const isPaginationUpdated = pagination.offset !== undefined && pagination.offset !== nextPagination.offset;
    const isFilterUpdated = !isEqual(filter, nextFilter);

    if (isPaginationUpdated || isFilterUpdated) {
      actions.loadComplexes({ pagination: { offset: nextPagination.offset, limit: nextPagination.limit }, filter: nextFilter });
    }
  }

  handlePaginationUpdate(offset) {
    window.scrollTo(0, 0);

    this.props.actions.updatePagination(`complexes`, { offset });
  }

  render() {
    const { state, hasRight } = this.props;
    const { items = [], isFetching } = state.complexes.list;
    const pagination = state.pagination.complexes || {};

    const isCreationAllowed = hasRight(`complex_create`);

    return (
      <section>
        <Container fluid>
          <div className={s.header}>
            <Row>
              <Col xs="20">
                <Heading size="lg">
                  Жилые комплексы {isCreationAllowed && <Button className={sUtils.pushedLeftSm2} kind="accent" size="xs" to={`/places/complexes/create`}>добавить</Button>}
                </Heading>
              </Col>
            </Row>
            <Row>
              <Filter count={pagination.total} />
            </Row>
          </div>
        </Container>

        {isFetching && <Loading />}
        {!isFetching && !items.length && <Heading notFound>Не найдено жилых комплексов</Heading>}
        {!isFetching && items.map((data) =>
          <Card key={data.id} data={data} />
        )}

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

const pickState = ({ complexes, pagination, filters }) => ({
  state: { complexes, pagination, filters },
});

const pickActions = (dispatch) => ({
  actions: bindActionCreators({ ...ComplexesActions, ...PaginationActions, ...FilterActions }, dispatch),
});

export default connect(pickState, pickActions)(List);

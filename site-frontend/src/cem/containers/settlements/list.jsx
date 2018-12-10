import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SettlementActions from 'cem/actions/settlements';
import PaginationActions from 'core/actions/pagination';
import FilterActions from 'core/actions/filters';

import Pagination from 'core/components/pagination';
import Card from 'cem/components/settlements/card';
import Filter from 'cem/components/settlements/list/filter';

import UI from 'cem/components/ui';
const {
  Loading, Button, Heading,
  Grid: { Container, Row, Col },
} = UI;

import s from 'cem/styles/components/header';
import sUtils from 'cem/styles/utils';

class List extends Component {
  componentWillMount() {
    const { offset, limit } = this.props.state.pagination.settlemenets || {};
    const filter = this.props.state.filters.tasls || {};
    const queryParams = {
      filter,
      pagination: {
        offset,
        limit,
      },
    };
    this.props.actions.loadSettlements(queryParams);
  }

  componentWillReceiveProps(nextProps) {
    const filter = nextProps.state.filters.settlemenets || {};
    const pagination = this.props.state.pagination.settlemenets || {};
    const nextPagination = nextProps.state.pagination.settlemenets || {};

    if (pagination.offset !== nextPagination.offset) {
      const { offset, limit } = nextPagination;

      this.props.actions.loadSettlements({ pagination: { offset, limit }, filter });
    }
  }

  handleFilterUpdate(filter) {
    this.props.actions.loadSettlements({ pagination: {}, filter });
  }

  handlePaginationUpdate(offset) {
    window.scrollTo(0, 0);

    this.props.actions.updatePagination(`settlemenets`, { offset });
  }
  render() {
    const { state, hasRight } = this.props;
    const { items = [], isFetching } = state.settlements.list;
    const filters = state.filters.settlements || {};
    const pagination = state.pagination.settlements || {};

    const isCreationAllowed = hasRight(`settlement_create`);

    return (
      <section>
        <Container fluid>
          <div className={s.header}>
            <Row>
              <Col xs="20">
                <Heading size="lg">
                  Посëлки {isCreationAllowed && <Button className={sUtils.pushedLeftSm2} kind="accent" size="xs" to="/places/settlements/create">добавить</Button>}
                </Heading>
              </Col>
            </Row>
            <Row>
              <Filter filters={filters} actions={this.props.actions} count={pagination.total} onFilterUpdate={::this.handleFilterUpdate} />
            </Row>
          </div>
        </Container>

        {isFetching && <Loading />}
        {!isFetching && !items.length && <Heading notFound>Не найдено посёлков</Heading>}
        {!isFetching && items.map((item) => <Card data={item} key={item.id} />)}

        {!isFetching && (
          <Container fluid>
            <Row xs="center">
              <Col sm="10" className={sUtils.pushed6_0}>
                <Pagination {...pagination} onUpdate={::this.handlePaginationUpdate} />
              </Col>
            </Row>
          </Container>
        )}
      </section>
    );
  }
}

const pickState = ({ settlements, pagination, filters }) => ({
  state: { settlements, pagination, filters },
});

const mapDispatch = (dispatch) => ({
  actions: bindActionCreators({ ...SettlementActions, ...PaginationActions, ...FilterActions }, dispatch),
});

export default connect(pickState, mapDispatch)(List);

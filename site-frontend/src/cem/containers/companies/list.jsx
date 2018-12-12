import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PaginationActions from 'core/actions/pagination';
import FilterActions from 'core/actions/filters';
import CompaniesActions from 'cem/actions/companies';

import ListErrorMessage from 'cem/components/common/listErrorMessage';

import UI from 'cem/components/ui';
const {
  Button, Loading, Heading,
  Grid: { Container, Row, Col },
} = UI;

import CreateModal from 'cem/containers/companies/create';
import Filter from 'cem/components/companies/list/filter';
import Card from 'cem/components/companies/card';
import Pagination from 'core/components/pagination';

import s from 'cem/styles/components/header';
import sUtils from 'cem/styles/utils';

import isEqual from 'lodash/isEqual';

class List extends Component {
  componentWillMount() {
    this.props.actions.loadCompanies();
  }

  componentWillReceiveProps(nextProps) {
    const { actions, state } = this.props;

    const pagination = state.pagination.companies || {};
    const nextPagination = nextProps.state.pagination.companies || {};

    const filter = state.filters.companies || {};
    const nextFilter = nextProps.state.filters.companies || {};

    const isPaginationUpdated = pagination.offset !== undefined && pagination.offset !== nextPagination.offset;
    const isFilterUpdated = !isEqual(filter, nextFilter);

    if (isPaginationUpdated || isFilterUpdated) {
      actions.loadCompanies({ pagination: { offset: nextPagination.offset, limit: nextPagination.limit }, filter: nextFilter });
    }
  }

  handlePaginationUpdate(offset) {
    window.scrollTo(0, 0);
    this.props.actions.updatePagination(`companies`, { offset });
  }

  render() {
    const { state, hasRight } = this.props;
    const { items = [], isFetching, errors = [] } = state.companies.list || {};
    const pagination = state.pagination.companies || {};

    const isCreateAllowed = hasRight(`company_create`);

    return (
      <section>
        <Container fluid>
          <div className={s.header}>
            <Row>
              <Col xs="20">
                <Heading size="lg">
                  Компании
                  {isCreateAllowed &&
                    <CreateModal formKey="create">
                      <Button className={sUtils.pushedLeftSm2} type="button" kind="accent" size="xs">добавить</Button>
                    </CreateModal>
                  }
                </Heading>
              </Col>
            </Row>
            <Row>
              {!errors.length && <Filter />}
            </Row>
          </div>
        </Container>
        {!isFetching && !!errors.length && <ListErrorMessage errors={errors} />}
        {!isFetching && !errors.length && !items.length && <Heading notFound>Не найдено компаний</Heading>}
        {isFetching && <Loading />}

        {items.map(item => <Card key={item.id} data={item} />)}
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

const pickState = ({ companies, pagination, filters }) => ({
  state: { companies, pagination, filters },
});

const pickActions = (dispatch) => ({
  actions: bindActionCreators({ ...CompaniesActions, ...PaginationActions, ...FilterActions }, dispatch),
});

export default connect(pickState, pickActions)(List);

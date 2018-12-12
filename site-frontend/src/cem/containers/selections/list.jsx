import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as SelectionsActions from 'core/actions/selections';
import PaginationActions from 'core/actions/pagination';
import Pagination from 'core/components/pagination';

import UI from 'cem/components/ui';
const {
  Heading, Loading, Button,
  Grid: { Container, Row, Col },
} = UI;

import Card from 'cem/components/selections/list/card';

import s from 'cem/styles/components/header';
import sUtils from 'cem/styles/utils';

class List extends Component {
  componentWillMount() {
    const { actions } = this.props;

    actions.loadSelections();
  }

  componentWillReceiveProps(nextProps) {
    const { state, actions } = this.props;
    const pagination = state.pagination[`selections.all`] || {};
    const nextPagination = nextProps.state.pagination[`selections.all`] || {};
    const isPaginationUpdated = pagination.offset !== undefined && pagination.offset !== nextPagination.offset;

    if (isPaginationUpdated) {
      actions.loadComplexes({ pagination: { offset: nextPagination.offset, limit: nextPagination.limit } });
    }
  }

  handlePaginationUpdate(offset) {
    window.scrollTo(0, 0);

    this.props.actions.updatePagination(`selections.all`, { offset });
  }

  render() {
    const { state, hasRight } = this.props;
    const { ids = [], isFetching } = state.selections[`all`] || {};

    const pagination = state.pagination[`selections.all`] || {};

    const isCreationAllowed = hasRight(`selection_create`);

    return (
      <section>
        <Container fluid>
          <div className={s.header}>
            <Row>
              <Col xs="20">
                <Heading size="lg">
                  Подборки&nbsp;
                  {isCreationAllowed &&
                    <Button className={sUtils.pushedLeftSm2} kind="accent" size="xs" to={`/selections/create`}>добавить</Button>
                  }
                </Heading>
              </Col>
            </Row>
          </div>
        </Container>

        {isFetching && <Loading />}

        {!isFetching && !ids.length && <Heading notFound>Не найдено подборок</Heading>}

        {!isFetching && ids.map(id => <Card key={id} data={state.selections[id] && state.selections[id].data} />)}

        {!isFetching && !!ids.length &&
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

const pickState = ({ selections, pagination }) => ({
  state: { selections, pagination },
});

const pickActions = (dispatch) => ({
  actions: bindActionCreators({ ...SelectionsActions, ...PaginationActions }, dispatch),
});

export default connect(pickState, pickActions)(List);

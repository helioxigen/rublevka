import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PlacesActions from 'cem/actions/places';
import PaginationActions from 'core/actions/pagination';

import * as dicts from 'cem/constants/places/dictionaries';

import Pagination from 'core/components/pagination';
import Card from 'cem/components/places/card';

import UI from 'cem/components/ui';
const {
  Button,
  Loading,
  Heading,
  Grid: { Container, Row, Col },
} = UI;

import s from 'cem/styles/components/header';
import sUtils from 'cem/styles/utils';

class ListContainer extends Component {
  componentWillMount() {
    const {
      params: { kind },
    } = this.props;

    this.load(kind);
  }

  componentWillReceiveProps(nextProps) {
    const {
      params: { kind },
    } = this.props;
    const {
      params: { kind: nextKind },
    } = nextProps;

    if (kind !== nextKind) {
      this.load(nextKind);
    }
  }

  updatePagination(offset) {
    const {
      params: { kind },
    } = this.props;

    this.load(kind, { offset });
  }

  load(kind, pagination) {
    const { actions } = this.props;

    actions.loadPlaces(kind, pagination);
  }

  render() {
    const {
      state,
      hasRight,
      params: { kind },
    } = this.props;
    const { items = [], isFetching } = state.places.list;
    const pagination = state.pagination.places || {};
    const { permissionName } = dicts.kinds[kind];

    const isCreateAllowed = hasRight(`${permissionName}_create`);

    return (
      <section>
        <Container fluid>
          <div className={s.header}>
            <Row className={sUtils.pushedBottom1}>
              <Col xs="20">
                <Heading size="lg">
                  {dicts.kinds[kind].title[2]}
                  {isCreateAllowed && (
                    <Button
                      className={sUtils.pushedLeftSm2}
                      kind="accent"
                      size="xs"
                      to={`/places/${kind}/create`}
                    >
                      добавить
                    </Button>
                  )}
                </Heading>
              </Col>
            </Row>
          </div>
        </Container>

        {!!isFetching && <Loading />}
        {!isFetching && !!items.length && (
          <section>
            {items.map((item, index) => (
              <Card item={item} key={index} kind={kind} />
            ))}
          </section>
        )}
        {!isFetching && !items.length && <Heading notFound>Не найдено</Heading>}
        {!isFetching && !!items.length && (
          <Container fluid>
            <Row sm="center">
              <Col sm="10" className={sUtils.pushed6_0}>
                <Pagination
                  {...pagination}
                  onUpdate={::this.updatePagination}
                />
              </Col>
            </Row>
          </Container>
        )}
      </section>
    );
  }
}

const pickState = ({ places, pagination }) => ({
  state: { places, pagination },
});

const mapDispatch = dispatch => ({
  actions: bindActionCreators(
    { ...PlacesActions, ...PaginationActions },
    dispatch,
  ),
});

export default connect(
  pickState,
  mapDispatch,
)(ListContainer);

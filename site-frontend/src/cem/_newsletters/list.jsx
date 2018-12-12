import React, { Component } from "react";

import { connect } from "react-redux";

import loadList from "cem/_newsletters/actions/loadList";
import { updatePagination } from "core/actions/pagination";
import Pagination from "core/components/pagination";

import UI from "cem/components/ui";
const { Heading, Loading, Button, Grid: { Container, Row, Col } } = UI;

import Card from "./card";

import s from "cem/styles/components/header";
import sUtils from "cem/styles/utils";

class List extends Component {
  componentWillMount() {
    this.props.dispatch(loadList());
  }

  componentWillReceiveProps(nextProps) {
    const { state, actions } = this.props;
    const pagination = state.pagination[`newsletters.all`] || {};
    const nextPagination = nextProps.state.pagination[`newsletters.all`] || {};
    const isPaginationUpdated =
      pagination.offset !== undefined &&
      pagination.offset !== nextPagination.offset;

    if (isPaginationUpdated) {
      actions.loadComplexes({
        pagination: {
          offset: nextPagination.offset,
          limit: nextPagination.limit,
        },
      });
    }
  }

  handlePaginationUpdate(offset) {
    window.scrollTo(0, 0);

    this.props.dispatch(updatePagination(`newsletters.all`, { offset }));
  }

  render() {
    const { state, hasRight } = this.props;
    const { ids = [], isFetching } = state.newsletters[`all`] || {};

    const pagination = state.pagination[`newsletters.all`] || {};

    const isCreationAllowed = hasRight(`newsletter_create`);

    return (
      <section>
        <Container fluid>
          <div className={s.header}>
            <Row>
              <Col xs="20">
                <Heading size="lg">
                  Рассылки&nbsp;
                  {isCreationAllowed &&
                    <Button
                      className={sUtils.pushedLeftSm2}
                      kind="accent"
                      size="xs"
                      to={`/newsletters/create`}
                    >
                      добавить
                    </Button>}
                </Heading>
              </Col>
            </Row>
          </div>
        </Container>

        {isFetching && <Loading />}

        {!isFetching &&
          !ids.length &&
          <Heading notFound>Не найдено рассылок</Heading>}

        {!isFetching &&
          ids.map(id => (
            <Card
              key={id}
              data={state.newsletters[id] && state.newsletters[id].data}
            />
          ))}

        {!isFetching &&
          !!ids.length &&
          <Container fluid>
            <Row xs="center">
              <Col sm="10" className={sUtils.pushed6_0}>
                <Pagination
                  {...pagination}
                  onUpdate={::this.handlePaginationUpdate}
                />
              </Col>
            </Row>
          </Container>}
      </section>
    );
  }
}

const pickState = ({ newsletters, pagination }) => ({
  state: { newsletters, pagination },
});

export default connect(pickState)(List);

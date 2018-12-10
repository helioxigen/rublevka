import React, { Component } from 'react';

import Pagination from 'core/components/pagination';
import UI from 'cem/components/ui';
const {
  Loading, Heading,
  Grid: { Container, Row, Col },
} = UI;

import ListErrorMessage from 'cem/components/common/listErrorMessage';

import s from 'cem/styles/components/header';
import sUtils from 'cem/styles/utils';

export default class extends Component {
  static defaultProps = {
    isFilterActive: true,
    isPaginatorActive: true,
  };

  render() {
    const {
      items, isFetching, errors, linkedItemsMap,
      card,
      filter,
      pagination, handlePaginationUpdate,
      title, notFoundCaption,
      isAddButtonShown, addButton, optionButtons = [],
      isFilterActive, isPaginatorActive,
    } = this.props;

    const paginator = !!this.props.paginator ?
      React.cloneElement(this.props.paginator, { ...this.props.paginator.props, ...pagination, onUpdate: handlePaginationUpdate }) :
      <Pagination {...pagination} onUpdate={handlePaginationUpdate} />;

    return (
      <section>
        <Container fluid>
          <div className={s.header}>
            <Row>
              <Col xs="20">
                <Heading size="lg">
                  {title}
                  {isAddButtonShown && addButton}
                </Heading>
                <section>
                  {optionButtons.map((button, index) => React.cloneElement(button, { ...button.props, key: index }))}
                </section>
              </Col>
            </Row>
            {isFilterActive && !!filter && !errors.length &&
              <Row>
                {React.cloneElement(filter, { ...filter.props, count: pagination.total })}
              </Row>
            }
          </div>
        </Container>
        {!isFetching && !!errors.length && <ListErrorMessage errors={errors} />}
        {!isFetching && !errors.length && !items.length && <Heading notFound>{notFoundCaption}</Heading>}
        {isFetching && <Loading />}
        {!isFetching && !!items.length && items.map(item =>
          React.cloneElement(card, { ...card.props, key: item.id, data: item, ...linkedItemsMap })
        )}

        {/*
          TODO: This is a temporary solution. Hiding and showing pagination
          using a simple condition, causes invariant violation error that has to be dealt with somehow.
        */}
        <Container fluid style={{ display: !(isPaginatorActive && !isFetching && !!items.length) && `none` }}>
          <Row xs="center">
            <Col sm="10" className={sUtils.pushed6_0}>
              {paginator}
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
}

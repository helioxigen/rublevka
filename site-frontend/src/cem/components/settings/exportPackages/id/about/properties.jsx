import React, { Component } from 'react';

import Pagination from 'core/containers/pagination';

import ListErrorMessage from 'cem/components/common/listErrorMessage';

import CountIndicator from 'cem/components/common/countIndicator';

import UI from 'cem/components/ui';
const {
  Loading,
  Heading,
  Grid: { Container, Row, Col },
} = UI;

import Card from 'cem/components/common/property/card';

import sUtils from 'cem/styles/utils';

import isEqual from 'lodash/isEqual';

const group = packageId => `byExportPackageId.${packageId}`;

class Properties extends Component {
  componentWillMount() {
    const {
      actions,
      packageId,
      filter: { location, saleOffer, rentOffer, ...filter },
      filterNot: { location: locationFilterNot, ...filterNot },
    } = this.props;

    const newFilter = {
      ...filter,
      'location.settlementId': location.settlementId,
      'saleOffer.price': saleOffer.price,
      'rentOffer.price': rentOffer.price,
    };

    const newFilterNot = {
      ...filterNot,
      'location.settlementId': locationFilterNot.settlementId,
    };

    actions.loadPropertiesByCategory(
      { filter: newFilter, filterNot: newFilterNot },
      group(packageId),
      filter.category,
    );
  }

  componentWillReceiveProps(nextProps) {
    const { actions, state, packageId, filter, filterNot } = this.props;

    const pagination =
      state.pagination[`${filter.category}Properties.${group(packageId)}`] ||
      {};
    const nextPagination =
      nextProps.state.pagination[
        `${nextProps.filter.category}Properties.${group(packageId)}`
      ] || {};

    const isPaginationUpdated = !isEqual(pagination, nextPagination);
    const isFilterUpdated = !isEqual(filter, nextProps.filter);
    const isFilterNotUpdated = !isEqual(filterNot, nextProps.filterNot);

    const {
      filter: { location, saleOffer, rentOffer, ...nextFilter },
      filterNot: { location: locationFilterNot, ...nextFilterNot },
    } = nextProps;

    const newFilter = {
      ...nextFilter,
      'location.settlementId': location.settlementId,
      'saleOffer.price': saleOffer.price,
      'rentOffer.price': rentOffer.price,
    };

    const newFilterNot = {
      ...nextFilterNot,
      'location.settlementId': locationFilterNot.settlementId,
    };

    if (isPaginationUpdated || isFilterUpdated || isFilterNotUpdated) {
      actions.loadPropertiesByCategory(
        {
          filter: newFilter,
          filterNot: newFilterNot,
          pagination: { offset: nextPagination.offset },
        },
        group(packageId),
        nextProps.filter.category,
      );
    }
  }

  render() {
    const { state, packageId, filter } = this.props;
    const { ids = [], errors = [], isFetching } =
      state._properties[group(packageId)] || {};
    const pagination =
      state.pagination[`${filter.category}Properties.${group(packageId)}`] ||
      {};

    const isErrorsPresented = !isFetching && !!errors.length;
    const isNotFound = !isFetching && !errors.length && !ids.length;
    const isNotEmpty = !isFetching && !!ids.length;

    return (
      <section>
        <Row>
          <Col xs="20">
            <Heading size="md">
              <CountIndicator
                count={pagination.total}
                declensionForms={['объект', 'объекта', 'объектов']}
              />
            </Heading>
          </Col>
          <Col xs="20">
            {isErrorsPresented && <ListErrorMessage errors={errors} />}
            {isNotFound && (
              <Heading notFound>
                Объекты по заданным фильтрам не найдены
              </Heading>
            )}
            {!isFetching &&
              ids.map(id => (
                <Card
                  key={id}
                  data={state._properties[id] && state._properties[id].data}
                />
              ))}
            {isFetching && <Loading />}
            {isNotEmpty && (
              <Container fluid>
                <Row xs="center">
                  <Col sm="10" className={sUtils.pushedTop3}>
                    <Pagination
                      kind={`${filter.category}Properties.${group(packageId)}`}
                    />
                  </Col>
                </Row>
              </Container>
            )}
          </Col>
        </Row>
      </section>
    );
  }
}

export default Properties;

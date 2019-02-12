import React, { Component } from 'react';

import { Link } from 'react-router';

import { FormattedDate } from 'react-formatted';

import Pagination from 'core/components/pagination';

import ListErrorMessage from 'cem/components/common/listErrorMessage';

import UI from 'cem/components/ui';
const {
  Table,
  Heading,
  Loading,
  Grid: { Container, Row, Col },
} = UI;

import Filter from './filter';

import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';

import isEqual from 'lodash/isEqual';

import { resourceName } from 'cem/constants/settings/exportPackages/defaults';
import * as dict from 'cem/constants/settings/exportPackages/dictionaries';

const listName = `errorLogs`;
const resource = id => `${resourceName}.${id}.${listName}`;

class ErrorLogs extends Component {
  componentWillMount() {
    const { actions, category: propertyCategory, id } = this.props;

    actions.loadErrorLogs(id, propertyCategory);
  }

  componentWillReceiveProps(nextProps) {
    const { actions, state, id } = this.props;

    const pagination = state.pagination[resource(id)] || {};
    const nextPagination = nextProps.state.pagination[resource(id)] || {};

    const filter = state.filters[`${resourceName}.${listName}`] || {};
    const nextFilter =
      nextProps.state.filters[`${resourceName}.${listName}`] || {};

    const isPaginationUpdated =
      pagination.offset !== undefined && !isEqual(pagination, nextPagination);
    const isFilterUpdated = !isEqual(filter, nextFilter);

    if (isPaginationUpdated || isFilterUpdated) {
      const newOffset = isFilterUpdated ? 0 : nextPagination.offset;

      actions.loadErrorLogs(id, {
        filter: nextFilter,
        pagination: { offset: newOffset },
      });
    }
  }

  handlePaginationUpdate(offset) {
    const { actions, state, id } = this.props;

    const filter = state.filters[`${resourceName}.${listName}`] || {};

    actions.loadErrorLogs(id, { filter, pagination: { offset } });
  }

  render() {
    const { state, category, data, id: packageId } = this.props;
    const { ids = [], isFetching, errors = [] } = data || {};

    const pagination = state.pagination[resource(packageId)] || {};

    const isErrorsPresented = !isFetching && !!errors.length;
    const isNotFound = !isFetching && !errors.length && !ids.length;
    const isNotEmpty = !isFetching && !!ids.length;

    return (
      <Row>
        <Col className={s.section}>
          <Filter />
          <Heading size="md">Список ошибок</Heading>
          {isErrorsPresented && <ListErrorMessage errors={errors} />}
          {isNotFound && <Heading notFound>Ошибок нет</Heading>}
          {isNotEmpty && (
            <Table.Container width="100%">
              <Table.Row>
                <Table.Heading width="10%">Дата создания</Table.Heading>
                <Table.Heading width="30%">Ошибочные поля</Table.Heading>
                <Table.Heading width="20%">Причина</Table.Heading>
                <Table.Heading width="40%">ID объектов</Table.Heading>
              </Table.Row>
              {ids.map(id => (
                <Table.Row key={id}>
                  <Table.Cell>
                    <FormattedDate
                      value={data[id].createdAt}
                      mask="dd.mm.yyyy HH:MM"
                    />
                  </Table.Cell>
                  <Table.Cell>
                    {Array.isArray(data[id].params)
                      ? data[id].params
                          .map(fieldId => dict.propertyFields[fieldId])
                          .filter(param => param)
                          .join(`, `)
                      : ``}
                  </Table.Cell>
                  <Table.Cell>{data[id].reason}</Table.Cell>
                  <Table.Cell>
                    {data[id].propertyIds.map((propertyId, index) => (
                      <Link
                        key={index}
                        to={`/properties/${category}/${propertyId}`}
                      >
                        {propertyId}
                        {index !== data[id].propertyIds.length - 1 ? `, ` : ``}
                      </Link>
                    ))}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Container>
          )}
          {isFetching && <Loading />}
          {isNotEmpty && (
            <Container fluid>
              <Row xs="center">
                <Col sm="10" className={sUtils.pushed6_0}>
                  <Pagination
                    {...pagination}
                    onUpdate={::this.handlePaginationUpdate}
                  />
                </Col>
              </Row>
            </Container>
          )}
        </Col>
      </Row>
    );
  }
}

export default ErrorLogs;

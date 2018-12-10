import React, { Component } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import PropertiesActions from "cem/actions/properties";
import FilterActions from "core/actions/filters";
import PaginationActions from "core/actions/pagination";
import OrderActions from "core/actions/order";

import FilterCity from "cem/components/properties/list/filter/city";
import FilterCountry from "cem/components/properties/list/filter/country";
import Card from "cem/components/properties/list/card";
import Pagination from "core/components/pagination";

import UI from "cem/components/ui";
const {
  Loading,
  Dropdown,
  Button,
  Icon,
  Heading,
  Grid: { Container, Row, Col },
} = UI;

import s from "cem/styles/components/header";
import sUtils from "cem/styles/utils";
import sDropdown from "cem/styles/ui/dropdown";
import sButton from "cem/styles/buttons";

import isEqual from "lodash/isEqual";

import {
  defaultFilter,
  defaultFilterNot,
} from "cem/constants/properties/filters";

const sortFields = {
  country: [
    `saleOffer.multiCurrencyPrice.usd`,
    `rentOffer.multiCurrencyPrice.usd`,
    `id`,
    `specification.area`,
    `landDetails.area`,
    `location.mkadDistance`,
    `createdAt`,
    `updatedAt`,
  ],
  city: [
    `saleOffer.multiCurrencyPrice.usd`,
    `rentOffer.multiCurrencyPrice.usd`,
    `id`,
    `createdAt`,
    `updatedAt`,
  ],
};

class List extends Component {
  componentWillMount() {
    const { params: { category }, routes, actions, state } = this.props;

    const group = routes[routes.length - 1].path;

    const listKind = `properties.${category}.${group}`;

    const pagination = state.pagination[listKind] || {};
    const filter = state.filters[listKind] || {};
    const order = state.order[listKind] || {};

    const queryParams = {
      pagination: { offset: pagination.offset, limit: pagination.limit },
      filter: { ...filter, ...defaultFilter[group] },
      filterNot: defaultFilterNot[group],
      orderBy: { [order.field]: order.predicate },
    };

    actions.loadPropertiesByCategory(category, queryParams, group);
  }

  componentWillReceiveProps(nextProps) {
    const { params: { category }, routes, actions, state } = this.props;

    const group = routes[routes.length - 1].path;
    const nextGroup = nextProps.routes[nextProps.routes.length - 1].path;

    const nextListKind = `properties.${nextProps.params.category}.${nextGroup}`;

    const order = state.order[nextListKind] || {};
    const nextOrder = nextProps.state.order[nextListKind] || {};

    const pagination = state.pagination[nextListKind] || {};
    const nextPagination = nextProps.state.pagination[nextListKind] || {};

    const filter = state.filters[nextListKind] || {};
    const nextFilter = nextProps.state.filters[nextListKind] || {};

    if (
      category !== nextProps.params.category ||
      group !== nextGroup ||
      pagination.offset !== nextPagination.offset ||
      !isEqual(filter, nextFilter) ||
      !isEqual(order, nextOrder)
    ) {
      const queryParams = {
        pagination: {
          offset: nextPagination.offset,
          limit: nextPagination.limit,
        },
        filter: { ...nextFilter, ...defaultFilter[nextGroup] },
        filterNot: defaultFilterNot[nextGroup],
        orderBy: { [nextOrder.field]: nextOrder.predicate },
      };

      actions.loadPropertiesByCategory(
        nextProps.params.category,
        queryParams,
        nextGroup,
      );
    }
  }

  handlePaginationUpdate(offset) {
    const { params: { category }, routes, actions } = this.props;

    const group = routes[routes.length - 1].path;

    window.scrollTo(0, 0);

    actions.updatePagination(`properties.${category}.${group}`, { offset });
  }

  render() {
    const { params: { category }, routes, state } = this.props;

    const group = routes[routes.length - 1].path;

    const filter = state.filters[`properties.${category}.${group}`] || {};
    const pagination = state.pagination[`properties.${category}.${group}`] || {
    };
    const { items = [], isFetching } = state.properties[`${category}.${group}`]
      .list || {};

    const canCreate = this.props.hasRight(`${category}_property_create`);

    return (
      <section>
        <Container fluid>
          <div className={s.header}>
            <Row>
              <Col xs="20" className={sUtils.positionRelative}>
                <Heading size="lg">
                  {category === `city` ? `Городские` : `Загородные`} объекты
                  {canCreate &&
                    <Button
                      size="xs"
                      kind="success"
                      to={`/properties/${category}/create`}
                      className={sUtils.pushedLeftSm2}
                    >
                      добавить
                    </Button>}
                </Heading>
                <Dropdown
                  className={sDropdown.header}
                  button={
                    <Button type="button" className={sButton.btnDropdown}>
                      <Icon className={s.iconSubmenu} icon="submenu" />
                    </Button>
                  }
                >
                  <Button
                    to={`/requests/properties/search/create?propertyCategory=${category}`}
                    type="button"
                    className={sButton.btnDropdownInner}
                  >
                    Заказать поиск объектов
                  </Button>
                </Dropdown>
              </Col>
            </Row>
            <Row>
              {category === `city` &&
                <FilterCity
                  {...this.props}
                  filters={filter}
                  count={pagination.total}
                  group={group}
                  listKind={`properties.${category}.${group}`}
                  sortKind={`properties.${category}.${group}`}
                  sortFields={sortFields[category]}
                />}
              {category === `country` &&
                <FilterCountry
                  {...this.props}
                  filters={filter}
                  count={pagination.total}
                  group={group}
                  listKind={`properties.${category}.${group}`}
                  sortKind={`properties.${category}.${group}`}
                  sortFields={sortFields[category]}
                />}
            </Row>
          </div>
        </Container>

        {!!isFetching && <Loading />}
        {!isFetching &&
          !!items.length &&
          items.map(item => (
            <Card category={category} key={item.id} {...item} />
          ))}
        {!isFetching &&
          !items.length &&
          <Heading notFound>Не найдено объектов</Heading>}

        {!isFetching &&
          !!items.length &&
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

const pickState = ({ properties, filters, pagination, order }) => ({
  state: { properties, filters, pagination, order },
});

const pickActions = dispatch => ({
  actions: bindActionCreators(
    {
      ...PropertiesActions,
      ...FilterActions,
      ...PaginationActions,
      ...OrderActions,
    },
    dispatch,
  ),
});

export default connect(pickState, pickActions)(List);

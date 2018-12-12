import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { loadEntities, loadEntity, createEntity, updateEntity, changeEntityState } from 'core/actions/fetcher';
import PaginationActions from 'core/actions/pagination';
import FilterActions from 'core/actions/filters';

import isEqual from 'lodash/isEqual';

const pickState = ({ fetcher, pagination, filters }) => ({ fetcher, pagination, filters });

const pickActions = (dispatch) => ({
  fetcherActions: bindActionCreators({ loadEntities, loadEntity, createEntity, updateEntity, changeEntityState, ...PaginationActions, ...FilterActions }, dispatch),
});

export default (settings) => (ChildListContainer) => connect(pickState, pickActions)(
  class extends Component {
    componentWillMount() {
      const filter = this.props.filters[settings.id] || {};

      const fetcherFilter = this.props.fetcherFilter || {};
      const fetcherFilterNot = this.props.fetcherFilterNot || {};

      const pagination = this.props.pagination[settings.id] || {};

      const actionOptions = {
        queryParams: {
          filter: { ...filter, ...fetcherFilter, ...settings.filter },
          filterNot: { ...fetcherFilterNot, ...settings.filterNot },
          pagination,
          orderBy: settings.orderBy,
        },
        ...settings,
      };

      this.props.fetcherActions.loadEntities(settings.id, actionOptions);
    }

    componentWillReceiveProps(nextProps) {
      const filter = this.props.filters[settings.id] || {};
      const nextFilter = nextProps.filters[settings.id] || {};

      const fetcherFilter = this.props.fetcherFilter || {};
      const nextFetcherFilter = nextProps.fetcherFilter || {};

      const fetcherFilterNot = this.props.fetcherFilterNot || {};
      const nextFetcherFilterNot = nextProps.fetcherFilterNot || {};

      const pagination = this.props.pagination[settings.id] || { offset: 0 };
      const nextPagination = nextProps.pagination[settings.id] || { offset: 0 };

      const isFilterUpdated = !isEqual(filter, nextFilter) || !isEqual(fetcherFilter, nextFetcherFilter);
      const isFilterNotUpdated = !isEqual(fetcherFilterNot, nextFetcherFilterNot);
      const isPaginationUpdated = pagination.offset !== nextPagination.offset;
      const isListResetNeeded = isFilterUpdated || isFilterNotUpdated;

      if (isFilterUpdated || isFilterNotUpdated || isPaginationUpdated) {
        const actionOptions = {
          queryParams: {
            filter: { ...nextFilter, ...nextFetcherFilter, ...settings.filter },
            filterNot: { ...nextFetcherFilterNot, ...settings.filterNot },
            pagination: isFilterUpdated || isFilterNotUpdated ? { offset: 0 } : nextPagination,
            orderBy: settings.orderBy,
          },
          ...settings,
        };

        this.props.fetcherActions.loadEntities(settings.id, actionOptions, settings.append && !isListResetNeeded);
      }
    }

    handleFilterUpdate(ref, value) {
      this.props.fetcherActions.updateFilter(settings.id, { [ref]: value });
    }

    handleFilterReset() {
      this.props.fetcherActions.clearFilter(settings.id);
    }

    handlePaginationUpdate(offset) {
      if (!settings.append) window.scrollTo(0, 0);
      this.props.fetcherActions.updatePagination(settings.id, { offset });
    }

    getLinkedEntities() {
      return settings.linkedResourcesSchemes.reduce((result, linkedEntity) => {
        const resource = this.props.fetcher[settings.id] || {};
        const { list, ...linkedEntityItemsByIds } = resource[linkedEntity.typeId] || {};  // eslint-disable-line no-unused-vars
        return {
          ...result,
          [linkedEntity.typeId]: linkedEntityItemsByIds,
        };
      }, {});
    }

    create(data) {
      return this.props.fetcherActions.createEntity(settings.id, data, { ...settings });
    }

    update(entityId, data) {
      return this.props.fetcherActions.updateEntity(settings.id, entityId, data, { ...settings });
    }

    changeState(entityId, state, data) {
      return this.props.fetcherActions.changeEntityState(settings.id, entityId, state, data, { ...settings });
    }

    render() {
      const { fetcher, actions, fetcherActions, pagination, filters, fetcherFilter, ...originalProps } = this.props;  // eslint-disable-line no-unused-vars
      const { list: { items = [], isFetching = false, errors = [] } = {} } = fetcher[settings.id] || {};
      const updatedActions = {
        ...actions,
        create: ::this.create,
        update: ::this.update,
        changeState: ::this.changeState,
      };

      return (
        <section>
          <ChildListContainer {...originalProps} actions={updatedActions} items={items} isFetching={isFetching} errors={errors}
            linkedItemsMap={!!settings.linkedResourcesSchemes ? ::this.getLinkedEntities() : {}}
            handleFilterUpdate={::this.handleFilterUpdate} handleFilterReset={::this.handleFilterReset}
            handlePaginationUpdate={::this.handlePaginationUpdate}
            pagination={pagination[settings.id] || {}} filters={filters[settings.id] || {}} />
        </section>
      );
    }
  }
);

import React, { Component } from 'react';

import { connect } from 'react-redux';

// actions
import { updateFilter, removeFilter, resetFilter } from 'core/actions/filters';
import { updatePagination } from 'core/actions/pagination';

import UI from 'ui';

import Selected from './selected';

import Search from '../Search';

import s from 'styles/settlements/filter';
import sUtils from 'styles/utils';

import { resourceName } from 'core/settlements/constants/defaults';

const {
  Grid: { Container, Row },
} = UI;

const group = 'all';
const resource = `${resourceName}.${group}`;

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.updateFilter = this.updateFilter.bind(this);
    this.removeFilter = this.removeFilter.bind(this);
    this.resetFilter = this.resetFilter.bind(this);
  }

  updateFilter(key, value) {
    const values = {
      [key]: value,
    };

    this.props.dispatch(updatePagination(resource, { offset: 0 }));
    this.props.dispatch(updateFilter(resource, values));
  }

  removeFilter(key, value) {
    this.props.dispatch(removeFilter(resource, key, value));
  }

  resetFilter() {
    this.props.dispatch(resetFilter(resource));
  }

  render() {
    const state = this.props.filters[resource];

    return (
      <section>
        <div className={s.modalContainer}>
          <Container>
            <Search placeholder="Введите название поселка" />

            <Row xs="center" className={sUtils.pushedTop4}>
              <Selected
                selected={state}
                updateFilter={this.updateFilter}
                removeFilter={this.removeFilter}
                resetFilter={this.resetFilter}
              />
            </Row>
          </Container>
        </div>
      </section>
    );
  }
}

// redux connectors
const mapStateToProps = state => ({
  filters: state.filters,
  pagination: state.pagination,
  order: state.order,
  settlements: state.settlements,
});

export default connect(mapStateToProps)(Filter);

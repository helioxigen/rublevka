import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import FilterActions from 'core/actions/filters';

const isEvent = candidate =>
  !!(candidate && candidate.stopPropagation && candidate.preventDefault);

const pickState = ({ filters, routing, _filters }) => ({
  routing,
  filters: filters || _filters,
});

const pickActions = dispatch => ({
  filtersActions: bindActionCreators(FilterActions, dispatch),
});

export default (
  kind,
  fields,
  extendedFields = [],
  options = {},
) => OriginalComponent =>
  connect(
    pickState,
    pickActions,
  )(
    class extends Component {
      static propTypes = {
        updatePagination: PropTypes.func.isRequired,
        resourceName: PropTypes.string.isRequired,
        count: PropTypes.number.isRequired,
      };

      componentWillMount() {
        if (options.isMain) {
          this.setState({
            storedValues:
              this.props.filters[kind || this.props.resourceName] || {},
          });
        }
      }

      generateOnChange(field) {
        const { actions, filtersActions, updatePagination } = this.props;
        return eventOrValue => {
          filtersActions.updateFilter(kind || this.props.resourceName, {
            [field]: isEvent(eventOrValue)
              ? eventOrValue.target.value
              : eventOrValue,
          });

          // TODO Get rid of this site-specific logic (related to complexes)
          const resourceName = this.props.resourceName || `complexes`;

          if (updatePagination) {
            updatePagination(resourceName, { offset: 0 });
          } else if (actions && actions.updatePagination) {
            actions.updatePagination({ offset: 0 }, resourceName); // it's fucking old, born to die
          } else {
            throw Error(`(filter) updatePagination is undefined`);
          }
        };
      }

      resetFilter() {
        this.props.filtersActions.resetFilter(kind || this.props.resourceName);
      }

      cancelSelectedFilter() {
        this.props.filtersActions.setFilter(
          kind || this.props.resourceName,
          this.state.storedValues,
        );
      }

      valueIsNotEmpty(value) {
        if (Array.isArray(value)) {
          return value.length > 0;
        } else if (value === undefined) {
          return false;
        } else {
          return value;
        }
      }

      render() {
        const values =
          this.props.filters[kind || this.props.resourceName] || {};
        const mappedFields = {};
        const filterCount = Object.keys(values).filter(key =>
          this.valueIsNotEmpty(values[key]),
        ).length;
        const extendedFilterCount = Object.keys(values).filter(
          key =>
            this.valueIsNotEmpty(values[key]) &&
            extendedFields.indexOf(key) > -1,
        ).length;

        [...fields, ...extendedFields].map(field => {
          mappedFields[field] = {
            onChange: ::this.generateOnChange(field),
            value: values[field],
          };
        });

        return (
          <OriginalComponent
            {...this.props}
            fields={mappedFields}
            values={values}
            filterCount={filterCount}
            extendedFilterCount={extendedFilterCount}
            cancelSelectedFilter={::this.cancelSelectedFilter}
            resetFilter={::this.resetFilter}
          />
        );
      }
    },
  );

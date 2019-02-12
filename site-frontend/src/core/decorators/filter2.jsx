import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';

// actions
import { updateFilter, resetFilter, setFilter } from 'core/actions/filters';

// helpers
const isEvent = candidate =>
  !!(candidate && candidate.stopPropagation && candidate.preventDefault);
const valueIsNotEmpty = value => {
  if (Array.isArray(value)) {
    return value.length > 0;
  } else if (value === undefined) {
    return false;
  } else {
    return value;
  }
};

const pickState = ({ filters }) => ({ filters });
const pickActions = dispatch => ({ dispatch });

export default (fields, extendedFields = []) => OriginalComponent =>
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
        const storedValues = this.props.filters[this.props.resourceName] || {};

        this.setState({ storedValues });
      }

      onChange(field) {
        const { resourceName, dispatch, updatePagination } = this.props;

        return eventOrValue => {
          dispatch(
            updateFilter(resourceName, {
              [field]: isEvent(eventOrValue)
                ? eventOrValue.target.value
                : eventOrValue,
            }),
          );

          if (updatePagination) {
            dispatch(updatePagination(resourceName, { offset: 0 }));
          }
        };
      }

      reset() {
        this.props.dispatch(resetFilter(this.props.resourceName));
      }

      cancel() {
        this.props.dispatch(
          setFilter(this.props.resourceName, this.state.storedValues),
        );
      }

      render() {
        const values = this.props.filters[this.props.resourceName] || {};

        const totalCount = Object.keys(values).filter(key =>
          valueIsNotEmpty(values[key]),
        ).length;
        const extendedCount = Object.keys(values)
          .filter(key => extendedFields.indexOf(key) > -1)
          .filter(key => valueIsNotEmpty(values[key])).length;

        const mappedFields = {};

        [...fields, ...extendedFields].map(field => {
          mappedFields[field] = {
            onChange: ::this.onChange(field),
            value: values[field],
          };
        });

        return (
          <OriginalComponent
            {...this.props}
            fields={mappedFields}
            values={values}
            totalCount={totalCount}
            extendedCount={extendedCount}
            cancel={::this.cancel}
            reset={::this.reset}
          />
        );
      }
    },
  );

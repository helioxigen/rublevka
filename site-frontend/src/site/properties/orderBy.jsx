import React, { Component, PropTypes } from 'react';
import cn from 'classnames';
import { dictionary } from 'core/config/constants';

import UI from 'site/ui';
const {
  Dropdown, Button,
} = UI;

// components
import CurrencyToggle from 'site/components/common/currencyToggle';

import sBtn from 'site/styles/button';
import sUtils from 'site/styles/utils';

class OrderBy extends Component {
  static propTypes = {
    orderBy: PropTypes.object,
    fields: PropTypes.array.isRequired,
    update: PropTypes.func,

    resourceName: PropTypes.string.isRequired,
    updatePagination: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
  }

  reset() {
    this.props.actions.resetOrder(this.props.resourceName);
  }

  update(field) {
    const { resourceName, state = {} } = this.props;
    const predicate = state.predicate === `asc` ? `desc` : `asc`;

    this.props.actions.updatePagination(resourceName, { offset: 0 });
    this.props.actions.updateOrder(resourceName, field, predicate);
  }

  renderButton(field) {
    const { state = {} } = this.props;
    const isActive = state.field === field;

    return (
      <Button block size="md" className={cn(sBtn.btnInner, { [sBtn.active]: isActive })} key={field} onClick={this.update.bind(this, field)}>
        {dictionary.orderBy[field]}
      </Button>
    );
  }

  render() {
    const { state = {} } = this.props;
    const placeholder = !!state.field ? `Сортировать ${dictionary.orderBy[state.field]}` : `Сортировать`;

    return (
      <div className={sUtils.flex}>
        <CurrencyToggle />

        <Dropdown className={sUtils.btnWideXs} alwaysActive placeholder={placeholder} reset={::this.reset} value={state.field}>
          {this.props.fields.map(::this.renderButton)}
        </Dropdown>
      </div>
    );
  }
}

export default OrderBy;

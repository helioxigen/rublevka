import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// actions
import {
  updateDisplayOption,
  resetDisplayOption,
} from 'displayOptions/actions';

// ui
import UI from 'ui';
const { Button, Icon, BtnGroup, Visibility } = UI;

// styles
import cn from 'classnames';
import sBtn from 'styles/button';
import sUtils from 'styles/utils';

class CurrencyToggle extends Component {
  handleCurrencyButtonClick(currency) {
    const { state } = this.props;
    const selected = state.displayOptions.currency;

    if (selected === currency) {
      this.props.actions.resetDisplayOption('currency');
    } else {
      this.props.actions.updateDisplayOption('currency', currency);
    }
  }

  render() {
    const { state } = this.props;
    const selected = state.displayOptions.currency;

    return (
      <Visibility xs="hidden" sm="hidden">
        <BtnGroup className={sUtils.pushedRight2}>
          <Button
            className={cn(
              sBtn.btnCurrency,
              selected === 'rub' && sBtn.btnCurrencyActive,
            )}
            onClick={() => this.handleCurrencyButtonClick('rub')}
          >
            <Icon className={sBtn.iconCurrency} icon="rub" />
          </Button>
          <Button
            className={cn(
              sBtn.btnCurrency,
              selected === 'usd' && sBtn.btnCurrencyActive,
            )}
            onClick={() => this.handleCurrencyButtonClick('usd')}
          >
            <Icon className={sBtn.iconCurrency} icon="usd" />
          </Button>
          {/* <Button className={cn(sBtn.btnCurrency, selected === 'eur' && sBtn.btnCurrencyActive)} onClick={() => this.handleCurrencyButtonClick('eur')}>
            <Icon className={sBtn.iconCurrency} icon="eur" />
          </Button> */}
        </BtnGroup>
      </Visibility>
    );
  }
}

const pickState = ({ displayOptions }) => ({
  state: { displayOptions },
});

const pickActions = dispatch => {
  const actions = {
    updateDisplayOption,
    resetDisplayOption,
  };

  return {
    actions: bindActionCreators(actions, dispatch),
  };
};

export default connect(
  pickState,
  pickActions,
)(CurrencyToggle);

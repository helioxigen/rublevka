import React, { Component } from 'react';

import debounce from 'lodash/debounce';

import { fetchAddress } from 'cem/helpers/autocomplete';

import UI from 'cem/components/ui';

export default class extends Component {
  render() {
    return (
      <UI.AsyncSelect
        asyncOptions={debounce(fetchAddress(5), 400)}
        onChange={this.props.onChange}
      />
    );
  }
}

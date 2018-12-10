import React, { Component } from 'react';

import debounce from 'lodash/debounce';

import { fetchCompanies } from 'cem/helpers/autocomplete';

import UI from 'cem/components/ui';

export default class extends Component {
  render() {
    return (
      <UI.AsyncSelect asyncOptions={debounce(fetchCompanies(5), 400)} {...this.props} />
    );
  }
}

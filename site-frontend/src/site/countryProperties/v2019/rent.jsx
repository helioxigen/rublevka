import React, { Component } from 'react';

import loadProperty from 'core/countryProperties/actions/id/load';
import Show from './show';

class ShowSale extends Component {
  static loadServer(dispatch, params) {
    return Promise.all([dispatch(loadProperty(params.id))]);
  }

  render() {
    const { params = {} } = this.props;

    return <Show dealType="arenda" kind={params.kind} id={params.id} />;
  }
}

export default ShowSale;

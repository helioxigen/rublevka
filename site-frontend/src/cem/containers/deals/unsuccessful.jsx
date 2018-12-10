import React, { Component } from 'react';

import { connect } from 'react-redux';

import List from 'cem/containers/common/list';
import Filter from 'cem/components/deals/archive/filter/unsuccessful';
import Card from 'cem/components/deals/archive/card';

import { listResourcer } from 'core/decorators/fetcher';

class UnsuccessfulDealsListContainer extends Component {
  render() {
    return (
      <List
        {...this.props} title="Незаключённые сделки" notFoundCaption="Не найдено сделок"
        card={<Card />} filter={<Filter isArchived fetcherFilter={this.props.filters} />}
      />
    );
  }
}

const pickState = ({ auth }) => ({
  state: { auth },
});

export default connect(pickState)(listResourcer({
  id: 'archiveDeals',
  apiPath: '/v1/deals',
  filter: { state: 'unsuccessful' },
  linkedResourcesSchemes: [
    {
      typeId: 'contacts',
      primaryKeyPath: 'contactDetails.id',
    },
  ],
})(UnsuccessfulDealsListContainer));

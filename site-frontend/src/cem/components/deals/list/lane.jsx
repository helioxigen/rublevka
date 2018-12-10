import React, { Component } from 'react';

import Card from './card';

import isEqual from 'lodash/isEqual';

class Lane extends Component {
  shouldComponentUpdate(nextProps) {
    const { items, linkedItemsMap: { contacts } } = this.props;
    return !isEqual(items, nextProps.items) || !isEqual(contacts, nextProps.linkedItemsMap.contacts);
  }

  render() {
    const { items, linkedItemsMap: { contacts } } = this.props;
    return (
      <section>
        {items && items.map(item =>
          <Card data={item} key={item.id} linkedContact={contacts[item.contactDetails.id]} />,
        )}
      </section>
    );
  }
}

export default Lane;

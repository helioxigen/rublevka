import React, { Component } from 'react';
import isEqual from 'lodash/isEqual';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BannerActions from 'cem/actions/properties/banners';
import { pop } from 'cem/actions/toastr';

import Banners from 'cem/components/properties/id/marketing/banners';

class BannersContainer extends Component {
  componentWillMount() {
    const { propertyId, category, bannerState, actions } = this.props;
    actions.loadBanners(propertyId, category, bannerState);
  }

  shouldComponentUpdate(nextProps) {
    const { propertyId, bannerState } = this.props;
    const currentBannerGroup = this.props.state.bannersByPropertyId[propertyId] || {};
    const nextBannerGroup = nextProps.state.bannersByPropertyId[propertyId] || {};
    const { items: currentItems } = currentBannerGroup[bannerState] || {};
    const { items: nextItems } = nextBannerGroup[bannerState] || {};

    return !isEqual(currentItems, nextItems);
  }

  render() {
    const { propertyId, bannerState, state } = this.props;
    const bannerGroup = state.bannersByPropertyId[propertyId] || {};
    const { items, isFetching } = bannerGroup[bannerState] || {};

    return items && !!items.length ? <Banners {...this.props} items={items} isFetching={isFetching} /> : null;
  }
}

const pickState = ({ auth, bannersByPropertyId }) => ({
  state: { auth, bannersByPropertyId },
});

const mapDispatch = dispatch => ({
  actions: bindActionCreators({ ...BannerActions, pop }, dispatch),
});

export default connect(pickState, mapDispatch)(BannersContainer);

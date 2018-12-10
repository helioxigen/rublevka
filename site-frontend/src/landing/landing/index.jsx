import React, { Component } from 'react';
import Scroll from 'react-scroll';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// components
import Helmet from 'react-helmet';
import Header from 'landing/components/header';
import Banner from './banner';
import List from 'landing/properties/index';
import Description from './description';
import Media from './media';
import Map from './map';
import Footer from 'landing/components/footer';

// actions
import loadSettlement from 'core/settlements/actions/id/load';

import { config } from 'landing/config';

class Landing extends Component {
  componentWillMount() {
    this.props.actions.loadSettlement(this.props.id);
  }

  render() {
    const { state, id } = this.props;
    const { settlements = {} } = state;
    const settlement = settlements[id] || {};

    const { data = {} } = settlement;

    const seo = config[id] || {};

    return (
      <section>
        <Helmet
          title={seo.title}
          meta={[
              { name: 'description', content: seo.description },
              { name: 'keywords', content: seo.keywords },
          ]}
        />

        <Header />

        <Banner data={data} />

        <Scroll.Element name="properties">
          <List settlementId={id} />
        </Scroll.Element>

        <Scroll.Element name="description">
          <Description data={data} />
        </Scroll.Element>

        <Media data={data} />

        <Scroll.Element name="map">
          <Map data={data} />
        </Scroll.Element>

        <Footer name={data.name} link={seo.ankor} />
      </section>
    );
  }
}

// redux connectors
const pickState = (state) => {
  const {
    settlements,
  } = state;

  return {
    state: {
      settlements,
    },
  };
};

const pickActions = (dispatch) => {
  const actions = {
    loadSettlement,
  };

  return {
    actions: bindActionCreators(actions, dispatch),
  };
};

export default connect(pickState, pickActions)(Landing);

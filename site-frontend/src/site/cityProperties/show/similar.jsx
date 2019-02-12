import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// actions
import loadProperties from 'core/cityProperties/actions/list/load';

// constants
import { resourceName } from 'core/cityProperties/constants/defaults';
import { dealTypes } from 'site/constants/properties/dictionaries';

import UI from 'site/ui';
const {
  Grid: { Container, Row },
} = UI;

import Card from 'site/cityProperties/card';

import s from 'site/styles/property/similar';

class Similar extends Component {
  constructor(props) {
    super(props);

    this.group = 'similar';
    this.resource = `${resourceName}.${this.group}`;
  }

  componentWillMount() {
    this.load(this.props);

    if (typeof window !== 'undefined') window.scrollTo(0, 0);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.id !== nextProps.id) {
      this.load(nextProps);
    }
  }

  load(props) {
    const { actions, id } = props;
    const dealType = dealTypes[props.dealType];

    actions.loadProperties({}, this.group, { id, dealType });
  }

  render() {
    const { dealType, state } = this.props;

    const { ids = [], isFetching } = state.cityProperties[this.group] || {};

    const hasItems = !!ids.length;

    return (
      <section className={s.container}>
        {hasItems && (
          <Container>
            <h1 className={s.heading}>Похожие объекты</h1>
          </Container>
        )}

        <Row>
          {ids.map(id => (
            <Card dealType={dealType} key={id} id={id} showLocation />
          ))}
        </Row>
      </section>
    );
  }
}

const pickState = state => {
  const { cityProperties } = state;

  return {
    state: {
      cityProperties,
    },
  };
};

const pickActions = dispatch => {
  const actions = {
    loadProperties,
  };

  return {
    actions: bindActionCreators(actions, dispatch),
  };
};

export default connect(
  pickState,
  pickActions,
)(Similar);

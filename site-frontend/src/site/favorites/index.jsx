import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';

import media from 'site/styles/media';

import Card from '../countryProperties/v2019/Card';
import loadCountryProperties from 'core/countryProperties/actions/list/load';

import UI from '../ui/v2019';

const {
  Grid: { Container, Row, Col },
} = UI;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  margin-top: 0;
  padding-top: 18px;
  margin-bottom: 6px;

  ${media.sm`
      font-size: 40px;
      padding-top: 29px;
      margin-bottom: 16px;
   `}

  ${media.md`
      font-size: 48px;
      padding-top: 40px;
      margin-bottom: 13px;
   `}
`;

const Wrapper = styled.div`
  padding-bottom: 36px;
  margin-top: 0;

  ${media.md`
    padding-bottom: 45px;
  `}
`;

function load({ state: { favorites }, actions }) {
  const favoritesIds = favorites.map(item => item.id);
  return actions.loadCountryProperties({ filter: { id: favoritesIds } }, 'favorites');
}

class Favorites extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isLoaded: false };
  }


  componentDidUpdate() {
    const { state, actions } = this.props;
    const { rehydrated } = this.context;

    if (rehydrated && !this.state.isLoaded) {
      load({ state, actions });
      this.setState({ isLoaded: true });
    }
  }

  render() {
    const {
      state: { favorites },
    } = this.props;
    return (
      <Container>
        <Wrapper>
          <Title>Избранное</Title>
          <Col md="10" mdOffset="1">
            <Row>
              {favorites.length > 0 &&
                favorites.map(({ id, dealType }) => (
                  <Col xs="12" sm="6" md="6" lg="4">
                    <Card dealType={dealType} key={id} id={id} showLocation />
                  </Col>
                ))}
            </Row>
          </Col>
        </Wrapper>
      </Container>
    );
  }
}

Favorites.contextTypes = {
  rehydrated: React.PropTypes.bool,
};

// redux connectors
const pickState = (state) => {
  const { favorites } = state;

  return {
    state: {
      favorites,
    },
  };
};

const pickActions = (dispatch) => {
  const actions = {
    loadCountryProperties,
  };

  return {
    actions: bindActionCreators(actions, dispatch),
  };
};

export default connect(
  pickState,
  pickActions,
)(Favorites);

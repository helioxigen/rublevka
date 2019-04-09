import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { cloudfront } from 'core/config/resources';

// actions
import loadSettlement from 'core/settlements/actions/id/load';

import UI from 'ui';

import { nameToSlug } from 'core/helpers/nameToSlug';

import styled from 'styled-components';
import media from 'styles/media';

const {
  Button,
  Grid: { Row },
} = UI;

const Card = styled.div`
  color: ${p => p.theme.brandWhite};
  text-align: center;
  width: 100%;
`;

const Image = styled.div`
  background: transparent center center no-repeat;
  background-size: cover;
  background-image: ${p => p.bgImage};
`;

const Content = styled.div`
  background: rgba(0, 0, 0, 0.4);
  padding: 3rem 3rem 0;
  font-size: 1.4rem;
  font-weight: 300;
  width: 100%;
  padding-bottom: 3rem;

  ${media.sm`
    padding: 8.5rem 3rem 0;
    height: 30rem;
  `};
`;

const Title = styled.div`
  font-size: 2.2rem;
  font-weight: 400;
  text-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);

  ${media.sm`
    font-size: 3.2rem;
  `};
`;

const Location = styled.div`
  margin-top: 0.3rem;
  font-size: 1.4rem;
  color: #f1f1f1;
  white-space: nowrap;
  text-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);

  ${media.sm`
    font-size: 1.6rem;
  `};
`;

const StButton = styled(Button)`
  margin-top: 2.5rem;
  border: ${p => p.theme.brandWhite};
  background: ${p => p.theme.brandWhite};
  color: ${p => p.theme.brandBlack};
  font-size: 1.4rem;
  padding: 1.2rem 2rem;
  border-radius: 10rem;

  &:hover {
    color: ${p => p.theme.brandBlack};
  }

  ${media.sm`
    margin-top: 4rem;
    font-size: 1.6rem;
    padding: 1.9rem 4.6rem;
    color: ${p => p.theme.brandWhite};
    border: ${p => p.theme.brandPrimary};
    background: ${p => p.theme.brandPrimary};

    &:hover {
      color: ${p => p.theme.brandWhite};
      border: ${p => p.theme.brandPrimaryHover};
      background: ${p => p.theme.brandPrimaryHover};
    }
  `};
`;

function getImgUrl(publicImages) {
  if (publicImages.length) {
    return `url(${global.config.cloudfront || cloudfront}/${
      publicImages[0].id
    }-1024)`;
  } else if (typeof window !== 'undefined') {
    return 'url(https://s3.eu-central-1.amazonaws.com/dt-marketing/assets/placeholder.jpg)';
  }
  return 'url(https://s3.eu-central-1.amazonaws.com/dt-marketing/assets/placeholder.jpg)';
}

class Settlement extends Component {
  componentWillMount() {
    this.load(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.settlementId !== nextProps.settlementId) {
      this.load(nextProps);
    }
  }

  load({ actions, settlementId }) {
    actions.loadSettlement(settlementId);
  }

  render() {
    const { settlementId } = this.props;

    const { settlements } = this.props.state;
    const settlement = settlements[settlementId] || {};
    const { data = {} } = settlement;

    const { images = [] } = data;
    const { location = {} } = data;
    const publicImages = images.filter(({ isPublic }) => !!isPublic);

    const imgUrl = getImgUrl(publicImages);

    if (typeof window !== 'undefined' && !window.mapboxgl) return null;

    return (
      <Row>
        <Card>
          <Image bgImage={imgUrl}>
            <Content>
              <Title>{data.name}</Title>
              <Location>
                {location.routeName && (
                  <span>{location.routeName} шоссе,&nbsp;</span>
                )}
                {location.mkadDistance && (
                  <span>{location.mkadDistance} км</span>
                )}
              </Location>
              <StButton
                to={`/zagorodnaya/kottedzhnye-poselki/${nameToSlug(
                  data.name,
                )}_${this.props.settlementId}`}
              >
                Информация о поселке
              </StButton>
            </Content>
          </Image>
        </Card>
      </Row>
    );
  }
}

const pickState = state => {
  const { settlements } = state;

  return {
    state: {
      settlements,
    },
  };
};

const pickActions = dispatch => {
  const actions = {
    loadSettlement,
  };

  return {
    actions: bindActionCreators(actions, dispatch),
  };
};

export default connect(
  pickState,
  pickActions,
)(Settlement);

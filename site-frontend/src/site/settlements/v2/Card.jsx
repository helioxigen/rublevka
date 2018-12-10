import React, { Component } from 'react';
import { Link } from 'react-router';

import { connect } from 'react-redux';

import { cloudfront } from 'core/config/resources';

import UI from 'site/ui';

import { nameToSlug } from 'core/helpers/nameToSlug';

import styled from 'styled-components';
import media from 'site/styles/media';

const { Grid: { Col } } = UI;

const CardContainer = styled(Col)`
  margin-bottom: 3rem;
  ${media.xlg`
    flex-basis: 25%;
    max-width: 25%;
  `};
`;

const KindsWrapper = styled.div`padding: 0;`;

const StLink = styled(Link)`
  display: flex;
  justify-content: space-between;
  font-size: 1.4rem;
  line-height: 2.2rem;
  padding: 1.1rem 1.5rem;
  color: ${p => p.theme.brandBlack};
  cursor: pointer;
  border-style: solid;
  border-color: ${p => p.theme.greyLight};
  border-width: 0 1px 1px 1px;
  border-radius: 0;

  :hover {
    color: ${p => p.theme.brandPrimary};
  }

  ${p =>
    p.isDisabled &&
    `
    pointer-events: none;
    cursor: default;
    color: #a5a5a5;
  `};
`;

const StLinkLast = StLink.extend`border-radius: 0 0 0.4rem 0.4rem;`;

const Wrapper = styled(Link)`
  position: relative;
  display: block;
  height: 9.5rem;
  border-radius: 0.4rem 0.4rem 0 0;
  overflow: hidden;
  padding: 2.4rem 1.5rem 0;
  background-size: cover;
  background-size: 100%;
  background-position: 50% 50%;

  ${p =>
    p.withPattern &&
    `
    background: url(${require('site/assets/images/white-pattern.svg')}) repeat #566872;
    background-size: 120%;
  `} ${media.sm`
    height: 11rem;
    padding: 3.5rem 1.5rem 0;
  `};
`;

const Overlay = styled.div`
  content: '';
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
  top: 0;
  background: ${p => (p.bgImg ? 'rgba(0, 0, 0, 0.35)' : 'rgba(86, 104, 114, .8)')};
  z-index: 1;
`;

const Title = styled.span`
  position: relative;
  color: ${p => p.theme.brandWhite};
  font-size: 2rem;
  font-weight: 500;
  margin-top: 0;
  margin-bottom: 0.5rem;
  overflow: hidden;
  z-index: 2;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: block;

  ${media.sm`
    font-size: 2.1rem;
  `};
`;

const Location = styled.div`
  position: relative;
  padding-right: 1.5rem;
  color: ${p => p.theme.brandBlack};
  line-height: 1;
  overflow: hidden;
  white-space: normal;
  z-index: 2;

  ${media.sm`
    padding-right: 0;
    white-space: nowrap;
  `};
`;

const LocationTitle = styled.span`
  margin: 0;
  color: ${p => p.theme.brandWhite};
  font-weight: 400;
  font-size: 1.4rem;
  display: inline-block;

  ${media.sm`
    font-size: 1.5rem;
    position: relative;
    max-width: 100%;
    overflow: hidden;
    line-height: 1.5;
  `};
`;

const Counter = styled.span`margin-left: 0.5rem;`;

function getImgUrl(cover) {
  if (cover === undefined) {
    return `${require('site/assets/images/white-pattern.svg')}`;
  }
  return `url(${global.config.cloudfront || cloudfront}/${cover}-thumbnail-512)`;
}

class Card extends Component {
  render() {
    const { data = {} } = this.props;
    const { stats = {}, mkadDistance, routeName, cover } = data;
    const { sale = {}, rent = {} } = stats;

    const houses = (sale.house || 0) + (rent.house || 0);
    const lands = (sale.land || 0) + (rent.land || 0);
    const townhouses = (sale.townhouse || 0) + (rent.townhouse || 0);
    const flats = (sale.flat || 0) + (rent.flat || 0);

    const imgUrl = getImgUrl(cover);

    return (
      <CardContainer xs="12" sm="6" md="4">
        <Wrapper
          to={`/zagorodnaya/kottedzhnye-poselki/${nameToSlug(data.name)}_${data.id}`}
          style={{ backgroundImage: imgUrl }}
          withPattern={cover === undefined}
        >
          <Overlay bgImg={cover !== undefined} />
          <Title>{data.name}</Title>
          <Location>
            <LocationTitle>{routeName} ш.,&nbsp;</LocationTitle>
            <LocationTitle>{mkadDistance} км</LocationTitle>
          </Location>
        </Wrapper>

        <KindsWrapper>
          <StLink
            isDisabled={houses === 0}
            to={`/zagorodnaya/kottedzhnye-poselki/${nameToSlug(data.name)}_${data.id}/dom`}
          >
            Дома <Counter>{houses}</Counter>
          </StLink>
          <StLink
            isDisabled={lands === 0}
            to={`/zagorodnaya/kottedzhnye-poselki/${nameToSlug(
              data.name,
            )}_${data.id}/uchastok`}
          >
            Участки <Counter>{lands}</Counter>
          </StLink>
          <StLink
            isDisabled={townhouses === 0}
            to={`/zagorodnaya/kottedzhnye-poselki/${nameToSlug(
              data.name,
            )}_${data.id}/taunhaus`}
          >
            Таунхаусы <Counter>{townhouses}</Counter>
          </StLink>
          <StLinkLast
            isDisabled={flats === 0}
            to={`/zagorodnaya/kottedzhnye-poselki/${nameToSlug(
              data.name,
            )}_${data.id}/kvartira`}
          >
            Квартиры <Counter>{flats}</Counter>
          </StLinkLast>
        </KindsWrapper>
      </CardContainer>
    );
  }
}

// redux connectors
const pickState = ({ settlements, displayOptions }, { id }) => {
  const { data = {}, isFetching } = settlements[id];

  return {
    data,
    isFetching,
    selectedCurrency: displayOptions.currency,
  };
};

export default connect(pickState)(Card);

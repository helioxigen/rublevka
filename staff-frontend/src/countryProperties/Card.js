/* eslint-disable react/style-prop-object */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';

import { FormattedNumber } from 'react-intl';
import pluralize from 'pluralize-ru';

import { Body, BodyBigBold } from '../UI';

import { states } from './constants/dictionaries';

import placeholder from './img/placeholder.png';

const Link = styled(RouterLink)`
  display: block;
  width: 100%;
  position: relative;
  margin: 8px 0px;
  background: #ffffff;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  overflow: hidden;

  &:hover {
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: ${p => (p.isPlaceholder ? 'contain' : 'cover')};
`;

const Id = styled.p`
  margin: 0;
  padding: 6px 8px;
  position: absolute;
  top: 14px;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;

  line-height: 14px;
  font-size: 14px;
  font-weight: 500;

  color: #ffffff;
`;

const stateStyles = {
  primary: '#1EAAF1',
  success: '#50AD55',
  warning: '#FDC02F',
  danger: '#F1453D',
};

const State = styled.p`
  margin: 0;
  padding: 6px 8px;
  position: absolute;
  top: 14px;
  left: 0;
  background: ${({ state }) => stateStyles[states[state].style]};
  border-radius: 4px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;

  line-height: 14px;
  font-size: 14px;
  font-weight: 500;

  color: #ffffff;
`;

const TitleWrapper = styled.h3`
  margin: 14px 10px 5px 10px;
  line-height: 24px;
  font-size: 17px;
  color: #232323;
  font-weight: 500;
`;

const SummaryInfo = styled.span`
  &::before {
    content: ' · ';
  }
`;

const Summary = styled.p`
  margin: 0 10px;
  line-height: 16px;
  font-size: 15px;
  text-transform: lowercase;

  color: #8e8e8e;

  ${SummaryInfo}:first-of-type {
    &::before {
      content: '';
    }
  }
`;

const StPrice = styled.p`
  margin: 22px 10px 0px 10px;
  padding-bottom: 14px;
  line-height: 24px;
  font-size: 18px;
  font-weight: 600;

  color: #232323;
`;

function Price({ saleOffer, rentOffer }) {
  return (
    <StPrice>
      {saleOffer && (
        <FormattedNumber
          style="currency"
          currency={saleOffer.currency}
          value={saleOffer.price}
          maximumSignificantDigits={12}
        />
      )}
      {rentOffer && (
        <>
          {' / '}
          <FormattedNumber
            style="currency"
            currency={rentOffer.currency}
            value={rentOffer.price}
            maximumSignificantDigits={12}
          />{' '}
          в мес
        </>
      )}
    </StPrice>
  );
}

class Card extends Component {
  renderPhoto = (data) => {
    const { images = [] } = data;
    const publicImages = images.filter(({ isPublic }) => !!isPublic);

    if (publicImages.length) {
      return (
        <Image
          src={`https://images.rublevka.ru/${publicImages[0].id}-thumbnail-512`}
        />
      );
    }

    return <Image src={placeholder} isPlaceholder />;
  };

  render() {
    const { data = {} } = this.props;
    const {
      specification = {},
      landDetails = {},
      location = {},
      saleOffer,
      rentOffer,
    } = data;

    return (
      <Link to={`/country-properties/${data.id}`}>
        <Id>{`№ ${data.id}`}</Id>
        <State state={data.state}>{states[data.state].title}</State>

        {this.renderPhoto(data)}

        <TitleWrapper>
          <BodyBigBold>{location.settlementName}</BodyBigBold>
          <Body>{`${location.routeName}, ${location.mkadDistance} км`}</Body>
        </TitleWrapper>

        <Summary>
          {landDetails.area && (
            <SummaryInfo>
              {Math.floor(landDetails.area)}
              &nbsp;сот
            </SummaryInfo>
          )}
          {!!specification.area && (
            <SummaryInfo>
              {Math.floor(specification.area)}
              &nbsp;м²
            </SummaryInfo>
          )}
          {specification.bedrooms && (
            <SummaryInfo>
              {pluralize(
                specification.bedrooms,
                '0 спален',
                '%d спальня',
                '%d спальни',
                '%d спален',
              )}
            </SummaryInfo>
          )}
        </Summary>

        <Price saleOffer={saleOffer} rentOffer={rentOffer} />
      </Link>
    );
  }
}

// redux connectors
const pickState = ({ countryProperties }, { id }) => {
  const { data = {}, isFetching } = countryProperties[id] || {};

  return {
    data,
    isFetching,
  };
};

export default connect(pickState)(Card);

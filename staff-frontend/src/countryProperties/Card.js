import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';

import pluralize from 'pluralize-ru';

import { Body, BodyBigBold } from '../UI';

// import { FormattedNumber } from 'react-intl';

// import Title from 'site/countryProperties/v2019/show/Title';
// import Price from 'site/countryProperties/v2019/show/Price';

// import { dealTypes, kindsTranslit } from './constants/dictionaries';

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
  object-fit: cover;
`;

const Id = styled.p`
  margin: 0;
  padding: 5px;
  position: absolute;
  top: 20px;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;

  line-height: 18px;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0.535714px;

  color: #ffffff;

  text-shadow: 0px 0px 15px rgba(0, 0, 0, 0.35);
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

const PriceWrapper = styled.p`
  margin: 22px 10px 0px 10px;
  padding-bottom: 14px;
  line-height: 24px;
  font-size: 18px;
  font-weight: 500;

  color: #232323;
`;

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

    return null;
  };

  render() {
    const { data = {} } = this.props;
    const { specification = {}, landDetails = {}, location = {} } = data;
    const deal = data.saleOffer || {};

    return (
      <Link to={`/country-properties/${data.id}`}>
        <Id>
№
          {data.id}
        </Id>
        {this.renderPhoto(data)}
        <TitleWrapper>
          <BodyBigBold>{location.settlementName}</BodyBigBold>
          <Body>
            {location.routeName}
,
            {location.mkadDistance}
            {' '}
км
          </Body>
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
          {!!specification.bedrooms && (
            <SummaryInfo>
              {/* {pluralize(
                specification.bedrooms,
                '%d спальня',
                '%d спальни',
                '%d спален',
              )} */}
            </SummaryInfo>
          )}
        </Summary>
        <PriceWrapper>
          {/* <Price deal={deal} dealType={dealType} /> */}
        </PriceWrapper>
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

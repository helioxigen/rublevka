import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import styled from 'styled-components';

import { bindActionCreators } from 'redux';
// actions
import { toggleFavorite } from 'core/actions/favorites';
//

import { FormattedNumber } from 'react-intl';
import { cloudfront } from 'core/config/resources';

import global from 'window-or-global';

import Title from 'site/countryProperties/v2019/show/Title';
import Price from 'site/countryProperties/v2019/show/Price';

import UI from 'site/ui';

import media from 'site/styles/media';


import {
  dealTypes,
  kindsTranslit,
} from 'site/constants/properties/dictionaries';

const {
  Icon,
  CountIndicator,
 } = UI;

const LinkWrapper = styled(Link)`
  display: block;
  width: 100%;
  position: relative;
  margin: 8px 0px;
  background: #ffffff;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  overflow: hidden;

  &:hover{
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 220px;
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

  ${media.sm`
    min-height: 48px;
  `};
`;

const SummaryInfo = styled.span`
   &::before {
    content: " · ";
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
      content: "";
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

const StIcon = styled(Icon)`
  width: 100%;
  height: 220px;
  fill: #edecec;
`;

const FavoriteIcon = styled(Icon)`
  margin: 0;
  position: absolute;
  top: 20px;
  right: 15px;
  width: 24px;
  height: 22px;
  display: block;
  stroke: #ffffff;
  stroke-width: 2px;
  fill: ${p => p.isActive ? '#F44336' : 'rgba(0,0,0, 0.3)'};
`;

class Card extends Component {
  renderPhoto = (data) => {
    const { images = [] } = data;
    const publicImages = images.filter(({ isPublic }) => !!isPublic);

    if (publicImages.length) {
      return (
        <Image
          src={`${global.config.cloudfront || cloudfront}/${
              publicImages[0].id
              }-thumbnail-512`}
        />
      );
    } else if (typeof window !== 'undefined') {
      return <StIcon icon="placeholder" />;
    }

    return null;
  }

  render() {
    const { data = {}, favorites, id } = this.props;
    const dealType = dealTypes[this.props.dealType];
    const { specification = {}, landDetails = {} } = data;
    const deal = data[`${dealType}Offer`] || {};
    return (
      <LinkWrapper to={`/zagorodnaya/${this.props.dealType}/${
          kindsTranslit[data.kind]
          }/${data.id}`}
      >
        <Id>№ {data.id}</Id>
        <FavoriteIcon
          isActive={favorites.includes(Number.parseInt(id))}
          onClick={(e) => { e.preventDefault(); this.props.actions.toggleFavorite(Number.parseInt(id)); }}
          icon="favorite"
        />
        {this.renderPhoto(data)}
        <TitleWrapper> <Title data={data} dealType={dealType} /> </TitleWrapper>
        <Summary>
          {landDetails.area && (
            <SummaryInfo>
              {Math.floor(landDetails.area)}&nbsp;сот
            </SummaryInfo>
          )}
          {!!specification.area && (
            <SummaryInfo>
              {Math.floor(specification.area)}&nbsp;м²
            </SummaryInfo>
          )}
          {!!specification.bedrooms && (
            <SummaryInfo>
              <CountIndicator
                count={specification.bedrooms}
                declensionForms={['спальня', 'спальни', 'спален']}
              />
            </SummaryInfo>
            )}
        </Summary>
        <PriceWrapper><Price deal={deal} dealType={dealType} /></PriceWrapper>
      </LinkWrapper>
    );
  }
}

// redux connectors
const pickState = (state, { id }) => {
  const { countryProperties, favorites } = state;
  const { data = {}, isFetching } = countryProperties[id] || {};

  return {
    data,
    favorites,
    isFetching,
  };
};

const pickActions = (dispatch) => {
  const actions = {
    toggleFavorite,
  };

  return {
    actions: bindActionCreators(actions, dispatch),
    dispatch,
  };
};

export default connect(pickState, pickActions)(Card);


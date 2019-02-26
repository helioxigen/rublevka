import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Link } from 'react-router';

import { cloudfront } from 'core/config/resources';

import global from 'window-or-global';

import UI from 'site/ui';

import Price from '../show/price';

import cn from 'classnames';
import s from 'site/styles/components/card';
import sUtils from 'site/styles/utils';

import {
  dealTypes,
  kindsTranslit,
} from 'site/constants/properties/dictionaries';
import { kinds } from 'site/constants/places';

import styled from 'styled-components';
import media from 'site/styles/media';

const isJQ = global.config.domain === 'jq.estate';

const {
  Grid: { Col },
  Icon,
} = UI;

const CardContainer = styled(Col)`
  ${media.xlg`
    flex-basis: 25%;
    max-width: 25%;
  `};
`;

const Wrapper = styled(Link)`
  position: relative;
  z-index: 1;
  display: block;
  padding: 1.5rem 1.5rem 1rem;
  margin: -1px -1.5rem 0 -1.6rem;
  color: ${p => p.theme.brandBlack};
  text-decoration: none;
  white-space: nowrap;
  background: ${p => p.theme.brandWhite};
  border-top: 1px solid ${p => p.theme.grey};
  overflow: hidden;
  transition: all 0.3s;

  ${media.sm`
    &:hover,
    &:focus {
      z-index: 2;
      color: ${p => p.theme.brandBlack};
      text-decoration: none;
      border-color: ${p => p.theme.silverChalice};
    }

    padding: 2rem 2rem 1rem;
    border: 1px solid ${p => p.theme.grey};
  `} ${media.xlg`
    padding: 2.5rem 2.5rem 1rem;
  `};
`;

const ImageWrapper = styled.div`
  position: relative;
  margin: 0;

  ${media.sm`
    margin-bottom: 0;

    &:after {
      box-shadow: none;
    }
  `};
`;

const Image = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  min-height: 17rem;
  height: 30vh;
  background: #f5f5f5 center center no-repeat;
  background-size: cover;
  margin-bottom: 1.1rem;

  ${media.xs`
    min-height: 25rem;
  `} ${media.sm`
    min-height: 20rem;
    height: inherit;
    margin-bottom: 2rem;

    &:after {
      box-shadow: none;
    }
  `} ${media.lg`
    min-height: 25rem;
    max-height: 25rem;
  `} ${media.xlg`
    min-height: 20rem;
    max-height: 20rem;
  `};
`;

const DefaultImage = styled(Icon)`
  width: 100%;
  min-height: 9rem;
  max-height: 7rem;
  fill: #5f5f5f;

  ${media.xs`
    min-height: 15rem;
    max-height: 11.8rem;
  `} ${media.sm`
    min-height: 12.7rem;
    max-height: 10rem;
  `} ${media.xlg`
    min-height: 10rem;
    max-height: 8rem;
  `};
`;

const InfoWrapper = styled.div`
  position: relative;
  text-align: left;

  ${media.sm`
    padding-left: 0.5rem;
  `};
`;

const LocationWrapper = styled.div`
  display: none;
  width: 100%;

  ${media.md`
    display: inline-block;
  `};
`;

const LocationWrapperMobile = styled.div`
  display: inline-block;
  width: 100%;

  ${media.md`
    display: none;
  `};
`;

const Location = styled.div`
  width: 100%;
  color: ${p => p.theme.brandBlack};
  line-height: 1;
  overflow: hidden;
  white-space: nowrap;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    box-shadow: inset -4.5rem 0 5rem -2rem rgba(255, 255, 255, 1);
  }

  ${media.sm`
    padding-right: 0;
  `};
`;

const SubLocality = styled.div`
  position: relative;
  display: inline-block;
  margin: 0;
  margin-bottom: 0;
  color: ${p => p.theme.doveGray};
  font-size: 1.4rem;

  ${media.sm`
    font-size: 1.6rem;
    max-width: 100%;
    overflow: hidden;
    line-height: 1;
  `};
`;

const Settlement = SubLocality.extend`
  margin: 0 0 0.2rem;

  ${media.sm`
    margin: 0;
  `};
`;

const PriceTitle = styled.div`
  margin: 0;
  font-weight: bold;
  color: ${p => p.theme.brandBlack};
  font-size: 1.8rem;

  ${media.xs`
    font-size: 2rem;
  `} ${media.sm`
    font-size: 2.2rem;
  `};
`;

const ParamsWrapper = styled.div`
  margin: 0.8rem 0 0.5rem;

  ${media.sm`
    margin: 0 0 1.5rem;
  `};
`;

const ParamsUl = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const ParamsLi = styled.li`
  display: inline-block;
  color: ${p => p.theme.brandBlack};
  font-size: 1.3rem;
  line-height: 1;

  &:first-child {
    margin-right: 3rem;
  }

  ${media.sm`
    margin-top: 1.6rem;
    font-size: 1.6rem;
  `};
`;

const ParamsIcon = styled(Icon)`
  position: relative;
  top: 0.1rem;
  margin-right: 1rem;
  fill: ${p => p.theme.nobel};
`;

const ParamsIconHouse = ParamsIcon.extend`
  width: 1.18rem;
  height: 1.14rem;

  ${media.sm`
    width: 1.48rem;
    height: 1.43rem;
  `};
`;

const ParamsIconLand = ParamsIcon.extend`
  width: 1.07rem;
  height: 1.06rem;

  ${media.sm`
    width: 1.48rem;
    height: 1.43rem;
  `};
`;

const Badge = styled.div`
  position: absolute;
  top: 1.5rem;
  left: 0;
  z-index: 2;
  color: ${p => p.theme.brandWhite};
  font-size: 1.2rem;
  padding: 0.6rem 1.2rem 0.5rem;
  border-top-right-radius: 0.4rem;
  border-bottom-right-radius: 0.4rem;

  ${media.xs`
    top: 3rem;
    font-size: 1.4rem;
    padding: 0.7rem 1.2rem 0.6rem;
  `} ${media.sm`
    top: 2rem;
    font-size: 1.5rem;
    padding: 0.8rem 1.5rem 0.7rem;
  `};
`;

class Card extends Component {
  renderPhoto(data) {
    const { images = [] } = data;
    const publicImages = images.filter(({ isPublic }) => !!isPublic);

    if (publicImages.length) {
      return (
        <Image
          style={{
            backgroundImage: `url(${global.config.cloudfront || cloudfront}/${
              publicImages[0].id
            }-thumbnail-512)`,
          }}
        />
      );
    } else if (typeof window !== 'undefined') {
      return (
        <Image>
          <DefaultImage icon="placeholder2" />
        </Image>
      );
    }

    return null;
  }

  renderLocation(data) {
    if (this.props.showLocation) {
      const { id, location = {} } = data;

      return (
        <Location>
          <Settlement title={isJQ && location.routeName}>
            {kinds[data.kind]} в посёлке «{location.settlementName}»
            <span className={sUtils.hideXsInline}>,</span>&nbsp;
          </Settlement>
          <SubLocality>
            <span title={isJQ && location.routeName}>
              {!!location.mkadDistance && `${location.mkadDistance} км`}
            </span>
            ,&nbsp;<span>ID&nbsp;{id}</span>
          </SubLocality>
        </Location>
      );
    }
  }

  render() {
    const { data = {}, isFetching } = this.props;
    const dealType = dealTypes[this.props.dealType];
    const { specification = {}, landDetails = {}, badge = {} } = data;
    const deal = data[`${dealType}Offer`] || {};

    if (!isFetching) {
      return (
        <CardContainer xs="12" sm="6" md="4">
          <Wrapper
            className={cn(this.props.className, s.paddingBottomSm2)}
            to={`/zagorodnaya/${this.props.dealType}/${
              kindsTranslit[data.kind]
            }/${data.id}`}
          >
            <ImageWrapper>
              {this.renderPhoto(data)}

              {!!badge && !!badge.title && (
                <Badge style={{ background: badge.color }}>{badge.title}</Badge>
              )}

              {this.props.showLocation && (
                <LocationWrapperMobile>
                  {this.renderLocation(data)}
                </LocationWrapperMobile>
              )}
            </ImageWrapper>

            <InfoWrapper>
              {this.props.showLocation && (
                <LocationWrapper>{this.renderLocation(data)}</LocationWrapper>
              )}

              <PriceTitle>
                <Price deal={deal} dealType={dealType} />
              </PriceTitle>

              <ParamsWrapper>
                <ParamsUl>
                  {!!landDetails.area && (
                    <ParamsLi>
                      <ParamsIconLand icon="area" />
                      {Math.floor(landDetails.area)} сот
                    </ParamsLi>
                  )}

                  {!!specification.totalArea && (
                    <ParamsLi>
                      <ParamsIconHouse icon="house" />
                      {Math.floor(specification.totalArea)} м²
                    </ParamsLi>
                  )}

                  {!!specification.area && (
                    <ParamsLi>
                      <ParamsIconHouse icon="house" />
                      {Math.floor(specification.area)} м²
                    </ParamsLi>
                  )}
                  <ParamsLi />
                </ParamsUl>
              </ParamsWrapper>
            </InfoWrapper>
          </Wrapper>
        </CardContainer>
      );
    }

    return null;
  }
}

// redux connectors
const pickState = (state, { id }) => {
  const { countryProperties } = state;
  const { data = {}, isFetching } = countryProperties[id] || {};

  return {
    data,
    isFetching,
  };
};

export default connect(pickState)(Card);

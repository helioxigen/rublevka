import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import styled from 'styled-components';
import ReactSwipe from 'react-swipe';

import global from 'window-or-global';
import { bindActionCreators } from 'redux';
// actions
import { toggleFavorite } from '../../core/actions/favorites';

import { cloudfront } from '../../core/config/resources';

import Title from './show/Title';
import Price from './show/Price';

import UI from '../../ui';

import media from '../../styles/media';

import {
  dealTypes,
  kindsTranslit,
} from '../../constants/properties/dictionaries';

const { Icon, CountIndicator, Visibility } = UI;

const LinkWrapper = styled(Link)`
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

const ImageContainer = styled.section`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Image = styled.img`
  object-fit: cover;
  width: 100%;
  height: 220px;
`;

const Slider = styled.div`
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: transparent;
  z-index: 1;

  ${LinkWrapper}:hover & {
    display: flex;
  }
`;

const Slide = styled.div`
  padding: 10px 1px;
  flex-grow: 1;
  display: flex;
  align-items: flex-end;

  &:first-child {
    padding-left: 10px;
  }

  &:last-child {
    padding-right: 10px;
  }
`;

const SlideIndicator = styled.div`
  width: 100%;
  height: 3px;
  border-radius: 2px;
  background-color: #eeeeee;
  opacity: 0.5;

  ${({ selected }) =>
    selected &&
    `
    background-color: #f44336;
    opacity: 1;
  `};
`;

const MobileIndicators = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MobileIndicator = styled.div`
  margin: 0px 2.5px;
  width: 6px;
  height: 6px;
  border-radius: 5px;
  background: #ffffff;
  opacity: 0.75;

  ${({ selected }) =>
    selected &&
    `
    width: 8px;
    height: 8px;
    opacity: 1;
  `};
`;

const Id = styled.p`
  margin: 0;
  padding: 5px;
  position: absolute;
  top: 15px;
  left: 0;
  z-index: 2;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;

  line-height: 18px;
  font-size: 15px;
  font-weight: 500;

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

const StIcon = styled(Icon)`
  width: 100%;
  height: 220px;
  fill: #edecec;
`;

const FavoriteIcon = styled(Icon)`
  margin: 0;
  padding: 15px;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
  width: 54px;
  height: 52px;
  display: block;
  stroke: #ffffff;
  stroke-width: 2px;
  fill: ${p => (p.isActive ? '#F44336' : 'rgba(0,0,0, 0.3)')};

  &:hover {
    fill: ${p => (p.isActive ? '#F44336' : 'rgba(0,0,0, 0.5)')};
  }
`;

class Card extends Component {
  state = { selectedImage: 0 };

  renderPhoto = () => {
    const {
      data: { images = [] },
    } = this.props;
    const { selectedImage, showSlider } = this.state;
    const publicImages = images.filter(({ isPublic }) => !!isPublic);

    if (publicImages.length) {
      return (
        <ImageContainer>
          <Visibility xs="hidden" sm="hidden" md="hidden" lg="block">
            {publicImages.length > 1 && (
              <Slider onMouseLeave={() => this.setState({ selectedImage: 0 })}>
                {images.slice(0, 6).map((el, index) => (
                  <Slide
                    onMouseOver={() => this.setState({ selectedImage: index })}
                  >
                    <SlideIndicator selected={selectedImage === index} />
                  </Slide>
                ))}
              </Slider>
            )}
            <Image
              src={`${global.config.cloudfront || cloudfront}/${
                publicImages[selectedImage].id
              }-thumbnail-512`}
            />
          </Visibility>
          <Visibility xs="block" sm="block" md="block" lg="hidden">
            <ReactSwipe
              swipeOptions={{
                callback: index => this.setState({ selectedImage: index }),
              }}
            >
              {images.slice(0, 6).map(image => (
                <Image
                  src={`${global.config.cloudfront || cloudfront}/${
                    image.id
                  }-thumbnail-512`}
                />
              ))}
            </ReactSwipe>
            <MobileIndicators>
              {publicImages.length > 1 &&
                images
                  .slice(0, 6)
                  .map((el, index) => (
                    <MobileIndicator selected={selectedImage === index} />
                  ))}
            </MobileIndicators>
          </Visibility>
        </ImageContainer>
      );
    }
    if (typeof window !== 'undefined') {
      return <StIcon icon="placeholder" />;
    }

    return null;
  };

  render() {
    const { data = {}, favorites, id, actions } = this.props;
    const dealType = dealTypes[this.props.dealType];
    const { specification = {}, landDetails = {} } = data;
    const deal = data[`${dealType}Offer`] || {};

    return (
      <LinkWrapper
        to={`/zagorodnaya/${this.props.dealType}/${kindsTranslit[data.kind]}/${
          data.id
        }`}
      >
        <Id>№{data.id}</Id>
        <FavoriteIcon
          isActive={favorites.some(
            item =>
              item.id === Number.parseInt(id, 10) &&
              item.dealType === this.props.dealType,
          )}
          onClick={(e) => {
            e.preventDefault();
            actions.toggleFavorite(
              Number.parseInt(id, 10),
              this.props.dealType,
            );
          }}
          icon="favorite"
        />
        {this.renderPhoto()}
        <TitleWrapper>
          {' '}
          <Title data={data} dealType={dealType} />{' '}
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
              <CountIndicator
                count={specification.bedrooms}
                declensionForms={['спальня', 'спальни', 'спален']}
              />
            </SummaryInfo>
          )}
        </Summary>
        <PriceWrapper>
          <Price deal={deal} dealType={dealType} />
        </PriceWrapper>
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

export default connect(
  pickState,
  pickActions,
)(Card);

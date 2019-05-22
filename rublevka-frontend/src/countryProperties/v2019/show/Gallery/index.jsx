/* eslint-disable no-return-assign */
import React from 'react';
import styled from 'styled-components';
import ReactSwipe from 'react-swipe';
import global from 'window-or-global';
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock';
import { cloudfront } from '../../../../core/config/resources';

import media from '../../../../styles/media';
import UI from '../../../../ui';
import GalleryNav from './GalleryNav';
import GalleryCount from './GalleryCount';
import GalleryWrapper, { ExpandButton } from './GalleryWrapper';
import FullScreen from './FullScreen';
import Controls from './Controls';
import { getImageLink } from './utils';

const { Icon, Visibility } = UI;

const MobileGallery = styled.div`
  display: none;
  pointer-events: none;
  position: fixed;
  top: 0;
  bottom: 85px;
  left: 0;
  right: 0;
  z-index: 2;
  background-color: #fafafa;

  ${({ visible }) =>
    visible &&
    `
    display: flex;
    flex-direction: column;
    pointer-events: auto;
  `};

  ${media.xs`
    display: none;
  `}
`;

const Header = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 12px 15px;
  width: 100%;
  background: #ffffff;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.15);
  z-index: 2;
`;

const CloseButton = styled.button`
  margin: 0;
  padding: 0;
  border: none;
  background: none;
`;

const CloseIcon = styled(Icon)`
  width: 24px;
  height: 24px;
  fill: rgba(8, 8, 8, 0.3);
`;

const MobilePhotos = styled.div`
  padding: 64px 15px 10px 15px;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
`;

const MobilePhoto = styled.img`
  margin: 8px 0;
  width: 100%;
  height: 220px;
  object-fit: cover;
`;

const Photo = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;

  ${media.xs`
    height: 400px;
  `}

  ${media.sm`
    height: 480px;
  `}

  ${media.md`
    height: 450px;
  `}
`;

const Id = styled.p`
  margin: 0;
  padding: 5px;
  position: absolute;
  top: 20px;
  left: 15px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 4px;

  line-height: 18px;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0.535714px;

  color: #ffffff;

  text-shadow: 0px 0px 15px rgba(0, 0, 0, 0.35);

  ${media.md`
    display: none;
  `}
`;

const FavoriteIcon = styled(Icon)`
  margin: 0;
  position: absolute;
  top: 20px;
  right: 15px;
  width: 24px;
  height: 22px;
  stroke: #fff;
  stroke-width: 2px;
  fill: ${p => (p.isActive ? '#F44336' : 'rgba(0,0,0, 0.3)')};

  ${media.md`
    display: none;
  `}
`;

export default class Gallery extends React.Component {
  state = {
    currentImageIdx: 0,
    isGalleryOpen: false,
  };

  galleryCallback = idx => this.setState({ currentImageIdx: idx });

  toggleGallery = () =>
    this.setState({ isGalleryOpen: !this.state.isGalleryOpen });

  render() {
    const { isGalleryOpen, currentImageIdx } = this.state;
    const {
      propertyId,
      toggleFavorite,
      isFavorite,
      hasLayoutImages,
      images,
      fullScreenTitle,
    } = this.props;

    return (
      <section>
        {/* <MobileGallery visible={images.length !== 0 && isGalleryOpen}>
          <Header>
            <CloseButton onClick={this.closeGallery}>
              <CloseIcon icon="close-button" />
            </CloseButton>
          </Header>
          <MobilePhotos innerRef={el => (this.modal = el)}>
            {images.map(({ id }) => (
              <MobilePhoto
                key={id}
                src={`${global.config.cloudfront || cloudfront}/${id}-${
                  global.config.postfix
                }-1024`}
              />
            ))}
          </MobilePhotos>
        </MobileGallery> */}
        <FullScreen
          isOpen={isGalleryOpen}
          initialSlide={currentImageIdx}
          images={images}
          title={fullScreenTitle}
          onFavoriteClick={toggleFavorite}
          isFavorite={isFavorite}
          onClose={this.toggleGallery}
        />
        <GalleryWrapper
          onNextClick={() => this.carousel.next()}
          onPrevClick={() => this.carousel.prev()}
        >
          <div style={{ maxHeight: 450, overflow: 'hidden' }}>
            <ReactSwipe
              ref={el => (this.carousel = el)}
              swipeOptions={{ callback: this.galleryCallback }}
            >
              {images.map(({ id }) => (
                <Photo
                  key={id}
                  data-id={id}
                  alt={id}
                  onClick={this.toggleGallery}
                  src={getImageLink(id, 1024)}
                />
              ))}
            </ReactSwipe>
          </div>
          <Visibility xs="hidden" sm="block" md="block" lg="block">
            <ExpandButton onClick={this.toggleGallery}>
              <Icon icon="arrows-expand" />
            </ExpandButton>
          </Visibility>
          <GalleryCount
            overall={images.length}
            currentIndex={currentImageIdx + 1}
          />
          <Id>№ {propertyId}</Id>
          <FavoriteIcon
            isActive={isFavorite}
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              toggleFavorite();
            }}
            icon="favorite"
          />
        </GalleryWrapper>
        {/* <Wrapper>
          <Visibility xs="block" sm="hidden" md="hidden" lg="hidden">
            <Photo
              src={`${global.config.cloudfront || cloudfront}/${images[0].id}-${
                global.config.postfix
              }-1024`}
              alt={images[0].id}
              onClick={this.openGallery}
            />
          </Visibility>
          <Visibility xs="hidden" sm="block" md="block" lg="block">
            <PrevButton onClick={() => this.carousel.prev()}>
              <ArrowIcon icon="carousel-left" />
            </PrevButton>
            <ReactSwipe
              ref={el => (this.carousel = el)}
              swipeOptions={{ callback: this.galleryCallback }}
            >
              {images.map(({ id }) => (
                <Photo
                  key={id}
                  data-id={id}
                  alt={id}
                  src={this.getImageLink(id, 1024)}
                />
              ))}
            </ReactSwipe>
            <NextButton onClick={() => this.carousel.next()}>
              <ArrowIcon icon="carousel-right" />
            </NextButton>
          </Visibility>
        </Wrapper> */}
        <GalleryNav
          currentImageIdx={currentImageIdx}
          showLayoutButton={hasLayoutImages}
          images={images}
          onImageClick={idx => this.carousel.slide(idx)}
        />
      </section>
    );
  }
}

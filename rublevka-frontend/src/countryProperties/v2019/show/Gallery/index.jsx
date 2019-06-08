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

  pointer-events: none;

  ${media.xs`
    height: 400px;
  `}

  ${media.sm`
    height: 480px;
  `}

  ${media.md`
    height: 450px;
    pointer-events: all;
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
    isLayoutShown: false,
    isGalleryOpen: false,
  };

  galleryCallback = idx => this.setState({ currentImageIdx: idx });

  toggleGallery = () =>
    this.setState({ isGalleryOpen: !this.state.isGalleryOpen });

  toggleLayoutGallery = () => {
    this.setState(
      { isLayoutShown: !this.state.isLayoutShown },
      this.toggleGallery,
    );
  };

  handleToggleFavorite = e => {
    e.preventDefault();
    e.stopPropagation();
    this.props.toggleFavorite();
  };

  render() {
    const { isGalleryOpen, currentImageIdx, isLayoutShown } = this.state;
    const {
      propertyId,
      toggleFavorite,
      isFavorite,
      images,
      layoutImages,
      fullScreenTitle,
    } = this.props;

    return (
      <section>
        <FullScreen
          isOpen={isGalleryOpen}
          initialSlide={isLayoutShown ? 0 : currentImageIdx}
          images={isLayoutShown ? layoutImages : images}
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
          <Visibility xs="hidden" sm="hidden" md="block" lg="block">
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
            onClick={this.handleToggleFavorite}
            icon="favorite"
          />
        </GalleryWrapper>
        {images.length > 1 && (
          <GalleryNav
            currentImageIdx={currentImageIdx}
            showLayoutButton={layoutImages.length > 0}
            images={images}
            onImageClick={idx => this.carousel.slide(idx)}
            onLayoutImagesClick={this.toggleLayoutGallery}
          />
        )}
      </section>
    );
  }
}

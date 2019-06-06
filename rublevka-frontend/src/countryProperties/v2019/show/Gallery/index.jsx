/* eslint-disable no-return-assign */
import React from 'react';
import styled from 'styled-components';
import ReactSwipe from 'react-swipe';

import media from '../../../../styles/media';
import UI from '../../../../ui';
import GalleryNav from './GalleryNav';
import GalleryCount from './GalleryCount';
import GalleryWrapper, { ExpandButton } from './GalleryWrapper';
import FullScreen from './FullScreen';
import { getImageLink } from './utils';
import GalleryNavScrollable from './GalleryNavScrollable';

const { Icon, Visibility } = UI;

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
          propertyId={propertyId}
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
        {images.length > 1 && (
          <GalleryNavScrollable
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

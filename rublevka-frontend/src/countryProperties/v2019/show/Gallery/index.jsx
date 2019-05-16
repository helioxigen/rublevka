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
import { cloudfront } from '../../../core/config/resources';

import media from '../../../styles/media';
import UI from '../../../ui';
import GalleryNav from './GalleryNav';
import GalleryCount from './GalleryCount';

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

const PrevButton = styled.button`
  outline: none;
  position: absolute;
  bottom: 0;
  top: 0;
  left: 15px;
  border: none;
  background: none;
  padding: 0;
  z-index: 2;
`;

const NextButton = styled(PrevButton)`
  left: unset;
  right: 15px;
`;

const ArrowIcon = styled(Icon)`
  width: 15px;
  height: 32px;
  fill: #fff;

  &:hover {
    opacity: 1;
  }
`;

const Wrapper = styled.div`
  position: relative;
  margin: 0 -5px;
  min-height: 300px;

  ${media.xs`
    margin: 0;
    margin-bottom: 8px;
  `}

  ${media.md`
    margin: 4px 0px;
  `}

  &::before, &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 80px;
    transition: opacity 0.5s;
    opacity: 0;
    z-index: 1;
  }

  &::before {
    background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.4) 0%,
      rgba(0, 0, 0, 0) 100%
    );
    left: 0;
  }

  &::after {
    background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.4) 100%
    );
    right: 0;
  }

  ${PrevButton} {
    opacity: 0;
    transition: opacity 0.5s;
  }

  &:hover {
    &::before,
    &::after {
      opacity: 1;
    }

    ${PrevButton} {
      opacity: 1;
    }
  }

  &:hover::before,
  &:hover::after {
    opacity: 1;
  }
`;

const PhotoPlaceholder = styled.div`
  width: 100%;
  height: 300px;
  background-color: #eee;
  content: ' ';

  ${media.xs`
    height: 400px;
    border-radius: 4px;
  `}

  ${media.sm`
    height: 480px;
  `}

  ${media.md`
    height: 450px;
  `}
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

const PhotoNum = styled.div`
  position: absolute;
  bottom: 20px;
  left: 15px;
  padding: 6px 8px;
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 6px;

  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.535714px;
  color: white;
  text-shadow: 0px 0px 15px rgba(0, 0, 0, 0.35);

  z-index: 2;

  span:nth-child(2) {
    margin: 0 2px;
  }
`;

export class Gallery extends React.Component {
  state = {
    currentImageIdx: 0,
  };

  setCurrentImage = idx => this.setState({ currentImageIdx: idx });

  render() {
    return <section />;
  }
}

export default class Media extends Component {
  state = {
    currentImageIdx: 0,
    isGalleryOpen: false,
  };

  componentWillUnmount() {
    clearAllBodyScrollLocks();
  }

  getImageLink = (id, size, postfix = global.config.postfix) =>
    `${global.config.cloudfront || cloudfront}/${id}-${postfix}-${size}`;

  setCurrentImageId = id => this.setState({ currentImageId: id });

  handleNavImageClick = id => () => {
    const { images } = this.props;

    const idx = images.findIndex(im => im.id === id);

    this.carousel.slide(idx);
  };

  galleryCallback = idx => this.setState({ currentImageIdx: idx });

  closeGallery = () => {
    enableBodyScroll(this.modal);

    this.setState({ isGalleryOpen: false });
  };

  openGallery = () => {
    disableBodyScroll(this.modal);

    this.setState({ isGalleryOpen: true });
  };

  render() {
    const { isGalleryOpen, currentImageIdx } = this.state;
    const {
      propertyId,
      toggleFavorite,
      isFavorite,
      hasLayoutImages,
      images,
    } = this.props;
    const currentImageId =
      images[currentImageIdx] && images[currentImageIdx].id;

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
        <Wrapper>
          <Visibility xs="block" sm="hidden" md="hidden" lg="hidden">
            {images.length !== 0 ? (
              <Photo
                src={`${global.config.cloudfront || cloudfront}/${
                  images[0].id
                }-${global.config.postfix}-1024`}
                alt={images[0].id}
                onClick={this.openGallery}
              />
            ) : (
              <PhotoPlaceholder />
            )}
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
          {images.length > 0 && (
            <GalleryCount
              currentIndex={currentImageIdx}
              overall={images.length}
            />
          )}
        </Wrapper>
        <GalleryNav
          currentImageIdx={currentImageIdx}
          hasLayoutImages={hasLayoutImages}
          images={images}
          onImageClick={id => this.carousel.slide(id)}
        />
      </section>
    );
  }
}

import React, { Component } from 'react';
import styled from 'styled-components';
import ReactSwipe from 'react-swipe';
import global from 'window-or-global';
import { cloudfront } from 'core/config/resources';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

import cameraIcon from './img/camera.png';
import media from 'site/styles/media';
import UI from 'site/ui';

const { Icon, Visibility: BaseVisibility } = UI;

const Visibility = styled(BaseVisibility)`
  width: 100%;
`;

const MobileGallery = styled.div`
  display: none;
  pointer-events: none;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
  min-width: 100vw;
  min-height: 100vh;
  height: 100%;
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
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 12px 15px;
  width: 100%;
  background: #ffffff;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.15);
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
  padding: 64px 15px 94px 15px;
  display: flex;
  flex-direction: column;
  overflow: scroll;
`;

const MobilePhoto = styled.img`
  margin: 8px 0;
  width: 100%;
  height: 220px;
  object-fit: cover;
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
    margin: 8px 0px;
  `}
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
  opacity: 0.5;

  &:hover {
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
    border-radius: 4px;
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

const PhotoNum = styled.div`
  position: absolute;
  bottom: 20px;
  right: 15px;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 6px;
`;

const CameraIcon = styled.img`
  width: 20px;
  height: 16px;
  margin-right: 8px;
`;

const PhotoCount = styled.p`
  margin: 0;
  line-height: 18px;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0.535714px;

  color: #ffffff;

  text-shadow: 0px 0px 15px rgba(0, 0, 0, 0.35);
`;

export default class Media extends Component {
  state = { isGalleryOpen: false };

  componentDidMount() {
    if (typeof document !== 'undefined') this.targetElement = document.getElementsByTagName('body')[0];
  }

  componentWillUnmount() {
    clearAllBodyScrollLocks();
  }

  closeGallery = () => {
    enableBodyScroll(this.targetElement);
    this.setState({ isGalleryOpen: false });
  }

  openGallery = () => {
    disableBodyScroll(this.targetElement);
    this.setState({ isGalleryOpen: true });
  };

  targetElement = null;

  render() {
    const { isGalleryOpen } = this.state;
    const { propertyId } = this.props;
    const publicImages = this.props.images.filter(({ isPublic }) => !!isPublic);

    const images = publicImages.map(({ id }) => ({
      id,
      src: `${global.config.cloudfront || cloudfront}/${id}-${global.config.postfix}`,
    }));

    return (
      <div>
        <MobileGallery visible={images.length !== 0 && isGalleryOpen}>
          <Header>
            <CloseButton onClick={this.closeGallery}>
              <CloseIcon icon="close-button" />
            </CloseButton>
          </Header>
          <MobilePhotos>
            {images.map(({ id }) => (
              <MobilePhoto
                key={id}
                alt={id}
                src={`${global.config.cloudfront || cloudfront}/${id}-${
                  global.config.postfix
                }-1024`}
              />
            ))}
          </MobilePhotos>
        </MobileGallery>
        <Visibility sm="hidden" md="hidden" lg="hidden">
          <Wrapper onClick={this.openGallery}>
            {images.length !== 0 && (
              <Photo
                src={`${global.config.cloudfront || cloudfront}/${images[0].id}-${
                  global.config.postfix
                }-1024`}
                alt={images[0].id}
              />
            )}
            {images.length === 0 && <PhotoPlaceholder />}
            <Id>{`№ ${propertyId}`}</Id>
            <PhotoNum>
              <CameraIcon alt="Camera Icon" src={cameraIcon} />
              <PhotoCount>{images.length} фото</PhotoCount>
            </PhotoNum>
          </Wrapper>
        </Visibility>
        <Visibility xs="hidden">
          <Wrapper>
            <PrevButton onClick={() => this.carousel.prev()}>
              <ArrowIcon icon="carousel-left" />
            </PrevButton>
            {images.length !== 0 ? (
              <ReactSwipe ref={el => (this.carousel = el)}>
                {images.map(({ id }) => (
                  <Photo
                    key={id}
                    alt={id}
                    src={`${global.config.cloudfront || cloudfront}/${id}-${
                      global.config.postfix
                    }-1024`}
                  />
                ))}
              </ReactSwipe>
            ) : (
              <PhotoPlaceholder />
            )}
            <NextButton onClick={() => this.carousel.next()}>
              <ArrowIcon icon="carousel-right" />
            </NextButton>
            <Id>{`№ ${propertyId}`}</Id>
            <PhotoNum>
              <CameraIcon alt="Camera Icon" src={cameraIcon} />
              <PhotoCount>{images.length} фото</PhotoCount>
            </PhotoNum>
          </Wrapper>
        </Visibility>
      </div>
    );
  }
}

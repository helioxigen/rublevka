import React from 'react';
import styled from 'styled-components';
import UI from '../../../../ui';
import Portal from 'react-portal';
import media from '../../../../styles/media';
import ReactSwipe from 'react-swipe';
import GalleryNav from './GalleryNav';
import { getImageLink } from './utils';
import PopupModal from '../PopupModal';
import Controls from './Controls';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import GalleryNavScrollable from './GalleryNavScrollable';
import uis from '../../../../uis';

const { Icon } = UI;

const FavoriteIcon = styled(Icon).attrs({
  icon: 'favorite',
})`
  width: 1.2em;
  height: 1.2em;

  stroke: #f44336;
  stroke-width: 2px;
  fill: ${props => (props.checked ? '#F44336' : 'transparent')};
  margin-right: 8px;

  &:hover {
    opacity: 1;
  }
`;

const Button = styled.button`
  padding: 10px 24px;
  border: none;
  outline: none;
  background-color: ${props => (props.grey ? '#666666' : '#47b34c')};
  border-radius: 32px;

  display: flex;
  justify-content: center;
  align-items: center;

  margin-right: 1em;

  .switched-text {
    min-width: 100px;
  }

  color: #fff;
  font-size: 15px;
  line-height: 18px;
  font-weight: bold;

  svg {
    transition: 0.3s;
  }

  display: none;

  ${media.sm`
    display: block;
  `}
`;

const Wrapper = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  z-index: 1000;

  background: #232323;

  ${media.md`
    padding: 0 50px;
  `}
`;

const Container = styled.div`
  display: grid;
  grid-template-rows: 33% auto 33%;

  ${media.sm`
    grid-template-rows: 15% auto 25%;
  `}

  ${media.md`
    grid-template-rows: 15% auto 15%;
  `}

  height: 100%;

  header {
    color: white;
    display: flex;
    align-items: center;
    align-self: flex-start;

    z-index: 50;

    .desktop-title {
      display: none;
    }

    ${media.md`
      .desktop-title {
        display: block;
      }
      .mobile-title {
        display: none;
      }
    `}

    padding: 16px 16px 0;

    ${media.md`
      padding-top: 18px 0 0;
    `}

    h3 {
      margin: 0;
      flex: 1;
      font-size: 18px;
    }

    .mobile-title {
      font-size: 15px;
    }
  }

  .gallery-body {
    overflow: hidden;

    ${media.md`
      padding: 0 50px;
    `}

    .photo-container {
      position: relative;
    }

    .react-swipe-container {
      height: 100%;

      div {
        height: 100%;
      }
    }
  }

  ${GalleryNav} {
    max-width: 700px;
    justify-self: center;

    ${media.md`
      padding-top: 16px;
    `}
  }
`;

const CloseButton = styled.button`
  margin: 0;
  padding: 0;
  border: none;
  background: none;
  width: 24px;
  height: 24px;

  opacity: 0.3;
  transition: 0.3s;

  &:hover {
    opacity: 1;
  }
`;

const CloseIcon = styled(Icon)`
  fill: white;
  width: 100%;
  height: 100%;
`;

const Photo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;

  pointer-events: none;
`;

export default class FullScreenGallery extends React.Component {
  state = {
    currentImageIdx: this.props.initialSlide,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.initialSlide !== this.state.currentImageIdx) {
      this.setState({
        currentImageIdx: nextProps.initialSlide,
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isOpen !== this.props.isOpen) {
      this.toggleBodyScroll();
      this.toggleKeyListener();
    }
  }

  arrowControl = event => {
    if (event.key === 'ArrowLeft') {
      this.carousel.prev();
    }

    if (event.key === 'ArrowRight') {
      this.carousel.next();
    }
  };

  toggleKeyListener = () =>
    this.props.isOpen
      ? document.addEventListener('keydown', this.arrowControl, false)
      : document.removeEventListener('keydown', this.arrowControl, false);

  toggleBodyScroll = () => {
    return this.props.isOpen
      ? disableBodyScroll(this.modal)
      : enableBodyScroll(this.modal);
  };

  galleryCallback = idx => {
    this.setState({ currentImageIdx: idx });
    this.props.onSlideChange(idx);
  };

  render() {
    const { currentImageIdx } = this.state;
    const {
      title,
      images,
      initialSlide,
      isFavorite,
      isOpen,
      onFavoriteClick,
      onClose,
      propertyId,
    } = this.props;

    return (
      <Portal
        isOpened={isOpen}
        closeOnEsc
        closePortal={onClose}
        ref={el => (this.modal = el)}
      >
        <Wrapper>
          <Controls
            onNextClick={() => this.carousel.next()}
            onPrevClick={() => this.carousel.prev()}
          />
          <Container>
            <header>
              <h3 className="desktop-title">{title}</h3>
              <h3 className="mobile-title">№ {propertyId}</h3>
              <PopupModal
                header="Оставить заявку"
                subheader="Оставьте свою заявку и наш менеджер свяжется с вами в течение 5 минут."
                successMessage="Наш менеджер свяжется с вами в течение рабочего дня с 11 до 18."
                fields={{
                  name: {
                    placeholder: 'имя',
                  },
                  phone: {
                    type: 'phone',
                    placeholder: 'телефон',
                  },
                  comment: {
                    type: 'textarea',
                    placeholder: 'комментарий',
                  },
                }}
                onSendRequest={values =>
                  uis.send(values.name, values.phone, values.comment)
                }
              >
                <Button>Оставить заявку</Button>
              </PopupModal>
              <Button grey onClick={onFavoriteClick}>
                <FavoriteIcon checked={isFavorite} />
                <span className="switched-text">
                  {isFavorite ? 'В избранном' : 'В избранное'}
                </span>
              </Button>
              <CloseButton onClick={onClose}>
                <CloseIcon icon="close-button" />
              </CloseButton>
            </header>
            <div className="gallery-body">
              <ReactSwipe
                ref={el => {
                  this.carousel = el;
                }}
                swipeOptions={{
                  callback: this.galleryCallback,
                  startSlide: initialSlide,
                }}
              >
                {images.map(({ id }, idx) => (
                  <Photo
                    key={id}
                    data-id={id}
                    alt={idx}
                    data-idx={idx}
                    onClick={this.openPhotoGallery}
                    src={
                      currentImageIdx - 1 === idx ||
                      currentImageIdx + 1 === idx ||
                      currentImageIdx === idx
                        ? getImageLink(id, 1024)
                        : undefined
                    }
                  />
                ))}
              </ReactSwipe>
            </div>
            {images.length > 1 && (
              <GalleryNav
                currentImageIdx={currentImageIdx}
                images={images}
                onImageClick={idx => this.carousel.slide(idx)}
              />
            )}
            {images.length > 1 && (
              <GalleryNavScrollable
                currentImageIdx={currentImageIdx}
                images={images}
                onImageClick={idx => this.carousel.slide(idx)}
                onLayoutImagesClick={this.toggleLayoutGallery}
              />
            )}
          </Container>
        </Wrapper>
      </Portal>
    );
  }
}

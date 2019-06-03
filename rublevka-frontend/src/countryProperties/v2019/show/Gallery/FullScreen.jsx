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
`;

const Photo = styled.span`
  width: 100%;
  height: 100%;
  position: absolute;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
`;

const Wrapper = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  z-index: 1000;

  padding: 0 50px;
  background: #232323;
`;

const Container = styled.div`
  display: grid;
  grid-template-rows: 15% auto 15%;

  height: 100%;

  header {
    color: white;
    display: flex;
    align-items: center;
    align-self: flex-start;

    padding-top: 18px;

    h3 {
      margin: 0;
      flex: 1;
      font-size: 18px;
    }
  }

  .gallery-body {
    overflow: hidden;

    padding: 0 50px;

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

    padding-top: 16px;
  }
`;

const CloseButton = styled.button`
  margin: 0;
  padding: 0;
  border: none;
  background: none;
  width: 24px;
  height: 24px;
`;

const CloseIcon = styled(Icon)`
  fill: #656565;
  width: 100%;
  height: 100%;
`;

export default class FullScreenGallery extends React.Component {
  state = {
    currentImageIdx: this.props.initialSlide,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.isOpen !== this.props.isOpen) {
      this.toggleBodyScroll();
    }
  }

  toggleBodyScroll = () => {
    return this.props.isOpen
      ? disableBodyScroll(this.modal)
      : enableBodyScroll(this.modal);
  };

  galleryCallback = idx => this.setState({ currentImageIdx: idx });

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
              <h3>{title}</h3>
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
                onSendRequest={values => values}
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
                ref={el => (this.carousel = el)}
                swipeOptions={{
                  callback: this.galleryCallback,
                  startSlide: initialSlide,
                }}
              >
                {images.map(({ id }) => (
                  <div className="photo-container">
                    <Photo
                      key={id}
                      data-id={id}
                      alt={id}
                      style={{
                        backgroundImage: `url(${getImageLink(id, 1024)})`,
                      }}
                    />
                  </div>
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
          </Container>
        </Wrapper>
      </Portal>
    );
  }
}

import React, { Component } from 'react';
import Slider from 'react-slick';
import global from 'window-or-global';
import { cloudfront } from 'core/config/resources';

import UI from 'ui';
const { Modal, Carousel, RetinaImage, Icon } = UI;

import s from 'styles/property/media';
import sUtils from 'styles/utils';

const settings = {
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  variableWidth: true,
};

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: !!this.props.isOpen,
    };
  }

  toggleModal(modalState, currentSlide = 0) {
    this.setState({
      isOpen: modalState,
      currentSlide,
    });
  }

  render() {
    const publicImages = this.props.images.filter(({ isPublic }) => !!isPublic);

    const images = publicImages.map(({ id }) => ({
      id,
      src: `${global.config.cloudfront || cloudfront}/${id}-${
        global.config.postfix
      }`,
    }));

    const thumbnails = publicImages.map(({ id }) => ({
      id,
      src: `${global.config.cloudfront || cloudfront}/${id}-thumbnail`,
    }));

    return images.length ? (
      <section className={s.media}>
        <div className={sUtils.hideFromMd}>
          <Slider {...settings}>
            {images.map(({ id }, index) => (
              <button
                type="button"
                className={s.imageContainer}
                onClick={() => ::this.toggleModal(true, index)}
                key={index}
              >
                <RetinaImage
                  src={`${global.config.cloudfront || cloudfront}/${id}-${
                    global.config.postfix
                  }`}
                  size={512}
                  className={s.image}
                  alt={id}
                />
              </button>
            ))}
          </Slider>
        </div>

        <div className={sUtils.hideXsSm}>
          {images.map(({ id }, index) => (
            <button
              type="button"
              className={s.imageContainer}
              onClick={() => ::this.toggleModal(true, index)}
              key={index}
            >
              <RetinaImage
                src={`${global.config.cloudfront || cloudfront}/${id}-${
                  global.config.postfix
                }`}
                size={512}
                className={s.image}
                alt={id}
              />
            </button>
          ))}
        </div>

        <Modal
          closeOnEsc
          closeOnOutsideClick
          onClose={() => ::this.toggleModal(false)}
          isOpened={this.state.isOpen}
          closePortal={() => ::this.toggleModal(false)}
          hideCloseButton
        >
          <Carousel
            title="Фотографии"
            images={images}
            thumbnails={thumbnails}
            currentSlide={this.state.currentSlide}
            fullscreenOnly
            onClose={() => ::this.toggleModal(false)}
          />
        </Modal>
      </section>
    ) : (
      <section className={s.placeholderContainer}>
        <p className={s.text}>Фотографии объекта отсутствуют</p>
        <Icon className={s.placeholderImage} responsive icon="placeholder" />
      </section>
    );
  }
}

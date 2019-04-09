import React, { Component } from 'react';
import global from 'window-or-global';
import { cloudfront } from 'core/config/resources';

import cn from 'classnames';
import UI from 'ui';
const { Modal, Carousel, RetinaImage } = UI;

import s from 'styles/property/media';

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
    const images = this.props.images.map(({ id }) => ({
      id,
      src: `${global.config.cloudfront || cloudfront}/${id}-${
        global.config.postfix
      }`,
    }));

    return (
      !!images.length && (
        <section className={cn(this.props.className)}>
          {images.map(({ id }, index) => (
            <button
              type="button"
              className={s.imageContainer}
              onClick={() => ::this.toggleModal(true, index)}
              key={index}
            >
              <RetinaImage
                src={`${global.config.cloudfront ||
                  cloudfront}/${id}-thumbnail`}
                size={256}
                className={s.image}
                alt={id}
              />
            </button>
          ))}
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
              currentSlide={this.state.currentSlide}
              fullscreenOnly
              onClose={() => ::this.toggleModal(false)}
            />
          </Modal>
        </section>
      )
    );
  }
}
